import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";





export const getFlights=createAsyncThunk("manage_flights/getFlights",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/flights?page=${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const Searchflight=createAsyncThunk("manage_flights/Searchflight",async(search,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/flights?search=${search}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const AddFlight=createAsyncThunk("manage_flights/AddFlight",async(data,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/flights`,data);
        dispatch(getFlights(1))
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateFlights=createAsyncThunk("manage_flights/updateFlights",async(flight,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.put(`/api/flights/${flight?.id}`,flight?.data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getFlight_info=createAsyncThunk("manage_flights/getFlight_info",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/flights/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const deleteFlights=createAsyncThunk("manage_flights/deleteFlights",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/flights/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});


const initialState={
    flights:[],
    isLoading:false,
    isLoadingSearch:false,
    error:null,
    SearchFlights:null,
    flight_info:null,
    
    
}



const manageFlightsSlice=createSlice({
    name:"manage_flights",
    initialState,
    reducers:{},
      
    extraReducers:
        (builder)=>{
            builder.addCase(getFlights.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getFlights.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.flights=action.payload;
                
            })
            .addCase(getFlights.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(Searchflight.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(Searchflight.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.SearchFlights=action.payload
                
            })
            .addCase(Searchflight.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(AddFlight.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(AddFlight.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
                
            })
            .addCase(AddFlight.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(updateFlights.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(updateFlights.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(updateFlights.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(getFlight_info.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(getFlight_info.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.flight_info=action.payload
                
            })
            .addCase(getFlight_info.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(deleteFlights.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(deleteFlights.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.flight_info=action.payload
                
            })
            .addCase(deleteFlights.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
        }

    
});
export default manageFlightsSlice.reducer;