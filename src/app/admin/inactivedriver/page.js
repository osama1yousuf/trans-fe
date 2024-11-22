"use client";
import { TableComp } from "@/app/Components/DataTable";
import Textfield2 from "@/app/Components/TextField2";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { useUserValidator } from "@/interceptor/userValidate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Avatar from "@radix-ui/react-avatar";

export default function InactiveDriver() {
  // useUserValidator("superadmin");

  const handleSource = (image) => {
    if (image.length) {
      image = JSON.parse(image);
      if (image && image.buffer && image.buffer.data) {
        const base64Image = Buffer.from(image.buffer.data).toString('base64');
        const preview = `data:${image.mimetype};base64,${base64Image}`;
        // return "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        return preview;
      }
    }
  }

  const {
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage w-16 h-10"
            src={handleSource(row.image)}
            alt="Colm Tuite"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            N/A
          </Avatar.Fallback>
        </Avatar.Root>
      ),
    },
    {
      name: "Name",
      selector: (row) =>  row?.firstName + " " + row?.lastName,
    },
    {
      name: "Mobile #",
      selector: (row) => row.contactOne,
    },
    {
      name: "Vehicle #",
      selector: (row) => row.vehicleInfo.vehicleNo,
    },
    {
      name: "Joining Date",
      selector: (row) => row.joiningDate,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <select
          value={row.status}
          onChange={() => handleCustomerStatusChange(row)}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          data-te-select-init
        >
          <option value="2">InActive</option>
          <option value="1">Active</option>
        </select>
      ),
    },
    {
      name: "Actions",
      selector: (row) => row.actions,
      // width:"100px",
      cell: (row) => (
        <div className="w-full flex   lg:w-full ">
          <button
            className="bg-orange-500 hover:bg-blue-700 text-white  p-1 rounded"
            type="submit"
          >
            Delete Permenant
          </button>
          {/* <button className="bg-green-500 hover:bg-blue-700 text-white ms-1 p-1 rounded" type="submit">Edit driver</button> */}
        </div>
      ),
    },
  ];

  const [data, setData] = useState(null);

  async function getDriver(search, page) {
    try {
      let response = await axiosInstance.get(
        `/driver?status=inActive&search=${search}&limit=${10}&offset=${
          page * 10
        }`
      );
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleCustomerStatusChange = async (row) => {
    let body = {
      status: row.status == "active" ? "inActive" : "active",
    };
    console.log(row);
    console.log(body);
    try {
      let response = await axiosInstance.put(`/driver/status/${row._id}`, body);
      console.log("response", response);
      await getDriver();
      toast.success(response.data.message);
    } catch (e) {
      console.log(e.message);
      toast.error(e.data);
    }
  };
  const search = watch("search");

  return (
    // <Dashboard >
    <div className="w-full">
      <div className="w-full mt-2 lg:w-1/4 px-3">
        <Textfield2
          register={register}
          setFocus={setFocus}
          error={""}
          name={"search"}
          label={"Search By Name"}
          type={"text"}
        />
      </div>
      <div className="z-0">
        <TableComp
          count={data?.count || 0}
          columns={columns}
          data={data}
          title={"In Active Driver List"}
          getFunc={getDriver}
          search={search}
        />
      </div>
    </div>
    // </Dashboard>
  );
}
