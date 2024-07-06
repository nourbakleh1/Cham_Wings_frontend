import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dob: "",
  country: "",
  language: "",
  countryCode: "",
  mobile: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm(state) {
      return initialState;
    },
  },
});

export const { updateField, resetForm } = registerSlice.actions;
export default registerSlice.reducer;
