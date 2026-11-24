import { 
  UserProfile, 
  FitnessProfile, 
  WorkoutPlan, 
  DailyMentalChallenge, 
  MenstrualCycle, 
  MenstrualSymptomLog, 
  DailyTask, 
  TaskStatus, 
  UserMemory, 
  DailyCheckIn, 
  ProgressRecord 
} from '../types';
import { EXERCISE_DATABASE } from '../exercise-data/exercises';
import { MENTAL_CHALLENGE_LIBRARY } from '../mental-data/mental-library';

const STORAGE_KEYS = {
  PROFILE: 'wellness_profile',
  FITNESS: 'wellness_fitness',
  WORKOUTS: 'wellness_workouts',
  MENTAL_TODAY: 'wellness_mental_today',
  CYCLES: 'wellness_cycles',
  SYMPTOMS: 'wellness_symptoms',
  TASKS: 'wellness_tasks',
  MEMORY: 'wellness_memory',
  CHECKINS: 'wellness_checkins',
  PROGRESS: 'wellness_progress',
};

// Seed initial profile
const INITIAL_PROFILE: UserProfile = {
  id: 'usr-001',
  user_id: 'usr-001',
  full_name: '',
  preferred_name: '',
  email: '',
  client_encryption_enabled: true,
  has_completed_onboarding: false,
  created_at: new Date().toISOString(),
};

const INITIAL_FITNESS: FitnessProfile = {
  height_cm: 168,
  current_weight_kg: 64.2,
  target_weight_kg: 59.5,
  fitness_experience: 'intermediate',
  activity_level: 'moderately_active',
  available_exercise_mins: 40,
  workout_preference: 'home',
  exercise_preferences: ['bodyweight strength', 'pilates core', 'mobility flows'],
  injuries_and_limitations: ['mild right knee sensitivity on deep flexion'],
  mobility_limitations: ['tight hip flexors from desk work'],
  pain_areas: ['lumbar stiffness upon waking'],
  recovery_capacity: 8,
  typical_sleep_hours: 7.5,
  fitness_objectives: ['sustainable fat loss', 'core stability', 'glute activation', 'calm resilience'],
};

// Initial Seed Tasks for Today
const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    task_date: new Date().toISOString().split('T')[0],
    title: 'Morning Mindful Hydration & Lumbar Mobility',
    description: 'Drink 500ml warm water with lemon, followed by 5 mins Cat-Cow spinal breathing.',
    category: 'recovery',
    estimated_mins: 10,
    priority: 'high',
    status: 'completed',
    completed_at: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: 'task-2',
    task_date: new Date().toISOString().split('T')[0],
    title: 'Strength: Glute & Core Stability Circuit',
    description: 'Controlled bodyweight squats, glute bridges, and bird-dog sequence.',
    category: 'physical_health',
    estimated_mins: 30,
    priority: 'high',
    status: 'in_progress',
  },
  {
    id: 'task-3',
    task_date: new Date().toISOString().split('T')[0],
    title: 'Shugyō Discipline: 15-Minute Screen Stillness',
    description: 'Leave phone outside bedroom. Practice uninterrupted presence and posture.',
    category: 'mental_development',
    estimated_mins: 15,
    priority: 'medium',
    status: 'not_started',
  },
  {
    id: 'task-4',
    task_date: new Date().toISOString().split('T')[0],
    title: 'Cycle Health: Log Mid-Cycle Energy & Hydration',
    description: 'Observe follicular energy changes and note any physical symptoms.',
    category: 'menstrual_wellness',
    estimated_mins: 5,
    priority: 'medium',
    status: 'not_started',
  },
  {
    id: 'task-5',
    task_date: new Date().toISOString().split('T')[0],
    title: 'Evening Reflection & Seiza Posture Breathing',
    description: '4 minutes seated breathing on cushion, followed by 3 gratitude notes.',
    category: 'personal_habit',
    estimated_mins: 10,
    priority: 'low',
    status: 'not_started',
  }
];

// Initial Seed Today Workout
const INITIAL_WORKOUT: WorkoutPlan = {
  id: 'workout-today',
  plan_date: new Date().toISOString().split('T')[0],
  title: 'Lower Body Alignment & Deep Core Integration',
  objective: 'Reactivate dormant glute fibers, protect right knee alignment, and cultivate rotational core endurance.',
  focus_category: 'strength',
  estimated_duration_mins: 35,
  status: 'in_progress',
  is_adaptive_modification: true,
  adaptive_rationale: 'Adapted for mild right knee sensitivity: eliminated weighted jump lunges in favor of controlled glute bridges and bird-dog alignment.',
  cycle_phase_adapted: true,
  exercises: [
    {
      id: 'plan-item-1',
      exercise_id: 'ex-cat-cow',
      exercise: EXERCISE_DATABASE.find(e => e.id === 'ex-cat-cow')!,
      exercise_order: 1,
      target_sets: 2,
      target_reps: 10,
      target_rest_seconds: 30,
      actual_sets: 2,
      actual_reps: 10,
      actual_duration_seconds: 180,
      rpe_difficulty: 3,
      discomfort_level: 0,
      status: 'completed'
    },
    {
      id: 'plan-item-2',
      exercise_id: 'ex-squat',
      exercise: EXERCISE_DATABASE.find(e => e.id === 'ex-squat')!,
      exercise_order: 2,
      target_sets: 3,
      target_reps: 12,
      target_rest_seconds: 60,
      actual_sets: 1,
      actual_reps: 12,
      actual_duration_seconds: 90,
      rpe_difficulty: 6,
      discomfort_level: 1,
      discomfort_notes: 'Kept depth to parallel; knee felt solid with toes flared 20°.',
      status: 'in_progress'
    },
    {
      id: 'plan-item-3',
      exercise_id: 'ex-glute-bridge',
      exercise: EXERCISE_DATABASE.find(e => e.id === 'ex-glute-bridge')!,
      exercise_order: 3,
      target_sets: 3,
      target_reps: 15,
      target_rest_seconds: 45,
      actual_sets: 0,
      actual_reps: 0,
      actual_duration_seconds: 0,
      discomfort_level: 0,
      status: 'not_started'
    },
    {
      id: 'plan-item-4',
      exercise_id: 'ex-bird-dog',
      exercise: EXERCISE_DATABASE.find(e => e.id === 'ex-bird-dog')!,
      exercise_order: 4,
      target_sets: 3,
      target_reps: 10,
      target_rest_seconds: 45,
      actual_sets: 0,
      actual_reps: 0,
      actual_duration_seconds: 0,
      discomfort_level: 0,
      status: 'not_started'
    },
    {
      id: 'plan-item-5',
      exercise_id: 'ex-childs-pose',
      exercise: EXERCISE_DATABASE.find(e => e.id === 'ex-childs-pose')!,
      exercise_order: 5,
      target_sets: 1,
      target_reps: 1,
      target_duration_seconds: 90,
      target_rest_seconds: 0,
      actual_sets: 0,
      actual_reps: 0,
      actual_duration_seconds: 0,
      discomfort_level: 0,
      status: 'not_started'
    }
  ]
};

// Initial Seed Today Mental Challenge
const INITIAL_MENTAL: DailyMentalChallenge = {
  id: 'mental-today',
  challenge_date: new Date().toISOString().split('T')[0],
  challenge: MENTAL_CHALLENGE_LIBRARY.find(c => c.id === 'men-shugyo')!,
  status: 'in_progress',
  reflection_notes: 'Approaching today’s physical training with zero phone distractions. Treating each rep as deliberate practice.',
  confidence_rating: 8,
  stress_after: 3,
  time_spent_mins: 15,
};

// Seed Menstrual Cycles (Previous 3 cycles)
const INITIAL_CYCLES: MenstrualCycle[] = [
  {
    id: 'cycle-1',
    period_start_date: new Date(Date.now() - 68 * 86400000).toISOString().split('T')[0],
    period_end_date: new Date(Date.now() - 63 * 86400000).toISOString().split('T')[0],
    cycle_length_days: 28,
    period_duration_days: 5,
    is_prediction: false,
  },
  {
    id: 'cycle-2',
    period_start_date: new Date(Date.now() - 40 * 86400000).toISOString().split('T')[0],
    period_end_date: new Date(Date.now() - 35 * 86400000).toISOString().split('T')[0],
    cycle_length_days: 29,
    period_duration_days: 5,
    is_prediction: false,
  },
  {
    id: 'cycle-3',
    period_start_date: new Date(Date.now() - 11 * 86400000).toISOString().split('T')[0],
    period_end_date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    cycle_length_days: 28,
    period_duration_days: 5,
    is_prediction: false,
    estimated_ovulation_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    estimated_fertile_window_start: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    estimated_fertile_window_end: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
  }
];

// Seed Database-backed AI Memories (Persistent facts that survive model switches)
const INITIAL_MEMORY: UserMemory[] = [
  {
    id: 'mem-1',
    category: 'physical_limitation',
    memory_key: 'Right Knee Sensitivity',
    memory_value: 'Avoid deep plyometric landings and weighted lunges past 90 degrees. Prefers squats with feet flared 20 degrees.',
    confidence_score: 0.98,
    source_type: 'fitness_assessment',
    verified_by_user: true,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'mem-2',
    category: 'recovery_pattern',
    memory_key: 'Morning Lumbar Tightness',
    memory_value: 'Benefits significantly from 5 mins of Cat-Cow and Child Pose prior to lower body resistance exercises.',
    confidence_score: 0.95,
    source_type: 'daily_checkin',
    verified_by_user: true,
    created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'mem-3',
    category: 'menstrual_correlation',
    memory_key: 'Follicular Energy Peak',
    memory_value: 'Consistently reports higher strength and enthusiasm around cycle day 10-14. Prime window for progressive resistance overload.',
    confidence_score: 0.92,
    source_type: 'cycle_analytics',
    verified_by_user: true,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mem-4',
    category: 'mental_reflection',
    memory_key: 'Digital Boundary Success',
    memory_value: 'Responds best to 15-minute phone-free morning stillness rather than prolonged 45-minute meditation sitting.',
    confidence_score: 0.90,
    source_type: 'mental_reflection',
    verified_by_user: true,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Seed Historical Progress Records
const INITIAL_PROGRESS: ProgressRecord[] = [
  { record_date: '2026-11-01', weight_kg: 65.8, weight_moving_avg_7d: 65.8, total_workout_mins: 35, total_mental_mins: 15, total_recovery_mins: 10, volume_load_kg: 1200, consistency_score: 85 },
  { record_date: '2026-11-05', weight_kg: 65.4, weight_moving_avg_7d: 65.5, total_workout_mins: 40, total_mental_mins: 20, total_recovery_mins: 15, volume_load_kg: 1400, consistency_score: 90 },
  { record_date: '2026-11-10', weight_kg: 65.0, weight_moving_avg_7d: 65.1, total_workout_mins: 30, total_mental_mins: 15, total_recovery_mins: 20, volume_load_kg: 1100, consistency_score: 80 },
  { record_date: '2026-11-15', weight_kg: 64.7, weight_moving_avg_7d: 64.8, total_workout_mins: 45, total_mental_mins: 25, total_recovery_mins: 15, volume_load_kg: 1650, consistency_score: 95 },
  { record_date: '2026-11-20', weight_kg: 64.4, weight_moving_avg_7d: 64.5, total_workout_mins: 35, total_mental_mins: 15, total_recovery_mins: 10, volume_load_kg: 1500, consistency_score: 90 },
  { record_date: '2026-11-23', weight_kg: 64.2, weight_moving_avg_7d: 64.3, total_workout_mins: 35, total_mental_mins: 20, total_recovery_mins: 15, volume_load_kg: 1550, consistency_score: 92 },
];

export class StorageService {
  private static isBrowser = typeof window !== 'undefined';

  private static getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser) return defaultValue;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save key ${key} to storage`, e);
    }
  }

  // User Profile & Fitness
  static getProfile(): UserProfile {
    return this.getItem(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  }

  static updateProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    this.setItem(STORAGE_KEYS.PROFILE, updated);
    return updated;
  }

  static getFitness(): FitnessProfile {
    return this.getItem(STORAGE_KEYS.FITNESS, INITIAL_FITNESS);
  }

  static updateFitness(profile: Partial<FitnessProfile>): FitnessProfile {
    const current = this.getFitness();
    const updated = { ...current, ...profile };
    this.setItem(STORAGE_KEYS.FITNESS, updated);
    return updated;
  }

  // Daily Tasks
  static getTasks(): DailyTask[] {
    return this.getItem(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  }

  static toggleTask(taskId: string): DailyTask[] {
    const tasks = this.getTasks();
    const updated = tasks.map(task => {
      if (task.id === taskId) {
        const nextStatus: TaskStatus = task.status === 'completed' ? 'not_started' : 'completed';
        return {
          ...task,
          status: nextStatus,
          completed_at: nextStatus === 'completed' ? new Date().toISOString() : undefined,
        };
      }
      return task;
    });
    this.setItem(STORAGE_KEYS.TASKS, updated);
    return updated;
  }

  // Workouts
  static getTodayWorkout(): WorkoutPlan {
    return this.getItem(STORAGE_KEYS.WORKOUTS, INITIAL_WORKOUT);
  }

  static updateExerciseCompletion(
    planItemId: string,
    updates: Partial<{
      actual_sets: number;
      actual_reps: number;
      actual_duration_seconds: number;
      rpe_difficulty: number;
      discomfort_level: number;
      discomfort_notes: string;
      status: WorkoutPlan['exercises'][0]['status'];
    }>
  ): WorkoutPlan {
    const workout = this.getTodayWorkout();
    const updatedExercises = workout.exercises.map(item => {
      if (item.id === planItemId) {
        return { ...item, ...updates };
      }
      return item;
    });

    const allCompleted = updatedExercises.every(e => e.status === 'completed' || e.status === 'skipped');
    const anyInProgress = updatedExercises.some(e => e.status === 'in_progress' || e.status === 'completed');

    const updatedWorkout: WorkoutPlan = {
      ...workout,
      exercises: updatedExercises,
      status: allCompleted ? 'completed' : anyInProgress ? 'in_progress' : 'not_started',
    };

    this.setItem(STORAGE_KEYS.WORKOUTS, updatedWorkout);
    return updatedWorkout;
  }

  // Mental Challenges
  static getTodayMental(): DailyMentalChallenge {
    return this.getItem(STORAGE_KEYS.MENTAL_TODAY, INITIAL_MENTAL);
  }

  static updateTodayMental(updates: Partial<DailyMentalChallenge>): DailyMentalChallenge {
    const current = this.getTodayMental();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.MENTAL_TODAY, updated);

    // If reflection or rating saved, update AI Memory
    if (updates.reflection_notes) {
      this.saveMemory(
        'mental_reflection',
        `Reflection on ${current.challenge.title}`,
        updates.reflection_notes,
        'mental_challenge'
      );
    }

    return updated;
  }

  // Menstrual Cycles & Symptoms
  static getCycles(): MenstrualCycle[] {
    return this.getItem(STORAGE_KEYS.CYCLES, INITIAL_CYCLES);
  }

  static getSymptoms(): MenstrualSymptomLog[] {
    return this.getItem(STORAGE_KEYS.SYMPTOMS, []);
  }

  static logSymptom(symptom: Omit<MenstrualSymptomLog, 'id'>): MenstrualSymptomLog {
    const logs = this.getSymptoms();
    const newLog: MenstrualSymptomLog = {
      ...symptom,
      id: `sym-${Date.now()}`,
    };
    const updated = [newLog, ...logs.filter(l => l.log_date !== symptom.log_date)];
    this.setItem(STORAGE_KEYS.SYMPTOMS, updated);
    return newLog;
  }

  // AI Persistent Memory Engine
  static getMemories(): UserMemory[] {
    return this.getItem(STORAGE_KEYS.MEMORY, INITIAL_MEMORY);
  }

  static saveMemory(
    category: UserMemory['category'],
    key: string,
    value: string,
    source: string
  ): UserMemory[] {
    const memories = this.getMemories();
    const existingIndex = memories.findIndex(m => m.category === category && m.memory_key.toLowerCase() === key.toLowerCase());

    const newRecord: UserMemory = {
      id: `mem-${Date.now()}`,
      category,
      memory_key: key,
      memory_value: value,
      confidence_score: 0.95,
      source_type: source,
      verified_by_user: true,
      created_at: existingIndex >= 0 ? memories[existingIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let updated: UserMemory[];
    if (existingIndex >= 0) {
      updated = [...memories];
      updated[existingIndex] = newRecord;
    } else {
      updated = [newRecord, ...memories];
    }

    this.setItem(STORAGE_KEYS.MEMORY, updated);
    return updated;
  }

  static deleteMemory(id: string): UserMemory[] {
    const memories = this.getMemories().filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.MEMORY, memories);
    return memories;
  }

  // Progress Records
  static getProgressRecords(): ProgressRecord[] {
    return this.getItem(STORAGE_KEYS.PROGRESS, INITIAL_PROGRESS);
  }

  static logWeight(weight: number): ProgressRecord[] {
    const records = this.getProgressRecords();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate simple moving average of last 7 records
    const recentWeights = records.slice(0, 6).map(r => r.weight_kg);
    const avg = Math.round(((recentWeights.reduce((a, b) => a + b, 0) + weight) / (recentWeights.length + 1)) * 10) / 10;

    const newRecord: ProgressRecord = {
      record_date: todayStr,
      weight_kg: weight,
      weight_moving_avg_7d: avg,
      total_workout_mins: 35,
      total_mental_mins: 20,
      total_recovery_mins: 15,
      volume_load_kg: 1550,
      consistency_score: 92,
    };

    const updated = [newRecord, ...records.filter(r => r.record_date !== todayStr)];
    this.setItem(STORAGE_KEYS.PROGRESS, updated);

    // Save to fitness profile as well
    this.updateFitness({ current_weight_kg: weight });
    return updated;
  }

  // Full Data Export for Privacy
  static exportAllData(): string {
    const exportObject = {
      exported_at: new Date().toISOString(),
      user_profile: this.getProfile(),
      fitness_profile: this.getFitness(),
      daily_tasks: this.getTasks(),
      workout_plan: this.getTodayWorkout(),
      mental_challenge: this.getTodayMental(),
      menstrual_cycles: this.getCycles(),
      menstrual_symptoms: this.getSymptoms(),
      ai_memories: this.getMemories(),
      progress_history: this.getProgressRecords(),
    };
    return JSON.stringify(exportObject, null, 2);
  }

  // Complete Reset / Delete
  static clearAllData(): void {
    if (!this.isBrowser) return;
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }
}

