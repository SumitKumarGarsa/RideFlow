import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border border-white/5 bg-white/5 hover:bg-white/10 p-3 active:border-[#ff2d78] rounded-2xl items-center cursor-pointer transition-all'>
                        <h2 className='bg-white/10 h-10 w-10 flex items-center justify-center rounded-full shrink-0'>
                            <i className={`text-lg ${activeField === 'pickup' ? 'ri-map-pin-user-fill text-[#ff2d78]' : 'ri-map-pin-2-fill text-[#ff6b35]'}`}></i>
                        </h2>
                        <h4 className='font-medium text-white text-sm line-clamp-2'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel