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

<<<<<<< HEAD
export const adminstatus=()=>{
    return axiosInstance.get(`${url}/admin/patient/application/status`);
=======

export const adminstatus=(status)=>{
    return axiosInstance.get(`${url}/admin/patient/application/status/${status}`);
>>>>>>> d21fb4d164239096f9469c3859f5ae809b9ae0f3
}

export const doctorpending=()=>{
    return  axiosInstance.get(`${url}/doctor/pending`);
}

