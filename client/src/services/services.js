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

export const adminstatus=(status)=>{
    return axiosInstance.get(`${url}/admin/patient/application/status/${status}`);
}

export const doctorpending=()=>{
    return  axiosInstance.get(`${url}/doctor/pending`);
}

export const doctorhandling=()=>{
    return axiosInstance.get(`${url}/doctor/handling`);
}

export const approvedpatients=()=>{
    return axiosInstance.get(`${url}/admin/patient/status`);
}

export const adddoctor=(doctordetails)=>{
    return axiosInstance.post(`${url}/admin/doctor/add`,doctordetails)
}

export const approvePatients= (id)=> {
    return axiosInstance.put(`${url}/doctor/approve/${id}`)
}

export const rejectPatients= (id, reason)=> {
    return axiosInstance.patch(`${url}/doctor/reject/${id}`, {reason});
}

export const reapplyPatient = (patientDetails) => {
    return axiosInstance.patch(`${url}/admin/patient/application`,patientDetails);
}