import PolicyPage from "@/components/Terms/PrivacyPolicy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BoostSeller",
  description: "This is Privacy Policy Page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <PolicyPage />
    </>
  );
};

export default AboutPage;
