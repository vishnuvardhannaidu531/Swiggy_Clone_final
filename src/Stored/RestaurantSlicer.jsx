import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const PROXY = "https://cors-anywhere.herokuapp.com/";
const SWIGGY_REST_API =
  "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.08120&lng=72.82780&carousel=true&third_party_vendor=1";

// Async thunk — fetches restaurant list once and stores it globally
export const fetchRestaurants = createAsyncThunk(
  "restaurantSlice/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(PROXY + SWIGGY_REST_API);
      const data = await response.json();
      const restaurants =
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (!restaurants) throw new Error("No restaurant data found");
      return restaurants;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

const RestaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: {
    restaurants: [],   // all fetched restaurants
    status: "idle",    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default RestaurantSlice.reducer;
