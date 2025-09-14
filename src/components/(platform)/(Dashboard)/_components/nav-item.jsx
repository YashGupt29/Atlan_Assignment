import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const NavItem = ({ isExpanded, isActive, organization, onExpand }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (href) => {
    navigate(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <img
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover w-7 h-7"
            />
          </div>
          <span className="font-medium text-sm no-underline">
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        <Button
          key={organization.id}
          size="sm"
          onClick={() => onClick(`/organization/${organization.id}`)}
          className={cn(
            "w-full font-normal justify-start pl-10 mb-1",
            location.pathname === `/organization/${organization.id}` && "bg-sky-500/10 text-sky-700"
          )}
          variant="ghost"
        >
          <Layout className="h-4 w-4 mr-2" />
          Boards
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};

// Skeleton loader
NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
