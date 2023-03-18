// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Rating {
    mapping(bytes32 => uint) public usersRating;

    constructor() payable {
        require(msg.value > 1000 wei, "fuck you");
    }

    function setRating(string memory pass, uint rating) public {
        require(rating < 6, "Rating should be between 0 and 5");
        rating *= 100;
        usersRating[keccak256(abi.encodePacked(pass))] = rating;
    }

    function getRating(string calldata _pass) public view returns (uint) {
        return usersRating[keccak256(abi.encodePacked(_pass))];
    }
}
