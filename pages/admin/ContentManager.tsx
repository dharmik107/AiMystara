import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';

const ContentManager = () => {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-semibold text-neutral-900">Site Content</h1>
           <p className="text-neutral-500 mt-1">Update key headlines and texts.</p>
        </div>
        {saved && <span className="text-green-600 text-sm font-medium animate-fade-in">Changes Saved!</span>}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Home Page</h3>
            <div>
               <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Title</label>
               <input 
                 value={formData.homeHeroTitle}
                 onChange={e => setFormData({...formData, homeHeroTitle: e.target.value})}
                 className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Subtitle</label>
               <textarea 
                 rows={3}
                 value={formData.homeHeroSubtitle}
                 onChange={e => setFormData({...formData, homeHeroSubtitle: e.target.value})}
                 className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
               />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Contact Page</h3>
             <div>
               <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Title</label>
               <input 
                 value={formData.contactHeroTitle}
                 onChange={e => setFormData({...formData, contactHeroTitle: e.target.value})}
                 className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Subtitle</label>
               <textarea 
                 rows={3}
                 value={formData.contactHeroSubtitle}
                 onChange={e => setFormData({...formData, contactHeroSubtitle: e.target.value})}
                 className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
               />
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="bg-neutral-900 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10">
               Update Content
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
