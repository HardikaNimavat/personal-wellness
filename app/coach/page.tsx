'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { UserMemory, DailyTask, WorkoutPlan, MenstrualCycle } from '@/lib/types';
import { Bot, Send, Sparkles, Database, Shield, Trash2, Plus, ChevronRight, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  citedMemoryKeys?: string[];
}

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'coach',
      text: 'Good afternoon, Elena. I have integrated your history: I remember your right knee sensitivity on deep squats, your morning lumbar stiffness, and your follicular energy window. How can I guide your practice right now?',
      timestamp: '12:30 PM',
      citedMemoryKeys: ['Right Knee Sensitivity', 'Morning Lumbar Tightness', 'Follicular Energy Peak'],
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [showMemoryInspector, setShowMemoryInspector] = useState(false);

  // New Memory form state
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    setMemories(StorageService.getMemories());
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInputText('');
    setIsTyping(true);

    // Contextual coaching AI response referencing database-backed memory
    setTimeout(() => {
      let coachReply = '';
      let citedKeys: string[] = [];

      const lower = userMsg.text.toLowerCase();

      if (lower.includes('knee') || lower.includes('squat') || lower.includes('pain') || lower.includes('modify')) {
        coachReply = "I have your record 'Right Knee Sensitivity' locked in memory. In today's workout, I restricted depth to parallel, queued a 20° outward foot flare, and replaced plyometric jump lunges with glute bridges. How is your knee feeling right now?";
        citedKeys = ['Right Knee Sensitivity'];
      } else if (lower.includes('cycle') || lower.includes('period') || lower.includes('energy') || lower.includes('fatigue')) {
        coachReply = "You are currently in Day 12 (Follicular phase). Based on your historical pattern 'Follicular Energy Peak', your body metabolizes carbohydrates efficiently and recovers quickly today. This is an optimal window for strength without overreaching.";
        citedKeys = ['Follicular Energy Peak'];
      } else if (lower.includes('unmotivated') || lower.includes('skip') || lower.includes('hard') || lower.includes('tired')) {
        coachReply = "Elena, remember our Kaizen practice: consistency beats intensity. If 35 minutes feels overwhelming, drop it to 10 minutes of gentle spinal mobility (Cat-Cow) and child's pose. A 1% effort preserves your neurological habit loop without guilt.";
        citedKeys = ['Morning Lumbar Tightness', 'Digital Boundary Success'];
      } else if (lower.includes('memory') || lower.includes('data') || lower.includes('remember')) {
        coachReply = `I am currently retaining ${memories.length} authoritative database facts about you that will never be lost even if our underlying LLM model is upgraded. You can inspect, modify, or delete any of them in the Memory Vault above.`;
        citedKeys = memories.slice(0, 2).map((m) => m.memory_key);
      } else {
        coachReply = `Understood, Elena. I am aligning your request with your current training parameters. I prioritize sustainable progress over punishment-based fatigue. Would you like to adjust today's checklist or focus on mental discipline?`;
      }

      setMessages([
        ...newMsgs,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'coach',
          text: coachReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citedMemoryKeys: citedKeys,
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;

    const updated = StorageService.saveMemory(
      'fitness_preference',
      newKey.trim(),
      newValue.trim(),
      'user_direct_entry'
    );
    setMemories(updated);
    setNewKey('');
    setNewValue('');
  };

  const handleDeleteMemory = (id: string) => {
    const updated = StorageService.deleteMemory(id);
    setMemories(updated);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE2] flex flex-col">
      <Header title="AI COACH" subtitle="Database-Backed Memory & Contextual Guidance" />

      <div className="px-4 py-3 flex-1 flex flex-col space-y-3 max-w-lg mx-auto w-full">
        {/* Memory Vault Access Banner */}
        <div className="bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/50 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-full bg-[#531B24] text-[#F3ECE2]">
              <Database className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-xs font-bold text-[#531B24] block">
                Database-Backed Memory Vault
              </span>
              <span className="text-[10px] text-[#6A2931]/80 font-medium">
                {memories.length} persistent facts retained across AI models
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowMemoryInspector(!showMemoryInspector)}
            className="text-xs font-semibold text-[#531B24] bg-[#FAF5EE] hover:bg-[#C6B7A2]/40 px-2.5 py-1 rounded-full border border-[#C6B7A2]/60 transition-colors"
          >
            {showMemoryInspector ? 'Hide Vault' : 'Inspect Memory'}
          </button>
        </div>

        {/* Expandable Memory Vault Inspector */}
        {showMemoryInspector && (
          <div className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2] shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#C6B7A2]/40 pb-2">
              <span className="font-bold text-[#531B24] uppercase tracking-wider text-[11px]">
                Active Relational Memory Records
              </span>
              <span className="text-[10px] text-[#6A2931] font-semibold bg-[#E7D8C3] px-2 py-0.5 rounded-full">
                PostgreSQL Synced
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  className="bg-[#E7D8C3]/60 p-2.5 rounded-xl border border-[#C6B7A2]/50 flex items-start justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#531B24] block">
                      {mem.memory_key}
                    </span>
                    <p className="text-[11px] text-[#531B24]/90 leading-relaxed">
                      {mem.memory_value}
                    </p>
                    <span className="text-[9px] font-semibold text-[#6A2931] uppercase">
                      Category: {mem.category.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteMemory(mem.id)}
                    className="text-[#6A2931] hover:text-[#531B24] p-1 ml-2"
                    title="Delete memory record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Direct Memory Entry Form */}
            <form onSubmit={handleAddMemory} className="pt-2 border-t border-[#C6B7A2]/40 space-y-2">
              <span className="font-bold text-[#6A2931] block text-[11px]">
                Add Explicit Rule / Fact to Memory:
              </span>
              <input
                type="text"
                placeholder="Fact key (e.g. Preferred workout music / injury detail)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg p-2 text-xs text-[#531B24] focus:outline-none"
              />
              <textarea
                rows={2}
                placeholder="Rule details..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg p-2 text-xs text-[#531B24] focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#531B24] hover:bg-[#6A2931] text-[#F3ECE2] font-semibold py-1.5 rounded-xl transition-colors flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Permanent AI Memory</span>
              </button>
            </form>
          </div>
        )}

        {/* Chat Message Scrollable Container */}
        <div className="flex-1 space-y-3 overflow-y-auto py-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#531B24] text-[#F3ECE2] rounded-br-none'
                      : 'bg-[#E7D8C3] text-[#531B24] rounded-bl-none border border-[#C6B7A2]/50'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Cited database memory pills */}
                  {msg.citedMemoryKeys && msg.citedMemoryKeys.length > 0 && (
                    <div className="mt-2 pt-1.5 border-t border-[#C6B7A2]/50 flex flex-wrap gap-1">
                      <span className="text-[9px] font-bold uppercase text-[#6A2931] mr-1">
                        Authoritative Facts:
                      </span>
                      {msg.citedMemoryKeys.map((k) => (
                        <span
                          key={k}
                          className="text-[9px] bg-[#FAF5EE] text-[#531B24] font-medium px-1.5 py-0.2 rounded border border-[#C6B7A2]/40"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#C6B7A2] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-1.5 bg-[#E7D8C3] p-2.5 rounded-2xl border border-[#C6B7A2]/50 max-w-[120px]">
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce delay-200" />
            </div>
          )}
        </div>

        {/* Quick Suggested Prompts */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {[
            'Why did you adapt my workout?',
            'What should I do if I feel unmotivated?',
            'How is my cycle affecting my strength?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
              }}
              className="bg-[#E7D8C3] text-[#531B24] hover:bg-[#6A2931] hover:text-[#F3ECE2] transition-colors px-3 py-1.5 rounded-full border border-[#C6B7A2]/50 whitespace-nowrap flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your coach anything about training, mind, or cycle..."
            className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-2xl py-3 pl-4 pr-12 text-xs text-[#531B24] placeholder-[#C6B7A2] focus:outline-none focus:border-[#531B24]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 w-8 h-8 rounded-xl bg-[#531B24] disabled:opacity-40 text-[#F3ECE2] flex items-center justify-center hover:bg-[#6A2931] transition-transform active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

