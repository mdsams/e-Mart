import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signup, signIn } from '@/src/services/authAPI';
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

export const signInFucntion = createAsyncThunk('/login', async (args: authVerification) => {
	const { email, password } = args;
	return await signIn(email, password);
});

const authSlice = createSlice({
	name: 'user-signup',
	initialState,
	reducers: {
		logout: (state) => {
			state.userToken = null;
			state.loading = false;
			state.error = '';
		},
	},
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
		builder.addCase(signInFucntion.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(signInFucntion.fulfilled, (state, action: PayloadAction<any>) => {
				(state.loading = false), (state.userToken = action.payload.token), (state.error = '');
			}),
			builder.addCase(signInFucntion.rejected, (state, action) => {
				(state.loading = false), (state.userToken = null), (state.error = action.error.message || 'something went wrong');
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
