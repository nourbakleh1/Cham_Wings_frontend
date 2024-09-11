import { createSlice,createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const activateFlight=createAsyncThunk("manage_flights/activateEmployee",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/flights/activate/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

//scedule
export const Addschedule=createAsyncThunk("manage_flights/Addschedule",async(schedules,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    const {data,id}=schedules;
    try{
        const res=await privateRequest.post(`/api/schedules/${id}`,{schedule:data});
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getSchedule=createAsyncThunk("manage_flights/getSchedule",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/schedules/${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const getSchedule_Day_info=createAsyncThunk("manage_flights/getSchedule_Day_info",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/schedules/day/${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const deleteSchedule=createAsyncThunk("manage_flights/deleteSchedule",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/schedules/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const deleteSchedule_time=createAsyncThunk("manage_flights/deleteSchedule_time",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/schedules/time/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const AddTimesTospecficDay=createAsyncThunk("manage_flights/AddTimesTospecficDay",async(time,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    // time.id = day_id
    try{
        const res=await privateRequest.post(`/api/schedules/day/${time.id}`,time.data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updatespecficDay=createAsyncThunk("manage_flights/updatespecficDay",async(time,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    // time.id = day_id
    try{
        const res=await privateRequest.put(`/api/schedules/${time.id}`,time.data);
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
    days:null,
    times:null,
    isLoadingSchedule:false,
    
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
            })
            .addCase(deleteFlights.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(activateFlight.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(activateFlight.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;                
            })
            .addCase(activateFlight.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(Addschedule.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(Addschedule.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(getSchedule.pending,(state,action)=>{
                state.isLoadingSchedule=true;
                
                
            })
            
            .addCase(getSchedule.fulfilled,(state,action)=>{
                state.isLoadingSchedule=false;
                state.days=action.payload;
                
            })
            .addCase(getSchedule.rejected,(state,action)=>{
                state.isLoadingSchedule=false
                state.error=action.payload
            })
            .addCase(getSchedule_Day_info.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.times=action.payload
                
            })
            .addCase(getSchedule_Day_info.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(deleteSchedule.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(deleteSchedule.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(deleteSchedule_time.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(deleteSchedule_time.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(updatespecficDay.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(updatespecficDay.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(AddTimesTospecficDay.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(AddTimesTospecficDay.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })

        }

    
});
export default manageFlightsSlice.reducer;