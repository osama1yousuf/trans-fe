import axiosInstance from "@/interceptor/axios_inteceptor";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Play, CirclePause, CheckCheck } from "lucide-react";

const Button = ({ onClick, disabled, className, children, loading = true }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full font-bold py-2 px-4 rounded ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
  >
    {
      loading ?
        <svg className="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> :
        <>
          {children}
        </>

    }
  </button>
);

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-white border-b border-gray-300">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

export default function AttendanceMark() {
  const [shifts, setShifts] = useState([]);
  const [noOfShifts, setNoOfShifts] = useState(0);
  const [loadingState, setLoadingState] = useState([false, false, false]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shiftInfo, setShiftInfo] = useState()

  useEffect(() => {
    getCurrentAttendance();
    setNoOfShifts(JSON.parse(localStorage.getItem("user"))?.noOfShifts);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // console.log("ttt", JSON.parse(localStorage.getItem("user"))?.noOfShifts);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCheckIn = async (shiftIndex, shifObj) => {
    setLoadingState((prev) => {
      const newState = [...prev];
      newState[shiftIndex] = true;
      return newState;
    });
    // await postAttendanceStatus(
    //   "CHECK_IN",
    //   `SHIFT_${shiftIndex + 1}`,
    //   shifObj?.checkInRecordId,
    //   shifObj?.checkOutRecordId
    // );
    // setLoadingState((prev) => {
    //   const newState = [...prev];
    //   newState[shiftIndex] = false;
    //   return newState;
    // });
  };

  const handleCheckOut = async (shiftIndex, shifObj) => {
    setLoadingState((prev) => {
      const newState = [...prev];
      newState[shiftIndex] = true;
      return newState;
    });
    await postAttendanceStatus(
      "CHECK_OUT",
      `SHIFT_${shiftIndex + 1}`,
      shifObj?.checkInRecordId,
      shifObj?.checkOutRecordId
    );
    setLoadingState((prev) => {
      const newState = [...prev];
      newState[shiftIndex] = false;
      return newState;
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const postAttendanceStatus = async (type, shift, checkInId, checkOutId) => {
    let response;
    try {
      let payload = {
        time: new Date().toISOString(),
        type: type,
        shift: shift,
        checkInRecordId: checkInId,
        checkOutRecordId: checkOutId,
      };
      response = await axiosInstance.post("/driv/attendance", payload);
      toast.info(response?.data?.message);
      getCurrentAttendance();
    } catch (error) {
      toast.error(response?.data?.message || "Something went wrong");
    }
  };

  function sortShifts(shifts) {
    return shifts.sort((a, b) => {
      const getShiftNumber = (shift) => {
        const match = shift.match(/\d+/);
        return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
      };

      return getShiftNumber(a.shift) - getShiftNumber(b.shift);
    });
  }

  const getCurrentAttendance = async () => {
    try {
      let { data } = await axiosInstance.get(
        `/driv/attendance?fromDate=${new Date(
          new Date().setUTCHours(0, 0, 0, 0)
        ).toISOString()}`
      );
      if (data?.data[0]?.attendance) {
        console.log(data, 'data.data')
        let sortedShifts = sortShifts(data.data[0].attendance);
        console.log(sortedShifts, 'sortedShifts')
        setShifts(sortedShifts);
        setShiftInfo(data.driverShifts)
      } else {
        setShifts([]);
      }
    } catch (error) {
      // console.log("error :", error);
    }
  };

  const getTimeDiff = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    let diffInMilliseconds = date2 - date1;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
    const remainingSeconds = diffInSeconds % 60;

    const hours = diffInHours.toString().padStart(2, "0");
    const minutes = remainingMinutes.toString().padStart(2, "0");
    const seconds = remainingSeconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleShiftStart = async (shiftObj) => {
    let filterRuningShifts = shifts.filter(
      (e) =>
        e.shiftStartTime !== null &&
        (e.checkInTime === null || e.checkoutTime === null)
    );
    if (filterRuningShifts.length === 0) {
      let response;
      try {
        let payload = {
          willDoShiftTime: new Date().toISOString(),
          checkInRecordId: shiftObj?.checkInRecordId,
          checkOutRecordId: shiftObj?.checkOutRecordId,
        };
        response = await axiosInstance.post("/driv/shift-willdo", payload);
        toast.info(response?.data?.message);
        getCurrentAttendance();
      } catch (error) {
        // console.log("error", error);
        toast.error(response?.data?.message || "server Error");
      }
    } else {
      toast.error("Complete the previous shift before starting the new one.");
    }
  };

  return (
    <>
      <div className="fixed right-1 z-10 rounded-md bg-[#811630]">
        <div className="mx-auto p-2">
          {/* <h1 className="text-2xl text-white font-bold">Daily Attendance</h1> */}
          <div className="text-sm text-white font-semibold">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
      <div className="container relative mx-auto  pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {shifts.length > 0 ? (
            shifts.map((e, index) => {
              return (
                <Card key={index}>
                  <div className="px-6 py-4 flex justify-between bg-white border-b border-gray-300 items-center">
                    <div className="text-lg font-semibold text-gray-800">
                      Trip {index + 1}
                      <div class="inline-flex ml-3 items-center px-3 py-1 rounded-full text-sm font-medium bg-green-800 text-white">
                        {shiftInfo[index].shiftWay}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div class="inline-flex w-[62px] h-[28px] items-center px-3 py-1 rounded-full text-sm font-medium bg-green-800 text-white">
                          {shiftInfo[index].checkInTime}
                        </div>
                        {/* &nbsp;
                        -
                        &nbsp; */}
                        <div class="inline-flex items-center w-[62px] h-[28px] px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white">
                          {shiftInfo[index].checkOutTime}
                        </div>
                      </div>
                      <button
                        size="icon"
                        variant="ghost"
                        disabled={e.shiftStartTime !== null}
                        onClick={() => handleShiftStart(e)}
                        className={
                          e.shiftStartTime === null &&
                            e.checkInTime === null &&
                            e.checkoutTime === null
                            ? "font-bold py-2 px-4 rounded h-8 w-auto bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 cursor-pointer"
                            : e.shiftStartTime !== null && e.checkoutTime === null
                              ? "font-bold py-2 px-4 rounded h-8 w-auto bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800 cursor-not-allowed"
                              : "font-bold py-2 px-4 rounded h-8 w-auto bg-gray-200 text-gray-700 cursor-not-allowed"
                        }
                        aria-label={`Start Trip ${index + 1}`}
                      >
                        {e.shiftStartTime === null &&
                          e.checkInTime === null &&
                          e.checkoutTime === null && <Play className="h-4 w-4" />}
                        {e.shiftStartTime !== null && e.checkoutTime === null && (
                          <CirclePause className="h-4 w-4" />
                        )}
                        {e.shiftStartTime !== null &&
                          e.checkoutTime !== null &&
                          e.checkInTime !== null && (
                            <CheckCheck className="h-4 w-4" />
                          )}
                      </button>
                    </div>
                  </div>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center text-sm font-bold">
                        {e.checkInTime !== null && e.checkoutTime === null
                          ? getTimeDiff(e.checkInTime, currentTime)
                          : e.checkInTime !== null &&
                          e.checkoutTime !== null &&
                          getTimeDiff(e.checkInTime, e.checkoutTime)}
                      </div>

                      <Button
                        onClick={() => handleCheckIn(index, e)}
                        disabled={
                          loadingState[index] ||
                          e.shiftStartTime === null ||
                          e.checkInTime !== null ||
                          e.checkoutTime !== null
                        }
                        loading={loadingState[index]}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Check In -{" "}
                        {e.checkInTime !== null &&
                          formatTime(new Date(e.checkInTime))}
                      </Button>
                      <Button
                        onClick={() => handleCheckOut(index, e)}
                        disabled={
                          loadingState[index] ||
                          e.shiftStartTime === null ||
                          e.checkInTime === null ||
                          e.shiftStartTime === null ||
                          (e.checkInTime !== null &&
                            e.shiftStartTime !== null &&
                            e.checkoutTime !== null)
                        }
                        loading={loadingState[index]}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Check Out -{" "}
                        {e.checkInTime !== null &&
                          e.checkoutTime !== null &&
                          formatTime(new Date(e.checkoutTime))}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <h1>No Trips Found</h1>
          )}
        </div>
      </div>
    </>
  );
}
