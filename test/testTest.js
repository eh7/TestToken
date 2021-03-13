const Test = artifacts.require("Test");

contract('Test', async (accounts) => {

  it('should create Test owned by first account', async () => {
/*
    const date = (new Date("2021/3/31"));
    const startDateInUnixTimestamp = date / 1000;
*/
    const testInstance = await Test.deployed();
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
