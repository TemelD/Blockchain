const MarriageContract = artifacts.require("MarriageContract");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(MarriageContract, accounts[0], accounts[1]);
};

