'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { CycleWidget } from '@/components/cycle/CycleWidget';
import { StorageService } from '@/lib/db/mock-storage';
import { MenstrualCycle, MenstrualSymptomLog } from '@/lib/types';
import { calculateCycleStats, getCurrentCyclePhase } from '@/lib/cycle-data/cycle-engine';
import { Calendar, Moon, Heart, Lock, ShieldCheck, Info } from 'lucide-react';

export default function CyclePage() {
  const [cycles, setCycles] = useState<MenstrualCycle[]>([]);
  const [symptoms, setSymptoms] = useState<MenstrualSymptomLog[]>([]);

  useEffect(() => {
    setCycles(StorageService.getCycles());
    setSymptoms(StorageService.getSymptoms());
  }, []);

  const stats = calculateCycleStats(cycles);
  const latestCycle = cycles[cycles.length - 1] || cycles[0];
  const phase = getCurrentCyclePhase(
    latestCycle?.period_start_date || new Date().toISOString(),
    stats.averageCycleLength,
    stats.averagePeriodDuration
  );

  const handleLogSymptom = (newSymptom: Omit<MenstrualSymptomLog, 'id'>) => {
    const logged = StorageService.logSymptom(newSymptom);
    setSymptoms(StorageService.getSymptoms());
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="MENSTRUAL CYCLE" subtitle="Zero-Knowledge Encrypted Health Sanctuary" />

      <div className="px-4 py-4 space-y-4">
        {/* Core Cycle Widget with Symptom Logging */}
        <CycleWidget cycles={cycles} onLogSymptom={handleLogSymptom} />

        {/* Clinical Statistics & Variation Analytics */}
        <div className="bg-[#E7D8C3] rounded-2xl border border-[#C6B7A2]/50 p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>Cycle Length & Rhythm Analytics</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/40">
              <span className="text-[10px] text-[#531B24]/70 block font-medium">Avg Cycle</span>
              <span className="text-base font-serif font-bold text-[#531B24]">
                {stats.averageCycleLength} days
              </span>
            </div>

            <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/40">
              <span className="text-[10px] text-[#531B24]/70 block font-medium">Period Length</span>
              <span className="text-base font-serif font-bold text-[#531B24]">
                {stats.averagePeriodDuration} days
              </span>
            </div>

            <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/40">
              <span className="text-[10px] text-[#531B24]/70 block font-medium">Variation</span>
              <span className="text-base font-serif font-bold text-[#6A2931]">
                ±{stats.cycleVariation} days
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#531B24]/80 leading-relaxed bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/40">
            <strong>Clinical Context:</strong> Variations of 2–4 days between cycles are healthy and typical. The platform will proactively alert you if variations consistently exceed 7 days across 3 consecutive cycles.
          </p>
        </div>

        {/* Previous Cycle History Records */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] px-1">
            Recorded Cycle History
          </h3>

          <div className="space-y-2">
            {cycles.map((cycle, i) => (
              <div
                key={cycle.id || i}
                className="bg-[#FAF5EE] p-3 rounded-xl border border-[#C6B7A2]/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-[#531B24] block">
                    Started: {cycle.period_start_date}
                  </span>
                  <span className="text-[11px] text-[#6A2931]">
                    Duration: {cycle.period_duration_days} days • Cycle: {cycle.cycle_length_days} days
                  </span>
                </div>

                <span className="bg-[#E7D8C3] text-[#531B24] font-medium text-[10px] px-2 py-0.5 rounded-full border border-[#C6B7A2]/50">
                  Logged
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

