'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { UserProfile, FitnessProfile } from '@/lib/types';
import { Shield, Download, Trash2, Key, Check, User, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fitness, setFitness] = useState<FitnessProfile | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);

  useEffect(() => {
    const p = StorageService.getProfile();
    const f = StorageService.getFitness();
    setProfile(p);
    setFitness(f);
    setApiKey(p.gemini_api_key || '');
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.updateProfile({ gemini_api_key: apiKey.trim() });
    setProfile(updated);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handleRetakeOnboarding = () => {
    StorageService.updateProfile({ has_completed_onboarding: false });
    window.location.href = '/';
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wellness_sanctuary_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset your local database and profile?')) {
      StorageService.clearAllData();
      setResetDone(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="SETTINGS & PROFILE" subtitle="Personal Profile, AI Key & Data Sovereignty" />

      <div className="px-5 py-5 space-y-4 max-w-lg mx-auto">
        {/* User Identity Card */}
        <div className="bg-[#E7D8C3] rounded-3xl p-5 border border-[#C6B7A2]/40 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#531B24] text-[#F3ECE2] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#531B24]">
                {profile?.preferred_name || profile?.full_name || 'Sanctuary User'}
              </h3>
              <span className="text-[11px] text-[#6A2931]">
                {fitness?.current_weight_kg || 63} kg • Target: {fitness?.target_weight_kg || 58} kg
              </span>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40 text-xs text-[#531B24]/90 space-y-1">
            <span className="font-bold text-[#6A2931] block text-[10px] uppercase">
              Current Recorded Limitation:
            </span>
            <p>{fitness?.injuries_and_limitations?.join(', ') || 'None recorded'}</p>
          </div>

          <button
            onClick={handleRetakeOnboarding}
            className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold py-2.5 rounded-2xl transition-all flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Update Personal Details / Re-Consult</span>
          </button>
        </div>

        {/* Gemini API Key Box */}
        <div className="bg-[#FAF5EE] rounded-3xl p-5 border border-[#C6B7A2]/40 shadow-sm space-y-3 text-xs">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-[#6A2931]" />
            <h3 className="font-serif font-bold text-sm text-[#531B24]">
              Google Gemini AI Key (Optional)
            </h3>
          </div>

          <p className="text-[#531B24]/80 leading-relaxed">
            The coach works automatically with offline adaptive intelligence. To unlock live frontier streaming with Gemini 1.5 Flash, paste your free key below:
          </p>

          <form onSubmit={handleSaveKey} className="space-y-2.5">
            <input
              type="password"
              placeholder="Paste AI Studio Key (AIzaSy...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-xs text-[#531B24] font-mono focus:outline-none"
            />
            <div className="flex items-center justify-between text-[11px]">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#6A2931] underline"
              >
                Get free key from Google AI Studio &rarr;
              </a>
              <button
                type="submit"
                className="bg-[#531B24] text-[#F3ECE2] font-semibold px-4 py-1.5 rounded-xl shadow-sm hover:bg-[#6A2931] transition-colors"
              >
                {keySaved ? 'Saved!' : 'Save Key'}
              </button>
            </div>
          </form>
        </div>

        {/* Zero-Knowledge Security Notice */}
        <div className="bg-[#FAF5EE] rounded-3xl p-5 border border-[#C6B7A2]/40 shadow-sm space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-[#531B24]">
            <Shield className="w-4 h-4 text-[#6A2931]" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6A2931]">
              Zero-Knowledge Privacy
            </h4>
          </div>
          <p className="text-[#531B24]/85 leading-relaxed">
            Your personal cycle logs and reflections are saved locally and encrypted before transmission. Your private reproductive data is never exposed to public LLM training.
          </p>
        </div>

        {/* Data Export & GDPR Wipe */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleExportData}
            className="w-full bg-[#FAF5EE] hover:bg-[#C6B7A2]/30 border border-[#C6B7A2] text-[#531B24] text-xs font-semibold py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            {downloaded ? <Check className="w-4 h-4 text-emerald-700" /> : <Download className="w-4 h-4 text-[#6A2931]" />}
            <span>{downloaded ? 'Export Downloaded!' : 'Export All Data (JSON)'}</span>
          </button>

          <button
            onClick={handleResetData}
            className="w-full bg-rose-900/10 hover:bg-rose-900/20 text-rose-900 border border-rose-300 text-xs font-semibold py-3 rounded-2xl transition-all flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>{resetDone ? 'Purging...' : 'Reset Sanctuary & Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
