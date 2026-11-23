'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { WorkoutLogger } from '@/components/body/WorkoutLogger';
import { StorageService } from '@/lib/db/mock-storage';
import { EXERCISE_DATABASE } from '@/lib/exercise-data/exercises';
import { WorkoutPlan, ExercisePlanItem, Exercise } from '@/lib/types';
import { Dumbbell, Shield, Sparkles, Filter } from 'lucide-react';
import { ExerciseDemoPlayer } from '@/components/body/ExerciseDemoPlayer';

export default function BodyPage() {
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'library'>('today');

  useEffect(() => {
    setWorkout(StorageService.getTodayWorkout());
  }, []);

  const handleUpdateExercise = (planItemId: string, updates: Partial<ExercisePlanItem>) => {
    const updated = StorageService.updateExerciseCompletion(planItemId, updates);
    setWorkout(updated);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2]">
      <Header title="PHYSICAL BODY" subtitle="Adaptive Strength & Biomechanical Alignment" />

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
            Today&apos;s Workout
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'library'
                ? 'bg-[#531B24] text-[#F3ECE2] shadow-sm'
                : 'text-[#531B24] hover:text-[#6A2931]'
            }`}
          >
            Movement Library ({EXERCISE_DATABASE.length})
          </button>
        </div>

        {activeTab === 'today' && workout && (
          <WorkoutLogger
            workout={workout}
            onUpdateExercise={handleUpdateExercise}
          />
        )}

        {activeTab === 'library' && (
          <div className="space-y-4">
            {/* Modal / Inspector for selected exercise */}
            {selectedLibraryExercise && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
                    Selected Demonstration
                  </h3>
                  <button
                    onClick={() => setSelectedLibraryExercise(null)}
                    className="text-xs text-[#531B24] underline font-medium"
                  >
                    Close Preview
                  </button>
                </div>
                <ExerciseDemoPlayer exercise={selectedLibraryExercise} />
              </div>
            )}

            {/* Exercise List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] px-1">
                Biomechanical Exercise Database
              </h3>

              {EXERCISE_DATABASE.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => setSelectedLibraryExercise(exercise)}
                  className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#C6B7A2]/40 hover:border-[#6A2931] transition-all cursor-pointer shadow-sm flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A2931] bg-[#E7D8C3] px-2 py-0.5 rounded-full">
                        {exercise.category}
                      </span>
                      <span className="text-[10px] font-medium text-[#531B24]">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#531B24]">
                      {exercise.name}
                    </h4>
                    <p className="text-xs text-[#531B24]/80 line-clamp-1">
                      {exercise.correct_posture}
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold text-[#531B24] bg-[#E7D8C3] px-2.5 py-1 rounded-xl flex-shrink-0 ml-2 mt-1">
                    View Motion
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

