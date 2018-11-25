pragma solidity ^0.4.24;

contract MarketPlace {
  struct Listing {
    uint id;
    string name;
    string link;
  }

  mapping(uint => Listing) public listings;
  
  uint public listingCount;

  function  MarketPlace () public {
    addListing('Google', 'https://google.com');
    addListing('Etherium', 'https://ethereum.org');
  }

  function addListing(string _name, string _link) public {
    listingCount++;
    listings[listingCount] = Listing(listingCount, _name, _link);
  }
}
