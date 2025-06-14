"use client";
import { useEffect, useState } from "react";

export default function MemberDashboard() {
  const [user, setUser] = useState(null);
  const [expandedCard, setExpandedCard] = useState('personal');

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleCard = (cardName) => {
    if (expandedCard === cardName) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardName);
    }
  };

  const isCardExpanded = (cardName) => expandedCard === cardName;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      {/* Welcome Section */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Welcome back,
        </h1>
        <p className="text-xl sm:text-2xl text-blue-600 font-semibold">
          {user.firstName} {user.lastName}
        </p>
      </div>

      {/* User Information Cards */}
      <div className="space-y-4">
        {/* Personal Information */}
        <div 
          className={`bg-white rounded-xl shadow-sm transition-all duration-300 ease-in-out`}
          onClick={() => toggleCard('personal')}
        >
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Personal Information
            </h2>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isCardExpanded('personal') ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCardExpanded('personal') ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 space-y-3 mt-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-32">Contact:</span>
                <span className="text-gray-800">{user.contactOne}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-32">CNIC:</span>
                <span className="text-gray-800">{user.cnicNo}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-32">Gender:</span>
                <span className="text-gray-800">{user?.gender || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-32">Member Since:</span>
                <span className="text-gray-800">{new Date(user.status[0].joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div 
          className={`bg-white rounded-xl shadow-sm transition-all duration-300 ease-in-out`}
          onClick={() => toggleCard('location')}
        >
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Location Details
            </h2>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isCardExpanded('location') ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCardExpanded('location') ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 space-y-3 border-t">
              <div>
                <span className="text-sm font-medium text-gray-500">Residential:</span>
                <p className="text-gray-800 mt-1">{user.location.residentialAddress}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Pick-up:</span>
                <p className="text-gray-800 mt-1">{user.location.pickUpAddress}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Drop-off:</span>
                <p className="text-gray-800 mt-1">{user.location.dropOffAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timing Information */}
        <div 
          className={`bg-white rounded-xl shadow-sm transition-all duration-300 ease-in-out`}
          onClick={() => toggleCard('timing')}
        >
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Timings
            </h2>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isCardExpanded('timing') ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCardExpanded('timing') ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 space-y-4 border-t">
              <div className="bg-gray-50 p-3 rounded-lg mt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Regular Days</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">Pick-up</span>
                    <p className="text-sm font-medium text-gray-800">{user.timings.pickUpTime}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Drop-off</span>
                    <p className="text-sm font-medium text-gray-800">{user.timings.dropOffTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Saturday</h3>
                {user.timings.saturdayTimings ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Pick-up</span>
                      <p className="text-sm font-medium text-gray-800">{user.timings.saturdayTimings.pickUpTime}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Drop-off</span>
                      <p className="text-sm font-medium text-gray-800">{user.timings.saturdayTimings.dropOffTime}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No Saturday service</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fee Information */}
        <div 
          className={`bg-white rounded-xl shadow-sm transition-all duration-300 ease-in-out`}
          onClick={() => toggleCard('fee')}
        >
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Fee Details
            </h2>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isCardExpanded('fee') ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCardExpanded('fee') ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Fee Type:</span>
                <span className="text-sm font-medium text-gray-800 capitalize">{user.fees.feesType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Amount:</span>
                <span className="text-lg font-bold text-green-600">
                  Rs. {parseInt(user.fees.fees).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
