'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'What is the best project management software overall?',
    answer: 'ClickUp consistently ranks as the best overall project management software due to its comprehensive feature set, competitive pricing, and flexibility. However, the "best" tool depends on your specific needs - Asana excels for team collaboration, Monday.com for visual workflows, and Jira for software development teams.'
  },
  {
    question: 'How much does project management software typically cost?',
    answer: 'Project management software typically costs between $5-$25 per user per month for mid-tier plans. Many tools offer free plans for small teams (usually up to 5-15 users). Enterprise plans can range from $30-$50+ per user monthly with advanced features and support.'
  },
  {
    question: 'Can I use project management software for free?',
    answer: 'Yes, many project management tools offer generous free plans. ClickUp, Asana, Trello, and Notion all have free tiers suitable for small teams. These typically include core features but may limit users, storage, or advanced functionality.'
  },
  {
    question: 'What\'s the difference between project management and task management software?',
    answer: 'Task management software focuses on individual to-dos and simple task tracking. Project management software includes broader capabilities like Gantt charts, resource management, time tracking, budgeting, and team collaboration features for managing complex projects with multiple stakeholders.'
  },
  {
    question: 'Should I choose cloud-based or on-premise project management software?',
    answer: 'Cloud-based solutions are recommended for most teams due to easier setup, automatic updates, remote access, and lower upfront costs. On-premise software is primarily for organizations with strict data security requirements or regulatory compliance needs.'
  },
  {
    question: 'How long does it take to implement project management software?',
    answer: 'Basic implementation can take 1-2 weeks for small teams, including setup, data migration, and initial training. Larger organizations may need 1-3 months for full deployment with customizations, integrations, and comprehensive training.'
  },
  {
    question: 'What integrations should I look for?',
    answer: 'Essential integrations include communication tools (Slack, Microsoft Teams), file storage (Google Drive, Dropbox), calendar apps (Google Calendar, Outlook), and productivity tools (Zoom, Loom). Developer teams should prioritize Git integrations.'
  },
  {
    question: 'Can project management software help with remote teams?',
    answer: 'Absolutely. Modern project management software is designed for remote collaboration with features like real-time updates, video conferencing integration, async communication, time zone management, and mobile apps for working from anywhere.'
  }
]

export function GuideFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card border rounded-lg">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold pr-4">{faq.question}</h3>
              <ChevronDownIcon 
                className={`h-5 w-5 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}