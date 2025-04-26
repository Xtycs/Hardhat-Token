// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "hardhat/console.sol"; 

// A Solidity contract is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain.
// The code is written in Solidity, a programming language designed for writing smart contracts on the Ethereum blockchain.
contract Token {

    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        require(balances[msg.sender] >= amount, "Not enough tokens");


        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
