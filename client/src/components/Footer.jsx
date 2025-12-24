import React from "react";

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              FinAdvise is your trusted partner for smart financial planning.
              We provide expert guidance, tools, and resources to help you
              achieve your financial goals.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:underline"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:underline"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("privacy")}
                  className="hover:underline"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("terms")}
                  className="hover:underline"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email: support@finadvise.com
              <br />
              Phone: +1 234 567 890
              <br />
              Address: 123 Finance Street, Money City
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} FinAdvise. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;