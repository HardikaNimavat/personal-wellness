'use client';

import React, { useState } from 'react';
import { Sparkles, Moon, Battery, Smile, Activity, Clock, Check, X } from 'lucide-react';
import { DailyCheckIn } from '@/lib/types';
import { StorageService } from '@/lib/db/mock-storage';

interface DailyCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function DailyCheckInModal({ isOpen, onClose, onComplete }: DailyCheckInModalProps) {
  const [sleep, setSleep] = useState<number>(8);
  const [energy, setEnergy] = useState<number>(8);
  const [mood, setMood] = useState<number>(8);
  const [soreness, setSoreness] = useState<number>(2);
  const [availableTime, setAvailableTime] = useState<number>(40);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to database-backed memory
    StorageService.saveMemory(
      'recovery_pattern',
      `Check-in ${new Date().toISOString().split('T')[0]}`,
      `Sleep: ${sleep}/10, Energy: ${energy}/10, Soreness: ${soreness}/10. Allocated ${availableTime} mins.`,
      'daily_checkin'
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1218]/60 backdrop-blur-sm p-4">
      <div className="bg-[#F3ECE2] border border-[#C6B7A2] rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C6B7A2]/40 pb-3">
          <div>
            <div className="flex items-center space-x-1.5 text-[#6A2931] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Daily Calibration</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-[#531B24]">
              How are you arriving today?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E7D8C3] flex items-center justify-center text-[#531B24] hover:bg-[#C6B7A2]/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Sleep Quality */}
          <div className="bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/40 space-y-1.5">
            <div className="flex justify-between items-center text-[#531B24]">
              <span className="font-semibold flex items-center space-x-1.5">
                <Moon className="w-3.5 h-3.5 text-[#6A2931]" />
                <span>Sleep Restoration</span>
              </span>
              <span className="font-bold text-[#6A2931]">{sleep}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
              className="w-full accent-[#531B24] h-1.5 bg-[#C6B7A2]/60 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#531B24]/70">
              <span>Restless</span>
              <span>Deep & Rejuvenating</span>
            </div>
          </div>

          {/* Energy Level */}
          <div className="bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/40 space-y-1.5">
            <div className="flex justify-between items-center text-[#531B24]">
              <span className="font-semibold flex items-center space-x-1.5">
                <Battery className="w-3.5 h-3.5 text-[#6A2931]" />
                <span>Physical Vitality</span>
              </span>
              <span className="font-bold text-[#6A2931]">{energy}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-[#531B24] h-1.5 bg-[#C6B7A2]/60 rounded-lg cursor-pointer"
            />
          </div>

          {/* Physical Soreness */}
          <div className="bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/40 space-y-1.5">
            <div className="flex justify-between items-center text-[#531B24]">
              <span className="font-semibold flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-[#6A2931]" />
                <span>Muscular Soreness / Fatigue</span>
              </span>
              <span className="font-bold text-[#6A2931]">{soreness}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={soreness}
              onChange={(e) => setSoreness(Number(e.target.value))}
              className="w-full accent-[#531B24] h-1.5 bg-[#C6B7A2]/60 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#531B24]/70">
              <span>Fresh & Loose</span>
              <span>Substantial Soreness</span>
            </div>
          </div>

          {/* Available Workout Time */}
          <div className="bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/40 space-y-1.5">
            <div className="flex justify-between items-center text-[#531B24]">
              <span className="font-semibold flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6A2931]" />
                <span>Available Training Window</span>
              </span>
              <span className="font-bold text-[#6A2931]">{availableTime} minutes</span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[20, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setAvailableTime(mins)}
                  className={`py-1.5 rounded-xl font-bold transition-colors ${
                    availableTime === mins
                      ? 'bg-[#531B24] text-[#F3ECE2]'
                      : 'bg-[#FAF5EE] text-[#531B24] border border-[#C6B7A2]/60 hover:bg-[#C6B7A2]/30'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] font-semibold py-3 rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span className="inline-block animate-pulse">Synthesizing Adaptive Plan...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Calibrate Today&apos;s Sanctuary</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

