import React from 'react';
import { PLANS } from '../constants';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';
import { PlanType, ViewState } from '../types';

interface PlansProps {
  onSelectPlan: (plan: PlanType) => void;
  setView: (view: ViewState) => void;
}

export const Plans: React.FC<PlansProps> = ({ onSelectPlan, setView }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black font-display mb-4">MEMBRESÍA</h2>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Escala tu estilo al siguiente nivel</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {PLANS.map((plan, idx) => (
          <div 
            key={idx}
            className={`flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
              plan.highlight 
                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-2xl scale-105 z-10' 
                : 'bg-white dark:bg-[#111] text-gray-900 dark:text-white border-gray-200 dark:border-white/10'
            }`}
          >
            <div className="mb-8 pb-8 border-b border-gray-100/10">
              <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-70">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold font-display">{plan.price}</span>
                <span className="text-sm opacity-60 font-medium">/ {plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className={`w-4 h-4 mt-0.5 ${plan.highlight ? 'text-[#38b6ff]' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium leading-relaxed opacity-90">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              fullWidth
              className={`rounded-lg h-12 ${
                  plan.highlight 
                    ? 'bg-[#38b6ff] hover:bg-[#2da0e5] text-white border-none' 
                    : 'bg-transparent border border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white'
              }`}
              onClick={() => onSelectPlan(plan.type)}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};