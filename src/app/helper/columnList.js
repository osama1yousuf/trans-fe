const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

export const attendanceCol = [
  {
    name: "Date",
    selector: (row) => row.date,
  },
  {
    name: "Shift 1",
    selector: (row) => {
      let find = row.attendance.find((e) => e.shift === "SHIFT_1");
      return `${find ? formatTime(find?.checkInTime) : "-"} || ${
        find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
      }`;
    },
  },
  {
    name: "Shift 2",
    selector: (row) => {
      let find = row.attendance.find((e) => e.shift === "SHIFT_2");
      return `${find ? formatTime(find?.checkInTime) : "-"} || ${
        find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
      }`;
    },
  },
  {
    name: "Shift 3",
    selector: (row) => {
      let find = row.attendance.find((e) => e.shift === "SHIFT_3");
      return `${find ? formatTime(find?.checkInTime) : "-"} || ${
        find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
      }`;
    },
  },
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
      name: "Shift 1",
      selector: (row) => {
        let find = row.attendance.find((e) => e.shift === "SHIFT_1");
        return `${find ? formatTime(find?.checkInTime) : "-"} || ${
          find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
        }`;
      },
    },
    {
      name: "Shift 2",
      selector: (row) => {
        let find = row.attendance.find((e) => e.shift === "SHIFT_2");
        return `${find ? formatTime(find?.checkInTime) : "-"} || ${
          find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
        }`;
      },
    },
    {
      name: "Shift 3",
      selector: (row) => {
        let find = row.attendance.find((e) => e.shift === "SHIFT_3");
        return `${find ? formatTime(find?.checkInTime) : "-"} || ${
          find?.checkoutTime ? formatTime(find?.checkoutTime) : "-"
        }`;
      },
    },
  ];
