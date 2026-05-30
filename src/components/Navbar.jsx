import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'For Sale', path: '/properties?purpose=sell' },
  { name: 'For Rent', path: '/properties?purpose=rent' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('?')) {
      const [p, q] = path.split('?');
      return location.pathname === p && location.search === `?${q}`;
    }
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || !isHome
        ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100/80'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
              scrolled || !isHome ? 'bg-black' : 'bg-white'
            }`}>
              <span className={`text-lg md:text-xl font-serif font-bold transition-colors duration-500 ${
                scrolled || !isHome ? 'text-white' : 'text-black'
              }`}>S</span>
            </div>
            <div>
              <span className={`font-serif text-lg md:text-xl font-bold tracking-wide transition-colors duration-500 ${
                scrolled || !isHome ? 'text-gray-900' : 'text-white'
              }`}>Shivam</span>
              <span className={`block text-[9px] md:text-[10px] tracking-[0.3em] uppercase -mt-1 transition-colors duration-500 ${
                scrolled || !isHome ? 'text-gray-400' : 'text-white/70'
              }`}>International</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-xs tracking-[0.15em] uppercase transition-all duration-300 group ${
                  isActive(link.path)
                    ? scrolled || !isHome ? 'text-black font-semibold' : 'text-white font-semibold'
                    : scrolled || !isHome ? 'text-gray-500 hover:text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#c8a85e] transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                scrolled || !isHome
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              Enquire Now
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 relative w-8 h-8 flex flex-col items-center justify-center gap-1.5">
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled || !isHome ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled || !isHome ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled || !isHome ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 animate-slideDown">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-sm tracking-wide uppercase py-3 transition-colors ${
                  isActive(link.path) ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-3.5 bg-black text-white text-sm tracking-wide uppercase mt-4"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
