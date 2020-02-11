import axios from "axios";
import { FETCH_GROUP, INVITE_MEMBER } from "./types";

const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * @summary generates the options to use with a request. this is a function
 *          and not a const because the document.cookie may change
 */
function config() {
  return {
    baseURL: API_BASE,
    headers: {
      Authorization: "Bearer " + document.cookie.match(/x-auth=(\S+)/)[1]
    }
  };
}

/**
 * @summary Redux action creator to fetch the user's group
 */
export const fetchGroup = () => async (dispatch, store) => {
  try {
    let { groupID } = store().user;
    if (!groupID) {
      return dispatch({ type: FETCH_GROUP, payload: { _id: null } });
    }

    const group = await axios.get("/groups/" + groupID, config());
    dispatch({ type: FETCH_GROUP, payload: group.data });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @summary Redux action creator to create a group
 */
export const createGroup = ({ name, premium, fileID }) => async dispatch => {
    try {
        const response = await axios.post(
            "/groups/new",
            { groupName: name, premium, charterID: fileID },
            config()
        );

    dispatch({ type: FETCH_GROUP, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @summary Redux action creator to invite a member
 */
export const inviteMember = email => async (dispatch, store) => {
  try {
    let { groupID } = store().user;
    await axios.post(`/groups/${groupID}/invite`, { email }, config());
    dispatch({ type: INVITE_MEMBER, payload: null });
  } catch (err) {
    console.error(err);
  }
};
