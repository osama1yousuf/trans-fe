import React from "react";
import { FcStatistics } from "react-icons/fc";

const StatisticsCard = ({ name, value, showAmount, amount }) => {
  return (
    <div className="my-1 w-full">
      <div className="bg-[#e4e1de] border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="ml-2 flex justify-between items-center text-center">
            <p className="text-black uppercase text-sm">{name}</p>
            <h4 className=" text-md font-bold">{value}</h4>
            {showAmount && (
              <h4 className="text-black uppercase text-sm">
              {amount}
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
