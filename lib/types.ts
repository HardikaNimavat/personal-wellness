// ==============================================================================
// CORE DOMAIN TYPES & DATABASE ENTITIES
// ==============================================================================

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'athlete';
export type WorkoutPreference = 'home' | 'gym' | 'hybrid' | 'outdoors';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'partially_completed' | 'skipped';

export type MuscleGroup = 
  | 'quadriceps' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'core' 
  | 'full_body' 
  | 'hip_flexors'
  | 'neck';

export type ExerciseCategory = 
  | 'warmup' 
  | 'strength' 
  | 'cardio' 
  | 'core' 
  | 'flexibility' 
  | 'yoga' 
  | 'cooldown' 
  | 'recovery';

export type DifficultyLevel = 'gentle' | 'beginner' | 'intermediate' | 'advanced';

export type ChallengeOrigin = 
  | 'japanese_philosophy' 
  | 'stoicism' 
  | 'cbt_psychology' 
  | 'mindfulness' 
  | 'habit_science' 
  | 'emotional_intelligence' 
  | 'communication';

export type FlowIntensity = 'none' | 'spotting' | 'light' | 'medium' | 'heavy';

export type MemoryCategory = 
  | 'fitness_preference' 
  | 'physical_limitation' 
  | 'recovery_pattern' 
  | 'mental_reflection' 
  | 'menstrual_correlation' 
  | 'user_feedback' 
  | 'milestone' 
  | 'habit';

export type TaskCategory = 
  | 'physical_health' 
  | 'mental_development' 
  | 'menstrual_wellness' 
  | 'recovery' 
  | 'personal_habit';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  preferred_name: string;
  email: string;
  client_encryption_enabled: boolean;
  created_at: string;
}

export interface FitnessProfile {
  height_cm: number;
  current_weight_kg: number;
  target_weight_kg: number;
  fitness_experience: FitnessLevel;
  activity_level: ActivityLevel;
  available_exercise_mins: number;
  workout_preference: WorkoutPreference;
  exercise_preferences: string[];
  injuries_and_limitations: string[];
  mobility_limitations: string[];
  pain_areas: string[];
  recovery_capacity: number;
  typical_sleep_hours: number;
  fitness_objectives: string[];
}

export interface ExerciseBiomechanicalFrame {
  timePercent: number; // 0 to 100
  phase: 'start' | 'eccentric' | 'inflection' | 'concentric' | 'finish';
  jointAngles: {
    hip: number;
    knee: number;
    ankle: number;
    shoulder: number;
    elbow: number;
    spine: number;
  };
  tensionMuscles: MuscleGroup[];
  formCue: string;
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  category: ExerciseCategory;
  primary_muscles: MuscleGroup[];
  secondary_muscles: MuscleGroup[];
  difficulty: DifficultyLevel;
  equipment: string[];
  kinetic_animation_id: string;
  correct_posture: string;
  instructions: string[];
  target_cues: string[];
  common_mistakes: string[];
  safety_instructions: string[];
  default_sets: number;
  default_reps: number;
  default_duration_seconds?: number;
  default_rest_seconds: number;
  frames: ExerciseBiomechanicalFrame[];
}

export interface WorkoutPlan {
  id: string;
  plan_date: string;
  title: string;
  objective: string;
  focus_category: ExerciseCategory;
  estimated_duration_mins: number;
  status: TaskStatus;
  is_adaptive_modification: boolean;
  adaptive_rationale?: string;
  cycle_phase_adapted: boolean;
  exercises: ExercisePlanItem[];
}

export interface ExercisePlanItem {
  id: string;
  exercise_id: string;
  exercise: Exercise;
  exercise_order: number;
  target_sets: number;
  target_reps?: number;
  target_duration_seconds?: number;
  target_rest_seconds: number;
  actual_sets: number;
  actual_reps: number;
  actual_duration_seconds: number;
  rpe_difficulty?: number;
  discomfort_level: number;
  discomfort_notes?: string;
  status: TaskStatus;
}

export interface MentalChallengeItem {
  id: string;
  title: string;
  slug: string;
  original_term?: string;
  origin_system: ChallengeOrigin;
  cultural_context: string;
  purpose: string;
  instructions: string[];
  estimated_duration_mins: number;
  difficulty: DifficultyLevel;
  benefits: string[];
  potential_risks: string[];
  is_evidence_based: boolean;
  verification_source: string;
  tags: string[];
}

export interface DailyMentalChallenge {
  id: string;
  challenge_date: string;
  challenge: MentalChallengeItem;
  status: TaskStatus;
  reflection_notes?: string;
  confidence_rating?: number;
  stress_after?: number;
  time_spent_mins?: number;
  completed_at?: string;
}

export interface MenstrualCycle {
  id: string;
  period_start_date: string;
  period_end_date?: string;
  cycle_length_days?: number;
  period_duration_days?: number;
  is_prediction: boolean;
  estimated_ovulation_date?: string;
  estimated_fertile_window_start?: string;
  estimated_fertile_window_end?: string;
  notes?: string;
}

export interface MenstrualSymptomLog {
  id: string;
  log_date: string;
  flow_intensity: FlowIntensity;
  cramps_severity: number;
  pain_severity: number;
  mood_tags: string[];
  energy_level: number;
  sleep_quality: number;
  physical_symptoms: string[];
  encrypted_payload?: string;
}

export interface DailyCheckIn {
  id: string;
  checkin_date: string;
  sleep_quality: number; // 1-10
  energy_level: number; // 1-10
  current_mood: number; // 1-10
  soreness_level: number; // 0-10
  stress_level: number; // 1-10
  available_time_mins: number;
  menstrual_symptoms_present: boolean;
  motivation_level: number; // 1-10
  checkin_notes?: string;
}

export interface DailyTask {
  id: string;
  task_date: string;
  title: string;
  description?: string;
  category: TaskCategory;
  estimated_mins: number;
  actual_mins?: number;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  related_entity_id?: string;
  notes?: string;
  completed_at?: string;
}

export interface UserMemory {
  id: string;
  category: MemoryCategory;
  memory_key: string;
  memory_value: string;
  confidence_score: number;
  source_type: string;
  source_id?: string;
  verified_by_user: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgressRecord {
  record_date: string;
  weight_kg: number;
  weight_moving_avg_7d: number;
  total_workout_mins: number;
  total_mental_mins: number;
  total_recovery_mins: number;
  volume_load_kg: number;
  consistency_score: number;
  notes?: string;
}

