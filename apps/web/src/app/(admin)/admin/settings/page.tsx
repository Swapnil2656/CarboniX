'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { getProfile, updateProfile } from '@/app/actions/settings-actions';
import Image from 'next/image';
import { ImageCropModal } from '@/components/ui/ImageCropModal';

type Tab = 'profile' | 'security' | 'notifications' | 'developer';

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  
  // Crop modal state
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mocked settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [thresholdAlerts, setThresholdAlerts] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    // Load profile
    if (session?.user) {
      setEmail(session.user.email || '');
      getProfile().then(res => {
        if (res.success && res.profile) {
          setName(res.profile.fullName || session.user.name || '');
          setAvatarUrl(res.profile.avatarUrl || '');
        } else {
          setName(session.user.name || '');
        }
      });
    }

    // Handle deep linking based on hash
    const hash = window.location.hash.replace('#', '');
    if (['profile', 'security', 'notifications', 'developer'].includes(hash)) {
      setActiveTab(hash as Tab);
    }
  }, [session]);

  // Listen for hash changes so dropdown deep links work if already on page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['profile', 'security', 'notifications', 'developer'].includes(hash)) {
        setActiveTab(hash as Tab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setSaveMessage({ type: 'error', text: 'Image must be under 10MB' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setTempImageSrc(base64String);
      setShowCropModal(true);
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBase64: string) => {
    setAvatarUrl(croppedBase64);
    setShowCropModal(false);
    setTempImageSrc('');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });

    try {
      const res = await updateProfile({ name, avatarUrl });
      if (res.success) {
        setSaveMessage({ type: 'success', text: 'Profile saved successfully!' });
        // Attempt to update session to reflect new name only (avatar is fetched dynamically now)
        await updateSession({ name });
      } else {
        setSaveMessage({ type: 'error', text: res.error || 'Failed to save' });
      }
    } catch (err) {
      setSaveMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password update flow is mocked.');
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      <div className="mb-2">
        <h1 className="text-section-header text-on-surface">Settings</h1>
        <p className="text-on-surface-variant mt-1">Manage your account preferences and security.</p>
      </div>

      {showCropModal && (
        <ImageCropModal
          imageSrc={tempImageSrc}
          onClose={() => {
            setShowCropModal(false);
            setTempImageSrc('');
          }}
          onCropComplete={handleCropComplete}
        />
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {[
              { id: 'profile', label: 'Profile', icon: 'person' },
              { id: 'security', label: 'Security', icon: 'lock' },
              { id: 'notifications', label: 'Notifications', icon: 'notifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-primary-container/20 text-primary border border-primary/30'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 max-w-3xl glass-card rounded-xl p-8 border border-outline-variant">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold text-on-surface mb-6">Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {saveMessage.text && (
                  <div className={`p-3 rounded-lg text-sm border ${saveMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {saveMessage.text}
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-outline-variant overflow-hidden relative">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[40px]">person</span>
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/gif" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                    />
                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg text-sm transition-colors border border-outline-variant"
                      >
                        Upload Avatar
                      </button>
                      {avatarUrl && (
                        <button 
                          type="button" 
                          onClick={() => setAvatarUrl('')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors border border-red-500/20"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-2">JPG, GIF or PNG. Max size of 10MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={50}
                      pattern="^[A-Za-z\s\-']+$"
                      title="Name can only contain letters, spaces, hyphens, and apostrophes."
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      disabled
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface-variant opacity-70 cursor-not-allowed"
                    />
                    <p className="text-xs text-outline mt-1">Email address cannot be changed directly. Contact support if needed.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </section>
          )}


          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold text-on-surface mb-6">Security & Authentication</h2>
              
              <div className="space-y-8">
                {/* 2FA Section */}
                <div className="flex items-center justify-between pb-6 border-b border-outline-variant">
                  <div>
                    <h3 className="text-base font-medium text-on-surface mb-1">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-on-surface-variant">Add an extra layer of security to your account.</p>
                  </div>
                  <ToggleSwitch checked={twoFactorAuth} onChange={setTwoFactorAuth} />
                </div>

                {/* Password Section */}
                <div>
                  <h3 className="text-base font-medium text-on-surface mb-4">Update Password</h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <button type="submit" className="bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant transition-colors mt-2">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Active Sessions */}
                <div>
                  <h3 className="text-base font-medium text-on-surface mb-4">Active Sessions</h3>
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-surface-container rounded-lg">
                        <span className="material-symbols-outlined text-primary">laptop_mac</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-on-surface">Mac OS • Chrome</p>
                        <p className="text-xs text-on-surface-variant">Mumbai, India • Current Session</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-500/10 text-green-400 px-2 py-1 rounded">Active Now</span>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold text-on-surface mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-start justify-between pb-6 border-b border-outline-variant">
                  <div className="pr-8">
                    <h3 className="text-base font-medium text-on-surface mb-1">Email Alerts</h3>
                    <p className="text-sm text-on-surface-variant">Receive weekly summaries and important security updates via email.</p>
                  </div>
                  <div className="pt-1">
                    <ToggleSwitch checked={emailAlerts} onChange={setEmailAlerts} />
                  </div>
                </div>

                <div className="flex items-start justify-between pb-6 border-b border-outline-variant">
                  <div className="pr-8">
                    <h3 className="text-base font-medium text-on-surface mb-1">Mobile Push Notifications</h3>
                    <p className="text-sm text-on-surface-variant">Receive instant alerts on your connected CarboniX mobile app.</p>
                  </div>
                  <div className="pt-1">
                    <ToggleSwitch checked={pushAlerts} onChange={setPushAlerts} />
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="pr-8">
                    <h3 className="text-base font-medium text-on-surface mb-1 text-primary-container">Carbon Threshold Alerts</h3>
                    <p className="text-sm text-on-surface-variant">Get notified immediately when your infrastructure carbon emissions spike unexpectedly.</p>
                  </div>
                  <div className="pt-1">
                    <ToggleSwitch checked={thresholdAlerts} onChange={setThresholdAlerts} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* DEVELOPER OPTIONS TAB (HIDDEN FROM SIDEBAR) */}
          {activeTab === 'developer' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-[28px]">terminal</span>
                <h2 className="text-xl font-semibold text-on-surface">Developer Options</h2>
              </div>
              
              <div className="p-4 rounded-lg bg-primary-container/10 border border-primary/20 mb-8">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  You have discovered the hidden developer options! These settings are intended for power users and developers. Proceed with caution.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-outline-variant hover:border-outline transition-colors group">
                  <div>
                    <h3 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Enable API Access</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Allow programmatic access via API tokens.</p>
                  </div>
                  <ToggleSwitch checked={true} onChange={() => {}} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-outline-variant hover:border-outline transition-colors group">
                  <div>
                    <h3 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Webhooks (Beta)</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Send event payloads to external URLs.</p>
                  </div>
                  <ToggleSwitch checked={false} onChange={() => {}} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-outline-variant hover:border-outline transition-colors group">
                  <div>
                    <h3 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Verbose Logging</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Output detailed debug information to console.</p>
                  </div>
                  <ToggleSwitch checked={false} onChange={() => {}} />
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
