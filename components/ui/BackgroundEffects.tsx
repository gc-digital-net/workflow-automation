import React from 'react'

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <div className="blob blob-primary w-96 h-96 -top-48 -left-48" />
      
      {/* Secondary blob */}
      <div className="blob blob-secondary w-96 h-96 top-1/3 right-0 animation-delay-2000" />
      
      {/* Accent blob */}
      <div className="blob blob-accent w-96 h-96 -bottom-48 left-1/3 animation-delay-4000" />
      
      {/* Additional smaller blobs */}
      <div className="blob bg-gradient-to-br from-primary-300 to-accent-purple w-64 h-64 top-1/2 left-1/2 animation-delay-3000" />
    </div>
  )
}

export function MeshGradient() {
  return (
    <div className="fixed inset-0 bg-mesh opacity-30 dark:opacity-20 pointer-events-none" />
  )
}

export function GridPattern() {
  return (
    <div className="fixed inset-0 bg-grid-pattern opacity-50 dark:opacity-30 pointer-events-none" />
  )
}

export function GradientBackground({ variant = 'default' }: { variant?: 'default' | 'intense' | 'subtle' }) {
  const variants = {
    default: 'bg-gradient-to-br from-primary-50 via-white to-accent-purple/10 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/20',
    intense: 'bg-gradient-to-tr from-primary-100 via-accent-purple/20 to-accent-pink/20 dark:from-secondary-900 dark:via-primary-950/30 dark:to-accent-purple/20',
    subtle: 'bg-gradient-to-b from-white to-secondary-50/50 dark:from-secondary-900 dark:to-secondary-950'
  }
  
  return (
    <div className={`fixed inset-0 ${variants[variant]} pointer-events-none`} />
  )
}

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary-200/20 dark:border-primary-800/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-accent-purple/20 dark:border-accent-purple/20 rounded-full animate-float animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-accent-pink/20 dark:border-accent-pink/20 rounded-full animate-float animation-delay-4000" />
      
      {/* Floating squares */}
      <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-primary-300/20 dark:border-primary-700/20 rotate-45 animate-float animation-delay-1000" />
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 border-4 border-accent-indigo/20 dark:border-accent-indigo/20 rotate-12 animate-float animation-delay-3000" />
    </div>
  )
}

export function ParticleEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/30 dark:bg-primary-600/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  )
}