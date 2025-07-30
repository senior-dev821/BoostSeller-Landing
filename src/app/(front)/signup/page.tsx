import SignupForm from "@/components/SignUp";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up| BoostSeller",
  description: "This is Sign Up Page for BoostSeller.",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <SignupForm/>
    </>
  );
};

export default SignupPage;
