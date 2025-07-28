import TermsPage from "@/components/Terms/TermsOfUse";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | BoostSeller",
  description: "This is terms of Use Page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <TermsPage />
    </>
  );
};

export default AboutPage;
