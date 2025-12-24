import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-50 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            {/* Logo */}
            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Your logo path */}
              <path d="..." fill="currentColor" />
            </svg>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            {/* Newsletter */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-900">Stay Financially Informed</h2>
              <p className="mt-4 text-gray-500">
                Get expert tips, market insights, and tools to help you build your financial future.
              </p>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only"> Email </label>
                <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="you@example.com"
                    className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                  />
                  <button className="mt-1 w-full bg-teal-600 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase hover:bg-teal-700 sm:mt-0 sm:w-auto">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Services */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Financial Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Investment Planning </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Retirement Strategies </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Wealth Management </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Tax Optimization </a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 hover:opacity-75"> About Us </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Our Advisors </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Careers </a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Resources</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Blog </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Financial Tools </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> FAQs </a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Privacy Policy </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Terms of Service </a></li>
                <li><a href="#" className="text-gray-700 hover:opacity-75"> Disclosures </a></li>
              </ul>
            </div>

            {/* Social Media */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {/* Facebook */}
              <li>
                <a href="#" className="text-gray-700 hover:opacity-75" aria-label="Facebook">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="..." />
                  </svg>
                </a>
              </li>
              {/* Instagram */}
              <li>
                <a href="#" className="text-gray-700 hover:opacity-75" aria-label="Instagram">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="..." />
                  </svg>
                </a>
              </li>
              {/* LinkedIn */}
              <li>
                <a href="#" className="text-gray-700 hover:opacity-75" aria-label="LinkedIn">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="..." />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="sm:flex sm:justify-between">
        <p className="text-xs text-gray-500">&copy; 2025. FinAdvise. All rights reserved.</p>

        <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
          </li>

          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
          </li>

          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Cookies </a>
          </li>
        </ul>
      </div>
    </div>
      </div>
    </footer>
  )
}

export default Footer
