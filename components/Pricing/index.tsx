'use client';

import React, { useEffect, useState } from 'react';
import SectionTitle from '../Common/SectionTitle';
import PricingBox from './PricingBox';

type PlanFeature = {
  id: number;
  text: string;
  active: boolean;
};

type PricingPlan = {
  id: number;
  tag: string;
  description: string;
  duration: string;
  price: number;
  ctaText: string;
  ctaUrl: string;
  features: PlanFeature[];
  order: number;
};

const Pricing: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch('https://cp.boostseller.ai/api/admin/contents/pricing'); // Update with your actual API
        const data = await res.json();

        setTitle(data.title);
        setSubtitle(data.subtitle);
        setPlans(data.plans);
      } catch (err) {
        console.error('Failed to fetch pricing plans:', err);
      }
    };

    fetchPricing();
  }, []);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={title} paragraph={subtitle} center width="665px" />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {plans.length ? (
            plans
              .sort((a, b) => a.order - b.order)
              .map((plan) => <PricingBox key={plan.id} {...plan} />)
          ) : (
            <p className="text-center text-gray-500">No plans available</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
