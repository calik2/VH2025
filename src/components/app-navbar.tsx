"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { usePathname } from "next/navigation";
// ...existing imports...

export function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home/recommended", label: "Recommended" },
    { href: "/home/liked", label: "Liked" },
    { href: "/home/all", label: "All" },
  ];

  return (
    <div className="w-full flex justify-center mb-5">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.href
                      ? "bg-[#5A465A] text-white"
                      : ""
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}