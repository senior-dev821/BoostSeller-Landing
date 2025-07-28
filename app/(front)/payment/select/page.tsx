import PaymentSelect from "@/components/Payment/PaymentSelect";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment Selection Page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <PaymentSelect />
    </>
  );
};

export default AboutPage;
