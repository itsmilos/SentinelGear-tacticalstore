import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-black px-4 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-display text-xl sm:text-2xl">
            SentinelGear
          </Link>

          <h2 className="mt-1 text-xs tracking-widest text-gray-400">
            © SENTINELGEAR ALL RIGHTS RESERVED
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <h3 className="font-display text-lg sm:text-xl">Support</h3>

          <p className="text-sm text-gray-400">support@sentinelgear.com</p>

          <div className="mt-2 flex flex-wrap gap-3 sm:justify-end">
            <Link href="/terms" className="underline">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
