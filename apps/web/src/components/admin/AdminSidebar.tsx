'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isCollapsed, onToggle }: AdminSidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Emissions', path: '/admin/emissions', icon: 'co2' },
    { label: 'Team Emissions', path: '/admin/users', icon: 'group' },
    { label: 'API Keys', path: '/admin/api-keys', icon: 'key' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  const bottomItems = [
    { label: 'Support', path: '/support', icon: 'help' },
    { label: 'Documentation', path: '/docs', icon: 'description' },
  ];

  return (
    <aside 
      className={`h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col pt-6 pb-6 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`px-6 mb-8 flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}>
        <img src="/carbonix-logo.png" alt="CarboniX" className="w-8 h-8 object-contain shrink-0" />
        {!isCollapsed && (
          <span className="font-display font-semibold text-xl tracking-tight text-amber-500 dark:text-primary whitespace-nowrap overflow-hidden">
            CarboniX
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                isCollapsed ? 'justify-center px-0' : 'px-3'
              } ${
                isActive 
                  ? 'bg-[rgba(245,197,24,0.1)] text-primary border-l-2 border-primary' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
        {bottomItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            title={isCollapsed ? item.label : undefined}
            className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium text-sm ${
              isCollapsed ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
          </Link>
        ))}
        
        <button
          onClick={onToggle}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`mt-2 flex items-center gap-3 py-2.5 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium text-sm ${
            isCollapsed ? 'justify-center px-0' : 'px-3'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
