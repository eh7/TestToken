pragma solidity ^0.5.0;

contract TestToken {
  string  public name = "TestToken";
  string  public symbol = "Test";
  uint256 public totalSupply;
  uint8   public decimals = 0;

  uint256 priceUSDForToken;

  address public owner;

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

  constructor(uint256 _initialSupply, uint256 _initialUSDForToken) public {
    owner = msg.sender;
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
    priceUSDForToken = _initialUSDForToken;
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
