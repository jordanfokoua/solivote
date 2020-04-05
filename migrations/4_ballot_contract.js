var Ballot = artifacts.require("./Ballot.sol");

module.exports = function(deployer) {
  deployer.deploy(Ballot, ['0x6a0aaECB741343726663442D149132964c4dbe1e']);
};
