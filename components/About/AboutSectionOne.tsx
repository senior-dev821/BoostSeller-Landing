// import Image from "next/image";
'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from "../Common/SectionTitle";
import PhoneCarousel from "../Common/PhoneCarousel";
const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const List = ({ text }: { text: string }) => (
  <p className="mb-5 flex items-center text-lg font-medium text-body-color">
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
      {checkIcon}
    </span>
    {text}
  </p>
);


const AboutSectionOne: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState<string[]>([]);
  const [listItems1, setListItems1] = useState<string[]>([]);
  const [listItems2, setListItems2] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://cp.boostseller.ai/api/admin/contents/about'); // change to your actual endpoint
        const data = await res.json();

        setTitle(data.sectionOne.title);
        setSubtitle(data.sectionOne.subtitle);
        setContent(data.sectionOne.content);        // e.g. ['Problems', 'Solutions']
        setListItems1(data.sectionOne.listItems1);  // array of strings
        setListItems2(data.sectionOne.listItems2);  // array of strings
      } catch (error) {
        console.error('Failed to load about section:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="problem-solution" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
							
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp mb-12 max-w-[670px] lg:mb-0"
                data-wow-delay=".15s"
              >
								<SectionTitle
									title= {title}
									paragraph={subtitle}
									mb="44px"
								/>
                <div className="mx-[-12px] flex flex-wrap">
									{/* Problems */}
									<div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
										<h4 className="mb-4 text-xl font-semibold text-primary">{content[0]}</h4>
										{listItems1.map((item, index) => (
											<List key={`problem-${index}`} text={item} /> 
										))}
									</div>

									{/* Solutions */}
									<div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
										<h4 className="mb-4 text-xl font-semibold text-primary">{content[1]}</h4>
										{listItems2.map((item, index) => (
											<List key={`solution-${index}`} text={item} /> 
										))}
									</div>
								</div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <PhoneCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
