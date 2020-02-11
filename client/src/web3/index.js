import Web3 from "web3";
import Fortmatic from "fortmatic";
import DaiContract from "./contracts/DaiContract.json";
const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_ID);

/**
 * @summary
 * @param {Object} user
 * @global
 */
const attemptConnection = async user => {
  const { walletProvider } = user;
  if (walletProvider === "metamask") {
    await connectToMetamask();
  } else {
    await connectToFortmatic();
  }

  return window.web3;
};
/**
 * @summary
 * @global
 */
const connectToMetamask = async () => {
  if (window.ethereum) {
    try {
      let accounts = [];
      if (window.ethereum.selectedAddress === undefined) {
        accounts = await window.ethereum.enable();
      }
      //try to set this before
      window.web3 = new Web3(window.ethereum);
      return [accounts, null];
    } catch (error) {
      //User rejected account access
      return [null, "There's been an error"];
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return ["success", null];
  } else {
    //account doesn't have metamask
    return [null, "There's been an error"];
  }
};

/**
 * @summary
 * @global
 */
const connectToFortmatic = async () => {
  try {
    window.web3 = new Web3(fm.getProvider());
    const accounts = await window.web3.currentProvider.enable();
    return [accounts, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};

/**
 * @summary
 * @global
 */
const currentProvider = () => {
  //if web3 in the window isn't defined
  if (!window.web3) {
    return "";
  }
  try {
    const currentProvider = window.web3.currentProvider;
    let wallet = "";
    if (currentProvider.isFortmatic) {
      wallet = "fortmatic";
    } else if (currentProvider.host === "metamask") {
      wallet = "metamask";
    }

    return wallet;
  } catch (error) {
    return "";
  }
};

/**
 * @summary - Queries the contract deployed by DAI to determine the amount of DAI the current user currently has
 * @global
 */
const getDAIBalance = async (web3, DAI) => {
  //
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await DAI.methods.balanceOf(accounts[0]).call();
    return [balance, null];
  } catch (e) {
    return [null, e];
  }
};

/**
 * @summary
 * @param {Object} web3
 * @returns {Web3.Contract} returns a new instance of the DAI contract created with the provided web3 instance
 */
const createDAIContract = web3 => {
  return new web3.eth.Contract(
    DaiContract.abi,
    process.env.REACT_APP_DAI_ADDRESS
  );
};

export {
  connectToMetamask,
  connectToFortmatic,
  currentProvider,
  attemptConnection,
  getDAIBalance,
  createDAIContract
};
