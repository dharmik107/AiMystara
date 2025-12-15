import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Download, Mail } from 'lucide-react';

const ApplicationsManager = () => {
  const { applications, updateApplicationStatus } = useData();

  const handleStatusChange = (id: string, status: any) => {
    updateApplicationStatus(id, status);
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-neutral-900">Applications</h1>
        <p className="text-neutral-500 mt-1">Review and manage candidate submissions.</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {applications.length === 0 ? (
           <div className="p-12 text-center">
              <p className="text-neutral-400">No applications received yet.</p>
           </div>
        ) : (
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Candidate</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Applied</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Resume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium text-neutral-900 text-sm">{app.applicantName}</div>
                  <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5"><Mail size={10} /> {app.email}</div>
                </td>
                <td className="py-4 px-6 text-sm text-neutral-500">{app.jobTitle}</td>
                <td className="py-4 px-6 text-sm text-neutral-500">{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td className="py-4 px-6">
                  <select 
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer font-medium text-neutral-700"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApplicationsManager;
