const TestToken2 = artifacts.require("TestToken2");

contract('TestToken2', async (accounts) => {

  it('should create TestToken2 owned by first accounti and associated tests', async () => {
/*
    const date = (new Date("2021/3/31"));
    const startDateInUnixTimestamp = date / 1000;
*/
    const testInstance = await TestToken2.deployed();
    const owner = await testInstance.owner();
    // console.log(owner);
    assert.equal(owner, accounts[0], `OWNER ERR - ${owner} doesn't mattch ${accounts[0]}`);

    let startDate = await testInstance.startDate();
//    let endDate   = await testInstance.endDate();
    assert.equal(startDate.toString(), '1617145200', `START DATE ERR`);
//    assert.equal(endDate.toString(), '1617231600', `END DATE ERR`);
/*
    console.log(
      "dates: ",
      startDate.toString(),
      endDate.toString(),
    );
*/

    let out = await testInstance.blacklistAdd(accounts[1]);
    // console.log(out.logs[0].args.blacklist);
    let check = await testInstance.blacklist(0);
    // console.log(check);

    out = await testInstance.blacklistAdd(accounts[2]);
    // console.log(out.logs[0].args.blacklist);
    check = await testInstance.blacklist(1);
    // console.log(check);

    try {
      check = await testInstance.blacklist(2);
    }
    catch (error) {
      // console.log('error');
    }

    try {
      out = await testInstance.blacklistRemove(accounts[1], { from: accounts[1] });
    }
    catch (error) {
      // console.log('error - remove wrong owner');
    }
    out = await testInstance.blacklistRemove(accounts[1], { from: accounts[0] });
    // console.log(out.logs[0].args.blacklist);

    out = await testInstance.totalSupply();
    // console.log(out);

    try {
      await testInstance.mint(2);
      out = await testInstance.totalSupply();
      // console.log(out);
    }
    catch (error) {
      // console.log('error - mint msg.sender startDate in future -> ', startDate.toString());
    }

    // this sets startDate to past so minting is allowed for testing.
    const sDate = new Date(2021, 2, 13);
    const newStartDateInUnixTimestamp = sDate / 1000;
    try {
      await testInstance.setStartDate(newStartDateInUnixTimestamp, { from: accounts[1] });
    }
    catch (error) {
      // console.log('info - user not owner error');
    }
    await testInstance.setStartDate(newStartDateInUnixTimestamp);
    // console.log('info - mint msg.sender set startDate in pass to test minting -> ', startDate.toString());

    try {
      await testInstance.mint(2);
      out = await testInstance.totalSupply();
      // console.log(out);
    }
    catch (error) {
      // console.log('error - mint msg.sender in blacklist -> ', accounts[0]);
    }

    try {
      await testInstance.mint(2, { from: accounts[1] });
      out = await testInstance.totalSupply();
      // console.log(out);
    }
    catch (error) {
      // console.log('error - mint msg.sender in blacklist -> ', accounts[1]);
    }

    try {
      await testInstance.mint(2, { from: accounts[2] });
      out = await testInstance.totalSupply();
      // console.log(out);
    }
    catch (error) {
      // console.log('error - mint msg.sender in blacklist -> ', accounts[0]);
    }

    out = await testInstance.totalSupply();
    // console.log(out);
  })

});


contract('TestToken2 ERC-20 tests', async (accounts) => {

  it('should create TestToken owned by first account, have 1000 token in supply, and all 1000 assigned to accounts[0]', async () => {
    const amount = 1000;
    const rateUSD = 2;
    const testTokenInstance = await TestToken2.deployed(amount, rateUSD);
    const supply = await testTokenInstance.totalSupply();
    assert.equal(supply, amount, `SUPPLY AMOUT ERR - ${amount} wasn't in the first account`);
    const owner = await testTokenInstance.owner();
    assert.equal(owner, accounts[0], `OWNER ERR - ${owner} doesn't mattch ${accounts[0]}`);
    const balance = await testTokenInstance.balanceOf(accounts[0]);
    assert.equal(balance, amount, `BALANCE ERR - ${balance} doesn't mattch ${amount}`);
  });

  // test for ERC-20 compliance
  it('ERC-20 compliance', async () => {
    const amount = 1000;
    const rateUSD = 2;
    const testTokenInstance = await TestToken2.deployed(amount, rateUSD);

    await testTokenInstance.transfer(accounts[1], 10);
    let balance1 = await testTokenInstance.balanceOf(accounts[1]);
    assert.equal(balance1, 10, `BALANCE ERR - ${balance1} doesn't mattch ${10}`);

    // approve then | check allows | check transferFrom 
    await testTokenInstance.approve(accounts[1], 10, { from:accounts[0] });
    await testTokenInstance.transferFrom(accounts[0], accounts[2], 1, { from: accounts[1] });
    let balance0 = await testTokenInstance.balanceOf(accounts[0], { from: accounts[1] });
    balance1 = await testTokenInstance.balanceOf(accounts[1], { from: accounts[1] });
    let balance2 = await testTokenInstance.balanceOf(accounts[2], { from: accounts[1] });
    assert.equal(balance0, 989, `BALANCE ERR - ${balance0} doesn't mattch ${989}`);
    assert.equal(balance1, 10, `BALANCE ERR - ${balance1} doesn't mattch ${10}`);
    assert.equal(balance2, 1, `BALANCE ERR - ${balance2} doesn't mattch ${1}`);

    let remaining = await testTokenInstance.allowance(accounts[0], accounts[1]);
    assert.equal(remaining, 9, `REMAINING ERR - ${remaining} doesn't mattch ${9}`);
  });
  
  it('test USD rate function get/set/USDMintedTokens', async () => {
    const amount = 1000;
    const defaultRateUSD = 2;
    const testTokenInstance = await TestToken2.deployed(amount, defaultRateUSD);

    assert.equal(defaultRateUSD, 2, `RATE_USD ERR - defaultRateUSD`);

    let rateUSD = await testTokenInstance.getTokenUSDRate({ from: accounts[0] });
    assert.equal(rateUSD, defaultRateUSD, `RATE_USD ERR - getTokenUSDRate`);
    
    await testTokenInstance.setTokenUSDRate(3, { from: accounts[0] });
    rateUSD = await testTokenInstance.getTokenUSDRate({ from: accounts[0] });
    assert.equal(rateUSD, 3, `RATE_USD ERR - 3`);

    let mintedUSDValue = await testTokenInstance.getTotalUSDPriceMintedTokens({ from: accounts[0] });
    assert.equal(mintedUSDValue, 3000, `RATE_USD ERR - mintedUSDValue`);

    try {
      mintedUSDValue = await testTokenInstance.getTotalUSDPriceMintedTokens({ from: accounts[1] });
      console.log(mintedUSDValue);
    }
    catch (error) {
      assert(error != '', `MINTED_USD_TOTAL USER ERR - mintedUSDValue`);
    }

  });

  it('test Blacklist library', async () => {
    const amount = 1000;
    const defaultRateUSD = 2;
    const instance = await TestToken2.deployed(amount, defaultRateUSD);

    // console.log('blacklist:', await instance.blacklist());
  });

});
