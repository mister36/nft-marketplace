// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("Market Token", "MT") {
  }

  function mintTo(address _to, string memory _uri) public returns (uint) {
   uint newId = _tokenIds.current();
   _mint(_to, newId);
   _setTokenURI(newId, _uri);
   _tokenIds.increment();

   return newId;
  }
}