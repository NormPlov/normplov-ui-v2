import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OptionType = {
  value: string;
  label: string;
};

// Define the initial state
interface JobsState {
  search: string;
  page: number;
  selectedCategory: OptionType | null; // Add selectedCategory filter
  selectedLocation: OptionType | null; // Add selectedLocation filter
  selectedJobType: OptionType | null; // Add selectedJobType filter
}

const initialState: JobsState = {
  search: "",
  page: 1,
  selectedCategory: null, // Initialize with null
  selectedLocation: null, // Initialize with null
  selectedJobType: null, // Initialize with null
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1; // Reset page when search changes
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<OptionType | null>) {
      state.selectedCategory = action.payload;
      state.page = 1; // Reset page when category changes
    },
    setSelectedLocation(state, action: PayloadAction<OptionType | null>) {
      state.selectedLocation = action.payload;
      state.page = 1; // Reset page when location changes
    },
    setSelectedJobType(state, action: PayloadAction<OptionType | null>) {
      state.selectedJobType = action.payload;
      state.page = 1; // Reset page when job type changes
    },
  },
});

export const { setSearch, setPage, setSelectedCategory,setSelectedLocation,setSelectedJobType } = jobsSlice.actions;

export default jobsSlice.reducer;
