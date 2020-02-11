import { FETCH_GROUP, FETCH_USER } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_GROUP:
			return action.payload || null;
		case FETCH_USER:
			return null;
		default:
			return state;
	}
}
