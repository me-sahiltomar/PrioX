export type PriorityLevel = "HIGH" | "MEDIUM" | "MONITOR" | "LOW";
export type FactorLevel = "HIGH" | "MEDIUM" | "LOW";

export interface SignalFactors {
  recurrence: FactorLevel;
  impact: FactorLevel;
  urgency: FactorLevel;
}

export interface Signal {
  id: string;
  priority: PriorityLevel;
  category: string;
  title: string;
  evidence: string;
  whyItMatters: string;
  suggestedAction: string;
  factors: SignalFactors;
  whyPriorityExplanation?: string;
}

export interface AnalysisResult {
  summary: string;
  suggestedFocus: string;
  signals: Signal[];
  analyzedAt: string;
  inputSnippet?: string;
}

export interface FollowUpItem {
  id: string;
  action: string;
  owner: string;
  dueDate: string;
  priority: PriorityLevel;
  status: "Open" | "In Progress" | "Completed";
  source: string;
  notes?: string;
  createdAt: string;
}

export type ActiveTab = "overview" | "inbox" | "analysis" | "brief" | "followups";
