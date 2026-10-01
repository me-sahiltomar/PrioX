"use client";

import React, { useState } from "react";
import { FollowUpItem, PriorityLevel } from "@/types/prio";
import {
  CheckSquare,
  Square,
  Trash2,
  Plus,
  Clock,
  User,
  Filter,
  CheckCircle2,
  X,
  PlusCircle,
  Search,
  CheckCheck,
} from "lucide-react";

interface FollowUpTrackerViewProps {
  followUps: FollowUpItem[];
  onToggleStatus: (id: string) => void;
  onChangeStatus: (id: string, newStatus: "Open" | "In Progress" | "Completed") => void;
  onRemoveItem: (id: string) => void;
  onAddFollowUp: (item: Omit<FollowUpItem, "id" | "createdAt">) => void;
}

export const FollowUpTrackerView: React.FC<FollowUpTrackerViewProps> = ({
  followUps,
  onToggleStatus,
  onChangeStatus,
  onRemoveItem,
  onAddFollowUp,
}) => {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  // New action form state
  const [newAction, setNewAction] = useState("");
  const [newOwner, setNewOwner] = useState("Founder");
  const [newDueDate, setNewDueDate] = useState("Today");
  const [newPriority, setNewPriority] = useState<PriorityLevel>("HIGH");
  const [newNotes, setNewNotes] = useState("");

  const openCount = followUps.filter((f) => f.status !== "Completed").length;
  const dueTodayCount = followUps.filter(
    (f) => f.status !== "Completed" && f.dueDate.toLowerCase().includes("today")
  ).length;
  const upcomingCount = followUps.filter(
    (f) => f.status !== "Completed" && !f.dueDate.toLowerCase().includes("today")
  ).length;
  const completedCount = followUps.filter((f) => f.status === "Completed").length;

  const filteredItems = followUps.filter((item) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.action.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (filter === "OPEN") return item.status !== "Completed";
    if (filter === "TODAY")
      return item.status !== "Completed" && item.dueDate.toLowerCase().includes("today");
    if (filter === "HIGH")
      return item.status !== "Completed" && item.priority === "HIGH";
    if (filter === "COMPLETED") return item.status === "Completed";
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction.trim()) return;

    onAddFollowUp({
      action: newAction.trim(),
      owner: newOwner,
      dueDate: newDueDate,
      priority: newPriority,
      status: "Open",
      source: "Manual Founder Entry",
      notes: newNotes.trim() || undefined,
    });

    setNewAction("");
    setNewNotes("");
    setIsAddDrawerOpen(false);
  };

  const handleMarkAllDueTodayComplete = () => {
    followUps
      .filter((f) => f.status !== "Completed" && f.dueDate.toLowerCase().includes("today"))
      .forEach((f) => onToggleStatus(f.id));
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "HIGH":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            MED
          </span>
        );
      case "MONITOR":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
            MONITOR
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            LOW
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span>Step 5</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">Accountability</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Follow-up Tracker
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Carry important decisions from insight to action.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            {dueTodayCount > 0 && (
              <button
                onClick={handleMarkAllDueTodayComplete}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-xs"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Resolve Today&apos;s ({dueTodayCount})</span>
              </button>
            )}

            <button
              onClick={() => setIsAddDrawerOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Follow-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row matching wireframe */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => setFilter("OPEN")}
          className={`p-5 rounded-xl border bg-white shadow-xs cursor-pointer transition-all ${
            filter === "OPEN" ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Open Actions
          </span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{openCount}</span>
            <span className="text-xs text-slate-500">pending</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setFilter("TODAY")}
          className={`p-5 rounded-xl border bg-white shadow-xs cursor-pointer transition-all ${
            filter === "TODAY" ? "border-red-500 ring-2 ring-red-500/20" : "border-slate-200"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
            Due Today
          </span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-red-600">{dueTodayCount}</span>
            <span className="text-xs text-slate-500">urgent</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setFilter("ALL")}
          className={`p-5 rounded-xl border bg-white shadow-xs cursor-pointer transition-all ${
            filter === "ALL" ? "border-slate-500 ring-2 ring-slate-500/20" : "border-slate-200"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Upcoming
          </span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{upcomingCount}</span>
            <span className="text-xs text-slate-500">scheduled</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => setFilter("COMPLETED")}
          className={`p-5 rounded-xl border bg-white shadow-xs cursor-pointer transition-all ${
            filter === "COMPLETED" ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
            Completed
          </span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-600">{completedCount}</span>
            <span className="text-xs text-slate-500">resolved</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
          {[
            { id: "ALL", label: `All (${followUps.length})` },
            { id: "OPEN", label: `Open (${openCount})` },
            { id: "TODAY", label: `Due Today (${dueTodayCount})` },
            { id: "HIGH", label: `High Priority` },
            { id: "COMPLETED", label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                filter === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search follow-ups..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Table / Card List matching Figma Screen 5 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-medium text-slate-600">
              No follow-up items match this view.
            </p>
            <p className="text-xs text-slate-400">
              Save decisions from the Decision Brief or click &apos;Add Follow-up&apos; above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => {
              const isCompleted = item.status === "Completed";
              const isDueToday = item.dueDate.toLowerCase().includes("today");

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isCompleted ? "bg-slate-50/70 opacity-60" : "hover:bg-slate-50/50"
                  }`}
                >
                  {/* Left: Checkbox + Action Title + Notes */}
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => onToggleStatus(item.id)}
                      className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-bold text-slate-900 leading-snug break-words ${
                            isCompleted ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {item.action}
                        </span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.notes}
                        </p>
                      )}

                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-0.5">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          Source: {item.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Meta (Owner, Due, Priority, Status, Delete) */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 pl-8 sm:pl-0">
                    {/* Owner Badge */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      <User className="w-3 h-3 text-slate-500" />
                      <span className="font-semibold">{item.owner}</span>
                    </div>

                    {/* Due Date */}
                    <div
                      className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-md font-medium ${
                        isDueToday && !isCompleted
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-slate-50 text-slate-600 border border-slate-200"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{item.dueDate}</span>
                    </div>

                    {/* Priority Badge */}
                    <div>{getPriorityBadge(item.priority)}</div>

                    {/* Status Dropdown */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        onChangeStatus(
                          item.id,
                          e.target.value as "Open" | "In Progress" | "Completed"
                        )
                      }
                      className="text-xs font-semibold px-2 py-1 rounded-md border border-slate-300 bg-white text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove follow-up"
                      className="text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Follow-up Drawer / Modal */}
      {isAddDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-semibold text-slate-900">
                  New Follow-up Action
                </h3>
              </div>
              <button
                onClick={() => setIsAddDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Action Title *
                </label>
                <input
                  type="text"
                  required
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="e.g. Schedule sync with engineering team on API blocker"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Owner
                  </label>
                  <select
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Founder">Founder</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Due Date
                  </label>
                  <select
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Week">This Week</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Priority
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["HIGH", "MEDIUM", "MONITOR", "LOW"] as PriorityLevel[]).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setNewPriority(p)}
                        className={`py-1.5 text-xs font-bold rounded-md border text-center transition-all ${
                          newPriority === p
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Context / Notes (Optional)
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key details or context behind this action item..."
                  rows={3}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddDrawerOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newAction.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors"
                >
                  Create Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
