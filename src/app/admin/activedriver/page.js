'use client'
import { useRouter } from 'next/navigation';
import { BiEdit } from "react-icons/bi";
import { BsPersonPlusFill } from "react-icons/bs";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import axiosInstance from '@/interceptor/axios_inteceptor';
import { toast } from 'react-toastify';

export default function activeDriver(){
    const router = useRouter();
    const [data , setData] = useState([])
    const columns = [
        {
            name: 'Actions',
            selector: row => row,
            // width:"100px",
            cell:row =>(
                <div className="w-full flex  gap-1 lg:w-full ">
                    
                            <span title="Edit Driver Detail">
                            <button onClick={(e)=> editDriver(row)} className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" ><BiEdit/></button>
                            </span>
                            <span title="Edit Driver Assignment">
                            <button onClick={(e)=> handleEditAssign(row) } className="bg-blue-500 hover:bg-blue-700 text-white  p-1 rounded" ><BsPersonPlusFill/></button>
                            </span>
                        </div>
            )
        },
          {
            name: 'Name',
            selector: row => row.firstName,
        },
        {
            name: 'Mobile #',
            selector: row => row.contactOne,
        },
        {
            name: 'Vehicle #',
            selector: row => row.vehicleInfo.vehicleNo,
        },
        {
            name: 'Joining Date',
            selector: row => row.joiningDate,
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => (
                <select value={row.status} onChange={()=>handleCustomerStatusChange(row)}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                <option value="1">Active</option>
                <option value="2">InActive</option>
            </select>
            )
        },
        
    ];
    
   
  const editDriver =  (e)=>{
    router.push(`/admin/editdriver/${e._id}`)
  } 
    const  handleEditAssign =(e)=>{
    router.push(`/admin/assign/${e._id}`);
    }

    async function getDriver() {
        try {
            let response = await axiosInstance.get('/driver?status=active')
            console.log(response.data);
            setData(response.data)
        } catch (e) {
            console.log(e);
        }
    }
    const handleCustomerStatusChange = async (row) => {
        let body = {
            status: row.status == 'active' ? 'inActive' : 'active'
        }
       
        try {
            let response = await axiosInstance.put(`/driver/status/${row._id}`, body)
            console.log("response", response);
            await getDriver()
            toast.success(response.data.message)
        } catch (e) {
            console.log(e);
            toast.error(e.data)
        }

    }
    useEffect(() => {
        getDriver()
    }, [])

    return(
        // <Dashboard >
            <div className="z-0">    
             <DataTable
            //  title="Active Driver List"
            //  fixedHeader
            columns={columns}
            data={data}
        />
            </div>
        // </Dashboard>
    )
}
