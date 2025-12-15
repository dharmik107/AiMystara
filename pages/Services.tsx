import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import { useData } from '../context/DataContext';

const Services = () => {
  const { services } = useData();
  // Filter only visible services
  const visibleServices = services.filter(s => s.isVisible);

  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-20">
            Our Expertise.
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {visibleServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1}>
              <div className="group border-t border-neutral-200 pt-8 transition-colors hover:border-neutral-900">
                <h3 className="text-2xl font-medium text-neutral-900 mb-3">{service.title}</h3>
                <div className="space-y-1 mb-4">
                  {service.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <p key={i} className="text-lg text-neutral-500 font-light">{line}</p>
                  ))}
                </div>
                <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-96 group-hover:opacity-100">
                  <div className="space-y-1 max-w-md">
                    {service.detail.split('\n').filter(line => line.trim()).map((line, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <p className="text-neutral-400 text-sm leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
