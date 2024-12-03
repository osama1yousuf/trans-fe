import axiosInstance from "@/interceptor/axios_inteceptor";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Play } from "lucide-react";

const Button = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full font-bold py-2 px-4 rounded ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
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

  useEffect(() => {
    getCurrentAttendance();
    setNoOfShifts(JSON.parse(localStorage.getItem("user"))?.noOfShifts);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    console.log("ttt", JSON.parse(localStorage.getItem("user"))?.noOfShifts);
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
    await postAttendanceStatus(
      "CHECK_IN",
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

  const getCurrentAttendance = async () => {
    try {
      let { data } = await axiosInstance.get(
        `/driv/attendance?fromDate=${new Date(
          new Date().setUTCHours(0, 0, 0, 0)
        ).toISOString()}`
      );
      if (data?.data[0]?.attendance) {
        setShifts(data.data[0].attendance);
      } else {
        setShifts([]);
      }
    } catch (error) {
      console.log("error :", error);
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
      console.log("error", error);
      toast.error(response?.data?.message || "server Error");
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
            Array.from(
              {
                length: shifts.length,
              },
              (_, index) => (
                <Card key={index}>
                  <div className="px-6 py-4 flex justify-between bg-white border-b border-gray-300">
                    <div className="text-lg font-semibold text-gray-800">
                      Trip {index + 1}
                    </div>
                    <button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleShiftStart(
                          shifts.find((e) => e.shift === `SHIFT_${index + 1}`)
                        )
                      }
                      className="font-bold py-2  px-4 rounded h-8 w-auto bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 "
                      aria-label={`Start Trip ${index + 1}`}
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center text-sm font-bold">
                        {shifts.find(
                          (e) =>
                            e.shift === `SHIFT_${index + 1}` &&
                            e.checkInTime !== null
                        ) &&
                        shifts.find(
                          (e) =>
                            e.shift === `SHIFT_${index + 1}` &&
                            e.checkoutTime === null
                        )
                          ? getTimeDiff(
                              shifts.find(
                                (e) =>
                                  e.shift === `SHIFT_${index + 1}` &&
                                  e.checkInTime !== null
                              )?.checkInTime,
                              currentTime
                            )
                          : shifts.find(
                              (e) =>
                                e.shift === `SHIFT_${index + 1}` &&
                                e.checkInTime !== null
                            ) &&
                            shifts.find(
                              (e) =>
                                e.shift === `SHIFT_${index + 1}` &&
                                e.checkoutTime !== null
                            ) &&
                            getTimeDiff(
                              shifts.find(
                                (e) =>
                                  e.shift === `SHIFT_${index + 1}` &&
                                  e.checkInTime !== null
                              )?.checkInTime,
                              shifts.find(
                                (e) =>
                                  e.shift === `SHIFT_${index + 1}` &&
                                  e.checkoutTime !== null
                              )?.checkoutTime
                            )}
                      </div>

                      <Button
                        onClick={() =>
                          handleCheckIn(
                            index,
                            shifts.find((e) => e.shift === `SHIFT_${index + 1}`)
                          )
                        }
                        disabled={
                          loadingState[index] ||
                          shifts.find(
                            (e) =>
                              e.shift === `SHIFT_${index + 1}` &&
                              e.checkInTime !== null
                          ) ||
                          shifts.find(
                            (e) =>
                              e.shift === `SHIFT_${index + 1}` &&
                              e.checkoutTime !== null
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Check In -{" "}
                        {shifts.find(
                          (e) =>
                            e.shift === `SHIFT_${index + 1}` &&
                            e.checkInTime !== null
                        ) &&
                          formatTime(
                            new Date(
                              shifts.find(
                                (e) =>
                                  e.shift === `SHIFT_${index + 1}` &&
                                  e.checkInTime !== null
                              )?.checkInTime
                            )
                          )}
                      </Button>
                      <Button
                        onClick={() =>
                          handleCheckOut(
                            index,
                            shifts.find((e) => e.shift === `SHIFT_${index + 1}`)
                          )
                        }
                        disabled={
                          loadingState[index] ||
                          shifts.find(
                            (e) =>
                              e.shift === `SHIFT_${index + 1}` &&
                              e.checkInTime !== null &&
                              e.checkoutTime !== null
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Check Out -{" "}
                        {shifts.find(
                          (e) =>
                            e.shift === `SHIFT_${index + 1}` &&
                            e.checkInTime !== null
                        ) &&
                          shifts.find(
                            (e) =>
                              e.shift === `SHIFT_${index + 1}` &&
                              e.checkoutTime !== null
                          ) &&
                          formatTime(
                            new Date(
                              shifts.find(
                                (e) =>
                                  e.shift === `SHIFT_${index + 1}` &&
                                  e.checkInTime !== null
                              )?.checkoutTime
                            )
                          )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          ) : (
            <h1>No Trips Found</h1>
          )}
        </div>
      </div>
    </>
  );
}
