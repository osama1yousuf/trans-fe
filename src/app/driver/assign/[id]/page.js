'use client'

import Dashboard from "@/app/Components/Dashboard"
import { useState } from "react"

export default function Editassign() {
    let useData = [
        {
            name: "Aslam",
            time: "10:30AM",
            location: "5L New Karachi",
            Type: "Pickup"
        },
        {
            name: "Shariq",
            time: "3:30PM",
            location: "11-L New Karachi",
            Type: "Pickup"
        },
        {
            name: "Saleem",
            time: "12:30PM",
            location: "5D New Karachi",
            Type: "DropOff"
        },
    ]
    const [addNewDay , setAddNewDay] = useState([""])
    const [AddUser, setAddUser] = useState([{
        name: "",
        time: "",
        location: "",
        Type: ""
    }])
    return (
        <Dashboard>
            <div>
                <div className="flex">
                    <div className="w-1/2">    
                    <h1 className="text-2xl">Driver Name : Qasim</h1>
                    <br />
                    <h1>Vehicle No : Q#2345</h1>
                    <h1>Vehicle Capacity : 7</h1>
                    </div>
                    <div className="w-1/2">
                    <div className="w-full flex mt-10  lg:w-full ">
                <button onClick={()=> setAddNewDay([...addNewDay , ""])} className="bg-green-500 hover:bg-blue-700 text-white  px-8 py-2 rounded" type="submit">Add New Day</button>
                {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
            </div>
                    </div>
                </div>
                {
                    addNewDay.map((val, i)=>{
                        return(
                            <div className="border my-8 mx-4">
                            <div className="flex">
                                <div className="w-full mt-10 lg:w-3/4 px-3">
                                    <h1>SelectedDays : Monday , Tuesday</h1>
                                </div>
                                <div className="w-full mt-2 lg:w-1/4 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name"
                                    >
                                        Selcet Days Assign Again below Member
                                    </label>
                                    <select className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                        <option value="1">Monday</option>
                                        <option value="1">Tuesday</option>
                                        <option value="1">Wednesday</option>
                                        <option value="2">Thrusday</option>
                                        <option value="3">Friday</option>
                                        <option value="3">Saturday</option>
                                    </select>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto m-10 shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.NO
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Member Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Time
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Location
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            AddUser.map((val, index) => {
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {index + 1}
                                                        </th>
                                                        <td className="px-6 py-4"> <select className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                                            {
                                                                useData.map((val, index) => {
                                                                    return (
                                                                        <option value="1">{val.name}-{val.location}-{val.time}-{val.Type}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select></td>
                                                        <td className="px-6 py-4"></td>
                                                        <td className="px-6 py-4"></td>
                                                        <td className="px-6 py-4">
        
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
        
                                    </tbody>
                                </table>
                                <div>
                                    <div className="w-full">
                                        <button onClick={() => setAddUser([...AddUser, {
                                            name: "",
                                            time: "",
                                            location: "",
                                            Type: ""
                                        }])} className="bg-green-500 mx-10 my-4 hover:bg-blue-700 text-white  p-1 rounded" type="submit">Add LineItem</button>
                                        {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
               
            </div>

        </Dashboard>
    )
}