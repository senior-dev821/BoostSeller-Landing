import { Metadata } from "next";
import { Suspense } from "react";
import PaymentSuccess from "@/components/Payment/SuccessForm";

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment Selection Page for BoostSeller",
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
