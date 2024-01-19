import React from "react";

const StatisticsCardAmount = ({ name, value, useType, amount, type }) => {
  return (
    <div className="my-1 w-full">
      {useType === "admin" ? (
        <div className=" shadow-sm">
          <div className="ml-2  flex justify-between items-center text-center">
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md border w-3/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {name}
            </p>
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md  border inline-block w-1/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {value}
            </p>
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md  border w-2/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      ) : (
        <div className=" shadow-sm">
          <div className="ml-2  flex justify-between items-center text-center">
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md border w-2/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {name}
            </p>
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md  border inline-block w-2/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {value}
            </p>
            <p
              className={`${
                type === "paid"
                  ? "bg-[#4ccd42] text-white"
                  : type === "unpaid"
                  ? "bg-[#f05454] text-white"
                  : "bg-[#e4e1de] text-black"
              } text-md  border w-2/6 border-gray-200 rounded-lg p-4 font-bold`}
            >
              {amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsCardAmount;
