import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-full absolute top-2 left-0 cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
            
            <h3 className='text-2xl font-bold text-white mb-6 mt-4'>Choose a Vehicle</h3>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff2d78]/50 active:border-[#ff2d78] mb-3 rounded-2xl w-full p-4 items-center justify-between cursor-pointer transition-all'>
                <img className='h-12 drop-shadow-md' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Car" />
                <div className='ml-4 w-1/2'>
                    <h4 className='font-bold text-white text-base flex items-center gap-2'>RiderFlow Go <span className='flex items-center text-xs bg-white/10 px-1.5 py-0.5 rounded-md'><i className="ri-user-3-fill mr-1 text-[#ff2d78]"></i>4</span></h4>
                    <h5 className='font-medium text-sm text-gray-300 mt-0.5'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff6b35]'>₹{props.fare.car || '193.20'}</h2>
            </div>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className='flex border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff2d78]/50 active:border-[#ff2d78] mb-3 rounded-2xl w-full p-4 items-center justify-between cursor-pointer transition-all'>
                <img className='h-12 drop-shadow-md' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                <div className='ml-4 w-1/2'>
                    <h4 className='font-bold text-white text-base flex items-center gap-2'>Moto <span className='flex items-center text-xs bg-white/10 px-1.5 py-0.5 rounded-md'><i className="ri-user-3-fill mr-1 text-[#ff2d78]"></i>1</span></h4>
                    <h5 className='font-medium text-sm text-gray-300 mt-0.5'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff6b35]'>₹{props.fare.moto || '65.00'}</h2>
            </div>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff2d78]/50 active:border-[#ff2d78] mb-3 rounded-2xl w-full p-4 items-center justify-between cursor-pointer transition-all'>
                <img className='h-12 drop-shadow-md' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto" />
                <div className='ml-4 w-1/2'>
                    <h4 className='font-bold text-white text-base flex items-center gap-2'>RiderFlow Auto <span className='flex items-center text-xs bg-white/10 px-1.5 py-0.5 rounded-md'><i className="ri-user-3-fill mr-1 text-[#ff2d78]"></i>3</span></h4>
                    <h5 className='font-medium text-sm text-gray-300 mt-0.5'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable Auto rides</p>
                </div>
                <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff6b35]'>₹{props.fare.auto || '118.21'}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel