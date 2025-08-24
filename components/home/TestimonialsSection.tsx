'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

// Mock data - replace with actual data from props
const mockTestimonials = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    company: 'TechCorp',
    testimonial: 'The reviews here helped us choose ClickUp, and we\'ve saved over 15 hours per week on project management. The comparison tools were especially helpful.',
    rating: 5,
    avatar: null
  },
  {
    _id: '2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartupFlow',
    testimonial: 'Finding the right automation stack was overwhelming until we found this site. The ROI calculator alone justified our investment in new tools.',
    rating: 5,
    avatar: null
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthLabs',
    testimonial: 'The in-depth reviews and real-world examples made our software selection process so much easier. We implemented 3 tools and doubled our productivity.',
    rating: 5,
    avatar: null
  }
]

export default function TestimonialsSection({ testimonials = mockTestimonials }: { testimonials?: any[] }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
            See how businesses transform with the right automation tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-full bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 rounded-2xl p-8 shadow-sm ring-1 ring-white/20 dark:ring-gray-700/30">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-secondary-600 dark:text-secondary-300 mb-6 italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
            <div className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">4.8</div>
            <div className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">$2M+</div>
            <div className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">Saved for Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">95%</div>
            <div className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}