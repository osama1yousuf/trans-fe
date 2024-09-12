import { useState, useEffect } from 'react'

const Button = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full font-bold py-2 px-4 rounded ${className} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {children}
  </button>
)

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-gray-100">
    {children}
  </div>
)

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800">
    {children}
  </h2>
)

const CardContent = ({ children }) => (
  <div className="px-6 py-4">
    {children}
  </div>
)

export default function DriverDashboard() {
  const [shifts, setShifts] = useState([
    { checkedIn: false, checkedOut: false, checkInTime: null, checkOutTime: null },
    { checkedIn: false, checkedOut: false, checkInTime: null, checkOutTime: null },
    { checkedIn: false, checkedOut: false, checkInTime: null, checkOutTime: null },
  ])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleCheckIn = (shiftIndex) => {
    setShifts(prevShifts => 
      prevShifts.map((shift, index) => 
        index === shiftIndex 
          ? { ...shift, checkedIn: true, checkInTime: currentTime.toLocaleTimeString() } 
          : shift
      )
    )
  }

  const handleCheckOut = (shiftIndex) => {
    setShifts(prevShifts => 
      prevShifts.map((shift, index) => 
        index === shiftIndex 
          ? { ...shift, checkedOut: true, checkOutTime: currentTime.toLocaleTimeString() } 
          : shift
      )
    )
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Daily Attendance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Shift {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-2xl font-bold">
                  {formatTime(currentTime)}
                </div>
                <Button 
                  onClick={() => handleCheckIn(index)} 
                  disabled={shift.checkedIn}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {shift.checkedIn ? `Checked In: ${shift.checkInTime}` : 'Check In'}
                </Button>
                <Button 
                  onClick={() => handleCheckOut(index)} 
                  disabled={!shift.checkedIn || shift.checkedOut}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {shift.checkedOut ? `Checked Out: ${shift.checkOutTime}` : 'Check Out'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}