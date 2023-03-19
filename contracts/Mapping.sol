// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Mapping {
    mapping(bytes32 => address) public passToAddr;
    mapping(address => bytes32) public addrToPass;

    function saveHashPair(string calldata _pass) public {
        passToAddr[keccak256(abi.encodePacked(_pass))] = msg.sender;
        addrToPass[msg.sender] = keccak256(abi.encodePacked(_pass));
    }

    function getAddressByPass(
        string memory _pass
    ) public view returns (address _address) {
        _address = passToAddr[keccak256(abi.encodePacked(_pass))];
    }

    function getPassByAddress(
        address _address
    ) public view returns (bytes32 _pass) {
        _pass = addrToPass[_address];
    }
}
