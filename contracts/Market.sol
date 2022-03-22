// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IERC721.sol";

contract Market {
  struct Listing {
    address token;
    address seller;
    uint256 id;
    uint256 price;
    ListingStatus status;
  }

  enum ListingStatus {
    Active,
    Sold,
    Cancelled
  }

  uint256 private _listingId = 0;
  mapping(uint256 => Listing) public _listings;

  //   mapping(address => Listing) public ownerToToken;

  function listToken(
    address _token,
    uint256 _id,
    uint256 _price
  ) external {
    Listing memory listing = Listing(
      _token,
      msg.sender,
      _id,
      _price,
      ListingStatus.Active
    );

    _listings[_listingId++] = listing;
  }

  function buyToken(uint256 _id) external payable {
    Listing storage listing = _listings[_id];

    require(listing.status == ListingStatus.Active, "Listing must be active");
    require(msg.sender != listing.seller, "Cannot buy your own listing");
    require(
      msg.value == listing.price,
      "Ether sent must be equal the price of the listing"
    );
  }
}
