// "use client"
// import Dashboard from "../Components/Dashboard"
import StatisticsCard from "@/app/Components/statisticsCard";

export default function dashboard(){
  return(
    <>
    <div className="flex w-full justify-evenly">
    {/* driver Stats */}
     <div className="flex-col text-center">
     <h3 className="text-xl font-semibold">Driver</h3>
      <div className="flex justify-between">
        <StatisticsCard name={"Total"} value={50} /> 
        <StatisticsCard name={"Active"} value={30} /> 
        <StatisticsCard name={"In Active"} value={20} /> 
        </div>   
     </div>
     {/* member stats */}
     <div className="flex-col text-center">
     <h3 className="text-xl font-semibold">Member</h3>
      <div className="flex justify-between">
        <StatisticsCard name={"Total"} value={50} /> 
        <StatisticsCard name={"Active"} value={30} /> 
        <StatisticsCard name={"In Active"} value={20} /> 
        </div>   
     </div>
     </div>
    </>
  //  <Dashboard />
  )
}