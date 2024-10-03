import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../../lib/privateRequest";
import { publicRequest } from "../../lib/publicRequest";




export const getReservation_user=createAsyncThunk("reservation/getReservation_user",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/reservations?page=${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
})



export const get_going_Occupied_seats=createAsyncThunk("reservation/get_going_Occupied_seats",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/going-seats/${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
})
export const get_return_Occupied_seats=createAsyncThunk("reservation/get_return_Occupied_seats",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/returning-seats/${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
})
export const Add_Reservation=createAsyncThunk("reservation/Add_Reservation",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
     data.round_schedule_time_id = data.round_schedule_id
    try{
        const res=await privateRequest.post(`/api/reservations`,data);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
});
export const Add_Seats_TO_Reservation=createAsyncThunk("reservation/Add_Seats_TO_Reservation",async(data,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        if(data.return_seats.length != 0){
            const res=await privateRequest.post(`/api/reservations/${data.id}/seats`,{round_trip:data.round_trip,outbound_seats:data.outbound_seats,return_seats:data.return_seats});
            return res.data
        }
        else{
            const res=await privateRequest.post(`/api/reservations/${data.id}/seats`,{round_trip:data.round_trip,outbound_seats:data.outbound_seats});
            return res.data
        }

        
    }
    catch(err){
        return rejectWithValue(err)
    }
});

export const Payment=createAsyncThunk("reservation/Payment",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.post(`/api/payment/checkout/${id}`,{});
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
});
export const get_Passengers_for_reservation=createAsyncThunk("reservation/get_Passengers_for_reservation",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.get(`/api/reservations/passengers/${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
});
export const cancel_Reservation=createAsyncThunk("reservation/cancel_Reservation",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const res=await privateRequest.post(`/api/cancel-reservation/${id}`);
        return res.data
    }
    catch(err){
        return rejectWithValue(err)
    }
});
export const get_visa_spec=createAsyncThunk("reservation/get_visa_spec",async({dep_code,arr_code},ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
        const {data}=await publicRequest.get(`/api/getallvisa?page=${1}`);

        return {data,arr_code,dep_code}
    }
    catch(err){
        return rejectWithValue(err)
    }
});
const initialState={
    occupied_going_seats:[],
    occupied_return_seats:[],
    isLoading:true,
    isLoading_payment:true,
    error:null,
    reservation:null,
    my_reservations:null,
    reservation_pass:null,
    visa:null
}
const reservationSlice=createSlice({
    name:"reservation",
    initialState,
    reducers:{
        clear_reservation:(state)=>{
            state.reservation= null
        },
        

    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(get_going_Occupied_seats.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(get_going_Occupied_seats.fulfilled,(state,action)=>{
                state.occupied_going_seats.push(action.payload)
                state.isLoading=false;

            })
            .addCase(get_going_Occupied_seats.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(get_return_Occupied_seats.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(get_return_Occupied_seats.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.occupied_return_seats.push(action.payload);
            })
            .addCase(get_return_Occupied_seats.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(Add_Reservation.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(Add_Reservation.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.reservation=action.payload;
            })
            .addCase(Add_Reservation.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(Add_Seats_TO_Reservation.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(Add_Seats_TO_Reservation.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(Add_Seats_TO_Reservation.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(Payment.pending,(state,action)=>{
                state.isLoading_payment=false;
            })
            .addCase(Payment.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(Payment.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(getReservation_user.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getReservation_user.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.my_reservations=action.payload;
            })
            .addCase(getReservation_user.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
           
            .addCase(get_Passengers_for_reservation.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.reservation_pass=action.payload;
            })
            .addCase(get_Passengers_for_reservation.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(cancel_Reservation.fulfilled,(state,action)=>{
                state.isLoading=false;
            })
            .addCase(cancel_Reservation.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(get_visa_spec.fulfilled,(state,action)=>{
                state.isLoading=false;
                const {arr_code,dep_code,data} = action.payload;
                state.visa=data?.data?.data?.find((el)=>{
                    return ( dep_code == el?.departure_airport?.airport_code &
                            arr_code == el?.arrival_airport?.airport_code)
                })

            })
            .addCase(get_visa_spec.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
        }
    
    
});

export const  {clear_reservation} = reservationSlice.actions;
export default reservationSlice.reducer;