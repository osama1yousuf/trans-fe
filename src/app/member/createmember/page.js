import Dashboard from "@/app/Components/Dashboard";
import { FaUser } from "react-icons/fa";
export default function createMember() {
    let time = ["9:00 AM" , "9:30 AM" , "10:00 AM" , "10:30 AM" , "11:00 AM"  , "11:30 AM" , "12:00 PM" , "12:30 PM" , "1:00 PM" , "1:30 PM" , "2:00 PM" , "2:30 PM" , "3:00 PM" , "3:30 PM" , "4:00 PM" , "4:30 PM" , "5:00 PM" ,"5:30 PM" , "6:00 PM" , "6:30 PM" , "7:00 PM" , "7:30 PM" , "8:00 PM" , "8:30 PM" ,"9:00 PM" , "9:30 PM" , "10:00 PM" , "10:30 PM" , "11:00 PM" , "11:30 PM" , "12:00 AM"]
    let area = ["Baldia Town" , "Bin Qasim Town" ,"Gadap Town" , "Gulberg Town" , "Gulshan Town" , "Jamshed Town" , "Kiamari Town"  , "Korangi Town" ,"Liaquatabad Town" , "Lyari Town" , "Malir Town" , "New Karachi Town" ]
    return (
        <Dashboard>
            <br />
            <h1 className="text-3xl border-b-2">Create Member</h1>
            <br />
            <form className="w-full">
                <div className="flex  flex-wrap -mx-3 mb-6">
                    <div className="lg:max-w-lg w-full lg:w-2/4 ">
                        <div className="w-full  mt-2 md:w-full px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="First Name"
                            />
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                        <div className="w-full  mt-2 md:w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Last Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="w-full mt-2 lg:w-2/4 px-3">
                        <div className="border mx-14 sm:mx-24 lg:mx-20 xl:mx-32 flex justify-center aligin-center p-2">
                            <FaUser size={130} />
                        </div>
                        <div className="block mx-12 sm:mx-32 my-2">
                            {/* <span className="sr-only">Choose profile photo</span> */}
                            <input
                                type="file"
                                className="block w-full  text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                        </div>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            NIC No
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="42***-*******-*"
                        />
                    </div>
                    {/* <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            NIC Expiry
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="date"
                        // placeholder="42***-*******-*"
                        />
                    </div> */}
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Mobile # *
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="tel"
                        // placeholder="42***-*******-*"
                        />
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            PickUp
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            area.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            DROP OFF
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            area.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    {/* <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Mobile # 2
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                        // placeholder="42***-*******-*"
                        />
                    </div> */}
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Morning Pickup Time
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            time.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Evening DropOff Time
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            time.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Sat-Morning Pickup Time
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            time.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Sat-Evening DropOff Time
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="select">Select</option>
                           {
                            time.map((val , index)=>{
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="w-full  mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Day Off
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option  value="Sat">Sat Off</option>
                            <option  value="Sat-Sun">Sat-Sun Off</option>
                        </select>
                    </div>
                   
                    <div className="w-full mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Fees
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="number"
                        // placeholder="42***-*******-*"
                        />
                    </div>
                    <div className="w-full mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Fees Type
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option value="1">Advance</option>
                            <option value="2">Month End</option>
                        </select>
                    </div>
                    <div className="w-full mt-2 lg:w-1/4 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Status
                        </label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-init>
                            <option value="1">Active</option>
                            <option value="2">InActive</option>
                        </select>
                    </div>
                    <div className="w-full mt-2 lg:w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Comments
                        </label>
                        <textarea
                            rows="6" cols="50"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        // id="grid-last-name"
                        // type="textarea"
                        // placeholder="42***-*******-*"
                        />
                    </div>
                    <div className="w-full flex justify-center aligin-center m-4 lg:w-full px-3">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">SAVE</button>
                    </div>
                </div>

            </form>
        </Dashboard>

    )
}