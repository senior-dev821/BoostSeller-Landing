import SigninForm from "@/components/SignIn";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | BoostSeller",
  description: "This is Sign In Page for BoostSeller Introduction Website",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
     <SigninForm />
    </>
  );
};

export default SigninPage;
