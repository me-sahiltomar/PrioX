"use client";

import React, { useState, useEffect } from "react";
import { EXAMPLE_BUSINESS_INPUT, DEMO_PRESETS, DemoPreset } from "@/lib/seedData";
import {
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Clock,
  Repeat,
  Compass,
  GitBranch,
  Loader2,
  Copy,
  Layers,
  Check,
} from "lucide-react";

interface SmartInboxViewProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onSelectPreset: (preset: DemoPreset) => void;
}

export const SmartInboxView: React.FC<SmartInboxViewProps> = ({
  inputText,
  setInputText,
  onAnalyze,
  isLoading,
  error,
  onSelectPreset,
}) => {
  const [loadingStep, setLoadingStep] = useState(0);

  // Animated multi-step progress indicators for demo impact
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 700);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const loadingMessages = [
    "Reading unstructured business updates & filtering routine noise...",
    "Clustering recurring themes & cross-functional dependencies...",
    "Evaluating business impact, urgency, and customer drop-off risks...",
    "Generating ranked signals and executive synthesis...",
  ];

  const sampleSnippets: { label: string; snippet: string }[] = [
    {
      label: "Team Meeting",
      snippet:
        "TEAM MEETING:\nTwo frontend engineers are blocked by missing API endpoints for user onboarding redesign. Target ship date is next Thursday.",
    },
    {
      label: "Customer Feedback",
      snippet:
        "CUSTOMER FEEDBACK:\n8 customers noted confusing onboarding steps during signup, and 5 drop-offs were recorded at the workspace creation stage.",
    },
    {
      label: "Sales Update",
      snippet:
        "SALES UPDATE:\nTwo Tier-1 enterprise demo prospects completed calls yesterday; both indicated high intent but haven't received customized proposals yet.",
    },
    {
      label: "Report / KPIs",
      snippet:
        "KPI REPORT:\nWeekly active users holding steady at 4,200. Onboarding completion rate declined from 68% to 59% week-over-week.",
    },
  ];

  const handleAppendSnippet = (snippet: string) => {
    if (!inputText.trim()) {
      setInputText(snippet);
    } else {
      setInputText(inputText.trim() + "\n\n" + snippet);
    }
  };

  const handleClear = () => {
    setInputText("");
  };

  const handleAnalyzeClick = async () => {
    if (!inputText.trim()) return;
    await onAnalyze(inputText);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span>Step 2</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">Input Raw Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Smart Information Inbox
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Paste meeting notes, customer feedback, sales updates, task updates, reports, and documents. PrioX extracts relevant context and identifies useful signals.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-900">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Engine Ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Preset Scenario Selector Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Demo Scenario
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Switch scenarios to see how Prio adapts its analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((p) => {
            const isSelected =
              inputText.trim().slice(0, 40) === p.input.trim().slice(0, 40);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(p)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20 shadow-xs"
                    : "bg-slate-50/50 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {p.badge}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">
                  {p.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Input form (8 cols) + Side panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Textarea & Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            {/* Input Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Business Updates Input
              </span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onSelectPreset(DEMO_PRESETS[0])}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200/60"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Load Default Example</span>
                </button>

                {inputText && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Large Text Area */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste meeting notes, customer feedback, sales updates, task updates, reports, or other business information..."
                rows={12}
                disabled={isLoading}
                className="w-full p-4 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y leading-relaxed disabled:opacity-50"
              />

              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {inputText.trim()
                    ? `${inputText.trim().split(/\s+/).length} words • ${
                        inputText.length
                      } characters`
                    : "No text entered"}
                </span>
                <span>Supports bullet points, raw slack logs, and reports</span>
              </div>
            </div>

            {/* Dynamic Multi-Step Loading State */}
            {isLoading && (
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                  <span>PrioX is evaluating updates...</span>
                </div>

                <div className="space-y-1.5 pl-6">
                  {loadingMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`text-xs flex items-center space-x-2 transition-opacity ${
                        idx === loadingStep
                          ? "text-blue-900 font-semibold"
                          : idx < loadingStep
                          ? "text-blue-700/60"
                          : "text-slate-400 opacity-40"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message if any */}
            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">Analysis Error</p>
                  <p className="mt-0.5 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* Main Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-slate-500">
                PrioX detects risks, opportunities, recurrence patterns, and deadlines.
              </p>

              <button
                type="button"
                onClick={handleAnalyzeClick}
                disabled={!inputText.trim() || isLoading}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Updates with PrioX...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Updates</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Insert Snippets matching wireframe */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Insert Snippets
              </h3>
              <span className="text-[11px] text-slate-400">
                Click to append sample update
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleSnippets.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAppendSnippet(item.snippet)}
                  className="flex flex-col items-start p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-200 text-left transition-all group"
                >
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                    + {item.label}
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    Sample update
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: "AI Priority Engine" Sidebar (4 cols) matching wireframe & PDF */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Compass className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                AI Priority Engine
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              PrioX evaluates and ranks business signals across 5 strategic dimensions:
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-md bg-red-50 text-red-600 mt-0.5 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    1. Urgency
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Immediate customer drop-offs, churn risks, or urgent operational blockers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-md bg-amber-50 text-amber-600 mt-0.5 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    2. Business Impact
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Direct leverage on activation, recurring revenue, retention, and brand trust.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 mt-0.5 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    3. Deadlines
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Upcoming release commitments, contract expirations, or sprint milestones.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-md bg-purple-50 text-purple-600 mt-0.5 shrink-0">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    4. Dependencies
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Cross-functional bottlenecks holding up product rollout or customer value.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                  <Repeat className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    5. Founder Priorities
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Aligning items against the founder&apos;s core strategic quarterly goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Priority Taxonomy
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded font-semibold bg-red-100 text-red-700">High Priority</span>
                <span className="px-2 py-0.5 rounded font-semibold bg-blue-100 text-blue-700">Important</span>
                <span className="px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-700">Monitor</span>
                <span className="px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">No Action</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                PrioX filters out noise and prioritizes only what requires founder action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

