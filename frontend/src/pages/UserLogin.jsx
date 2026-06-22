import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password })
      if (response.status === 200) {
        setUser(response.data.user)
        localStorage.setItem('token', response.data.token)
        navigate('/home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center relative overflow-hidden' style={{
      background: 'linear-gradient(135deg, #070B14 0%, #0d1120 50%, #120810 100%)'
    }}>
      {/* Glow orbs */}
      <div className='absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #ff2d78, transparent)' }} />
      <div className='absolute bottom-[-20%] left-[-10%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none' style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      {/* Grid overlay */}
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none' style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className='relative w-full max-w-md mx-4'>
        {/* Logo */}
        <div className='flex items-center gap-3 mb-8 justify-center'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full blur-md opacity-70' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }} />
            <img src='/images/riderflow-logo.png' alt='RiderFlow' className='relative w-11 h-11 rounded-full ring-2 ring-white/10' />
          </div>
          <span className='text-white font-bold text-2xl tracking-tight'>RiderFlow</span>
        </div>

        {/* Card */}
        <div className='rounded-3xl p-8' style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
        }}>
          <div className='mb-7'>
            <h2 className='text-white text-2xl font-bold mb-1'>Welcome back 👋</h2>
            <p className='text-gray-500 text-sm'>Sign in to continue your journey</p>
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
                  placeholder='you@example.com'
                  className='w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all'
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,45,120,0.6)'}
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
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,45,120,0.6)'}
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
                background: loading ? 'rgba(255,45,120,0.5)' : 'linear-gradient(135deg, #ff2d78, #ff6b35)',
                boxShadow: '0 8px 24px rgba(255, 45, 120, 0.35)'
              }}
            >
              {loading ? (
                <><i className="ri-loader-4-line animate-spin"></i> Signing in...</>
              ) : (
                <><i className="ri-login-circle-line"></i> Sign In</>
              )}
            </button>
          </form>

          <p className='text-center text-gray-500 text-sm mt-6'>
            New to RiderFlow?{' '}
            <Link to='/signup' className='font-medium hover:underline' style={{ color: '#ff2d78' }}>Create account</Link>
          </p>
        </div>

        {/* Captain login */}
        <Link to='/captain-login' className='flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-medium mt-4 transition-all active:scale-[0.98]' style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#a3b3cc'
        }}>
          <i className="ri-steering-2-line text-base"></i> Sign in as Captain instead
        </Link>
      </div>
    </div>
  )
}

export default UserLogin