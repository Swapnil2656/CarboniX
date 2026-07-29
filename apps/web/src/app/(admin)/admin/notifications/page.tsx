'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { adminApi } from '@/services/api/endpoints';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession();
  
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getNotifications();
      if (res.success) {
        setNotifications(res.notifications || []);
      } else {
        setError(res.error || 'Failed to fetch notifications');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      try {
        await adminApi.deleteNotification(id);
        fetchNotifications();
      } catch (e: any) {
        alert('Failed to delete: ' + e.message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-section-header text-on-surface">Notifications</h1>
          <p className="text-on-surface-variant mt-1">
            System alerts, updates, and messages.
          </p>
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Main Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-label-caps text-on-surface-variant">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Title & Message</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-64" /></td>
                    <td className="py-4 px-4"></td>
                  </tr>
                ))
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4 text-on-surface-variant whitespace-nowrap">
                      {new Date(notification.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={notification.type === 'THRESHOLD_ALERT' ? 'warning' : 'info'} className="text-[10px] uppercase font-mono">
                        {notification.type || 'INFO'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-on-surface">{notification.title}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{notification.body}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 text-outline hover:text-error hover:bg-error/10 rounded-full transition-colors"
                        title="Delete notification"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-on-surface-variant">
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
