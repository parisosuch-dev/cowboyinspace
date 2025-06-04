export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black dark:text-white">
      <p className="text-xs sm:text-sm font-light text-gray-300 dark:text-white/50">
        4 OH 4
      </p>
      <h1 className="text-7xl font-bold">Looks like you&apos;re lost.</h1>
      <p className="mt-2">
        {"("}or you found a page I haven&apos;t finished{")"}
      </p>
    </div>
  );
}
