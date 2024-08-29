import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";
import { privateRequest } from "../../lib/privateRequest";



export const getAirports=createAsyncThunk("auth/getAirports",async(_,ThunkApi)=>{
    const {rejectWithValue,getState}=ThunkApi;

    try{
        const res= await publicRequest.get(`/api/airportsforreservation`);

        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});


const initialState={
    All_airports:null,
    isLoading:false,
    error:null,
}


const airportSlice=createSlice({
    name:"airport",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAirports.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAirports.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.All_airports=action.payload

        })
        .addCase(getAirports.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        
    
    }

    
});

export default airportSlice.reducer;