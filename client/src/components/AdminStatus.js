import React from 'react';
import './style/AdminAllPatientnStatus.css';
import '../styles.css';
import './navbar';
export default function AdminStatus() {
  return (
      <div>
          <div>
          {/* <Navbar />     */}
          </div>
          <div id='content-container'>
            <h2>Application Status</h2>
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
                                <td><a className="status" href="">Pending</a></td>
                            </tr>
                            <tr>
                                <td>456</td>
                                <td>Soofa Singh</td>
                                <td><a className="status" href="">Pending</a></td>
                            </tr>
                            <tr>
                                <td>789</td>
                                <td>Bob Smith</td>
                                <td><a className="status" href="">Not Approved</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Steve Smith</td>
                                <td><a className="status" href="">Pending</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Virat Kohli</td>
                                <td><a className="status" href="">Not Approved</a></td>
                            </tr>
                            <tr>
                                <td>782</td>
                                <td>Sanju Samson</td>
                                <td><a className="status" href="">Pending</a></td>
                            </tr>
                        </tbody>
                    </table>
            </div>

    </div>
  )
}
