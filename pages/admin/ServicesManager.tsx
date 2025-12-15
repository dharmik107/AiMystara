import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, Eye, EyeOff, X } from 'lucide-react';
import { ServiceItem } from '../../types';

const ServicesManager = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    detail: '',
    isVisible: true
  });

  const handleEdit = (service: ServiceItem) => {
    setFormData(service);
    setEditingId(service.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
    }
  };

  const handleToggleVisibility = (service: ServiceItem) => {
    updateService(service.id, { isVisible: !service.isVisible });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateService(editingId, formData);
    } else {
      addService({
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title || 'Untitled',
        description: formData.description || '',
        detail: formData.detail || '',
        isVisible: true
      });
    }
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', detail: '' });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Services</h1>
          <p className="text-neutral-500 mt-1">Manage what you offer to clients.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', description: '', detail: '' });
            setIsModalOpen(true);
          }}
          className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Title</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Description</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-neutral-50 transition-colors group">
                <td className="py-4 px-6 text-sm font-medium text-neutral-900">{service.title}</td>
                <td className="py-4 px-6 text-sm text-neutral-500 max-w-xs truncate">{service.description}</td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleToggleVisibility(service)}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    service.isVisible ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {service.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button onClick={() => handleEdit(service)} className="text-neutral-400 hover:text-blue-600 transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(service.id)} className="text-neutral-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">{editingId ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Service Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Short Description</label>
                <input 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Detailed Content</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.detail}
                  onChange={e => setFormData({...formData, detail: e.target.value})}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ServicesManager;
