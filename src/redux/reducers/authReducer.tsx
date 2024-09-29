import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../types/authTypes';

interface AuthState {
	loading: boolean;
	isAuthenticated: boolean;
	user: null | { email: string };
	error: string | null;
}

const initialState: AuthState = {
	loading: false,
	isAuthenticated: false,
	user: null,
	error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case SIGNUP_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
