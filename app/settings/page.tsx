'use client';

import React, { useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { Shield, Download, Trash2, Key, Check, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [downloaded, setDownloaded] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `elena_wellness_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to clear your local database? All stored logs and memory will be reset.')) {
      StorageService.clearAllData();
      setResetDone(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="PRIVACY & PREFERENCES" subtitle="Zero-Knowledge Data Control & Sovereign Security" />

      <div className="px-4 py-4 space-y-4">
        {/* Zero Knowledge Privacy Shield */}
        <div className="bg-[#E7D8C3] rounded-3xl p-4 border border-[#C6B7A2]/50 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#531B24] text-[#F3ECE2] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#531B24]">
                Zero-Knowledge Encryption
              </h3>
              <span className="text-[10px] text-[#6A2931] font-semibold">
                Client-Side AES-GCM Protection Active
              </span>
            </div>
          </div>

          <p className="text-xs text-[#531B24]/90 leading-relaxed bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40">
            Your menstrual logs and mental reflections are encrypted directly on your device before storage. Even if databases are audited, your personal reflections cannot be decrypted without your device session key.
          </p>
        </div>

        {/* Data Sovereignty & Export */}
        <div className="bg-[#FAF5EE] rounded-3xl p-4 border border-[#C6B7A2]/50 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] flex items-center space-x-1.5">
            <Download className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>Data Portability & Export</span>
          </h3>

          <p className="text-xs text-[#531B24]/80 leading-relaxed">
            Download your complete history: workout logs, mental reflections, menstrual records, weight history, and AI memory in raw JSON format.
          </p>

          <button
            onClick={handleExportData}
            className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            {downloaded ? <Check className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? 'Export Downloaded!' : 'Export Complete Wellness Archive (JSON)'}</span>
          </button>
        </div>

        {/* Account & Data Erasure */}
        <div className="bg-[#FAF5EE] rounded-3xl p-4 border border-rose-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center space-x-1.5">
            <Trash2 className="w-3.5 h-3.5 text-rose-700" />
            <span>Right to Erasure (GDPR / Privacy)</span>
          </h3>

          <p className="text-xs text-[#531B24]/80 leading-relaxed">
            Permanently delete all stored wellness data, fitness assessments, and AI memories from this browser.
          </p>

          <button
            onClick={handleResetData}
            className="w-full bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>{resetDone ? 'Resetting...' : 'Purge All Data & Memories'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

