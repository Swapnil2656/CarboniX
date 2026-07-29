'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '@/app/actions/settings-actions';
import { adminApi } from '@/services/api/endpoints';

const searchTargets = [
  // Existing Dashboard Features
  { label: 'Dashboard', keywords: ['dashboard', 'home', 'main', 'overview', 'compute', 'resources', 'infrastructure', 'servers', 'nodes', 'deployments'], path: '/admin/dashboard' },
  { label: 'Emissions', keywords: ['emissions', 'carbon', 'co2', 'footprint', 'energy', 'sustainability', 'intensity'], path: '/admin/emissions' },
  { label: 'Team Emissions', keywords: ['users', 'assets', 'team', 'people', 'customers', 'clients', 'accounts', 'mobile'], path: '/admin/users', requireAdmin: true },
  { label: 'API Keys', keywords: ['api', 'key', 'keys', 'tokens', 'integration', 'webhooks'], path: '/admin/api-keys' },
  { label: 'Settings', keywords: ['settings', 'config', 'preferences'], path: '/admin/settings' },
  { label: 'Audit History', keywords: ['history', 'audit', 'logs', 'activity', 'recent'], path: '/admin/history' },
  { label: 'Documentation', keywords: ['docs', 'documentation', 'guide', 'tutorial', 'reference', 'sdk'], path: '/docs' },

  // Deep / Hidden Features (Mobile-Style Search)
  { label: 'Developer Options', keywords: ['developer', 'options', 'dev', 'api', 'webhooks', 'integration', 'sdk'], path: '/admin/settings#developer' },
  { label: 'Account Security', keywords: ['security', 'password', 'authentication', 'login'], path: '/admin/settings#security' },
  { label: 'Notification Preferences', keywords: ['notifications', 'alerts', 'emails', 'push'], path: '/admin/settings#notifications' },
];

export const AdminHeader = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Team Emissions', path: '/admin/users', icon: 'group' },
    { label: 'API Keys', path: '/admin/api-keys', icon: 'key' },
  ];
  const [notifications, setNotifications] = useState<{ id: string; title: string; description: string; time: string; isRead: boolean; type: string; icon: string }[]>([]);
  const [historyLogs, setHistoryLogs] = useState<{ id: string; action: string; time: string; icon: string }[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [hasUnreadHistory, setHasUnreadHistory] = useState(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [notifRes, logsRes] = await Promise.all([
          adminApi.getNotifications().catch(() => null),
          adminApi.getAuditLogs().catch(() => null)
        ]);
        
        if (notifRes?.success) {
          if (notifRes.notifications.length > 0) {
            const latestId = notifRes.notifications[0].id;
            const storedId = localStorage.getItem('lastSeenNotificationId');
            if (latestId !== storedId) {
              setHasUnreadNotifications(true);
            }
          }
          const mappedNotifs = notifRes.notifications.map((n: { id: string; title: string; body: string; createdAt: string; type: string }) => ({
            id: n.id,
            title: n.title,
            description: n.body,
            time: new Date(n.createdAt).toLocaleString(),
            isRead: true, // We don't track admin read status yet
            type: n.type === 'THRESHOLD_ALERT' ? 'warning' : 'info',
            icon: n.type === 'THRESHOLD_ALERT' ? 'warning' : 'notifications'
          }));
          setNotifications(mappedNotifs);
        }
        
        if (logsRes?.success) {
          if (logsRes.logs.length > 0) {
            const latestId = logsRes.logs[0].id;
            const storedId = localStorage.getItem('lastSeenHistoryId');
            if (latestId !== storedId) {
              setHasUnreadHistory(true);
            }
          }
          const mappedLogs = logsRes.logs.map((l: { id: string; action: string; entityType: string; createdAt: string }) => ({
            id: l.id,
            action: `${l.action} ${l.entityType ? `on ${l.entityType}` : ''}`,
            time: new Date(l.createdAt).toLocaleString(),
            icon: 'history'
          }));
          setHistoryLogs(mappedLogs);
        }
      } catch (err) {
        console.error('Failed to fetch header data', err);
      }
    };
    fetchHeaderData();
    window.addEventListener('dataUpdated', fetchHeaderData);
    return () => window.removeEventListener('dataUpdated', fetchHeaderData);
  }, []);

  const toggleNotifications = () => {
    const newState = !isNotificationsOpen;
    setIsNotificationsOpen(newState);
    setIsHistoryOpen(false); // close other dropdown
    if (newState && notifications.length > 0) {
      setHasUnreadNotifications(false);
      localStorage.setItem('lastSeenNotificationId', notifications[0].id);
    }
  };

  const toggleHistory = () => {
    const newState = !isHistoryOpen;
    setIsHistoryOpen(newState);
    setIsNotificationsOpen(false); // close other dropdown
    if (newState && historyLogs.length > 0) {
      setHasUnreadHistory(false);
      localStorage.setItem('lastSeenHistoryId', historyLogs[0].id);
    }
  };

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = session?.user?.email || '';
  const isAdmin = session?.user?.type === 'SUPER_ADMIN' || session?.user?.type === 'ADMIN';

  useEffect(() => {
    const fetchProfile = () => {
      if (session?.user?.id) {
        getProfile().then(res => {
          if (res.success && res.profile?.avatarUrl) {
            setAvatarUrl(res.profile.avatarUrl);
          } else {
            setAvatarUrl('');
          }
        });
      }
    };

    fetchProfile();

    window.addEventListener('profileUpdated', fetchProfile);
    return () => window.removeEventListener('profileUpdated', fetchProfile);
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
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
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
    <>
    <header className="h-16 border-b border-outline-variant bg-surface-dim/90 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-6 lg:px-8 gap-4">
      {/* Left side: Logo & Navigation */}
      <div className="flex items-center gap-8">
        <Link href="/admin/dashboard" className="flex items-center gap-3 shrink-0">
          <Image src="/carbonix-logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
          <span className="font-display font-semibold text-xl tracking-tight text-amber-500 dark:text-primary whitespace-nowrap hidden sm:block">
            CarboniX
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-[rgba(245,197,24,0.1)] text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right side: Search & Profile */}
      <div className="flex items-center gap-4 flex-1 justify-end max-w-3xl">
        <div className="flex-1 max-w-md hidden lg:block" ref={searchRef}>
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
                  No results found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleNotifications}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#50FA7B] ring-2 ring-surface"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface border border-outline-variant shadow-lg py-1 z-50 overflow-hidden flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-semibold text-on-surface text-sm">Notifications</h3>
                {hasUnreadNotifications && (
                  <button 
                    onClick={() => {
                      setHasUnreadNotifications(false);
                      if (notifications.length > 0) localStorage.setItem('lastSeenNotificationId', notifications[0].id);
                    }}
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

        <div className="relative" ref={historyRef}>
          <button 
            onClick={toggleHistory}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            {hasUnreadHistory && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#50FA7B] ring-2 ring-surface"></span>
            )}
          </button>

          {isHistoryOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface border border-outline-variant shadow-lg py-1 z-50 overflow-hidden flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-semibold text-on-surface text-sm">Recent Activity</h3>
              </div>
              <div className="overflow-y-auto flex-1 custom-scrollbar" data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
                {historyLogs.length > 0 ? (
                  <ul className="divide-y divide-outline-variant/50">
                    {historyLogs.map((log) => (
                      <li key={log.id} className="p-4 hover:bg-surface-container transition-colors cursor-pointer">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-surface-container-high text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px]">{log.icon}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-on-surface">{log.action}</p>
                            <p className="text-[10px] font-medium text-outline mt-0.5">{log.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-[40px] mb-2 opacity-50">history</span>
                    <p className="text-sm text-on-surface-variant">No recent activity</p>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-outline-variant bg-surface-container-lowest">
                <button 
                  onClick={() => {
                    setIsHistoryOpen(false);
                    router.push('/admin/history');
                  }}
                  className="w-full py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors text-center"
                >
                  View full audit log
                </button>
              </div>
            </div>
          )}
        </div>
        
        </div>
      </div>
    </header>

    {/* Floating Actions (Top Right) */}
      <div className="fixed top-20 right-6 z-50 flex flex-col items-center gap-2 bg-surface border border-outline-variant rounded-full shadow-lg p-1.5 backdrop-blur/90">
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={toggleNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#50FA7B] ring-2 ring-surface"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface-container-highest border border-outline-variant shadow-2xl py-1 z-50 overflow-hidden flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-semibold text-on-surface text-sm">Notifications</h3>
                {hasUnreadNotifications && (
                  <button 
                    onClick={() => {
                      setHasUnreadNotifications(false);
                      if (notifications.length > 0) localStorage.setItem('lastSeenNotificationId', notifications[0].id);
                    }}
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
                      <li key={notification.id} className={`p-4 relative group hover:bg-surface-container transition-colors cursor-pointer ${!notification.isRead ? 'bg-primary-container/5' : ''}`}>
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
                        <button 
                          onClick={async (e) => {
                            e.stopPropagation();
                            await adminApi.deleteNotification(notification.id);
                            setNotifications(notifications.filter(n => n.id !== notification.id));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
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
                    router.push('/admin/notifications');
                  }}
                  className="w-full py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors text-center"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={historyRef}>
          <button 
            onClick={toggleHistory}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
            title="History"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            {hasUnreadHistory && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            )}
          </button>

          {isHistoryOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface-container-highest border border-outline-variant shadow-2xl py-1 z-50 overflow-hidden flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-semibold text-on-surface text-sm">Recent Activity</h3>
                {hasUnreadHistory && (
                  <button 
                    onClick={() => {
                      setHasUnreadHistory(false);
                      if (historyLogs.length > 0) localStorage.setItem('lastSeenHistoryId', historyLogs[0].id);
                    }}
                    className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-1 custom-scrollbar" data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
                {historyLogs.length > 0 ? (
                  <ul className="divide-y divide-outline-variant/50">
                    {historyLogs.map((log) => (
                      <li key={log.id} className="p-4 hover:bg-surface-container transition-colors">
                        <div className="flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant flex items-center justify-center flex-shrink-0 text-on-surface-variant mt-0.5">
                            <span className="material-symbols-outlined text-[16px]">{log.icon}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-on-surface leading-tight">
                              {log.action}
                            </p>
                            <p className="text-[10px] font-medium text-outline mt-1.5">{log.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-[40px] mb-2 opacity-50">history</span>
                    <p className="text-sm text-on-surface-variant">No recent activity</p>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-outline-variant bg-surface-container-lowest">
                <button 
                  onClick={() => {
                    setIsHistoryOpen(false);
                    router.push('/admin/history');
                  }}
                  className="w-full py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors text-center"
                >
                  View full audit log
                </button>
              </div>
            </div>
          )}
        </div>
        
        <Link 
          href="/admin/settings"
          title="Settings"
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </Link>
      </div>
    </>
  );
};
