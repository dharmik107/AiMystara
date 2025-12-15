import React from 'react';
import { Reveal } from '../components/ui/Reveal';

const About = () => {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro */}
        <div className="mb-32">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-12 leading-[1.1]">
              We design for the <br/> future of business.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl font-light text-neutral-600 leading-relaxed">
                  AiMystara was born from a simple observation: Branding has become too slow, too subjective, and too disconnected from data. We exist to bridge the gap between creative intuition and artificial intelligence.
                </p>
                <p className="text-xl md:text-2xl font-light text-neutral-600 leading-relaxed mt-8">
                  We are a collective of designers, engineers, and strategists who believe that the best brands of tomorrow will be built by humans and machines working in harmony.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Large Image */}
        <Reveal delay={0.4}>
          <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-200 rounded-2xl overflow-hidden mb-32">
            <img src="https://picsum.photos/1600/900?random=3" alt="Our Studio" className="w-full h-full object-cover" />
          </div>
        </Reveal>

        {/* Philosophy Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <Reveal delay={0.2}>
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Design & AI Philosophy</h3>
              <p className="text-lg text-neutral-500 leading-relaxed font-light">
                We treat AI not as a replacement for human creativity, but as an infinite canvas. It allows us to iterate faster, explore deeper, and validate our decisions with precision. However, the final touch—the soul of the brand—is always human. We believe in "human-in-the-loop" design, where technology amplifies intent.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">What We Believe In</h3>
              <ul className="space-y-4 text-lg text-neutral-500 font-light">
                <li className="border-b border-neutral-200 pb-4">Clarity over cleverness.</li>
                <li className="border-b border-neutral-200 pb-4">Systems over one-off solutions.</li>
                <li className="border-b border-neutral-200 pb-4">Speed without sacrificing quality.</li>
                <li className="border-b border-neutral-200 pb-4">Data-informed, not data-driven.</li>
              </ul>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
};

export default About;