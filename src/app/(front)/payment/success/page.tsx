import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Metadata } from "next";

const PaymentSuccess = dynamic(() => import("@/components/Payment/SuccessForm"), {
  ssr: false,
}); // disable SSR for client-only hook

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment Selection Page for BoostSeller",
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
};

export default SuccessPage;
