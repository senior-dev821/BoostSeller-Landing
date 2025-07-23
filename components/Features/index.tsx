import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
// import featuresData from "./featuresData";
import React from 'react';


type Feature = {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
};

type FeaturesProps = {
  title: string;
  subtitle: string;
  features: Feature[];
};
const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) =>  {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={title}
            paragraph={subtitle}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
						{features?.length ? (
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
    </>
  );
};

export default Features;
