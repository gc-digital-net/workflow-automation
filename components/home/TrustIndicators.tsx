import Image from 'next/image';

const companies = [
  { name: 'ClickUp', logo: '/logos/clickup.svg' },
  { name: 'Zapier', logo: '/logos/zapier.svg' },
  { name: 'Asana', logo: '/logos/asana.svg' },
  { name: 'Monday.com', logo: '/logos/monday.svg' },
  { name: 'Notion', logo: '/logos/notion.svg' },
  { name: 'Airtable', logo: '/logos/airtable.svg' },
];

export default function TrustIndicators() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
            Trusted Reviews of Industry-Leading Software
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company.name}
                className="col-span-1 flex items-center justify-center grayscale transition-all hover:grayscale-0"
              >
                <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}