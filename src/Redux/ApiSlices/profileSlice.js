import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../lib/privateRequest";

// Initial state
const initialState = {
  profile: null,
  passportInfo: null,
  fetchStatus: "idle",
  updateStatus: "idle",
  fetchPassportStatus: "idle",
  updatePassportStatus: "idle",
  error: null,
  toastMessage: null,
  toastType: null,
};

// Thunks
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateRequest.get("/api");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profile, profileImage }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      // Append all profile fields
      for (const key in profile) {
        if (profile.hasOwnProperty(key)) {
          formData.append(key, profile[key]);
        }
      }

      if (profileImage) {
        formData.append("image", profileImage);
      }

      const response = await privateRequest.post("/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        return {
          success: response.data.success,
          data: response.data.data,
        };
      } else {
        return rejectWithValue("Failed to update profile");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  }
);

export const updateEmpProfile = createAsyncThunk(
  "profile/updateEmpProfile",
  async ({ profile, profileImage }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      // Append all profile fields
      for (const key in profile) {
        if (profile.hasOwnProperty(key)) {
          formData.append(key, profile[key]);
        }
      }

      if (profileImage) {
        formData.append("image", profileImage);
      }

      const response = await privateRequest.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        return {
          success: response.data.success,
          data: response.data.data,
        };
      } else {
        return rejectWithValue("Failed to update profile");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  }
);

export const fetchPassportInfo = createAsyncThunk(
  "passportInfo/fetchPassportInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const passport_id = state?.profile?.passportInfo?.passport_id;
      const response = await privateRequest.get(`/api/passports`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch passport"
      );
    }
  }
);

export const updatePassportInfo = createAsyncThunk(
  "passportInfo/updatePassportInfo",
  async (passportInfo, { rejectWithValue }) => {
    try {
      const response = await privateRequest.post(
        `/api/passports/${passportInfo.passport_id}`,
        passportInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to update passport info");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update passport info"
      );
    }
  }
);

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearToast: (state) => {
      state.toastMessage = null;
      state.toastType = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProfile actions
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload || "Failed to fetch profile";
        state.toastMessage = state.error;
        state.toastType = "error";
      });

    // Handle updateProfile actions
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload.data;
        state.toastMessage = `${action.payload.success}: ${action.payload.data}`;
        state.toastType = "success";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "Failed to update profile";
        state.toastMessage = state.error;
        state.toastType = "error";
      });

    // Handle updateEmpProfile actions
    builder
      .addCase(updateEmpProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateEmpProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload.data;
        state.toastMessage = `${action.payload.success}: ${action.payload.data}`;
        state.toastType = "success";
      })
      .addCase(updateEmpProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "Failed to update profile";
        state.toastMessage = state.error;
        state.toastType = "error";
      });

    // Handle fetchPassportInfo actions
    builder
      .addCase(fetchPassportInfo.pending, (state) => {
        state.fetchPassportStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPassportInfo.fulfilled, (state, action) => {
        state.fetchPassportStatus = "succeeded";
        state.passportInfo = action.payload;
      })
      .addCase(fetchPassportInfo.rejected, (state, action) => {
        state.fetchPassportStatus = "failed";
        state.error = action.payload || "Failed to fetch passport info";
        state.toastMessage = state.error;
        state.toastType = "error";
      });

    // Handle updatePassportInfo actions
    builder
      .addCase(updatePassportInfo.pending, (state) => {
        state.updatePassportStatus = "loading";
        state.error = null;
      })
      .addCase(updatePassportInfo.fulfilled, (state, action) => {
        state.updatePassportStatus = "succeeded";
        state.passportInfo = action.payload;
        state.toastMessage = "Passport info updated successfully";
        state.toastType = "success";
      })
      .addCase(updatePassportInfo.rejected, (state, action) => {
        state.updatePassportStatus = "failed";
        state.error = action.payload || "Failed to update passport info";
        state.toastMessage = state.error;
        state.toastType = "error";
      });
  },
});

export const { clearToast } = profileSlice.actions;
export default profileSlice.reducer;
