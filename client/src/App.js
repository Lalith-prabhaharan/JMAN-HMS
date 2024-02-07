import './App.css';
import {Routes,Route} from 'react-router-dom'
import { Addpatient } from './components/addpatient';
import { Login } from './components/login';
import { Navbar } from './components/navbar';
import { Authentication } from './utils/authentication';
import { Viewpatient } from './components/viewpatient';
import { Doctordetails } from './components/doctordetails';

function App() {
  return (
    <div className="App">

      <Authentication>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/addpatient" element={<Addpatient/>}></Route>
      <Route path="/viewpatient" element={<Viewpatient/>}></Route>
      <Route path="/doctordetails" element={<Doctordetails/>}></Route>
      
      </Routes>
      </Authentication>
    </div>
  );
}

export default App;
