// components/About/AboutSectionTwo.tsx
import React from 'react';
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

type Content = {
  id: number;
  title: string;
  description: string;
};


type AboutSectionTwoProps = {
  title: string;
  subtitle: string;
  contents: Content[];
  imageUrl: string;
};
const AboutSectionTwo: React.FC<AboutSectionTwoProps> = ({
  title,
  subtitle,
  contents = [],
  imageUrl,
}) => {
  return (
    <section id="why-us" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Image  "/images/about/whyboostseller.png"*/}
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[28/24] max-w-[580px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/whyboostseller.png"
                alt="Why Choose BoostSeller"
                fill
                className=""
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[670px]" data-wow-delay=".2s">
								<SectionTitle
									title={title}
									paragraph={subtitle}
									mb="44px"
								/>
              {/* Benefits */}
							{contents.length > 0 && 
								contents.map((content) => (
									<div key={content.id} className="mb-9">
										<h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
											{content.title}
										</h3>
										<p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
											{content.description}
										</p>
									</div>
								)
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;

