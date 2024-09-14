import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
    id: string;
    name: string;
    balance: string;
}

interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
        }
    },
});

export const { setUser, setToken, clearAuth } = userSlice.actions;
export type { User };
export default userSlice.reducer;