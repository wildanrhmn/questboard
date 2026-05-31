// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract QuestBadge is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address public minter;

    constructor(
        address initialOwner
    ) ERC721("Quest Badge", "QB") Ownable(initialOwner) {}

    function setMinter(address _minter) external onlyOwner {
    minter = _minter;
}

modifier onlyMinter() {
    require(
        msg.sender == owner() || msg.sender == minter,
        "not authorized to mint"
    );
    _;
}

    function safeMint(
        address to,
        string memory uri
    ) external onlyMinter returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
