'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '@/lib/types';

interface ExerciseDemoPlayerProps {
  exercise: Exercise;
  autoPlay?: boolean;
}

export function ExerciseDemoPlayer({ exercise, autoPlay = true }: ExerciseDemoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1.0>(1.0);
  const [showMistakes, setShowMistakes] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Cycle animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const durationMs = 2800 / playbackSpeed;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      // Ping-pong or continuous loop
      const nextProgress = (elapsed % durationMs) / durationMs;
      setProgress(nextProgress * 100);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lastTimeRef.current = 0;
    };
  }, [isPlaying, playbackSpeed]);

  // Current active frame and cues based on progress
  const currentFrame = exercise.frames.reduce((prev, curr) => {
    return Math.abs(curr.timePercent - progress) < Math.abs(prev.timePercent - progress) ? curr : prev;
  }, exercise.frames[0]);

  // Interpolated rendering parameters for the kinetic biomechanical figure
  const renderBiomechanicalAvatar = () => {
    // Determine dynamic coordinates for 2D kinetic skeleton
    const p = progress / 100;
    const isSquat = exercise.id === 'ex-squat';
    const isGluteBridge = exercise.id === 'ex-glute-bridge';
    const isPlank = exercise.id === 'ex-plank';
    const isBirdDog = exercise.id === 'ex-bird-dog';
    const isCatCow = exercise.id === 'ex-cat-cow';
    const isChildsPose = exercise.id === 'ex-childs-pose';

    // Default base coordinates (center is 150, 110)
    let hipX = 140, hipY = 110;
    let kneeX = 145, kneeY = 160;
    let ankleX = 145, ankleY = 200;
    let headX = 140, headY = 45;
    let shoulderX = 140, shoulderY = 75;
    let elbowX = 165, elbowY = 85;
    let handX = 190, handY = 85;

    // Movement calculation
    if (isSquat) {
      // Squat descent: hips move backward & down, knees bend forward, torso angles slightly forward
      const squatFactor = Math.sin(p * Math.PI); // 0 -> 1 -> 0
      hipX = 130 - squatFactor * 25;
      hipY = 110 + squatFactor * 45;
      kneeX = 150 + squatFactor * 12;
      kneeY = 160 + squatFactor * 18;
      ankleX = 145;
      ankleY = 205;
      headX = 142 + squatFactor * 10;
      headY = 45 + squatFactor * 42;
      shoulderX = 138 + squatFactor * 5;
      shoulderY = 75 + squatFactor * 42;
      elbowX = 175;
      elbowY = 85 + squatFactor * 35;
      handX = 200;
      handY = 85 + squatFactor * 35;
    } else if (isGluteBridge) {
      // Supine bridge
      const bridgeFactor = Math.sin(p * Math.PI); // 0 -> 1 -> 0
      headX = 80; headY = 190;
      shoulderX = 100; shoulderY = 190;
      hipX = 150; hipY = 190 - bridgeFactor * 50;
      kneeX = 190; kneeY = 150;
      ankleX = 200; ankleY = 195;
      elbowX = 120; elbowY = 195;
      handX = 145; handY = 195;
    } else if (isPlank) {
      // Rigid plank line
      headX = 80; headY = 145;
      shoulderX = 105; shoulderY = 150;
      elbowX = 105; elbowY = 185;
      handX = 125; handY = 185;
      hipX = 165; hipY = 155;
      kneeX = 210; kneeY = 165;
      ankleX = 250; ankleY = 175;
    } else if (isBirdDog) {
      // Quadruped opposite limb extension
      const extFactor = Math.sin(p * Math.PI);
      headX = 110; headY = 120;
      shoulderX = 130; shoulderY = 130;
      elbowX = 130; elbowY = 165;
      handX = 130 + extFactor * 40; handY = 165 - extFactor * 35;
      hipX = 185; hipY = 130;
      kneeX = 185; kneeY = 170;
      ankleX = 185 + extFactor * 55; ankleY = 170 - extFactor * 35;
    } else if (isCatCow) {
      // Spinal flexion / extension flow
      const catFactor = Math.sin(p * 2 * Math.PI); // oscillating -1 to 1
      headX = 100; headY = 120 - catFactor * 10;
      shoulderX = 125; shoulderY = 135;
      hipX = 185; hipY = 135;
      // Mid-spine flexes up (Cat) or dips down (Cow)
      kneeX = 185; kneeY = 175;
      ankleX = 200; ankleY = 185;
      elbowX = 125; elbowY = 165;
      handX = 125; handY = 180;
    } else {
      // Gentle restorative pose
      headX = 110; headY = 180;
      shoulderX = 130; shoulderY = 170;
      hipX = 195; hipY = 170;
      kneeX = 190; kneeY = 185;
      ankleX = 205; ankleY = 185;
      elbowX = 115; elbowY = 180;
      handX = 90; handY = 185;
    }

    return (
      <svg viewBox="0 0 300 230" className="w-full h-52 select-none">
        {/* Exercise Mat Floor Line */}
        <line x1="30" y1="205" x2="270" y2="205" stroke="#C6B7A2" strokeWidth="2.5" strokeDasharray="3 3" />
        <rect x="40" y="204" width="220" height="3" fill="#C6B7A2" opacity="0.6" rx="1.5" />

        {/* Dynamic Biomechanical Skeleton */}
        <g className="transition-all duration-75">
          {/* Tension / Activated Muscle Aura Glow */}
          <circle cx={hipX} cy={hipY} r="18" fill="#6A2931" opacity="0.15" />
          <circle cx={kneeX} cy={kneeY} r="14" fill="#6A2931" opacity="0.1" />

          {/* Torso / Spine */}
          <line
            x1={shoulderX}
            y1={shoulderY}
            x2={hipX}
            y2={hipY}
            stroke="#531B24"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Head & Neck */}
          <circle cx={headX} cy={headY} r="12" fill="#E7D8C3" stroke="#531B24" strokeWidth="3" />
          {/* Face direction notch */}
          <line x1={headX} y1={headY} x2={headX + 7} y2={headY - 2} stroke="#531B24" strokeWidth="2" strokeLinecap="round" />

          {/* Upper Leg (Femur) - Target muscle highlight in #6A2931 */}
          <line
            x1={hipX}
            y1={hipY}
            x2={kneeX}
            y2={kneeY}
            stroke="#6A2931"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Lower Leg (Tibia/Calf) */}
          <line
            x1={kneeX}
            y1={kneeY}
            x2={ankleX}
            y2={ankleY}
            stroke="#531B24"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Foot */}
          <line
            x1={ankleX}
            y1={ankleY}
            x2={ankleX + 16}
            y2={ankleY}
            stroke="#531B24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Arm: Shoulder to Elbow */}
          <line
            x1={shoulderX}
            y1={shoulderY}
            x2={elbowX}
            y2={elbowY}
            stroke="#531B24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Arm: Elbow to Hand */}
          <line
            x1={elbowX}
            y1={elbowY}
            x2={handX}
            y2={handY}
            stroke="#531B24"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Joint Nodes */}
          <circle cx={shoulderX} cy={shoulderY} r="4.5" fill="#C6B7A2" stroke="#531B24" strokeWidth="1.5" />
          <circle cx={hipX} cy={hipY} r="5" fill="#6A2931" stroke="#F3ECE2" strokeWidth="1.5" />
          <circle cx={kneeX} cy={kneeY} r="4.5" fill="#6A2931" stroke="#F3ECE2" strokeWidth="1.5" />
          <circle cx={ankleX} cy={ankleY} r="3.5" fill="#531B24" />
        </g>
      </svg>
    );
  };

  return (
    <div className="bg-[#E7D8C3] rounded-2xl border border-[#C6B7A2]/50 shadow-sm overflow-hidden">
      {/* Visualizer Frame */}
      <div className="relative bg-[#FAF6F0] p-3 flex flex-col items-center border-b border-[#C6B7A2]/40">
        {/* Top Badges */}
        <div className="w-full flex items-center justify-between text-xs px-2 mb-1">
          <span className="font-semibold text-[#531B24] tracking-wide uppercase text-[11px] bg-[#E7D8C3] px-2.5 py-0.5 rounded-full border border-[#C6B7A2]/50">
            Phase: {currentFrame?.phase.toUpperCase() || 'ECCENTRIC'}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 1.0 ? 0.5 : 1.0)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                playbackSpeed === 0.5
                  ? 'bg-[#6A2931] text-[#F3ECE2]'
                  : 'bg-[#E7D8C3] text-[#531B24] hover:bg-[#C6B7A2]/50'
              }`}
            >
              {playbackSpeed === 0.5 ? '0.5x SLOW-MO' : '1.0x NORMAL'}
            </button>
          </div>
        </div>

        {/* Biomechanical Vector Skeleton */}
        {renderBiomechanicalAvatar()}

        {/* Real-time Dynamic Form Cue */}
        <div className="w-full mt-2 bg-[#F3ECE2] px-3 py-2 rounded-xl border border-[#C6B7A2]/40 text-center">
          <p className="text-xs font-medium text-[#531B24] flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#6A2931] flex-shrink-0" />
            <span>{currentFrame?.formCue || exercise.target_cues[0]}</span>
          </p>
        </div>

        {/* Interactive Scrub Timeline */}
        <div className="w-full mt-3 px-2 flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-[#531B24] text-[#F3ECE2] flex items-center justify-center hover:bg-[#6A2931] transition-transform active:scale-95"
            aria-label={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              setIsPlaying(false);
              setProgress(Number(e.target.value));
            }}
            className="w-full accent-[#531B24] cursor-pointer h-1.5 bg-[#C6B7A2]/60 rounded-lg"
          />

          <button
            onClick={() => {
              setProgress(0);
              setIsPlaying(true);
            }}
            className="text-[#531B24] hover:text-[#6A2931] p-1"
            title="Replay from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Muscles & Posture Details */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931] mb-1.5">
            Target Muscle Activation
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {exercise.primary_muscles.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#531B24] text-[#F3ECE2] text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
              >
                {muscle} (Primary)
              </span>
            ))}
            {exercise.secondary_muscles.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#FAF5EE] text-[#6A2931] border border-[#C6B7A2] text-[11px] font-medium px-2 py-0.5 rounded-full capitalize"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Posture & Alignment */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6A2931] mb-1">
            Biomechanical Alignment
          </h4>
          <p className="text-xs text-[#531B24] leading-relaxed">
            {exercise.correct_posture}
          </p>
        </div>

        {/* Common Mistakes Accordion */}
        <div className="border-t border-[#C6B7A2]/50 pt-2">
          <button
            onClick={() => setShowMistakes(!showMistakes)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#6A2931] py-1 focus:outline-none"
          >
            <span className="flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#6A2931]" />
              <span>Common Form Pitfalls & Safety Rules</span>
            </span>
            {showMistakes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMistakes && (
            <div className="mt-2 space-y-2 bg-[#FAF5EE] p-3 rounded-xl border border-[#C6B7A2]/40 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[#531B24] block">Mistakes to avoid:</span>
                <ul className="list-disc list-inside space-y-1 text-[#531B24]/90 pl-1">
                  {exercise.common_mistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#C6B7A2]/40 pt-1.5">
                <span className="font-bold text-[#6A2931] block">Joint Safety:</span>
                <p className="text-[#531B24] mt-0.5 leading-relaxed">
                  {exercise.safety_instructions.join(' ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

