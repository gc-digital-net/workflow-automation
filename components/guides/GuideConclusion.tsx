import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'

interface GuideConclusionProps {
  content: any
}

export function GuideConclusion({ content }: GuideConclusionProps) {
  return (
    <section className="mt-12 p-8 bg-muted/50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
      <div className="prose prose-lg max-w-none">
        <PortableText 
          value={content} 
          components={portableTextComponents}
        />
      </div>
    </section>
  )
}