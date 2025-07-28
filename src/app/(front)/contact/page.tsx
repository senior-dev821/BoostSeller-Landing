import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | BoostSeller",
  description: "This is Contact Page for BoostSeller Landinfg Page.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact"
        description=""
      />

      <Contact />
    </>
  );
};

export default ContactPage;
