'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi } from '@/services/api/endpoints';

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getTeamMembers();
      setTeam(res.team || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'critical';
      case 'ADMIN': return 'warning';
      case 'ANALYST': return 'success';
      case 'CONTENT_EDITOR': return 'default';
      default: return 'default';
    }
  };

  const getRoleDisplayName = (role: string) => {
    return role.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Team Members</h1>
          <p className="text-on-surface-variant mt-1">Manage dashboard access and team roles.</p>
        </div>
        <button className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Invite Member
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchTeam} />}

      <div className="glass-card rounded-xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">User</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Email</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Role</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Joined Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-6" /></td>
                  </tr>
                ))
              ) : team.length > 0 ? (
                team.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profile?.avatarUrl ? (
                          <img src={user.profile.avatarUrl} alt={user.userName} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm">
                            {user.userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-on-surface">{user.profile?.fullName || user.userName}</span>
                          <span className="text-xs text-on-surface-variant">@{user.userName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getRoleBadgeVariant(user.type)}>
                        {getRoleDisplayName(user.type)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.isVerified ? 'success' : 'warning'}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No team members found.
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
