'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Activity, Sparkles, Moon, TrendingUp, Bot } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'BODY', href: '/body', icon: Activity },
    { label: 'COACH', href: '/coach', icon: Bot, isSpecial: true },
    { label: 'MIND', href: '/mind', icon: Sparkles },
    { label: 'CYCLE', href: '/cycle', icon: Moon },
    { label: 'JOURNEY', href: '/journey', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F3ECE2]/95 backdrop-blur-md border-t border-[#C6B7A2]/40 px-3 py-2 max-w-lg mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-13 h-13 p-3.5 rounded-full shadow-lg transition-transform duration-200 active:scale-95 flex items-center justify-center ${
                    isActive
                      ? 'bg-[#6A2931] text-[#F3ECE2] ring-4 ring-[#E7D8C3]'
                      : 'bg-[#531B24] text-[#E7D8C3] hover:bg-[#6A2931] ring-2 ring-[#E7D8C3]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-wider font-semibold text-[#531B24] mt-1">
                  AI COACH
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors duration-150 ${
                isActive
                  ? 'text-[#531B24] font-semibold'
                  : 'text-[#C6B7A2] hover:text-[#6A2931]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 text-[#531B24]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#531B24]" />
                )}
              </div>
              <span className={`text-[10px] tracking-wider mt-1.5 ${isActive ? 'text-[#531B24]' : 'text-[#6A2931]/70'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

