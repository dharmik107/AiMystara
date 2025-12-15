export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  isVisible: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  department: string;
  isOpen: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl?: string; // Mocked for now
  message: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectDetails: string;
  status: 'New' | 'Read' | 'Replied';
  submittedAt: string;
}

export interface SiteContent {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  contactHeroTitle: string;
  contactHeroSubtitle: string;
}
