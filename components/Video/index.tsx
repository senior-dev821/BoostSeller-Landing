"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
// components/Video/index.tsx
type WorkingStep = {
  id: number;
  title: string;
  description: string;
  order: number;
};

type WorkingStepsSectionProps = {
  title: string;
  subtitle: string;
  videoUrl: string;
  steps: WorkingStep[];
};

// import ModalVideo from "react-modal-video";

const icons = [
  {
    icon: "/images/icons/icon1.png",
  },
  {
    icon: "/images/icons/icon2.png",
  },
  {
    icon: "/images/icons/icon3.png",
  },
  {
    icon: "/images/icons/icon4.png",
  },
];


const Video: React.FC<WorkingStepsSectionProps> = ({
  title,
  subtitle,
  videoUrl,
  steps,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Animate active step every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps?.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={title} paragraph={subtitle} center mb="80px" />

        {/* Steps */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{steps?.length ? (
          steps
						.sort((a, b) => a.order - b.order)
						.map((step, idx) => {
							const icon = icons[idx % icons.length].icon;
							return(
							<div
								key={idx}
								className={`rounded-xl border px-6 py-8 text-center shadow-md transition-all duration-700 ${
									activeStep === idx
										? "scale-105 border-primary bg-primary bg-opacity-10 text-primary"
										: "text-gray-600 dark:text-gray-300 dark:border-gray-600"
								}`}
							>
								<div className="mx-auto mb-4 h-14 w-14">
									<Image
										src={icon}
										alt={step.title}
										width={56}
										height={56}
										className="mx-auto"
									/>
								</div>
								<h4 className="mb-2 text-lg font-semibold">{step.title}</h4>
								<p className="text-sm">{step.description}</p>
							</div>
							);            
						})):(
							<p>No steps available</p>
						)}
        </div>

        {/* Video */}
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/46] items-center justify-center">
								{isOpen ? (
									// <iframe
									// 	width="100%"
									// 	height="100%"
									// 	src="https://www.youtube.com/embed/L61p2uyiMSo?autoplay=1&rel=0"
									// 	title="YouTube video player"
									// 	frameBorder="0"
									// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									// 	allowFullScreen
									// 	className="absolute top-0 left-0 h-full w-full"
									// ></iframe>
									<video
									src={videoUrl}
									controls
									autoPlay
									// muted
									className="absolute top-0 left-0 h-full w-full object-cover rounded-md"
									/>
								) : (
									<>
										<Image
											src="/images/video/video2.png"
											alt="video image"
											fill
											className="object-cover"
										/>
										<div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
											<button
												aria-label="video play button"
												onClick={() => setOpen(true)}
												className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
											>
												<svg
													width="16"
													height="18"
													viewBox="0 0 16 18"
													className="fill-current"
												>
													<path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
												</svg>
											</button>
										</div>
									</>
								)}
							</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
