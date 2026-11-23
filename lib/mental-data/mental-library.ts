import { MentalChallengeItem } from '../types';

export const MENTAL_CHALLENGE_LIBRARY: MentalChallengeItem[] = [
  {
    id: 'men-shugyo',
    title: 'Shugyō: The Spirit of Deep Practice',
    slug: 'shugyo-disciplined-cultivation',
    original_term: '修行 (Shugyō)',
    origin_system: 'japanese_philosophy',
    cultural_context: 'Originating in classical ascetic traditions and martial arts (Budō), Shugyō refers to rigorous self-discipline and training of body and mind to polish one\'s spirit, cultivate character, and transcend superficial desires.',
    purpose: 'To build non-reactive mental fortitude by undertaking an intentional, demanding practice with complete concentration.',
    instructions: [
      'Choose a physical or mental discipline for today (e.g., maintaining perfect posture, completing your entire workout without looking at your phone, or sitting in upright meditation).',
      'Commit to performing it with undivided attention, treating every repetition or moment as sacred craftsmanship.',
      'Notice any inner resistance, boredom, or impatience as temporary mental ripples without yielding to them.',
      'Upon completion, bow slightly internally in gratitude for your body and spirit.'
    ],
    estimated_duration_mins: 20,
    difficulty: 'intermediate',
    benefits: [
      'Increases distress tolerance and emotional composure under pressure.',
      'Deepens focus and eliminates distracting multitasking impulses.',
      'Builds intrinsic self-respect through voluntary discipline.'
    ],
    potential_risks: [
      'Do not confuse discipline with self-punishment or pain tolerance that ignores bodily injury.'
    ],
    is_evidence_based: true,
    verification_source: 'Japanese Martial Traditions (Budō) & Behavioral Self-Regulation Science',
    tags: ['discipline', 'focus', 'fortitude', 'japanese_culture']
  },
  {
    id: 'men-kaizen',
    title: 'Kaizen: The 1% Micro-Improvement',
    slug: 'kaizen-micro-improvement',
    original_term: '改善 (Kaizen)',
    origin_system: 'japanese_philosophy',
    cultural_context: 'Rooted in post-war Japanese industrial philosophy and Zen mindfulness, Kaizen literally means "change for the better." It emphasizes consistent, incremental refinement over drastic, unsustainable disruptions.',
    purpose: 'To overcome paralysis and perfectionism by optimizing one single tiny element of your daily routine.',
    instructions: [
      'Identify one microscopic friction point in your day (e.g., laying out workout clothes the night before, drinking one extra glass of water, setting up a quiet desk space).',
      'Make that one small adjustment immediately with deliberate care.',
      'Write down how this 1% improvement simplifies tomorrow.',
      'Refuse the temptation to overhaul everything at once; honor the power of compound consistency.'
    ],
    estimated_duration_mins: 10,
    difficulty: 'beginner',
    benefits: [
      'Lowers the activation threshold for habit creation.',
      'Reduces anxiety associated with unrealistic transformation goals.',
      'Compounds into monumental long-term behavioral changes.'
    ],
    potential_risks: [
      'Minimizing or devaluing small actions as insignificant.'
    ],
    is_evidence_based: true,
    verification_source: 'Atomic Habit Formation Models & Toyota Production Philosophy',
    tags: ['habits', 'consistency', 'refinement', 'japanese_culture']
  },
  {
    id: 'men-zanshin',
    title: 'Zanshin: Sustained Awareness After Action',
    slug: 'zanshin-lingering-mind',
    original_term: '残心 (Zanshin)',
    origin_system: 'japanese_philosophy',
    cultural_context: 'In Kyūdō (archery) and Kendō (swordsmanship), Zanshin means "remaining mind." Even after the arrow has struck the target, the archer holds their posture and unbroken presence rather than immediately relaxing or celebrating.',
    purpose: 'To cultivate emotional composure and presence that does not instantly dissipate once a task is completed.',
    instructions: [
      'Select an activity you finish today: finishing a set of exercises, sending an important email, or completing your meal.',
      'When finished, do NOT immediately reach for your phone or rush into the next frantic task.',
      'Pause in place for 30 full seconds with relaxed, open posture.',
      'Observe your breath, the sensation in your muscles, and the quiet aftermath of the effort.',
      'Transition into your next moment with dignity and composure.'
    ],
    estimated_duration_mins: 5,
    difficulty: 'beginner',
    benefits: [
      'Breaks dopamine-driven compulsive multitasking loops.',
      'Encourages mindful closure and reduces nervous system hyperarousal.',
      'Creates a sense of calm elegance in everyday movement.'
    ],
    potential_risks: [
      'None. Safe for all users and conditions.'
    ],
    is_evidence_based: true,
    verification_source: 'Kyūdō Archery Hermeneutics & Parasympathetic Downregulation Research',
    tags: ['mindfulness', 'presence', 'composure', 'japanese_culture']
  },
  {
    id: 'men-seiza',
    title: 'Seiza & Mindful Posture',
    slug: 'seiza-mindful-posture',
    original_term: '正座 (Seiza)',
    origin_system: 'japanese_philosophy',
    cultural_context: 'Seiza means "proper sitting" in Japanese tradition, forming the foundational posture for tea ceremony, martial arts, and zazen. It fosters an aligned spine, open diaphragm, and dignified alertness.',
    purpose: 'To practice physical alignment, pelvic stability, and calm breathing without slouching.',
    instructions: [
      'Find a soft mat or place a yoga block/folded cushion between your feet beneath your sit bones (crucial for protecting knees and ankles).',
      'Kneel with tops of feet flat, spine elongated like a cord pulling gently toward the sky, shoulders dropped away from ears.',
      'Rest hands palms-down on thighs.',
      'Inhale deeply into your abdomen for 4 counts, exhale smoothly for 6 counts.',
      'Maintain for 3 to 5 minutes. If any sharp knee or ankle discomfort occurs, immediately transition to cross-legged or a chair.'
    ],
    estimated_duration_mins: 5,
    difficulty: 'gentle',
    benefits: [
      'Restores thoracic extension and counteracts screen-induced forward slouch.',
      'Promotes diaphragmatic deep breathing and vagal nerve tone.'
    ],
    potential_risks: [
      'Joint strain if performed without cushion support on knees or tight ankles. Always use a prop.'
    ],
    is_evidence_based: true,
    verification_source: 'Traditional Japanese Ergonomics & Postural Biomechanics',
    tags: ['posture', 'breathing', 'spine', 'japanese_culture']
  },
  {
    id: 'men-wabi-sabi',
    title: 'Wabi-Sabi: Honoring the Imperfect Journey',
    slug: 'wabi-sabi-embracing-imperfection',
    original_term: '侘寂 (Wabi-sabi)',
    origin_system: 'japanese_philosophy',
    cultural_context: 'Wabi-sabi is the aesthetic appreciation of beauty that is imperfect, impermanent, and incomplete—like cracked ceramic mended with gold lacquer (Kintsugi).',
    purpose: 'To dismantle toxic perfectionism and shame when your schedule, workouts, or diet are not flawless.',
    instructions: [
      'Reflect on one moment this week where things did not go as planned (a missed workout, higher fatigue, an emotional fluctuation).',
      'Acknowledge this not as failure, but as natural human reality.',
      'Write down: "Growth is not a straight line. My consistency through imperfect days is what creates real strength."',
      'Release the need for a spotless record and focus entirely on being present today.'
    ],
    estimated_duration_mins: 10,
    difficulty: 'beginner',
    benefits: [
      'Protects against the "all-or-nothing" diet/fitness abandonment spiral.',
      'Fosters self-compassion, resilience, and realistic expectations.'
    ],
    potential_risks: [
      'None. Clinically recommended for reducing cognitive distortions.'
    ],
    is_evidence_based: true,
    verification_source: 'Cognitive Restructuring & Zen Aesthetics',
    tags: ['self-compassion', 'resilience', 'perfectionism', 'japanese_culture']
  },
  {
    id: 'men-digital-fast',
    title: '15-Minute Digital Stillness',
    slug: '15-min-digital-fast',
    origin_system: 'mindfulness',
    cultural_context: 'Modern behavioral psychology highlights attention fragmentation and chronic hyper-dopaminergic stimulation caused by ubiquitous handheld screen connectivity.',
    purpose: 'To reclaim sovereign attention and allow the default mode network (DMN) of the brain to decompress.',
    instructions: [
      'Place your smartphone in another room or out of sight.',
      'Set a quiet mechanical or ambient chime timer for 15 minutes.',
      'Spend this time in quietude: look out a window, sip warm tea, gently stretch, or observe your natural thoughts.',
      'Do not consume audio, podcasts, or reading material during this window. Allow boredom to blossom into calm.'
    ],
    estimated_duration_mins: 15,
    difficulty: 'intermediate',
    benefits: [
      'Sharp reduction in cortisol and sensory overload.',
      'Restores authentic creative ideation and emotional calm.'
    ],
    potential_risks: [
      'Mild initial phantom phone-checking restlessness.'
    ],
    is_evidence_based: true,
    verification_source: 'Neurobiology of Attention & Cal Newport Cognitive Research',
    tags: ['digital_detox', 'calm', 'focus', 'evidence_based']
  },
  {
    id: 'men-boundary',
    title: 'Boundary Mastery: The Graceful No',
    slug: 'boundary-mastery-graceful-no',
    origin_system: 'cbt_psychology',
    cultural_context: 'Social compliance conditioning often leads women and high-achievers to overextend, depleting emotional and physical recovery reserves.',
    purpose: 'To protect your energy and time reserves without guilt, passive aggression, or over-explaining.',
    instructions: [
      'Identify one non-essential commitment or request that drains your recovery today.',
      'Draft a clear, courteous, and unapologetic response (e.g., "Thank you for thinking of me! I am unable to take this on right now as I am focusing on my health commitments.").',
      'Observe the urge to invent elaborate excuses; refrain from doing so.',
      'Deliver or practice the refusal with calm confidence.'
    ],
    estimated_duration_mins: 10,
    difficulty: 'intermediate',
    benefits: [
      'Guards time required for sleep, meal prep, and training.',
      'Strengthens self-efficacy and authentic social integrity.'
    ],
    potential_risks: [
      'Temporary social discomfort in people-pleasing tendencies.'
    ],
    is_evidence_based: true,
    verification_source: 'Assertion Training in Cognitive Behavioral Therapy (CBT)',
    tags: ['boundaries', 'self-worth', 'energy', 'evidence_based']
  }
];

