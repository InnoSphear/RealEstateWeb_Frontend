import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <div className="pt-20 md:pt-24 bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-20 w-72 h-72 border border-black rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-black rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-4 font-medium">About Us</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">Redefining Luxury<br />Real Estate</h1>
          <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            At Shivam International, we don't just list properties — we curate lifestyles. With decades of expertise, we connect discerning clients with India's most exclusive addresses.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" alt="Luxury Building" className="w-full h-[400px] md:h-[500px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-black p-6 md:p-8 hidden md:block">
                <p className="font-serif text-4xl font-bold text-white">15+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Years of Excellence</p>
              </div>
            </div>
            <div>
              <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">A Legacy of<br />Excellence</h2>
              <div className="space-y-5 text-sm md:text-base text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to transform India's real estate landscape, Shivam International has grown to become a trusted name in luxury properties. Our journey began with a simple belief: everyone deserves a home that reflects their aspirations.
                </p>
                <p>
                  Today, we represent over 500+ premium properties across 15+ cities, serving a discerning clientele of entrepreneurs, celebrities, and global investors.
                </p>
                <p>
                  Our team of dedicated professionals brings together deep market knowledge, an unparalleled network, and a commitment to white-glove service that sets us apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Our Values</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">What Drives Us</h2>
            <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Trust', desc: 'Built through transparent dealings and lasting relationships with our clients.', icon: '🤝' },
              { title: 'Excellence', desc: 'Every property we represent meets the highest standards of quality and luxury.', icon: '✦' },
              { title: 'Innovation', desc: 'Leveraging technology to provide seamless property discovery and management.', icon: '◆' },
            ].map((v) => (
              <div key={v.title} className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 p-10 md:p-12 text-center">
                <p className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{v.icon}</p>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-4">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Numbers */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '500+', label: 'Properties Sold' },
              { number: '15+', label: 'Cities' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Awards' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/5 rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-6 font-medium">Let's Connect</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Find Your<br />Dream Property
          </h2>
          <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mb-8" />
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Whether you're looking for a luxury home, prime investment, or commercial space — we're here to help.
          </p>
          <Link to="/contact" className="btn-primary inline-flex px-10 md:px-14 py-4 md:py-5 bg-white text-black text-xs md:text-sm tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-all duration-300">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
