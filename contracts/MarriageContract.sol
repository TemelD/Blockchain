// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MarriageContract {
    address public spouse1;
    address public spouse2;
    bool public married;

    constructor(address _spouse1, address _spouse2) {
        spouse1 = _spouse1;
        spouse2 = _spouse2;
        married = false;
    }

    function setMarried() external {
        require(msg.sender == spouse1 || msg.sender == spouse2, "Only spouses can call this function");
        married = true;
    }

    function getMarried() external view returns(bool) {
        return married;
    }
}