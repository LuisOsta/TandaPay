import { FETCH_CLAIMS } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_CLAIMS:
			return action.payload || false;
		default:
			return state;
	}
}
