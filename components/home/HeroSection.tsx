'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SparklesIcon, MagnifyingGlassIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import { GradientOrb, MeshGradientOverlay, GlossyButton } from '@/components/ui/GradientEffects'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/20" />
      <MeshGradientOverlay opacity={0.3} />
      
      {/* Animated gradient orbs */}
      <GradientOrb size="xl" color="primary" className="-top-40 -right-40" />
      <GradientOrb size="lg" color="cyan" className="-bottom-32 -left-32" animate />
      <GradientOrb size="md" color="indigo" className="top-1/2 left-1/3" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Glossy Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-effect">
              <SparklesIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
                #1 Automation Software Review Platform
              </span>
            </div>

            {/* Main Heading with gradient */}
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 dark:text-white mb-6">
              Find the Perfect
              <span className="block bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300">
                Automation Software
              </span>
              for Your Business
            </h1>

            {/* Subheading */}
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
              Save 10+ hours per week with the right workflow automation tools. 
              Compare 300+ software solutions with in-depth reviews and real user insights.
            </p>

            {/* Glossy Search Bar */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-75 transition duration-300 blur" />
                <div className="relative flex items-center">
                  <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-secondary-400 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search software by name or category..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl glass-effect text-secondary-900 dark:text-white placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <GlossyButton href="/tools/software-finder" variant="primary">
                Find Software
              </GlossyButton>
            </div>

            {/* Quick Stats with glass effect */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: ChartBarIcon, value: '300+', label: 'Software Reviewed' },
                { icon: ClockIcon, value: '50K+', label: 'Hours Saved' },
                { icon: CurrencyDollarIcon, value: '$2M+', label: 'ROI Generated' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect"
                >
                  <stat.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-secondary-600 dark:text-secondary-300">
                    <strong className="text-secondary-900 dark:text-white">{stat.value}</strong> {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Interactive Card with glossy effects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:pl-8"
          >
            {/* Main glossy card */}
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300 blur gradient-border-animated" />
              
              {/* Card content */}
              <div className="relative bg-white/90 dark:bg-secondary-800/90 backdrop-blur-xl rounded-2xl p-8 glossy-card">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 rounded-2xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      Your Automation Journey
                    </h3>
                    <span className="px-3 py-1 rounded-full glass-effect text-green-700 dark:text-green-400 text-sm">
                      Live Demo
                    </span>
                  </div>
                  
                  {/* Journey Steps with gradient backgrounds */}
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'Define Your Needs', desc: 'Answer quick questions', gradient: 'from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20' },
                      { step: 2, title: 'Get Recommendations', desc: 'AI-powered matching', gradient: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20' },
                      { step: 3, title: 'Start Automating', desc: 'Save 10+ hours/week', gradient: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${item.gradient} backdrop-blur-sm border border-white/50 dark:border-white/10 glossy-shine`}
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center glass-effect ${
                          index === 2 ? 'bg-gradient-to-br from-primary-600 to-cyan-600 text-white' : ''
                        }`}>
                          <span className={`text-lg font-bold ${
                            index === 2 ? 'text-white' : 'bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent'
                          }`}>
                            {item.step}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-secondary-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA Button with glossy effect */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all glossy-shine"
                  >
                    <PlayIcon className="h-5 w-5" />
                    Watch 2-min Demo
                  </motion.button>
                </div>
              </div>
              
              {/* Floating glossy elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-effect rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">Time Saved</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      12h/week
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 glass-effect rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">ROI</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
                      342%
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}