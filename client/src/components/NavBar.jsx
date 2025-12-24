import React, { useState, useEffect, useContext } from "react";
import { Menu, X, BadgeDollarSign, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../LandingPage/Hero/Hero.css";
import AuthContext from '../Authorisation/AuthProvider';
import { useAuthState } from '../hooks/useAuthState';

const NavBar = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { isAuthenticated, user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);



  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    logout();
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(false);
    navigate('/profile');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 navbar-fade-in ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px 0 #22c55e22, 0 1.5px 4px 0 #4ade8033' : 'none',
        borderBottom: scrolled ? '1.5px solid #bbf7d055' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 grid grid-cols-2">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-50 transition duration-200">
            <BadgeDollarSign className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-extrabold text-green-800 tracking-tight drop-shadow">FinAdvise</span>
          </a>

          {/* Right: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 inline-block list-none mx-5 text-[rgb(6,86,6)] text-[18px] font-medium transition duration-500 cursor-pointer font-[Outfit]">
           {!isAuthenticated && (
           <a
              href="/"
              className="nav-link nav-link-animated"
            >
              Home
            </a>
           )}

           {isAuthenticated && (
           <a
              href="/financialAdvisior"
              className="nav-link nav-link-animated"
            >
              Dashboard
            </a>
           )}
            <a
              href="/ppf"
              className="nav-link nav-link-animated"
            >
              CalcPro
            </a>
            {/* <a
              href="/scheme"
              className="nav-link"
            >
              Scheme
            </a> */}
            <a
              href="/news"
              className="nav-link nav-link-animated"
            >
              News
            </a>
            <a
              href="/road"
              className="nav-link nav-link-animated"
            >
              AdvisorMap
            </a>

            {/* Show Sign In Button if not signed in */}
            {!isAuthenticated ? (
              <a
                href="/login"
                className="nav-link nav-link-animated"
              >
                Login
              </a>
            ) : (
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full hover:from-green-600 hover:to-emerald-700 transition-colors cursor-pointer border-2 border-white shadow-md"
                >
                  <span className="text-white font-semibold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3 text-green-600" />
                      Profile
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition font-semibold shadow-sm border border-green-200"
            >
              <Globe className="h-4 w-4 mr-1" />
             
            </button> */}

            {/* Show User Profile Button if signed in */}
            {/* This section is now handled by the custom user display */}

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-green-800 p-2 rounded-lg hover:bg-green-100 transition"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-green-100 rounded-b-2xl shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <a
              href="/"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              Home
            </a>
            <a
              href="/ppf"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              CalcPro
            </a>
            <a
              href="/scheme"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              Scheme
            </a>
            <a
              href="/news"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              News
            </a>
            <a
              href="/road"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
                  AdvisorMap
            </a>

             {/* Show Sign In Button if not signed in */}
             {!isAuthenticated ? (
              <a
                href="/login"
                className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
              >
                Login
              </a>
                         ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white shadow-md">
                        <span className="text-white font-semibold text-base">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition font-semibold shadow-sm border border-green-200 w-full"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </button> */}

             {/* Show User Profile Button if signed in */}
             {/* This section is now handled by the custom user display */}

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
