const TestToken = artifacts.require("TestToken");
// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
  deployer.deploy(TestToken, 1000, 2);
//  deployer.deploy(ConvertLib);
//  deployer.link(ConvertLib, MetaCoin);
//  deployer.deploy(MetaCoin);
};
