import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'

interface GuideIntroductionProps {
  content: any
}

export function GuideIntroduction({ content }: GuideIntroductionProps) {
  return (
    <section className="mb-12">
      <div className="prose prose-lg max-w-none">
        <PortableText 
          value={content} 
          components={portableTextComponents}
        />
      </div>
    </section>
  )
}