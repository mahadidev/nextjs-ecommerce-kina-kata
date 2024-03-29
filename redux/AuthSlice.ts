import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	user: {
		_id: string;
		name: string;
		email: string;
		password?: string;
		image: string;
	};
}

const initialState: CounterState = {
	user: null,
};

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authLogin: (state, action: any) => {
			state.user = action.payload
				? {
						_id: action.payload._id,
						name: action.payload.name,
						email: action.payload.email,
						image: action.payload.image,
				  }
				: null;
		},
	},
});

export default AuthSlice.reducer;
export const { authLogin } = AuthSlice.actions;
