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

export const metadata: Metadata = {
  title: "BoostSeller",
  description: "This is Home for Boost Seller",
  // other metadata
};

export default function Home() {
	  return (
    <>
      <ScrollUp />
      <Hero />
			<section id="features">
				<Features/>
			</section>
			<section id="howitworks">
				<Video />
			</section>
			<section id="about">
				<AboutSectionOne />
				<AboutSectionTwo />
			</section>
			<section id="ourteam">
				<TeamMembers  />
				<Testimonials />
			</section>
			<section id="pricing">
				<Pricing />
			</section>
			{/* <section id="signup">
				<SignUp />
			</section> */}
    </>
  );
}
