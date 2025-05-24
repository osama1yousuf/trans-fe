'use client'

import { useEffect, useRef, useState } from "react"

export default function SingleSelectCheckbox({ fakeUserData, handleMemberChange, ind, newindex, sections }) {

    const [searchInput, setSearchInput] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [assignMember, setAssignMember] = useState([])
    const handleBlur = () => {
        setShowDropdown(!showDropdown)
        //   fakeUserData
    }
    const selectRef = useRef();
    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }
    useEffect(() => {
        // // console.log(sections);
        let data = []
        for (let i = 0; i < sections.length; i++) {
            const element = sections[i];
            for (let i = 0; i < element.data.length; i++) {
                const val = element.data[i];
                let found = data.find((e) => e.id == val.id && e.checked)
                if (!found) {
                    // console.log("val.name" , val.name)
                    if (val.name) {
                        data.push(val)
                    }
                }
                setAssignMember(data)
            }
        }
    }, [sections])
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <div ref={selectRef}>
            {// console.log("assignMember" , assignMember)}
            <div
                onClick={handleBlur}
                style={{width:"120px"}}
                className="border h-9 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
            >{sections[ind].data[newindex].name}</div>
            <div style={{ maxHeight: "150px" , width:"120px" }} className={`border-2 overflow-y-scroll bg-white absolute z-4 max-h-xl ${!showDropdown && 'hidden'}`} >
                <input type="text" name="searchMember" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    className="border h-6 py-2 border-gray-300 min-w-12 text-gray-900 sm:text-xs rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                />
                {
                    fakeUserData.map((val, index) => {
                        return (
                            <div
                                key={index}
                                className={`items-center p-1 h-6 ${val.checked && assignMember.some((e) => e.name == val.name) ? "opacity-50 pointer-events-none" : ''}  cursor-pointer`}
                                onClick={() => handleMemberChange(ind, newindex, val)}
                            // onClick={() => handleMemberChange(i, newindex, val)}
                            >
                                {/* <input
                                
                                type="checkbox"
                                className="mr-2"
                                // checked={ sections[i].data[newindex].name && sections[i].data[newindex].name}
                                checked={
                                    sections[ind].data[newindex].checked && sections[ind].data[newindex].name == val.name 
                                    // sections[i].data[newindex]
                                }
                                
                            /> */}
                                {val.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}