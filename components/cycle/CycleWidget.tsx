'use client';

import React, { useState } from 'react';
import { Moon, Calendar, AlertCircle, Heart, Lock, ShieldCheck, Check } from 'lucide-react';
import { MenstrualCycle, MenstrualSymptomLog, FlowIntensity } from '@/lib/types';
import { getCurrentCyclePhase, calculateCycleStats, getAdaptiveExerciseModifications } from '@/lib/cycle-data/cycle-engine';

interface CycleWidgetProps {
  cycles: MenstrualCycle[];
  onLogSymptom: (symptom: Omit<MenstrualSymptomLog, 'id'>) => void;
}

export function CycleWidget({ cycles, onLogSymptom }: CycleWidgetProps) {
  const latestCycle = cycles[cycles.length - 1] || cycles[0];
  const cycleStats = calculateCycleStats(cycles);
  const currentPhase = getCurrentCyclePhase(
    latestCycle?.period_start_date || new Date().toISOString(),
    cycleStats.averageCycleLength,
    cycleStats.averagePeriodDuration
  );

  const [cramps, setCramps] = useState<number>(1);
  const [energy, setEnergy] = useState<number>(8);
  const [flow, setFlow] = useState<FlowIntensity>('none');
  const [isSaved, setIsSaved] = useState(false);

  const adaptiveAdvice = getAdaptiveExerciseModifications({
    cramps_severity: cramps,
    energy_level: energy,
    flow_intensity: flow,
  });

  const handleLog = () => {
    onLogSymptom({
      log_date: new Date().toISOString().split('T')[0],
      flow_intensity: flow,
      cramps_severity: cramps,
      pain_severity: cramps > 0 ? cramps : 0,
      mood_tags: energy >= 7 ? ['Energized', 'Focused'] : ['Reflective', 'Tired'],
      energy_level: energy,
      sleep_quality: 8,
      physical_symptoms: cramps >= 5 ? ['pelvic_cramps'] : [],
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-[#E7D8C3] rounded-2xl border border-[#C6B7A2]/50 shadow-sm p-4 space-y-4">
      {/* Privacy Notice Banner */}
      <div className="flex items-center justify-between text-[11px] bg-[#FAF5EE] px-3 py-1.5 rounded-xl border border-[#C6B7A2]/40 text-[#531B24]">
        <div className="flex items-center space-x-1.5">
          <Lock className="w-3.5 h-3.5 text-[#6A2931]" />
          <span className="font-semibold">Zero-Knowledge Protected</span>
        </div>
        <span className="text-[#6A2931]/80">Encrypted on device</span>
      </div>

      {/* Cycle Phase Summary */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] bg-[#F3ECE2] px-2 py-0.5 rounded-full border border-[#C6B7A2]/40">
              Cycle Day {currentPhase.dayOfCycle} of {currentPhase.totalCycleLength}
            </span>
          </div>
          <h2 className="text-lg font-serif font-bold text-[#531B24] mt-1">
            {currentPhase.name}
          </h2>
          <p className="text-xs text-[#531B24]/90 mt-0.5 leading-relaxed">
            {currentPhase.description}
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-[#531B24] text-[#E7D8C3] flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
          <Moon className="w-5 h-5 text-[#E7D8C3]" />
          <span className="text-[9px] font-bold tracking-tight mt-0.5">Day {currentPhase.dayOfCycle}</span>
        </div>
      </div>

      {/* Cycle-Aware Fitness Recommendation */}
      <div className="bg-[#FAF5EE] p-3 rounded-xl border border-[#C6B7A2]/40 text-xs space-y-1.5">
        <h4 className="font-bold text-[#6A2931] uppercase text-[10px] tracking-wider flex items-center space-x-1">
          <Heart className="w-3 h-3 text-[#6A2931]" />
          <span>Biocycle Training Harmony</span>
        </h4>
        <p className="text-[#531B24] leading-relaxed">
          {currentPhase.trainingGuidance}
        </p>
      </div>

      {/* Adaptive Adjustment Banner if symptoms are high */}
      {adaptiveAdvice.adjustIntensity && (
        <div className="bg-[#FAF5EE] p-3 rounded-xl border border-[#6A2931]/40 text-xs text-[#531B24] flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-[#6A2931] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#6A2931] block">Automatic Workout Scaling</span>
            <p className="mt-0.5 leading-relaxed">{adaptiveAdvice.notes}</p>
          </div>
        </div>
      )}

      {/* Clinical Alert if pattern warrants attention */}
      {cycleStats.clinicalAlert && (
        <div className="bg-[#FAF5EE] p-3 rounded-xl border border-amber-300 text-xs text-[#531B24] flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{cycleStats.clinicalAlert}</p>
        </div>
      )}

      {/* Quick Daily Symptom Logger */}
      <div className="pt-2 border-t border-[#C6B7A2]/50 space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
          Log Today&apos;s Sensations
        </h4>

        {/* Cramp Severity Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between font-medium text-[#531B24]">
            <span>Pelvic Comfort / Cramps:</span>
            <span className="font-bold text-[#6A2931]">
              {cramps === 0 ? 'None' : cramps < 4 ? 'Mild' : cramps < 7 ? 'Moderate' : 'Severe'} ({cramps}/10)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={cramps}
            onChange={(e) => setCramps(Number(e.target.value))}
            className="w-full accent-[#531B24] h-1.5 bg-[#C6B7A2]/60 rounded-lg cursor-pointer"
          />
        </div>

        {/* Energy Level Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between font-medium text-[#531B24]">
            <span>Physical Energy:</span>
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

        {/* Flow Selection */}
        <div className="text-xs space-y-1">
          <span className="font-medium text-[#531B24] block">Flow Intensity:</span>
          <div className="grid grid-cols-4 gap-1.5">
            {(['none', 'spotting', 'light', 'medium'] as FlowIntensity[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlow(f)}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-medium capitalize transition-colors ${
                  flow === f
                    ? 'bg-[#531B24] text-[#F3ECE2] font-bold'
                    : 'bg-[#FAF5EE] text-[#531B24] border border-[#C6B7A2]/60 hover:bg-[#C6B7A2]/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleLog}
          className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{isSaved ? 'Encrypted & Stored' : 'Save Encrypted Symptoms'}</span>
        </button>

        <p className="text-[10px] text-center text-[#6A2931]/70 italic">
          Estimates provided for wellness tracking; not intended as contraceptive or diagnostic medical guidance.
        </p>
      </div>
    </div>
  );
}

