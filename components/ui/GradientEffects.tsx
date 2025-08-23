'use client'

import { motion } from 'framer-motion'

// Glossy card wrapper with gradient border
export function GlossyCard({ 
  children, 
  className = '',
  gradient = 'from-primary-500 to-cyan-500'
}: { 
  children: React.ReactNode
  className?: string
  gradient?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300 blur`} />
      
      {/* Glass card */}
      <div className="relative bg-white/90 dark:bg-secondary-900/90 backdrop-blur-xl rounded-2xl">
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 rounded-2xl pointer-events-none" />
        {children}
      </div>
    </div>
  )
}

// Gradient text effect
export function GradientText({ 
  children, 
  className = '',
  gradient = 'from-primary-600 to-cyan-600'
}: { 
  children: React.ReactNode
  className?: string
  gradient?: string
}) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

// Animated gradient background
export function GradientBackground({ 
  variant = 'default',
  className = ''
}: { 
  variant?: 'default' | 'intense' | 'subtle' | 'mesh'
  className?: string
}) {
  const gradients = {
    default: 'bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/20',
    intense: 'bg-gradient-to-tr from-primary-100 via-indigo-50 to-cyan-100 dark:from-secondary-900 dark:via-primary-950/30 dark:to-cyan-950/30',
    subtle: 'bg-gradient-to-b from-white to-secondary-50/50 dark:from-secondary-900 dark:to-secondary-950',
    mesh: 'bg-gradient-to-br from-primary-500/10 via-transparent to-cyan-500/10 dark:from-primary-500/5 dark:to-cyan-500/5'
  }
  
  return (
    <div className={`absolute inset-0 ${gradients[variant]} ${className}`} />
  )
}

// Glossy button with gradient
export function GlossyButton({ 
  children, 
  onClick,
  href,
  className = '',
  variant = 'primary'
}: { 
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all duration-300 overflow-hidden group"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30",
    secondary: "bg-white/90 dark:bg-secondary-800/90 text-secondary-900 dark:text-white ring-1 ring-secondary-200/50 dark:ring-secondary-700/50 hover:ring-primary-500/50",
    ghost: "bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20"
  }
  
  const Component = href ? motion.a : motion.button
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glossy shine effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </Component>
  )
}

// Animated gradient border
export function GradientBorder({ 
  children,
  className = '',
  animate = true
}: { 
  children: React.ReactNode
  className?: string
  animate?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-cyan-500 to-indigo-500 rounded-2xl opacity-75"
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : undefined}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Content */}
      <div className="relative bg-white dark:bg-secondary-900 rounded-2xl">
        {children}
      </div>
    </div>
  )
}

// Mesh gradient overlay
export function MeshGradientOverlay({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-cyan-500/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/10 to-transparent" />
    </div>
  )
}

// Floating gradient orb
export function GradientOrb({ 
  size = 'md',
  color = 'primary',
  className = '',
  animate = true
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'cyan' | 'indigo' | 'mixed'
  className?: string
  animate?: boolean
}) {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  }
  
  const colors = {
    primary: 'from-primary-400 to-primary-600',
    cyan: 'from-cyan-400 to-cyan-600',
    indigo: 'from-indigo-400 to-indigo-600',
    mixed: 'from-primary-400 via-cyan-500 to-indigo-600'
  }
  
  return (
    <motion.div
      className={`absolute ${sizes[size]} bg-gradient-to-br ${colors[color]} rounded-full blur-3xl opacity-20 dark:opacity-10 ${className}`}
      animate={animate ? {
        x: [0, 30, 0],
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      } : undefined}
      transition={{
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  )
}