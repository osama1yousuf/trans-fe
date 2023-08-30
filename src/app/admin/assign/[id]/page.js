'use client'

import { useState } from "react"
import CustomMultiSelectInput from "@/app/Components/MultiSeclectInput"
import { toast } from "react-toastify"
import { BsFillArchiveFill } from "react-icons/bs";
import SingleSelectCheckbox from "@/app/Components/SingleSelectCheckbox"
export default function Editassign() {
    let intialSection = {
        selctedDays: [],
        data: [
            {
                name: "",
                time: "",
                location: "",
                Type: "",
                checked: false
            }
        ]
    }
    const [fakeUserData, setfakeUserData] = useState([
        {
            id: 1,
            name: "Aslam",
            time: "10:30AM",
            location: "5L New Karachi",
            Type: "Pickup",
            checked: false
        },
        {
            id: 2,
            name: "Shariq",
            time: "3:30PM",
            location: "11-L New Karachi",
            Type: "Pickup",
            checked: false
        },
        {
            id: 3,
            name: "Saleem",
            time: "12:30PM",
            location: "5D New Karachi",
            Type: "DropOff",
            checked: false
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
                    Type: "",
                    checked: false
                }
            ]
        }
    ])
    const [intialDays, setIntialDays] = useState([{ name: "Monday", active: false }, { name: "Tuesday", active: false }, { name: "Wednesday", active: false }, { name: "Thursday", active: false }, { name: "Friday", active: false }, { name: "Saturday", active: false }, { name: "Sunday", active: false }])

    const handleClick = () => {
        let found = intialDays.find((val) => val.active != true)
        if (found) {
            setSections([...sections, intialSection])
        } else {
            toast.error("Not days Available")
        }
    }

    const handleDaysChange = (id, val) => {
        console.log(val, id);
        if (val.active) {
            let index = intialDays.findIndex((v) => v.name == val.name)
            let setDays = [...intialDays]
            setDays[index].active = false
            setIntialDays(setDays)
            let sectionsvalues = [...sections]
            sectionsvalues[id].selctedDays = sectionsvalues[id].selctedDays.filter((e) => e != val.name)
            setSections(sectionsvalues)
            // const filterSections = sections.filter((e)=> e.selctedDays.includes(!val.name))
            // setSections(filterSections)
        } else {
            let index = intialDays.findIndex((v) => v.name == val.name)
            let setDays = [...intialDays]
            setDays[index].active = true
            setIntialDays(setDays)
            let sectionvalues = [...sections]
            sectionvalues[id].selctedDays.push(val.name)
            setSections(sectionvalues)
        }
        // if (sections[val].selctedDays.includes(e)) {
        //         setAssignDays(assignDays.filter(item => item !== e));
        //     let value = [...sections]
        //      value[val].selctedDays = assignDays
        //     setSections([...assignDays])
        // } else {
        //     let value = [...sections]
        //     value[val].selctedDays.push(e)
        //     setSections(value)
        //     setAssignDays([...assignDays, e])
        // }

    }

    const handleLineItems = (e) => {
        console.log(e);
        let found = fakeUserData.find((val) => val.checked == false)
        console.log(found);
        if (found) {
            // console.log()
            let value = [...sections]
            value[e].data.push({
                name: "",
                time: "",
                location: "",
                Type: "",
                checked: false
            })
            setSections(value)
            // console.log(sections,"check ")
        }
        else {
            toast.error("No member available")
        }
    }

    const handleMemberChange = (pi, ci, e) => {
        let value = [...sections]
        let tempVal = [...fakeUserData]
        if (e) {
            let targetValue = e
            if (value[pi].data[ci].name == "" && value[pi].data[ci].time == "" && value[pi].data[ci].location == "" && value[pi].data[ci].Type == "") {
                value[pi].data[ci] = targetValue
                targetValue.checked = true
                let ind = tempVal.findIndex((e) => e.id == targetValue.id)
                tempVal[ind].checked = true
                setfakeUserData(tempVal)
                setSections(value)
            } else {
                let index = tempVal.findIndex((v) => v.id == value[pi].data[ci].id)
                targetValue.checked = true
                tempVal[index].checked = false
                setfakeUserData(tempVal)
                value[pi].data[ci] = targetValue
                setSections(value)
            }
        }
    }

    const deleteSection = (i) => {
        let days = sections[i].selctedDays
        if (days) {
            let allDays = [...intialDays]
            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                let index = allDays.findIndex((e) => e.name == element)
                allDays[index].active = false
            }
            setIntialDays(allDays)
        }
        let member = sections[i].data
        if (member) {
            let allMembers = [...fakeUserData]
            for (let i = 0; i < member.length; i++) {
                const element = member[i];
                let index = allMembers.findIndex((e) => e.id == element.id)
                if (index != -1) {
                    allMembers[index].checked = !allMembers[index].checked
                }
            }
            setfakeUserData(allMembers)
        }
        let sec = [...sections]
        sec.splice(i, 1)
        setSections(sec)
    }

    const deleteLineItem = (pi, ci) => {
        let data = sections[pi].data[ci]
        if (data.name) {

            let allMembers = [...fakeUserData]
            console.log(allMembers);
            let index = allMembers.findIndex((e) => e.id == data.id)

            if (index != -1) {
                allMembers[index].checked = !allMembers[index].checked
            }
            setfakeUserData(allMembers)
        }
        let sec = [...sections]
        sec[pi].data.splice(ci, 1)
        setSections(sec)
    }

    const handleFormSubmit = async () => {
        let check = false
        for (let index = 0; index < sections.length; index++) {
            const element = sections[index];
            if (element.selctedDays.length > 0) {
                let find = element.data.find((e) => e.name == "")
                if (!find) {
                    check = true
                } else {
                    toast.error(`Please select a Member in ${index + 1} section otherwise delete this line`)
                }
            } else {
                toast.error(`Please select a AssignDays in ${index + 1} section otherwise delete this section`)

            }
            if (check) {
                try {
                    const responsne = await axiosInstance.post('/driver', sections)
                    console.log("responsne", responsne);
                    toast.success("Driver created successfully", { autoClose: 1200 })
                    router.push('/admin/activedriver')
                } catch (e) {
                    console.log("error", e.response.data.message[0]);
                    toast.error(e.response.data.message[0], { autoClose: 1000 })
                }
            }

        }
    }
    return (
        <div>
            {console.log("fakeUserData", fakeUserData)}
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
                            <div className="flex justify-between px-8 py-4">
                                <div className="">
                                    <h1>SelectedDays :{val.selctedDays.length > 0 && val.selctedDays.map((val, i) => {
                                        return (<span className="mx-2" key={i} >{val}  </span>)
                                    })}</h1>
                                </div>
                                <div className="flex gap-4 items-center bg-white">
                                    <div>
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-last-name"
                                        >
                                            Selcet Days Assign Again below Member
                                        </label>
                                        <CustomMultiSelectInput
                                            intialDays={intialDays} sections={sections} handleDaysChange={handleDaysChange} i={i}
                                        />
                                    </div>
                                    <div className="" >
                                        <BsFillArchiveFill className="text-orange-700 cursor-pointer" onClick={() => deleteSection(i)} />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto m-10 shadow-md sm:rounded-lg">
                                <table className="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                            <th scope="col" className="px-6 py-3">
                                                Action
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
                                                            {/* <input className="" type="" name="" value="" />
                                                            {
                                                                fakeUserData.map((val, index) => {
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={`items-center my-1 "opacity-50 pointer-events-none" `}
                                                                            // onClick={(e) => handleDaysChange(i, option)}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-2"
                                                                                // checked={option.active}
                                                                                readOnly
                                                                            />
                                                                            {val.name}-{val.location}-{val.time}-{val.Type}
                                                                        </div>
                                                                        // <option className={`${assignData.some((e) => e.name == val.name) ? "text-gray-500" : "text-green-500"}`} disabled={assignData.some((e) => e.name == val.name)} key={index} value={JSON.stringify(val)}>{val.name}-{val.location}-{val.time}-{val.Type}</option>
                                                                    )
                                                                })
                                                            } */}
                                                            <SingleSelectCheckbox fakeUserData={fakeUserData} sections={sections} ind={i} newindex={index} handleMemberChange={handleMemberChange} />
                                                            {/* <select  onChange={(e) => handleMemberChange(i, index, e)} className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                                                                <option value={""}>select Option</option>
                                                                {
                                                                    fakeUserData.map((val, index) => {
                                                                        return (
                                                                            <option className={`${assignData.some((e) => e.name == val.name) ? "text-gray-500" : "text-green-500"}`} disabled={assignData.some((e) => e.name == val.name)} key={index} value={JSON.stringify(val)}>{val.name}-{val.location}-{val.time}-{val.Type}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select> */}
                                                        </td>
                                                        <td className="px-6 py-4">{newVal.time}</td>
                                                        <td className="px-6 py-4">{newVal.location}</td>
                                                        <td className="px-6 py-4">
                                                            {newVal.Type}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button className="bg-orange-500 hover:bg-blue-700 text-white  p-1 rounded" onClick={() => deleteLineItem(i, index)} type="">Delete</button>
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
            <div className="flex justify-end mx-2">
                <button className="bg-green-600 text-white rounded px-3 py-1" onClick={handleFormSubmit} >Save</button>
            </div>
        </div>

    )
}