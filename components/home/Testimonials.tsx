'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "The software comparisons on this site saved us weeks of research. We found the perfect project management tool for our team in just a few hours.",
    author: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'TechStart Inc.',
    rating: 5,
  },
  {
    id: 2,
    content: "The ROI calculator helped us justify the investment in automation software to our board. The detailed analysis was exactly what we needed.",
    author: 'James Chen',
    role: 'CFO',
    company: 'Growth Solutions',
    rating: 5,
  },
  {
    id: 3,
    content: "I've been following their reviews for years. They're thorough, unbiased, and always up-to-date with the latest features and pricing changes.",
    author: 'Maria Rodriguez',
    role: 'IT Manager',
    company: 'Digital Agency Pro',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Thousands of Businesses
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            See what our community says about our reviews and resources
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="mt-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </blockquote>
              
              <div className="mt-6">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}