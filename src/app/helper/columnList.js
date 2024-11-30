const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const attendanceCol = [
  {
    name: "Date",
    selector: (row) => row.date,
  },
  // {
  //   name: "Shift 1",
  //   selector: (row) => row,
  //   cell: (row) => (
  //     <div className="flex min-w-[68px] flex-col gap-1 py-1">
  //       <p className="bg-red-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_1" && e?.checkInTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_1" && e?.checkInTime !== null
  //                 )?.checkInTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //       <p className="bg-green-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_1" && e?.checkoutTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_1" && e?.checkoutTime !== null
  //                 )?.checkoutTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //     </div>
  //   ),
  // },
  // {
  //   name: "Shift 2",
  //   selector: (row) => row,
  //   selector: (row) => row,
  //   cell: (row) => (
  //     <div className="flex min-w-[68px] flex-col gap-1 py-1">
  //       <p className="bg-red-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_2" && e?.checkInTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_2" && e?.checkInTime !== null
  //                 )?.checkInTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //       <p className="bg-green-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_2" && e?.checkoutTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_2" && e?.checkoutTime !== null
  //                 )?.checkoutTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //     </div>
  //   ),
  // },
  // {
  //   name: "Shift 3",
  //   selector: (row) => row,
  //   cell: (row) => (
  //     <div className="flex min-w-[68px] flex-col gap-1 py-1">
  //       <p className="bg-red-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_3" && e?.checkInTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_3" && e?.checkInTime !== null
  //                 )?.checkInTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //       <p className="bg-green-500 p-1 text-center text-white">
  //         {row.attendance.find(
  //           (e) => e.shift === "SHIFT_3" && e?.checkoutTime !== null
  //         )
  //           ? formatTime(
  //               new Date(
  //                 row.attendance.find(
  //                   (e) => e.shift === "SHIFT_3" && e?.checkoutTime !== null
  //                 )?.checkoutTime
  //               )
  //             )
  //           : "-"}
  //       </p>
  //     </div>
  //   ),
  // },
];

export const attendanceColForAdmin = [
  {
    name: "Date",
    selector: (row) => row?.date,
  },
  {
    name: "Name",
    selector: (row) => row?.driverName,
  },
  {
    name: "Trip 1",
    selector: (row) => row,
    cell: (row) => (
      <div className="flex min-w-[68px] flex-col gap-1 py-1">
        <p className="bg-red-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e?.shift === "SHIFT_1" && e?.checkInTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_1" && e?.checkInTime !== null
                  )?.checkInTime
                )
              )
            : "-"}
        </p>
        <p className="bg-green-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e.shift === "SHIFT_1" && e?.checkOutTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_1" && e?.checkOutTime !== null
                  )?.checkOutTime
                )
              )
            : "-"}
        </p>
      </div>
    ),
  },
  {
    name: "Trip 2",
    selector: (row) => row,
    selector: (row) => row,
    cell: (row) => (
      <div className="flex min-w-[68px] flex-col gap-1 py-1">
        <p className="bg-red-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e.shift === "SHIFT_2" && e?.checkInTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_2" && e?.checkInTime !== null
                  )?.checkInTime
                )
              )
            : "-"}
        </p>
        <p className="bg-green-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e.shift === "SHIFT_2" && e?.checkOutTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_2" && e?.checkOutTime !== null
                  )?.checkOutTime
                )
              )
            : "-"}
        </p>
      </div>
    ),
  },
  {
    name: "Trip 3",
    selector: (row) => row,
    cell: (row) => (
      <div className="flex min-w-[68px] flex-col gap-1 py-1">
        <p className="bg-red-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e.shift === "SHIFT_3" && e?.checkInTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_3" && e?.checkInTime !== null
                  )?.checkInTime
                )
              )
            : "-"}
        </p>
        <p className="bg-green-500 p-1 text-center text-white">
          {row.attendance.find(
            (e) => e.shift === "SHIFT_3" && e?.checkOutTime !== null
          )
            ? formatTime(
                new Date(
                  row.attendance.find(
                    (e) => e.shift === "SHIFT_3" && e?.checkOutTime !== null
                  )?.checkOutTime
                )
              )
            : "-"}
        </p>
      </div>
    ),
  },
];
