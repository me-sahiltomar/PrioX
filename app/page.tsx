"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { OverviewView } from "@/components/OverviewView";
import { SmartInboxView } from "@/components/SmartInboxView";
import { AiAnalysisView } from "@/components/AiAnalysisView";
import { DecisionBriefView } from "@/components/DecisionBriefView";
import { FollowUpTrackerView } from "@/components/FollowUpTrackerView";
import { ToastContainer, ToastMessage } from "@/components/Toast";
import {
  ActiveTab,
  Signal,
  FollowUpItem,
  AnalysisResult,
} from "@/types/prio";
import {
  INITIAL_ANALYSIS_RESULT,
  INITIAL_FOLLOW_UPS,
  EXAMPLE_BUSINESS_INPUT,
  DEMO_PRESETS,
  DemoPreset,
} from "@/lib/seedData";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Core application state
  const [signals, setSignals] = useState<Signal[]>(
    INITIAL_ANALYSIS_RESULT.signals
  );
  const [summary, setSummary] = useState<string>(
    INITIAL_ANALYSIS_RESULT.summary
  );
  const [suggestedFocus, setSuggestedFocus] = useState<string>(
    INITIAL_ANALYSIS_RESULT.suggestedFocus
  );
  const [analyzedAt, setAnalyzedAt] = useState<string>(
    INITIAL_ANALYSIS_RESULT.analyzedAt
  );

  // Input & execution state
  const [inputText, setInputText] = useState<string>(EXAMPLE_BUSINESS_INPUT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Demo settings
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    DEMO_PRESETS[0].id
  );

  // Follow-ups state
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(INITIAL_FOLLOW_UPS);
  const [savedFollowUpTitles, setSavedFollowUpTitles] = useState<Set<string>>(
    new Set(INITIAL_FOLLOW_UPS.map((f) => f.action))
  );

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch scenario preset
  const handleSelectPreset = (preset: DemoPreset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.input);
    addToast("info", `Loaded scenario: "${preset.name}"`);
  };

  // Reset demo to clean initial state
  const handleResetDemo = () => {
    const defaultPreset = DEMO_PRESETS[0];
    setSelectedPresetId(defaultPreset.id);
    setInputText(defaultPreset.input);
    setSignals(defaultPreset.result.signals);
    setSummary(defaultPreset.result.summary);
    setSuggestedFocus(defaultPreset.result.suggestedFocus);
    setAnalyzedAt("Just now");
    setFollowUps(INITIAL_FOLLOW_UPS);
    setSavedFollowUpTitles(new Set(INITIAL_FOLLOW_UPS.map((f) => f.action)));
    setActiveTab("overview");
    addToast("info", "Demo state reset to initial preset.");
  };

  // Core Loop: Analyze Updates with Prio AI
  const handleAnalyzeUpdates = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: text,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setError(resData.error || "Failed to analyze updates.");
        addToast("error", resData.error || "Analysis failed.");
        return;
      }

      const result: AnalysisResult = resData.data;

      // Update state
      setSignals(result.signals);
      setSummary(result.summary);
      setSuggestedFocus(result.suggestedFocus);
      setAnalyzedAt(result.analyzedAt);

      addToast(
        "success",
        `AI Analysis complete: ${result.signals.length} signals prioritized.`
      );

      // Transition to AI Analysis screen as specified in product loop
      setActiveTab("analysis");
    } catch (err: any) {
      console.error("Analysis network error:", err);
      setError(
        err.message || "Network error while connecting to analysis endpoint."
      );
      addToast("error", "Network connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Follow-up actions
  const handleSaveFollowUp = (
    itemData: Omit<FollowUpItem, "id" | "createdAt">
  ) => {
    const newItem: FollowUpItem = {
      ...itemData,
      id: `fu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };

    setFollowUps((prev) => [newItem, ...prev]);
    setSavedFollowUpTitles((prev) => new Set([...prev, itemData.action]));
    addToast("success", `Added to Follow-up Tracker: "${itemData.action}"`);
  };

  const handleToggleStatus = (id: string) => {
    setFollowUps((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Completed" ? "Open" : "Completed";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleChangeStatus = (
    id: string,
    newStatus: "Open" | "In Progress" | "Completed"
  ) => {
    setFollowUps((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleRemoveFollowUp = (id: string) => {
    setFollowUps((prev) => prev.filter((item) => item.id !== id));
    addToast("info", "Follow-up item removed.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Clean Single Header matching Figma Wireframe */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        signalCount={signals.length}
        followUpCount={followUps.filter((f) => f.status !== "Completed").length}
        selectedPreset={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onResetDemo={handleResetDemo}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <OverviewView
            signals={signals}
            summary={summary}
            suggestedFocus={suggestedFocus}
            analyzedAt={analyzedAt}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === "inbox" && (
          <SmartInboxView
            inputText={inputText}
            setInputText={setInputText}
            onAnalyze={handleAnalyzeUpdates}
            isLoading={isLoading}
            error={error}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === "analysis" && (
          <AiAnalysisView
            signals={signals}
            analyzedAt={analyzedAt}
            onNavigate={setActiveTab}
            onSaveFollowUp={handleSaveFollowUp}
            savedFollowUpTitles={savedFollowUpTitles}
          />
        )}

        {activeTab === "brief" && (
          <DecisionBriefView
            signals={signals}
            summary={summary}
            suggestedFocus={suggestedFocus}
            onNavigate={setActiveTab}
            onSaveFollowUp={handleSaveFollowUp}
            savedFollowUpTitles={savedFollowUpTitles}
          />
        )}

        {activeTab === "followups" && (
          <FollowUpTrackerView
            followUps={followUps}
            onToggleStatus={handleToggleStatus}
            onChangeStatus={handleChangeStatus}
            onRemoveItem={handleRemoveFollowUp}
            onAddFollowUp={handleSaveFollowUp}
          />
        )}
      </main>

      {/* Minimal Clean Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-600">PrioX</span>
            <span>•</span>
            <span>Know what matters. Act on it.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">
              AI-Powered Decision Support for Early-Stage Founders
            </span>
            <span>•</span>
            <span className="text-slate-400">v1.0 MVP</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
