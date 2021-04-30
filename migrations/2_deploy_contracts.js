const BN = require('bignumber.js')

const KokomoToken = artifacts.require("KokomoToken")
const SyrupBar = artifacts.require("SyrupBar")
const MasterChef = artifacts.require("MasterChef")
const Multicall = artifacts.require("Multicall")

const teamaddr = '0x8091a375A9fd84363d73Df3851E5A8469904c011'
const bdaddr = '0x27e33779DdD5EeF58F72862e2FA6EEA1c4b02858'
const initliquidityaddr = '0xd289B2Fc55387A5bD18e58A1007D0251152e18e9'
const kokomoPerBlock = new BN(40 * 10 ** 18).toString()
const startBlock = 8419483

// "0xAC3Df9d993fB70f471D19Eb142c150CEb992fB2C","0x5B719b5636962bc5c9dfAA8d915296f07671AE79","0x8091a375A9fd84363d73Df3851E5A8469904c011","0x27e33779DdD5EeF58F72862e2FA6EEA1c4b02858","0xd289B2Fc55387A5bD18e58A1007D0251152e18e9","40000000000000000000","8419483"

module.exports = async function(deployer) {
  await deployer.deploy(Multicall)
  const multicall = await Multicall.deployed()

  await deployer.deploy(KokomoToken)
  const kokomoToken = await KokomoToken.deployed()

  await deployer.deploy(SyrupBar, kokomoToken.address)
  const syrupbar = await SyrupBar.deployed()

  await deployer.deploy(
    MasterChef, 
    kokomoToken.address,
    syrupbar.address,
    teamaddr,
    bdaddr,
    initliquidityaddr,
    kokomoPerBlock,
    startBlock,
  )

  const masterchef = await MasterChef.deployed()

  await kokomoToken.transferOwnership(masterchef.address)
  await syrupbar.transferOwnership(masterchef.address)
};
