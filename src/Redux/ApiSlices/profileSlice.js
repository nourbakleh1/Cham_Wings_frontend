import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../lib/privateRequest";

const initialState = {
  profile: null,
  fetchStatus: "idle",
  updateStatus: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching profile...");
      const response = await privateRequest.get("/api");
      console.log("Fetch response:", response);
      // if (response.data && response.data.success) {
        return response.data;
      // } else {
      //   console.log("Fetch failed:", response.data);
      //   return rejectWithValue("Failed to fetch profile");
      // }
    } catch (error) {
      console.error("Fetch Profile Error:", error.response || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profile, { rejectWithValue }) => {
    try {
      console.log("Updating profile...", profile);
      const response = await privateRequest.post("/api", profile);
      console.log("Update response:", response);
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        console.log("Update failed:", response.data);
        return rejectWithValue("Failed to update profile");
      }
    } catch (error) {
      console.error("Update Profile Error:", error.response || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.profile = action.payload;
        console.log("Profile fetched successfully:", action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload || "Failed to fetch profile";
        console.log("Profile fetch failed:", state.error);
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload;
        console.log("Profile updated successfully:", action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "Failed to update profile";
        console.log("Profile update failed:", state.error);
      });
  },
});

export default profileSlice.reducer;
