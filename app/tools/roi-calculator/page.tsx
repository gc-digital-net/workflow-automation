'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  DocumentArrowDownIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';

export default function ROICalculatorPage() {
  const router = useRouter();
  
  // Modal states
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  
  // Input states
  const [manualHours, setManualHours] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [teamSize, setTeamSize] = useState<number>(5);
  const [automationPercentage, setAutomationPercentage] = useState<number>(60);
  const [softwareCost, setSoftwareCost] = useState<number>(500);
  const [implementationCost, setImplementationCost] = useState<number>(5000);
  
  // Calculations
  const weeklyManualCost = manualHours * hourlyRate * teamSize;
  const monthlyManualCost = weeklyManualCost * 4.33;
  const yearlyManualCost = monthlyManualCost * 12;
  
  const timeSaved = (manualHours * automationPercentage) / 100;
  const weeklySavings = timeSaved * hourlyRate * teamSize;
  const monthlySavings = weeklySavings * 4.33;
  const yearlySavings = monthlySavings * 12;
  
  const totalFirstYearCost = (softwareCost * 12) + implementationCost;
  const netFirstYearSavings = yearlySavings - totalFirstYearCost;
  const roi = ((yearlySavings - totalFirstYearCost) / totalFirstYearCost) * 100;
  const paybackPeriod = totalFirstYearCost / monthlySavings;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleDownloadReport = async () => {
    setShowEmailModal(true);
  };
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    setDownloadError('');
    
    try {
      // Subscribe to newsletter
      const newsletterResponse = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'roi-calculator' }),
      });
      
      if (!newsletterResponse.ok) {
        throw new Error('Failed to subscribe');
      }
      
      // Generate PDF report data
      const reportData = {
        email,
        inputs: {
          manualHours,
          hourlyRate,
          teamSize,
          automationPercentage,
          softwareCost,
          implementationCost,
        },
        results: {
          currentManualCost: {
            weekly: weeklyManualCost,
            monthly: monthlyManualCost,
            yearly: yearlyManualCost,
          },
          savings: {
            timeSavedPerWeek: timeSaved * teamSize,
            weekly: weeklySavings,
            monthly: monthlySavings,
            yearly: yearlySavings,
          },
          investment: {
            firstYear: totalFirstYearCost,
            netFirstYear: netFirstYearSavings,
            roi: roi,
            paybackPeriod: paybackPeriod,
          },
          threeYearProjection: {
            year1: netFirstYearSavings,
            year2: yearlySavings - (softwareCost * 12),
            year3: yearlySavings - (softwareCost * 12),
            total: netFirstYearSavings + (yearlySavings - (softwareCost * 12)) * 2,
          },
        },
        generatedAt: new Date().toISOString(),
      };
      
      // Create downloadable JSON report (simulating PDF for now)
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `roi-report-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setDownloadSuccess(false);
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
      setDownloadError('Failed to generate report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleShare = () => {
    const shareData = {
      title: 'Workflow Automation ROI Calculator',
      text: `I could save ${formatCurrency(netFirstYearSavings)} in the first year by automating workflows!`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareData.text} Calculate your ROI: ${shareData.url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <CalculatorIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Workflow Automation ROI Calculator
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Calculate the potential return on investment for automating your business processes
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Current Process Information
                </h2>
                
                {/* Manual Hours */}
                <div className="mb-6">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      Weekly Manual Hours (per person)
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{manualHours} hours</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={manualHours}
                    onChange={(e) => setManualHours(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10 hours</span>
                    <span>80 hours</span>
                  </div>
                </div>
                
                {/* Hourly Rate */}
                <div className="mb-6">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                      Average Hourly Rate
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">${hourlyRate}/hour</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>$20/hour</span>
                    <span>$150/hour</span>
                  </div>
                </div>
                
                {/* Team Size */}
                <div className="mb-6">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-gray-400" />
                      Team Size
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{teamSize} people</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1 person</span>
                    <span>50 people</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Automation Potential
                </h2>
                
                {/* Automation Percentage */}
                <div className="mb-6">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-gray-400" />
                      Estimated Automation Potential
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{automationPercentage}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={automationPercentage}
                    onChange={(e) => setAutomationPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                      <InformationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Most businesses can automate 40-70% of repetitive tasks. Conservative estimates yield more realistic projections.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Software Investment
                </h2>
                
                {/* Monthly Software Cost */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Software Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={softwareCost}
                      onChange={(e) => setSoftwareCost(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="500"
                    />
                  </div>
                </div>
                
                {/* Implementation Cost */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    One-time Implementation Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={implementationCost}
                      onChange={(e) => setImplementationCost(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Your ROI Analysis
                </h2>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">ROI</div>
                    <div className={`text-2xl font-bold ${roi > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {roi.toFixed(0)}%
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payback Period</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {paybackPeriod.toFixed(1)} mo
                    </div>
                  </div>
                </div>
                
                {/* Savings Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Current Manual Cost (Yearly)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(yearlyManualCost)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Time Saved per Week</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{(timeSaved * teamSize).toFixed(0)} hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Yearly Savings</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(yearlySavings)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">First Year Investment</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">-{formatCurrency(totalFirstYearCost)}</span>
                  </div>
                  <div className="pt-4 border-t border-primary-200 dark:border-primary-700">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">Net First Year Savings</span>
                      <span className={`text-xl font-bold ${netFirstYearSavings > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatCurrency(netFirstYearSavings)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 3-Year Projection */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">3-Year Projection</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Year 1</span>
                      <span className={`font-medium ${netFirstYearSavings > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatCurrency(netFirstYearSavings)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Year 2</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(yearlySavings - (softwareCost * 12))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Year 3</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(yearlySavings - (softwareCost * 12))}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total (3 Years)</span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(netFirstYearSavings + (yearlySavings - (softwareCost * 12)) * 2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleDownloadReport}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    Download Report
                  </button>
                  <button 
                    onClick={handleShare}
                    className="px-4 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
              
              {/* Additional Benefits */}
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Additional Benefits</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <ChartBarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Improved accuracy and reduced errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChartBarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Better employee satisfaction and morale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChartBarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Faster turnaround times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChartBarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Enhanced scalability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Automating?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Find the perfect automation software for your needs with our personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools/software-finder"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              Find Your Software
            </a>
            <a
              href="/services/consultation"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-300"
            >
              Get Expert Help
            </a>
          </div>
        </div>
      </section>
      
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            {downloadSuccess ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Report Downloaded!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check your downloads folder for the ROI report.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Get Your Detailed ROI Report
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Enter your email to download a comprehensive PDF report and receive automation tips.
                </p>
                
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
                  />
                  
                  {downloadError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      {downloadError}
                    </p>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isDownloading}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isDownloading ? 'Generating...' : 'Download Report'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    We'll also send you weekly automation tips. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}