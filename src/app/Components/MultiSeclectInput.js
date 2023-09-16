'use client'
import { useEffect, useRef, useState } from "react";
const CustomMultiSelectInput = ({ intialDays ,sections, handleDaysChange  , i}) => {
    const [showDropdown , setShowDropdown] = useState(false)
    const [assignDays , setAssignDays] = useState([])
    const selectRef = useRef();
const handleClickOutside = (event)=>{
    if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
}
useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
},[])
useEffect(()=>{
    for (let index = 0; index < sections.length; index++) {
        const element = sections[index];
        if (index != i) {
            // let days = [...assignDays]
            setAssignDays(prevval => prevval.concat(element.selectedDays))
        }
    }
},[])

    return (<>
        <div className="border rounded p-2 cursor-pointer flex flex-wrap"  ref={selectRef}>
            {/* <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center my-1">
                Select Option
            </div> */}
            {intialDays.map(option => (
                <div
                    key={option}
                    className={`items-center m-2 ${assignDays.includes(option.name) && "opacity-50 pointer-events-none" }  `}
                    onClick={(e) => handleDaysChange(i, option)}
                >
                    <input
                        type="checkbox"
                        className="m-1"
                        checked={option.active}
                        readOnly
                    />
                    {option.value}
                </div>
            ))}
        </div>
    </>)
};

export default CustomMultiSelectInput;
