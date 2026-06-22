import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, { email, password })
      if (response.status === 200) {
        setCaptain(response.data.captain)
        localStorage.setItem('token', response.data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
    setEmail(''); setPassword('')
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center relative overflow-hidden' style={{
      background: 'linear-gradient(135deg, #07100a 0%, #0d1a11 50%, #080f14 100%)'
    }}>
      {/* Glow orbs - green theme for captains */}
      <div className='absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #10b461, transparent)' }} />
      <div className='absolute bottom-[-20%] left-[-10%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

      {/* Grid overlay */}
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none' style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className='relative w-full max-w-md mx-4'>
        {/* Logo + Captain badge */}
        <div className='flex flex-col items-center gap-3 mb-8'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full blur-md opacity-70' style={{ background: 'linear-gradient(135deg, #10b461, #0ea5e9)' }} />
            <img src='/images/riderflow-logo.png' alt='RiderFlow' className='relative w-12 h-12 rounded-full ring-2 ring-white/10' />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-white font-bold text-2xl tracking-tight'>RiderFlow</span>
            <span className='px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider' style={{
              background: 'linear-gradient(135deg, #10b461, #0ea5e9)',
              color: 'white'
            }}>CAPTAIN</span>
          </div>
        </div>

        {/* Card */}
        <div className='rounded-3xl p-8' style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
        }}>
          {/* Captain icon */}
          <div className='flex items-center gap-4 mb-7 p-4 rounded-2xl' style={{ background: 'rgba(16, 180, 97, 0.08)', border: '1px solid rgba(16, 180, 97, 0.15)' }}>
            <div className='w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0' style={{ background: 'linear-gradient(135deg, rgba(16,180,97,0.2), rgba(14,165,233,0.2))' }}>
              <i className="ri-steering-2-line text-2xl" style={{ color: '#10b461' }}></i>
            </div>
            <div>
              <h2 className='text-white text-lg font-bold'>Captain Sign In</h2>
              <p className='text-gray-500 text-xs'>Access your driver dashboard</p>
            </div>
          </div>

          {error && (
            <div className='mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2' style={{ background: 'rgba(255, 45, 120, 0.12)', border: '1px solid rgba(255, 45, 120, 0.3)', color: '#ff6b9d' }}>
              <i className="ri-error-warning-line"></i> {error}
            </div>
          )}

          <form onSubmit={submitHandler} className='space-y-4'>
            {/* Email */}
            <div>
              <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Email Address</label>
              <div className='relative'>
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                <input
                  required
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='captain@example.com'
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider'>Password</label>
              <div className='relative'>
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(16,180,97,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors'>
                  <i className={`ri-eye${showPassword ? '-off' : ''}-line text-lg`}></i>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2 disabled:opacity-60'
              style={{
                background: loading ? 'rgba(16,180,97,0.4)' : 'linear-gradient(135deg, #10b461, #0ea5e9)',
                boxShadow: '0 8px 24px rgba(16, 180, 97, 0.3)'
              }}
            >
              {loading ? (
                <><i className="ri-loader-4-line animate-spin"></i> Signing in...</>
              ) : (
                <><i className="ri-login-circle-line"></i> Captain Sign In</>
              )}
            </button>
          </form>

          <p className='text-center text-gray-500 text-sm mt-6'>
            New captain?{' '}
            <Link to='/captain-signup' className='font-medium hover:underline' style={{ color: '#10b461' }}>Register your fleet</Link>
          </p>
        </div>

        {/* User login */}
        <Link to='/login' className='flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-medium mt-4 transition-all active:scale-[0.98]' style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#a3b3cc'
        }}>
          <i className="ri-user-line text-base"></i> Switch to Rider login
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin