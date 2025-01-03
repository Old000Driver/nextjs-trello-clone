"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  organization: Organization;
  isExpanded: boolean;
  isActive: boolean;
  onExpand: (id: string) => void;
}
const NavItem = ({
  isExpanded,
  isActive,
  onExpand,
  organization,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      icon: <Layout className="w-4 h-4 mr-2" />,
      label: "Boards",
      href: `/organization/${organization.id}`,
    },
    {
      icon: <Activity className="w-4 h-4 mr-2" />,
      label: "Activity",
      href: `/organization/${organization.id}/activity`,
    },
    {
      icon: <Settings className="w-4 h-4 mr-2" />,
      label: "Settings",
      href: `/organization/${organization.id}/settings`,
    },
    {
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      label: "Billing",
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    // const isClicked = pathname === href;
    // if (isClicked) {
    //   return router.push(href);
    // }
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size={"sm"}
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant={"ghost"}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

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

export default NavItem;
