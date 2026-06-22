import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen w-screen overflow-hidden relative' style={{
      background: 'linear-gradient(135deg, #070B14 0%, #0d1120 50%, #120810 100%)'
    }}>
      {/* Animated glow orbs */}
      <div className='absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl' style={{ background: 'radial-gradient(circle, #ff2d78, transparent)' }} />
      <div className='absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full opacity-15 blur-3xl' style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl' style={{ background: 'radial-gradient(circle, #ff6b35, transparent)' }} />

      {/* Subtle grid overlay */}
      <div className='absolute inset-0 opacity-[0.03]' style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className='relative h-full flex flex-col justify-between p-8'>
        {/* Top branding */}
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full blur-md opacity-60' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }} />
            <img src='/images/riderflow-logo.png' alt='RiderFlow' className='relative w-12 h-12 rounded-full ring-2 ring-white/10' />
          </div>
          <span className='text-white font-bold text-2xl tracking-tight'>RiderFlow</span>
        </div>

        {/* Center hero content */}
        <div className='flex flex-col items-center text-center gap-6'>
          {/* Big icon */}
          <div className='relative mb-4'>
            <div className='w-32 h-32 rounded-full flex items-center justify-center' style={{
              background: 'linear-gradient(135deg, rgba(255,45,120,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)'
            }}>
              <i className="ri-road-map-line text-6xl" style={{ color: '#ff2d78' }}></i>
            </div>
            <div className='absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm' style={{ background: 'linear-gradient(135deg, #ff2d78, #ff6b35)' }}>
              <i className="ri-flashlight-fill text-white"></i>
            </div>
          </div>

          <div>
            <h1 className='text-white text-4xl font-bold mb-3 leading-tight'>
              Your ride,<br /><span style={{ background: 'linear-gradient(90deg, #ff2d78, #ff9a56)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your flow.</span>
            </h1>
            <p className='text-gray-400 text-base max-w-xs mx-auto leading-relaxed'>
              Fast, safe, and seamless rides whenever you need them.
            </p>
          </div>

          {/* Stats row */}
          <div className='flex gap-8 mt-2'>
            {[['10K+', 'Rides'], ['4.9★', 'Rating'], ['500+', 'Captains']].map(([val, label]) => (
              <div key={label} className='text-center'>
                <div className='text-white font-bold text-lg'>{val}</div>
                <div className='text-gray-500 text-xs'>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className='space-y-3'>
          <Link to='/login' className='flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all active:scale-95' style={{
            background: 'linear-gradient(135deg, #ff2d78, #ff6b35)',
            boxShadow: '0 8px 32px rgba(255, 45, 120, 0.4)'
          }}>
            Get Started <i className="ri-arrow-right-line"></i>
          </Link>
          <p className='text-center text-gray-500 text-sm'>
            New to RiderFlow?{' '}
            <Link to='/signup' className='font-medium' style={{ color: '#ff2d78' }}>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Start