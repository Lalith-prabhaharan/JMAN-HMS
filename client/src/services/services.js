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

export const approvedpatients=(status)=>{
    return axiosInstance.get(`${url}/admin/patientStatus/${status}`);
}

export const adddoctor=(doctordetails)=>{
    return axiosInstance.post(`${url}/admin/doctor/add`,doctordetails)
}

export const searchPatients = (status, search) => {
    return axiosInstance.get(`${url}/admin/patient/${search}/${status}`);
}

export const searchApplications = (status, search) => {
    return axiosInstance.get(`${url}/admin/application/${search}/${status}`);
}

export const searchDoctors = (dept, search) => {
    return axiosInstance.get(`${url}/admin/doctor/${search}/${dept}`);
}

export const searchHandlePatients = (search) => {
    return axiosInstance.get(`${url}/doctor/handlePatient/${search}`);
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

export const sendMail = (email) => {
    return axiosInstance.post(`${url}/auth/forget_password`, {email});
}

export const sendOtp = (email, otp) => {
    return axiosInstance.post(`${url}/auth/otp_verify`, {email, otp});
}

export const resetPassword = (email, pass) => {
    return axiosInstance.post(`${url}/auth/reset_pass`, {email, pass});
}