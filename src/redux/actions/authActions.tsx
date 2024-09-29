import { AppDispatch } from '../store/store';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../types/authTypes';

interface SignupData {
	email: string;
	password: string;
	confirmPassword: string;
}

// Action Creators
export const signup = (data: SignupData) => async (dispatch: AppDispatch) => {
	try {
		dispatch({ type: SIGNUP_REQUEST });

		// Simulate a signup API call (replace with actual API call)
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// If signup is successful, dispatch success action
		dispatch({ type: SIGNUP_SUCCESS, payload: { email: data.email } });
	} catch (error) {
		// If an error occurs, dispatch failure action
		dispatch({ type: SIGNUP_FAILURE, payload: error });
	}
};
