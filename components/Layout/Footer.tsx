import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-lg font-semibold tracking-tight text-neutral-900">
              AiMystara
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
              Branding. Reinvented.<br />
              San Francisco • London • Tokyo
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/work" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Work</Link></li>
              <li><Link to="/services" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 mb-4">Connect</h4>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/mystara.ai/" className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61585069383508" className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="https://x.com/AiMystara" className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="https://www.linkedin.com/company/aimystara" className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=connectaimystara@gmail.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300" aria-label="Email">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-neutral-200 text-center md:text-left">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} AiMystara Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;