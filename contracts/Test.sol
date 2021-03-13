pragma solidity >=0.4.22 <0.7.0;

library Blacklist {

  function add(address[] storage blacklist, address blockAddress) internal {
    blacklist.push(blockAddress);
  }

/*
  function remove(address[] storage blacklist, address blockAddress) internal {
    // delete blacklist[blacklist.indexOf(blockAddress)];
    // blacklist.push(blockAddress);
  }

  function indexOf(address[] storage self, address thisAddress) public view returns (uint) {
    for (uint i = 0; i < self.length; i++) if (self[i] == thisAddress) return i;
    return uint(-1);
  }
*/
   

/*
  function add(mapping(address => bool) storage blacklist, address blockAddress) internal {
    blacklist[blockAddress] = true;
  }
*/

/*
    function move(mapping(address => uint256) storage balances, address from, address to, uint amount) internal {
        require(balances[from] >= amount);
        require(balances[to] + amount >= balances[to]);
        balances[from] -= amount;
        balances[to] += amount;
    }
*/
}

contract Test {

  address[] public blacklist;
  using Blacklist for *;
  address public owner;

  constructor() public {
    owner = msg.sender;
    // blacklist.add(msg.sender);
    // blacklist.add(msg.sender);
  }

  function blacklistAdd(address to) public returns (bool success) {
    blacklist.add(to);
    return true;
  }

  function indexOfAddressBlacklist(address to) public returns (uint index) {
//    blacklist.indexOf(to);
    return 0;
    // return true;
  }
/*
*/
/*
    mapping(address => uint256) balances;
    using Balances for *;
    mapping(address => mapping (address => uint256)) allowed;

    event Transfer(address from, address to, uint amount);
    event Approval(address owner, address spender, uint amount);

    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    function transfer(address to, uint amount) public returns (bool success) {
        balances.move(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
        return true;

    }


  }


/*
    mapping(address => uint256) balances;
    using Balances for *;
    mapping(address => mapping (address => uint256)) allowed;

    event Transfer(address from, address to, uint amount);
    event Approval(address owner, address spender, uint amount);

    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    function transfer(address to, uint amount) public returns (bool success) {
        balances.move(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
        return true;

    }

    function transferFrom(address from, address to, uint amount) public returns (bool success) {
        require(allowed[from][msg.sender] >= amount);
        allowed[from][msg.sender] -= amount;
        balances.move(from, to, amount);
        emit Transfer(from, to, amount);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        require(allowed[msg.sender][spender] == 0, "");
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
*/
}
