import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const PROXY = "https://cors-anywhere.herokuapp.com/";

// Async thunk — fetches menu for a specific restaurant ID
// Skips fetch if data for this ID is already in the store (caching)
export const fetchMenu = createAsyncThunk(
  "menuSlice/fetchMenu",
  async (restaurantId, { getState, rejectWithValue }) => {
    // --- Cache check: don't re-fetch if already loaded ---
    const existing = getState().menuSlice.menus[restaurantId];
    if (existing) return { restaurantId, menuData: existing };

    try {
      const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.08120&lng=72.82780&restaurantId=${restaurantId}`;
      const response = await fetch(PROXY + swiggyAPI);
      const data = await response.json();
      const tempData =
        data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      if (!tempData) throw new Error("Menu data not found");
      const filterData = tempData.filter(
        (item) => "title" in item?.card?.card
      );
      return { restaurantId, menuData: filterData };
    } catch (err) {
      return rejectWithValue();
    }
  }
);

// Async thunk — searches dishes within a restaurant
export const searchDishes = createAsyncThunk(
  "menuSlice/searchDishes",
  async ({ restaurantId, query }, { rejectWithValue }) => {
    try {
      const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl/search?lat=19.08120&lng=72.82780&restaurantId=${restaurantId}&query=${query}&submitAction=ENTER`;
      const response = await fetch(PROXY + swiggyAPI);
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const MenuSlice = createSlice({
  name: "menuSlice",
  initialState: {
    menus: {},          // { [restaurantId]: menuData[] } — cached per restaurant
    menuStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    menuError: null,
    currentRestaurantId: null,

    searchResults: [],
    searchStatus: "idle",
    searchError: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchStatus = "idle";
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    // --- fetchMenu ---
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.menuStatus = "loading";
        state.menuError = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        const { restaurantId, menuData } = action.payload;
        state.menuStatus = "succeeded";
        state.currentRestaurantId = restaurantId;
        state.menus[restaurantId] = menuData; // cache it
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.menuStatus = "failed";
        state.menuError = action.payload;
      });

    // --- searchDishes ---
    builder
      .addCase(searchDishes.pending, (state) => {
        state.searchStatus = "loading";
        state.searchError = null;
      })
      .addCase(searchDishes.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchDishes.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.payload;
      });
  },
});

export const { clearSearch } = MenuSlice.actions;
export default MenuSlice.reducer;
