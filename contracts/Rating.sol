// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// // Uncomment this line to use console.log
// // import "hardhat/console.sol";

// contract Rating {
//     mapping(bytes32 => uint) public passRating;
//     mapping(address => uint) public addressRating;

//     function setRating(
//         string memory pass,
//         address _address,
//         uint rating
//     ) public {
//         require(rating < 6, "Rating should be between 0 and 5");
//         rating *= 100;
//         passRating[keccak256(abi.encodePacked(pass))] = rating;
//         addressRating[_address] = rating;
//     }

//     function getAddrRating(address _address) public view returns (uint rating) {
//         rating = addressRating[_address];
//     }

//     function getPassRating(
//         string memory _pass
//     ) public view returns (uint rating) {
//         rating = passRating[keccak256(abi.encodePacked(_pass))];
//     }
// }
