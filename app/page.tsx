"use client";

import { useEffect, useState } from 'react';
import Spinner from '@/components/Common/Spinner';
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import TeamMembers from "@/components/OurTeam";
import Video from "@/components/Video";
import { Metadata } from "next";
// import SignUp from "@/components/SignUp";

// export const metadata: Metadata = {
//   title: "BoostSeller",
//   description: "This is Home for Boost Seller",
//   // other metadata
// };

export default function Home() {
	const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>(null);

	const fetchData = async () => {
		try {
			const res = await fetch('https://cp.boostseller.ai/api/admin/contents', {
				method: 'GET',
				credentials: 'include',  // <-- important for cookie/session-based auth
				headers: {
					'Accept': 'application/json',
				}
			});
			const data = await res.json();
			console.log(data);
			setContent(data);
		} catch (error) {
			console.error('Failed to fetch content:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
    fetchData();
  }, []);

  // if (loading || !content) {
  //   return <Spinner />;
  // }


  return (
    <>
      <ScrollUp />
      <Hero {...content?.hero}/>
			<section id="features">
				<Features {...content?.features}/>
			</section>
			<section id="howitworks">
				<Video {...content?.video}/>
			</section>
			<section id="about">
				<AboutSectionOne {...content?.aboutOne}/>
				<AboutSectionTwo {...content?.aboutTwo}/>
			</section>
			<section id="ourteam">
				<TeamMembers {...content?.team} />
				<Testimonials {...content?.testimonials}/>
			</section>
			<section id="pricing">
				<Pricing {...content?.pricing}/>
			</section>
			{/* <section id="signup">
				<SignUp />
			</section> */}
    </>
  );
}
