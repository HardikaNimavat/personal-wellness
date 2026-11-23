'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, Dumbbell, AlertCircle, ChevronRight, Play } from 'lucide-react';
import { WorkoutPlan, ExercisePlanItem, TaskStatus } from '@/lib/types';
import { ExerciseDemoPlayer } from './ExerciseDemoPlayer';

interface WorkoutLoggerProps {
  workout: WorkoutPlan;
  onUpdateExercise: (planItemId: string, updates: Partial<ExercisePlanItem>) => void;
}

export function WorkoutLogger({ workout, onUpdateExercise }: WorkoutLoggerProps) {
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(
    workout.exercises[0]?.id || null
  );

  const activeItem = workout.exercises.find((e) => e.id === activeExerciseId) || workout.exercises[0];

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <span className="bg-[#531B24] text-[#F3ECE2] text-[10px] font-bold px-2 py-0.5 rounded-full">Completed</span>;
      case 'in_progress':
        return <span className="bg-[#6A2931] text-[#F3ECE2] text-[10px] font-bold px-2 py-0.5 rounded-full">In Progress</span>;
      case 'partially_completed':
        return <span className="bg-[#C6B7A2] text-[#531B24] text-[10px] font-bold px-2 py-0.5 rounded-full">Partial</span>;
      case 'skipped':
        return <span className="bg-[#FAF5EE] text-[#6A2931]/70 border border-[#C6B7A2] text-[10px] font-medium px-2 py-0.5 rounded-full">Skipped</span>;
      default:
        return <span className="bg-[#FAF5EE] text-[#531B24]/70 border border-[#C6B7A2]/50 text-[10px] font-medium px-2 py-0.5 rounded-full">Pending</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Active Workout Header */}
      <div className="bg-[#E7D8C3] p-4 rounded-2xl border border-[#C6B7A2]/50 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931]">
                Target: {workout.focus_category}
              </span>
              {workout.cycle_phase_adapted && (
                <span className="text-[10px] font-semibold text-[#531B24] bg-[#F3ECE2] px-2 py-0.5 rounded-full border border-[#C6B7A2]/40">
                  Cycle Harmonized
                </span>
              )}
            </div>
            <h2 className="text-lg font-serif font-bold text-[#531B24] mt-1">
              {workout.title}
            </h2>
          </div>
          <div className="flex items-center space-x-1 text-xs font-semibold text-[#6A2931] bg-[#F3ECE2] px-2.5 py-1 rounded-full border border-[#C6B7A2]/40">
            <Clock className="w-3.5 h-3.5" />
            <span>{workout.estimated_duration_mins} min</span>
          </div>
        </div>

        {/* Adaptive Rationale Notice */}
        {workout.adaptive_rationale && (
          <div className="mt-3 bg-[#FAF5EE] p-2.5 rounded-xl border border-[#C6B7A2]/50 text-xs text-[#531B24]">
            <p className="font-semibold text-[#6A2931] mb-0.5 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#6A2931]" />
              <span>Personalized Adaptation Note</span>
            </p>
            <p className="leading-relaxed opacity-90">{workout.adaptive_rationale}</p>
          </div>
        )}
      </div>

      {/* Interactive Biomechanical Demonstration Player */}
      {activeItem && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931]">
              Movement Demonstration & Biomechanics
            </h3>
            <span className="text-xs font-serif italic text-[#531B24]">
              {activeItem.exercise.name}
            </span>
          </div>
          <ExerciseDemoPlayer exercise={activeItem.exercise} />
        </div>
      )}

      {/* Exercise Checklist & Performance Logger */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A2931] px-1">
          Workout Sequence ({workout.exercises.filter(e => e.status === 'completed').length}/{workout.exercises.length} Completed)
        </h3>

        {workout.exercises.map((item, index) => {
          const isSelected = item.id === activeItem?.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl transition-all border ${
                isSelected
                  ? 'bg-[#E7D8C3] border-[#6A2931] shadow-sm'
                  : 'bg-[#FAF5EE] border-[#C6B7A2]/40 hover:border-[#C6B7A2]'
              } p-3.5`}
            >
              <div className="flex items-start justify-between cursor-pointer" onClick={() => setActiveExerciseId(item.id)}>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#531B24] text-[#F3ECE2] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#531B24]">
                      {item.exercise.name}
                    </h4>
                    <p className="text-xs text-[#6A2931] mt-0.5">
                      {item.target_sets} sets × {item.target_reps ? `${item.target_reps} reps` : `${item.target_duration_seconds}s`} • Rest {item.target_rest_seconds}s
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusBadge(item.status)}
                  <ChevronRight className={`w-4 h-4 text-[#C6B7A2] transition-transform ${isSelected ? 'rotate-90 text-[#531B24]' : ''}`} />
                </div>
              </div>

              {/* Expanded Performance Input when Selected */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-[#C6B7A2]/50 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6A2931] block mb-1">
                        Completed Sets
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={item.actual_sets}
                        onChange={(e) => onUpdateExercise(item.id, { actual_sets: Number(e.target.value) })}
                        className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg px-2.5 py-1.5 text-xs text-[#531B24] focus:outline-none focus:border-[#531B24]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6A2931] block mb-1">
                        Total Reps Completed
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.actual_reps}
                        onChange={(e) => onUpdateExercise(item.id, { actual_reps: Number(e.target.value) })}
                        className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg px-2.5 py-1.5 text-xs text-[#531B24] focus:outline-none focus:border-[#531B24]"
                      />
                    </div>
                  </div>

                  {/* Difficulty & Discomfort */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6A2931] block mb-1">
                        Effort RPE (1-10)
                      </label>
                      <select
                        value={item.rpe_difficulty || 5}
                        onChange={(e) => onUpdateExercise(item.id, { rpe_difficulty: Number(e.target.value) })}
                        className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg px-2 py-1.5 text-xs text-[#531B24] focus:outline-none"
                      >
                        <option value={3}>3 - Very Easy</option>
                        <option value={5}>5 - Moderate</option>
                        <option value={7}>7 - Challenging</option>
                        <option value={8}>8 - Hard</option>
                        <option value={9}>9 - Near Limit</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#6A2931] block mb-1">
                        Discomfort / Pain (0-10)
                      </label>
                      <select
                        value={item.discomfort_level}
                        onChange={(e) => onUpdateExercise(item.id, { discomfort_level: Number(e.target.value) })}
                        className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg px-2 py-1.5 text-xs text-[#531B24] focus:outline-none"
                      >
                        <option value={0}>0 - None (Optimal)</option>
                        <option value={1}>1 - Slight awareness</option>
                        <option value={3}>3 - Mild tightness</option>
                        <option value={6}>6 - Discomfort (Flag AI)</option>
                      </select>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => onUpdateExercise(item.id, {
                        status: 'completed',
                        actual_sets: item.actual_sets || item.target_sets,
                        actual_reps: item.actual_reps || (item.target_reps || 10) * item.target_sets
                      })}
                      className="flex-1 bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>

                    <button
                      onClick={() => onUpdateExercise(item.id, { status: 'skipped' })}
                      className="px-3 py-2 bg-[#FAF5EE] hover:bg-[#C6B7A2]/30 text-[#6A2931] border border-[#C6B7A2] text-xs font-medium rounded-xl transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

