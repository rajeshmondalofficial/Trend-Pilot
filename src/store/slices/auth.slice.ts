import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";

type AuthInitialStateI = {
  status: string;
  session?: Session;
};
const initialState: AuthInitialStateI = { status: "" };

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthSession(state, action) {
      state.status = action.type;
      state.session = action.payload;
    },
  },
});

export const { setAuthSession } = authSlice.actions;

export default authSlice.reducer;
