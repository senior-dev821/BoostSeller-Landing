import Breadcrumb from "@/components/Common/Breadcrumb";
import TeamMembers from "@/components/OurTeam";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | BoostSeller",
  description: "This is Our Team page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Team"
        description=""
      />
      <TeamMembers />
      <Testimonials />
    </>
  );
};

export default AboutPage;
