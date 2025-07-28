import Features from "@/components/Features";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | BoostSeller",
  description: "This is Features Page for BoosSeller Landing Page",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Features"
        description="BoostSeller.ai packs smart lead routing, real-time analytics, and flexible controls into one seamless platform to help your sales team close more deals, faster."
      />
			<Features />
    </>
  );
};

export default AboutPage;
