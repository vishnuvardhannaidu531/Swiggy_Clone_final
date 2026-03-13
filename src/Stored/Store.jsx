import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlicer";
import RestaurantReducer from "./RestaurantSlicer";
import MenuReducer from "./MenuSlicer";

const store = configureStore({
  reducer: {
    cartslice: CartReducer,
    restaurantSlice: RestaurantReducer, // global restaurant list
    menuSlice: MenuReducer,             // global menu data (cached per restaurant)
  },
});

export default store;
