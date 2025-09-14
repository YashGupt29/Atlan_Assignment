// SignUpPage.jsx
import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      forceRedirectUrl="/organization"       
      fallbackRedirectUrl="/organization"   
    />
  );
}
