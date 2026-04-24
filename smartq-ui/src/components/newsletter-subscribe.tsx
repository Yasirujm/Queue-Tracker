"use client";

import { useState } from "react";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setBusy(true);
      // TODO: call your API here
      // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
      alert(`Subscribed with: ${email}`);
      setEmail("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full bg-blue-10">
      {/* Full-width background, but content constrained inside */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-black/5">
          {/* subtle decorative gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_0%_0%,rgba(168,85,247,0.08),transparent),radial-gradient(40rem_20rem_at_100%_100%,rgba(99,102,241,0.08),transparent)]" />

          <div className="relative grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-10">
            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-wider text-sky-700/80">
                EXCLUSIVE DEALS • EARLY ACCESS
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                Subscribe to travel tips, price drops, and member‑only offers
              </h2>
              <p className="mt-3 text-sm text-gray-600 md:text-base">
                Be the first to know about new destinations, seasonal promotions, and curated
                experiences across Sri Lanka.
              </p>

              {/* Trust row (optional badges) */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 ring-1 ring-gray-200">
                  No spam
                </span>
                <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 ring-1 ring-gray-200">
                  Unsubscribe anytime
                </span>
              </div>
            </div>

            {/* Right: form */}
            <div className="flex items-center">
              <form
                onSubmit={submit}
                className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 md:p-5"
                aria-label="Subscribe to our newsletter"
              >
                <label htmlFor="nl-email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <div className="mt-2 flex gap-2">
                  <div className="relative w-full">
                    <input
                      id="nl-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                    {/* Mail icon */}
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6h16v12H4z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className="shrink-0 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:opacity-70"
                  >
                    {busy ? "Sending…" : "Subscribe"}
                  </button>
                </div>

                {/* Legal / small print */}
                <p className="mt-3 text-xs text-gray-500">
                  By subscribing, you agree to our{" "}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-gray-700">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
