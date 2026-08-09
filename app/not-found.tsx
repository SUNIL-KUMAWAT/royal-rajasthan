import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-9xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-700 dark:text-amber-500 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8 text-lg">
        Oops! The page you are looking for seems to have wandered off into the desert. 
        Let's get you back on the right path.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
        >
          Return Home
        </Link>
        <Link 
          href="/places" 
          className="px-8 py-3 bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-500 font-medium rounded-full border-2 border-amber-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Search size={18} />
          Explore Places
        </Link>
      </div>
    </div>
  );
}
