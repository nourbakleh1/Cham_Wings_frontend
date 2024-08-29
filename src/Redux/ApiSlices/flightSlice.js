import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockFlights } from "../../../src/Pages/Flight/mockFlightData";
import { publicRequest } from "../../lib/publicRequest";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    // actual API
    // const response = await axios.get('/api/flights');
    // return response.data;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockFlights;
  }
);

export const sendSelectedFlights = createAsyncThunk(
  "flights/sendSelectedFlights",
  async (selectedFlights, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () => resolve({ status: "success", data: selectedFlights }),
          1000
        )
      );

      // actual API
      // const response = await axios.post('/api/available-flights', selectedFlights);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const  searchFlights=createAsyncThunk("flights/searchFlights",async (data,ThunkApi) => {
    const {rejectWithValue}=ThunkApi;
   try{
    console.log(data)

    // data.departure_date="2024-09-17";
      const res=await publicRequest.post("/api/flight-search",data);
      return res.data
   }
   catch(err){
    return rejectWithValue(err)
   }
   
  }
);

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
    selectFlight: (state, action) => {
      state.selectedFlights = [action.payload];
    },
    deselectFlight: (state, action) => {
      state.selectedFlights = state.selectedFlights.filter(
        (flight) => flight.flightId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendSelectedFlights.pending, (state) => {
        state.status = "sending";
      })
      .addCase(sendSelectedFlights.fulfilled, (state) => {
        state.status = "sent";
      })
      .addCase(sendSelectedFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchFlights.pending, (state) => {
        state.isLoading=true
      })
      .addCase(searchFlights.fulfilled, (state,action) => {
        state.isLoading=false;
        state.resultSearch=action.payload
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.isLoading=false
        state.error = action.payload;
      });
  },
});

export const { selectFlight, deselectFlight } = flightSlice.actions;
export default flightSlice.reducer;
