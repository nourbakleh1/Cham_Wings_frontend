import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";


export const getStatistics=createAsyncThunk("statistics/getStatistics",async(_,ThunkApi)=>{
        const {rejectWithValue}=ThunkApi;
    try{
        const statistics=await publicRequest.get('/api/run-segmentation');
        return statistics.data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

const initialState={
    statistics:[],
    isLoading:true,
    error:null
}


const statisticsSlice=createSlice({
    name:"statistics",
    initialState,
    reducers:{

    },
    extraReducers:
        (builder)=>{
            builder.addCase(getStatistics.pending,(state,action)=>{
                state.statistics = null;
                state.isLoading=true;
            })
            .addCase(getStatistics.fulfilled,(state,action)=>{
                state.statistics = action.payload;
                state.isLoading=false;

            })
            .addCase(getStatistics.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;

            })
        }
    
    
});


export default statisticsSlice.reducer;