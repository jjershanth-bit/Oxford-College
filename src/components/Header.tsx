import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, MapPin, Phone, ChevronDown, User, ShoppingCart, Bell, LogOut, Check, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Lingua Franca', path: '/lingua-franca' },
  { name: 'Testimonials', path: '/testimonials', hasDropdown: true },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  const {
    currentUser,
    cart,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    logout
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifOpen(false);
  }, [location]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-deep text-white h-14 flex items-center z-50 relative">
        <div className="content-max-width w-full flex items-center justify-between px-4 md:px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
              <path d="M16 2L4 8V24L16 30L28 24V8L16 2Z" fill="#3b71ca" stroke="white" strokeWidth="1.5"/>
              <path d="M16 8L10 11V17L16 20L22 17V11L16 8Z" fill="white" opacity="0.9"/>
              <path d="M16 12V16M14 14H18" stroke="#3b71ca" strokeWidth="1"/>
            </svg>
            <span className="font-heading font-bold text-sm md:text-base tracking-wide">OXFORD COLLEGE</span>
          </Link>

          {/* Center - Location */}
          <div className="hidden lg:flex items-center gap-2 text-gray-text">
            <MapPin size={14} className="text-brand-blue" />
            <span className="text-[11px] uppercase tracking-wider">Nittambuwa, Colombo, Sri Lanka</span>
          </div>

          {/* Right - Phone, Notifications, Cart, Account */}
          <div className="flex items-center gap-4 relative">
            <a href="tel:+94779639969" className="hidden xl:flex items-center gap-2 text-[11px] hover:text-brand-blue transition-colors">
              <Phone size={14} className="text-brand-blue" />
              <span>+94 779639969</span>
            </a>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="hover:text-brand-blue transition-colors relative p-1 flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold scale-90">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white text-brand-dark rounded-xl shadow-2xl border border-gray-100 py-3 z-50 max-h-[420px] overflow-y-auto transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                    <h3 className="font-heading font-semibold text-sm">Notifications</h3>
                    <div className="flex gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          title="Mark all as read"
                          className="text-xs text-brand-blue hover:underline flex items-center gap-1 font-medium"
                        >
                          <Check size={12} /> Read All
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          onClick={clearNotifications}
                          title="Clear all"
                          className="text-xs text-red-500 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Trash2 size={12} /> Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-text text-sm font-light">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                            !notif.read ? 'bg-blue-50/40 font-medium' : ''
                          }`}
                        >
                          {!notif.read && (
                            <span className="absolute left-1.5 top-4.5 w-1.5 h-1.5 bg-brand-blue rounded-full" />
                          )}
                          <div className="text-xs font-semibold text-brand-dark pr-6">{notif.title}</div>
                          <div className="text-[11px] text-gray-text font-light mt-0.5 leading-relaxed">{notif.message}</div>
                          <div className="text-[9px] text-gray-400 font-light mt-1">{notif.date}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon */}
            <Link
              to="/cart"
              className="hover:text-brand-blue transition-colors relative p-1 flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold scale-90">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Account / Session Link */}
            <div className="flex items-center gap-2">
              <Link
                to="/account"
                className={`hover:text-brand-blue transition-colors flex items-center gap-1.5 p-1 ${
                  currentUser ? 'text-brand-blue' : ''
                }`}
                aria-label="My Account"
              >
                <User size={20} />
                {currentUser && (
                  <span className="hidden sm:inline text-xs font-medium max-w-[80px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                )}
              </Link>
              {currentUser && (
                <button
                  onClick={logout}
                  className="hover:text-red-400 transition-colors p-1 text-gray-text hover:bg-red-500/10 rounded"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`bg-white sticky top-0 z-40 transition-shadow duration-300 ${
          scrolled ? 'shadow-nav' : ''
        }`}
      >
        <div className="content-max-width flex items-center justify-between h-[60px] px-4 md:px-5">
          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className={`flex items-center gap-1 font-heading font-medium text-sm transition-colors hover:text-brand-blue ${
                      isActive(link.path) ? 'text-brand-blue' : 'text-brand-dark'
                    }`}>
                      {link.name}
                      <ChevronDown size={14} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg py-2 min-w-[180px] z-50">
                        <Link
                          to="/testimonials"
                          className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-blue hover:bg-gray-50 transition-colors"
                        >
                          Student Testimonials
                        </Link>
                        <Link
                          to="/testimonials"
                          className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-blue hover:bg-gray-50 transition-colors"
                        >
                          Success Stories
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-heading font-medium text-sm transition-colors hover:text-brand-blue relative group ${
                      isActive(link.path) ? 'text-brand-blue' : 'text-brand-dark'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-brand-dark" /> : <Menu size={24} className="text-brand-dark" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-brand-deep z-[60] transition-transform duration-500 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <Link to="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 8V24L16 30L28 24V8L16 2Z" fill="#3b71ca" stroke="white" strokeWidth="1.5"/>
                <path d="M16 8L10 11V17L16 20L22 17V11L16 8Z" fill="white" opacity="0.9"/>
              </svg>
              <span className="font-heading font-bold text-white">OXFORD COLLEGE</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={28} className="text-white" />
            </button>
          </div>

          <ul className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <li
                key={link.path}
                className="transform transition-all duration-500"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Link
                  to={link.path}
                  className="text-white text-2xl font-display hover:text-brand-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="flex items-center gap-2 text-gray-text mb-4">
              <MapPin size={16} className="text-brand-blue" />
              <span className="text-sm">Nittambuwa, Colombo, Sri Lanka</span>
            </div>
            <a href="tel:+94779639969" className="flex items-center gap-2 text-white text-sm">
              <Phone size={16} className="text-brand-blue" />
              <span>+94 779639969</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
