import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";

export const getPolicies = createAsyncThunk(
  "manage_policies/getPolicies",
  async (_, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;
    try {
      const res = await privateRequest.get(`/api/policies`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddPolicy = createAsyncThunk(
  "manage_policies/AddPolicy",
  async (data, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi;

    try {
      const res = await privateRequest.post(`/api/policies`, data);
      if (window.sessionStorage.getItem("page")) {
        const Savedpage = JSON.parse(window.sessionStorage.getItem("page"));
        dispatch(getPolicies(Savedpage || 1));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updatePolicy = createAsyncThunk(
  "manage_policies/updatePolicy",
  async (airplane, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;

    try {
      const res = await privateRequest.put(
        `/api/policies/${airplane?.id}`,
        airplane?.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePolicy = createAsyncThunk(
  "manage_policies/deletePolicy",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;

    try {
      const res = await privateRequest.delete(`/api/policies/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  policies: null,
  isLoading: false,
  error: null,
  airplane_info: null,
};

const ManagePoliciesSlice = createSlice({
  name: "manage_policies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolicies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPolicies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = action.payload;
      })
      .addCase(getPolicies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(AddPolicy.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(AddPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state;
      })
      .addCase(AddPolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePolicy.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePolicy.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ManagePoliciesSlice.reducer;
