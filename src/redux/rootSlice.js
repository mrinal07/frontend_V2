import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    // Initial state
    loading: false,
    portfolioData: null,
  },
  reducers: {
    // Reducers
    showLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const { showLoading, HideLoading, setPortfolioData,ReloadData } =
  rootSlice.actions;
