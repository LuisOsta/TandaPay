import { ENABLE_WEB3 } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case ENABLE_WEB3:
      return action.payload || false;
    default:
      return state;
  }
}
