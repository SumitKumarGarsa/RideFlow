import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])

    return (
        <div className='h-screen w-screen relative overflow-hidden bg-[#070B14]'>
            {/* Header */}
            <div className='fixed p-4 top-0 flex items-center justify-between w-full z-20 pointer-events-none'>
                <div className='flex items-center gap-3 p-2.5 glass-panel rounded-2xl shadow-xl pointer-events-auto'>
                    <div className='relative'>
                        <div className='absolute inset-0 rounded-full blur-md opacity-60' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }} />
                        <img className='relative w-10 h-10 rounded-full ring-2 ring-white/10' src="/images/riderflow-logo.png" alt="RiderFlow" />
                    </div>
                    <span className='font-bold text-lg tracking-tight text-white hidden md:block'>RiderFlow</span>
                </div>
                <Link to='/captain-home' className='h-12 w-12 glass-panel flex items-center justify-center rounded-full text-white pointer-events-auto hover:bg-white/10 transition-all'>
                    <i className="text-xl font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Background Map */}
            <div className='absolute inset-0'>
                <LiveTracking />
            </div>

            {/* Bottom Status Panel */}
            <div className='absolute bottom-0 w-full z-10'>
                <div className='glass-card rounded-t-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]'
                     style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className='w-full text-center md:hidden mb-4' onClick={() => setFinishRidePanel(true)}>
                        <i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i>
                    </div>
                    <h4 className='text-2xl font-bold text-white mb-4 md:mb-0'>{'4 KM away'}</h4>
                    <button 
                        onClick={() => setFinishRidePanel(true)}
                        className='w-full md:w-auto py-4 px-10 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]'
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}
                    >
                        Complete Ride
                    </button>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef} className='fixed w-full h-screen md:h-[90vh] md:w-[420px] md:left-5 md:bottom-5 z-[500] bottom-0 translate-y-full'>
                <div className='glass-panel h-full rounded-t-3xl md:rounded-3xl p-6 shadow-2xl overflow-y-auto custom-scrollbar'>
                    <FinishRide
                        ride={rideData}
                        setFinishRidePanel={setFinishRidePanel} />
                </div>
            </div>
        </div>
    )
}

export default CaptainRiding