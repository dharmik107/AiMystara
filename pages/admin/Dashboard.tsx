import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Briefcase, Layers, Users, MessageSquare, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { services, jobs, applications, messages } = useData();

  const stats = [
    { label: 'Active Services', value: services.filter(s => s.isVisible).length, icon: Layers, color: 'bg-blue-50 text-blue-600' },
    { label: 'Open Positions', value: jobs.filter(j => j.isOpen).length, icon: Briefcase, color: 'bg-purple-50 text-purple-600' },
    { label: 'Applications', value: applications.length, icon: Users, color: 'bg-green-50 text-green-600' },
    { label: 'Messages', value: messages.length, icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Overview of your platform's activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-semibold text-neutral-900">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
            <h3 className="font-semibold text-neutral-900">Recent Applications</h3>
            <button onClick={() => navigate('/admin/applications')} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">View All</button>
          </div>
          <div className="p-0">
            {applications.length === 0 ? (
              <div className="p-8 text-center text-neutral-400 text-sm">No applications yet.</div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {applications.slice(0, 5).map(app => (
                  <div key={app.id} className="p-4 hover:bg-neutral-50 transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{app.applicantName}</p>
                      <p className="text-xs text-neutral-500">{app.jobTitle}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${app.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
            <h3 className="font-semibold text-neutral-900">Recent Messages</h3>
            <button onClick={() => navigate('/admin/messages')} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">View All</button>
          </div>
          <div className="p-0">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-neutral-400 text-sm">No messages yet.</div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {messages.slice(0, 5).map(msg => (
                  <div key={msg.id} className="p-4 hover:bg-neutral-50 transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{msg.name}</p>
                      <p className="text-xs text-neutral-500 truncate max-w-[200px]">{msg.email}</p>
                    </div>
                    <span className="text-xs text-neutral-400">{new Date(msg.submittedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
