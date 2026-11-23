'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { DailyMentalCard } from '@/components/mind/DailyMentalCard';
import { StorageService } from '@/lib/db/mock-storage';
import { MENTAL_CHALLENGE_LIBRARY } from '@/lib/mental-data/mental-library';
import { DailyMentalChallenge, MentalChallengeItem } from '@/lib/types';
import { Sparkles, BookOpen, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function MindPage() {
  const [mental, setMental] = useState<DailyMentalChallenge | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<MentalChallengeItem | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'library'>('today');

  useEffect(() => {
    setMental(StorageService.getTodayMental());
  }, []);

  const handleSaveReflection = (reflection: string, rating: number) => {
    const updated = StorageService.updateTodayMental({
      reflection_notes: reflection,
      confidence_rating: rating,
      status: 'completed',
    });
    setMental(updated);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="MENTAL DISCIPLINE" subtitle="Japanese Philosophies & Evidence-Based Resilience" />

      <div className="px-4 py-4 space-y-4">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#E7D8C3] p-1 rounded-2xl border border-[#C6B7A2]/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('today')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'today'
                ? 'bg-[#531B24] text-[#F3ECE2] shadow-sm'
                : 'text-[#531B24] hover:text-[#6A2931]'
            }`}
          >
            Today&apos;s Challenge
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'library'
                ? 'bg-[#531B24] text-[#F3ECE2] shadow-sm'
                : 'text-[#531B24] hover:text-[#6A2931]'
            }`}
          >
            Practice Archive ({MENTAL_CHALLENGE_LIBRARY.length})
          </button>
        </div>

        {activeTab === 'today' && mental && (
          <DailyMentalCard
            mental={mental}
            onSaveReflection={handleSaveReflection}
          />
        )}

        {activeTab === 'library' && (
          <div className="space-y-3">
            {/* Selected Practice Detail Modal / Preview */}
            {selectedPractice && (
              <div className="bg-[#E7D8C3] p-4 rounded-3xl border border-[#6A2931] shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] bg-[#FAF5EE] px-2 py-0.5 rounded-full">
                    {selectedPractice.origin_system.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => setSelectedPractice(null)}
                    className="text-xs text-[#531B24] underline font-medium"
                  >
                    Close
                  </button>
                </div>

                <div>
                  {selectedPractice.original_term && (
                    <span className="text-xs font-serif font-bold text-[#6A2931] tracking-widest block mb-0.5">
                      {selectedPractice.original_term}
                    </span>
                  )}
                  <h3 className="text-base font-serif font-bold text-[#531B24]">
                    {selectedPractice.title}
                  </h3>
                </div>

                <p className="text-xs text-[#531B24] leading-relaxed italic bg-[#FAF5EE] p-3 rounded-xl border border-[#C6B7A2]/40 font-serif">
                  &ldquo;{selectedPractice.cultural_context}&rdquo;
                </p>

                <div className="space-y-1.5 text-xs text-[#531B24]">
                  <span className="font-bold text-[#6A2931] block">Practice Instructions:</span>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    {selectedPractice.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Practice Library List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] px-1">
                Authentic Philosophies & Mental Systems
              </h3>

              {MENTAL_CHALLENGE_LIBRARY.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPractice(item)}
                  className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#C6B7A2]/40 hover:border-[#6A2931] transition-all cursor-pointer shadow-sm flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] bg-[#E7D8C3] px-2 py-0.5 rounded-full">
                        {item.origin_system.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-[#531B24]/70 font-medium">
                        {item.estimated_duration_mins} mins
                      </span>
                    </div>
                    {item.original_term && (
                      <span className="text-[11px] font-bold text-[#6A2931] block">
                        {item.original_term}
                      </span>
                    )}
                    <h4 className="text-sm font-serif font-bold text-[#531B24]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#531B24]/80 line-clamp-1">
                      {item.purpose}
                    </p>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-[#E7D8C3] flex items-center justify-center text-[#531B24] flex-shrink-0 ml-2 mt-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

