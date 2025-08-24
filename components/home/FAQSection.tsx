'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'How do you evaluate and score software?',
    answer: 'We use a comprehensive 15-step framework that evaluates software across key dimensions including ease of use, feature set, integrations, pricing value, customer support, security, scalability, and more. Each factor is scored from 1-10, and we combine these with real user feedback and hands-on testing to provide accurate, unbiased ratings.'
  },
  {
    question: 'Are your reviews truly unbiased?',
    answer: 'Yes, our reviews are independent and based on thorough testing and analysis. While we may earn affiliate commissions from some software purchases, this never influences our ratings or recommendations. We maintain strict editorial independence and clearly disclose any affiliate relationships.'
  },
  {
    question: 'How often are reviews updated?',
    answer: 'We update our reviews quarterly or whenever significant changes occur to the software (major updates, pricing changes, new features). Each review displays its last updated date, and we actively monitor all reviewed tools to ensure our content remains current and accurate.'
  },
  {
    question: 'Can I request a software review?',
    answer: 'Absolutely! We welcome suggestions from our community. You can submit software review requests through our contact form or by emailing reviews@workflowautomation.net. We prioritize requests based on user demand and relevance to our audience.'
  },
  {
    question: 'How does the Software Finder tool work?',
    answer: 'Our Software Finder uses an intelligent matching algorithm that considers your specific needs, budget, team size, and required features. It analyzes our database of 300+ reviewed tools to provide personalized recommendations ranked by compatibility with your requirements.'
  },
  {
    question: 'Do you offer consulting services?',
    answer: 'Currently, we focus on providing free resources through our website. However, we\'re developing premium consulting services for enterprise clients. Join our newsletter to be notified when these services become available.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/40 backdrop-blur-sm dark:bg-gray-800/40 rounded-xl overflow-hidden ring-1 ring-white/20 dark:ring-gray-700/30"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-medium text-secondary-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-secondary-500 dark:text-secondary-400 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-secondary-600 dark:text-secondary-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-all"
            >
              Contact Support
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}