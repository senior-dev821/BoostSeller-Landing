import Pricing from "@/components/Pricing";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | BoostSeller",
  description: "This is Pricing for BoostSeller Landing page",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pricing"
        description=""
      />
      <Pricing />
    </>
  );
};

export default AboutPage;
