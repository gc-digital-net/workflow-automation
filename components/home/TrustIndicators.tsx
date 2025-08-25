import Image from 'next/image';

const companies = [
  { 
    name: 'ClickUp', 
    logo: '/tools/clickup/logo-v3-clickup-dark.svg',
    logoDark: '/tools/clickup/logo-v3-clickup-white.svg'
  },
  { 
    name: 'Zapier', 
    logo: '/tools/zapier/logo_black.svg',
    logoDark: '/tools/zapier/logo_white.svg'
  },
  { 
    name: 'Asana', 
    logo: '/tools/asana/Asana-Logo-Horizontal-Dark-Coral-SVG.svg',
    logoDark: '/tools/asana/Asana-Logo-Horizontal-Bright-Coral-SVG.svg'
  },
  { 
    name: 'Monday.com', 
    logo: '/tools/monday/monday logo_black.svg',
    logoDark: '/tools/monday/monday logo_black.svg'
  },
  { 
    name: 'Notion', 
    logo: '/tools/notion/notion-logo.svg',
    logoDark: '/tools/notion/notion-logo.svg'
  },
  { 
    name: 'Airtable', 
    logo: '/tools/airtable/airtable-logo-horizontal.png',
    logoDark: '/tools/airtable/Airtable-Logo-White.png'
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-8">
            Trusted Reviews of Industry-Leading Software
          </p>
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none" />
            
            {/* Logo grid */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <div className="relative h-10 w-32">
                    {/* Light mode logo */}
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain dark:hidden"
                      sizes="(max-width: 640px) 120px, 128px"
                    />
                    {/* Dark mode logo */}
                    <Image
                      src={company.logoDark}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain hidden dark:block"
                      sizes="(max-width: 640px) 120px, 128px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Trust stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">300+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Software Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categories Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}