pragma solidity >= 0.4.0 < 0.7.0;

import './IGroup.sol';
import 'openzeppelin-solidity/contracts/ownership/Secondary.sol';

/**
 * @author blOX Consulting LLC
 * Date: 08.11.2019
 * Implementation of Group
 */
contract Group is IGroup, Secondary {
    
    ///MODIFIERS///

    /**
     * Determine whether the liquidity contract is accessable by the Secretary
     */
    modifier liquidityLock() {
        uint range = block.timestamp - origin;
        uint bound = range.mod(30);
        require(origin == 0 || bound <= 6 days, "Liquidity Stake is currently Locked!");
        _;
    }

    /**
     * Modifier to restrict functionality to Lobby subperiod state
     */
    modifier onlyLobby() {
        require((next == false), "Group is locked in the 'started' state!");
        uint nextPeriod = currentPeriod.add(1);
        require((periodLocks[nextPeriod][0] == 0), "Group must finish the current period before entering Lobby!");
        _;
    }

    /**
     * Determine whether a given action can currently be performed
     * @param _period uint period index being queried
     * @param _state subperiod restriction being applied
     */
    modifier allowed(uint _period, subperiod _state) {
        require(getSubperiod(_period) == uint(_state), "Incorrect subperiod for this action!");
        _;
    }

    /**
     * Restrict access to Secretary role
     */
    modifier onlySecretary() {
        require(secretary == msg.sender, "Address is not this Group's Secretary!");
        _;
    }

    /**
     * Restrict access to Policyholder role
     */
    modifier onlyPolicyholder() {
        require(policyholders[msg.sender] != 0, "Address is not a Policyholder in this Group!");
        _;
    }

    ///CONSTRUCTOR///

    /**
     * Construct a new Test Group
     * @param _dai the address of the Dai ERC20 contract
     * @param _secretary the address of the secretary of this group
     *     @dev _secretary is minter / admin in Test Group
     * @param _volume the number of expected claims
     * @param _payout the number of Dai tokens to pay out per claim
     */
    constructor(address _dai, address _secretary, uint _volume, uint _payout) public {
        currentPeriod = 0;
        uint total = _volume.mul(_payout);
        Liquidity = new LiquidityLock(total.mul(2), _secretary, _dai);
        Dai = IERC20(_dai);
        volume = _volume;
        payout = _payout;
    }

    ///INTERFACE MUTABLE IMPLEMENTATIONS///

    function startGroup() public onlySecretary onlyLobby {
        currentPeriod = currentPeriod.add(1);
        origin = block.timestamp.sub(3 days);
        setLocks(currentPeriod);
        next = true;
        emit Started();
    }

    function stopGroup() public onlySecretary {
        uint periodOrigin = periodLocks[currentPeriod][0];
        uint range = block.timestamp.sub(periodOrigin);
        require(range > 3 days && range <= 30 days, "Cannot stop group while transitioning periods!");
        next = false;
        uint nextPeriod = currentPeriod.add(1);
        for(uint i = 0; i < SUBPERIOD_DAYS.length; i++)
            periodLocks[nextPeriod][i] = 0;
        emit Stopped();
    }

    function endPeriod(uint _period) public onlyPrimary {
        stripToxicSubgroups(_period);
        payClaims(_period);
        payRefunds(_period);
        if(next != false) {
            currentPeriod = currentPeriod.add(1);
            setLocks(currentPeriod);
        } else {
            origin = 0;
        }
        emit PeriodEnded(_period);
        loanMonths = loanMonths.sub(1);
    }

    function withdraw() public onlySecretary liquidityLock {
        uint balance = Liquidity.withdraw();
        emit LiquidityWithdrawn(balance);
    }

    function makeLoan(uint _months) public onlyPrimary onlyLobby {
        require(!loaned(), "Cannot have two loans simultaneously!");
        loanDebt = (volume.mul(payout)).mul(2);
        loanMonths = _months;
        emit Loaned(loanDebt, loanMonths);
    }

    function addPolicyholder(address _to, uint _subgroup) public onlySecretary onlyLobby {
        require(policyholders[_to] == 0, "Policyholder already exists!");
        require(subgroupCounts[_subgroup] < 7, "Subgroup is full!");
        require(_subgroup > subgroupIndex.add(1), "Incorrect subgroup syntax!");
        
        policyholders[_to] = _subgroup;
        subgroupCounts[_subgroup] = subgroupCounts[_subgroup].add(1);
        groupSize = groupSize.add(1);
        emit PolicyholderAdded(_to);
        if(_subgroup == subgroupIndex.add(1))
            subgroupIndex = subgroupIndex.add(1);
    }
    
    function removePolicyholder(address _from) public onlySecretary onlyLobby {
        require(policyholders[_from] != 0, "Policyholder does not exist!");
        
        subgroupCounts[policyholders[_from]] = subgroupCounts[policyholders[_from]].sub(1);
        policyholders[_from] = 0;
        groupSize = groupSize.sub(1);
        emit PolicyholderRemoved(_from);
    }
    
    function changeSubgroup(address _policyholder, uint _subgroup) public onlySecretary onlyLobby {
        require(subgroupCounts[_subgroup] < 7, "Subgroup is full!");
        require(_subgroup > subgroupIndex.add(1), "Incorrect subgroup syntax!");
        
        subgroupCounts[policyholders[_policyholder]] = subgroupCounts[policyholders[_policyholder]].sub(1);
        subgroupCounts[_subgroup] = subgroupCounts[_subgroup].add(1);
        uint old = policyholders[_policyholder];
        policyholders[_policyholder] = _subgroup;
        emit SubgroupChange(_policyholder, old);
        if(_subgroup == subgroupIndex.add(1))
            subgroupIndex = subgroupIndex.add(1);
    }
    
    function makePayment(uint _period) public onlyPolicyholder allowed(_period, subperiod.PRE) {
        require(participantToIndex[_period][msg.sender] == 0, "Address has already paid premium as a Policyholder!");
        uint subgroup = subgroupCounts[policyholders[msg.sender]];
        uint premiumPayment = calculatePremium();
        uint overPayment = calculateOverpayment(subgroup, premiumPayment);
        uint loanPayment = calculateLoanPayment();
        uint total = premiumPayment.add(overPayment).add(loanPayment);
        require(Dai.allowance(msg.sender, address(this)) >= total, "Insufficient Dai allowance for Payment!");

        Dai.transferFrom(msg.sender, address(this), premiumPayment.add(overPayment));
        Dai.transferFrom(msg.sender, primary(), loanPayment);
        participantIndices[_period] = participantIndices[_period].add(1);
        uint index = participantIndices[_period];
        participants[_period][index] = msg.sender;
        participantToIndex[_period][msg.sender] = index;
        emit Paid(msg.sender, _period);
        claimPools[_period] = claimPools[_period].add(premiumPayment.add(overPayment));
    }

    function submitClaim(uint _period, address _claimant) public onlySecretary allowed(_period, subperiod.ACTIVE) {
        require(claimants[_period][_claimant] == 0, "Claimant already has an existing Claim!");
        
        claimIndices[_period] = claimIndices[_period].add(1);
        uint index = claimIndices[_period];
        claims[_period][index] = _claimant;
        claimants[_period][_claimant] = index;
        emit ClaimSubmitted(_claimant, _period);
    }

    function defect(uint _period) public onlyPolicyholder allowed(_period, subperiod.POST) {
        uint participantIndex = participantToIndex[_period][msg.sender];
        require(participantIndex != 0, "Only premium-paid policyholders may defect!");

        uint claimIndex = claimants[_period][msg.sender];
        if(claimIndex != 0)
            removeClaim(_period, claimIndex);
        uint subgroup = policyholders[msg.sender];
        defectionCounts[_period][subgroup] = defectionCounts[_period][subgroup].add(1);
        if(defectionCounts[_period][subgroup] >= DEFECTION_THRESHOLD)
            toxicSubgroups[_period][subgroup] = true;
        Dai.transfer(msg.sender, calculatePremium());
        removeParticipant(_period, participantIndex);
        emit Defected(msg.sender, _period);
    }

    ///INTERFACE VIEWABLE FUNCTIONS///

    function getSecretary() public view returns (address) {
        return secretary;
    }

    function getLiquidity() public view returns (address) {
        return address(Liquidity);
    }

    function groupPremium() public view returns (uint) {
        return (payout.mul(volume));
    }

    function activePeriod() public view returns (uint) {
        uint postLock = periodLocks[currentPeriod][2];
        if(block.timestamp >= postLock && postLock != 0)
            return currentPeriod.add(1);
        else
            return currentPeriod;
    }

    function getSubperiod(uint _period) public view returns (uint currentSubperiod) {
        uint preLock = periodLocks[_period][0];
        if (preLock == 0 || preLock > block.timestamp)
            return uint(subperiod.LOBBY);
        else {
            for (uint i = 0; i < SUBPERIOD_DAYS.length.sub(1); i++) {
                if(periodLocks[_period][i.add(1)] > block.timestamp)
                    return (i.add(1));
            }
            return uint(subperiod.ENDED);
        }
    }

    function loaned() public view returns (bool) {
        return (loanDebt == 0 && loanMonths == 0);
    }    

    function calculatePayment(address _query) public view returns (uint) {
        uint premium = calculatePremium();
        uint overpayment = calculateOverpayment(policyholders[_query], premium);
        uint loan = calculateLoanPayment();
        return (premium.add(overpayment).add(loan));
    }

    function calculatePremium() public view returns (uint) {
        uint total = payout.mul(volume);
        return total.div(groupSize);
    }

    function calculateOverpayment(uint _subgroup, uint _premium) public view returns (uint) {
        uint subgroupSize = subgroupCounts[_subgroup];
        return (_premium.div(subgroupSize.sub(1)));
    }

    function calculateLoanPayment() public view returns (uint) {
        return loanDebt.sub((loanMonths.add(1)).mul(groupSize));
    }

    function calculateExpectedPayout(uint _period) public view returns (uint) {
        uint pool = claimPools[_period];
        uint index = claimIndices[_period];
        if(index == 0)
            return 0;
        uint share = pool.div(index);
        if (share > payout)
            share = payout;
        return share;
    }

    ///INTERNAL FUNCTIONS///

    /**
     * Set the locks for a given period based off the current block timestamp
     * @param _period uint index of period being locked
     */
    function setLocks(uint _period) internal {
        if(periodLocks[_period][0] == 0) {
            uint periodOrigin = block.timestamp;
            periodLocks[_period][0] = periodOrigin;
            for(uint i = 0; i < SUBPERIOD_DAYS.length; i++) {
                uint threshold = SUBPERIOD_DAYS[i].mul(1 days);
                periodLocks[_period][i] = periodOrigin.add(threshold);
            }
        }
        uint nextOrigin = periodLocks[_period][0].add(30 days);
        uint nextPeriod = _period.add(1);
        periodLocks[nextPeriod][0] = nextOrigin;
        for(uint i = 0; i < SUBPERIOD_DAYS.length; i++) {
            uint threshold = SUBPERIOD_DAYS[i].mul(1 days);
            periodLocks[nextPeriod][i] = nextOrigin.add(threshold);
        }
    }

    /**
     * Remove any claims that were made within toxic subgroups
     * @param _period uint index of period being remitted
     */
    function stripToxicSubgroups(uint _period) internal {
        uint index = claimIndices[_period];
        for(uint i = 1; i <= index; i++) {
            address claimant = claims[_period][i];
            uint subgroup = policyholders[claimant];
            if(toxicSubgroups[_period][subgroup]) {
                removeClaim(_period, i);
                i.sub(1);
                index = index.sub(1);
                emit ClaimStripped(claimant, _period);
            }
        }
    }

    /**
     * Pay out each claim according to the Dai pool
     * @param _period uint index of period being remitted
     */
    function payClaims(uint _period) internal {
        uint index = claimIndices[_period];
        uint share = calculateExpectedPayout(_period);
        for(uint i = 1; i <= index; i++) {
            address claimant = claims[_period][i];
            Dai.transfer(claimant, share);
            claimPools[_period] = claimPools[_period].sub(share);
            removeParticipant(_period, participantToIndex[_period][claimant]);
            emit ClaimPaid(claimant, _period);
        }
    }
    
    /**
     * Pay refunds to the remaining active policyholders according to the remaining Dai pool
     * @param _period uint index of period being remitted
     */
    function payRefunds(uint _period) internal {
        uint pool = claimPools[_period];
        if(pool > 0) {
            uint index = participantIndices[_period];
            uint share = pool.div(index);
            for(uint i = 1; i <= index; i++) {
                address participant = participants[_period][i];
                Dai.transfer(participant, share);
                delete participants[_period][i];
                delete participantToIndex[_period][participant];
            }
        }
    }

    /**
     * Remove a claim from a period's claim list
     * @param _period uint index of period being mutated
     * @param _index uint index of claim being removed in claim list
     */
    function removeClaim(uint _period, uint _index) internal {
        uint maxIndex = claimIndices[_period];
        address oldClaimant = claims[_period][_index];
        address newClaimant = claims[_period][maxIndex];
        claims[_period][_index] = newClaimant;
        claimants[_period][newClaimant] = _index;
        claimIndices[_period] = claimIndices[_period].sub(1);
        delete claims[_period][maxIndex];
        delete claimants[_period][oldClaimant];
    }

    /**
     * Remove a participant from the active participant list
     * @param _period uint index of period being mutated
     * @param _index uint index of participant being ejected
     */
    function removeParticipant(uint _period, uint _index) internal {
        uint maxIndex = participantIndices[_period];
        address oldParticipant = participants[_period][_index];
        address newParticipant = participants[_period][maxIndex];
        participants[_period][_index] = newParticipant;
        participantToIndex[_period][newParticipant] = _index;
        participantIndices[_period] = participantIndices[_period].sub(1);
        delete participants[_period][maxIndex];
        delete participantToIndex[_period][oldParticipant];
    }

}