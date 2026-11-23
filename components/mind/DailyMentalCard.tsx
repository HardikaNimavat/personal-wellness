'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, Check, Heart, Feather, ShieldCheck } from 'lucide-react';
import { DailyMentalChallenge } from '@/lib/types';

interface DailyMentalCardProps {
  mental: DailyMentalChallenge;
  onSaveReflection: (reflection: string, rating: number) => void;
}

export function DailyMentalCard({ mental, onSaveReflection }: DailyMentalCardProps) {
  const [reflectionText, setReflectionText] = useState(mental.reflection_notes || '');
  const [confidence, setConfidence] = useState<number>(mental.confidence_rating || 8);
  const [isSaved, setIsSaved] = useState(false);

  const { challenge } = mental;

  const handleSave = () => {
    onSaveReflection(reflectionText, confidence);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-[#E7D8C3] rounded-2xl border border-[#C6B7A2]/50 shadow-sm overflow-hidden p-4 space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] bg-[#F3ECE2] px-2 py-0.5 rounded-full border border-[#C6B7A2]/40">
              {challenge.origin_system.replace('_', ' ')}
            </span>
            {challenge.is_evidence_based && (
              <span className="text-[10px] font-medium text-[#531B24] bg-[#F3ECE2] px-2 py-0.5 rounded-full flex items-center border border-[#C6B7A2]/40">
                <ShieldCheck className="w-2.5 h-2.5 mr-1 text-[#6A2931]" />
                Evidence-Grounded
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-[#6A2931] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{challenge.estimated_duration_mins} min</span>
          </div>
        </div>

        {/* Kanji & Title */}
        <div className="mt-2">
          {challenge.original_term && (
            <span className="text-xs font-serif font-bold text-[#6A2931] tracking-widest block mb-0.5">
              {challenge.original_term}
            </span>
          )}
          <h2 className="text-lg font-serif font-bold text-[#531B24]">
            {challenge.title}
          </h2>
        </div>
      </div>

      {/* Cultural Heritage Context */}
      <div className="bg-[#FAF5EE] p-3 rounded-xl border border-[#C6B7A2]/40 text-xs space-y-1.5">
        <h4 className="font-bold text-[#6A2931] uppercase text-[10px] tracking-wider flex items-center space-x-1">
          <BookOpen className="w-3 h-3 text-[#6A2931]" />
          <span>Cultural & Philosophical Context</span>
        </h4>
        <p className="text-[#531B24] leading-relaxed italic font-serif">
          &ldquo;{challenge.cultural_context}&rdquo;
        </p>
        <p className="text-[#531B24]/90 font-sans pt-1 border-t border-[#C6B7A2]/30">
          <strong>Purpose:</strong> {challenge.purpose}
        </p>
      </div>

      {/* Step-by-Step Practice */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
          Today&apos;s Guided Practice Steps
        </h4>
        <ol className="space-y-2 text-xs text-[#531B24]">
          {challenge.instructions.map((step, idx) => (
            <li key={idx} className="flex items-start space-x-2 bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/30">
              <span className="w-5 h-5 rounded-full bg-[#531B24] text-[#F3ECE2] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Structured Reflection Journal (Encrypted memory) */}
      <div className="pt-2 border-t border-[#C6B7A2]/50 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] flex items-center space-x-1">
            <Feather className="w-3.5 h-3.5 text-[#6A2931]" />
            <span>Personal Reflection & Memory Sync</span>
          </h4>
          <span className="text-[10px] text-[#531B24]/70">Stored in AI Memory</span>
        </div>

        <textarea
          rows={3}
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="How did you observe inner resistance or calm during this practice? Write your honest reflection..."
          className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-3 text-xs text-[#531B24] placeholder-[#C6B7A2] focus:outline-none focus:border-[#531B24] leading-relaxed resize-none"
        />

        {/* Confidence & Composure Rating */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="font-medium text-[#6A2931]">Composure Rating (1-10):</span>
          <div className="flex items-center space-x-1">
            {[4, 6, 8, 10].map((score) => (
              <button
                key={score}
                onClick={() => setConfidence(score)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                  confidence === score
                    ? 'bg-[#531B24] text-[#F3ECE2]'
                    : 'bg-[#FAF5EE] text-[#531B24] border border-[#C6B7A2]/60 hover:bg-[#C6B7A2]/30'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Heart className="w-4 h-4" />}
          <span>{isSaved ? 'Preserved in Persistent Memory' : 'Complete Challenge & Save Reflection'}</span>
        </button>
      </div>
    </div>
  );
}

