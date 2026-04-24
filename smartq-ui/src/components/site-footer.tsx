"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Help and Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Support Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
            >
              <FaYoutube className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Queue Smart. All rights reserved.
      </div>
    </footer>
  );
}
