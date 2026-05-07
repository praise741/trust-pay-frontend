export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans dark:from-gray-900 dark:to-indigo-950">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
          <span className="text-3xl font-bold text-white">TP</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to Trust Pay
        </h1>
        <p className="mb-8 max-w-md text-lg leading-8 text-gray-600 dark:text-gray-300">
          Your secure payment platform for fast, reliable, and trustworthy
          transactions.
        </p>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-8 text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
            href="/dashboard"
          >
            Get Started
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:w-auto"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
