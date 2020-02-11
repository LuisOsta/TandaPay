const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const DaiContract = require("../build/contracts/DaiContract.json");

const mnemonic = require("../config/dev").mnemonic;
const infuraKey = "e300c669a13a44a2aff60b7fee7e62f4";
const contractAddress = "0xF35a71868f2c6649277bcb8993Eb0338484DEeF8";
const provider = new HDWalletProvider(
  mnemonic,
  `https://rinkeby.infura.io/v3/${infuraKey}`
);
const web3 = new Web3(provider);
const instance = new web3.eth.Contract(DaiContract.abi, contractAddress);
//PUBLIC BACKEND ADDRESS - 0x1e615bffD84199dE2851bB4c2d9AE204faA01a29
//cannot unmarshal invalid hex string
const getBalance = async () => {
  const accounts = await web3.eth.getAccounts();
  const balance = await instance.methods.balanceOf(accounts[0]).call();
  console.log(balance);
};

const mint = async () => {
  const accounts = await web3.eth.getAccounts();
  const res = await instance.methods.mint(accounts[0], "5000").send({
    from: accounts[0]
  });
  console.log(res);
};

const transferFromMinter = async () => {
  const accounts = await web3.eth.getAccounts();
  const res = await instance.methods
    .transfer("0xB1874366E980dF2E7FEddc63c4D6C4E2EDCCa504", "1000")
    .send({
      from: accounts[0]
    });
  console.log(res);
};

transferFromMinter();
