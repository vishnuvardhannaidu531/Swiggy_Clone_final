import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "cartslice",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      state.count++;
    },
    IncrementItems: (state, action) => {
      const element = state.items.find((item) => item.id === action.payload.id);
      if (element) {
        element.quantity += 1;
        state.count++;
      }
    },
    DecrementItems: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
        state.count--;
      }
    },
  },
});

export const { addItems, IncrementItems, DecrementItems } = Cart.actions;
export default Cart.reducer;
