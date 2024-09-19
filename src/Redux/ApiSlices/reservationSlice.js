import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../lib/privateRequest";




const initialState={
    occupied_seats:[],
    isLoading:true,
    error:null
}

export const get_Occupied_seats=createAsyncThunk("reservation/get_Occupied_seats",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/seats-status/${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
})


const reservationSlice=createSlice({
    name:"reservation",
    initialState,
    reducers:{

    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(get_Occupied_seats.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(get_Occupied_seats.fulfilled,(state,action)=>{
                state.occupied_seats = action.payload;
                state.isLoading=false;

            })
            .addCase(get_Occupied_seats.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
        }
    
    
});


export default reservationSlice.reducer;