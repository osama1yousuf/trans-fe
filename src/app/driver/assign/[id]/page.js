'use client'

import Dashboard from "@/app/Components/Dashboard"
import { useState } from "react"

export default function Editassign() {
    let intialSection = {
        selctedDays: [],
        data: [
            {
                name: "",
                time: "",
                location: "",
                Type: ""
            }
        ]
    }
    const [fakeUserData, setfakeUserData] = useState([
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
    ])
    const [assignData, setAssignData] = useState([])
    const [sections, setSections] = useState([
        {
            selctedDays: [],
            data: [
                {
                    name: "",
                    time: "",
                    location: "",
                    Type: ""
                }
            ]
        }
    ])
    const [intialDays, setIntialDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    const [assignDays, setAssignDays] = useState([])

    const handleClick = () => {
        console.log(assignDays.length);
        if (assignDays.length < 7) {
            setSections([...sections, intialSection])
        } else {
            window.alert("Not days Available")
        }
    }
   
    const handleDaysChange = (val, e) => {
        let value = [...sections]
        value[val].selctedDays.push(e.target.value)
        setSections(value)
        setAssignDays([...assignDays, e.target.value])
    }

    const handleLineItems = (e) => {
        if (assignData.length < fakeUserData.length) {
            let value = [...sections]
            value[e].data.push({
                name: "",
                time: "",
                location: "",
                Type: ""
            })
            setSections(value)
        }else{
            window.alert("No member available")
        }
    }

    const handleMemberChange = (pi, ci, e) => {
        let targetValue =  JSON.parse(e.target.value)
        let value = [...sections]
        if (value[pi].data[ci].name == "" && value[pi].data[ci].time == "" && value[pi].data[ci].location == "" && value[pi].data[ci].Type == "") {
           console.log("object");
            value[pi].data[ci] = targetValue
            setAssignData([...assignData, targetValue])
            setSections(value)
        }else{
            console.log("222");
            // console.log(assignData.filter((v)=> v.name !== targetValue.name));
            let prevAssign = [...assignData]
            let index = prevAssign.findIndex((v)=> v.name == value[pi].data[ci].name)
            prevAssign.splice(index , 1)
            setAssignData([...prevAssign , targetValue])
            value[pi].data[ci] = targetValue
            setSections(value)
        }
    }
    return (
        <Dashboard>
            {/* {console.log(assignData)} */}
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
                            <button onClick={() => handleClick()} className="bg-green-500 hover:bg-blue-700 text-white  px-8 py-2 rounded" type="submit">Add New Day</button>
                        </div>
                    </div>
                </div>
                {
                    sections.map((val, i) => {
                        return (
                            <div className="border my-8 mx-4">
                                <div className="flex">
                                    <div className="w-full mt-10 lg:w-3/4 px-3">
                                        <h1>SelectedDays :{val.selctedDays.length > 0 && val.selctedDays.map((val, i) => {
                                            return (<span className="mx-2" key={i} >{val}  </span>)
                                        })}</h1>
                                    </div>
                                    <div className="w-full mt-2 lg:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-last-name"
                                        >
                                            Selcet Days Assign Again below Member
                                        </label>
                                        <select onChange={(e) => handleDaysChange(i, e)} className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                            <option value="">Select Options</option>
                                            {
                                                intialDays.map((v, i) => {
                                                    return (
                                                        <option className={`${assignDays.includes(v) ? "text-gray-500" : "text-green-500"}`} disabled={assignDays.includes(v)} key={i} value={v}>{v}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="overflow-x-auto m-10 shadow-md sm:rounded-lg">
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
                                                val.data.map((newVal, index) => {
                                                    return (
                                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                <select  onChange={(e) => handleMemberChange(i, index, e)} className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                                                    <option value={""}>select Option</option>
                                                                    {
                                                                        fakeUserData.map((val, index) => {
                                                                            return (
                                                                                <option className={`${assignData.some((e)=> e.name == val.name ) ? "text-gray-500" : "text-green-500"}`} disabled={assignData.some((e)=> e.name == val.name )} key={index} value={JSON.stringify(val)}>{val.name}-{val.location}-{val.time}-{val.Type}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select></td>
                                                            <td className="px-6 py-4">{newVal.time}</td>
                                                            <td className="px-6 py-4">{newVal.location}</td>
                                                            <td className="px-6 py-4">
                                                                {newVal.Type}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div>
                                        <div className="w-full">
                                            <button onClick={(e) => handleLineItems(i)} className="bg-green-500 mx-10 my-4 hover:bg-blue-700 text-white  p-1 rounded" type="submit">Add LineItem</button>
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