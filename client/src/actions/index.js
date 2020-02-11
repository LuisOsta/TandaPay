// import axios from "axios";
import { FETCH_CLAIMS, ENABLE_WEB3 } from "./types";

import claimsData from "../data/claims.json";
import { attemptConnection, createDAIContract } from "../web3";

export const fetchClaims = () => async dispatch => {
  try {
    const claims = claimsData.claims;
    dispatch({ type: FETCH_CLAIMS, payload: claims });
  } catch (error) {}
};

export const createClaim = (summary, files) => async dispatch => {
  try {
    const claims = claimsData.claims;
    console.log("created claim");
    dispatch({ type: FETCH_CLAIMS, payload: claims });
  } catch (error) {}
};

/**
 * @summary
 * @param {Function} dispatch
 * @param {Function} getState
 * ! @todo Add the other contracts to the redux store object
 */
export const connectWeb3 = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const web3 = await attemptConnection(user);
    const DAI = createDAIContract(web3);
    dispatch({ type: ENABLE_WEB3, payload: { web3, DAI } });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @summary
 * @param {Function} dispatch
 * @param {Function} getState
 */
export const changeProvider = () => async (dispatch, getState) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchUser,
  signUp,
  logIn,
  logOut,
  cancelAccount,
  completeAccount,
  updateWallet,
  updateSettings
} from "./user";

export { fetchGroup, createGroup, inviteMember } from "./group";
