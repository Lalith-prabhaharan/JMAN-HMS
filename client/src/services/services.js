import axiosInstance from "../interceptor/axios-config";
const url='http://localhost:5000/api/v1';

export const doctordetails= ()=>{
    return axiosInstance.get(`${url}/admin/doctor`);
}

export const getdeptdoctors=(department)=>{
    return axiosInstance.get(`${url}/admin/doctor/${department}`);
}

export const adminadd=(patientDetails)=>{
    return axiosInstance.post(`${url}/admin/patient/application`,patientDetails);
}

export const adminstatus=()=>{
    return axiosInstance.get(`${url}/admin/patient/application/status`);
}

export const doctorpending=()=>{
    return  axiosInstance.get(`${url}/doctor/pending`);
}

