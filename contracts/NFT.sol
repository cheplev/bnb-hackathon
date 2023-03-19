// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 100px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("RatingNFT", "Rating") {}

    function makeAnNFT(address _to, string memory _rating) public {
        uint256 newItemId = _tokenIds.current();

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, _rating, "</text></svg>")
        );

        console.log(finalSvg);

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        "{"
                        '"name": "Dynamic Rating NFT",'
                        '"description": "NFT which displays the account rating", '
                        '"image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"'
                        "}"
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(json);

        _safeMint(_to, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
    }
}
