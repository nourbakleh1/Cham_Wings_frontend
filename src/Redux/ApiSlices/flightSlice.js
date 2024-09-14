import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";
import { privateRequest } from "../../lib/privateRequest";


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
export const  searchFlights=createAsyncThunk("flights/searchFlights",async (data,ThunkApi) => {
    const {rejectWithValue}=ThunkApi;
   try{
    console.log(data)

    // data.departure_date="2024-09-17";
      const res=await publicRequest.post("/api/flight-search",data);
      return res.data   }
   catch(err){
    return rejectWithValue(err)
   }
   
  }
);

export const passengerSlice = createSlice({
  name: "passenger",
  initialState: {
    passengerData: {},
  },
  reducers: {
    savePassengerData: (state, action) => {
      state.passengerData = action.payload;
    },
  },
});

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    isLoading:false,
    resultSearch:null,
    selectedFlights: [],
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
      })
      .addCase(searchFlights.pending, (state) => {
        state.isLoading=true
      })
      .addCase(searchFlights.fulfilled, (state,action) => {
        state.isLoading=false;
        state.resultSearch=action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.isLoading=false
        state.error = action.payload;
      });
  },
});

export const { savePassengerData } = passengerSlice.actions;
export const { selectFlight, deselectFlight, clearSelectedFlights } =
  flightSlice.actions;
export default flightSlice.reducer;
