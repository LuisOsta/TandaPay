import axios from "axios";
import { FETCH_USER } from "./types";

/**
 * @summary This is the basic action creator called at the initial loading of the dashboard. It will be used to check the authenticated state of the current user.
 * The API endpoint will only check the validity of the current token and the DB whitelist of auth tokens.
 * It will then update the redux store with the received user object in the response.
 * ! @todo Improve the error handling
 */
export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get("/auth/me", {
      withCredentials: true
    });
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {}
};

/**
 * @summary This will be called in the registration form, for users without an account.
 * It will create an API call to the backend to create a new account,
 * which will have to be finalized after the sign up process has been completed.
 * It will update the user object with the received user object from the response.
 * ! @todo Improve the error handling
 */
export const signUp = body => async dispatch => {
  try {
    const response = await axios.post("/auth/signup", body);
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {}
};

/**
 * @summary This function will be called in the registration form, for user with pre-existing accounts(both finalized and otherwise).
 * It will create and API call to the backend to log the user in with the provided credentials.
 * Afterwards, it will update the redux store with the updated user object from the response.
 * The HOCs will route the user to either the admin page or the setup page depending on the state of their account.
 * @param {Object} body
 * ! @todo Improve the error handling
 */
export const logIn = body => async dispatch => {
  const response = await axios.post("/auth/login", body);
  dispatch({ type: FETCH_USER, payload: response.data });
};

/**
 * @summary The function will be called from the admin dashboard. It will create an API call to the backend
 * which will delete the auth cookie from the header and the DB whitelist.
 * If the response is successful, it will logout the user out and route them to the base registration page.
 * Otherwise it should notify them of the issue
 * ! @todo Improve the error handling
 */
export const logOut = () => async dispatch => {
  try {
    await axios.post("/auth/logout", {
      withCredentials: true
    });

    dispatch({ type: FETCH_USER, payload: undefined });
  } catch (error) {
    console.error(error);
  }
};

// * USER ROUTES!!!
/**
 * @summary If the user cancels out of the setup process, this action creator will be called.
 * It will create an API call to the backend which will delete the partially created user account from the backend
 * ! @todo Improve the error handling
 */
export const cancelAccount = () => async dispatch => {
  try {
    await axios.delete("/user/delete", { withCredentials: true });

    dispatch({ type: FETCH_USER, payload: null });
  } catch (e) {}
};

/**
 * @summary The action creator called during the 'setup' process(after the account has been created but before the role and initial wallet providers are chosen).
 * This will receive the body object provided by the setup submit function and passed to the API backend.
 * It will update the user object from the response in the event of a success.
 * ! @todo Improve the error handling
 * @param {{role: String, accessCode: String, walletProvider: String, ethAddress: String}} body - the body object provided by the setup submit function.
 * It will have the role the user is signing up as, the appropriate access code if they're joining as a policyholder, the walletProvider chosen and the appropriate ethAddress
 */
export const completeAccount = body => async dispatch => {
  try {
    await axios.patch("/user/complete", body, {
      withCredentials: true
    });

    const response = await axios.get("/auth/me", {
      withCredentials: true
    });

    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (e) {
    console.log(e.response);
  }
};

/**
 * @summary A function called by the wallet providers function in the advanced settings.
 * It will retrieve the ethereum address and the new provider from the body object and create and API call to the backend to patch the user profile.
 * ! @todo improve the error handling
 * @param {Object} body body object from the form that contains the ethereum Addresss (string) and the wallet provider (string)
 */
export const updateWallet = body => async dispatch => {
  const { provider, ethAddress } = body;
  try {
    const url = `/user/wallet`;
    const response = await axios.patch(
      url,
      { provider, ethAddress },
      {
        withCredentials: true
      }
    );
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

/**
 * @summary The action creator called by the onSubmit function in the basic settings page.
 * It will parse the values sent in the body object and create an API call
 * to the backend to patch the user profile as appropriate with the required information.
 * In the event of a success, it will return the response object, otherwise
 * it will return the error message provided in the response
 * @param {Object} body updated profile settings value provided by the user
 * @returns {Array} [response, error]
 */
export const updateSettings = body => async dispatch => {
  try {
    const { name, email, oldPassword, newPassword, phone } = body;
    const url = `/user/profile`;
    const response = await axios.patch(
      url,
      { name, email, oldPassword, newPassword, phone },
      {
        withCredentials: true
      }
    );
    dispatch({ type: FETCH_USER, payload: response.data });
    return [response, null];
  } catch (error) {
    return [null, error.response.data.error];
  }
};
