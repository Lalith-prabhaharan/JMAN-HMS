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
import { Addpatient } from './components/addpatient';
import { Login } from './components/login';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
