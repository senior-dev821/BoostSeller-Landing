import Video from "@/components/Video";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works | BoostSeller",
  description: "This is project introduction page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="How It Works?"
        description=""
      />
      <Video />
    </>
  );
};

export default AboutPage;
