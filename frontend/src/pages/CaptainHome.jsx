import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {

    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        return () => clearInterval(locationInterval)
    }, [])

    useEffect(() => {
        socket.on('new-ride', (data) => {
            setRide(data)
            setRidePopupPanel(true)
        })

        return () => {
            socket.off('new-ride')
        }
    }, [socket])

    async function confirmRide() {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
                captainId: captain._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setRidePopupPanel(false)
            setConfirmRidePopupPanel(true)
        } catch (err) {
            console.error("Error confirming ride", err)
        }
    }


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(120%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(120%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen flex flex-col relative overflow-hidden bg-[#070B14]'>
            {/* Header */}
            <div className='fixed p-4 top-0 flex items-center justify-between w-full z-20 pointer-events-none'>
                <div className='flex items-center gap-3 p-2.5 glass-panel rounded-2xl shadow-xl pointer-events-auto'>
                    <div className='relative'>
                        <div className='absolute inset-0 rounded-full blur-md opacity-60' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }} />
                        <img className='relative w-10 h-10 rounded-full ring-2 ring-white/10' src="/images/riderflow-logo.png" alt="RiderFlow" />
                    </div>
                    <span className='font-bold text-lg tracking-tight text-white hidden md:block'>RiderFlow Captain</span>
                </div>
                <Link to='/captain-home' className='h-12 w-12 glass-panel flex items-center justify-center rounded-full text-white pointer-events-auto hover:bg-white/10 transition-all'>
                    <i className="text-xl font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Main Area */}
            <div className='h-[60%] relative flex-shrink-0'>
                {/* Background dark overlay for the map GIF */}
                <div className='absolute inset-0 bg-[#070B14]/40 z-10 pointer-events-none'></div>
                <img className='h-full w-full object-cover filter brightness-75' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Map Radar" />
            </div>

            <div className='flex-1 p-6 relative z-10 -mt-6 overflow-y-auto custom-scrollbar'>
                <div className='glass-panel rounded-3xl min-h-full shadow-2xl p-6'>
                    <CaptainDetails />
                </div>
            </div>

            {/* Ride Popup Panel */}
            <div ref={ridePopupPanelRef} className='fixed w-full md:w-[420px] md:left-5 md:bottom-5 z-40 bottom-0 translate-y-[120%]'>
                <div className='glass-panel rounded-t-3xl md:rounded-3xl p-6 shadow-2xl'>
                    <RidePopUp
                        ride={ride}
                        setRidePopupPanel={setRidePopupPanel}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        confirmRide={confirmRide}
                    />
                </div>
            </div>

            {/* Confirm Ride Popup Panel */}
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen md:h-[90vh] md:w-[420px] md:left-5 md:bottom-5 z-50 bottom-0 translate-y-[120%]'>
                <div className='glass-panel h-full rounded-t-3xl md:rounded-3xl p-6 shadow-2xl overflow-y-auto custom-scrollbar'>
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
                        setRidePopupPanel={setRidePopupPanel} />
                </div>
            </div>
        </div>
    )
}

export default CaptainHome