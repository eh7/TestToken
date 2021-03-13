//const StringToUintMap = artifacts.require("../lib/StringToUintMap.sol");
const Test = artifacts.require("Test");
const Token = artifacts.require("Token");
const TestToken2 = artifacts.require("TestToken2");

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

  // const sDate = new Date(2021, 2, 13);
  const sDate = new Date(2021, 2, 31);
  const startDateInUnixTimestamp = sDate / 1000;
  // console.log('dddddddddddddddddddddddddd', startDateInUnixTimestamp);
  // console.log('dddddddddddddddddddddddddd', endDateInUnixTimestamp);
  deployer.deploy(Test, startDateInUnixTimestamp);
  deployer.deploy(TestToken2, startDateInUnixTimestamp, 1000, 2);

  //deployer.deploy(Test);
//  deployer.deploy(Token);

};
