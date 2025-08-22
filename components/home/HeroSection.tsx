'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-secondary-100/20 dark:from-primary-900/20 dark:to-secondary-900/20" />
        <div className="absolute top-0 -left-4 h-72 w-72 animate-pulse-slow rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-600/20" />
        <div className="absolute -top-4 right-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-secondary-300/30 blur-3xl dark:bg-secondary-600/20" />
      </div>
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-x-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 dark:bg-primary-900/50 dark:text-primary-300 dark:ring-primary-500/20">
              <SparklesIcon className="h-4 w-4" />
              Save 10+ hours per week with automation
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Find the Perfect
            <span className="block text-primary-600 dark:text-primary-400">
              Automation Software
            </span>
            for Your Business
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Expert reviews, in-depth comparisons, and actionable guides to help you choose the right automation tools. Save time, reduce errors, and scale your operations efficiently.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/tools/software-finder"
              className="group inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Find Your Software
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-x-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              Read Reviews
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">300+</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Software Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Hours Saved</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}