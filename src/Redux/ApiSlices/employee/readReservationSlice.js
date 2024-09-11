import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";





export const getReservation=createAsyncThunk("read_reservation/getReservation",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/reservation/all?page=${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const SearchForReservation=createAsyncThunk("read_reservation/SearchReservationt",async(search,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/reservation/all?search=${search}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});


export const deleteReservation=createAsyncThunk("read_reservation/deleteReservationt",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/reservations/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const activateReservation=createAsyncThunk("read_reservation/activateReservationt",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/activatereservation/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});







const initialState={
    reservation:[],
    isLoading:false,
    isLoadingSearch:false,
    error:null,
    SearchReservation:null,
   
    
}



const readReservationSlice=createSlice({
    name:"read_reservation",
    initialState,
    reducers:{},
      
    extraReducers:
        (builder)=>{
            builder.addCase(getReservation.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getReservation.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.reservation=action.payload;
                
            })
            .addCase(getReservation.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(SearchForReservation.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(SearchForReservation.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.SearchReservation=action.payload
                
            })
            .addCase(SearchForReservation.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(activateReservation.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(activateReservation.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(activateReservation.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            
            .addCase(deleteReservation.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.flight_info=action.payload
                
            })
            .addCase(deleteReservation.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            
        }

    
});
export default readReservationSlice.reducer;