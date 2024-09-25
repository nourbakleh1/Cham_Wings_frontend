import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";

export const getPolicies = createAsyncThunk(
  "policy/getPolicies",
  async (_, ThunkApi) => {
    const { rejectWithValue, getState } = ThunkApi;

    try {
      const res = await privateRequest.get(`/api/policies`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const AddPolicy = createAsyncThunk(
  "policy/AddPolicy",
  async (formdata, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi;

    try {
      const res = await privateRequest.post(`/api/policies`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Dispatching getPolicies without passing a page number
      dispatch(getPolicies());
      return res.data;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const updatePolicy = createAsyncThunk(
    "policy/updatePolicy",
    async (policyData, ThunkApi) => { // Renamed to policyData for clarity
      const { rejectWithValue } = ThunkApi;
  
      // Logging the incoming policyData for debugging
      console.log("policyData", policyData);
  
      try {
        const res = await privateRequest.put(
          `/api/policies/${policyData.id}`, // Use policyData.id to build the endpoint
          policyData.visa, // Send the visa object directly
          {
            headers: {
              "Content-Type": "application/json", // Adjusted content type if sending JSON
            },
          }
        );
        return res.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

export const deletePolicy = createAsyncThunk(
  "policy/deletePolicy",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;

    try {
      // Make sure the 'id' is passed in correctly
      const res = await privateRequest.delete(`/api/policies/${id}`);
      return res.data; // Return the response from the API
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPolicyInfo = createAsyncThunk(
  "policy/getPolicyInfo",
  async (id, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi;

    try {
      const res = await privateRequest.get(`/api/get/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  policies: {
    data: [], // Array to hold policy data
    success: "", // Message indicating success or failure
    isLoading: false, // Boolean to indicate loading state
    error: null, // Optional: to hold error messages if needed
  },
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPolicies.pending, (state) => {
      state.policies.isLoading = true; // Update loading state in policies
    });
    builder
      .addCase(getPolicies.fulfilled, (state, action) => {
        state.policies.isLoading = false;
        state.policies.data = action.payload; // Store the policy data from API
        state.policies.success = "Policies fetched successfully"; // Store the success message
      })

      .addCase(getPolicies.rejected, (state, action) => {
        state.policies.isLoading = false; // Set loading to false
        state.policies.error = action.payload; // Store error message
      })

      .addCase(AddPolicy.pending, (state) => {
        state.policies.isLoading = true; // Update loading state in policies
      })
      .addCase(AddPolicy.fulfilled, (state, action) => {
        state.policies.isLoading = false; // Set loading to false
        // You can add logic here to update policies or handle success
      })
      .addCase(AddPolicy.rejected, (state, action) => {
        state.policies.isLoading = false; // Set loading to false
        state.policies.error = action.payload; // Store error message
      })

      .addCase(updatePolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.airport_info=action.payload
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    
      .addCase(getPolicyInfo.pending, (state, action) => {
        state.isLoading_visa = true;
      })
      .addCase(getPolicyInfo.fulfilled, (state, action) => {
        state.isLoading_visa = false;
        state.visaInfo = action.payload;
      })
      .addCase(getPolicyInfo.rejected, (state, action) => {
        state.isLoading_visa = false;
        state.error = action.payload;
      });
  },
});

export default policySlice.reducer;
