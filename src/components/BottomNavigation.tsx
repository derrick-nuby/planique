"use client";

import { Home, FolderGit2, KanbanSquare, BarChart2, Users } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/repositories", label: "Repositories", icon: FolderGit2 },
  { href: "/projects", label: "Projects", icon: KanbanSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/users", label: "Users", icon: Users },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-gray-950 z-50">
      <ul className="flex justify-around py-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const classes = isActive ? "text-blue-600" : "text-gray-500";
          const size = idx === 2 ? 28 : 24;
          return (
            <li key={item.href} className="flex flex-col items-center">
              <Link href={item.href} className="flex flex-col items-center gap-1">
                <Icon
                  size={size}
                  className={`${classes} ${idx === 2 ? 'p-1 rounded-full bg-blue-50' : ''}`}
                />
                <span className={`text-xs ${classes}`}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
