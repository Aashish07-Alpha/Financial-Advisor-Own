import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { BadgeDollarSign, Menu, X, User, LogOut } from 'lucide-react';
import "../../LandingPage/Hero/Hero.css";
import AuthContext from '../../Authorisation/AuthProvider';
import { useAuthState } from '../../hooks/useAuthState';

export const LandNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { isAuthenticated, user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Close menu on link click (for better UX)
  const handleMenuLinkClick = () => setMenuOpen(false);

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    logout();
    handleMenuLinkClick();
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(false);
    navigate('/profile');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 navbar-fade-in ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px 0 #22c55e22, 0 1.5px 4px 0 #4ade8033' : 'none',
        borderBottom: scrolled ? '1.5px solid #bbf7d055' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-50 transition duration-200">
          <BadgeDollarSign className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-xl font-extrabold text-green-800 tracking-tight drop-shadow">FinAdvise</span>
        </a>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-green-800 p-2 rounded-lg hover:bg-green-100 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Menu */}
        <ul className={`hidden md:flex items-center space-x-8 font-semibold text-green-800 text-lg transition-all duration-300`}> 
          {!isAuthenticated && (
            <li>
              <Link to="hero" smooth={true} offset={0} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
                Home
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <a href='/financialAdvisior' className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
                Dashboard
              </a>
            </li>
          )}
          <li>
            <Link to="program" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Program
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} offset={-150} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              About us
            </Link>
          </li>
          <li>
            <Link to="testimonials" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Contact us
            </Link>
          </li>
          <li>
            {!isAuthenticated ? (
              <a
                href="/login"
                className="nav-link nav-link-animated"
                onClick={handleMenuLinkClick}
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
          </li>
        </ul>
      </div>
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-green-100 rounded-b-2xl shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {!isAuthenticated && (
              <a href="#hero" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Home</a>
            )}
            {isAuthenticated && (
              <a href='/financialAdvisior' className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Dashboard</a>
            )}
            <a href="#program" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Program</a>
            <a href="#about" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>About us</a>
            <a href="#testimonials" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Testimonials</a>
            <a href="#contact" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Contact us</a>
            {!isAuthenticated ? (
              <a href="/login" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Login</a>
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
          </div>
        </div>
      )}
    </nav>
  );
};