import React, { useState } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { useData } from '../context/DataContext';
import { Check, Loader2 } from 'lucide-react';

const Careers = () => {
  const { jobs, submitApplication } = useData();
  const openJobs = jobs.filter(j => j.isOpen);

  const [formState, setFormState] = useState({
    applicantName: '',
    email: '',
    phone: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for UX
    setTimeout(() => {
      // Find job title for context
      const selectedJob = jobs.find(j => j.title === formState.role);
      
      submitApplication({
        jobId: selectedJob ? selectedJob.id : 'general',
        jobTitle: formState.role,
        applicantName: formState.applicantName,
        email: formState.email,
        phone: formState.phone,
        message: formState.message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ applicantName: '', email: '', phone: '', role: '', message: '' });
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-6">
              Build the Future.
            </h1>
            <p className="text-xl text-neutral-500 font-light">
              We're looking for obsessively curious minds to join us in redefining how brands are created.
            </p>
          </Reveal>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6 mb-32 max-w-4xl mx-auto">
          {openJobs.length === 0 ? (
             <div className="text-center py-20 bg-neutral-50 rounded-3xl">
                <p className="text-xl text-neutral-400">No current openings. Check back soon.</p>
             </div>
          ) : (
            openJobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 0.1}>
              <div className="bg-white border border-neutral-200 p-8 rounded-2xl hover:border-neutral-400 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center group">
                <div>
                  <h3 className="text-2xl font-medium text-neutral-900">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-neutral-500 mt-2 font-light">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <p className="text-neutral-500 mt-3 max-w-lg">{job.description}</p>
                </div>
                <button 
                  onClick={() => {
                     document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                     setFormState(prev => ({ ...prev, role: job.title }));
                  }}
                  className="mt-6 md:mt-0 px-6 py-3 rounded-full bg-neutral-100 text-neutral-900 font-medium text-sm transition-all group-hover:bg-neutral-900 group-hover:text-white"
                >
                  Apply Now
                </button>
              </div>
            </Reveal>
          )))}
        </div>

        {/* Application Form */}
        <div id="application-form" className="max-w-2xl mx-auto bg-neutral-50 p-8 md:p-12 rounded-3xl">
          <Reveal>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-2">Join the Team</h2>
            <p className="text-neutral-500 mb-10 font-light">Submit your application below. We read every single one.</p>
            
            {isSuccess ? (
               <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                   <Check size={32} />
                 </div>
                 <h3 className="text-2xl font-medium text-neutral-900 mb-2">Application Received</h3>
                 <p className="text-neutral-500">Thanks for your interest. We'll be in touch soon.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="applicantName"
                      value={formState.applicantName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Role Applying For</label>
                    <select 
                      required
                      name="role"
                      value={formState.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors appearance-none"
                    >
                      <option value="" disabled>Select a role</option>
                      {openJobs.map(job => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                      <option value="General Application">Other / General Application</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-neutral-700">Resume / Portfolio URL</label>
                   <input 
                      type="file"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                    />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Cover Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us why you're a good fit..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-0 outline-none transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-neutral-900 text-white font-medium py-4 rounded-xl hover:bg-neutral-800 transition-all active:scale-[0.99] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Submit Application'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Careers;
