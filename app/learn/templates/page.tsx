'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  downloads: number;
  isPremium: boolean;
  fileType: string;
  tags: string[];
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', count: 127 },
    { id: 'workflow', name: 'Workflow Design', count: 34 },
    { id: 'process', name: 'Process Maps', count: 28 },
    { id: 'evaluation', name: 'Software Evaluation', count: 19 },
    { id: 'roi', name: 'ROI Calculators', count: 12 },
    { id: 'implementation', name: 'Implementation Plans', count: 15 },
    { id: 'documentation', name: 'Documentation', count: 19 },
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Workflow Automation ROI Calculator',
      description: 'Calculate potential savings and ROI from automation initiatives',
      category: 'roi',
      downloads: 2341,
      isPremium: false,
      fileType: 'Excel',
      tags: ['ROI', 'Calculator', 'Business Case'],
    },
    {
      id: '2',
      name: 'Software Evaluation Scorecard',
      description: 'Comprehensive framework for evaluating automation software',
      category: 'evaluation',
      downloads: 1876,
      isPremium: false,
      fileType: 'Excel',
      tags: ['Evaluation', 'Comparison', 'Selection'],
    },
    {
      id: '3',
      name: 'Process Mapping Template',
      description: 'Visual template for mapping current and future state processes',
      category: 'process',
      downloads: 1543,
      isPremium: false,
      fileType: 'Visio',
      tags: ['Process', 'Mapping', 'Analysis'],
    },
    {
      id: '4',
      name: 'Implementation Project Plan',
      description: 'Detailed project plan for automation implementation',
      category: 'implementation',
      downloads: 1234,
      isPremium: true,
      fileType: 'MS Project',
      tags: ['Implementation', 'Project', 'Timeline'],
    },
    {
      id: '5',
      name: 'Change Management Toolkit',
      description: 'Complete toolkit for managing organizational change',
      category: 'implementation',
      downloads: 987,
      isPremium: true,
      fileType: 'PowerPoint',
      tags: ['Change', 'Training', 'Adoption'],
    },
    {
      id: '6',
      name: 'Workflow Audit Checklist',
      description: 'Comprehensive checklist for auditing existing workflows',
      category: 'workflow',
      downloads: 876,
      isPremium: false,
      fileType: 'PDF',
      tags: ['Audit', 'Checklist', 'Assessment'],
    },
    {
      id: '7',
      name: 'Vendor RFP Template',
      description: 'Request for proposal template for automation vendors',
      category: 'evaluation',
      downloads: 765,
      isPremium: true,
      fileType: 'Word',
      tags: ['RFP', 'Vendor', 'Procurement'],
    },
    {
      id: '8',
      name: 'KPI Dashboard Template',
      description: 'Track and visualize automation KPIs and metrics',
      category: 'roi',
      downloads: 654,
      isPremium: true,
      fileType: 'Power BI',
      tags: ['KPI', 'Dashboard', 'Metrics'],
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Automation Templates & Tools
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Save hours with our professionally designed templates for workflow automation, 
              process mapping, ROI calculation, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/community/membership"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Get Premium Access
              </Link>
              <Link
                href="#templates"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Browse Templates →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">127+</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Templates Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Downloads</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">89</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Free Templates</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">Weekly</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">New Additions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <div className="sticky top-4">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FunnelIcon className="h-5 w-5 mr-2" />
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            {category.name}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.count}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Premium CTA */}
                <div className="mt-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <SparklesIcon className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold mb-2">Go Premium</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Unlock all templates and get exclusive access to new releases
                  </p>
                  <Link
                    href="/community/membership"
                    className="block w-full text-center bg-white text-blue-600 rounded-md px-3 py-2 text-sm font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({filteredTemplates.length} templates)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                  >
                    {template.isPremium && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                          <LockClosedIcon className="h-3 w-3 mr-1" />
                          Premium
                        </span>
                      </div>
                    )}
                    
                    <DocumentDuplicateIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {template.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{template.fileType}</span>
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>
                    
                    <button
                      className={`w-full flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        template.isPremium
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                      {template.isPremium ? 'Premium Only' : 'Download Free'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Need a Custom Template?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our team can create custom templates tailored to your specific workflow needs
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/services/consultation"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Request Custom Template
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}