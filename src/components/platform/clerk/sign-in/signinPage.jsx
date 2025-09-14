// SignInPage.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <SignIn
      forceRedirectUrl="/organization"
      fallbackRedirectUrl="/organization"  
    />
  );
}
