pragma solidity >= 0.4.0 < 0.7.0;

import 'openzeppelin-solidity/contracts/ownership/Secondary.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * @author blOX Consulting LLC
 * Date: 08.09.2019
 * Liquidity Contract for Secretary to post stake into 
 * Administrator remittance should always pay out secretary
 */
contract LiquidityLock is Secondary {

    using SafeMath for uint;

    uint liquidity;
    address secretary;

    IERC20 dai;

    /**
     * Construct a new Liquidity Contract
     * @param _liquidity the minimum required liquidity to satisfy the contract
     * @param _secretary the beneficiary address of the timelock
     * @param _dai the address of the Dai ERC20 contract
     */
    constructor(uint _liquidity, address _secretary, address _dai) public {
        liquidity = _liquidity;
        secretary = _secretary;
        dai = IERC20(_dai);
    }

    /**
     * Determine if the liquidity contract is sufficienty liquid
     * @return bool true if the contract's Dai balance is greater than 
     *         liquidity requirement defined at construction, and false otherwise
     */
    function liquid() public view returns (bool) {
        uint balance = dai.balanceOf(address(this));
        return balance >= liquidity;
    }

    /**
     * Withdraw the current balance to the Secretary
     */
    function withdraw() public onlyPrimary returns (uint balance) {
        balance = dai.balanceOf(address(this));
        require(balance > 0, "No Dai in Liquidity Contract to Withdraw!");
        dai.transfer(secretary, balance);
    }
}