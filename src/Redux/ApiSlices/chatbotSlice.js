import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";
import { privateRequest } from "../../lib/privateRequest";


export const getpdfs=createAsyncThunk("chatbot/getpdfs",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
       const pdf=await publicRequest.get("/api/pdfs");

       return pdf.data;

    }
    catch(error)
    {
        
            error.message ="enter pdf file"
        
        return rejectWithValue(error.message);
    }
});

export const uploadPdf=createAsyncThunk("chatbot/uploadPdf",async(formdata,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;


    try{
       const {data}=await publicRequest.post("/api/ingest-pdf",formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
       });
       return data;
    }
    catch(error)
    {  
        return rejectWithValue(error);
    }
});
export const deletePdf=createAsyncThunk("chatbot/UploadPdf",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
         const {data}=await publicRequest.delete(`/api/pdfs/${id}`);
       return {data,id};
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
});
export const SendAndReceive=createAsyncThunk("chatbot/SendAndReceive",async(data,ThunkApi)=>{
    const {rejectWithValue,dispatch}=ThunkApi;
    try{
       const res=  await  privateRequest.post('/api/send-message',data);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
})
export const getThreads=createAsyncThunk("chatbot/getThreads",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get('/api/threads');
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
})
export const getChat=createAsyncThunk("chatbot/getChat",async(id,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;
    try{
       const res=  await  privateRequest.get(`/api/chat-history/${id}`);
       return res.data
    }
    catch(error)
    {
        return rejectWithValue(error.message);
    }
})
const initialState={
    Pdf_file:[],
    Pdf_file_sorted:[],
    isLoading:false,
    error:null,
    threads:[],
    chat:null,
    view:true,
    
}



const chatbotSlice=createSlice({
    name:"chatbot",
    initialState,
    reducers:{
        change_view:(state,action)=>{
            state.view = action.payload
        }
    },
    extraReducers:
        (builder)=>{
            builder.addCase(getpdfs.pending,(state)=>{
                state.isLoading = true;
            }).
            addCase(getpdfs.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.Pdf_file=action.payload;
                state.Pdf_file_sorted= state.Pdf_file?.sort((a,b)=> b.id - a.id)
            }).
            addCase(getpdfs.rejected,(state,action)=>{
                state.isLoading = false;
                state.error=action.payload;
            })
            .addCase(uploadPdf.pending,(state)=>{
                state.isLoading = true;
            }).
            addCase(uploadPdf.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.Pdf_file_sorted.unshift(action.payload.pdf);
            }).
            addCase(uploadPdf.rejected,(state,action)=>{
                state.isLoading = false;
                state.error=action.payload;
            })
            .addCase(deletePdf.pending,(state)=>{
                state.isLoading = true;
            }).
            addCase(deletePdf.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.Pdf_file_sorted=state.Pdf_file_sorted?.filter((el)=>{
                    return el.id != action.payload.id;
                });
            }).
            addCase(deletePdf.rejected,(state,action)=>{
                state.isLoading = false;
                state.error=action.payload;
            })
            .addCase(getThreads.pending,(state)=>{
                state.isLoading = true;
            }).
            addCase(getThreads.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.threads = action.payload
                
            }).
            addCase(getThreads.rejected,(state,action)=>{
                state.isLoading = false;
                state.error=action.payload;
            })
            .addCase(getChat.pending,(state)=>{
                state.isLoading = true;
            }).
            addCase(getChat.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.chat = action.payload
                
            }).
            addCase(getChat.rejected,(state,action)=>{
                state.isLoading = false;
                state.error=action.payload;
            })

        }

    
});
export const {change_view}=chatbotSlice.actions;
export default chatbotSlice.reducer;