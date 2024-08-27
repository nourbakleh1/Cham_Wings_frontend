import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../lib/privateRequest";

// Thunk for fetching flight data from the API
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching flights from /api/flight...");
      const response = await privateRequest.get("/api/flight-search");
      console.log("Fetched flights data:", response.data.data);
      return response.data.data; // Assuming the response structure is { data: { data: [] } }
    } catch (error) {
      console.error(
        "Error fetching flights:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch flights"
      );
    }
  }
);

// Thunk for sending selected flights data to the API
export const sendSelectedFlights = createAsyncThunk(
  "flights/sendSelectedFlights",
  async (selectedFlights, { rejectWithValue }) => {
    try {
      console.log("Sending selected flights to /api/flight:", selectedFlights);
      const response = await privateRequest.post(
        "/api/flight-search",
        selectedFlights
      );
      console.log("Response from sending selected flights:", response.data);
      return response.data; // Assuming the response structure is { data: [...] }
    } catch (error) {
      console.error(
        "Error sending selected flights:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to send selected flights"
      );
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    list: [], // List of flights fetched from the API
    status: "idle", // Status of the API requests ("idle", "loading", "succeeded", "failed", etc.)
    error: null, // Error message if any request fails
    selectedFlights: [], // Flights selected by the user
  },
  reducers: {
    // Reducer to add a flight to the selectedFlights array
    selectFlight: (state, action) => {
      console.log("Selecting flight:", action.payload);
      state.selectedFlights.push(action.payload);
    },
    // Reducer to remove a flight from the selectedFlights array by its flightId
    deselectFlight: (state, action) => {
      console.log("Deselecting flight with ID:", action.payload);
      state.selectedFlights = state.selectedFlights.filter(
        (flight) => flight.flightId !== action.payload
      );
    },
    // Reducer to clear all selected flights
    clearSelectedFlights: (state) => {
      console.log("Clearing all selected flights.");
      state.selectedFlights = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the fetchFlights thunk
      .addCase(fetchFlights.pending, (state) => {
        console.log("fetchFlights pending...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        console.log("fetchFlights succeeded:", action.payload);
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        console.error("fetchFlights failed:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle the sendSelectedFlights thunk
      .addCase(sendSelectedFlights.pending, (state) => {
        console.log("sendSelectedFlights pending...");
        state.status = "sending";
        state.error = null;
      })
      .addCase(sendSelectedFlights.fulfilled, (state) => {
        console.log("sendSelectedFlights succeeded.");
        state.status = "sent";
        state.selectedFlights = []; // Clear selected flights after sending
      })
      .addCase(sendSelectedFlights.rejected, (state, action) => {
        console.error("sendSelectedFlights failed:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectFlight, deselectFlight, clearSelectedFlights } =
  flightSlice.actions;
export default flightSlice.reducer;
