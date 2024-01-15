import React from "react";
import { FcStatistics } from "react-icons/fc";

const StatisticsCard = ({name , value}) =>{
    return(
        <div className="m-2 w-40">
  <div className="bg-[#e4e1de] border border-gray-200 rounded-lg shadow-sm">
    <div className="p-4">
      <div className="flex items-center">
        {/* <div className="flex text-4xl">
          <FcStatistics />
        </div> */}
        <div className="ml-4 justify-between text-center items-center">
          <p className="text-2xl font-semibold">{name}</p>
          <h4 className="text-black uppercase text-sm">{value}</h4>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default StatisticsCard