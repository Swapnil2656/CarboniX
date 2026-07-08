'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/app/actions/settings-actions';

const searchTargets = [
  // Primary Navigation
  { label: 'Dashboard', keywords: ['dashboard', 'home', 'main', 'overview', 'compute', 'resources', 'infrastructure', 'servers', 'nodes', 'deployments'], path: '/admin/dashboard' },
  { label: 'Emissions', keywords: ['emissions', 'carbon', 'co2', 'footprint', 'energy', 'sustainability', 'intensity'], path: '/admin/emissions' },
  { label: 'Users & Assets', keywords: ['users', 'assets', 'people', 'customers', 'clients', 'accounts', 'mobile'], path: '/admin/users', requireAdmin: true },
  { label: 'API Keys', keywords: ['api', 'key', 'keys', 'tokens', 'integration', 'webhooks'], path: '/admin/api-keys' },
  { label: 'Feature Flags', keywords: ['feature', 'flag', 'flags', 'toggles', 'experiments', 'beta'], path: '/admin/feature-flags' },
  { label: 'Settings', keywords: ['settings', 'config', 'preferences'], path: '/admin/settings' },
  { label: 'Support', keywords: ['support', 'help', 'contact', 'ticket', 'issue'], path: '/support' },
  { label: 'Documentation', keywords: ['docs', 'documentation', 'guide', 'tutorial', 'reference', 'sdk'], path: '/docs' },

  // Deep / Hidden Features (Mobile-Style Search)
  { label: 'Developer Options', keywords: ['developer', 'options', 'dev', 'api', 'webhooks', 'integration', 'sdk'], path: '/admin/settings#developer' },
  { label: 'Account Security (2FA)', keywords: ['security', 'password', '2fa', 'authentication', 'mfa', 'login'], path: '/admin/settings#security' },
  { label: 'Notification Preferences', keywords: ['notifications', 'alerts', 'emails', 'push'], path: '/admin/settings#notifications' },
  { label: 'Carbon Alert Thresholds', keywords: ['alerts', 'thresholds', 'limits', 'warning', 'cap'], path: '/admin/emissions#alerts' },
  { label: 'CI/CD Integrations', keywords: ['ci', 'cd', 'github actions', 'pipeline', 'deployment', 'automation'], path: '/docs/ci-cd' },
];

export const AdminHeader = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Carbon threshold warning', description: 'Server group US-East has exceeded the 500kg CO2 limit.', time: '10 min ago', isRead: false, type: 'warning', icon: 'warning' },
    { id: 2, title: 'Weekly report ready', description: 'Your emissions summary for last week is ready to view.', time: '2 hours ago', isRead: false, type: 'info', icon: 'bar_chart' },
    { id: 3, title: 'New team member', description: 'Jane Doe joined your workspace.', time: '1 day ago', isRead: true, type: 'success', icon: 'person_add' },
    { id: 4, title: 'API Key Expiring', description: 'Your production API key will expire in 3 days.', time: '1 day ago', isRead: true, type: 'warning', icon: 'key' },
    { id: 5, title: 'Optimization successful', description: 'Server sleep schedules applied, saving 45kg CO2.', time: '2 days ago', isRead: true, type: 'success', icon: 'eco' },
    { id: 6, title: 'System Maintenance', description: 'Scheduled maintenance for region EU-West starts at 02:00 UTC.', time: '2 days ago', isRead: true, type: 'info', icon: 'build' },
    { id: 7, title: 'Billing updated', description: 'Your subscription invoice is available.', time: '3 days ago', isRead: true, type: 'info', icon: 'receipt' },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = session?.user?.email || '';
  const isAdmin = session?.user?.type === 'SUPER_ADMIN' || session?.user?.type === 'ADMIN';

  useEffect(() => {
    if (session?.user?.id) {
      getProfile().then(res => {
        if (res.success && res.profile?.avatarUrl) {
          setAvatarUrl(res.profile.avatarUrl);
        }
      });
    }
  }, [session?.user?.id]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeQuery = searchQuery.toLowerCase().trim();
  const searchResults = activeQuery 
    ? searchTargets.filter(target => {
        if (target.requireAdmin && !isAdmin) return false;
        return target.keywords.some(kw => activeQuery.includes(kw) || kw.includes(activeQuery));
      })
    : [];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      router.push(searchResults[0].path);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="h-16 border-b border-outline-variant bg-surface-dim/80 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl" ref={searchRef}>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search resources, API keys, or settings..." 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
          />
          <div className="absolute right-3 flex items-center gap-1 text-[10px] font-label-caps text-outline font-medium pointer-events-none">
            <span className="px-1.5 py-0.5 rounded bg-surface border border-outline-variant">⌘</span>
            <span className="px-1.5 py-0.5 rounded bg-surface border border-outline-variant">K</span>
          </div>
          
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline-variant rounded-lg shadow-lg overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <ul className="py-1">
                  {searchResults.map((result, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => handleResultClick(result.path)}
                        className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between"
                      >
                        <span>{result.label}</span>
                        <span className="text-xs text-outline font-code">{result.path}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-on-surface-variant text-center">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface border border-outline-variant shadow-lg py-1 z-50 overflow-hidden flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-semibold text-on-surface text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
                    className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-1 custom-scrollbar" data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
                {notifications.length > 0 ? (
                  <ul className="divide-y divide-outline-variant/50">
                    {notifications.map((notification) => (
                      <li key={notification.id} className={`p-4 hover:bg-surface-container transition-colors cursor-pointer ${!notification.isRead ? 'bg-primary-container/5' : ''}`}>
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                            notification.type === 'success' ? 'bg-green-500/10 text-green-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            <span className="material-symbols-outlined text-[16px]">{notification.icon}</span>
                          </div>
                          <div>
                            <p className={`text-sm ${!notification.isRead ? 'font-semibold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{notification.description}</p>
                            <p className="text-[10px] font-medium text-outline mt-1.5">{notification.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-[40px] mb-2 opacity-50">notifications_off</span>
                    <p className="text-sm text-on-surface-variant">No notifications yet</p>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-outline-variant bg-surface-container-lowest">
                <button 
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    alert("Notifications page is coming soon!");
                  }}
                  className="w-full py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors text-center"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[20px]">history</span>
        </button>
        
        <div className="h-6 w-px bg-outline-variant mx-2"></div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-surface-container rounded-full py-1 pl-1 pr-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[rgba(245,197,24,0.15)] flex items-center justify-center text-primary border border-[rgba(245,197,24,0.3)] font-semibold text-sm overflow-hidden relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userInitial
              )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-on-surface leading-tight">{userName}</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] ml-1">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-surface border border-outline-variant shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-outline-variant/50">
                <p className="text-sm font-medium text-on-surface truncate">{userName}</p>
                <p className="text-xs text-outline truncate">{userEmail}</p>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
