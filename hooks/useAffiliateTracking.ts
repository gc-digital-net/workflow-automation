'use client'

import { useCallback } from 'react'

interface TrackClickParams {
  url: string
  toolName: string
  source: string
  position?: number
}

export function useAffiliateTracking() {
  const trackClick = useCallback(async ({ url, toolName, source, position }: TrackClickParams) => {
    try {
      // Send tracking data to API
      await fetch('/api/track/affiliate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          toolName,
          source,
          position,
        }),
      })
    } catch (error) {
      console.error('Failed to track affiliate click:', error)
    }
  }, [])

  const handleAffiliateClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    params: TrackClickParams
  ) => {
    // Track the click
    trackClick(params)
    
    // Let the default link behavior continue
    // The browser will open the link
  }, [trackClick])

  return { trackClick, handleAffiliateClick }
}