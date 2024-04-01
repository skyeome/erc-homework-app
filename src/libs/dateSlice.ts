import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface DateState {
  value: Date;
}

const date = new Date();
if (date.getDay() === 0) date.setDate(date.getDate() + 1);
if (date.getDay() === 6) date.setDate(date.getDate() + 2);

// Define the initial state using that type
const initialState: DateState = {
  value: date,
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
