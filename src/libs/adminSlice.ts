import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface UserState {
  teacher: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  teacher: false,
};

export const adminSlice = createSlice({
  name: "admin",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTeacher: (state) => {
      state.teacher = true;
    },
    clearTeacher: (state) => {
      state.teacher = false;
    },
  },
});

export const { setTeacher, clearTeacher } = adminSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAdmin = (state: RootState) => state.admin.teacher;

export default adminSlice.reducer;
