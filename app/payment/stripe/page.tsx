import Breadcrumb from "@/components/Common/Breadcrumb";
import StripePage from "@/components/Payment/StripePaymentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment product Page for BoostSeller",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Payment with Stripe"
        description=""
      />
      <StripePage />
    </>
  );
};

export default AboutPage;
