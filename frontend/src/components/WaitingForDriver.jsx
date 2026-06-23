import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-full absolute top-2 left-0 cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={() => {
        props.waitingForDriver(false)
      }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between mb-6 mt-4'>
        <img className='h-16 drop-shadow-xl' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
        <div className='text-right'>
          <h2 className='text-lg font-bold text-white capitalize'>{props.ride?.captain?.fullname?.firstname || 'Captain'}</h2>
          <h4 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff6b35] -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate || 'MH 04 AB 1234'}</h4>
          <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
          <div className='mt-2 inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/20'>
              <span className='text-xs text-gray-400 mr-2'>OTP</span>
              <h1 className='text-lg font-bold text-white inline-block'>{props.ride?.otp || '1234'}</h1>
          </div>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full'>
          <div className='flex items-center gap-5 p-3 border-b border-white/10'>
            <div className="w-10 h-10 rounded-full bg-[#ff2d78]/20 flex items-center justify-center">
                <i className="text-xl text-[#ff2d78] ri-map-pin-user-fill"></i>
            </div>
            <div>
              <h3 className='text-lg font-bold text-white'>Pick-up</h3>
              <p className='text-sm text-gray-400'>{props.ride?.pickup || 'Loading...'}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b border-white/10'>
            <div className="w-10 h-10 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                <i className="text-xl text-[#ff6b35] ri-map-pin-2-fill"></i>
            </div>
            <div>
              <h3 className='text-lg font-bold text-white'>Drop-off</h3>
              <p className='text-sm text-gray-400'>{props.ride?.destination || 'Loading...'}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <i className="text-xl text-green-500 ri-currency-line"></i>
            </div>
            <div>
              <h3 className='text-lg font-bold text-white'>₹{props.ride?.fare || '0'} </h3>
              <p className='text-sm text-gray-400'>Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver