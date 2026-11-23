import { MenstrualCycle, MenstrualSymptomLog, FlowIntensity } from '../types';

export interface CyclePhaseInfo {
  phase: 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';
  name: string;
  dayOfCycle: number;
  totalCycleLength: number;
  description: string;
  trainingGuidance: string;
  nutritionTip: string;
}

export function calculateCycleStats(cycles: MenstrualCycle[]) {
  if (cycles.length === 0) {
    return {
      averageCycleLength: 28,
      cycleVariation: 0,
      averagePeriodDuration: 5,
      historyCount: 0,
      irregularityDetected: false,
      clinicalAlert: null,
    };
  }

  const completedCycles = cycles.filter(c => c.cycle_length_days && c.cycle_length_days > 0);
  const avgLength = completedCycles.length > 0 
    ? Math.round(completedCycles.reduce((sum, c) => sum + (c.cycle_length_days || 28), 0) / completedCycles.length)
    : 28;

  const avgPeriod = cycles.filter(c => c.period_duration_days).length > 0
    ? Math.round(cycles.reduce((sum, c) => sum + (c.period_duration_days || 5), 0) / cycles.length)
    : 5;

  // Variation standard deviation
  let variation = 0;
  if (completedCycles.length > 1) {
    const variance = completedCycles.reduce((sum, c) => sum + Math.pow((c.cycle_length_days || 28) - avgLength, 2), 0) / completedCycles.length;
    variation = Math.round(Math.sqrt(variance) * 10) / 10;
  }

  // Clinical alerts (non-diagnostic, careful medical recommendation)
  let clinicalAlert: string | null = null;
  if (completedCycles.length >= 3) {
    const hasShortCycles = completedCycles.every(c => (c.cycle_length_days || 28) < 21);
    const hasLongCycles = completedCycles.every(c => (c.cycle_length_days || 28) > 36);
    if (hasShortCycles) {
      clinicalAlert = "Your recent cycles have consistently been shorter than 21 days. We recommend discussing this pattern with your healthcare provider.";
    } else if (hasLongCycles) {
      clinicalAlert = "Your recent cycles have consistently exceeded 36 days. Consider consulting your gynecologist for a routine hormonal wellness evaluation.";
    } else if (variation > 7) {
      clinicalAlert = "Noticeable cycle variation detected (>7 days). Tracking sleep, stress, and consulting your physician can provide personalized clarity.";
    }
  }

  return {
    averageCycleLength: avgLength,
    cycleVariation: variation,
    averagePeriodDuration: avgPeriod,
    historyCount: cycles.length,
    irregularityDetected: variation > 6,
    clinicalAlert,
  };
}

export function getCurrentCyclePhase(
  lastPeriodStart: string,
  cycleLength = 28,
  periodDuration = 5
): CyclePhaseInfo {
  const start = new Date(lastPeriodStart);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % cycleLength;
  const currentDay = diffDays + 1;

  if (currentDay <= periodDuration) {
    return {
      phase: 'menstrual',
      name: 'Menstrual Phase',
      dayOfCycle: currentDay,
      totalCycleLength: cycleLength,
      description: 'Estrogen and progesterone are at baseline levels. Uterine lining shedding.',
      trainingGuidance: 'Prioritize restorative movement: gentle walking, Cat-Cow spinal flows, or restorative yoga. If feeling energized, moderate strength is completely safe.',
      nutritionTip: 'Incorporate iron-rich foods (lentils, spinach, lean proteins) and warm herbal teas to soothe pelvic tension.',
    };
  } else if (currentDay <= Math.floor(cycleLength * 0.45)) {
    return {
      phase: 'follicular',
      name: 'Follicular Phase',
      dayOfCycle: currentDay,
      totalCycleLength: cycleLength,
      description: 'Estrogen is steadily rising as follicles mature. Energy, mood, and recovery generally climb.',
      trainingGuidance: 'Great window for progressive overload, new movement skill acquisition, and moderate-to-high intensity strength.',
      nutritionTip: 'Focus on complex carbohydrates to fuel rising cellular energy, lean proteins, and vibrant fresh vegetables.',
    };
  } else if (currentDay <= Math.floor(cycleLength * 0.55)) {
    return {
      phase: 'ovulatory',
      name: 'Ovulatory Phase',
      dayOfCycle: currentDay,
      totalCycleLength: cycleLength,
      description: 'Luteinizing hormone surge and peak estrogen levels. Highest biological vitality.',
      trainingGuidance: 'Peak strength and power output potential. Warm up joints thoroughly as increased laxity can occur.',
      nutritionTip: 'Support liver estrogen metabolism with cruciferous vegetables (broccoli, cabbage) and generous hydration.',
    };
  } else {
    return {
      phase: 'luteal',
      name: 'Luteal Phase',
      dayOfCycle: currentDay,
      totalCycleLength: cycleLength,
      description: 'Progesterone dominates, preparing body. Resting metabolic rate slightly increases; core body temp elevates.',
      trainingGuidance: 'Maintain steady state workouts, focus on mind-muscle control, increase rest periods between sets by 15-30s.',
      nutritionTip: 'Satisfy natural caloric requirements with magnesium-rich foods (dark chocolate, pumpkin seeds) to ease premenstrual mood shifts.',
    };
  }
}

export function getAdaptiveExerciseModifications(symptom: Partial<MenstrualSymptomLog> | null) {
  if (!symptom) {
    return {
      adjustIntensity: false,
      recommendedCategory: 'strength',
      volumeScale: 1.0,
      notes: 'Normal training plan active.',
    };
  }

  const { cramps_severity = 0, pain_severity = 0, energy_level = 7, flow_intensity = 'none' } = symptom;

  if (cramps_severity >= 6 || pain_severity >= 6 || flow_intensity === 'heavy') {
    return {
      adjustIntensity: true,
      recommendedCategory: 'recovery' as const,
      volumeScale: 0.5,
      notes: 'Pelvic discomfort detected. AI Coach has automatically switched today\'s session to gentle decompressive mobility, Balasana (Child\'s Pose), and breathing exercises.',
    };
  }

  if (energy_level <= 4) {
    return {
      adjustIntensity: true,
      recommendedCategory: 'yoga' as const,
      volumeScale: 0.7,
      notes: 'Low energy noted today. AI Coach has reduced total workout volume by 30% and introduced extended rest intervals to prevent fatigue accumulation.',
    };
  }

  return {
    adjustIntensity: false,
    recommendedCategory: 'strength' as const,
    volumeScale: 1.0,
    notes: 'No limiting symptoms recorded. Full planned session unlocked.',
  };
}

