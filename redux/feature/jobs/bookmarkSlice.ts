import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  bookmarks: Record<string, boolean>; // Dictionary of UUIDs to bookmark status
  toggle: boolean; // Boolean toggle property
}

const initialState: BookmarkState = {
  bookmarks: {}, // Ensure it's an object
  toggle: false, // Default value toggle: false, // Default value
  
};


const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setBookmark: (
      state,
      action: PayloadAction<{ uuid: string; isBookmarked: boolean }>
    ) => {
      const { uuid, isBookmarked } = action.payload;

      // Ensure bookmarks object exists
      //if (!state.bookmarks) {
      //  state.bookmarks = {};
      //}



      // Update the bookmark status
      state.bookmarks[uuid] = isBookmarked;
    },
    setToggle: (state) => {
      if (typeof state.toggle !== "boolean") {
        console.error("Error: `toggle` property is not initialized.");
        return;
      }
      state.toggle = !state.toggle; // Safely flip the toggle value
    },
  },
});

export const { setBookmark,setToggle } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
