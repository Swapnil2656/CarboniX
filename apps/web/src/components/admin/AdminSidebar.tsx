'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Emissions', path: '/admin/emissions', icon: 'co2' },
    { label: 'Users & Assets', path: '/admin/users', icon: 'group' },
    { label: 'API Keys', path: '/admin/api-keys', icon: 'key' },
    { label: 'Feature Flags', path: '/admin/feature-flags', icon: 'toggle_on' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  const bottomItems = [
    { label: 'Support', path: '/support', icon: 'help' },
    { label: 'Documentation', path: '/docs', icon: 'description' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col pt-6 pb-6">
      <div className="px-6 mb-8 flex items-center gap-3">
        <img src="/carbonix-logo.png" alt="CarboniX" className="w-8 h-8 object-contain" />
        <span className="font-display font-semibold text-xl tracking-tight text-on-surface">CarboniX</span>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                isActive 
                  ? 'bg-[rgba(245,197,24,0.1)] text-primary border-l-2 border-primary' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
        {bottomItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
