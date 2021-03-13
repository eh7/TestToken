pragma solidity >=0.4.22 <0.7.0;

library BlacklistLib {

  function lengthOf(address[] storage self) internal returns (uint256) {
    return self.length;
  }

  function add(address[] storage blacklist, address blockAddress) internal {
    blacklist.push(blockAddress);
  }

  function remove(address[] storage blacklist, address thisAddress) internal {
    // blacklist.push(blockAddress);
    for (uint i = 0; i < blacklist.length; i++)
      if (blacklist[i] == thisAddress) {
        address element = blacklist[i];
        blacklist[i] = blacklist[blacklist.length - 1];
        delete blacklist[blacklist.length - 1];
        blacklist.length--;
        // return element;
      }
  }

  function check(address[] storage blacklist, address thisAddress) internal returns (bool status) {
    for (uint i = 0; i < blacklist.length; i++)
      if (blacklist[i] == thisAddress)
        return true;
    return false;
  }
}

contract Test {

  address[] public blacklist;
  using BlacklistLib for *;

  address public owner;
  uint256 public totalSupply;

  event LogBL(address[] blacklist);

  constructor() public {
    owner = msg.sender;
    totalSupply = 0;
    // blacklist.add(msg.sender);
    // blacklist.add(msg.sender);
  }

  function lengthBlacklist() public returns (uint length) {
    return blacklist.lengthOf();
    // return length;
  }

  function blacklistAdd(address to) public returns (bool success) {
    require(owner == msg.sender);
    blacklist.add(to);
    emit LogBL(blacklist);
    return true;
  }

  function blacklistRemove(address removeAddress) public returns (bool success) {
    require(owner == msg.sender);
    blacklist.remove(removeAddress);
    emit LogBL(blacklist);
    return true;
  }

  function mint(uint amount) public returns (bool success) {
    require(!blacklist.check(msg.sender));
    totalSupply = totalSupply + amount;
    return true;
/*
    if(blacklist.check(msg.sender)) {
      totalSupply = totalSupply + amount;
      return true;
    }
    return false;
*/
  }

/*
  function indexOfAddressBlacklist(address to) public returns (uint index) {
//    blacklist.indexOf(to);
    return 0;
    // return true;
  }
*/

}
