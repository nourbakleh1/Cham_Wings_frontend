import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { publicRequest } from "../../../lib/publicRequest";
import { privateRequest } from "../../../lib/privateRequest";


export const getEmployees=createAsyncThunk("admin/getEmployees",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/employees?page=${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const SearchEmployees=createAsyncThunk("admin/SearchEmployees",async(search,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/employees?search=${search}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const getEmployees_info=createAsyncThunk("admin/getEmployees_info",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/employees/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const AddEmployee=createAsyncThunk("admin/AddEmployee",async(formdata,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/employees`,formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(getEmployees(1));
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const getRoles=createAsyncThunk("admin/getRoles",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/roles`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

export const deleteEmployee=createAsyncThunk("admin/deleteEmployee",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/employees/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});


export const activateEmployee=createAsyncThunk("admin/activateEmployee",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/employees/activate/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateEmployee=createAsyncThunk("admin/updateEmployee",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/employees/${data?.id}`,data?.formdata,{
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

export const verifyEmail_Employee=createAsyncThunk("admin/verifyEmail_Employee",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/employees/update-email/${data.id}/${data.email}`,data.code);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const add_Roles_Employee=createAsyncThunk("admin/add_Roles_Employee",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/employees/roles/${data.id}`,{roles:data.roles});
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const delete_Roles_Employee=createAsyncThunk("admin/delete_Roles_Employee",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.post(`/api/employees/roles/del/${data.id}?roles=${data.roles}/`,{});
        return res.data
    }
    catch(error){
        console.log(data)
        return rejectWithValue(error)
    }
});

const initialState={
    employees:[],
    searchEmp:[],
    Allroles:[],
    emp_info:null,
    isLoading:false,
    isLoading_get:false,
    isLoading_search:false,
    error:null
}


const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

        builder
        .addCase(getEmployees.pending,(state)=>{
            state.isLoading_get = true;
        })
        .addCase(getEmployees.fulfilled,(state,action)=>{
            state.isLoading_get = false;
            state.employees = action.payload;
        })
        .addCase(getEmployees.rejected,(state,action)=>{
            state.isLoading_get = false;
            state.error=action.payload
        })
        .addCase(SearchEmployees.pending,(state)=>{
            state.isLoading_search = true;
        })
        .addCase(SearchEmployees.fulfilled,(state,action)=>{
            state.isLoading_search = false;
            state.searchEmp = action.payload;
        })
        .addCase(SearchEmployees.rejected,(state,action)=>{
            state.isLoading_search = false;
            state.error=action.payload
        })
        .addCase(getEmployees_info.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getEmployees_info.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.emp_info=action.payload.data
        })
        .addCase(getEmployees_info.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(AddEmployee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(AddEmployee.fulfilled,(state,action)=>{
            state.isLoading = false;
        })
        .addCase(AddEmployee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(getRoles.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getRoles.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.Allroles=action.payload;
        })
        .addCase(getRoles.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(deleteEmployee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteEmployee.fulfilled,(state)=>{
            state.isLoading = false;            
        })
        .addCase(deleteEmployee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(activateEmployee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(activateEmployee.fulfilled,(state)=>{
            state.isLoading = false;
            
        })
        .addCase(activateEmployee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(updateEmployee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateEmployee.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(updateEmployee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(verifyEmail_Employee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(verifyEmail_Employee.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(verifyEmail_Employee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(add_Roles_Employee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(add_Roles_Employee.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(add_Roles_Employee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        .addCase(delete_Roles_Employee.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(delete_Roles_Employee.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(delete_Roles_Employee.rejected,(state,action)=>{
            state.isLoading = false;
            state.error=action.payload
        })
        
        
        

    }

    
});

export default adminSlice.reducer;