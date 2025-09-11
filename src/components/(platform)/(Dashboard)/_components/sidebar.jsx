import React from "react";
import { Link } from "react-router-dom"; 
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { NavItem } from "./nav-item";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Sidebar = ({ storageKey = "t-sidebar-state" }) => {
  const [expanded, setExpanded] = useLocalStorage(storageKey, {});

  const { organization: activeOrganization, isLoaded: isLoadingOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadingOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue = Object.keys(expanded).reduce((acc, key) => {
    if (expanded[key]) acc.push(key);
    return acc;
  }, []);

  const onExpand = (id) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  // Show skeleton loader if organizations are still loading
  if (!isLoadingOrg || !isLoadingOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
          <Link to="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
