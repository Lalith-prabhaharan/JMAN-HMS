import React, { useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';

export default function AdminAllPatient() {
    const [inputData, setInputData] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const data = [
        { id: 21, name: "Shubham Singh" },
        { id: 456, name: "Soofa Singh" },
        { id: 789, name: "Bob Smith" },
        { id: 780, name: "Steve Smith" },
        { id: 127, name: "Virat Kohli" },
        { id: 712, name: "Sanju Samson" }
    ];

    const changeEvent = (e) => {
        setInputData(e.target.value);
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <Navbar>
            <div className='status'>
   <div>
   <i className="pi pi-search search_icon" style={{ color: 'var(--primary-color)' }}></i>
   <input type="text" id="search-bar" value={inputData} onChange={changeEvent} placeholder="Search by name" />

   </div>
                <table>
                    <thead>
                        <tr>
                            <th>App_ID</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                        filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><a className="status1" href="">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Navbar>
    );
}
