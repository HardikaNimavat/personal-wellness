'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Activity, 
  Moon, 
  Clock, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Flame,
  Brain
} from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { DailyTask, WorkoutPlan, DailyMentalChallenge, MenstrualCycle } from '@/lib/types';
import { DailyCheckInModal } from '@/components/coach/DailyCheckInModal';

export default function HomePage() {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [mental, setMental] = useState<DailyMentalChallenge | null>(null);
  const [cycles, setCycles] = useState<MenstrualCycle[]>([]);
  const [showCheckIn, setShowCheckIn] = useState(false);

  useEffect(() => {
    setTasks(StorageService.getTasks());
    setWorkout(StorageService.getTodayWorkout());
    setMental(StorageService.getTodayMental());
    setCycles(StorageService.getCycles());
  }, []);

  const handleToggleTask = (taskId: string) => {
    const updated = StorageService.toggleTask(taskId);
    setTasks(updated);
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header />

      <div className="px-4 py-4 space-y-4">
        {/* Daily Readiness & AI Check-in Prompt */}
        <div className="bg-[#E7D8C3] rounded-3xl p-4 border border-[#C6B7A2]/50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Sanctuary Equilibrium
              </span>
            </div>
            <button
              onClick={() => setShowCheckIn(true)}
              className="text-xs font-semibold text-[#531B24] bg-[#FAF5EE] hover:bg-[#C6B7A2]/40 px-2.5 py-1 rounded-full border border-[#C6B7A2]/60 transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-[#6A2931]" />
              <span>Calibrate Day</span>
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#531B24]">
                92% Readiness
              </h2>
              <p className="text-xs text-[#531B24]/80 mt-1 max-w-[240px] leading-relaxed">
                Vitality is high in Follicular day 12. Strength volume optimized; right knee alignment protected.
              </p>
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#C6B7A2"
                  strokeWidth="4"
                  fill="transparent"
                  opacity="0.4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#531B24"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="150"
                  strokeDashoffset={150 - (150 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-[#531B24]">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Centralized Daily Checklist */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
              Daily Transformation Checklist ({completedCount}/{tasks.length})
            </h3>
            <span className="text-[11px] text-[#531B24]/70 font-medium">
              Non-Punitive Tracking
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => {
              const isDone = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-[#E7D8C3]/50 border-[#C6B7A2]/40 opacity-75'
                      : 'bg-[#FAF5EE] border-[#C6B7A2]/50 hover:border-[#6A2931]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button className="mt-0.5 text-[#531B24] focus:outline-none">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-[#531B24] fill-[#E7D8C3]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#C6B7A2]" />
                      )}
                    </button>
                    <div>
                      <h4
                        className={`text-xs font-semibold ${
                          isDone ? 'line-through text-[#531B24]/60' : 'text-[#531B24]'
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-[11px] text-[#6A2931]/80 mt-0.5 line-clamp-1 leading-relaxed">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-medium text-[#6A2931] bg-[#E7D8C3] px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                    {task.estimated_mins}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 gap-3 pt-1">
          {/* Physical Workout Card */}
          {workout && (
            <Link
              href="/body"
              className="bg-[#E7D8C3] p-4 rounded-3xl border border-[#C6B7A2]/50 hover:border-[#6A2931] transition-all shadow-sm flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-full bg-[#531B24] text-[#F3ECE2]">
                    <Activity className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                    Physical Training
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[#531B24]">
                  {workout.title}
                </h4>
                <p className="text-xs text-[#531B24]/80">
                  {workout.exercises.length} exercises • {workout.estimated_duration_mins} mins • Animated cues
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#C6B7A2]/60 flex items-center justify-center text-[#531B24] group-hover:bg-[#531B24] group-hover:text-[#F3ECE2] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )}

          {/* Mental Practice Card */}
          {mental && (
            <Link
              href="/mind"
              className="bg-[#E7D8C3] p-4 rounded-3xl border border-[#C6B7A2]/50 hover:border-[#6A2931] transition-all shadow-sm flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-full bg-[#6A2931] text-[#F3ECE2]">
                    <Brain className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                    Mental Discipline • {mental.challenge.original_term || 'Mind'}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[#531B24]">
                  {mental.challenge.title}
                </h4>
                <p className="text-xs text-[#531B24]/80">
                  {mental.challenge.purpose.slice(0, 50)}...
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#C6B7A2]/60 flex items-center justify-center text-[#531B24] group-hover:bg-[#6A2931] group-hover:text-[#F3ECE2] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )}

          {/* Menstrual Wellness Teaser Card */}
          <Link
            href="/cycle"
            className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2]/60 hover:border-[#531B24] transition-all shadow-sm flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-full bg-[#531B24] text-[#F3ECE2]">
                  <Moon className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                  Menstrual Rhythm
                </span>
                <span className="text-[10px] text-[#531B24] bg-[#E7D8C3] px-1.5 py-0.2 rounded-full">
                  Day 12 Follicular
                </span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#531B24]">
                Estrogen Rise & Peak Strength
              </h4>
              <p className="text-xs text-[#531B24]/80">
                Next cycle estimate: ~16 days • Log symptoms securely
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#E7D8C3] border border-[#C6B7A2]/60 flex items-center justify-center text-[#531B24] group-hover:bg-[#531B24] group-hover:text-[#F3ECE2] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* AI Daily Check-in Modal */}
      <DailyCheckInModal
        isOpen={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        onComplete={() => {
          setTasks(StorageService.getTasks());
        }}
      />
    </div>
  );
}

