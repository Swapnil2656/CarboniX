'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { getHistoryLogs } from '@/app/actions/history-actions';
import { adminApi } from '@/services/api/endpoints';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession();
  const isAdmin = session?.user?.type === 'SUPER_ADMIN' || session?.user?.type === 'ADMIN';
  
  // Pagination & Search
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const pageSize = 15;

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHistoryLogs(page, pageSize, debouncedSearch);
      if (res.success) {
        setLogs(res.logs || []);
        setTotalItems(res.total || 0);
      } else {
        setError(res.error || 'Failed to fetch audit logs');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-section-header text-on-surface">Audit Logs</h1>
          <p className="text-on-surface-variant mt-1">
            History of your recent actions and configuration changes.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative max-w-sm w-full">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search email, action, or resource..."
            className="bg-surface-container border border-outline-variant rounded-lg pl-10 pr-4 py-2 w-full text-sm text-on-surface outline-none focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Main Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-label-caps text-on-surface-variant">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-40" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="py-4 px-4"></td>
                  </tr>
                ))
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4 text-on-surface-variant whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-on-surface">{log.actorEmail}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{log.actorRole}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="info" className="text-[10px] uppercase font-mono">{log.action}</Badge>
                    </td>
                    <td className="py-4 px-4 text-on-surface">
                      {log.resource}
                      {log.resourceId && <span className="text-on-surface-variant ml-1 font-mono text-xs">({log.resourceId})</span>}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-on-surface-variant font-mono truncate max-w-[200px]" title={log.ip}>IP: {log.ip}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this log?')) {
                            await adminApi.deleteAuditLog(log.id);
                            fetchLogs();
                          }
                        }}
                        className="p-2 text-outline hover:text-error hover:bg-error/10 rounded-full transition-colors"
                        title="Delete log"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                    No audit logs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {!loading && logs.length > 0 && (
          <Pagination 
            currentPage={page} 
            pageSize={pageSize} 
            totalItems={totalItems} 
            onPageChange={setPage} 
          />
        )}
      </div>
    </div>
  );
}
