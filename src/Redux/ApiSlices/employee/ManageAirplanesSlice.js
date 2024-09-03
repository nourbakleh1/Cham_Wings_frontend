import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";





export const getAirplanes=createAsyncThunk("manage_airplanes/getAirplanes",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/airplanes`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});



const initialState={
    airplanes:null,
    isLoading:false,
    error:null,    
}



const ManageAirplanesSlice=createSlice({
    name:"manage_airplanes",
    initialState,
    reducers:{
       
    },
    extraReducers:
        (builder)=>{
            builder.addCase(getAirplanes.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAirplanes.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.airplanes=action.payload
                
            })
            .addCase(getAirplanes.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            }) 
        }

    
});

export default ManageAirplanesSlice.reducer;