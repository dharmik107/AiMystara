import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { JobOpening } from '../../types';

const JobsManager = () => {
  const { jobs, addJob, updateJob, deleteJob } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<JobOpening>>({
    title: '',
    location: '',
    type: 'Full-time',
    department: '',
    description: '',
    isOpen: true
  });

  const handleEdit = (job: JobOpening) => {
    setFormData(job);
    setEditingId(job.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this job opening?')) deleteJob(id);
  };

  const handleToggleStatus = (job: JobOpening) => {
    updateJob(job.id, { isOpen: !job.isOpen });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateJob(editingId, formData);
    } else {
      addJob({
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title || '',
        location: formData.location || '',
        type: formData.type || 'Full-time',
        department: formData.department || '',
        description: formData.description || '',
        isOpen: true
      });
    }
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', location: '', type: 'Full-time', department: '', description: '' });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Careers</h1>
          <p className="text-neutral-500 mt-1">Manage open positions and talent acquisition.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', location: '', type: 'Full-time', department: '', description: '' });
            setIsModalOpen(true);
          }}
          className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Post Job
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Position</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Department</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Location</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-neutral-900">{job.title}</td>
                <td className="py-4 px-6 text-sm text-neutral-500">{job.department}</td>
                <td className="py-4 px-6 text-sm text-neutral-500">{job.location}</td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleToggleStatus(job)}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    job.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {job.isOpen ? 'Open' : 'Closed'}
                  </button>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button onClick={() => handleEdit(job)} className="text-neutral-400 hover:text-blue-600 transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(job.id)} className="text-neutral-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">{editingId ? 'Edit Job' : 'New Job'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Job Title</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Department</label>
                    <input 
                      required
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                    />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                    <input 
                      required
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                    >
                       <option>Full-time</option>
                       <option>Contract</option>
                       <option>Part-time</option>
                    </select>
                 </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800">Save Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default JobsManager;
