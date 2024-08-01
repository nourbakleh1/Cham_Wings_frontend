import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../lib/publicRequest";


export const getpdfs=createAsyncThunk("chatbot/getpdfs",async(_,ThunkApi)=>{
    const {rejectWithValue}=ThunkApi;

    try{
       const pdf=await publicRequest.get("/api/pdfs");

       console.log(pdf.data)
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


const initialState={
    Pdf_file:[],
    Pdf_file_sorted:[],
    isLoading:false,
    error:null
    
}


const chatbotSlice=createSlice({
    name:"chatbot",
    initialState,
    reducers:{

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

        }

    
});

export default chatbotSlice.reducer;