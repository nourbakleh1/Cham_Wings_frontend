import { createSlice,createAsyncThunk, current } from "@reduxjs/toolkit";
import { privateRequest } from "../../../lib/privateRequest";





export const getOffers=createAsyncThunk("manage_offers/getOffers",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/offers?page=${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const SearchOffer=createAsyncThunk("manage_offers/SearchOffer",async(search,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/offers?search=${search}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const AddOffer=createAsyncThunk("manage_offers/AddOffer",async(formdata,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;

    try{
        const res=await privateRequest.post(`/api/offers`,formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(getOffers(1))
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const updateOffer=createAsyncThunk("manage_offers/updateOffer",async(offer,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    console.log("first",offer)
    try{
        const res=await privateRequest.post(`/api/offers/${offer?.id}`,offer?.data,{
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
export const getOffer_info_=createAsyncThunk("manage_offers/getOffer_info_",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.get(`/api/offers/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});
export const deleteOffer=createAsyncThunk("manage_offers/deleteOffer",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
        const res=await privateRequest.delete(`/api/offers/${id}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});



//get all flights
export const getallFlights=createAsyncThunk("manage_offers/getallFlights",async(_,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/offers/getflights`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

//get all offer
export const getallFlightUser=createAsyncThunk("manage_offers/getallFlightUser",async(_,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/getuseroffer`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

//get user offer
export const getaOffersUser=createAsyncThunk("manage_offers/getaOffersUser",async(_,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/getuseroffer?page=${1}`);
        return res.data
    }
    catch(error){
        return rejectWithValue(error)
    }
});

const initialState={
    offers:[],
    isLoading:false,
    isLoadingSearch:false,
    error:null,
    SearchOffers:null,
    Flights:null,
    offer_info:null,
    user_offers:null
    
}



const ManageOffersSlice=createSlice({
    name:"manage_offers",
    initialState,
    reducers:{},
      
    extraReducers:
        (builder)=>{
            builder.addCase(getOffers.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getOffers.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.offers=action.payload;
                
            })
            .addCase(getOffers.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(SearchOffer.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(SearchOffer.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.SearchOffers=action.payload
                
            })
            .addCase(SearchOffer.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(AddOffer.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(AddOffer.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;         
            })
            .addCase(AddOffer.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(updateOffer.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(updateOffer.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(updateOffer.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            
            .addCase(getOffer_info_.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                state.offer_info=action.payload
                
            })
            .addCase(getOffer_info_.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(deleteOffer.pending,(state)=>{
                state.isLoadingSearch=true
            })
            .addCase(deleteOffer.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;                
            })
            .addCase(deleteOffer.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(getallFlightUser.fulfilled,(state,action)=>{
                state.isLoadingSearch=false;
                
            })
            .addCase(getallFlightUser.rejected,(state,action)=>{
                state.isLoadingSearch=false
                state.error=action.payload
            })
            .addCase(getallFlights.pending,(state,action)=>{
                state.isLoadingSchedule=true;
                
                
            })
            
            .addCase(getallFlights.fulfilled,(state,action)=>{
                state.isLoadingSchedule=false;
                state.Flights=action.payload;
                
            })
            .addCase(getallFlights.rejected,(state,action)=>{
                state.isLoadingSchedule=false
                state.error=action.payload
            })
            .addCase(getaOffersUser.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getaOffersUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user_offers=action.payload;
                
            })
            .addCase(getaOffersUser.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload
            })

            

        }

    
});
export default ManageOffersSlice.reducer;