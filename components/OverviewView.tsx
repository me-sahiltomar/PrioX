"use client";

import React from "react";
import { Signal, PriorityLevel, ActiveTab } from "@/types/prio";
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";

interface OverviewViewProps {
  signals: Signal[];
  summary: string;
  suggestedFocus: string;
  analyzedAt: string;
  onNavigate: (tab: ActiveTab) => void;
  onSelectSignalForBrief?: (signalId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  signals,
  summary,
  suggestedFocus,
  analyzedAt,
  onNavigate,
}) => {
  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "HIGH":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-red-100 text-red-700 border border-red-200">
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-amber-100 text-amber-800 border border-amber-200">
            MEDIUM
          </span>
        );
      case "MONITOR":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-sky-100 text-sky-800 border border-sky-200">
            MONITOR
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
            LOW
          </span>
        );
      default:
        return null;
    }
  };

  const getBorderColor = (priority: PriorityLevel) => {
    switch (priority) {
      case "HIGH":
        return "border-l-4 border-l-red-500";
      case "MEDIUM":
        return "border-l-4 border-l-amber-500";
      case "MONITOR":
        return "border-l-4 border-l-sky-500";
      case "LOW":
        return "border-l-4 border-l-emerald-500";
      default:
        return "border-l-4 border-l-slate-300";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Heading & Tagline */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span>Executive Briefing</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">PrioX Decision Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Know what matters. Act on it.
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              PrioX turns scattered business updates into a prioritized, decision-ready view of what matters most.
            </p>
          </div>

          {/* Differentiated Header CTAs (Fixes duplicate Decision Brief button) */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => onNavigate("analysis")}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>All Signals ({signals.length})</span>
            </button>
            <button
              onClick={() => onNavigate("inbox")}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>+ Add Updates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Priorities on Left, AI Summary Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Priority Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Today&apos;s Priorities
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                {signals.length} detected
              </span>
            </div>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{analyzedAt}</span>
            </span>
          </div>

          {/* Cards List matching Figma Screen 1 with enhanced contrast & chips */}
          <div className="space-y-3.5">
            {signals.map((sig) => (
              <div
                key={sig.id}
                onClick={() => onNavigate("analysis")}
                className={`bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer ${getBorderColor(
                  sig.priority
                )}`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(sig.priority)}
                    <span className="text-xs font-semibold text-slate-500">
                      {sig.category}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 group">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {sig.title}
                </h3>

                {/* Evidence structured into clean visual chips */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                    <FileText className="w-3 h-3 text-slate-500" />
                    <span>Evidence</span>
                  </span>
                  {sig.evidence.split("•").map((part, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/70"
                    >
                      {part.trim()}
                    </span>
                  ))}
                </div>

                {/* "Why it matters" with dedicated visual prominence */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 shrink-0 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Why it matters:</span>
                  </span>
                  <span className="text-slate-700 font-normal">
                    {sig.whyItMatters}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action & Triage Bar to balance height with right column */}
          <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Triage complete:</strong> 3 priority items identified for founder review today.
              </span>
            </div>
            <button
              onClick={() => onNavigate("followups")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1 shrink-0"
            >
              <span>View Follow-up Tracker</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: AI Summary Panel (5 cols) matching Figma Screen 1 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                AI Summary & Focus
              </h3>
            </div>

            {/* What Changed? */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                What changed?
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {summary}
              </p>
            </div>

            {/* Suggested Focus */}
            <div className="mt-5 p-3.5 rounded-lg bg-blue-50/70 border border-blue-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1 flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Suggested focus</span>
              </h4>
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                {suggestedFocus}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => onNavigate("brief")}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>Open Decision Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("analysis")}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>View Full Signal Breakdown</span>
              </button>
            </div>
          </div>

          {/* Core Value Proposition Card from PDF */}
          <div className="bg-slate-100/80 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>PrioX Value Proposition</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              &ldquo;PrioX does not give founders more information. It helps them understand what matters, why it matters, and what to consider doing next.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>AI Role:</span>
              <span className="font-semibold text-blue-700">Understand ➔ Detect ➔ Prioritize ➔ Recommend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
