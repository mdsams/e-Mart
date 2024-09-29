import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signup } from '@/src/services/authAPI';
type authInitialStateType = {
	userToken: null | string;
	loading: boolean;
	error: string;
};

interface authVerification {
	email: string;
	password: string;
}

const initialState: authInitialStateType = {
	userToken: null,
	loading: false,
	error: '',
};

//Generate pending fulfilled and rejected action type
export const signUpFucntion = createAsyncThunk('/signup', async (args: authVerification) => {
	const { email, password } = args;
	return await signup(email, password);
});

const authSlice = createSlice({
	name: 'user-signup',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signUpFucntion.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(signUpFucntion.fulfilled, (state, action: PayloadAction<any>) => {
				(state.loading = false), (state.userToken = action.payload.token), (state.error = '');
			}),
			builder.addCase(signUpFucntion.rejected, (state, action) => {
				(state.loading = false), (state.userToken = null), (state.error = action.error.message || 'something went wrong');
			});
	},
});

export default authSlice.reducer;
