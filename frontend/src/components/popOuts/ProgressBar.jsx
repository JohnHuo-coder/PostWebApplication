const steps = [
  { id: 'Step 1', name: 'creat account', href: '#', status: 'complete' },
  { id: 'Step 2', name: 'Complete Public Information', href: '#', status: 'current' },
  { id: 'Step 3', name: 'Complete Personal Information', href: '#', status: 'upcoming' },
]

export default function ProgressBar() {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0 dark:border-indigo-500 dark:hover:border-indigo-400"
              >
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 dark:text-indigo-400 dark:group-hover:text-indigo-300">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                aria-current="step"
                className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0 dark:border-indigo-500"
              >
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{step.id}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0 dark:border-white/10 dark:hover:border-white/20"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}