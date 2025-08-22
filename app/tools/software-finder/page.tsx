'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CogIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  TrophyIcon
} from '@heroicons/react/24/solid';

interface Question {
  id: string;
  question: string;
  description?: string;
  type: 'single' | 'multiple';
  options: {
    value: string;
    label: string;
    icon?: any;
  }[];
}

const questions: Question[] = [
  {
    id: 'industry',
    question: 'What industry are you in?',
    description: 'This helps us recommend tools tailored to your sector',
    type: 'single',
    options: [
      { value: 'technology', label: 'Technology', icon: CogIcon },
      { value: 'marketing', label: 'Marketing & Creative', icon: SparklesIcon },
      { value: 'finance', label: 'Finance & Banking', icon: CurrencyDollarIcon },
      { value: 'healthcare', label: 'Healthcare', icon: BuildingOfficeIcon },
      { value: 'retail', label: 'Retail & E-commerce', icon: ChartBarIcon },
      { value: 'other', label: 'Other', icon: BeakerIcon },
    ],
  },
  {
    id: 'teamSize',
    question: 'How large is your team?',
    description: 'Different tools scale better for different team sizes',
    type: 'single',
    options: [
      { value: 'solo', label: '1 person', icon: UsersIcon },
      { value: 'small', label: '2-10 people', icon: UsersIcon },
      { value: 'medium', label: '11-50 people', icon: UsersIcon },
      { value: 'large', label: '51-200 people', icon: UsersIcon },
      { value: 'enterprise', label: '200+ people', icon: BuildingOfficeIcon },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your monthly budget per user?',
    description: 'We\'ll find options that fit your budget',
    type: 'single',
    options: [
      { value: 'free', label: 'Free only', icon: CurrencyDollarIcon },
      { value: 'low', label: '$1-10/user', icon: CurrencyDollarIcon },
      { value: 'budget_medium', label: '$11-30/user', icon: CurrencyDollarIcon },
      { value: 'high', label: '$31-50/user', icon: CurrencyDollarIcon },
      { value: 'premium', label: '$50+/user', icon: CurrencyDollarIcon },
    ],
  },
  {
    id: 'features',
    question: 'Which features are most important to you?',
    description: 'Select all that apply',
    type: 'multiple',
    options: [
      { value: 'project-management', label: 'Project Management' },
      { value: 'time-tracking', label: 'Time Tracking' },
      { value: 'automation', label: 'Workflow Automation' },
      { value: 'collaboration', label: 'Team Collaboration' },
      { value: 'reporting', label: 'Reporting & Analytics' },
      { value: 'integrations', label: 'Many Integrations' },
      { value: 'mobile', label: 'Mobile Apps' },
      { value: 'customization', label: 'Customization' },
    ],
  },
  {
    id: 'currentPain',
    question: 'What\'s your biggest challenge right now?',
    description: 'This helps us prioritize recommendations',
    type: 'single',
    options: [
      { value: 'disorganized', label: 'Disorganized workflows' },
      { value: 'communication', label: 'Poor team communication' },
      { value: 'visibility', label: 'Lack of project visibility' },
      { value: 'manual', label: 'Too many manual tasks' },
      { value: 'scattered', label: 'Information in too many places' },
      { value: 'scaling', label: 'Difficulty scaling processes' },
    ],
  },
  {
    id: 'techSavvy',
    question: 'How tech-savvy is your team?',
    description: 'We\'ll recommend tools that match your comfort level',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner - Keep it simple' },
      { value: 'intermediate', label: 'Intermediate - Some experience' },
      { value: 'advanced', label: 'Advanced - Bring on the features' },
      { value: 'expert', label: 'Expert - We love complexity' },
    ],
  },
];

// Software database with scoring based on different criteria
const softwareDatabase = [
  {
    name: 'ClickUp',
    description: 'All-in-one productivity platform',
    pricing: 'Free - $19/user/mo',
    keyFeatures: ['Highly customizable', 'Great free tier', 'All-in-one solution'],
    scores: {
      technology: 95,
      marketing: 85,
      finance: 75,
      healthcare: 70,
      retail: 80,
      other: 90,
      solo: 85,
      small: 95,
      medium: 90,
      large: 85,
      enterprise: 75,
      free: 90,
      low: 95,
      budget_medium: 85,
      high: 80,
      premium: 75,
      beginner: 70,
      intermediate: 90,
      advanced: 95,
      expert: 100,
    },
  },
  {
    name: 'Monday.com',
    description: 'Visual work management platform',
    pricing: '$8 - $24/user/mo',
    keyFeatures: ['Visual workflows', 'Easy to use', 'Strong automation'],
    scores: {
      technology: 80,
      marketing: 95,
      finance: 85,
      healthcare: 80,
      retail: 90,
      other: 85,
      solo: 70,
      small: 85,
      medium: 95,
      large: 90,
      enterprise: 85,
      free: 0,
      low: 80,
      budget_medium: 95,
      high: 90,
      premium: 85,
      beginner: 95,
      intermediate: 90,
      advanced: 80,
      expert: 75,
    },
  },
  {
    name: 'Asana',
    description: 'Team collaboration and work management',
    pricing: 'Free - $30.49/user/mo',
    keyFeatures: ['Clean interface', 'Beginner friendly', 'Good mobile apps'],
    scores: {
      technology: 85,
      marketing: 90,
      finance: 70,
      healthcare: 75,
      retail: 80,
      other: 85,
      solo: 80,
      small: 90,
      medium: 85,
      large: 80,
      enterprise: 70,
      free: 85,
      low: 75,
      budget_medium: 90,
      high: 85,
      premium: 80,
      beginner: 100,
      intermediate: 85,
      advanced: 75,
      expert: 70,
    },
  },
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and tasks',
    pricing: 'Free - $18/user/mo',
    keyFeatures: ['Database functionality', 'Wiki-style docs', 'Highly flexible'],
    scores: {
      technology: 90,
      marketing: 75,
      finance: 65,
      healthcare: 60,
      retail: 70,
      other: 80,
      solo: 95,
      small: 90,
      medium: 75,
      large: 60,
      enterprise: 50,
      free: 90,
      low: 85,
      budget_medium: 80,
      high: 75,
      premium: 70,
      beginner: 60,
      intermediate: 80,
      advanced: 95,
      expert: 100,
    },
  },
  {
    name: 'Jira',
    description: 'Project tracking for software teams',
    pricing: 'Free - $15.25/user/mo',
    keyFeatures: ['Agile focused', 'Developer friendly', 'Advanced reporting'],
    scores: {
      technology: 100,
      marketing: 50,
      finance: 60,
      healthcare: 55,
      retail: 60,
      other: 65,
      solo: 60,
      small: 75,
      medium: 85,
      large: 95,
      enterprise: 100,
      free: 75,
      low: 85,
      budget_medium: 90,
      high: 85,
      premium: 80,
      beginner: 40,
      intermediate: 70,
      advanced: 90,
      expert: 100,
    },
  },
  {
    name: 'Trello',
    description: 'Simple, visual task management',
    pricing: 'Free - $12.50/user/mo',
    keyFeatures: ['Kanban boards', 'Very simple', 'Great for beginners'],
    scores: {
      technology: 70,
      marketing: 85,
      finance: 60,
      healthcare: 65,
      retail: 75,
      other: 80,
      solo: 95,
      small: 90,
      medium: 70,
      large: 50,
      enterprise: 40,
      free: 95,
      low: 90,
      budget_medium: 80,
      high: 70,
      premium: 60,
      beginner: 100,
      intermediate: 75,
      advanced: 50,
      expert: 40,
    },
  },
];

function calculateRecommendations(answers: Record<string, string | string[]>) {
  // Calculate scores for each software based on answers
  const scoredSoftware = softwareDatabase.map(software => {
    let totalScore = 0;
    let criteriaCount = 0;
    
    // Industry score
    if (answers.industry) {
      totalScore += software.scores[answers.industry as keyof typeof software.scores] || 50;
      criteriaCount++;
    }
    
    // Team size score
    if (answers.teamSize) {
      totalScore += software.scores[answers.teamSize as keyof typeof software.scores] || 50;
      criteriaCount++;
    }
    
    // Budget score
    if (answers.budget) {
      totalScore += software.scores[answers.budget as keyof typeof software.scores] || 50;
      criteriaCount++;
    }
    
    // Tech savvy score
    if (answers.techSavvy) {
      totalScore += software.scores[answers.techSavvy as keyof typeof software.scores] || 50;
      criteriaCount++;
    }
    
    // Feature bonus scoring
    const features = answers.features as string[] || [];
    if (features.includes('automation') && software.name === 'Monday.com') totalScore += 10;
    if (features.includes('project-management') && ['ClickUp', 'Asana', 'Jira'].includes(software.name)) totalScore += 10;
    if (features.includes('customization') && ['ClickUp', 'Notion'].includes(software.name)) totalScore += 10;
    if (features.includes('collaboration') && ['Asana', 'Monday.com'].includes(software.name)) totalScore += 10;
    
    // Pain point bonus scoring
    if (answers.currentPain === 'disorganized' && ['ClickUp', 'Monday.com'].includes(software.name)) totalScore += 10;
    if (answers.currentPain === 'manual' && software.name === 'Monday.com') totalScore += 15;
    if (answers.currentPain === 'communication' && software.name === 'Asana') totalScore += 15;
    if (answers.currentPain === 'scattered' && ['ClickUp', 'Notion'].includes(software.name)) totalScore += 15;
    
    const averageScore = Math.round(totalScore / Math.max(criteriaCount, 1));
    
    return {
      ...software,
      score: Math.min(100, averageScore),
    };
  });
  
  // Sort by score and get top 3
  const sorted = scoredSoftware.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 3).map((software, index) => ({
    ...software,
    description: index === 0 
      ? `Perfect match for your ${answers.industry} team with ${answers.teamSize === 'solo' ? 'individual' : answers.teamSize} size`
      : index === 1
      ? `Excellent alternative that fits your budget and requirements`
      : `Great option for ${answers.techSavvy} users seeking simplicity`,
  }));
  
  // Get alternatives (lower scored options)
  const alternatives = sorted.slice(3, 6).map(software => ({
    name: software.name,
    category: software.description.split(' ').slice(0, 3).join(' '),
  }));
  
  return { top, alternatives };
}

export default function SoftwareFinderPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    if (question.type === 'single') {
      setAnswers({ ...answers, [question.id]: value });
      handleNext();
    } else {
      const current = (answers[question.id] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({
          ...answers,
          [question.id]: current.filter(v => v !== value),
        });
      } else {
        setAnswers({
          ...answers,
          [question.id]: [...current, value],
        });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowEmailCapture(false);
  };

  const isAnswered = question && (
    question.type === 'single' 
      ? !!answers[question.id]
      : (answers[question.id] as string[])?.length > 0
  );
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Subscribe to newsletter
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'software-finder',
          metadata: {
            answers,
            recommendations: calculateRecommendations(answers),
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      // Generate report
      const recommendations = calculateRecommendations(answers);
      const reportData = {
        email,
        answers,
        recommendations,
        timestamp: new Date().toISOString(),
      };
      
      // Download JSON report (simulating PDF)
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `software-recommendations-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowEmailCapture(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('Failed to send report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) {
    const recommendations = calculateRecommendations(answers);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <TrophyIcon className="h-16 w-16 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Personalized Recommendations
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Based on your responses, here are the best software tools for your needs
              </p>
            </div>

            {/* Top Recommendations */}
            <div className="space-y-6 mb-12">
              {recommendations.top.map((tool, index) => (
                <div
                  key={tool.name}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          {index === 0 && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded-full">
                              BEST MATCH
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {index + 1}. {tool.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          {tool.score}%
                        </div>
                        <div className="text-sm text-gray-500">match</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Pricing:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{tool.pricing}</span>
                      </div>
                      <div className="flex gap-2">
                        {tool.keyFeatures.map(feature => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`/reviews/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                      >
                        Read Full Review
                      </a>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-700 dark:text-gray-300">
                        Try Free
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alternative Options */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Alternative Options to Consider
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {recommendations.alternatives.map(alt => (
                  <div key={alt.name} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{alt.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alt.category}</p>
                    <a
                      href={`/reviews/${alt.name.toLowerCase()}`}
                      className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mt-2 inline-block"
                    >
                      Learn more →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Capture */}
            {!showEmailCapture ? (
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get Your Complete Report
                </h3>
                <p className="text-primary-100 mb-6">
                  Receive a detailed PDF report with all recommendations, pricing comparisons, and implementation tips
                </p>
                <button
                  onClick={() => setShowEmailCapture(true)}
                  className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-semibold"
                >
                  Get Free Report
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8">
                {submitSuccess ? (
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mb-4">
                      <CheckIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Report Sent Successfully!
                    </h3>
                    <p className="text-primary-100">
                      Check your email and downloads folder.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      Enter Your Email
                    </h3>
                    <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 mb-4"
                      />
                      {submitError && (
                        <p className="text-white/90 text-sm mb-4">{submitError}</p>
                      )}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? 'Sending...' : 'Send My Report'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Start Over
              </button>
              <a
                href="/reviews/compare"
                className="px-6 py-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Compare All Options →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <SparklesIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Software Finder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Answer a few questions to get personalized recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          {question && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {question.question}
              </h2>
              {question.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {question.description}
                </p>
              )}

              <div className="space-y-3">
                {question.options.map(option => {
                  const isSelected = question.type === 'single'
                    ? answers[question.id] === option.value
                    : (answers[question.id] as string[] || []).includes(option.value);

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon && <option.icon className="h-5 w-5 text-gray-400" />}
                        <span className={`font-medium ${
                          isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {option.label}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    currentQuestion === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Back
                </button>
                {question.type === 'multiple' && (
                  <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium ${
                      isAnswered
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}