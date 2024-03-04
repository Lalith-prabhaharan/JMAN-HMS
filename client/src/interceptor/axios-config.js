import axios from "axios";

const axiosInstance=axios.create(
    // {
    // headers:{
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    // },
    // }
);

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
},
error=>{
    return Promise.reject(error);
}
)

axiosInstance.interceptors.response.use((response)=>{
    return response;
},
error=>{
    return Promise.reject(error);       
}
)

export default axiosInstance;