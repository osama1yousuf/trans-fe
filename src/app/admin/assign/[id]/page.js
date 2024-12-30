"use client";
import { useEffect, useState } from "react";
import CustomMultiSelectInput from "@/app/Components/MultiSeclectInput";
import { toast } from "react-toastify";
import SingleSelectCheckbox from "@/app/Components/SingleSelectCheckbox";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { usePathname, useRouter } from "next/navigation";
import { BsXCircle } from "react-icons/bs";
import { useUserValidator } from "@/interceptor/userValidate";

export default function Editassign() {
  useUserValidator("superadmin");
  const router = useRouter();
  const pathname = usePathname();
  let intialSection = {
    selectedDays: [],
    data: [
      {
        id: "",
        name: "",
        pickUpTime: "",
        dropOffTime: "",
        pickUplocation: "",
        dropOfflocation: "",
        Type: "bothSide",
        checked: false,
      },
    ],
  };
  const [fakeUserData, setfakeUserData] = useState([]);
  const [driverDetail, setDriverDetail] = useState(null);
  const [assignData, setAssignData] = useState([]);
  const [sections, setSections] = useState([
    {
      selectedDays: [],
      data: [
        {
          id: null,
          name: null,
          pickUpTime: null,
          dropOffTime: null,
          pickUplocation: null,
          dropOfflocation: null,
          Type: "bothSide",
          checked: false,
        },
      ],
    },
  ]);
  const [intialDays, setIntialDays] = useState([
    { name: "mon", value: "Monday", active: false },
    { name: "tue", value: "Tuesday", active: false },
    { name: "wed", value: "Wednesday", active: false },
    { name: "thu", value: "Thursday", active: false },
    { name: "fri", value: "Friday", active: false },
    { name: "sat", value: "Saturday", active: false },
    { name: "sun", value: "Sunday", active: false },
  ]);

  const handleClick = () => {
    let found = intialDays.find((val) => val.active != true);
    if (found) {
      setSections([...sections, intialSection]);
    } else {
      toast.error("Not days Available");
    }
  };

  const handleDaysChange = (id, val) => {
    console.log(val, id);
    if (val.active) {
      let index = intialDays.findIndex((v) => v.name == val.name);
      let setDays = [...intialDays];
      setDays[index].active = false;
      setIntialDays(setDays);
      let sectionsvalues = [...sections];
      sectionsvalues[id].selectedDays = sectionsvalues[id].selectedDays.filter(
        (e) => e != val.name
      );
      setSections(sectionsvalues);
      // const filterSections = sections.filter((e)=> e.selectedDays.includes(!val.name))
      // setSections(filterSections)
    } else {
      let index = intialDays.findIndex((v) => v.name == val.name);
      let setDays = [...intialDays];
      setDays[index].active = true;
      setIntialDays(setDays);
      let sectionvalues = [...sections];
      sectionvalues[id].selectedDays.push(val.name);
      setSections(sectionvalues);
    }
    // if (sections[val].selectedDays.includes(e)) {
    //         setAssignDays(assignDays.filter(item => item !== e));
    //     let value = [...sections]
    //      value[val].selectedDays = assignDays
    //     setSections([...assignDays])
    // } else {
    //     let value = [...sections]
    //     value[val].selectedDays.push(e)
    //     setSections(value)
    //     setAssignDays([...assignDays, e])
    // }
  };

  const getAllMembers = async () => {
    try {
      let response = await axiosInstance.get("/customer?status=active");
      console.log("response", response.data);
      let newValue = [];
      for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        console.log("ele");
        newValue.push({
          id: element._id,
          name: element.firstName,
          pickUpTime: element.timings.pickUpTime,
          dropOffTime: element.timings.dropOffTime,
          pickUplocation: element.location.pickUpAddress,
          dropOfflocation: element.location.dropOffAddress,
          Type: element.location.dropType,
          checked: false,
        });
      }
      setfakeUserData(newValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getDriver = async (id) => {
    try {
      let response = await axiosInstance.get(`driver/${id}`);
      setDriverDetail(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDrivePreviousAssign = async (id) => {
    try {
      let response = await axiosInstance.get(`assignment/driver/${id}`);
      console.log("response previos", response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let id = pathname.replace("/admin/assign/", "");
    getAllMembers();
    getDrivePreviousAssign(id);
    getDriver(id);
  }, [pathname]);

  const handleLineItems = (e) => {
    console.log(e);
    let found = fakeUserData.find((val) => val.checked == false);
    console.log(found);
    if (found) {
      // console.log()
      let value = [...sections];
      value[e].data.push({
        name: null,
        time: null,
        location: null,
        Type: null,
        checked: false,
      });
      setSections(value);
      // console.log(sections,"check ")
    } else {
      toast.error("No member available");
    }
  };

  const handleMemberChange = (pi, ci, e) => {
    let value = [...sections];
    let tempVal = [...fakeUserData];
    console.log("e", e);
    if (e) {
      let targetValue = e;
      if (value[pi].data[ci].name === null) {
        value[pi].data[ci] = targetValue;
        targetValue.checked = true;
        let ind = tempVal.findIndex((e) => e.id == targetValue.id);
        console.log("tempVal[ind]", tempVal[ind]);
        tempVal[ind].checked = true;
        setfakeUserData(tempVal);
        setSections(value);
      } else {
        let index = tempVal.findIndex((v) => v.id == value[pi].data[ci].id);
        targetValue.checked = true;
        console.log("targetValue", index);
        tempVal[index].checked = false;
        setfakeUserData(tempVal);
        value[pi].data[ci] = targetValue;
        setSections(value);
      }
    }
  };

  const deleteSection = (i) => {
    let days = sections[i].selectedDays;
    if (days) {
      let allDays = [...intialDays];
      for (let i = 0; i < days.length; i++) {
        const element = days[i];
        let index = allDays.findIndex((e) => e.name == element);
        allDays[index].active = false;
      }
      setIntialDays(allDays);
    }
    let member = sections[i].data;
    if (member) {
      let allMembers = [...fakeUserData];
      for (let i = 0; i < member.length; i++) {
        const element = member[i];
        let index = allMembers.findIndex((e) => e.id == element.id);
        if (index != -1) {
          allMembers[index].checked = !allMembers[index].checked;
        }
      }
      setfakeUserData(allMembers);
    }
    let sec = [...sections];
    sec.splice(i, 1);
    setSections(sec);
  };

  const deleteLineItem = (pi, ci) => {
    let data = sections[pi].data[ci];
    if (data.name) {
      let allMembers = [...fakeUserData];
      console.log(allMembers);
      let index = allMembers.findIndex((e) => e.id == data.id);

      if (index != -1) {
        allMembers[index].checked = !allMembers[index].checked;
      }
      setfakeUserData(allMembers);
    }
    let sec = [...sections];
    sec[pi].data.splice(ci, 1);
    setSections(sec);
  };

  const handleFormSubmit = async () => {
    let check = false;
    let finalObj = {};
    let allData = [];
    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];
      if (element.selectedDays.length > 0) {
        let data = [];
        for (let i = 0; i < element.data.length; i++) {
          let val = element.data[i];
          if (val.id && val.Type) {
            data.push({ customerId: val.id, dropType: val.Type });
            check = true;
          } else {
            check = false;
            toast.error(
              `Please select a member in section ${
                i + 1
              } otherwise delete this lineItem`
            );
          }
        }
        if (check) {
          allData.push({
            selectedDays: element.selectedDays,
            data: data,
          });
        }
      } else {
        toast.error(`Please select a days in section ${i + 1}`);
      }
    }
    finalObj = {
      driverId: driverDetail._id,
      assignObject: allData,
    };
    if (check) {
      try {
        let response = axiosInstance.post("/assignment/assign", finalObj);
        toast.success(response.message);
        router.push("/admin/driver");
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  const handleTravelType = (pi, ci, e) => {
    let val = [...sections];
    console.log("e.target.value", e.target.value, val[pi]?.data[ci]);
    if (e.target.value && val[pi]?.data[ci]) {
      val[pi].data[ci].Type = e.target.value;
      setSections(val);
    }
  };
  return (
    <div className="w-full">
      {console.log("driverDetail", sections)}
      <div className="flex sticky flex-col">
        <div className="w-1/2">
          <h1 className="text-xl">Driver Name : {driverDetail?.firstName}</h1>
          {/* <br /> */}
          <h1>Vehicle Name : {driverDetail?.vehicleInfo?.vehicleName}</h1>
          <h1>Vehicle No : {driverDetail?.vehicleInfo?.vehicleNo}</h1>
        </div>
        <div className="flex  mx-2">
          <button
            className="bg-green-600 text-white rounded px-3 py-1"
            onClick={handleFormSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full flex justify-center mt-10  lg:w-full ">
          <button
            onClick={() => handleClick()}
            className="bg-green-500 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
            type="submit"
          >
            Add New Day
          </button>
        </div>
      </div>
      {sections.map((val, i) => {
        return (
          <div key={i} className="border my-8 mx-4">
            <div className=" px-8 py-4">
              <div className="flex justify-between aligin-items-center  bg-white">
                <div>
                  <label
                    className="tracking-wide text-sm  mb-2"
                    htmlFor="grid-last-name"
                  >
                    Select Days
                  </label>
                  <CustomMultiSelectInput
                    intialDays={intialDays}
                    sections={sections}
                    handleDaysChange={handleDaysChange}
                    i={i}
                  />
                </div>
                <div className="">
                  <BsXCircle
                    size={25}
                    className="text-red-800 cursor-pointer"
                    onClick={() => deleteSection(i)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto m-10 shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 :text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.NO
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Member Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pickup Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      dropOff Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pickup Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DropOff Location
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
                  {val.data.map((newVal, index) => {
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b :bg-gray-900 :border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <SingleSelectCheckbox
                            fakeUserData={fakeUserData}
                            sections={sections}
                            ind={i}
                            newindex={index}
                            handleMemberChange={handleMemberChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          {newVal.pickUpTime ? newVal.pickUpTime : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {newVal.dropOffTime ? newVal.dropOffTime : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {newVal.pickUplocation ? newVal.pickUplocation : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {newVal.dropOfflocation
                            ? newVal.dropOfflocation
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            className="w-24 border p-1"
                            onChange={(e) => handleTravelType(i, index, e)}
                            value={newVal.Type}
                          >
                            {newVal.Type === "bothSide" && (
                              <>
                                <option value="bothSide">BothSide</option>
                                <option value="pickUp">PickUp</option>
                                <option value="dropOff">DropOff</option>
                              </>
                            )}
                            {newVal.Type !== "bothSide" &&
                              newVal.Type === "pickUp" && (
                                <option value="pickUp">PickUp</option>
                              )}
                            {newVal.Type !== "bothSide" &&
                              newVal.Type === "dropOff" && (
                                <option value="dropOff">DropOff</option>
                              )}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-orange-500 hover:bg-blue-700 text-white  p-1 rounded"
                            onClick={() => deleteLineItem(i, index)}
                            type=""
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <div className="w-full">
                  <button
                    onClick={(e) => handleLineItems(i)}
                    className="bg-green-500 mx-10 my-4 hover:bg-blue-700 text-white  p-1 rounded"
                    type="submit"
                  >
                    Add LineItem
                  </button>
                  {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
