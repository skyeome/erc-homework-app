import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface DateState {
  value: Date;
}

// Define the initial state using that type
const initialState: DateState = {
  value: new Date(),
};

export const dateSlice = createSlice({
  name: "selectedDate",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateState>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setDate } = dateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.date.value;

export default dateSlice.reducer;
