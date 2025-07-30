import PaymentSuccess from "@/components/Payment/SuccessForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment Selection Page for BoostSeller",
  // other metadata
};

const SuccessPage = () => {
  return (
    <>
      <PaymentSuccess />
    </>
  );
};

export default SuccessPage;
