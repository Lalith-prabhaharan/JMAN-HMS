import './App.css';
import {Routes,Route} from 'react-router-dom'
import { Addpatient } from './components/addpatient';
import { Login } from './components/login';
import { Navbar } from './components/navbar';
import { Authentication } from './utils/authentication';
import { Viewpatient } from './components/viewpatient';

function App() {
  return (
    <div className="App">

      <Authentication>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/addpatient" element={<Addpatient/>}></Route>
      </Routes>
      </Authentication>
    </div>
  );
}

export default App;
