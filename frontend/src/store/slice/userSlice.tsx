import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  username: null,
  password: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.password = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
