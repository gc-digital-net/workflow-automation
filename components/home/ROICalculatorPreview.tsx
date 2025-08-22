'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalculatorIcon } from '@heroicons/react/24/outline';

export default function ROICalculatorPreview() {
  const [hours, setHours] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [teamSize, setTeamSize] = useState(5);
  
  const weeklysSavings = hours * hourlyRate * teamSize;
  const monthlySavings = weeklysSavings * 4;
  const yearlySavings = monthlySavings * 12;
  
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 dark:from-primary-700 dark:to-primary-800 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <CalculatorIcon className="mx-auto h-12 w-12 text-white" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Calculate Your ROI
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              See how much time and money you could save with automation
            </p>
          </div>
          
          <div className="mt-12 rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-white">
                  Hours saved per week
                </label>
                <input
                  type="range"
                  id="hours"
                  min="1"
                  max="40"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="mt-2 w-full"
                />
                <div className="mt-1 text-center text-2xl font-bold text-white">{hours} hrs</div>
              </div>
              
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-white">
                  Average hourly rate
                </label>
                <input
                  type="range"
                  id="rate"
                  min="20"
                  max="200"
                  step="10"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-2 w-full"
                />
                <div className="mt-1 text-center text-2xl font-bold text-white">${hourlyRate}</div>
              </div>
              
              <div>
                <label htmlFor="team" className="block text-sm font-medium text-white">
                  Team size
                </label>
                <input
                  type="range"
                  id="team"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-2 w-full"
                />
                <div className="mt-1 text-center text-2xl font-bold text-white">{teamSize} people</div>
              </div>
            </div>
            
            <div className="mt-8 grid gap-4 rounded-lg bg-white/20 p-6 backdrop-blur-sm md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm font-medium text-primary-100">Weekly Savings</div>
                <div className="mt-1 text-2xl font-bold text-white">
                  ${weeklysSavings.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-primary-100">Monthly Savings</div>
                <div className="mt-1 text-2xl font-bold text-white">
                  ${monthlySavings.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-primary-100">Yearly Savings</div>
                <div className="mt-1 text-3xl font-bold text-white">
                  ${yearlySavings.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/tools/roi-calculator"
                className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-50"
              >
                Get Detailed ROI Analysis →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}