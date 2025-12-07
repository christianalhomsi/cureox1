'use client';

import { FileSearch, Sparkles, Terminal, CheckCircle2, MessageCircle, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslations } from 'next-intl';

const processIcons = [FileSearch, Sparkles, Terminal, CheckCircle2, MessageCircle, TrendingUp];

function ProcessCard({ step, index, isVisible }: {
  step: number;
  index: number;
  isVisible: boolean;
}) {
  const t = useTranslations('process');
  const IconComponent = processIcons[index];

  return (
    <div
      className={`
        relative flex-1 min-w-0
        group transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full bg-[var(--bg-secondary)] rounded-xl p-6 border border-theme shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <IconComponent className="w-7 h-7 text-[#01C4F0]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2 text-theme-primary">
            {t(`step${step}.title`)}
          </h3>
          <p className="text-theme-secondary text-sm leading-relaxed">
            {t(`step${step}.description`)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const t = useTranslations('process');

  return (
    <section ref={ref} id="process" className="py-20 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-theme-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Step Line Above Cards */}
          <div className="relative mb-8 hidden md:block">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0061A5] via-[#01C4F0] to-[#0061A5]"></div>
            {/* Step Indicators on Line */}
            <div className="relative flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((step, index) => (
                <div
                  key={step}
                  className={`
                    relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#0061A5] to-[#01C4F0] 
                    flex items-center justify-center text-white font-bold text-sm shadow-lg
                    border-4 border-[var(--bg-primary)]
                    transition-all duration-500
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                  `}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Process Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((step, index) => (
              <ProcessCard
                key={step}
                step={step}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
