const Test = artifacts.require("Test");

contract('Test', async (accounts) => {

  it('should create Test owned by first account', async () => {
    const testInstance = await Test.deployed();
    const owner = await testInstance.owner();
    // console.log(owner);
    assert.equal(owner, accounts[0], `OWNER ERR - ${owner} doesn't mattch ${accounts[0]}`);

    await testInstance.blacklistAdd(accounts[1]);
    let check = await testInstance.blacklist(0);
    console.log(check);

    await testInstance.blacklistAdd(accounts[2]);
    check = await testInstance.blacklist(1);
    console.log(check);

    try {
      check = await testInstance.blacklist(2);
    }
    catch (error) {
      console.log('error');
    }
  })

});
