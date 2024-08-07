import axios from "axios";
import usePrivate from "../Hooks/usePrivate";





export const privateRequest = axios.create({
    baseURL:"http://localhost:8000",

});


privateRequest.interceptors.request.use( (config)=> {
    // Do something before request is sent
    const {getToken} =usePrivate();
     config.headers.Authorization= "Bearer " + getToken();
     return config
  }, (error)=> {
    // Do something with request error
    return Promise.reject(error);
  });