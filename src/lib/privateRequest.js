import axios from "axios";





export const privateRequest = axios.create({
    baseURL:"http://localhost:8000",

});


privateRequest.interceptors.request.use( (config)=> {
    // Do something before request is sent
     config.headers.Authorization= "Bearer " + JSON.parse(localStorage?.getItem("token"));
     return config
  }, (error)=> {
    // Do something with request error
    return Promise.reject(error);
  });