"use client";

import React from "react";
import { ActiveTab } from "@/types/prio";
import { DEMO_PRESETS, DemoPreset } from "@/lib/seedData";
import {
  Compass,
  Inbox,
  Sparkles,
  FileText,
  CheckSquare,
  Layers,
  RotateCcw,
} from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  signalCount: number;
  followUpCount: number;
  selectedPreset: string;
  onSelectPreset: (preset: DemoPreset) => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  signalCount,
  followUpCount,
  selectedPreset,
  onSelectPreset,
  onResetDemo,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: <Compass className="w-4 h-4" /> },
    { id: "inbox", label: "Inbox", icon: <Inbox className="w-4 h-4" /> },
    {
      id: "analysis",
      label: "AI Analysis",
      icon: <Sparkles className="w-4 h-4" />,
      badge: signalCount > 0 ? signalCount : undefined,
    },
    { id: "brief", label: "Decisions", icon: <FileText className="w-4 h-4" /> },
    {
      id: "followups",
      label: "Follow-ups",
      icon: <CheckSquare className="w-4 h-4" />,
      badge: followUpCount > 0 ? followUpCount : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className="flex items-center text-left focus:outline-hidden group select-none py-1"
              title="PrioX Overview"
            >
              <span className="text-2xl font-black tracking-tight text-blue-600 group-hover:text-blue-700 transition-colors leading-none">
                PrioX
              </span>
            </button>

            {/* Clean Single Navigation Bar matching Figma */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-blue-600 bg-blue-50/80 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header: Scenario Switcher, Reset, and User Avatar "ST" */}
          <div className="flex items-center space-x-3">
            {/* Scenario Dropdown */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedPreset}
                onChange={(e) => {
                  const found = DEMO_PRESETS.find((p) => p.id === e.target.value);
                  if (found) onSelectPreset(found);
                }}
                className="bg-transparent text-slate-700 text-xs font-semibold focus:outline-hidden cursor-pointer"
                title="Switch demo scenario"
              >
                {DEMO_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Reset Demo button */}
            <button
              onClick={onResetDemo}
              title="Reset demo to initial state"
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            {/* User Avatar Placeholder "ST" as in Figma wireframe */}
            <div className="flex items-center space-x-2 pl-1 border-l border-slate-200">
              <div
                className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs select-none"
                title="Founder Session (ST)"
              >
                ST
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="bg-slate-200 text-slate-800 text-[10px] px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
