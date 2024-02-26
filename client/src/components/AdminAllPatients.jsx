import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Navbar } from './navbar';
import '../style/AdminAllPatientStatus.css';

export default function AdminAllPatient() {
    const [globalFilter, setGlobalFilter] = useState('');

    const statuses = [
        { appId: 21, name: 'Shubham Singh', status: 'View' },
        { appId: 456, name: 'Soofa Singh', status: 'View' },
        { appId: 789, name: 'Bob Smith', status: 'View' },
        { appId: 782, name: 'Steve Smith', status: 'View' },
        { appId: 782, name: 'Virat Kohli', status: 'View' },
        { appId: 782, name: 'Sanju Samson', status: 'View' }
    ];

    const header = (
        <div  style={{ textAlign: 'left' }}>
            <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
            <InputText id='search-bar' type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
        </div>
    );

    return (
        <Navbar>
            <div className='status'>
                <DataTable value={statuses} header={header} globalFilter={globalFilter}>
                    <Column field="appId" header="App_ID" />
                    <Column field="name" header="Name" />
                    <Column field="status" header="Status" />
                </DataTable>
            </div>
        </Navbar>
    );
}
