import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-full absolute top-2 left-0 cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-bold text-white mb-6 mt-4'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-24 drop-shadow-xl mb-4' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b border-white/10'>
                        <div className="w-10 h-10 rounded-full bg-[#ff2d78]/20 flex items-center justify-center">
                            <i className="text-xl text-[#ff2d78] ri-map-pin-user-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>Pick-up</h3>
                            <p className='text-sm text-gray-400'>{props.pickup || 'Select pickup location'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b border-white/10'>
                        <div className="w-10 h-10 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                            <i className="text-xl text-[#ff6b35] ri-map-pin-2-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>Drop-off</h3>
                            <p className='text-sm text-gray-400'>{props.destination || 'Select destination'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <i className="text-xl text-green-500 ri-currency-line"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>₹{props.fare[ props.vehicleType ] || '0'}</h3>
                            <p className='text-sm text-gray-400'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='btn-primary w-full mt-6 py-4 rounded-xl text-lg flex items-center justify-center gap-2'>
                    Confirm Ride <i className="ri-check-line"></i>
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide