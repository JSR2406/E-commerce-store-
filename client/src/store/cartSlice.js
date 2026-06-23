import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../api/http";
import { logout } from "./authSlice";

const guestCart = JSON.parse(localStorage.getItem("aa_guest_cart") || "[]");

const initialState = {
  items: guestCart,
  status: "idle",
  error: null,
};

const syncGuestCart = (items) => {
  localStorage.setItem("aa_guest_cart", JSON.stringify(items));
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await http.get("/cart");
  return data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ product, quantity }) => {
  const token = localStorage.getItem("aa_token");
  if (token) {
    const { data } = await http.post("/cart", { productId: product._id, quantity });
    return { authenticated: true, item: data };
  }

  return {
    authenticated: false,
    product,
    quantity,
  };
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ itemId, quantity }) => {
  const token = localStorage.getItem("aa_token");
  if (token) {
    const { data } = await http.put(`/cart/${itemId}`, { quantity });
    return { authenticated: true, item: data };
  }

  return { authenticated: false, itemId, quantity };
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ itemId }) => {
  const token = localStorage.getItem("aa_token");
  if (token) {
    await http.delete(`/cart/${itemId}`);
    return { authenticated: true, itemId };
  }

  return { authenticated: false, itemId };
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const token = localStorage.getItem("aa_token");
  if (token) {
    await http.delete("/cart");
    return { authenticated: true };
  }

  return { authenticated: false };
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setGuestCart(state, action) {
      state.items = action.payload;
      syncGuestCart(state.items);
    },
    hydrateCart(state, action) {
      state.items = action.payload;
    },
    addGuestItem(state, action) {
      const next = [...state.items];
      const index = next.findIndex((item) => item.product._id === action.payload.product._id);
      if (index >= 0) {
        next[index].quantity += action.payload.quantity;
      } else {
        next.push({
          _id: crypto.randomUUID(),
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }
      state.items = next;
      syncGuestCart(next);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (!action.payload.authenticated) {
          const next = [...state.items];
          const index = next.findIndex((item) => item.product._id === action.meta.arg.product._id);
          if (index >= 0) {
            next[index].quantity += action.meta.arg.quantity;
          } else {
            next.push({
              _id: crypto.randomUUID(),
              product: action.meta.arg.product,
              quantity: action.meta.arg.quantity,
            });
          }
          state.items = next;
          syncGuestCart(next);
        } else {
          const next = [...state.items];
          const index = next.findIndex((item) => item._id === action.payload.item._id);
          if (index >= 0) {
            next[index] = action.payload.item;
          } else {
            next.unshift(action.payload.item);
          }
          state.items = next;
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (!action.payload.authenticated) {
          state.items = state.items.map((item) =>
            item._id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item
          );
          syncGuestCart(state.items);
        } else {
          state.items = state.items.map((item) =>
            item._id === action.payload.item._id ? action.payload.item : item
          );
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (!action.payload.authenticated) {
          state.items = state.items.filter((item) => item._id !== action.payload.itemId);
          syncGuestCart(state.items);
        } else {
          state.items = state.items.filter((item) => item._id !== action.payload.itemId);
        }
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = [];
        if (!action.payload.authenticated) {
          syncGuestCart([]);
        }
      })
      .addCase(logout, (state) => {
        state.items = JSON.parse(localStorage.getItem("aa_guest_cart") || "[]");
      });
  },
});

export const { setGuestCart, hydrateCart, addGuestItem } = cartSlice.actions;
export default cartSlice.reducer;
