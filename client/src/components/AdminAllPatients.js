import React from 'react';
import './style/AdminAllPatientnStatus.css';
//adminstatus and adminallpatient styling is same
import '../styles.css';
import './navbar';
export default function AdminAllPatient() {
  return (
      <div>
          <div>
              <navbar/>
          </div>
          <div id='content-container'>
          <input type="text" id="search-bar" placeholder=" search by name"/>   
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
