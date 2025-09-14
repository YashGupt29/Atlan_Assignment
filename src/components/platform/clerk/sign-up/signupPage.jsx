// SignUpPage.jsx
import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <SignUp
      forceRedirectUrl="/organization"
      fallbackRedirectUrl="/organization"   
    />
  );
}
