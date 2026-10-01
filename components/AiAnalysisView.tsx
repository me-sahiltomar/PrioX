"use client";

import React, { useState } from "react";
import { Signal, PriorityLevel, ActiveTab, FollowUpItem } from "@/types/prio";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertCircle,
  Clock,
  Repeat,
  Zap,
  HelpCircle,
  PlusCircle,
  Check,
  CheckCircle2,
  Filter,
} from "lucide-react";

interface AiAnalysisViewProps {
  signals: Signal[];
  analyzedAt: string;
  onNavigate: (tab: ActiveTab) => void;
  onSaveFollowUp: (item: Omit<FollowUpItem, "id" | "createdAt">) => void;
  savedFollowUpTitles: Set<string>;
}

export const AiAnalysisView: React.FC<AiAnalysisViewProps> = ({
  signals,
  analyzedAt,
  onNavigate,
  onSaveFollowUp,
  savedFollowUpTitles,
}) => {
  const [filterPriority, setFilterPriority] = useState<string>("ALL");

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "HIGH":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            MEDIUM
          </span>
        );
      case "MONITOR":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
            MONITOR
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
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

  const getFactorColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
        return "text-red-700 bg-red-50 border-red-200";
      case "MEDIUM":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  const filteredSignals =
    filterPriority === "ALL"
      ? signals
      : signals.filter((s) => s.priority === filterPriority);

  const handleQuickSave = (sig: Signal) => {
    onSaveFollowUp({
      action: sig.suggestedAction || sig.title,
      owner: sig.category.includes("Sales")
        ? "Sales"
        : sig.category.includes("Customer")
        ? "Product"
        : "Founder",
      dueDate: sig.priority === "HIGH" ? "Today" : "Tomorrow",
      priority: sig.priority,
      status: "Open",
      source: `Signal: ${sig.category}`,
      notes: sig.whyItMatters,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span>Reasoning Stage</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">Ranked Signals</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              AI Analysis
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Turn raw updates into ranked signals with context and reasoning.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate("inbox")}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
            >
              Back to Inbox
            </button>
            <button
              onClick={() => onNavigate("brief")}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <span>Create Decision Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Filter pills + Count */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
            Signals detected:
          </span>
          <span className="text-sm font-extrabold text-slate-900">
            {signals.length} total
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-400">Analyzed {analyzedAt}</span>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {["ALL", "HIGH", "MEDIUM", "MONITOR"].map((level) => (
            <button
              key={level}
              onClick={() => setFilterPriority(level)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterPriority === level
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List matching Figma Screen 3 */}
      <div className="space-y-5">
        {filteredSignals.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">
              No signals found for the selected filter.
            </p>
          </div>
        ) : (
          filteredSignals.map((sig) => {
            const isSaved =
              savedFollowUpTitles.has(sig.suggestedAction) ||
              savedFollowUpTitles.has(sig.title);

            return (
              <div
                key={sig.id}
                className={`bg-white rounded-xl p-6 border border-slate-200 shadow-xs transition-all ${getBorderColor(
                  sig.priority
                )}`}
              >
                {/* Top Row: Priority Badge, Category, and Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    {getPriorityBadge(sig.priority)}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {sig.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleQuickSave(sig)}
                    disabled={isSaved}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      isSaved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Saved as Follow-up</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
                        <span>Save as Follow-up</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {sig.title}
                </h3>

                {/* Grid of Evidence and Why It Matters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                  {/* Evidence */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                      Evidence / Grounded Signal
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {sig.evidence}
                    </p>
                  </div>

                  {/* Why it Matters */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                      Why It Matters
                    </span>
                    <p className="text-slate-800 leading-relaxed">
                      {sig.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Priority Factors & Why this is a Priority (User-Facing Reasoning) */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Factor Pills */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                      Factors:
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getFactorColor(
                        sig.factors?.recurrence
                      )}`}
                    >
                      Recurrence: {sig.factors?.recurrence || "MED"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getFactorColor(
                        sig.factors?.impact
                      )}`}
                    >
                      Impact: {sig.factors?.impact || "MED"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getFactorColor(
                        sig.factors?.urgency
                      )}`}
                    >
                      Urgency: {sig.factors?.urgency || "MED"}
                    </span>
                  </div>

                  {/* Suggested Next Action */}
                  <div className="text-xs text-slate-600 flex items-center space-x-1.5 bg-blue-50/60 px-3 py-1.5 rounded-md border border-blue-100">
                    <span className="font-bold text-blue-900">
                      Suggested Action:
                    </span>
                    <span className="text-blue-800">{sig.suggestedAction}</span>
                  </div>
                </div>

                {/* Why is this a priority? Explanatory box */}
                <div className="mt-3.5 p-3 rounded-lg bg-slate-100/70 border border-slate-200/60 text-xs text-slate-600 flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 mr-1.5">
                      Why is this a priority?
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      {sig.whyPriorityExplanation ||
                        "Ranked based on recurrence frequency across recent updates and projected downstream activation impact."}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Sticky Action Banner to Move to Decision Brief */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Ready to convert signals into decisions?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            The Decision Brief organizes these signals into What Happened, Why It
            Matters, and Next Action.
          </p>
        </div>

        <button
          onClick={() => onNavigate("brief")}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
        >
          <span>Open Decision Brief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
