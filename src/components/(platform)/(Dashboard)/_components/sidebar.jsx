import React from "react";
import { Link } from "react-router-dom"; 
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { NavItem } from "./nav-item";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner"; 
export const Sidebar = ({ storageKey = "t-sidebar-state" }) => {
  const [expanded, setExpanded] = useLocalStorage(storageKey, {});

  const { organization: activeOrganization, isLoaded: isLoadingOrg } = useOrganization();
  const { userMemberships, isLoaded: isLoadingOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
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

  if (!isLoadingOrg || !isLoadingOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  const firstOrg = userMemberships.data[0]?.organization;

  const handleCreateClick = (e) => {
    e.preventDefault();
    if (firstOrg) {
      toast.error("Only one organization is allowed in this demo");
      return;
    }
    // Navigate if no org exists
    window.location.href = "/select-org";
  };

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspace</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
          onClick={handleCreateClick}
        >
          <Link to="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {firstOrg && (
        <Accordion type="single" defaultValue={defaultAccordionValue} className="space-y-2">
          <NavItem
            key={firstOrg.id}
            isActive={activeOrganization?.id === firstOrg.id}
            isExpanded={expanded[firstOrg.id]}
            organization={firstOrg}
            onExpand={onExpand}
          />
        </Accordion>
      )}
    </>
  );
};

