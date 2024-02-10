import './App.css';
import {Routes,Route} from 'react-router-dom'
import { Addpatient } from './components/addpatient';
import { Login } from './components/login';
// import navbar from './components/navbar';
import { Authentication } from './utils/authentication';
import { Viewpatient } from './components/viewpatient';
import { Doctordetails } from './components/doctordetails';
import AdminAllPatient from './components/AdminAllPatients';
import AdminStatus from './components/AdminStatus';
import { Requiredauth } from './utils/requiredauth';
import Doctorpendinglist from './components/Doctorpendinglist';
import Doctorviewpendingpatient from './components/Doctorviewpendingpatient';

function App() {
  return (
    <div className="App">

      <Authentication>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/addpatient" element={<Addpatient/>}></Route>
      <Route path="/mypatients" element={<Requiredauth><Viewpatient/></Requiredauth>}></Route>
      <Route path="/doctordetails" element={<Doctordetails/>}></Route>
      <Route path="/allpatients" element={<AdminAllPatient/>}></Route>
      <Route path="/viewstatus" element={<AdminStatus/>}></Route>
      <Route path="/pending" element={<Doctorpendinglist/>}></Route>
      <Route path="/pending/:id" element={<Doctorviewpendingpatient/>}></Route>
      </Routes>
      </Authentication>
    </div>
  );
}

export default App;
