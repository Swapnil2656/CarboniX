'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { adminApi } from '@/services/api/endpoints';
import type { UsersResponse } from '@/types/admin';

export default function UsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterProject, setFilterProject] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE'>('ALL');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  // Invite Modal State
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Developer');
  const [inviteProject, setInviteProject] = useState('CarboniX Core');
  const [inviteLoading, setInviteLoading] = useState(false);
  
  // AI Suggestion Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState<{name: string, aiSuggestion: string | null} | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getUsers(page, pageSize);
      setData(res);
    } catch (err) {
      console.error(err);
      setError('Failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.action-menu-container')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const getRatingVariant = (co2: number) => {
    if (co2 < 50) return 'success';
    if (co2 < 150) return 'warning';
    if (co2 < 300) return 'error';
    return 'critical';
  };

  const filteredUsers = data?.users?.filter((user) => {
    if (filterProject !== 'All' && user.projectName !== filterProject) return false;
    if (statusFilter !== 'ALL' && user.status !== statusFilter) return false;
    
    if (filterRating !== 'All') {
      const rating = getRatingVariant(user.co2Emissions);
      if (filterRating === 'Low' && rating !== 'success') return false;
      if (filterRating === 'Medium' && rating !== 'warning') return false;
      if (filterRating === 'High' && rating !== 'error') return false;
      if (filterRating === 'Critical' && rating !== 'critical') return false;
    }
    return true;
  }) || [];
  
  const handleNotify = (userName: string) => {
    alert(`A notification has been sent to ${userName} regarding their carbon emissions.`);
  };

  const openAiSuggestion = (userName: string, aiSuggestion: string | null) => {
    setSelectedTeammate({ name: userName, aiSuggestion });
    setAiModalOpen(true);
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      setInviteLoading(true);
      const res = await adminApi.inviteUser({ name: inviteName, email: inviteEmail, role: inviteRole, projectName: inviteProject });
      if (res.success) {
        setInviteModalOpen(false);
        setInviteName('');
        setInviteEmail('');
        window.dispatchEvent(new Event('dataUpdated'));
        fetchData();
      }
    } catch (err: any) {
      alert('Failed to invite user: ' + err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRemoveUser = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        const res = await adminApi.removeUser(id);
        if (res.success) {
          window.dispatchEvent(new Event('dataUpdated'));
          fetchData();
        }
      } catch (err: any) {
        alert('Failed to remove user: ' + err.message);
      }
    }
  };

  

  const uniqueProjects = Array.from(new Set(data?.users?.map(u => u.projectName) || [])).filter(Boolean);
  if (uniqueProjects.length === 0) uniqueProjects.push('CarboniX Core');

  const projectEmissions = data?.insights?.projectEmissions || [];
  const highEmitter = data?.insights?.highEmitter || null;
  const devCount = data?.insights?.devCount || 0;
  const projCount = data?.insights?.projCount || 0;

  const currentUserList = filteredUsers.filter(u => u.role === 'USER' || u.role === 'ADMIN');
  const teamList = filteredUsers.filter(u => u.role !== 'USER' && u.role !== 'ADMIN');

  const renderTableRows = (usersList: typeof filteredUsers) => {
    if (loading) {
      return Array(3).fill(0).map((_, i) => (
        <tr key={i}>
          <td className="px-6 py-4"><Skeleton className="h-8 w-32" /></td>
          <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
          <td className="px-6 py-4"><Skeleton className="h-6 w-20" /></td>
          <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
          <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
          <td className="px-6 py-4"><Skeleton className="h-6 w-20" /></td>
        </tr>
      ));
    }

    if (usersList.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
            No records found.
          </td>
        </tr>
      );
    }

    return usersList.map((user) => (
      <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-on-surface">{user.name}</span>
            <span className="text-xs text-on-surface-variant">{user.role}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-on-surface">{user.projectName}</span>
            <span className="text-xs text-outline font-code">{user.projectId}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm text-on-surface">{user.location}</span>
        </td>
        <td className="px-6 py-4">
          <Badge variant={getRatingVariant(user.co2Emissions)}>
            {user.co2Emissions} kg
          </Badge>
        </td>
        <td className="px-6 py-4">
          <Badge variant={user.status === 'ACTIVE' ? 'success' : (user.status as any) === 'PENDING' ? 'info' : 'error'}>
            {user.status}
          </Badge>
        </td>
        <td className="px-6 py-4 text-right relative action-menu-container">
          <button 
            onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
            title="More actions"
          >
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>

          {openMenuId === user.id && (
            <div className="absolute right-12 top-10 bg-surface border border-outline-variant rounded-lg shadow-xl py-1 z-20 w-48 text-left">
              <button 
                onClick={() => { handleNotify(user.name); setOpenMenuId(null); }}
                className="w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">notifications_active</span>
                Notify Teammate
              </button>
              <button 
                onClick={() => { openAiSuggestion(user.name, user.aiSuggestion); setOpenMenuId(null); }}
                className="w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#50FA7B]">auto_awesome</span>
                AI Suggestion
              </button>
              <div className="h-px bg-outline-variant my-1" />
              <button 
                onClick={() => { handleRemoveUser(user.id, user.name); setOpenMenuId(null); }}
                className="w-full px-4 py-2 text-sm text-[#f87171] hover:bg-surface-container flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#f87171]">person_remove</span>
                Remove Teammate
              </button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-on-surface mb-1">Team Emissions</h1>
          <p className="text-sm text-on-surface-variant">Track carbon emissions produced by each teammate across shared projects.</p>
        </div>
        <button onClick={() => setInviteModalOpen(true)} className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Invite User
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchData} />}

      {/* Filter Bar & Summary */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between glass-card p-4 rounded-xl border border-outline-variant">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Project:</span>
            <select 
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>All</option>
              {uniqueProjects.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Rating:</span>
            <select 
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
          <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant">
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded shadow-sm text-sm font-medium transition-colors ${statusFilter === 'ALL' ? 'bg-surface text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-3 py-1 rounded shadow-sm text-sm font-medium transition-colors ${statusFilter === 'ACTIVE' ? 'bg-surface text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Active
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant">
          <div className="text-sm text-on-surface-variant">Fleet Avg:</div>
          <div className="text-lg font-semibold text-primary">{(data as any)?.fleetAvg || 0} kg/h</div>
          <div className="flex items-center text-xs font-medium text-[#50FA7B]">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            2.4%
          </div>
        </div>
      </div>

      {/* My Footprint Section */}
      <h2 className="text-lg font-display font-medium text-on-surface mt-2 mb-[-12px]">My Footprint</h2>
      <div className="glass-card rounded-xl border border-outline-variant relative">
        <div className="w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Teammate / Role</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Project</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Avg CO₂</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {renderTableRows(currentUserList)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Data Table */}
      <h2 className="text-lg font-display font-medium text-on-surface mt-2 mb-[-12px]">Team Developers</h2>
      <div className="glass-card rounded-xl border border-outline-variant relative">
        <div className="w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Teammate / Role</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Project</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Avg CO₂</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {renderTableRows(teamList)}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <Pagination 
          currentPage={page} 
          pageSize={pageSize} 
          totalItems={data?.total || 0} 
          onPageChange={setPage} 
        />
      </div>

      {/* Insights Section */}
      <h2 className="text-lg font-semibold text-on-surface mt-4">Team Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl border border-outline-variant">
          <h3 className="text-sm font-label-caps text-on-surface-variant mb-4">Emissions by Project</h3>
          <div className="flex flex-col gap-3">
            {projectEmissions.length > 0 ? (
              projectEmissions.map((pe, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface">{pe.name}</span>
                    <span className="text-outline">{pe.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full">
                    <div className={`h-full ${pe.color} rounded-full`} style={{width: `${pe.percent}%`}}></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">No emissions data available.</p>
            )}
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center">
          {highEmitter ? (
            <>
              <span className="material-symbols-outlined text-[32px] text-[#E8904A] mb-2">warning</span>
              <h3 className="text-lg font-semibold text-on-surface mb-1">High Emitter Detected</h3>
              <p className="text-sm text-on-surface-variant mb-3">
                {highEmitter.name} is consistently tracking {highEmitter.percentAbove}% above the team average.
              </p>
              <button className="text-sm text-primary hover:underline font-medium">View Details</button>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[32px] text-[#50FA7B] mb-2">check_circle</span>
              <h3 className="text-lg font-semibold text-on-surface mb-1">Emissions Optimal</h3>
              <p className="text-sm text-on-surface-variant mb-3">
                No high emitters detected. Everyone is within 10% of the fleet average!
              </p>
            </>
          )}
        </div>

        <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(80,250,123,0.1)] flex items-center justify-center text-[#50FA7B] border border-[#50FA7B]/30 mb-3">
            <span className="material-symbols-outlined text-[32px]">group</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-1">Team Collaboration</h3>
          <p className="text-sm text-on-surface-variant">
            CarboniX is tracking {devCount} developers across {projCount} shared projects.
          </p>
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {aiModalOpen && selectedTeammate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setAiModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(80,250,123,0.1)] flex items-center justify-center text-[#50FA7B] border border-[#50FA7B]/30">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-on-surface">Agentic AI Insights</h3>
                <p className="text-xs text-outline">for {selectedTeammate.name}</p>
              </div>
            </div>
            
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 mb-6">
              <p className="text-sm text-on-surface leading-relaxed">
                {selectedTeammate.aiSuggestion || "The AI is still analyzing this teammate's footprint patterns to generate a personalized recommendation."}
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setAiModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface border border-outline-variant hover:bg-surface-container transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert("Forwarded AI Suggestion to " + selectedTeammate.name);
                  setAiModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-on-primary bg-primary hover:bg-primary-hover transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                Forward to Teammate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant bg-surface-container-low">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-[24px]">person_add</span>
                <h3 className="text-xl font-semibold text-on-surface">Invite Teammate</h3>
              </div>
              <button 
                onClick={() => setInviteModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleInviteSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Name</label>
                <input 
                  type="text" 
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="jane.doe@example.com"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Role</label>
                <input 
                  type="text" 
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Project</label>
                <select 
                  value={inviteProject}
                  onChange={e => setInviteProject(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary"
                >
                  {uniqueProjects.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit"
                disabled={inviteLoading}
                className="mt-2 w-full bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 py-3 rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
              >
                {inviteLoading ? 'Sending...' : 'Send Invite Link'}
                {!inviteLoading && <span className="material-symbols-outlined text-[18px]">send</span>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
