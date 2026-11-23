-- ==============================================================================
-- PERSONAL AI-POWERED TRANSFORMATION & WELLNESS PLATFORM
-- PRODUCTION POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. USER PROFILES & PRIVACY PREFERENCES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    preferred_name TEXT,
    email TEXT,
    date_of_birth DATE,
    timezone TEXT DEFAULT 'UTC',
    avatar_url TEXT,
    client_encryption_enabled BOOLEAN DEFAULT false,
    client_encryption_salt TEXT,
    data_retention_days INT DEFAULT 3650,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. FITNESS PROFILES & HEALTH PREFERENCES
-- ------------------------------------------------------------------------------
CREATE TYPE fitness_level_enum AS ENUM ('beginner', 'intermediate', 'advanced', 'athlete');
CREATE TYPE workout_preference_enum AS ENUM ('home', 'gym', 'hybrid', 'outdoors');
CREATE TYPE activity_level_enum AS ENUM ('sedentary', 'lightly_active', 'moderately_active', 'very_active');

CREATE TABLE IF NOT EXISTS public.fitness_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    height_cm NUMERIC(5, 2) NOT NULL,
    current_weight_kg NUMERIC(5, 2) NOT NULL,
    target_weight_kg NUMERIC(5, 2) NOT NULL,
    fitness_experience fitness_level_enum DEFAULT 'beginner',
    activity_level activity_level_enum DEFAULT 'moderately_active',
    available_exercise_mins INT DEFAULT 45,
    workout_preference workout_preference_enum DEFAULT 'home',
    exercise_preferences TEXT[] DEFAULT '{}',
    injuries_and_limitations TEXT[] DEFAULT '{}',
    mobility_limitations TEXT[] DEFAULT '{}',
    pain_areas TEXT[] DEFAULT '{}',
    recovery_capacity INT CHECK (recovery_capacity BETWEEN 1 AND 10) DEFAULT 7,
    typical_sleep_hours NUMERIC(3, 1) DEFAULT 7.5,
    fitness_objectives TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. EXERCISE MASTER LIBRARY
-- ------------------------------------------------------------------------------
CREATE TYPE muscle_group_enum AS ENUM (
    'quadriceps', 'hamstrings', 'glutes', 'calves', 'chest', 'back', 
    'shoulders', 'biceps', 'triceps', 'core', 'full_body', 'hip_flexors'
);
CREATE TYPE exercise_category_enum AS ENUM (
    'warmup', 'strength', 'cardio', 'core', 'flexibility', 'yoga', 'cooldown', 'recovery'
);
CREATE TYPE difficulty_level_enum AS ENUM ('gentle', 'beginner', 'intermediate', 'advanced');

CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    category exercise_category_enum NOT NULL,
    primary_muscles muscle_group_enum[] NOT NULL,
    secondary_muscles muscle_group_enum[] DEFAULT '{}',
    difficulty difficulty_level_enum DEFAULT 'beginner',
    equipment TEXT[] DEFAULT '{"bodyweight"}',
    kinetic_animation_id TEXT NOT NULL, -- references vector / Lottie / biomechanical frames
    correct_posture TEXT NOT NULL,
    instructions TEXT[] NOT NULL,
    target_cues TEXT[] NOT NULL,
    common_mistakes TEXT[] NOT NULL,
    safety_instructions TEXT[] NOT NULL,
    default_sets INT DEFAULT 3,
    default_reps INT DEFAULT 10,
    default_duration_seconds INT,
    default_rest_seconds INT DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. DAILY WORKOUT PLANS & DETAILED EXERCISE COMPLETIONS
-- ------------------------------------------------------------------------------
CREATE TYPE task_status_enum AS ENUM ('not_started', 'in_progress', 'completed', 'partially_completed', 'skipped');

CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    plan_date DATE NOT NULL,
    title TEXT NOT NULL,
    objective TEXT NOT NULL,
    focus_category exercise_category_enum NOT NULL,
    estimated_duration_mins INT NOT NULL,
    status task_status_enum DEFAULT 'not_started',
    is_adaptive_modification BOOLEAN DEFAULT false,
    adaptive_rationale TEXT,
    cycle_phase_adapted BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, plan_date)
);

CREATE TABLE IF NOT EXISTS public.exercise_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    exercise_order INT NOT NULL,
    target_sets INT NOT NULL,
    target_reps INT,
    target_duration_seconds INT,
    target_rest_seconds INT,
    actual_sets INT DEFAULT 0,
    actual_reps INT DEFAULT 0,
    actual_duration_seconds INT DEFAULT 0,
    rpe_difficulty INT CHECK (rpe_difficulty BETWEEN 1 AND 10),
    discomfort_level INT CHECK (discomfort_level BETWEEN 0 AND 10) DEFAULT 0,
    discomfort_notes TEXT,
    status task_status_enum DEFAULT 'not_started',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. MENTAL DEVELOPMENT & PHILOSOPHICAL CHALLENGE LIBRARY
-- ------------------------------------------------------------------------------
CREATE TYPE challenge_origin_enum AS ENUM (
    'japanese_philosophy', 'stoicism', 'cbt_psychology', 'mindfulness', 
    'habit_science', 'emotional_intelligence', 'communication'
);

CREATE TABLE IF NOT EXISTS public.challenge_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    original_term TEXT, -- e.g. '修行 (Shugyō)'
    origin_system challenge_origin_enum NOT NULL,
    cultural_context TEXT NOT NULL,
    purpose TEXT NOT NULL,
    instructions TEXT[] NOT NULL,
    estimated_duration_mins INT NOT NULL,
    difficulty difficulty_level_enum DEFAULT 'beginner',
    benefits TEXT[] NOT NULL,
    potential_risks TEXT[] DEFAULT '{}',
    is_evidence_based BOOLEAN DEFAULT true,
    verification_source TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.mental_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    challenge_date DATE NOT NULL,
    challenge_id UUID NOT NULL REFERENCES public.challenge_library(id),
    status task_status_enum DEFAULT 'not_started',
    reflection_notes TEXT, -- supports client-side encryption
    confidence_rating INT CHECK (confidence_rating BETWEEN 1 AND 10),
    stress_after INT CHECK (stress_after BETWEEN 1 AND 10),
    time_spent_mins INT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, challenge_date)
);

-- ------------------------------------------------------------------------------
-- 6. MENSTRUAL HEALTH & SYMPTOM TRACKER (ENCRYPTED / HIGH PRIVACY)
-- ------------------------------------------------------------------------------
CREATE TYPE flow_intensity_enum AS ENUM ('none', 'spotting', 'light', 'medium', 'heavy');

CREATE TABLE IF NOT EXISTS public.menstrual_cycles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    period_start_date DATE NOT NULL,
    period_end_date DATE,
    cycle_length_days INT,
    period_duration_days INT,
    is_prediction BOOLEAN DEFAULT false,
    estimated_ovulation_date DATE,
    estimated_fertile_window_start DATE,
    estimated_fertile_window_end DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.menstrual_symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    flow_intensity flow_intensity_enum DEFAULT 'none',
    cramps_severity INT CHECK (cramps_severity BETWEEN 0 AND 10) DEFAULT 0,
    pain_severity INT CHECK (pain_severity BETWEEN 0 AND 10) DEFAULT 0,
    mood_tags TEXT[] DEFAULT '{}',
    energy_level INT CHECK (energy_level BETWEEN 1 AND 10) DEFAULT 7,
    sleep_quality INT CHECK (sleep_quality BETWEEN 1 AND 10) DEFAULT 7,
    physical_symptoms TEXT[] DEFAULT '{}', -- bloating, headache, breast tenderness
    encrypted_payload TEXT, -- client-side encrypted sensitive notes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, log_date)
);

-- ------------------------------------------------------------------------------
-- 7. CENTRALIZED DAILY TASK MANAGEMENT
-- ------------------------------------------------------------------------------
CREATE TYPE task_category_enum AS ENUM (
    'physical_health', 'mental_development', 'menstrual_wellness', 'recovery', 'personal_habit'
);
CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS public.daily_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    task_date DATE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category task_category_enum NOT NULL,
    estimated_mins INT DEFAULT 15,
    actual_mins INT,
    priority priority_enum DEFAULT 'medium',
    status task_status_enum DEFAULT 'not_started',
    related_entity_id UUID, -- links to workout_plan_id or mental_challenge_id
    notes TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. DATABASE-BACKED AI MEMORY & ADAPTIVE INTELLIGENCE
-- ------------------------------------------------------------------------------
CREATE TYPE memory_category_enum AS ENUM (
    'fitness_preference', 'physical_limitation', 'recovery_pattern', 
    'mental_reflection', 'menstrual_correlation', 'user_feedback', 'milestone', 'habit'
);

CREATE TABLE IF NOT EXISTS public.user_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    category memory_category_enum NOT NULL,
    memory_key TEXT NOT NULL,
    memory_value TEXT NOT NULL,
    confidence_score NUMERIC(3, 2) DEFAULT 1.00,
    source_type TEXT NOT NULL, -- e.g. 'checkin', 'workout_logger', 'user_correction'
    source_id UUID,
    verified_by_user BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, category, memory_key)
);

CREATE TABLE IF NOT EXISTS public.daily_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    checkin_date DATE NOT NULL,
    sleep_quality INT CHECK (sleep_quality BETWEEN 1 AND 10) NOT NULL,
    energy_level INT CHECK (energy_level BETWEEN 1 AND 10) NOT NULL,
    current_mood INT CHECK (current_mood BETWEEN 1 AND 10) NOT NULL,
    soreness_level INT CHECK (soreness_level BETWEEN 0 AND 10) NOT NULL,
    stress_level INT CHECK (stress_level BETWEEN 1 AND 10) NOT NULL,
    available_time_mins INT NOT NULL,
    menstrual_symptoms_present BOOLEAN DEFAULT false,
    motivation_level INT CHECK (motivation_level BETWEEN 1 AND 10) NOT NULL,
    checkin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, checkin_date)
);

CREATE TABLE IF NOT EXISTS public.ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    recommendation_date DATE NOT NULL,
    category TEXT NOT NULL,
    recommendation_text TEXT NOT NULL,
    rationale TEXT NOT NULL,
    input_factors JSONB NOT NULL DEFAULT '{}'::jsonb,
    user_action TEXT DEFAULT 'pending', -- 'accepted', 'modified', 'declined'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. PROGRESS & TRANSFORMATION ANALYTICS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.progress_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    weight_kg NUMERIC(5, 2),
    weight_moving_avg_7d NUMERIC(5, 2),
    total_workout_mins INT DEFAULT 0,
    total_mental_mins INT DEFAULT 0,
    total_recovery_mins INT DEFAULT 0,
    volume_load_kg INT DEFAULT 0,
    consistency_score INT CHECK (consistency_score BETWEEN 0 AND 100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, record_date)
);

CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    badge_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_key)
);

-- ------------------------------------------------------------------------------
-- 10. NOTIFICATION & REMINDER PREFERENCES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    daily_checkin_enabled BOOLEAN DEFAULT true,
    daily_checkin_time TIME DEFAULT '08:00:00',
    exercise_reminder_enabled BOOLEAN DEFAULT true,
    exercise_reminder_time TIME DEFAULT '17:30:00',
    mental_challenge_enabled BOOLEAN DEFAULT true,
    mental_challenge_time TIME DEFAULT '09:00:00',
    cycle_logging_enabled BOOLEAN DEFAULT true,
    hydration_reminder_enabled BOOLEAN DEFAULT false,
    sleep_routine_enabled BOOLEAN DEFAULT true,
    sleep_routine_time TIME DEFAULT '22:00:00',
    reflection_enabled BOOLEAN DEFAULT true,
    quiet_hours_start TIME DEFAULT '23:00:00',
    quiet_hours_end TIME DEFAULT '07:00:00',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR FAST QUERYING & TEMPORAL RETRIEVAL
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_workout_plans_user_date ON public.workout_plans(user_id, plan_date DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_completions_plan ON public.exercise_completions(workout_plan_id);
CREATE INDEX IF NOT EXISTS idx_mental_challenges_user_date ON public.mental_challenges(user_id, challenge_date DESC);
CREATE INDEX IF NOT EXISTS idx_menstrual_cycles_user_start ON public.menstrual_cycles(user_id, period_start_date DESC);
CREATE INDEX IF NOT EXISTS idx_menstrual_symptoms_user_date ON public.menstrual_symptoms(user_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_user_date ON public.daily_tasks(user_id, task_date);
CREATE INDEX IF NOT EXISTS idx_user_memory_user_cat ON public.user_memory(user_id, category);
CREATE INDEX IF NOT EXISTS idx_progress_records_user_date ON public.progress_records(user_id, record_date DESC);

-- ==============================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fitness_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mental_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Master libraries are globally readable
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercises are viewable by all authenticated users" 
    ON public.exercises FOR SELECT USING (true);

ALTER TABLE public.challenge_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenge library is viewable by all authenticated users" 
    ON public.challenge_library FOR SELECT USING (true);

-- User-scoped policies: strict isolation by auth.uid()
CREATE POLICY "Users own their profile" ON public.user_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their fitness profile" ON public.fitness_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their workout plans" ON public.workout_plans
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their exercise completions" ON public.exercise_completions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.workout_plans 
            WHERE public.workout_plans.id = public.exercise_completions.workout_plan_id 
            AND public.workout_plans.user_id = auth.uid()
        )
    );

CREATE POLICY "Users own their mental challenges" ON public.mental_challenges
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their menstrual cycles" ON public.menstrual_cycles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their menstrual symptoms" ON public.menstrual_symptoms
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their daily tasks" ON public.daily_tasks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their AI memory" ON public.user_memory
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their daily checkins" ON public.daily_checkins
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their AI recommendations" ON public.ai_recommendations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their progress records" ON public.progress_records
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their achievements" ON public.achievements
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own their notification preferences" ON public.notification_preferences
    FOR ALL USING (auth.uid() = user_id);

