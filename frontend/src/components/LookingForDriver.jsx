import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-full absolute top-2 left-0 cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-bold text-white mb-6 mt-4 flex items-center gap-3'>
                Looking for a Driver <i className="ri-loader-4-line animate-spin text-[#ff2d78]"></i>
            </h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className="relative">
                    <div className="absolute inset-0 bg-[#ff2d78] blur-xl opacity-20 rounded-full"></div>
                    <img className='h-24 drop-shadow-xl mb-4 relative z-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                </div>
                <div className='w-full'>
                    <div className='flex items-center gap-5 p-3 border-b border-white/10'>
                        <div className="w-10 h-10 rounded-full bg-[#ff2d78]/20 flex items-center justify-center">
                            <i className="text-xl text-[#ff2d78] ri-map-pin-user-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>Pick-up</h3>
                            <p className='text-sm text-gray-400'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b border-white/10'>
                        <div className="w-10 h-10 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                            <i className="text-xl text-[#ff6b35] ri-map-pin-2-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>Drop-off</h3>
                            <p className='text-sm text-gray-400'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <i className="text-xl text-green-500 ri-currency-line"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-sm text-gray-400'>Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver