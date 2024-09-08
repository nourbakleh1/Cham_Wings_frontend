import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../../lib/publicRequest";
import { privateRequest } from "../../../lib/privateRequest";



export const getAirports=createAsyncThunk("airport/getAirports",async(_,ThunkApi)=>{
    const {rejectWithValue,getState}=ThunkApi;

    try{
        const res= await publicRequest.get(`/api/airportsforreservation`);

        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getALLAirports=createAsyncThunk("airport/getALLAirports",async(id,ThunkApi)=>{
    const {rejectWithValue,getState}=ThunkApi;

    try{
        const res= await publicRequest.get(`/api/airports?page=${id}`);

        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const AddAirport=createAsyncThunk("airport/AddAirport",async(formdata,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/airports`,formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        if(window.sessionStorage.getItem("page")){
            const Savedpage= JSON.parse(window.sessionStorage.getItem("page"));
        dispatch(getALLAirports(Savedpage || 1));
        }
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateAirport=createAsyncThunk("airport/updateAirport",async(airport,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/airports/${airport?.id}`,airport?.formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getAirport_info=createAsyncThunk("airport/getAirport_info",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/airports/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const deleteAirport=createAsyncThunk("airport/deleteAirport",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/airports/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const activateAirport=createAsyncThunk("airport/activateAirport",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/airports/activate/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

const initialState={
    All_airports:null,
    Paginat_airports:null,
    isLoading:false,
    airport_info:null,
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
        .addCase(getALLAirports.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getALLAirports.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.Paginat_airports=action.payload

        })
        .addCase(getALLAirports.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(AddAirport.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(AddAirport.fulfilled,(state,action)=>{
            state.isLoading = false;
            // state.Paginat_airports=action.payload

        })
        .addCase(AddAirport.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        
        .addCase(getAirport_info.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.airport_info=action.payload

        })
        .addCase(getAirport_info.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(updateAirport.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateAirport.fulfilled,(state,action)=>{
            state.isLoading = false;
            // state.airport_info=action.payload

        })
        .addCase(updateAirport.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(deleteAirport.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteAirport.fulfilled,(state,action)=>{
            state.isLoading = false;

        })
        .addCase(deleteAirport.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(activateAirport.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(activateAirport.fulfilled,(state,action)=>{
            state.isLoading = false;

        })
        .addCase(activateAirport.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })


        
    
    }

    
});

export default airportSlice.reducer;