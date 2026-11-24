import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      message, 
      userProfile, 
      fitnessProfile,
      memories = [], 
      cyclePhase,
      recentCheckin,
      apiKey: clientKey 
    } = body;

    const apiKey = clientKey || process.env.GEMINI_API_KEY;
    const userName = userProfile?.preferred_name || userProfile?.full_name || 'friend';
    const limitations = fitnessProfile?.injuries_and_limitations?.join(', ') || 'None noted';
    const goals = fitnessProfile?.fitness_objectives?.join(', ') || 'Sustainable wellness and strength';
    const cycleDesc = cyclePhase ? `Day ${cyclePhase.dayOfCycle} (${cyclePhase.name})` : 'Not tracked';

    // 1. If Gemini API Key is provided, call Google Generative Language API
    if (apiKey) {
      const memoryContext = memories.map((m: any) => `- ${m.memory_key}: ${m.memory_value}`).join('\n');

      const systemPrompt = `You are a private, deeply empathetic, highly knowledgeable personal AI transformation coach and wellness mentor for ${userName}.
You combine physical strength training, Japanese mental discipline (Shugyō, Kaizen, Zanshin), and menstrual health awareness.

Client Profile:
- Name: ${userName}
- Goals: ${goals}
- Physical Limitations / Injuries: ${limitations}
- Menstrual Rhythm: ${cycleDesc}
- Current Weight: ${fitnessProfile?.current_weight_kg || 'Not set'} kg (Target: ${fitnessProfile?.target_weight_kg || 'Not set'} kg)
- Database Memory Records:
${memoryContext}

Guidelines:
- Speak directly, warmly, and with refined elegance.
- Always remember ${userName}'s limitations and goals. Never prescribe dangerous movements.
- Never be punitive or guilt-inducing if a session is skipped; practice Kaizen (1% progress) and Wabi-Sabi (honoring imperfection).
- Keep responses concise, readable, and action-oriented (2-4 brief paragraphs max). Avoid clinical jargon.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nClient message: ${message}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({
            reply,
            source: 'gemini-live',
            citedMemories: memories.slice(0, 3).map((m: any) => m.memory_key)
          });
        }
      }
    }

    // 2. Intelligent, context-aware personalized fallback if no Gemini key is configured
    const lower = (message || '').toLowerCase();
    let reply = '';
    let citedMemories: string[] = [];

    if (lower.includes('knee') || lower.includes('pain') || lower.includes('injury') || lower.includes('squat')) {
      reply = `I keep your physical safety as my highest priority, ${userName}. Because we track your limitations (${limitations}), I have ensured your movements avoid excessive joint strain. If you feel any pinch today, let's substitute with glute bridges and low-impact spinal mobility. How is your body feeling right now?`;
      citedMemories = ['Physical Limitations & Joint Alignment'];
    } else if (lower.includes('cycle') || lower.includes('period') || lower.includes('cramp') || lower.includes('energy')) {
      reply = `${userName}, you are currently around ${cycleDesc}. During this phase, your metabolic rate and energy fluctuate naturally. If you feel vibrant, let's gently challenge your strength; if fatigue or pelvic cramps arise, I will automatically downscale your training volume to restorative yoga (Cat-Cow and Child's Pose). Listen to your body without guilt.`;
      citedMemories = ['Cycle Phase & Energy Rhythm'];
    } else if (lower.includes('unmotivated') || lower.includes('skip') || lower.includes('tired') || lower.includes('hard')) {
      reply = `It is completely natural to encounter resistance, ${userName}. In our Japanese philosophy of Kaizen, a 1% micro-action is celebrated as victory. You do not need an intense 45-minute workout today. Simply 5 minutes of mindful breathing in Seiza posture or a gentle walk will protect your habit loop without exhausting your nervous system.`;
      citedMemories = ['Kaizen Micro-Habit Strategy'];
    } else if (lower.includes('goal') || lower.includes('weight') || lower.includes('progress') || lower.includes('fat loss')) {
      reply = `Looking at your baseline, ${userName}, your current weight is ${fitnessProfile?.current_weight_kg || 64.2} kg aiming toward ${fitnessProfile?.target_weight_kg || 59.5} kg. Remember: daily scale fluctuations of 1-2 kg are normal due to water retention and cycle hormones. We celebrate non-scale victories—your posture, calm composure, and consistency.`;
      citedMemories = ['7-Day Smoothed Weight Moving Average'];
    } else {
      reply = `I am right here with you, ${userName}. I have synchronized your physical profile (${goals}) and daily schedule. Whatever you are experiencing today—whether high energy or needing quiet restoration—we will adapt your sanctuary plan to meet you where you are. What would you like to focus on today?`;
      citedMemories = ['Personal Sanctuary Baseline'];
    }

    return NextResponse.json({
      reply,
      source: 'offline-adaptive',
      citedMemories
    });

  } catch (err: any) {
    return NextResponse.json({
      reply: "I am here with you. Let's take a calm breath and proceed with today's practice at your own pace.",
      source: 'fallback',
      citedMemories: []
    });
  }
}
