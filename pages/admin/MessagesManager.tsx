import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Mail, Calendar } from 'lucide-react';

const MessagesManager = () => {
    const { messages } = useData();

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-neutral-900">Messages</h1>
                <p className="text-neutral-500 mt-1">Review inquiries from the contact form.</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-neutral-400">No messages received yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Name</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider w-1/2">Message</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {messages.map((msg) => (
                                <tr key={msg.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-neutral-900 text-sm">{msg.name}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-neutral-600">{msg.email}</div>
                                        {msg.phone && <div className="text-xs text-neutral-400 mt-0.5">{msg.phone}</div>}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-neutral-600 line-clamp-2">{msg.message}</div>
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm text-neutral-500">
                                        <div className="flex items-center justify-end gap-1">
                                            <Calendar size={12} />
                                            {new Date(msg.submittedAt).toLocaleDateString()}
                                        </div>
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

export default MessagesManager;
