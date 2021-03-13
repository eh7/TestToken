const TestToken = artifacts.require("TestToken");
// const Test = artifacts.require("Test");

module.exports = function(deployer) {
  deployer.deploy(TestToken, 1000, 2);
//  deployer.deploy(Test);
};
