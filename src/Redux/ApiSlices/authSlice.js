import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";


export const register=createAsyncThunk("auth/register",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await publicRequest.post("/api/register",data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const checkVerify=createAsyncThunk("auth/checkVerify",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    

    try{
        const res=await publicRequest.post(`/api/register-verify/${data.email}`,data.code);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const login=createAsyncThunk("auth/login",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await publicRequest.post(`/api/login`,data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});



const initialState={
    user:null,isLoading:false,error:null
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(checkVerify.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(checkVerify.fulfilled,(state,action)=>{
            state.isLoading = false;
        })
        .addCase(checkVerify.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user= action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
    }

    
});

export default authSlice.reducer;