'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { ProgressRecord } from '@/lib/types';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Clock, 
  Flame, 
  Scale, 
  Sparkles, 
  Plus 
} from 'lucide-react';

export default function JourneyPage() {
  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [newWeight, setNewWeight] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    setRecords(StorageService.getProgressRecords());
  }, []);

  const handleLogWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeight);
    if (isNaN(val) || val <= 0) return;

    const updated = StorageService.logWeight(val);
    setRecords(updated);
    setNewWeight('');
    setShowLogModal(false);
  };

  const latestRecord = records[records.length - 1] || records[0];
  const earliestRecord = records[0];
  const totalWeightDelta = latestRecord && earliestRecord 
    ? Math.round((latestRecord.weight_kg - earliestRecord.weight_kg) * 10) / 10 
    : 0;

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="JOURNEY & TRANSFORMATION" subtitle="Moving Averages, Volume & Sustainable Milestones" />

      <div className="px-4 py-4 space-y-4">
        {/* Weight Moving Average Banner */}
        <div className="bg-[#E7D8C3] rounded-3xl p-4 border border-[#C6B7A2]/50 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931] flex items-center space-x-1.5">
              <Scale className="w-3.5 h-3.5 text-[#6A2931]" />
              <span>Weight Trend (7-Day Moving Average)</span>
            </span>
            <button
              onClick={() => setShowLogModal(true)}
              className="text-xs font-semibold text-[#531B24] bg-[#FAF5EE] hover:bg-[#C6B7A2]/40 px-2.5 py-1 rounded-full border border-[#C6B7A2]/60 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>Log Scale</span>
            </button>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-serif font-bold text-[#531B24]">
              {latestRecord?.weight_moving_avg_7d || 64.2} kg
            </span>
            <span className="text-xs font-semibold text-[#6A2931]">
              {totalWeightDelta <= 0 ? `${totalWeightDelta} kg` : `+${totalWeightDelta} kg`} overall trend
            </span>
          </div>

          <p className="text-[11px] text-[#531B24]/80 leading-relaxed bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/40">
            <strong>Healthy Tracking Principle:</strong> Daily weight fluctuates up to 2kg due to water, digestion, and hormonal cycle phases. We focus exclusively on the 7-day smoothed trend.
          </p>

          {/* Render Trend Visualization Bars */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931]">
              Recent Smooth Trend
            </span>
            <div className="flex items-end space-x-2 h-20 pt-2 px-1">
              {records.map((r, i) => {
                const heightPercent = Math.min(100, Math.max(20, ((r.weight_kg - 63) / (66 - 63)) * 100));
                return (
                  <div key={r.record_date} className="flex-1 flex flex-col items-center group relative">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-[#531B24] group-hover:bg-[#6A2931] rounded-t-md transition-all relative"
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#531B24] opacity-0 group-hover:opacity-100 transition-opacity">
                        {r.weight_kg}
                      </span>
                    </div>
                    <span className="text-[8px] text-[#6A2931] mt-1">
                      {r.record_date.slice(8)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Holistic Time Investment Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40 text-center">
            <Clock className="w-4 h-4 text-[#6A2931] mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-[#531B24]/70 block">Total Exercise</span>
            <span className="text-base font-serif font-bold text-[#531B24]">
              {records.reduce((sum, r) => sum + r.total_workout_mins, 0)}m
            </span>
          </div>

          <div className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40 text-center">
            <Sparkles className="w-4 h-4 text-[#6A2931] mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-[#531B24]/70 block">Mindful Training</span>
            <span className="text-base font-serif font-bold text-[#531B24]">
              {records.reduce((sum, r) => sum + r.total_mental_mins, 0)}m
            </span>
          </div>

          <div className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40 text-center">
            <Flame className="w-4 h-4 text-[#6A2931] mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-[#531B24]/70 block">Consistency</span>
            <span className="text-base font-serif font-bold text-[#531B24]">
              92%
            </span>
          </div>
        </div>

        {/* Non-Scale Milestone Timeline */}
        <div className="bg-[#E7D8C3] rounded-3xl p-4 border border-[#C6B7A2]/50 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>Non-Scale Transformation Milestones</span>
          </h3>

          <div className="space-y-2.5">
            {[
              {
                title: 'Shugyō Discipline Master',
                date: 'Nov 20, 2026',
                description: 'Completed 14 consecutive days of undistracted morning discipline.',
              },
              {
                title: 'Biomechanical Form Precision',
                date: 'Nov 15, 2026',
                description: 'Zero reported knee discomfort across 10 squats sessions with 20° flare.',
              },
              {
                title: 'Menstrual Harmony Alignment',
                date: 'Nov 08, 2026',
                description: 'First full cycle successfully synced with adaptive workout scaling.',
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#C6B7A2]/40 flex items-start space-x-3 text-xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#531B24] text-[#F3ECE2] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#531B24]">{milestone.title}</span>
                    <span className="text-[10px] text-[#6A2931] font-medium">{milestone.date}</span>
                  </div>
                  <p className="text-[11px] text-[#531B24]/80 mt-0.5 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Weight Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1218]/60 backdrop-blur-sm p-4">
          <div className="bg-[#F3ECE2] border border-[#C6B7A2] rounded-3xl max-w-xs w-full p-5 shadow-2xl space-y-3">
            <h3 className="text-base font-serif font-bold text-[#531B24]">
              Log Morning Weight
            </h3>
            <p className="text-xs text-[#531B24]/80 leading-relaxed">
              Log under consistent conditions (waking, after restroom, before breakfast).
            </p>
            <form onSubmit={handleLogWeight} className="space-y-3">
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 64.2"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                autoFocus
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-center text-lg font-serif font-bold text-[#531B24] focus:outline-none"
              />
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2 text-xs font-medium text-[#6A2931] bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-[#F3ECE2] bg-[#531B24] rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

