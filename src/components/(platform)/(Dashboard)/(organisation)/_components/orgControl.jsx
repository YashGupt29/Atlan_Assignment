// OrgControl.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { useOrganizationList } from "@clerk/clerk-react";

export const OrgControl = () => {
  const { id: organizationId } = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive || !organizationId) return;
    setActive({ organization: organizationId });
  }, [setActive, organizationId]);

  return null;
};
