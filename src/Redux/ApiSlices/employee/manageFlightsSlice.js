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
})

const initialState={
    flights:[],
    isLoading:false,
    error:null,
    
    
}



const chatbotSlice=createSlice({
    name:"manage_flights",
    initialState,
    reducers:{
        change_view:(state,action)=>{
            state.view = action.payload
        }
    },
    extraReducers:
        (builder)=>{
            builder.addCase(getFlights.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getFlights.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.flights=action.payload
                
            })
            .addCase(getFlights.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
        }

    
});
export const {change_view}=chatbotSlice.actions;
export default chatbotSlice.reducer;