const DaiContract = artifacts.require("./DaiContract.sol")
const TPLedger = artifacts.require("./TandaPayLedger.sol")

module.exports = function(deployer) {
    deployer.deploy(DaiContract).then(function(instance) {
        return deployer.deploy(TPLedger, instance.address)
    })
}
