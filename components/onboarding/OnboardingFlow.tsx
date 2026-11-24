'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Heart, Shield, Dumbbell, Moon, Clock } from 'lucide-react';
import { StorageService } from '@/lib/db/mock-storage';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [goals, setGoals] = useState<string[]>(['Sustainable Fat Loss & Tone', 'Core & Posture Alignment']);
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('63');
  const [targetWeight, setTargetWeight] = useState('58');
  const [limitations, setLimitations] = useState('');
  const [trackCycle, setTrackCycle] = useState(true);
  const [cycleLength, setCycleLength] = useState('28');
  const [dailyMinutes, setDailyMinutes] = useState(30);

  const availableGoals = [
    'Sustainable Fat Loss & Tone',
    'Core & Posture Alignment',
    'Mental Fortitude & Discipline',
    'Menstrual Cycle Harmony',
    'Stress Relief & Inner Calm',
    'Consistency & Habit Building',
  ];

  const toggleGoal = (g: string) => {
    if (goals.includes(g)) {
      setGoals(goals.filter(item => item !== g));
    } else {
      setGoals([...goals, g]);
    }
  };

  const handleFinish = () => {
    const preferredName = name.trim() || 'Friend';

    // 1. Save User Profile
    StorageService.updateProfile({
      full_name: preferredName,
      preferred_name: preferredName,
      has_completed_onboarding: true,
    });

    // 2. Save Fitness Profile
    StorageService.updateFitness({
      height_cm: parseFloat(height) || 165,
      current_weight_kg: parseFloat(weight) || 63,
      target_weight_kg: parseFloat(targetWeight) || 58,
      fitness_objectives: goals,
      injuries_and_limitations: limitations.trim() ? [limitations.trim()] : ['None reported'],
      available_exercise_mins: dailyMinutes,
    });

    // 3. Save initial database-backed AI memories
    StorageService.saveMemory(
      'fitness_preference',
      'Personal Fitness Objectives',
      goals.join(', '),
      'onboarding_intake'
    );

    if (limitations.trim()) {
      StorageService.saveMemory(
        'physical_limitation',
        'Physical Limitation & Joint Care',
        limitations.trim(),
        'onboarding_intake'
      );
    }

    StorageService.saveMemory(
      'recovery_pattern',
      'Daily Dedicated Time',
      `${dailyMinutes} minutes daily allocation.`,
      'onboarding_intake'
    );

    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F3ECE2] flex flex-col justify-between p-6 max-w-lg mx-auto overflow-y-auto">
      {/* Top Header */}
      <div className="pt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[#6A2931] mb-2">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#531B24]" />
            <span>AI Coach Consultation</span>
          </span>
          <span>Step {step} of 4</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E7D8C3] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#531B24] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="py-6 flex-1 flex flex-col justify-center space-y-5">
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Welcome to your sanctuary
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#531B24]">
                What should your personal AI coach call you?
              </h2>
              <p className="text-xs text-[#531B24]/80 leading-relaxed">
                This is a private personal space. Your coach uses this to address you and personalize your daily guidance.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#531B24] block mb-1.5">
                Your Preferred Name
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Hardika, Maya, Sarah..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-2xl p-3.5 text-sm text-[#531B24] placeholder-[#C6B7A2] focus:outline-none focus:border-[#531B24] font-medium shadow-sm"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Your Vision
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#531B24]">
                What are your main transformation goals?
              </h2>
              <p className="text-xs text-[#531B24]/80 leading-relaxed">
                Select everything that resonates with you right now.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {availableGoals.map((g) => {
                const selected = goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      selected
                        ? 'bg-[#531B24] text-[#F3ECE2] border-[#531B24] shadow-sm'
                        : 'bg-[#FAF5EE] text-[#531B24] border-[#C6B7A2]/60 hover:border-[#6A2931]'
                    }`}
                  >
                    <span>{g}</span>
                    {selected && <Check className="w-4 h-4 text-emerald-300 ml-2 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Physical Baseline & Safety
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#531B24]">
                Tell me about your body
              </h2>
              <p className="text-xs text-[#531B24]/80 leading-relaxed">
                Your AI coach adapts exercises to prevent pain and avoid unsafe routines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#6A2931] block mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-xs text-[#531B24] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#6A2931] block mb-1">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-xs text-[#531B24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6A2931] block mb-1">
                Any injuries, knee/back sensitivities, or pain areas?
              </label>
              <input
                type="text"
                placeholder="e.g. Mild right knee pain on deep squats, tight lower back, none..."
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-xs text-[#531B24] placeholder-[#C6B7A2] focus:outline-none"
              />
              <span className="text-[10px] text-[#6A2931]/80 mt-1 block">
                The coach will automatically replace high-impact movements when limitations are noted.
              </span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Daily Schedule & Rhythm
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#531B24]">
                How much time fits your day?
              </h2>
              <p className="text-xs text-[#531B24]/80 leading-relaxed">
                Consistency is achieved through realistic plans, not extreme exhaustion.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#531B24] block mb-2">
                Daily Available Training Window
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[20, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyMinutes(mins)}
                    className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                      dailyMinutes === mins
                        ? 'bg-[#531B24] text-[#F3ECE2] border-[#531B24] shadow-sm'
                        : 'bg-[#FAF5EE] text-[#531B24] border-[#C6B7A2]/60 hover:bg-[#C6B7A2]/30'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#C6B7A2]/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#531B24] flex items-center space-x-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#6A2931]" />
                  <span>Track Menstrual Rhythm?</span>
                </span>
                <input
                  type="checkbox"
                  checked={trackCycle}
                  onChange={(e) => setTrackCycle(e.target.checked)}
                  className="w-4 h-4 accent-[#531B24] rounded"
                />
              </div>
              <p className="text-[11px] text-[#531B24]/80 leading-relaxed">
                Syncs energy changes and automatically eases workout intensity during high cramp days.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-4 border-t border-[#C6B7A2]/30 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="text-xs font-semibold text-[#6A2931] px-4 py-2 hover:underline"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            disabled={step === 1 && !name.trim()}
            onClick={() => setStep(step + 1)}
            className="bg-[#531B24] disabled:opacity-40 hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold px-6 py-3 rounded-2xl transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold px-6 py-3 rounded-2xl transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initialize My Sanctuary</span>
          </button>
        )}
      </div>
    </div>
  );
}
