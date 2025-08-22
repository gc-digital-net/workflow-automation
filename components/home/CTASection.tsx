import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Ready to Transform Your Workflow?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Join thousands of businesses that have streamlined their operations with the right automation tools. Start your journey today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/tools/software-finder"
              className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Find Your Perfect Software
            </Link>
            <Link
              href="/learn/certification"
              className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
            >
              Learn automation best practices <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}