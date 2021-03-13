pragma solidity >=0.4.22 <0.7.0;

import "./Ownable.sol";

library BlacklistLib2 {

  function lengthOf(address[] storage self) view internal returns (uint256) {
    return self.length;
  }

  function add(address[] storage blacklist, address blockAddress) internal {
    blacklist.push(blockAddress);
  }

  function remove(address[] storage blacklist, address thisAddress) internal {
    // blacklist.push(blockAddress);
    for (uint i = 0; i < blacklist.length; i++)
      if (blacklist[i] == thisAddress) {
        // address element = blacklist[i];
        blacklist[i] = blacklist[blacklist.length - 1];
        delete blacklist[blacklist.length - 1];
        blacklist.length--;
        // return element;
      }
  }

  function check(address[] storage blacklist, address thisAddress) view internal returns (bool status) {
    for (uint i = 0; i < blacklist.length; i++)
      if (blacklist[i] == thisAddress)
        return true;
    return false;
  }
}

// contract Test {
contract TestToken2 is Ownable {

  string  public name = "TestToken";
  string  public symbol = "Test";
  uint256 public totalSupply;
  uint8   public decimals = 0;

  uint256 priceUSDForToken;

  address[] public blacklist;
  using BlacklistLib2 for *;

//  address public owner;
//  uint256 public totalSupply;
  uint256 public startDate;

  event LogBL(address[] blacklist);

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowed;

  constructor(uint256 _startDate, uint256 _initialSupply, uint256 _initialUSDForToken) public {
 //   owner = msg.sender;
    totalSupply = 0;
    startDate = _startDate;

    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
    priceUSDForToken = _initialUSDForToken;
  }

  function setStartDate(uint256 _startDate) public returns (bool status) {
    require(owner == msg.sender);
    startDate = _startDate;
    return true;
  }

  function lengthBlacklist() view public returns (uint length) {
    return blacklist.lengthOf();
    // return length;
  }

  function blacklistAdd(address to) public returns (bool success) {
    require(owner == msg.sender);
    // require(block.timestamp >= startDate);
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
    require(block.timestamp >= startDate);
    totalSupply = totalSupply + amount;
    return true;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowed[_from][msg.sender]);
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowed[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

  function getTokenUSDRate() public view returns (uint256 price) {
    return priceUSDForToken;
  }

  function setTokenUSDRate(uint256 _rate) public returns (bool success) {
    // QUESTIONS: should this function be only accessed
    // by the contract owner?
    // currently anyone can set this!
    priceUSDForToken = _rate;
    return true;
  }

  function getTotalUSDPriceMintedTokens() public view returns (uint256 price) {
    // check if contract owner if not throw
    require(owner == msg.sender);
    return (totalSupply * priceUSDForToken);
  }
}
