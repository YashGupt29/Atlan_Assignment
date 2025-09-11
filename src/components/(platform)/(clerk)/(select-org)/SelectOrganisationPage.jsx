import React from "react";
import { OrganizationList } from "@clerk/clerk-react";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
}
