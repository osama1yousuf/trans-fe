// "use client"
// import Dashboard from "../Components/Dashboard"
import { BarChart } from "@/app/Components/BarChart";
import { PieChart } from "@/app/Components/PieChart";
import StatisticsCard from "@/app/Components/statisticsCard";

export default function dashboard() {
  return (
    <>
      <div className="flex items-center flex-wrap">
        {/* driver Stats */}
        <div className="text-center sm:w-3/12 p-2">
          <h3 className="text-xl font-semibold">Driver</h3>
          <div className="">
            <StatisticsCard name={"Total"} value={50} />
            <StatisticsCard name={"Active"} value={30} />
            <StatisticsCard name={"In Active"} value={20} />
          </div>
        </div>
        {/* member stats */}
        <div className="text-center sm:w-3/12 p-2">
          <h3 className="text-xl font-semibold">Member</h3>
          <div className="">
            <StatisticsCard name={"Total"} value={50} />
            <StatisticsCard name={"Active"} value={30} />
            <StatisticsCard name={"In Active"} value={20} />
          </div>
        </div>
        {/* challan Stats */}
        <div className="text-center sm:w-6/12 p-2">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Challan{" "}
            <p className="text-sm font-light ml-2">
              Fee Period (
              {new Date().toLocaleString("en-US", { month: "long" }) +
                " " +
                new Date().getFullYear()}
              )
            </p>{" "}
          </h3>
          <div className="">
            <StatisticsCard
              name={"Total Challan"}
              value={50}
              showAmount={true}
              amount={"RS40000"}
            />
            <StatisticsCard
              name={"Paid Challan"}
              value={30}
              showAmount={true}
              amount={"RS25000"}
            />
            <StatisticsCard
              name={"Unpaid Challan"}
              value={20}
              showAmount={true}
              amount={"RS15000"}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap">
        {/* challan Stats */}
        <div className="sm:w-1/2 text-center">
          <h3 className="text-xl font-semibold">Challan</h3>
          <div className="">
            <StatisticsCard name={"Total Challan"} value={50} />
            <StatisticsCard name={"Total Void Challan"} value={50} />
            <StatisticsCard name={"Paid Challan"} value={30} />
            <StatisticsCard name={"Unpaid Challan"} value={20} />
          </div>
        </div>
        <div className="flex-col text-center w-full sm:w-1/2 px-20 pt-0">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 12 Month
          </h3>
          <div className="flex justify-between">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="flex items-center ">
        {/* challan Stats - Last 12 Month */}
        <div className="flex-col text-center w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 12 Month
          </h3>
          <div className="flex justify-between">
            <BarChart />
          </div>
        </div>

        {/* challan Stats - Last 6 Month */}
        <div className="flex-col text-center w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold flex justify-center items-center">
            Last 6 Month
          </h3>
          <div className="flex justify-between">
            <BarChart />
          </div>
        </div>
      </div>
    </>
    //  <Dashboard />
  );
}
