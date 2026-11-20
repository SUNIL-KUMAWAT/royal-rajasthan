import Link from "@/components/LocalizedLink";
import { Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[86svh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 text-center">
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-gold-500/25 blur-[140px] dark:bg-gold-500/15" />
        <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] animate-aurora-slow rounded-full bg-maroon-500/15 blur-[140px] dark:bg-maroon-500/25" />
        <div className="absolute -left-20 top-10 h-[22rem] w-[22rem] rounded-full bg-royal-orange/10 blur-[120px]" />
      </div>

      <span className="eyebrow">Lost in the Thar</span>

      <h1 className="relative mt-6 select-none font-display text-[9rem] font-medium leading-[0.8] tracking-tighter sm:text-[13rem] md:text-[17rem]">
        <span className="text-gold-sheen italic">4</span>
        <span className="text-ink-900 dark:text-ivory-50">0</span>
        <span className="text-gold-sheen italic">4</span>
      </h1>

      <div className="glass-strong relative -mt-6 max-w-xl animate-float-slow rounded-[2rem] px-6 py-8 sm:-mt-10 sm:px-10">
        <h2 className="font-display text-3xl font-medium tracking-tight text-ink-900 md:text-4xl dark:text-ivory-50">
          Page <em className="font-normal italic text-gold-sheen">Not Found</em>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-500 md:text-lg dark:text-ivory-200/70">
          Oops! The page you are looking for seems to have wandered off into the desert.
          Let&apos;s get you back on the right path.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} />
            Return Home
          </Link>
          <Link href="/places" className="btn-glass">
            <Search size={16} />
            Explore Places
          </Link>
        </div>
      </div>
    </div>
  );
}
