// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Market {
  struct Listing {
    address token;
    address seller;
    uint256 tokenId;
    uint256 price; // in wei
    ListingStatus status;
  }

  enum ListingStatus {
    Active,
    Sold,
    Cancelled
  }

  event Listed(
    address seller,
    address token,
    uint256 tokenId,
    uint256 price,
    uint256 listingId
  );

  event Sale(
    address seller,
    address buyer,
    address token,
    uint256 tokenId,
    uint256 price,
    uint256 listingId
  );

  event Cancel(address seller, address token, uint256 tokenId);

  uint256 private _listingId = 0;
  mapping(uint256 => Listing) public listings;

  function getListing(uint256 _id) external view returns (Listing memory) {
    return listings[_id];
  }

  function listToken(
    address _token,
    uint256 _id,
    uint256 _price
  ) external {
    IERC721(_token).transferFrom(msg.sender, address(this), _id);

    Listing memory listing = Listing(
      _token,
      msg.sender,
      _id,
      _price,
      ListingStatus.Active
    );

    listings[_listingId++] = listing;

    emit Listed(msg.sender, _token, _id, _price, _listingId);
  }

  function buyToken(uint256 _id) external payable {
    Listing storage listing = listings[_id];

    require(listing.status == ListingStatus.Active, "Listing must be active");
    require(msg.sender != listing.seller, "Cannot buy your own listing");
    require(msg.value >= listing.price, "Insufficient funds");

    IERC721(listing.token).transferFrom(
      address(this),
      msg.sender,
      listing.tokenId
    );
    payable(listing.seller).transfer(listing.price);

    emit Sale(
      listing.seller,
      msg.sender,
      listing.token,
      listing.tokenId,
      listing.price,
      _id
    );
  }

  function cancel(uint256 _id) public {
    Listing storage listing = listings[_id];

    require(listing.status == ListingStatus.Active, "Listing is not active");
    require(
      msg.sender == listing.seller,
      "Must be the owner to cancel listing"
    );

    listing.status = ListingStatus.Cancelled;
    IERC721(listing.token).transferFrom(
      address(this),
      msg.sender,
      listing.tokenId
    );

    emit Cancel(msg.sender, listing.token, listing.tokenId);
  }
}
