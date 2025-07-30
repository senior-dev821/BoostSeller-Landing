import VerifyForm from "@/components/Verify/VerifyForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify | BoostSeller",
  description: "This is Email Verify Page for BoostSeller",
  // other metadata
};

const VerifyPage = () => {
  return (
    <>
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyForm />
		</Suspense>
    </>
  );
};

export default VerifyPage;