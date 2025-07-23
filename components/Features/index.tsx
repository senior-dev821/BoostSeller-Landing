'use client';

import React, { useEffect, useState } from 'react';
import SectionTitle from '../Common/SectionTitle';
import SingleFeature from './SingleFeature';

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
};

const Features: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://cp.boostseller.ai/api/admin/contents/features'); // 🔁 update this to your real endpoint
        const data = await res.json();

        setTitle(data.title);
        setSubtitle(data.subtitle);
        setFeatures(data.features);
      } catch (err) {
        console.error('Failed to fetch features:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={title} paragraph={subtitle} center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {features.length > 0 ? (
            features
              .sort((a, b) => a.order - b.order)
              .map((feature) => (
                <SingleFeature key={feature.id} {...feature} />
              ))
          ) : (
            <p>No features available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
