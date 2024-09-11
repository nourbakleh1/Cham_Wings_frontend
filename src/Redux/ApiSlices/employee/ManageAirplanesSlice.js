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

export const AddAirplane=createAsyncThunk("manage_airplanes/AddAirplane",async(data,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/airplanes`,data);
        if(window.sessionStorage.getItem("page")){
            const Savedpage= JSON.parse(window.sessionStorage.getItem("page"));
        dispatch(getAirplanes(Savedpage || 1));
        }
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateAirplane=createAsyncThunk("manage_airplanes/updateAirplane",async(airplane,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.put(`/api/airplanes/${airplane?.id}`,airplane?.data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getAirplane_info=createAsyncThunk("manage_airplanes/getAirplane_info",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/airplanes/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const deleteAirplane=createAsyncThunk("manage_airplanes/deleteAirplane",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/airplanes/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const activateAirplane=createAsyncThunk("manage_airplanes/activateAirplane",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/airplanes/activate/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const AddClass=createAsyncThunk("manage_airplanes/AddClass",async(Class,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/classes/${Class.id}`,Class?.data);
        if(window.sessionStorage.getItem("page")){
            const Savedpage= JSON.parse(window.sessionStorage.getItem("page"));
        dispatch(getAirplanes(Savedpage || 1));
        }
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateClass=createAsyncThunk("manage_airplanes/updateClass",async(Class,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.put(`/api/classes/${Class?.Id}`,Class?.data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const deleteClass=createAsyncThunk("manage_airplanes/deleteClass",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/classes/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});





const initialState={
    airplanes:null,
    isLoading:false,
    error:null,  
    airplane_info:null
      
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
            .addCase(AddAirplane.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(AddAirplane.fulfilled,(state,action)=>{
                state.isLoading=false;
                state
                
            })
            .addCase(AddAirplane.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            }) 
            .addCase(getAirplane_info.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.airplane_info=action.payload;
                
            })
            .addCase(getAirplane_info.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(updateAirplane.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(updateAirplane.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(updateAirplane.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(deleteAirplane.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(deleteAirplane.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(deleteAirplane.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(activateAirplane.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(activateAirplane.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(activateAirplane.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(AddClass.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(AddClass.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            
            .addCase(updateClass.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(updateClass.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            
            .addCase(deleteClass.fulfilled,(state,action)=>{
                state.isLoading=false;
                
            })
            .addCase(deleteClass.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
               

        }

    
});

export default ManageAirplanesSlice.reducer;