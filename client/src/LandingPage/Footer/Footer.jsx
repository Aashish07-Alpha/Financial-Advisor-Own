import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-50 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            {/* Logo */}
            <svg className="h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor" />
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
                <li><a href="/ppf" className="text-gray-700 hover:opacity-75"> Investment Planning </a></li>
                <li><a href="/ppf" className="text-gray-700 hover:opacity-75"> Retirement Strategies </a></li>
                <li><a href="/advisor" className="text-gray-700 hover:opacity-75"> Wealth Management </a></li>
                <li><a href="/ppf" className="text-gray-700 hover:opacity-75"> Tax Optimization </a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="/" className="text-gray-700 hover:opacity-75"> About Us </a></li>
                <li><a href="/advisor" className="text-gray-700 hover:opacity-75"> Our Advisors </a></li>
                <li><a href="/" className="text-gray-700 hover:opacity-75"> Careers </a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Resources</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="/learn" className="text-gray-700 hover:opacity-75"> Blog </a></li>
                <li><a href="/ppf" className="text-gray-700 hover:opacity-75"> Financial Tools </a></li>
                <li><a href="/" className="text-gray-700 hover:opacity-75"> FAQs </a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><button type="button" className="text-gray-700 hover:opacity-75"> Privacy Policy </button></li>
                <li><button type="button" className="text-gray-700 hover:opacity-75"> Terms of Service </button></li>
                <li><button type="button" className="text-gray-700 hover:opacity-75"> Disclosures </button></li>
              </ul>
            </div>

            {/* Social Media */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {/* Facebook */}
              <li>
                <button type="button" className="text-gray-700 hover:opacity-75" aria-label="Facebook">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </li>
              {/* Instagram */}
              <li>
                <button type="button" className="text-gray-700 hover:opacity-75" aria-label="Instagram">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </button>
              </li>
              {/* LinkedIn */}
              <li>
                <button type="button" className="text-gray-700 hover:opacity-75" aria-label="LinkedIn">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="sm:flex sm:justify-between">
        <p className="text-xs text-gray-500">&copy; 2025. FinAdvise. All rights reserved.</p>

        <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
          <li>
            <button type="button" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </button>
          </li>

          <li>
            <button type="button" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </button>
          </li>

          <li>
            <button type="button" className="text-gray-500 transition hover:opacity-75"> Cookies </button>
          </li>
        </ul>
      </div>
    </div>
      </div>
    </footer>
  )
}

export default Footer
