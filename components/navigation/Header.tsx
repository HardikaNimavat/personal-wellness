'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, User } from 'lucide-react';
import { StorageService } from '@/lib/db/mock-storage';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const profile = StorageService.getProfile();
    setUserName(profile.preferred_name || profile.full_name || 'Sanctuary');
  }, []);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-[#F3ECE2]/95 backdrop-blur-md border-b border-[#C6B7A2]/25 px-5 py-3.5 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#6A2931] uppercase block">
            {todayFormatted}
          </span>
          <h1 className="text-xl font-serif font-bold text-[#531B24] tracking-tight mt-0.5">
            {title || `Welcome, ${userName}`}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#6A2931]/80 mt-0.5 font-medium">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/coach"
            className="flex items-center space-x-1.5 bg-[#E7D8C3] hover:bg-[#C6B7A2]/40 text-[#531B24] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border border-[#C6B7A2]/40 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>AI Coach</span>
          </Link>

          <Link
            href="/settings"
            className="w-8 h-8 rounded-full bg-[#E7D8C3] border border-[#C6B7A2]/40 flex items-center justify-center text-[#531B24] hover:bg-[#C6B7A2]/40 transition-colors shadow-sm"
            title="Profile & Settings"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
