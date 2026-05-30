import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-xl font-serif font-bold">S</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-wide text-white">Shivam</span>
                  <span className="block text-[9px] tracking-[0.3em] text-gray-500 uppercase -mt-1">International</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Redefining luxury living. We curate India's finest properties for the discerning few — residences that define your legacy.
              </p>
              <div className="flex gap-3">
                {['★', '◆', '♛'].map((icon, i) => (
                  <span key={i} className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-[#c8a85e] hover:text-[#c8a85e] transition-all duration-300 cursor-pointer text-sm">
                    {icon}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#c8a85e] font-medium mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Properties', to: '/properties' },
                  { label: 'For Sale', to: '/properties?purpose=sell' },
                  { label: 'For Rent', to: '/properties?purpose=rent' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Contact', to: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#c8a85e] font-medium mb-6">Categories</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Luxury Flats', to: '/properties?category=flat' },
                  { label: 'Premium Villas', to: '/properties?category=villa' },
                  { label: 'Prime Plots', to: '/properties?category=plot' },
                  { label: 'Buildings', to: '/properties?category=building' },
                  { label: 'Penthouses', to: '/properties?category=penthouse' },
                  { label: 'Commercial', to: '/properties?category=commercial' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#c8a85e] font-medium mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-sm text-gray-400">
                  <span className="block text-white text-xs tracking-wider uppercase mb-1">Address</span>
                  Mumbai | Delhi | Bangalore
                </li>
                <li className="text-sm text-gray-400">
                  <span className="block text-white text-xs tracking-wider uppercase mb-1">Phone</span>
                  <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                </li>
                <li className="text-sm text-gray-400">
                  <span className="block text-white text-xs tracking-wider uppercase mb-1">Email</span>
                  <a href="mailto:info@shivaminternational.com" className="hover:text-white transition-colors">info@shivaminternational.com</a>
                </li>
                <li className="text-sm text-gray-400">
                  <span className="block text-white text-xs tracking-wider uppercase mb-1">Office Hours</span>
                  Mon - Sat: 9:00 AM - 7:00 PM
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 tracking-wide">
            &copy; {new Date().getFullYear()} Shivam International. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="text-[#c8a85e]">Luxury Redefined</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
