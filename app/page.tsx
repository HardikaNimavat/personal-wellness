'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Activity, 
  Moon, 
  ChevronRight, 
  Brain,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { DailyTask, WorkoutPlan, DailyMentalChallenge, UserProfile, FitnessProfile } from '@/lib/types';
import { DailyCheckInModal } from '@/components/coach/DailyCheckInModal';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export default function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fitness, setFitness] = useState<FitnessProfile | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [mental, setMental] = useState<DailyMentalChallenge | null>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    const prof = StorageService.getProfile();
    const fit = StorageService.getFitness();
    const t = StorageService.getTasks();
    const w = StorageService.getTodayWorkout();
    const m = StorageService.getTodayMental();

    setProfile(prof);
    setFitness(fit);
    setTasks(t);
    setWorkout(w);
    setMental(m);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleTask = (taskId: string) => {
    const updated = StorageService.toggleTask(taskId);
    setTasks(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3ECE2] flex items-center justify-center text-xs font-semibold text-[#6A2931]">
        Opening your sanctuary...
      </div>
    );
  }

  // If user has not completed their onboarding intake, present the personal consultation
  if (!profile || !profile.has_completed_onboarding) {
    return <OnboardingFlow onComplete={loadData} />;
  }

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const userName = profile.preferred_name || profile.full_name || 'Friend';
  const limitationNote = fitness?.injuries_and_limitations?.[0];

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header />

      <div className="px-5 py-5 space-y-5 max-w-lg mx-auto">
        {/* Personal AI Coach Warm Whisper */}
        <div className="bg-[#E7D8C3] rounded-3xl p-5 border border-[#C6B7A2]/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Daily Sanctuary Focus
              </span>
            </div>
            <button
              onClick={() => setShowCheckIn(true)}
              className="text-xs font-semibold text-[#531B24] bg-[#FAF5EE] hover:bg-[#C6B7A2]/30 px-3 py-1 rounded-full border border-[#C6B7A2]/60 transition-colors flex items-center space-x-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-[#6A2931]" />
              <span>Check In</span>
            </button>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-[#531B24]">
              Welcome, {userName}.
            </h2>
            <p className="text-xs text-[#531B24]/85 mt-1 leading-relaxed">
              {limitationNote && limitationNote !== 'None reported'
                ? `I have calibrated today's routines around your care note: "${limitationNote}". Your session is set to ${fitness?.available_exercise_mins || 30} minutes.`
                : `Your daily equilibrium is strong. Today's plan balances steady physical posture with mindful composure.`}
            </p>
          </div>

          {/* Simple Clean Progress Strip */}
          <div className="pt-2 border-t border-[#C6B7A2]/40 flex items-center justify-between text-xs">
            <span className="text-[#6A2931] font-medium">Daily Journey Completed</span>
            <span className="font-serif font-bold text-[#531B24]">{completedCount} of {tasks.length} ({progressPercent}%)</span>
          </div>
        </div>

        {/* Clean Pillar Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] px-1">
            Today&apos;s Core Pillars
          </h3>

          {/* Physical Body Card */}
          {workout && (
            <Link
              href="/body"
              className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2]/40 hover:border-[#6A2931] transition-all shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#531B24] text-[#F3ECE2] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] block">
                    Physical Body • {workout.estimated_duration_mins}m
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#531B24]">
                    {workout.title}
                  </h4>
                  <p className="text-xs text-[#531B24]/70 mt-0.5">
                    {workout.exercises.length} guided exercises with animated form cues
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#E7D8C3] flex items-center justify-center text-[#531B24] group-hover:bg-[#531B24] group-hover:text-[#F3ECE2] transition-colors flex-shrink-0 ml-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )}

          {/* Mind Card */}
          {mental && (
            <Link
              href="/mind"
              className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2]/40 hover:border-[#6A2931] transition-all shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#6A2931] text-[#F3ECE2] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] block">
                    Mental Discipline • {mental.challenge.original_term || 'Practice'}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#531B24]">
                    {mental.challenge.title}
                  </h4>
                  <p className="text-xs text-[#531B24]/70 mt-0.5">
                    {mental.challenge.estimated_duration_mins} mins • Mindful reflection journal
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#E7D8C3] flex items-center justify-center text-[#531B24] group-hover:bg-[#6A2931] group-hover:text-[#F3ECE2] transition-colors flex-shrink-0 ml-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )}

          {/* Menstrual Rhythm Card */}
          <Link
            href="/cycle"
            className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2]/40 hover:border-[#531B24] transition-all shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#531B24] text-[#F3ECE2] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Moon className="w-5 h-5 text-[#E7D8C3]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] block">
                  Menstrual Rhythm • Day 12
                </span>
                <h4 className="text-sm font-serif font-bold text-[#531B24]">
                  Follicular Vitality Phase
                </h4>
                <p className="text-xs text-[#531B24]/70 mt-0.5">
                  Safe window for progressive strength • Zero-knowledge encrypted
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#E7D8C3] flex items-center justify-center text-[#531B24] group-hover:bg-[#531B24] group-hover:text-[#F3ECE2] transition-colors flex-shrink-0 ml-2">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Clean, Non-Punitive Checklist */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
              Today&apos;s Intentions
            </h3>
            <span className="text-[11px] text-[#531B24]/70">
              Tap to complete
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => {
              const isDone = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-[#E7D8C3]/40 border-[#C6B7A2]/30 opacity-75'
                      : 'bg-[#FAF5EE] border-[#C6B7A2]/50 hover:border-[#6A2931]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button className="text-[#531B24] focus:outline-none">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-[#531B24] fill-[#E7D8C3]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#C6B7A2]" />
                      )}
                    </button>
                    <span
                      className={`text-xs font-semibold ${
                        isDone ? 'line-through text-[#531B24]/60' : 'text-[#531B24]'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-medium text-[#6A2931] bg-[#E7D8C3] px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                    {task.estimated_mins}m
                  </span>
                </div>
              );
            })}
          </div>
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
