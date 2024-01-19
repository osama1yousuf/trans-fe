import React from 'react'
import "./DriverInfo.css"
import { FaHome } from "react-icons/fa";



export default function DriverInfo() {
  return (
    <div className='driver-info-div'>
      <div className='driver-info-top-section'>
        <div className='driver-photo-div'>
            <div className='driver-avatar'></div>
        </div>
        <div className='driver-liscene-info-div'>
          <span className='driver-firstname'>Brian</span>
          <span className='driver-lastname'>Williams</span>
          <span className='license-info-title'>License Info</span>
          <span className='license-number'>GA 34287982</span>     
          <div className='expiration-info-div'>
            <span className='expiration-title'>Expiration: </span>
            <span className='expiration-date'>December 19, 2023</span>
          </div>
        </div>
        <div className='driver-score-div'>
          <div className='certified-div'>
            <span   className='certified-title'>Certified</span>
            <span className='rating'>
                {/* <Rating 
                    name="read-only" 
                    value={3.5} 
                    precision={0.5} 
                    readOnly 
                /> */}
            </span>
          </div>
          <span className='driving-score-title'>
            Driving score: &nbsp;
          </span>
          <span>80</span>
        </div>
      </div>

      <div className='driver-info-bottom-section'>
        <div className='grid grid-cols-2'>
          <div className='driver-address-div'>
            <div className='home-icon-div'>
            <FaHome />
            </div>
            <div className='address-div'>
              <span className='home-address-title'>Home Address: </span>
              <span className='address-span-1'>
                  Fake St. 123 
              </span>
              <span className='address-span-2'>
                  Atlanta, GA
              </span>
            </div>
          </div>

          <div className='driver-radius-div'>
            <div className='radius-div'>
              <span className='home-address-title'>Radius: </span>
              <span className='address-span-1'>
                  1.2 Mi 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}