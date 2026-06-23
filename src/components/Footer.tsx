import { Link } from 'react-router';
import { MapPin, Phone, Mail, Diamond, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Main Footer */}
      <div className="content-max-width px-4 md:px-5 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Our Campus */}
          <div>
            <h4 className="flex items-center gap-2 font-heading font-semibold text-lg mb-6">
              <Diamond size={16} className="text-brand-blue" />
              Our Campus
            </h4>
            <p className="text-gray-text text-sm leading-relaxed mb-6">
              Trouble that are bound to ensue equal blame belongs to those all fail their duty we like best every pleasure is to welcomed.
            </p>
            <div className="space-y-3">
              <Link to="#" className="flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors">
                <MapPin size={14} className="text-brand-blue" />
                Campus Map
              </Link>
              <Link to="#" className="flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors">
                <ArrowRight size={14} className="text-brand-blue" />
                Request for Consult
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="flex items-center gap-2 font-heading font-semibold text-lg mb-6">
              <Diamond size={16} className="text-brand-blue" />
              Useful Link
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Oxford College', path: '/about' },
                { name: 'Home', path: '/' },
                { name: 'Contact Oxford', path: '/contact' },
                { name: 'Programs', path: '/programs' },
                { name: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors"
                  >
                    <ArrowRight size={12} className="text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Life */}
          <div>
            <h4 className="flex items-center gap-2 font-heading font-semibold text-lg mb-6">
              <Diamond size={16} className="text-brand-blue" />
              Academic Life
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'My account', path: '/account' },
                { name: 'Cart', path: '/cart' },
                { name: 'Terms and Conditions', path: '/terms' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors"
                  >
                    <ArrowRight size={12} className="text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="flex items-center gap-2 font-heading font-semibold text-lg mb-6">
              <Diamond size={16} className="text-brand-blue" />
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-text">
                <MapPin size={16} className="text-brand-blue mt-0.5 flex-shrink-0" />
                Colombo, Sri Lanka
              </li>
              <li>
                <a href="tel:+94779639969" className="flex items-center gap-3 text-sm text-gray-text hover:text-white transition-colors">
                  <Phone size={16} className="text-brand-blue flex-shrink-0" />
                  +94 779639969
                </a>
              </li>
              <li>
                <a href="mailto:infor.oxfordcollege@gmail.com" className="flex items-center gap-3 text-sm text-gray-text hover:text-white transition-colors">
                  <Mail size={16} className="text-brand-blue flex-shrink-0" />
                  infor.oxfordcollege@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="content-max-width px-4 md:px-5 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-text">
              Copyright © 2023 Oxford College. All Rights Reserved. Developed By{' '}
              <a href="#" className="text-brand-blue hover:underline">Tritcal</a>
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-sm text-gray-text hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm text-gray-text hover:text-white transition-colors">Term of Use</Link>
              <Link to="#" className="text-sm text-gray-text hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
