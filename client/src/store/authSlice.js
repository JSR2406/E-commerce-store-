import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../api/http";

const storedUser = localStorage.getItem("aa_user");
const storedToken = localStorage.getItem("aa_token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk("auth/registerUser", async (payload) => {
  const { data } = await http.post("/auth/register", payload);
  return data;
});

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  const { data } = await http.post("/auth/login", payload);
  return data;
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (payload) => {
  const { data } = await http.put("/auth/me", payload);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("aa_user");
      localStorage.removeItem("aa_token");
    },
    hydrateAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    const applyAuth = (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("aa_user", JSON.stringify(action.payload));
      localStorage.setItem("aa_token", action.payload.token);
    };

    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        applyAuth(state, action);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        applyAuth(state, action);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        applyAuth(state, action);
      });
  },
});

export const { logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;

