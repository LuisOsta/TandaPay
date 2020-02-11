
pragma solidity >= 0.4.0 < 0.7.0;

import './IService.sol';
import './Group.sol';

/**
 * @author blOX Consulting LLC
 * Date: 08.11.2019
 */
contract Service is IService {

    ///MODIFIERS///
     modifier onlyAdmin() {
        require(administrators[msg.sender], "Address is not a TandaPay Administrator!");
        _;
    }

    ///CONSTRUCTOR///
    
    /**
     * Construct a new Insurace Service
     * @param _dai address of the Dai ERC20 token
     */
    constructor(address _dai) public {
        administrators[msg.sender] = true;
        Dai = IERC20(_dai);
        emit AdminApproved(msg.sender);
    }

    ///INTERFACE MUTABLE IMPLEMENTATION///

    function addAdmin(address _to) public onlyAdmin {
        require(!administrators[_to], "Address is already an Administrator!");
        administrators[_to] = true;
        emit AdminApproved(_to);
    }

    function removeAdmin(address _from) public onlyAdmin {
        require(administrators[_from], "Address is not an Administrator!");
        delete administrators[_from];
        emit AdminRevoked(_from);
    }

    function createGroup(address _to, uint _volume, uint _payout) public onlyAdmin returns (address _group) {
        require(groups[secretaries[_to]] == address(0), "Address is already a Secretary!");
        Group group = new Group(address(Dai), _to, _volume, _payout);
        groupCount = groupCount.add(1);
        _group = address(group);
        groups[groupCount] = _group;
        secretaries[_to] = groupCount;
        emit GroupCreated(_group);
    }

    function remitGroup(address _group) public onlyAdmin {
        uint period = (Group(_group).activePeriod()).sub(1);
        Group(_group).endPeriod(period);
        emit Remitted(_group, period);
    }

    function loan(address _group, uint _months) public {
        uint total = Group(_group).groupPremium();
        require(Dai.balanceOf(address(this)) >= total.mul(2), "Insufficient Dai to make Loans!");
        require(!Group(_group).loaned(), "Cannot loan to a group twice!");

        address secretary = Group(_group).getSecretary();
        Dai.transfer(secretary, total.mul(2));
        Group(_group).makeLoan(_months);
        emit Loaned(_group);
    }

}