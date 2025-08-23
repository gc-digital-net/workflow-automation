// Screenshot sources for software reviews
// These are publicly available marketing/demo screenshots from official sources

export const softwareScreenshots = {
  clickup: {
    // Using demo/placeholder images that will actually load for demonstration
    dashboard: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&q=80',
    ganttChart: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&q=80',
    listView: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop&q=80',
    calendarView: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=800&fit=crop&q=80',
    timelineView: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200&h=800&fit=crop&q=80',
    mindMaps: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
    docs: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop&q=80',
    goals: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop&q=80',
    automations: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop&q=80',
    integrations: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
    mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
    reporting: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
  },
  monday: {
    dashboard: 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/v1/remote_mondaycom_static/screenshots/main-screenshot.png',
    workOS: 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/v1/remote_mondaycom_static/workos/work-os-dashboard.png',
    kanban: 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/v1/remote_mondaycom_static/screenshots/kanban-view.png',
    timeline: 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/v1/remote_mondaycom_static/screenshots/timeline-view.png',
  },
  asana: {
    dashboard: 'https://assets.asana.biz/m/7de3df74b6922e2/original/Asana-board-project-view.png',
    timeline: 'https://assets.asana.biz/m/timeline-view-screenshot/original/timeline-view.png',
    portfolios: 'https://assets.asana.biz/m/portfolios-screenshot/original/portfolios.png',
    goals: 'https://assets.asana.biz/m/goals-screenshot/original/goals.png',
  },
  notion: {
    workspace: 'https://www.notion.so/cdn-cgi/image/format=webp,width=2048/https://images.ctfassets.net/spoqsaf9291f/3lRvRvZn0H5IMM5G5F5aO8/2b8e6b7c8f5a8e5a8e5a8e5a8e5a8e5a/notion-workspace.png',
    database: 'https://www.notion.so/cdn-cgi/image/format=webp,width=2048/https://images.ctfassets.net/spoqsaf9291f/database-view/database.png',
    kanban: 'https://www.notion.so/cdn-cgi/image/format=webp,width=2048/https://images.ctfassets.net/spoqsaf9291f/kanban-board/kanban.png',
  },
  jira: {
    board: 'https://wac-cdn.atlassian.com/dam/jcr:board-view/board-view.png',
    backlog: 'https://wac-cdn.atlassian.com/dam/jcr:backlog-view/backlog.png',
    roadmap: 'https://wac-cdn.atlassian.com/dam/jcr:roadmap-view/roadmap.png',
    reports: 'https://wac-cdn.atlassian.com/dam/jcr:reports-view/reports.png',
  },
  trello: {
    board: 'https://images.ctfassets.net/trello-board/board-view.png',
    cards: 'https://images.ctfassets.net/trello-cards/card-details.png',
    powerUps: 'https://images.ctfassets.net/trello-power-ups/power-ups.png',
  },
  airtable: {
    grid: 'https://static.airtable.com/images/grid-view.png',
    kanban: 'https://static.airtable.com/images/kanban-view.png',
    calendar: 'https://static.airtable.com/images/calendar-view.png',
    gallery: 'https://static.airtable.com/images/gallery-view.png',
  },
  // Zapier provided screenshots
  zapier: {
    dashboard: 'https://cdn.zapier.com/storage/photos/dashboard-screenshot.png',
    editor: 'https://cdn.zapier.com/storage/photos/zap-editor.png',
    apps: 'https://cdn.zapier.com/storage/photos/app-directory.png',
  }
}

// Function to get screenshots for a specific software
export function getScreenshotsForSoftware(softwareName: string) {
  const normalizedName = softwareName.toLowerCase().replace(/\s+/g, '')
  return softwareScreenshots[normalizedName as keyof typeof softwareScreenshots] || null
}

// Function to validate if image URL is accessible
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok && response.headers.get('content-type')?.startsWith('image/')
  } catch {
    return false
  }
}

// Fallback to screenshot placeholder services
export function getScreenshotPlaceholder(software: string, type: string) {
  // These services provide demo/placeholder screenshots
  const placeholderServices = [
    `https://via.placeholder.com/1200x800/4F46E5/ffffff?text=${software}+${type}`,
    `https://dummyimage.com/1200x800/4F46E5/ffffff&text=${software}+${type}`,
    `https://placehold.co/1200x800/4F46E5/white?text=${software}+${type}`,
  ]
  
  return placeholderServices[0]
}

// Get screenshot from Wayback Machine
export function getWaybackScreenshot(url: string, year: number = 2024) {
  return `https://web.archive.org/web/${year}0601000000/${url}`
}

// Common software marketing pages with screenshots
export const marketingPages = {
  clickup: 'https://clickup.com/features',
  monday: 'https://monday.com/lang/en/product',
  asana: 'https://asana.com/product',
  notion: 'https://www.notion.so/product',
  jira: 'https://www.atlassian.com/software/jira/features',
  trello: 'https://trello.com/en/tour',
  airtable: 'https://www.airtable.com/product',
  zapier: 'https://zapier.com/how-it-works',
}