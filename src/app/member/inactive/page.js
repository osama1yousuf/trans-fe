'use client'

import Dashboard from "@/app/Components/Dashboard"
import DataTable from 'react-data-table-component';

const columns = [
  
    { name: 'Serial No', selector: 'id', sortable: true },
      {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Mobile #',
        selector: row => row.mobileNo,
    },
    // {
    //     name: 'Vehicle #',
    //     selector: row => row.vehicleNo,
    // },
    {
        name: 'Joining Date',
        selector: row => row.joiningDate,
    },
    {
        name: 'Status',
        selector: row => row.status,
        cell: row => (
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
            <option value="2">InActive</option>
            <option value="1">Active</option>
        </select>
        )
    },
    {
        name: 'Actions',
        selector: row => row.actions,
        // width:"100px",
        cell:row =>(
            <div className="w-full flex   lg:w-full ">
                        <button className="bg-orange-500 hover:bg-blue-700 text-white  p-1 rounded" type="submit">Delete Permenant</button>
                        {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
                    </div>
        )
    },
];

const data = [
    {
        id: 1,
        name: 'Qasim',
        mobileNo: '0323-6345453',
        vehicleNo:"K#56456",
        joiningDate:"10-3-2023",
        status:"",
        actions:""
    },
    {
        id: 2,
        name: 'Saleem',
        mobileNo: '0321-63445453',
        vehicleNo:"M#12456",
        joiningDate:"12-6-2013",
        status:"",
        actions:""
    },
    {
        id: 3,
        name: 'Farhan',
        mobileNo: '0325-6341213',
        vehicleNo:"L#56111",
        joiningDate:"03-1-2011",
        status:"",
        actions:""
    },{
        id: 4,
        name: 'Akbar Liyari',
        mobileNo: '0302-2225453',
        vehicleNo:"Q#111456",
        joiningDate:"20-5-2002",
        status:"",
        actions:""
    },{
        id: 5,
        name: 'Qasim',
        mobileNo: '0323-6345453',
        vehicleNo:"K#56456",
        joiningDate:"10-3-2023",
        status:"",
        actions:""
    },{
        id: 6,
        name: 'Kamran',
        mobileNo: '0301-2321453',
        vehicleNo:"K#5222",
        joiningDate:"08-1-2013",
        status:"",
        actions:""
    },
    {
        id: 7,
        name: 'Farhan',
        mobileNo: '0325-6341213',
        vehicleNo:"L#56111",
        joiningDate:"03-1-2011",
        status:"",
        actions:""
    },{
        id: 8,
        name: 'Akbar Liyari',
        mobileNo: '0302-2225453',
        vehicleNo:"Q#111456",
        joiningDate:"20-5-2002",
        status:"",
        actions:""
    }
]
export default function InactiveMember(){
    return(
        <Dashboard >
            <div className="z-0">    
             <DataTable
             title="Active Member List"
            //  fixedHeader
            columns={columns}
            data={data}
        />
            </div>
        </Dashboard>
    )
}
