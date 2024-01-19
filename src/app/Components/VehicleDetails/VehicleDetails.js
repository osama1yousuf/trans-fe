// import Heading from '../../commonComponents/Heading/Heading'
import "./VehicleDetails.css"

export default function VechicleDetails() {
  return (
    <div className='vehicle-details-main-div'>
        
        {/* <Heading headingName={"Vehicle Details"} /> */}
        
        <div className='car-info-div'>
            <div className='car-photo-div'></div>
            <div className='car-model-info-div'>
                <span className='car-name-span'>2018 Toyota Camry</span>
                <span className='car-color-span'>color: gray</span>
                <span className='car-number-plate-span'>GA 43ZI9DE</span>
            </div>
        </div>
        
        <div className='inspection-and-maintain-div grid grid-cols-2'>
            <div className='inspection-div col-span-1'>
                <span className='next-vehicle-inspection-title'>Next vehicle inspection</span>
                <p className='inspection-date'>December 21, 2023</p>
            </div>
            <div className='maintain-div col-span-1'>
                <span className='next-vehicle-maintain-title'>Next vehicle maitainance</span>
                <p className='maintain-date'>November 21, 2023</p>
            </div>
        </div>
    </div>
  )
}