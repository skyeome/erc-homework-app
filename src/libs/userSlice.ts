import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface UserState {
  uid: string | null;
  name: string | null;
  level: string | null;
  teacher: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  uid: null,
  name: null,
  level: null,
  teacher: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.level = action.payload.level;
      state.teacher = action.payload.teacher;
    },
    setTeacher: (state, action: PayloadAction<Pick<UserState, "teacher">>) => {
      state.teacher = action.payload.teacher;
    },
    clearUser: (state) => {
      state.uid = null;
      state.name = null;
      state.level = null;
      state.teacher = false;
    },
  },
});

export const { setUser, setTeacher, clearUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.uid;

export default userSlice.reducer;
