import { Exercise } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  {
    id: 'ex-squat',
    name: 'Bodyweight Squat',
    slug: 'bodyweight-squat',
    category: 'strength',
    primary_muscles: ['quadriceps', 'glutes'],
    secondary_muscles: ['hamstrings', 'core', 'calves'],
    difficulty: 'beginner',
    equipment: ['bodyweight'],
    kinetic_animation_id: 'anim-squat',
    correct_posture: 'Feet shoulder-width apart, toes slightly flared (15-30°). Chest lifted, neutral spine throughout the descent, weight evenly distributed across the midfoot and heel.',
    instructions: [
      'Stand upright with feet shoulder-width apart, arms extended in front for counter-balance.',
      'Initiate movement by unhinging hips backward while bending knees.',
      'Descend until thighs are parallel to the floor, ensuring knees track in line with toes.',
      'Drive through the entire foot to return to the starting position, squeezing glutes at the top.'
    ],
    target_cues: [
      'Screw your feet into the floor to activate external rotators.',
      'Maintain an open collarbone without hyperextending lower back.',
      'Keep your ribs pulled down toward your pelvis.'
    ],
    common_mistakes: [
      'Knees collapsing inward (valgus collapse).',
      'Rounding the lower back at the bottom of the squat (butt wink).',
      'Heels lifting off the ground due to limited ankle dorsiflexion.'
    ],
    safety_instructions: [
      'Do not force depth past what allows a neutral pelvis and pain-free knees.',
      'If you feel anterior knee pinch, widen your stance slightly or limit depth to 80°.'
    ],
    default_sets: 3,
    default_reps: 12,
    default_rest_seconds: 60,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 180, knee: 180, ankle: 90, shoulder: 90, elbow: 180, spine: 180 },
        tensionMuscles: ['quadriceps', 'glutes'],
        formCue: 'Set feet shoulder-width. Brace core.'
      },
      {
        timePercent: 25,
        phase: 'eccentric',
        jointAngles: { hip: 140, knee: 135, ankle: 80, shoulder: 90, elbow: 180, spine: 175 },
        tensionMuscles: ['quadriceps', 'glutes', 'hamstrings'],
        formCue: 'Hips back, knees tracking over second toe.'
      },
      {
        timePercent: 50,
        phase: 'inflection',
        jointAngles: { hip: 90, knee: 90, ankle: 70, shoulder: 90, elbow: 180, spine: 175 },
        tensionMuscles: ['quadriceps', 'glutes'],
        formCue: 'Thighs parallel, chest proud, weight balanced.'
      },
      {
        timePercent: 75,
        phase: 'concentric',
        jointAngles: { hip: 135, knee: 135, ankle: 80, shoulder: 90, elbow: 180, spine: 178 },
        tensionMuscles: ['quadriceps', 'glutes'],
        formCue: 'Drive through midfoot, exhale.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 180, knee: 180, ankle: 90, shoulder: 90, elbow: 180, spine: 180 },
        tensionMuscles: ['glutes'],
        formCue: 'Stand tall, squeeze glutes softly without hyperextending.'
      }
    ]
  },
  {
    id: 'ex-glute-bridge',
    name: 'Glute Bridge',
    slug: 'glute-bridge',
    category: 'strength',
    primary_muscles: ['glutes'],
    secondary_muscles: ['hamstrings', 'core'],
    difficulty: 'beginner',
    equipment: ['bodyweight', 'mat'],
    kinetic_animation_id: 'anim-glute-bridge',
    correct_posture: 'Lie supine with knees bent at 90°, feet flat on the floor hip-width apart. Arms relaxed at sides. Pelvis tucked into posterior pelvic tilt before lifting.',
    instructions: [
      'Lie flat on your back with knees bent and feet flat on the floor, about 10-12 inches from your hips.',
      'Engage your abdominal wall to flatten lower back gently against the mat.',
      'Press through your heels to drive hips upward until knees, hips, and shoulders form a straight diagonal line.',
      'Hold the peak contraction for a conscious 2-second pause while squeezing glutes.',
      'Slowly lower hips back to the mat with control.'
    ],
    target_cues: [
      'Do not push hips so high that lower back arches.',
      'Think of curling pelvis upward rather than arching your spine.',
      'Feel the burn in the center of glutes, not lower back.'
    ],
    common_mistakes: [
      'Hyperextending lumbar spine at peak extension.',
      'Pushing through toes rather than midfoot/heels.',
      'Rushing reps without a pause at peak contraction.'
    ],
    safety_instructions: [
      'Keep neck neutral and relaxed; do not turn head during the movement.',
      'Stop before lumbar hyperextension if experiencing lower back sensitivity.'
    ],
    default_sets: 3,
    default_reps: 15,
    default_rest_seconds: 45,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 110, knee: 90, ankle: 90, shoulder: 0, elbow: 180, spine: 180 },
        tensionMuscles: ['core'],
        formCue: 'Supine on mat. Feet hip-width.'
      },
      {
        timePercent: 50,
        phase: 'inflection',
        jointAngles: { hip: 180, knee: 90, ankle: 85, shoulder: 0, elbow: 180, spine: 180 },
        tensionMuscles: ['glutes', 'hamstrings'],
        formCue: 'Bridge up: straight line from shoulders to knees. 2s hold.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 110, knee: 90, ankle: 90, shoulder: 0, elbow: 180, spine: 180 },
        tensionMuscles: ['glutes'],
        formCue: 'Lower with control to reset.'
      }
    ]
  },
  {
    id: 'ex-plank',
    name: 'Forearm Plank',
    slug: 'forearm-plank',
    category: 'core',
    primary_muscles: ['core'],
    secondary_muscles: ['shoulders', 'glutes', 'quadriceps'],
    difficulty: 'beginner',
    equipment: ['mat'],
    kinetic_animation_id: 'anim-plank',
    correct_posture: 'Elbows stacked directly beneath shoulders. Neutral cervical spine gazing slightly forward of hands. Body forms a rigid, unbroken plank from head to heels.',
    instructions: [
      'Place forearms on the floor with elbows directly under shoulders, forearms parallel.',
      'Step feet back one at a time, coming onto balls of feet hip-width apart.',
      'Engage glutes, draw navel in toward spine, and push floor away through forearms.',
      'Hold this static isometric position while maintaining smooth, diaphragmatic breathing.'
    ],
    target_cues: [
      'Create full-body tension: squeeze glutes, quads, and pull elbows toward toes.',
      'Protract shoulder blades slightly to support upper back.',
      'Breathe into your side ribs without releasing core brace.'
    ],
    common_mistakes: [
      'Sagging hips putting shear stress on lumbar spine.',
      'Hips piked too high toward the ceiling.',
      'Dropping head down toward chest.'
    ],
    safety_instructions: [
      'End the set immediately if lower back begins to sag or ache.',
      'Modify by dropping knees to the mat if 30 seconds cannot be held with strict form.'
    ],
    default_sets: 3,
    default_reps: 1,
    default_duration_seconds: 40,
    default_rest_seconds: 60,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 180, knee: 180, ankle: 90, shoulder: 90, elbow: 90, spine: 180 },
        tensionMuscles: ['core', 'shoulders', 'glutes'],
        formCue: 'Rigid plank, glutes squeezed, floor pushed away.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 180, knee: 180, ankle: 90, shoulder: 90, elbow: 90, spine: 180 },
        tensionMuscles: ['core'],
        formCue: 'Sustain continuous breath throughout isometric hold.'
      }
    ]
  },
  {
    id: 'ex-bird-dog',
    name: 'Bird Dog',
    slug: 'bird-dog',
    category: 'core',
    primary_muscles: ['core', 'back', 'glutes'],
    secondary_muscles: ['shoulders', 'hamstrings'],
    difficulty: 'beginner',
    equipment: ['mat'],
    kinetic_animation_id: 'anim-bird-dog',
    correct_posture: 'Quadruped position: wrists stacked under shoulders, knees stacked under hips. Spine neutral with natural lumbar curvature.',
    instructions: [
      'Start on hands and knees with a flat, stable back.',
      'Brace core to prevent pelvis from rotating.',
      'Simultaneously reach right arm forward and extend left leg straight back until parallel to floor.',
      'Hold peak extension for 1-2 seconds with thumb pointing up and heel reaching back.',
      'Return to quadruped position with control and alternate sides.'
    ],
    target_cues: [
      'Imagine balancing a cup of warm tea on your lower back.',
      'Reach long rather than kicking high.',
      'Keep hips square to the mat.'
    ],
    common_mistakes: [
      'Arching lumbar spine as leg extends.',
      'Tilting hips to one side.',
      'Rushing through the movement without stability.'
    ],
    safety_instructions: [
      'Excellent rehabilitation exercise for lower back resilience.',
      'Perform on a comfortable mat to protect knees.'
    ],
    default_sets: 3,
    default_reps: 10,
    default_rest_seconds: 45,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 90, knee: 90, ankle: 90, shoulder: 90, elbow: 180, spine: 180 },
        tensionMuscles: ['core'],
        formCue: 'Quadruped base. Hands under shoulders.'
      },
      {
        timePercent: 50,
        phase: 'inflection',
        jointAngles: { hip: 180, knee: 180, ankle: 90, shoulder: 180, elbow: 180, spine: 180 },
        tensionMuscles: ['core', 'glutes', 'back'],
        formCue: 'Extend opposite arm and leg parallel to floor. Hold 2s.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 90, knee: 90, ankle: 90, shoulder: 90, elbow: 180, spine: 180 },
        tensionMuscles: ['core'],
        formCue: 'Reset gently and alternate smoothly.'
      }
    ]
  },
  {
    id: 'ex-cat-cow',
    name: 'Cat-Cow Flow',
    slug: 'cat-cow-flow',
    category: 'yoga',
    primary_muscles: ['back', 'core'],
    secondary_muscles: ['neck', 'hip_flexors'],
    difficulty: 'gentle',
    equipment: ['mat'],
    kinetic_animation_id: 'anim-cat-cow',
    correct_posture: 'Quadruped on hands and knees. Coordinated spinal articulation synced with inhalation and exhalation.',
    instructions: [
      'Begin on hands and knees with wrists under shoulders and knees under hips.',
      'Inhale: Drop belly toward mat, lift chest and tailbone, gaze gently forward (Cow Pose).',
      'Exhale: Press hands into mat, round spine toward ceiling, tuck chin toward chest (Cat Pose).',
      'Move rhythmically between the two postures with deep diaphragmatic breaths.'
    ],
    target_cues: [
      'Articulate vertebra by vertebra rather than hinging in one spot.',
      'Broaden through collarbones in Cow pose.',
      'Create space between shoulder blades in Cat pose.'
    ],
    common_mistakes: [
      'Cranking the neck backwards aggressively.',
      'Holding breath instead of syncing with movement.',
      'Collapsing into shoulders.'
    ],
    safety_instructions: [
      'Safe across all phases of menstrual cycle and pregnancy.',
      'Provides immediate decompression for lumbar tension and menstrual discomfort.'
    ],
    default_sets: 2,
    default_reps: 10,
    default_rest_seconds: 30,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 90, knee: 90, ankle: 90, shoulder: 90, elbow: 180, spine: 160 },
        tensionMuscles: ['back'],
        formCue: 'Inhale into Cow: belly softens, heart expands forward.'
      },
      {
        timePercent: 50,
        phase: 'inflection',
        jointAngles: { hip: 90, knee: 90, ankle: 90, shoulder: 90, elbow: 180, spine: 200 },
        tensionMuscles: ['core'],
        formCue: 'Exhale into Cat: navel draws inward, spine arches high.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 90, knee: 90, ankle: 90, shoulder: 90, elbow: 180, spine: 180 },
        tensionMuscles: ['back'],
        formCue: 'Return to neutral spine and natural breath.'
      }
    ]
  },
  {
    id: 'ex-childs-pose',
    name: 'Balasana (Child\'s Pose)',
    slug: 'balasana-childs-pose',
    category: 'recovery',
    primary_muscles: ['back', 'hip_flexors'],
    secondary_muscles: ['glutes', 'shoulders'],
    difficulty: 'gentle',
    equipment: ['mat'],
    kinetic_animation_id: 'anim-childs-pose',
    correct_posture: 'Kneel on the floor with big toes touching and knees spread comfortably wide. Sit back on heels and fold torso forward, resting forehead on the mat.',
    instructions: [
      'Kneel on mat with big toes touching and knees spread wider than hips.',
      'Sit your hips back toward your heels.',
      'Walk arms out in front on the mat, lengthening your spine.',
      'Rest your forehead gently on the mat, relaxing shoulders and jaw.',
      'Breathe deeply into your pelvic floor and lower back.'
    ],
    target_cues: [
      'Release all muscular tension with each slow exhale.',
      'Feel your lower back gently decompress.',
      'Ground your forehead to calm the nervous system.'
    ],
    common_mistakes: [
      'Forcing hips down if knees or hips feel pinched.',
      'Tensing shoulders up near the ears.'
    ],
    safety_instructions: [
      'Place a folded towel or pillow between thighs and calves if knee flexion is uncomfortable.',
      'Ideal for downregulating the nervous system during high stress or menstrual cramping.'
    ],
    default_sets: 1,
    default_reps: 1,
    default_duration_seconds: 90,
    default_rest_seconds: 0,
    frames: [
      {
        timePercent: 0,
        phase: 'start',
        jointAngles: { hip: 60, knee: 45, ankle: 150, shoulder: 150, elbow: 180, spine: 160 },
        tensionMuscles: ['back'],
        formCue: 'Hips back onto heels, arms extended softly.'
      },
      {
        timePercent: 100,
        phase: 'finish',
        jointAngles: { hip: 50, knee: 40, ankle: 150, shoulder: 160, elbow: 180, spine: 150 },
        tensionMuscles: [],
        formCue: 'Deep diaphragmatic breathing, total release.'
      }
    ]
  }
];

