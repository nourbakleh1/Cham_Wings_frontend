import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";
import { privateRequest } from "../../lib/privateRequest";


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
export const logout=createAsyncThunk("auth/logout",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const {data}= await privateRequest.post(`/api/logout`,{});
        return data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const ForgotPassword=createAsyncThunk("auth/ForgotPassword",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res= await publicRequest.post(`/api/forget-password`,data);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const checkVerifyPass=createAsyncThunk("auth/checkVerifyPass",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    

    try{
        const res=await publicRequest.post(`/api/password-verification/${data.email}`,data.code);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const resetPassword=createAsyncThunk("auth/resetPassword",async(data,ThunkApi)=>{
    const {rejectWithValue,getState}=ThunkApi;

    try{
        const res= await publicRequest.post(`/api/reset-password`,data,{
            headers:{
                Authorization: "Bearer " + getState()?.auth?.verify_token
            }
        });

        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});


const initialState={
    user:null,isLoading:false,error:null,verify_token:null
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
        .addCase(ForgotPassword.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(ForgotPassword.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(ForgotPassword.rejected,(state)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user= null;
            localStorage.removeItem("token");
        })
        .addCase(checkVerifyPass.fulfilled,(state,action)=>{
            state.verify_token = action.payload.data.slice(3);
        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        
        

    }

    
});

export default authSlice.reducer;