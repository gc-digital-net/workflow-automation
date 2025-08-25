'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface ReviewSubmissionFormProps {
  softwareId: string
  softwareName: string
}

export default function ReviewSubmissionForm({ softwareId, softwareName }: ReviewSubmissionFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    reviewerName: '',
    reviewerEmail: '',
    reviewerRole: '',
    companyName: '',
    companySize: '',
    rating: 0,
    categoryRatings: {
      easeOfUse: 0,
      features: 0,
      valueForMoney: 0,
      customerSupport: 0
    },
    usageLength: '',
    headline: '',
    pros: '',
    cons: '',
    useCases: '',
    wouldRecommend: true
  })

  const handleRatingClick = (field: string, value: number) => {
    if (field === 'rating') {
      setFormData(prev => ({ ...prev, rating: value }))
    } else {
      setFormData(prev => ({
        ...prev,
        categoryRatings: {
          ...prev.categoryRatings,
          [field]: value
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          software: softwareId
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setIsOpen(false)
      } else {
        alert('Error submitting review. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const RatingStars = ({ field, value }: { field: string, value: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingClick(field, star)}
          className="focus:outline-none"
        >
          {star <= value ? (
            <StarIconSolid className="h-6 w-6 text-yellow-400 hover:scale-110 transition-transform" />
          ) : (
            <StarIcon className="h-6 w-6 text-gray-300 hover:text-yellow-400 hover:scale-110 transition-all" />
          )}
        </button>
      ))}
    </div>
  )

  if (submitted) {
    return (
      <div className="text-center py-12 bg-accent-green/10 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your review has been submitted and will be published after moderation.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({
              reviewerName: '',
              reviewerEmail: '',
              reviewerRole: '',
              companyName: '',
              companySize: '',
              rating: 0,
              categoryRatings: {
                easeOfUse: 0,
                features: 0,
                valueForMoney: 0,
                customerSupport: 0
              },
              usageLength: '',
              headline: '',
              pros: '',
              cons: '',
              useCases: '',
              wouldRecommend: true
            })
          }}
          className="px-6 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Write Another Review
        </button>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Help others make informed decisions by sharing your experience with {softwareName}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-accent-green text-gray-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Write a Review
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Write Your Review for {softwareName}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name *</label>
            <input
              type="text"
              required
              value={formData.reviewerName}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewerName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.reviewerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewerEmail: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Job Title/Role</label>
            <input
              type="text"
              value={formData.reviewerRole}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewerRole: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Company Size & Usage Length */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Company Size</label>
            <select
              value={formData.companySize}
              onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            >
              <option value="">Select...</option>
              <option value="small">1-10 employees</option>
              <option value="medium">11-50 employees</option>
              <option value="large">51-200 employees</option>
              <option value="xlarge">201-500 employees</option>
              <option value="enterprise">500+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">How long have you used {softwareName}?</label>
            <select
              value={formData.usageLength}
              onChange={(e) => setFormData(prev => ({ ...prev, usageLength: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            >
              <option value="">Select...</option>
              <option value="<6months">Less than 6 months</option>
              <option value="6-12months">6-12 months</option>
              <option value="1-2years">1-2 years</option>
              <option value="2+years">2+ years</option>
            </select>
          </div>
        </div>

        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Overall Rating *</label>
          <RatingStars field="rating" value={formData.rating} />
        </div>

        {/* Category Ratings */}
        <div className="space-y-3">
          <h4 className="font-semibold">Rate specific aspects:</h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Ease of Use</span>
            <RatingStars field="easeOfUse" value={formData.categoryRatings.easeOfUse} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Features</span>
            <RatingStars field="features" value={formData.categoryRatings.features} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Value for Money</span>
            <RatingStars field="valueForMoney" value={formData.categoryRatings.valueForMoney} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Customer Support</span>
            <RatingStars field="customerSupport" value={formData.categoryRatings.customerSupport} />
          </div>
        </div>

        {/* Review Headline */}
        <div>
          <label className="block text-sm font-medium mb-2">Review Headline *</label>
          <input
            type="text"
            required
            maxLength={100}
            value={formData.headline}
            onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
            placeholder="Summarize your experience in one line"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
          />
        </div>

        {/* Pros */}
        <div>
          <label className="block text-sm font-medium mb-2">What do you like best? * (50-500 characters)</label>
          <textarea
            required
            minLength={50}
            maxLength={500}
            value={formData.pros}
            onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
          />
          <div className="text-xs text-gray-500 mt-1">{formData.pros.length}/500 characters</div>
        </div>

        {/* Cons */}
        <div>
          <label className="block text-sm font-medium mb-2">What do you dislike? * (50-500 characters)</label>
          <textarea
            required
            minLength={50}
            maxLength={500}
            value={formData.cons}
            onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
          />
          <div className="text-xs text-gray-500 mt-1">{formData.cons.length}/500 characters</div>
        </div>

        {/* Use Cases */}
        <div>
          <label className="block text-sm font-medium mb-2">What problems are you solving? (optional)</label>
          <textarea
            maxLength={500}
            value={formData.useCases}
            onChange={(e) => setFormData(prev => ({ ...prev, useCases: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
          />
        </div>

        {/* Recommendation */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="recommend"
            checked={formData.wouldRecommend}
            onChange={(e) => setFormData(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
          <label htmlFor="recommend" className="text-sm font-medium">
            I would recommend {softwareName} to others
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            className="px-6 py-3 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}