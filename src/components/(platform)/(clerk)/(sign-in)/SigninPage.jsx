// SignInPage.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      forceRedirectUrl="/dashboard"      
      fallbackRedirectUrl="/dashboard"  
    />
  );
}
