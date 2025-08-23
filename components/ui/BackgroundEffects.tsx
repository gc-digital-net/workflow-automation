import React from 'react'

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Large primary blob - top left */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      
      {/* Secondary blob - top right */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-indigo-400 to-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      
      {/* Accent blob - bottom left */}
      <div className="absolute -bottom-32 left-20 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      
      {/* Center blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-3000" />
      
      {/* Additional accent blob - bottom right */}
      <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-gradient-to-br from-blue-400 to-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-5000" />
    </div>
  )
}

export function MeshGradient() {
  return (
    <div className="fixed inset-0 -z-20 bg-gradient-to-br from-primary-50 via-cyan-50 to-indigo-50 dark:from-secondary-950 dark:via-primary-950/20 dark:to-indigo-950/20" />
  )
}

export function GridPattern() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-secondary-950 bg-[linear-gradient(to_right,#1e40af0a_1px,transparent_1px),linear-gradient(to_bottom,#1e40af0a_1px,transparent_1px)] bg-[size:40px_40px]" />
  )
}

export function GradientBackground({ variant = 'default' }: { variant?: 'default' | 'intense' | 'subtle' }) {
  const variants = {
    default: 'bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/20',
    intense: 'bg-gradient-to-tr from-primary-100 via-indigo-100 to-cyan-100 dark:from-secondary-900 dark:via-primary-950/30 dark:to-indigo-950/30',
    subtle: 'bg-gradient-to-b from-white to-secondary-50/50 dark:from-secondary-900 dark:to-secondary-950'
  }
  
  return (
    <div className={`fixed inset-0 -z-30 ${variants[variant]}`} />
  )
}

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary-200/30 dark:border-primary-800/30 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-cyan-200/30 dark:border-cyan-800/30 rounded-full animate-float animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-indigo-200/30 dark:border-indigo-800/30 rounded-full animate-float animation-delay-4000" />
      
      {/* Floating squares */}
      <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-primary-300/30 dark:border-primary-700/30 rotate-45 animate-float animation-delay-1000" />
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 border-4 border-teal-200/30 dark:border-teal-800/30 rotate-12 animate-float animation-delay-3000" />
    </div>
  )
}

export function ParticleEffect() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/40 dark:bg-primary-600/40 rounded-full animate-float"
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

// Add CSS for animation delays (add to globals.css if not present)
export const animationStyles = `
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-3000 {
    animation-delay: 3s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .animation-delay-5000 {
    animation-delay: 5s;
  }
`