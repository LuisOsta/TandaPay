pragma solidity >= 0.4.0 < 0.7.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract IService {

    using SafeMath for uint;

    event AdminApproved(address _approved);
    event AdminRevoked(address _revoked);
    event GroupCreated(address _group);
    event Remitted(address _group, uint _period);
    event Loaned(address _group);

    enum subperiod {LOBBY, PRE, ACTIVE, POST, ENDED}

    mapping(address => bool) administrators;
    mapping(address => uint) secretaries;
    mapping(uint => address) groups;

    IERC20 Dai;

    uint groupCount;

    /**
     * @dev modifier onlyAdmin
     * Add an admin
     * @param _to the address being whitelisted
     **/
    function addAdmin(address _to) public;

    /**
     * @dev modifier onlyAdmin
     * Remove an admin
     * @param _from the address being blacklisted
     **/
    function removeAdmin(address _from) public;

    /**
     * @dev modifier onlyAdmin
     * Approve a secretary and create a new group
     * @param _to the address being given a secretary role
     * @param _volume uint number of expected claims
     * @param _payout uint number of Dai paid per claim
     * @return _group the address of the Group contact
     **/
    function createGroup(address _to, uint _volume, uint _payout) public returns (address _group);

    /**
     * @dev modifier onlyAdmin
     * @dev modifier unlocked
     * Remit a single group assuming it is not timelocked
     * @param _group the address of the group being remitted
     **/
    function remitGroup(address _group) public;

    /**
     * @dev modifier onlyAdmin
     * @dev require sufficienct balance
     * Extend a loan, in Dai, to a Tanda Group
     * @param _group the group being given the loan
     * @param _months the length, in months (periods), the Group has to repay
     */
    function loan(address _group, uint _months) public;

}