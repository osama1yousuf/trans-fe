import React from "react";

const StatisticsCard = ({ name, value, showAmount, amount , type }) => {
  return (
    <div className="my-1 w-full">
      <div className={`${type === "paid" ? "bg-[#4ccd42] text-white" : type === "unpaid" ? "bg-[#f05454] text-white" : "bg-[#e4e1de] text-black"}  border border-gray-200 rounded-lg shadow-sm`}>
        <div className="p-4">
          <div className="ml-2  flex justify-between items-center text-center">
            <p className=" uppercase text-sm">{name}</p>
            <h4 className=" text-md font-bold">{value}</h4>
            {showAmount && (
              <h4 className=" text-md font-bold">
                {amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
