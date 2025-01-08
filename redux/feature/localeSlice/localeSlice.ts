// Redux Slice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocaleState {
  currentLocale: string;
}

const initialState: LocaleState = {
  currentLocale: "km", // Default locale
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      state.currentLocale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
