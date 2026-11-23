'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'ELENA', subtitle }: HeaderProps) {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-[#F3ECE2]/90 backdrop-blur-md border-b border-[#C6B7A2]/30 px-4 py-3.5 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#6A2931] uppercase">
              {todayFormatted}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C6B7A2]" />
            <span className="flex items-center text-[10px] font-medium text-[#531B24] bg-[#E7D8C3] px-2 py-0.5 rounded-full">
              <Shield className="w-2.5 h-2.5 mr-1 text-[#6A2931]" />
              Zero-Knowledge Encrypted
            </span>
          </div>
          <h1 className="text-xl font-serif font-bold text-[#531B24] mt-0.5 tracking-tight">
            {subtitle ? title : 'Sanctuary of Growth'}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#6A2931]/80 mt-0.5 font-medium">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/coach"
            className="flex items-center space-x-1 bg-[#E7D8C3] hover:bg-[#C6B7A2]/40 text-[#531B24] text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors border border-[#C6B7A2]/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>AI Coach</span>
          </Link>

          <Link
            href="/settings"
            className="w-8 h-8 rounded-full bg-[#E7D8C3] border border-[#C6B7A2]/50 flex items-center justify-center text-[#531B24] hover:bg-[#C6B7A2]/40 transition-colors"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

