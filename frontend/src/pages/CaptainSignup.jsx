import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 2-step form

  const { setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
        fullname: { firstname: firstName, lastname: lastName },
        email, password,
        vehicle: { color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType }
      })
      if (response.status === 201) {
        setCaptain(response.data.captain)
        localStorage.setItem('token', response.data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const vehicleIcons = { car: 'ri-car-line', motorcycle: 'ri-motorbike-line', auto: 'ri-taxi-line' }
  const vehicleLabels = { car: 'Car', motorcycle: 'Motorcycle', auto: 'Auto' }

  return (
    <div className='min-h-screen w-full flex items-center justify-center relative overflow-hidden py-8' style={{
      background: 'linear-gradient(135deg, #07100a 0%, #0d1a11 50%, #080f14 100%)'
    }}>
      {/* Glow orbs */}
      <div className='absolute top-[-15%] right-[-10%] w-[450px] h-[450px] rounded-full opacity-15 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #10b461, transparent)' }} />
      <div className='absolute bottom-[-15%] left-[-10%] w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

      {/* Grid overlay */}
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none' style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className='relative w-full max-w-md mx-4'>
        {/* Logo + Captain badge */}
        <div className='flex flex-col items-center gap-3 mb-7'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full blur-md opacity-70' style={{ background: 'linear-gradient(135deg, #10b461, #0ea5e9)' }} />
            <img src='/images/riderflow-logo.png' alt='RiderFlow' className='relative w-12 h-12 rounded-full ring-2 ring-white/10' />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-white font-bold text-2xl tracking-tight'>RiderFlow</span>
            <span className='px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider' style={{ background: 'linear-gradient(135deg, #10b461, #0ea5e9)', color: 'white' }}>CAPTAIN</span>
          </div>
        </div>

        {/* Card */}
        <div className='rounded-3xl p-8' style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
        }}>
          {/* Header */}
          <div className='mb-6'>
            <h2 className='text-white text-2xl font-bold mb-1'>Join as Captain 🏎️</h2>
            <p className='text-gray-500 text-sm'>Start earning with RiderFlow</p>
          </div>

          {/* Step indicator */}
          <div className='flex items-center gap-3 mb-6'>
            {[1, 2].map(s => (
              <div key={s} className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all' style={{
                  background: step >= s ? 'linear-gradient(135deg, #10b461, #0ea5e9)' : 'rgba(255,255,255,0.07)',
                  color: step >= s ? 'white' : '#6b7280',
                  border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}>{s}</div>
                <span className='text-xs' style={{ color: step >= s ? '#10b461' : '#6b7280' }}>
                  {s === 1 ? 'Your Info' : 'Vehicle'}
                </span>
                {s < 2 && <div className='h-px flex-1 w-8' style={{ background: step > s ? '#10b461' : 'rgba(255,255,255,0.1)' }} />}
              </div>
            ))}
          </div>

          {error && (
            <div className='mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2' style={{ background: 'rgba(255, 45, 120, 0.12)', border: '1px solid rgba(255, 45, 120, 0.3)', color: '#ff6b9d' }}>
              <i className="ri-error-warning-line"></i> {error}
            </div>
          )}

          <form onSubmit={submitHandler}>
            {step === 1 && (
              <div className='space-y-4'>
                {/* Name row */}
                <div>
                  <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Full Name</label>
                  <div className='flex gap-3'>
                    <div className='relative flex-1'>
                      <i className="ri-user-line absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base"></i>
                      <input required type='text' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First name'
                        className='w-full pl-10 pr-3 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                    <input required type='text' value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last name'
                      className='flex-1 px-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Email Address</label>
                  <div className='relative'>
                    <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                    <input required type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='captain@example.com'
                      className='w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Password</label>
                  <div className='relative'>
                    <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                    <input required type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder='Min 6 characters'
                      className='w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300'>
                      <i className={`ri-eye${showPassword ? '-off' : ''}-line text-lg`}></i>
                    </button>
                  </div>
                </div>

                <button type='button' onClick={() => { if (firstName && lastName && email && password) setStep(2); else setError('Please fill all fields.') }}
                  className='w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98]'
                  style={{ background: 'linear-gradient(135deg, #10b461, #0ea5e9)', boxShadow: '0 8px 24px rgba(16, 180, 97, 0.3)' }}>
                  Next: Vehicle Info <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-4'>
                {/* Vehicle type selector */}
                <div>
                  <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Vehicle Type</label>
                  <div className='grid grid-cols-3 gap-2'>
                    {['car', 'motorcycle', 'auto'].map(type => (
                      <button key={type} type='button' onClick={() => setVehicleType(type)}
                        className='py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center gap-1'
                        style={{
                          background: vehicleType === type ? 'rgba(16,180,97,0.15)' : 'rgba(255,255,255,0.05)',
                          border: vehicleType === type ? '1px solid rgba(16,180,97,0.6)' : '1px solid rgba(255,255,255,0.08)',
                          color: vehicleType === type ? '#10b461' : '#9ca3af'
                        }}>
                        <i className={`${vehicleIcons[type]} text-xl`}></i>
                        <span className='text-xs font-medium'>{vehicleLabels[type]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color & Plate */}
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Color</label>
                    <div className='relative'>
                      <i className="ri-palette-line absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"></i>
                      <input required type='text' value={vehicleColor} onChange={e => setVehicleColor(e.target.value)} placeholder='e.g. Black'
                        className='w-full pl-10 pr-3 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none'
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                  </div>
                  <div>
                    <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Plate</label>
                    <input required type='text' value={vehiclePlate} onChange={e => setVehiclePlate(e.target.value)} placeholder='DL 01 AB 1234'
                      className='w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none font-mono uppercase'
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Seating Capacity</label>
                  <div className='relative'>
                    <i className="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                    <input required type='number' min='1' max='8' value={vehicleCapacity} onChange={e => setVehicleCapacity(e.target.value)} placeholder='e.g. 4'
                      className='w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none'
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>

                <div className='flex gap-3'>
                  <button type='button' onClick={() => setStep(1)}
                    className='flex-1 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition-all active:scale-[0.98]'
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                    <i className="ri-arrow-left-line"></i> Back
                  </button>
                  <button type='submit' disabled={loading}
                    className='flex-[2] py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60'
                    style={{ background: loading ? 'rgba(16,180,97,0.4)' : 'linear-gradient(135deg, #10b461, #0ea5e9)', boxShadow: '0 8px 24px rgba(16, 180, 97, 0.3)' }}>
                    {loading ? <><i className="ri-loader-4-line animate-spin"></i> Registering...</> : <><i className="ri-checkbox-circle-line"></i> Register</>}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className='text-center text-gray-500 text-sm mt-6'>
            Already a captain?{' '}
            <Link to='/captain-login' className='font-medium hover:underline' style={{ color: '#10b461' }}>Sign in</Link>
          </p>
        </div>

        {/* Rider signup */}
        <Link to='/login' className='flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-medium mt-4 transition-all active:scale-[0.98]' style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#a3b3cc'
        }}>
          <i className="ri-user-line text-base"></i> Sign up as a Rider instead
        </Link>
      </div>
    </div>
  )
}

export default CaptainSignup