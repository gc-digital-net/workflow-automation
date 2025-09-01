import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Software Guides',
    default: 'Software Guides | Workflow Automation'
  },
  description: 'Expert-curated guides to the best workflow automation and project management software. In-depth reviews, comparisons, and recommendations.',
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {children}
    </div>
  )
}