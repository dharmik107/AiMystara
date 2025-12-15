import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { useData } from '../context/DataContext';

const Home = () => {
  const { siteContent } = useData();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-neutral-900 leading-[1.1]" dangerouslySetInnerHTML={{ __html: siteContent.homeHeroTitle.replace(/\n/g, '<br/>') }} />
          </Reveal>
          
          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl mx-auto">
              {siteContent.homeHeroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="pt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95"
              >
                Build Your Brand
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Intelligence</h3>
                <p className="text-neutral-500 leading-relaxed text-lg font-light">
                  We leverage advanced AI models to analyze market trends and consumer behavior, ensuring your brand isn't just beautiful, but strategically sound.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Simplicity</h3>
                <p className="text-neutral-500 leading-relaxed text-lg font-light">
                  Complexity is easy. Simplicity is hard. We distill your brand's essence into its purest form, removing noise to amplify your signal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Precision</h3>
                <p className="text-neutral-500 leading-relaxed text-lg font-light">
                  Every pixel, every word, every interaction is calculated. We craft design systems that scale effortlessly across all platforms.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">Selected Work.</h2>
          </Reveal>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Project 1 */}
          <Reveal delay={0.2}>
            <div className="group cursor-pointer mb-24">
              <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-video md:aspect-[21/9] mb-8 relative">
                 <img src="https://picsum.photos/1600/900?random=1" alt="Project Alpha" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900">Lumina Financial</h3>
                  <p className="text-neutral-500 text-lg mt-1">Brand Identity & Digital Product</p>
                </div>
                <Link to="/work" className="text-neutral-900 font-medium border-b border-neutral-300 hover:border-neutral-900 transition-colors pb-1">View Case Study</Link>
              </div>
            </div>
          </Reveal>

          {/* Project 2 */}
          <Reveal delay={0.2}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-video md:aspect-[21/9] mb-8 relative">
                 <img src="https://picsum.photos/1600/900?random=2" alt="Project Beta" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900">Aether Mobility</h3>
                  <p className="text-neutral-500 text-lg mt-1">Strategy & Visual System</p>
                </div>
                <Link to="/work" className="text-neutral-900 font-medium border-b border-neutral-300 hover:border-neutral-900 transition-colors pb-1">View Case Study</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-neutral-900 text-white text-center px-6">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">Let’s build something remarkable.</h2>
          <Link
            to="/contact"
            className="inline-block bg-white text-neutral-900 px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95"
          >
            Start a Project
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
