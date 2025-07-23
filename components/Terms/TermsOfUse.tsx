'use client';

import React, { useEffect, useState } from 'react';
import SectionTitle from '../Common/SectionTitle';

type LegalSection = {
  id: number;
  title: string;
  content: string;
  list?: string[];
  order: number;
};

const TermsPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [welcome, setWelcome] = useState('');
  const [sections, setSections] = useState<LegalSection[]>([]);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await fetch('https://cp.boostseller.ai/api/admin/contents/terms'); // Update this to your actual API endpoint
        const data = await res.json();
        setTitle(data.title);
        setWelcome(data.welcome);
        setSections(data.sections);
      } catch (err) {
        console.error('Failed to fetch legal policy:', err);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container max-w-5xl">
        <SectionTitle title={title} paragraph="" mb="80px" />

        <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-9 md:p-10 lg:p-9 xl:p-10">
          <p className="text-left text-lg font-medium italic dark:text-gray-200 text-gray-600">
            {welcome}
          </p>
				<span className="absolute left-0 top-0 z-[-1]">
					<svg
						width="132"
						height="109"
						viewBox="0 0 132 109"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.5"
							d="M33.0354 90.11C19.9851 102.723 -3.75916 101.834 -14 99.8125V-15H132C131.456 -12.4396 127.759 -2.95278 117.318 14.5117C104.268 36.3422 78.7114 31.8952 63.2141 41.1934C47.7169 50.4916 49.3482 74.3435 33.0354 90.11Z"
							fill="url(#paint0_linear_111:606)"
						/>
						<path
							opacity="0.5"
							d="M33.3654 85.0768C24.1476 98.7862 1.19876 106.079 -9.12343 108.011L-38.876 22.9988L100.816 -25.8905C100.959 -23.8126 99.8798 -15.5499 94.4164 0.87754C87.5871 21.4119 61.9822 26.677 49.5641 38.7512C37.146 50.8253 44.8877 67.9401 33.3654 85.0768Z"
							fill="url(#paint1_linear_111:606)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_111:606"
								x1="94.7523"
								y1="82.0246"
								x2="8.40951"
								y2="52.0609"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white" stopOpacity="0.06" />
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								/>
							</linearGradient>
							<linearGradient
								id="paint1_linear_111:606"
								x1="90.3206"
								y1="58.4236"
								x2="1.16149"
								y2="50.8365"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white" stopOpacity="0.06" />
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>
					</svg>
				</span>
				<span className="absolute bottom-0 right-0 z-[-1]">
					<svg
						width="53"
						height="30"
						viewBox="0 0 53 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							opacity="0.8"
							cx="37.5"
							cy="37.5"
							r="37.5"
							fill="#4A6CF7"
						/>
						<mask
							id="mask0_111:596"
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="75"
							height="75"
						>
							<circle
								opacity="0.8"
								cx="37.5"
								cy="37.5"
								r="37.5"
								fill="#4A6CF7"
							/>
						</mask>
						<g mask="url(#mask0_111:596)">
							<circle
								opacity="0.8"
								cx="37.5"
								cy="37.5"
								r="37.5"
								fill="url(#paint0_radial_111:596)"
							/>
							<g opacity="0.8" filter="url(#filter0_f_111:596)">
								<circle
									cx="40.8089"
									cy="19.853"
									r="15.4412"
									fill="white"
								/>
							</g>
						</g>
						<defs>
							<filter
								id="filter0_f_111:596"
								x="4.36768"
								y="-16.5881"
								width="72.8823"
								height="72.8823"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								/>
								<feGaussianBlur
									stdDeviation="10.5"
									result="effect1_foregroundBlur_111:596"
								/>
							</filter>
							<radialGradient
								id="paint0_radial_111:596"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(37.5 37.5) rotate(90) scale(40.2574)"
							>
								<stop stopOpacity="0.47" />
								<stop offset="1" stopOpacity="0" />
							</radialGradient>
						</defs>
					</svg>
				</span>
			</div>
			<div className="max-w-full mx-auto px-4 py-12">
				{sections.length > 0 &&
					sections
						.sort((a, b) => a.order - b.order)
						.map((section, index) => (
							<div key={section.id} className="mb-10" id={`section-${index}`}>
								<h2 className="text-4xl font-semibold text-dark dark:text-white mb-2">
									{index + 1}. {section.title}
								</h2>
								<p className="text-body-color dark:text-white leading-relaxed mb-4">
									{section.content}
								</p>
								{section.list && section.list.length > 0 && (
									<ul className="list-disc list-inside space-y-1 text-body-color dark:text-white">
										{section.list.map((item, i) => (
											<li key={i}>{item}</li>
										))}
									</ul>
								)}
							</div>
						))}
				</div>
		</div>
		<div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
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

export default TermsPage;