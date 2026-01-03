'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LineChart, Leaf, DollarSign, ClipboardList } from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: LineChart,
  },
  {
    href: '/finance',
    label: 'Finance',
    icon: DollarSign,
  },
    {
    href: '/cost-tracking',
    label: 'Cost Tracking',
    icon: ClipboardList,
    },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Leaf className="size-8 text-primary" />
          <h1 className="text-xl font-semibold font-headline">Smart Crop Guardian</h1>
        </div>
      </SidebarHeader>

      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <Separator className="mb-2" />
        <p className="px-2 text-xs text-muted-foreground">
          Predict, Protect, Prosper
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
