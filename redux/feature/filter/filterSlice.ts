import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OptionType = {
  value: string;
  label: string;
};

// Define the initial state
interface FilterState {
  search: string;
  province_uuid: string;
  page: number;
  selectedUniversity: OptionType | null; // Ensure this is correctly typed
}

const initialState: FilterState = {
  search: '',
  province_uuid: '',
  page: 1,
  selectedUniversity: null, // Initialize with null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1; // Reset page when search changes
    },
    setProvince: (state, action: PayloadAction<string>) => {
      state.province_uuid = action.payload;
      state.page = 1; // Reset page when province changes
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedUniversity(state, action: PayloadAction<OptionType | null>) {
        state.selectedUniversity = action.payload;
      },
  },
});

export const { setSearch, setProvince, setPage, setSelectedUniversity } =
  filterSlice.actions;

export default filterSlice.reducer;
