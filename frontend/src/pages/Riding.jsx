import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

        return () => {
            socket.off('ride-ended')
        }
    }, [socket, navigate])

    return (
        <div className='h-screen w-screen relative overflow-hidden bg-[#070B14]'>
            {/* Background Map */}
            <div className='absolute inset-0'>
                <LiveTracking />
            </div>
            
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-transparent to-[#070B14]/30 pointer-events-none z-0'></div>

            {/* Home Button */}
            <Link to='/home' className='fixed right-4 top-4 z-20 w-12 h-12 glass-panel flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-all'>
                <i className="text-xl ri-home-5-line"></i>
            </Link>

            {/* Logo */}
            <div className='absolute left-4 top-4 z-20 flex items-center gap-3 p-2.5 glass-panel rounded-2xl shadow-xl'>
                <img className='w-8 h-8 rounded-full ring-2 ring-white/10' src="/images/riderflow-logo.png" alt="RiderFlow" />
            </div>

            {/* Bottom Panel */}
            <div className='absolute bottom-0 w-full md:w-[420px] md:left-5 md:bottom-5 z-20'>
                <div className='glass-panel p-6 rounded-t-3xl md:rounded-3xl shadow-2xl'>
                    <div className='flex items-center justify-between mb-6'>
                        <img className='h-16 drop-shadow-xl' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                        <div className='text-right'>
                            <h2 className='text-lg font-bold text-white capitalize'>{ride?.captain?.fullname?.firstname || 'Captain'}</h2>
                            <h4 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff6b35] -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate || 'MH 04 AB 1234'}</h4>
                            <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
                        </div>
                    </div>

                    <div className='flex gap-2 justify-between flex-col items-center'>
                        <div className='w-full'>
                            <div className='flex items-center gap-5 p-3 border-b border-white/10'>
                                <div className="w-10 h-10 rounded-full bg-[#ff2d78]/20 flex items-center justify-center">
                                    <i className="text-xl text-[#ff2d78] ri-map-pin-2-fill"></i>
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold text-white'>Drop-off Location</h3>
                                    <p className='text-sm text-gray-400 line-clamp-1'>{ride?.destination || '562/11-A, Unknown Destination'}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 p-3 mt-2'>
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <i className="text-xl text-green-500 ri-currency-line"></i>
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold text-white'>₹{ride?.fare || '0'}</h3>
                                    <p className='text-sm text-gray-400'>Cash Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className='w-full mt-6 py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]'
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
                        Make a Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Riding