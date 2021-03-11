const TestToken = artifacts.require("TestToken");

contract('TestToken', async (accounts) => {


  it('should create TestToken owned by first account, have 1000 token in supply, and all 1000 assigned to accounts[0]', async () => {
    const amount = 1000;
    const rateUSD = 2;
    const testTokenInstance = await TestToken.deployed(amount, rateUSD);
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
    const testTokenInstance = await TestToken.deployed(amount, rateUSD);

    await testTokenInstance.transfer(accounts[1], 10);
    let balance1 = await testTokenInstance.balanceOf(accounts[1]);
    // console.log(balance1);
    assert.equal(balance1, 10, `BALANCE ERR - ${balance1} doesn't mattch ${10}`);

    // approve then | check allows | check transferFrom 
    await testTokenInstance.approve(accounts[1], 10, { from:accounts[0] });
    await testTokenInstance.transferFrom(accounts[0], accounts[2], 1, { from: accounts[1] });
    let balance0 = await testTokenInstance.balanceOf(accounts[0], { from: accounts[1] });
    balance1 = await testTokenInstance.balanceOf(accounts[1], { from: accounts[1] });
    let balance2 = await testTokenInstance.balanceOf(accounts[2], { from: accounts[1] });
    // console.log(balance0.toString());
    // console.log(balance1.toString());
    // console.log(balance2.toString());
    assert.equal(balance0, 989, `BALANCE ERR - ${balance0} doesn't mattch ${989}`);
    assert.equal(balance1, 10, `BALANCE ERR - ${balance1} doesn't mattch ${10}`);
    assert.equal(balance2, 1, `BALANCE ERR - ${balance2} doesn't mattch ${1}`);

    let remaining = await testTokenInstance.allowance(accounts[0], accounts[1]);
    // console.log(remaining.toString());
    assert.equal(remaining, 9, `REMAINING ERR - ${remaining} doesn't mattch ${9}`);
  });
  
  it('test USD rate function get/set/USDMintedTokens', async () => {
    const amount = 1000;
    const defaultRateUSD = 2;
    const testTokenInstance = await TestToken.deployed(amount, defaultRateUSD);

    assert.equal(defaultRateUSD, 2, `RATE_USD ERR - defaultRateUSD`);

    let rateUSD = await testTokenInstance.getTokenUSDPrice({ from: accounts[0] });
    assert.equal(rateUSD, defaultRateUSD, `RATE_USD ERR - getTokenUSDPrice`);
    
    // console.log("rateUSD:", rateUSD.toString());

    await testTokenInstance.setTokenUSDPrice(3, { from: accounts[0] });
    // console.log("setTokenUSDPrice:", 3);
    rateUSD = await testTokenInstance.getTokenUSDPrice({ from: accounts[0] });
    // console.log("getTokenUSDPrice:", rateUSD.toString());
    assert.equal(rateUSD, 3, `RATE_USD ERR - 3`);

    let mintedUSDValue = await testTokenInstance.getTotalUSDPriceMintedTokens({ from: accounts[0] });
    // console.log("mintedUSDValue:", mintedUSDValue.toString());
    assert.equal(mintedUSDValue, 3000, `RATE_USD ERR - mintedUSDValue`);
  });

});
