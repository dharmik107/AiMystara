import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  {
    id: 'lumina',
    title: 'Lumina Financial',
    category: 'Fintech',
    image: 'https://picsum.photos/1000/800?random=10',
    description: 'Redefining trust in the age of digital banking.'
  },
  {
    id: 'aether',
    title: 'Aether Mobility',
    category: 'Automotive',
    image: 'https://picsum.photos/1000/800?random=11',
    description: 'Electric autonomy visual language.'
  },
  {
    id: 'vertex',
    title: 'Vertex Labs',
    category: 'Biotech',
    image: 'https://picsum.photos/1000/800?random=12',
    description: 'Scientific precision meets human warmth.'
  },
  {
    id: 'mono',
    title: 'Mono Architecture',
    category: 'Real Estate',
    image: 'https://picsum.photos/1000/800?random=13',
    description: 'Minimalist branding for luxury spaces.'
  },
  {
    id: 'pulse',
    title: 'Pulse Energy',
    category: 'Clean Tech',
    image: 'https://picsum.photos/1000/800?random=14',
    description: 'Visualizing the flow of renewable power.'
  },
  {
    id: 'canvas',
    title: 'Canvas AI',
    category: 'SaaS',
    image: 'https://picsum.photos/1000/800?random=15',
    description: 'Interface design for generative tools.'
  }
];

const Work = () => {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-8">
            Selected Work.
          </h1>
          <p className="text-xl text-neutral-500 font-light mb-20 max-w-2xl">
            A curation of brands defined by clarity, purpose, and precision.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {portfolioItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl bg-neutral-100 aspect-[4/3] mb-6 relative">
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">{item.title}</h3>
                    <p className="text-neutral-500 font-light mt-1">{item.category}</p>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 text-sm">View Case</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;