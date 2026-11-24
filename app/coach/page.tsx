'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/navigation/Header';
import { StorageService } from '@/lib/db/mock-storage';
import { UserMemory, UserProfile, FitnessProfile } from '@/lib/types';
import { Send, Sparkles, Database, Key, Trash2, Plus, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  citedMemoryKeys?: string[];
  source?: string;
}

export default function CoachPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fitness, setFitness] = useState<FitnessProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [showMemoryInspector, setShowMemoryInspector] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState('');

  // New Memory form state
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const p = StorageService.getProfile();
    const f = StorageService.getFitness();
    const mems = StorageService.getMemories();

    setProfile(p);
    setFitness(f);
    setMemories(mems);
    setGeminiKeyInput(p.gemini_api_key || '');

    const userName = p.preferred_name || p.full_name || 'Friend';
    const initialLimitation = f?.injuries_and_limitations?.[0] || 'None';

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'coach',
        text: `Welcome back, ${userName}. I am your dedicated personal coach. I hold your physical goals and care notes (${initialLimitation}) in memory so our plans remain sustainable. How can I guide you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedMemoryKeys: ['Personal Sanctuary Baseline', 'Physical Limitations'],
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const query = overrideText || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          userProfile: profile,
          fitnessProfile: fitness,
          memories: memories,
          apiKey: profile?.gemini_api_key,
        })
      });

      const data = await res.json();

      setMessages([
        ...newMsgs,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'coach',
          text: data.reply || "I am right here with you. Let's focus on sustainable, steady progress today.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citedMemoryKeys: data.citedMemories || [],
          source: data.source,
        }
      ]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'coach',
          text: `I hear you, ${profile?.preferred_name || 'Friend'}. Let's prioritize your energy and physical safety today.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.updateProfile({ gemini_api_key: geminiKeyInput.trim() });
    setProfile(updated);
    setShowKeyModal(false);
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
      <Header title="AI PERSONAL COACH" subtitle="Private Guidance & Memory Vault" />

      <div className="px-5 py-4 flex-1 flex flex-col space-y-3 max-w-lg mx-auto w-full">
        {/* Top Control Bar: Memory Vault & API Key */}
        <div className="flex items-center space-x-2">
          {/* Memory Vault Toggle */}
          <button
            onClick={() => setShowMemoryInspector(!showMemoryInspector)}
            className="flex-1 bg-[#E7D8C3] hover:bg-[#C6B7A2]/40 p-2.5 rounded-2xl border border-[#C6B7A2]/40 shadow-sm flex items-center justify-between text-xs transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Database className="w-3.5 h-3.5 text-[#531B24]" />
              <span className="font-semibold text-[#531B24]">Memory Vault</span>
            </div>
            <span className="text-[10px] bg-[#FAF5EE] text-[#6A2931] font-bold px-2 py-0.5 rounded-full">
              {memories.length} Facts
            </span>
          </button>

          {/* Connect Live Gemini Key */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`p-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm ${
              profile?.gemini_api_key
                ? 'bg-[#531B24] text-[#F3ECE2] border-[#531B24]'
                : 'bg-[#FAF5EE] text-[#6A2931] border-[#C6B7A2]/50 hover:bg-[#C6B7A2]/30'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{profile?.gemini_api_key ? 'Gemini Live' : 'Add API Key'}</span>
          </button>
        </div>

        {/* Memory Vault Accordion */}
        {showMemoryInspector && (
          <div className="bg-[#FAF5EE] p-4 rounded-3xl border border-[#C6B7A2]/60 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#C6B7A2]/40 pb-2">
              <span className="font-bold text-[#531B24] uppercase tracking-wider text-[11px]">
                Authoritative Personal Facts
              </span>
              <span className="text-[10px] text-[#6A2931]">Database Persistent</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  className="bg-[#E7D8C3]/50 p-2.5 rounded-xl border border-[#C6B7A2]/40 flex items-start justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#531B24] block">{mem.memory_key}</span>
                    <p className="text-[11px] text-[#531B24]/90 leading-relaxed">{mem.memory_value}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMemory(mem.id)}
                    className="text-[#6A2931] hover:text-[#531B24] p-1 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddMemory} className="pt-2 border-t border-[#C6B7A2]/30 space-y-2">
              <span className="font-bold text-[#6A2931] block text-[10px] uppercase">
                Add New Care Rule to Memory:
              </span>
              <input
                type="text"
                placeholder="Rule title (e.g. Sensitive lower back in morning)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg p-2 text-xs text-[#531B24] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Instruction for your coach..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-lg p-2 text-xs text-[#531B24] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#531B24] text-[#F3ECE2] font-semibold py-1.5 rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Permanent AI Memory</span>
              </button>
            </form>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto py-2 pr-1">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl p-4 text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#531B24] text-[#F3ECE2] rounded-br-none'
                      : 'bg-[#E7D8C3] text-[#531B24] rounded-bl-none border border-[#C6B7A2]/40'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Cited memories */}
                  {msg.citedMemoryKeys && msg.citedMemoryKeys.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#C6B7A2]/40 flex flex-wrap gap-1">
                      {msg.citedMemoryKeys.map((k) => (
                        <span
                          key={k}
                          className="text-[9px] bg-[#FAF5EE] text-[#531B24] font-medium px-2 py-0.5 rounded-full border border-[#C6B7A2]/40"
                        >
                          {k}
                        </span>
                      ))}
                      {msg.source === 'gemini-live' && (
                        <span className="text-[9px] bg-emerald-800 text-white font-semibold px-2 py-0.5 rounded-full">
                          Gemini 1.5 Live
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#C6B7A2] mt-1 px-2">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-1.5 bg-[#E7D8C3] p-3 rounded-2xl border border-[#C6B7A2]/40 max-w-[100px]">
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-[#531B24] rounded-full animate-bounce delay-200" />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {[
            'How is my plan adapted for today?',
            'What should I do if my energy is low?',
            'Recommend a quick 5-min mental practice',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(undefined, prompt)}
              className="bg-[#E7D8C3] hover:bg-[#6A2931] hover:text-[#F3ECE2] text-[#531B24] transition-colors px-3 py-1.5 rounded-full border border-[#C6B7A2]/50 whitespace-nowrap flex-shrink-0 shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="relative flex items-center pt-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your personal coach anything..."
            className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-2xl py-3 pl-4 pr-12 text-xs text-[#531B24] placeholder-[#C6B7A2] focus:outline-none focus:border-[#531B24] shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 w-8 h-8 rounded-xl bg-[#531B24] disabled:opacity-40 text-[#F3ECE2] flex items-center justify-center hover:bg-[#6A2931] transition-transform active:scale-95 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1218]/60 backdrop-blur-sm p-4">
          <div className="bg-[#F3ECE2] border border-[#C6B7A2] rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div>
              <div className="flex items-center space-x-1.5 text-[#6A2931] text-xs font-bold uppercase tracking-wider">
                <Key className="w-3.5 h-3.5" />
                <span>Google Gemini API</span>
              </div>
              <h3 className="text-base font-serif font-bold text-[#531B24] mt-0.5">
                Connect Frontier AI
              </h3>
              <p className="text-xs text-[#531B24]/80 mt-1 leading-relaxed">
                You can obtain a 100% free Gemini API key from Google AI Studio. It allows your coach to hold live, intelligent, unrestricted conversations.
              </p>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-3">
              <input
                type="password"
                placeholder="Paste AI Studio API key (AIzaSy...)"
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl p-2.5 text-xs text-[#531B24] focus:outline-none font-mono"
              />

              <div className="text-[11px] text-[#6A2931]/90">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[#531B24]"
                >
                  Get a free key from Google AI Studio &rarr;
                </a>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="flex-1 py-2 text-xs font-medium text-[#6A2931] bg-[#FAF5EE] border border-[#C6B7A2] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-[#F3ECE2] bg-[#531B24] rounded-xl"
                >
                  Save Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
