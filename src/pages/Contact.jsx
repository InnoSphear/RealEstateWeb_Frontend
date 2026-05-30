import { useState, useEffect } from 'react';
import { createInquiry } from '../api/inquiries';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', purpose: 'inquiry' });
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInquiry(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '', purpose: 'inquiry' });
    } catch { alert('Failed to send message. Please try again.'); }
  };

  return (
    <div className="pt-20 md:pt-24 bg-white">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">Contact<br />Shivam International</h1>
          <div className="w-16 h-[2px] bg-[#c8a85e] mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Begin your journey to finding the perfect property. Our luxury real estate experts are ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">Let's Talk</h2>
                <p className="text-sm text-gray-400">We'd love to hear from you</p>
              </div>
              <div className="space-y-8">
                {[
                  { label: 'Our Offices', value: 'Mumbai  |  Delhi  |  Bangalore\nIndia', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                  { label: 'Phone', value: '+91 98765 43210', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                  { label: 'Email', value: 'info@shivaminternational.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                  { label: 'Office Hours', value: 'Monday - Saturday\n9:00 AM - 7:00 PM', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">{info.label}</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-gray-50 border border-gray-100 p-12 md:p-16 text-center animate-scaleIn">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">Your message has been received. Our team will contact you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-primary px-8 py-3.5 bg-black text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-800 transition-all duration-300">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">Full Name *</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-3.5 border border-gray-200 text-sm focus:border-black transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-3.5 border border-gray-200 text-sm focus:border-black transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">Phone *</label>
                      <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-5 py-3.5 border border-gray-200 text-sm focus:border-black transition-colors" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">I'm Looking To</label>
                      <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full px-5 py-3.5 border border-gray-200 text-sm focus:border-black bg-white transition-colors">
                        <option value="inquiry">General Inquiry</option>
                        <option value="rent">Rent a Property</option>
                        <option value="sell">Buy a Property</option>
                        <option value="both">Rent & Buy</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-5 py-3.5 border border-gray-200 text-sm focus:border-black transition-colors resize-none" placeholder="Tell us about your requirements..." />
                  </div>
                  <button type="submit" className="btn-primary px-10 py-4 bg-black text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-800 transition-all duration-300">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
