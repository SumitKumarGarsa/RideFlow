import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    useEffect(() => {
        socket.on('ride-confirmed', ride => {
            setVehicleFound(false)
            setWaitingForDriver(true)
            setRide(ride)
        })

        socket.on('ride-started', ride => {
            console.log("ride started")
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride } })
        })

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
        }
    }, [socket, navigate])

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70vh',
                padding: 16,
                opacity: 1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0px',
                padding: 0,
                opacity: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFare(response.data)
        } catch (error) {
            console.error("Error fetching fare:", error)
        }
    }

    async function createRide() {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            console.error("Error creating ride:", error)
        }
    }

    return (
        <div className='h-screen w-screen relative overflow-hidden bg-[#070B14]'>
            {/* Background Map */}
            <div className='absolute inset-0'>
                <LiveTracking />
            </div>

            {/* Gradient Overlay for better contrast */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#070B14]/80 via-transparent to-[#070B14]/30 pointer-events-none z-0'></div>

            {/* Logo */}
            <div className='absolute left-5 top-5 z-20 flex items-center gap-3 p-3 glass-panel rounded-2xl shadow-xl'>
                <div className='relative'>
                    <div className='absolute inset-0 rounded-full blur-md opacity-60' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }} />
                    <img className='relative w-10 h-10 rounded-full ring-2 ring-white/10' src="/images/riderflow-logo.png" alt="RiderFlow" />
                </div>
                <span className='font-bold text-lg tracking-tight text-white hidden md:block'>RiderFlow</span>
            </div>

            {/* Main Content Area */}
            <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-end md:justify-start md:top-24 md:left-5 md:w-[420px] md:h-auto z-10 pointer-events-none'>
                
                {/* Search Panel Container */}
                <div className='glass-panel p-6 rounded-t-3xl md:rounded-3xl relative pointer-events-auto shadow-2xl transition-all duration-300' style={{ maxHeight: panelOpen ? '100vh' : 'auto' }}>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 right-6 top-6 text-2xl text-gray-400 hover:text-white cursor-pointer transition-colors'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    
                    <h4 className='text-2xl font-bold text-white mb-6'>Find a trip</h4>
                    
                    <form className='relative' onSubmit={submitHandler}>
                        <div className="absolute h-[70px] w-[2px] top-1/2 -translate-y-1/2 left-[20px] bg-gradient-to-b from-[#ff2d78] to-[#ff6b35] rounded-full opacity-60"></div>
                        
                        <div className="relative mb-4">
                            <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#ff2d78]/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#ff2d78]"></div>
                            </div>
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='input-dark w-full pl-12 pr-4 py-3.5 rounded-xl text-sm'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                        </div>
                        
                        <div className="relative">
                            <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                                <div className="w-2 h-2 bg-[#ff6b35]"></div>
                            </div>
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='input-dark w-full pl-12 pr-4 py-3.5 rounded-xl text-sm'
                                type="text"
                                placeholder='Enter your destination' />
                        </div>
                    </form>

                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className='btn-primary w-full py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2 text-sm'>
                        Find Trip <i className="ri-arrow-right-line"></i>
                    </button>

                    {/* Suggestions Box */}
                    <div ref={panelRef} className='h-0 overflow-hidden opacity-0 mt-4 custom-scrollbar'>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Sheets / Side Panels */}
            {/* Vehicle Selection Panel */}
            <div ref={vehiclePanelRef} className='fixed w-full md:w-[420px] md:left-5 md:bottom-5 z-20 bottom-0 translate-y-full'>
                <div className='glass-panel rounded-t-3xl md:rounded-3xl p-6 shadow-2xl'>
                    <VehiclePanel
                        selectVehicle={setVehicleType}
                        fare={fare} 
                        setConfirmRidePanel={setConfirmRidePanel} 
                        setVehiclePanel={setVehiclePanel} />
                </div>
            </div>

            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className='fixed w-full md:w-[420px] md:left-5 md:bottom-5 z-30 bottom-0 translate-y-full'>
                <div className='glass-panel rounded-t-3xl md:rounded-3xl p-6 shadow-2xl'>
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel} 
                        setVehicleFound={setVehicleFound} />
                </div>
            </div>

            {/* Looking For Driver Panel */}
            <div ref={vehicleFoundRef} className='fixed w-full md:w-[420px] md:left-5 md:bottom-5 z-40 bottom-0 translate-y-full'>
                <div className='glass-panel rounded-t-3xl md:rounded-3xl p-6 shadow-2xl'>
                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound} />
                </div>
            </div>

            {/* Waiting For Driver Panel */}
            <div ref={waitingForDriverRef} className='fixed w-full md:w-[420px] md:left-5 md:bottom-5 z-50 bottom-0 translate-y-full'>
                <div className='glass-panel rounded-t-3xl md:rounded-3xl p-6 shadow-2xl'>
                    <WaitingForDriver
                        ride={ride}
                        setVehicleFound={setVehicleFound}
                        setWaitingForDriver={setWaitingForDriver}
                        waitingForDriver={waitingForDriver} />
                </div>
            </div>
        </div>
    )
}

export default Home