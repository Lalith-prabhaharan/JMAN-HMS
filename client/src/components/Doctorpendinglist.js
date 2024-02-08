import React from 'react';
import DoctorNav from './DoctorNav';
import '../styles.css';
import '../style/Doctorpendinglist.css';
export default function Doctorpendinglist() {
    return (
        <div>
            <div>
                <DoctorNav />
            </div>
            <div id='content-container'>
            <h2>Pending Patients List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>App_ID</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21</td>
                                <td>Shubham Singh</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                            <tr>
                                <td>456</td>
                                <td>Soofa Singh</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                            <tr>
                                <td>789</td>
                                <td>Bob Smith</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Steve Smith</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Virat Kohli</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Sanju Samson</td>
                                <td><a className="status" href="">View</a></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    )
}
