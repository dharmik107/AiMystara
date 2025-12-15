import React, { useState } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Loader2, Send, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { siteContent, submitContactMessage } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+1',
    phone: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: `${formData.phoneCode} ${formData.phone}`,
        projectDetails: formData.details
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phoneCode: '+1', phone: '', details: '' });
    }, 1500);
  };

  return (
    <div className="w-full pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <Reveal>
            <div className="sticky top-40">
              <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-neutral-900 mb-8 leading-[1.05]" dangerouslySetInnerHTML={{ __html: siteContent.contactHeroTitle.replace(/\n/g, '<br/>') }} />
              <p className="text-xl md:text-2xl text-neutral-500 font-light mb-12 max-w-md leading-relaxed">
                {siteContent.contactHeroSubtitle}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-neutral-50 border border-neutral-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
              {submitted ? (
                 <div className="h-full flex flex-col items-center justify-center text-center min-h-[500px] animate-fade-in">
                    <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-neutral-900/20">
                      <Send size={24} />
                    </div>
                    <h3 className="text-2xl font-medium text-neutral-900 mb-4">Message Sent</h3>
                    <p className="text-neutral-500 text-lg font-light mb-8 max-w-xs mx-auto">We've received your inquiry and will get back to you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 transition-colors">Send another</button>
                 </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-900 ml-1">Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-neutral-900 focus:ring-0 outline-none transition-all placeholder-neutral-400 text-neutral-900 shadow-sm text-lg" 
                      placeholder="Jane Doe" 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-900 ml-1">Email</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-neutral-900 focus:ring-0 outline-none transition-all placeholder-neutral-400 text-neutral-900 shadow-sm text-lg" 
                      placeholder="jane@company.com" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-900 ml-1">Mobile Number</label>
                    <div className="flex gap-3">
                      <div className="relative">
                        <select 
                          value={formData.phoneCode}
                          onChange={e => setFormData({...formData, phoneCode: e.target.value})}
                          className="h-full bg-white border border-neutral-200 rounded-2xl pl-5 pr-12 py-4 focus:border-neutral-900 focus:ring-0 outline-none transition-all text-neutral-900 shadow-sm text-lg appearance-none cursor-pointer min-w-[140px]"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1-CA">🇨🇦 +1</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      </div>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-neutral-900 focus:ring-0 outline-none transition-all placeholder-neutral-400 text-neutral-900 shadow-sm text-lg" 
                        placeholder="555-0123" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-900 ml-1">Project Details</label>
                    <textarea 
                      required 
                      rows={6} 
                      value={formData.details}
                      onChange={e => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-neutral-900 focus:ring-0 outline-none transition-all placeholder-neutral-400 text-neutral-900 resize-none shadow-sm text-lg" 
                      placeholder="Tell us about your goals..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-neutral-900 text-white text-lg font-medium py-5 rounded-full hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-neutral-900/10"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
};

export default Contact;
