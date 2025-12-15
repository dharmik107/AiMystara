import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ServiceItem, JobOpening, JobApplication, ContactMessage, SiteContent } from '../types';

interface DataContextType {
  services: ServiceItem[];
  jobs: JobOpening[];
  applications: JobApplication[];
  messages: ContactMessage[];
  siteContent: SiteContent;
  loading: boolean;
  addService: (service: ServiceItem) => Promise<void>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addJob: (job: JobOpening) => Promise<void>;
  updateJob: (id: string, job: Partial<JobOpening>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  submitApplication: (app: any) => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<void>;
  submitContactMessage: (msg: any) => Promise<void>;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = '/api';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Site content remains local for now as per schema
  const [siteContent, setSiteContent] = useState<SiteContent>({
    homeHeroTitle: 'Branding. Reinvented.',
    homeHeroSubtitle: 'AI-powered brand creation for modern companies. Intelligence meets elegance.',
    contactHeroTitle: "Let's start a conversation.",
    contactHeroSubtitle: "We're here to help you build a brand that defines the future. Tell us about your vision."
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [servicesRes, jobsRes, appsRes, msgsRes] = await Promise.all([
        fetch(`${API_URL}/services`),
        fetch(`${API_URL}/jobs`),
        fetch(`${API_URL}/applications`),
        fetch(`${API_URL}/contact`)
      ]);

      const servicesData = await servicesRes.json();
      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();
      const msgsData = await msgsRes.json();

      // Transform DB data to matching types
      setServices(servicesData.map((s: any) => ({
        id: s.id.toString(),
        title: s.title,
        description: s.short_desc,
        detail: s.full_desc,
        isVisible: s.status === 'active'
      })));

      setJobs(jobsData.map((j: any) => ({
        id: j.id.toString(),
        title: j.title,
        location: j.location,
        type: j.type,
        department: j.department,
        description: j.description,
        isOpen: j.status === 'Open'
      })));

      // For admin views
      setApplications(appsData.map((a: any) => ({
        id: a.id.toString(),
        jobId: a.job_id,
        jobTitle: a.job_title,
        applicantName: a.name,
        email: a.email,
        phone: a.phone,
        message: a.message,
        status: 'New', // DB doesn't have status yet, default to New
        submittedAt: a.applied_at
      })));

      setMessages(msgsData.map((m: any) => ({
        id: m.id.toString(),
        name: m.name,
        email: m.email,
        projectDetails: m.message,
        status: 'New',
        submittedAt: m.submitted_at
      })));

    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions
  const addService = async (service: ServiceItem) => {
    await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: service.title,
        short_desc: service.description,
        full_desc: service.detail,
        status: service.isVisible ? 'active' : 'inactive'
      })
    });
    fetchData();
  };

  const updateService = async (id: string, service: Partial<ServiceItem>) => {
    const body: any = {};
    if (service.title) body.title = service.title;
    if (service.description) body.short_desc = service.description;
    if (service.detail) body.full_desc = service.detail;
    if (service.isVisible !== undefined) body.status = service.isVisible ? 'active' : 'inactive';

    await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    fetchData();
  };

  const deleteService = async (id: string) => {
    await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const addJob = async (job: JobOpening) => {
    await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        status: job.isOpen ? 'Open' : 'Closed'
      })
    });
    fetchData();
  };

  const updateJob = async (id: string, job: Partial<JobOpening>) => {
    const body: any = {};
    if (job.title) body.title = job.title;
    if (job.department) body.department = job.department;
    if (job.location) body.location = job.location;
    if (job.type) body.type = job.type;
    if (job.description) body.description = job.description;
    if (job.isOpen !== undefined) body.status = job.isOpen ? 'Open' : 'Closed';

    await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    fetchData();
  };

  const deleteJob = async (id: string) => {
    await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const submitApplication = async (app: any) => {
    await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_id: app.jobId,
        name: app.applicantName,
        email: app.email,
        phone: app.phone,
        message: app.message
      })
    });
    fetchData(); // In real app, maybe don't refetch all apps for a public user
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchData();
  };

  const submitContactMessage = async (msg: any) => {
    await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: msg.name,
        email: msg.email,
        subject: 'Contact Form',
        message: msg.projectDetails
      })
    });
  };

  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent({ ...siteContent, ...content });
  };

  return (
    <DataContext.Provider value={{
      services, jobs, applications, messages, siteContent, loading,
      addService, updateService, deleteService,
      addJob, updateJob, deleteJob,
      submitApplication, updateApplicationStatus,
      submitContactMessage, updateSiteContent
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
