import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProperties } from '../api/properties';
import { getTestimonials } from '../api/testimonials';
import PropertyCard from '../components/PropertyCard';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Counter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
    title: 'Where Luxury Meets Address',
    subtitle: 'Curating India\'s finest properties for the discerning few'
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    title: 'Your Legacy Begins Here',
    subtitle: 'Exclusive residences that define your story'
  },
  {
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
    title: 'Elevate Your Living Experience',
    subtitle: 'Where every detail speaks of unparalleled craftsmanship'
  },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const intervalRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    getProperties({ featured: 'true' }).then(r => r.data.success && setProperties(r.data.data)).catch(() => {});
    getProperties({}).then(r => r.data.success && setAllCount(r.data.count)).catch(() => {});
    getTestimonials({ active: 'true' }).then(r => r.data.success && setTestimonials(r.data.data)).catch(() => {});
  }, []);

  const startSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % heroSlides.length);
    }, 5000);
  }, []);

  useEffect(() => { startSlide(); return () => clearInterval(intervalRef.current); }, [startSlide]);

  useEffect(() => {
    const img = new Image();
    img.src = heroSlides[0].img;
    img.onload = () => setHeroLoaded(true);
  }, []);

  const goToSlide = (i) => {
    clearInterval(intervalRef.current);
    setSlideIndex(i);
    startSlide();
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-1000 ${i === slideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            <img src={slide.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-overlay" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className={`transition-all duration-1000 delay-200 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="inline-block text-[#c8a85e] text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-medium border border-[#c8a85e]/30 px-4 py-1.5">
                  Shivam International
                </span>
              </div>
              <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 transition-all duration-1000 delay-400 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {heroSlides[slideIndex].title.split('<br />').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h1>
              <p className={`text-gray-300 text-lg md:text-xl mb-12 leading-relaxed max-w-xl transition-all duration-1000 delay-600 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {heroSlides[slideIndex].subtitle}
              </p>
              <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-800 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to="/properties" className="btn-primary inline-flex px-8 md:px-10 py-3.5 md:py-4 bg-white text-black text-xs md:text-sm tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-all duration-300">
                  Explore Properties
                </Link>
                <Link to="/contact" className="btn-outline inline-flex px-8 md:px-10 py-3.5 md:py-4 border border-white text-white text-xs md:text-sm tracking-[0.15em] uppercase font-medium hover:bg-white/10 transition-all duration-300">
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className={`transition-all duration-500 ${i === slideIndex ? 'w-12 h-[3px] bg-white' : 'w-8 h-[3px] bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 animate-float">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[8px] tracking-[0.3em] uppercase">Scroll</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { end: allCount, suffix: '+', label: 'Properties Listed' },
              { end: allCount * 2, suffix: '+', label: 'Happy Clients' },
              { end: 15, suffix: '+', label: 'Cities Covered' },
              { end: 98, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center group scroll-reveal stagger-{i+1}">
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 tabular-nums">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="scroll-reveal">
              <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Curated Collection</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Featured Properties</h2>
            </div>
            <Link to="/properties" className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-gray-900 hover:text-[#c8a85e] transition-colors duration-300 scroll-reveal">
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.slice(0, 6).map((p, i) => (
                <PropertyCard key={p._id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-100 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="h-72 shimmer-bg" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 shimmer-bg w-3/4" />
                    <div className="h-4 shimmer-bg w-1/2" />
                    <div className="h-4 shimmer-bg w-2/3" />
                    <div className="h-5 shimmer-bg w-1/3 pt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20 scroll-reveal">
            <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Why Choose Us</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">The Shivam Advantage</h2>
            <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Premium Portfolio', desc: 'Handpicked luxury properties across India\'s most prestigious addresses. Every listing meets our rigorous standards.', icon: '✦', delay: 1 },
              { title: 'Expert Guidance', desc: 'Dedicated relationship managers with deep market expertise guide you through every step of your journey.', icon: '◆', delay: 2 },
              { title: 'White-Glove Service', desc: 'End-to-end support from private property tours to legal formalities. We handle everything.', icon: '♛', delay: 3 },
            ].map((item) => (
              <div key={item.title} className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 p-10 md:p-12 text-center scroll-reveal stagger-{item.delay}">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl mx-auto mb-8 group-hover:bg-[#c8a85e] transition-colors duration-500">{item.icon}</div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20 scroll-reveal">
            <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Explore By</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Property Categories</h2>
            <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { name: 'Flats', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', desc: 'Luxury Apartments', filter: 'flat' },
              { name: 'Villas', img: 'https://images.unsplash.com/photo-1600595950945-2d1a0ac2ebf8?w=600', desc: 'Premium Homes', filter: 'villa' },
              { name: 'Plots', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', desc: 'Prime Land', filter: 'plot' },
              { name: 'Penthouses', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600', desc: 'Sky Residences', filter: 'penthouse' },
              { name: 'Buildings', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', desc: 'Entire Properties', filter: 'building' },
              { name: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', desc: 'Workspaces', filter: 'commercial' },
              { name: 'Farmhouses', img: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600', desc: 'Country Retreats', filter: 'farmhouse' },
              { name: 'All', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', desc: 'Browse Everything', filter: '' },
            ].map((cat, i) => (
              <Link
                key={cat.name}
                to={`/properties${cat.filter ? `?category=${cat.filter}` : ''}`}
                className="group relative h-52 md:h-64 overflow-hidden scroll-reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={cat.img} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:text-[#c8a85e] transition-colors duration-300">{cat.name}</h3>
                  <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-300">{cat.desc}</p>
                </div>
                <div className="absolute top-5 right-5 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20 scroll-reveal">
              <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Testimonials</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">What Our Clients Say</h2>
              <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <div key={t._id} className="bg-white p-8 md:p-10 border border-gray-100 scroll-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="flex mb-5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className={`w-4 h-4 ${j < t.rating ? 'text-[#c8a85e]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 italic relative">
                    <span className="text-4xl text-[#c8a85e]/20 absolute -top-3 -left-2 font-serif">"</span>
                    <span className="relative z-10">{t.content}</span>
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-base font-medium">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-28 md:py-36 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-px h-32 bg-white/10" />
          <div className="absolute bottom-1/3 right-1/4 w-px h-20 bg-white/10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-reveal">
            <p className="text-[#c8a85e] text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-medium">Get Started</p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Begin Your<br />Luxury Journey
            </h2>
            <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mb-8" />
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Schedule a private consultation with our luxury property experts. Let us find the perfect home for you.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex px-10 md:px-14 py-4 md:py-5 bg-white text-black text-xs md:text-sm tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-all duration-300"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
