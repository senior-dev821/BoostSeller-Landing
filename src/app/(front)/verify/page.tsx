import VerifyForm from "@/components/Verify/VerifyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify | BoostSeller",
  description: "This is Email Verify Page for BoostSeller",
  // other metadata
};

const VerifyPage = () => {
  return (
    <>
      <VerifyForm />
    </>
  );
};

export default VerifyPage;