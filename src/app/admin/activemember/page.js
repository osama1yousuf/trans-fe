'use client'

import axiosInstance from "@/interceptor/axios_inteceptor";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { toast } from "react-toastify";
import moment from 'moment';
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function ActiveMember() {
    const router = useRouter();
    const columns = [
        {
            name: 'Actions',
            selector: row => row.actions,
            // width:"100px",
            cell: row => (
                <span title="Edit Member" className="w-full flex   lg:w-full ">
                    <button onClick={(e)=> editMember(row)} className="bg-green-500 hover:bg-blue-700 text-white  p-1 rounded" type="submit"><BiEdit/></button>
                    {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
                </span>
            )
        },{
            name: 'Name',
            selector: row => row.firstName,
        },
        {
            name: 'Mobile #',
            selector: row => row.contactOne,
        },
        // {
        //     name: 'Vehicle #',
        //     selector: row => row.vehicleNo,
        // },
        {
            name: 'Joining Date',
            selector: row => row.status.joinDate,
            cell: row => (
                <div>
                    {moment(row.status.joinDate).format('DD-MM-YYYY')}
                </div>
            )
        },
        {
            name: 'Status',
            selector: row => row.currentStatus,
            cell: row => (
                <select onChange={() => handleCustomerStatusChange(row)} value={row.currentStatus} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                    <option value="active">Active</option>
                    <option value="inActive">InActive</option>
                </select>
            )
        },
        ,
    ];
    const editMember =  (e)=>{
        router.push(`/admin/editMember/${e._id}`)
      } 
    const [data, setData] = useState([])
    async function getMemeber() {
        try {
            let response = await axiosInstance.get('/customer?status=active')
            setData(response.data)
        } catch (e) {
            console.log("error", e.response.data.message[0]);
        }
    }
    const handleCustomerStatusChange = async (row) => {
        let body = {
            status : row.currentStatus == 'active' ? 'inActive' : 'active'
        }
        console.log(row);
        console.log(body);
        try {
            let response = await axiosInstance.put(`/customer/status/${row._id}` , body)
            console.log("response", response);
            await getMemeber()
            toast.success(response.message)
        } catch (e) {
            console.log(e.message);
            toast.error(e.message)
        }

    }
    useEffect(() => {
        getMemeber()
    }, [])
    return (
        // <Dashboard >
        <div className="z-0">
            <DataTable
                // title="Active Member List"
                //  fixedHeader
                columns={columns}
                data={data}
            />
        </div>
        // </Dashboard>
    )
}
