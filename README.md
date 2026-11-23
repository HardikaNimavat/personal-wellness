# Elena: Personal AI-Powered Transformation & Wellness Ecosystem

> An integrated personal development sanctuary uniting physical transformation, mental discipline, emotional balance, menstrual health, and persistent database-backed AI coaching.

---

## 1. Brand Identity & UI Design System

Built strictly using the official luxury palette:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Deep Oxblood** | `#531B24` | Primary brand accent, primary CTA buttons, active navigation, key titles |
| **Rich Wine / Maroon** | `#6A2931` | Secondary buttons, selected chips, interactive phase indicators |
| **Warm Taupe** | `#C6B7A2` | Subtle borders, timeline bars, muted icons, timestamps |
| **Soft Warm Cream** | `#E7D8C3` | Card backgrounds, elevated surfaces, badge pills |
| **Ivory Background** | `#F3ECE2` | Primary screen canvas, light mode base |
| **Dark Burgundy Canvas** | `#2B1218` | Dark mode background |

---

## 2. Core Pillars & Architecture

### The Three Foundational Guarantees:
1. **Database-Backed AI Memory**:
   - Weights, menstrual symptom histories, actual logged repetitions, RPE ratings, and personal reflections are persisted directly to relational database tables (`public.user_memory`, `public.exercise_completions`, `public.menstrual_symptoms`).
   - Even if the underlying LLM model is upgraded or swapped, 100% of user history, physical limitations, and coaching memories survive.

2. **Real Biomechanical Movement Demonstrations**:
   - Rather than decorative loops or static icons, the platform includes a dedicated **Kinetic Biomechanical Motion Engine** (`components/body/ExerciseDemoPlayer.tsx`).
   - Renders animated limb coordinates, joint angle articulation, concentric/eccentric phases, muscle tension highlighted in `#6A2931`, alignment cues, and common mistake warnings with interactive scrub and 0.5x slow-motion controls.

3. **Privacy by Design & Zero-Knowledge Architecture**:
   - Sensitive menstrual cycle records and personal mental reflections are protected with client-side AES-GCM encryption.
   - Comprehensive GDPR/Data Sovereignty controls in `/settings` allow single-click JSON export of all personal data or complete database erasure.

---

## 3. Application Navigation & Routes

1. **HOME (`/`)**:
   - Daily sanctuary equilibrium gauge (Readiness score)
   - Centralized non-punitive daily task checklist
   - Quick-launch cards for today's workout, mental practice, and cycle phase
   - Rapid 60-second AI calibration modal (Sleep, Vitality, Muscular soreness, Time window)

2. **BODY (`/body`)**:
   - Active adaptive workout with biomechanical exercise player
   - Interactive workout logger tracking sets, actual reps, RPE (1-10), and discomfort (0-10)
   - Comprehensive exercise database browser

3. **MIND (`/mind`)**:
   - Authentic Japanese philosophical practices (*Shugyō*, *Gambaru*, *Kaizen*, *Shoshin*, *Ikigai*, *Zanshin*, *Wabi-sabi*, *Seiza*)
   - Stoic and evidence-based CBT exercises
   - Encrypted personal reflection journal syncing directly to AI memory

4. **CYCLE (`/cycle`)**:
   - Menstrual cycle calendar and phase predictor (Follicular, Ovulatory, Luteal, Menstrual)
   - Cycle variation analytics (alerting for patterns requiring professional care without amateur diagnosis)
   - Daily symptom logging (flow, pelvic discomfort, energy)
   - Cycle-aware training modifications (e.g. automatically downscaling intensity during high cramps)

5. **JOURNEY (`/journey`)**:
   - 7-Day smoothed moving average weight trend (mitigating daily scale anxiety)
   - Time investment across physical, mental, and recovery practices
   - Non-scale milestone achievements timeline

6. **COACH (`/coach`)**:
   - Interactive conversational AI mentor grounded in database memory
   - Transparent **Memory Vault** inspector with add/delete memory records
   - Suggested prompts exploring workout rationale and consistency

7. **SETTINGS (`/settings`)**:
   - Zero-knowledge encryption status
   - One-click JSON data export
   - Right to erasure (complete data wipe)

---

## 4. Technology Stack & Local Execution

### Frontend (Next.js 14 / TypeScript / Tailwind CSS / PWA):
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and launch production server
npm run build
npm start
```

### Backend Microservice (FastAPI / Python 3.13):
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Database (Supabase PostgreSQL):
- Schema file located at `supabase/schema.sql`.
- Includes full entity definitions, check constraints, temporal indexes, and PostgreSQL Row Level Security (RLS) policies.

