//const StringToUintMap = artifacts.require("../lib/StringToUintMap.sol");
const Test = artifacts.require("Test");
const Token = artifacts.require("Token");

module.exports = function(deployer) {

  /*
  deployer.then(async () => {
    await deployer.deploy(Test)
  })
  */

  // deployer.deploy(Test);

/*
  deployer.deploy(StringToUintMap);
  deployer.link(StringToUintMap, Test);
  deployer.deploy(Test);
*/

  deployer.deploy(Test);
  deployer.deploy(Token);

};
