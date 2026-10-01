import { AnalysisResult, FollowUpItem } from "@/types/prio";

export interface DemoPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  input: string;
  result: AnalysisResult;
}

export const PRESET_1_SAAS: DemoPreset = {
  id: "saas-onboarding",
  name: "SaaS Onboarding & Activation (Default)",
  badge: "Product & Growth",
  description: "Onboarding complaints, blocked engineers, demo leads, and search feature demand.",
  input: `TEAM MEETING

The product team discussed the current sprint. Two developers are blocked by an API dependency and the onboarding redesign is still incomplete. The team wants to ship the onboarding changes next week.

CUSTOMER FEEDBACK

43 customer messages were reviewed this week. 8 customers independently mentioned difficulty understanding the onboarding steps. 5 customers abandoned the setup process before completion.

SALES UPDATE

Two high-value prospects completed product demos yesterday. Neither has received a follow-up yet.

PRODUCT REQUESTS

The search feature was requested 14 times this week by customers and prospects.

KPI REPORT

Weekly active users are stable. Activation rate declined slightly compared with last week.`,
  result: {
    summary:
      "Customer feedback has clustered around onboarding friction with measurable drop-off. Sales activity remains solid with completed demos, but two high-value enterprise opportunities are currently waiting on urgent follow-up. Meanwhile, search demands reflect a growing feature need.",
    suggestedFocus:
      "Prioritize unblocking the onboarding API dependency and contact the two high-value demo prospects today.",
    analyzedAt: "Just now",
    signals: [
      {
        id: "sig-1",
        priority: "HIGH",
        category: "Customer Risk",
        title: "Onboarding complaints are recurring with setup drop-offs",
        evidence: "8 customer messages • 5 drop-offs • last 24h",
        whyItMatters:
          "Directly impacts user activation and 30-day retention metrics; risk of user churn during trial.",
        suggestedAction:
          "Review onboarding friction points with design and unblock developers on the API dependency.",
        factors: {
          recurrence: "HIGH",
          impact: "HIGH",
          urgency: "HIGH",
        },
        whyPriorityExplanation:
          "This issue appears repeatedly across multiple independent customer reports and directly explains the recent activation rate decline.",
      },
      {
        id: "sig-2",
        priority: "MEDIUM",
        category: "Sales Follow-up",
        title: "Two high-value enterprise leads need urgent follow-up",
        evidence: "Demo completed yesterday • no contact logged yet",
        whyItMatters:
          "Pipeline momentum degrades rapidly beyond 24–48 hours; high potential revenue opportunity at risk of cooling.",
        suggestedAction:
          "Contact both prospective decision-makers today with tailored next steps and pricing proposal.",
        factors: {
          recurrence: "LOW",
          impact: "HIGH",
          urgency: "HIGH",
        },
        whyPriorityExplanation:
          "High revenue leverage with strict time sensitivity, though not an organizational systemic bug.",
      },
      {
        id: "sig-3",
        priority: "MONITOR",
        category: "Product Signal",
        title: "Search functionality is the most repeated feature request",
        evidence: "14 mentions this week across prospects & active users",
        whyItMatters:
          "Could indicate a growing workflow gap in product navigation as user dataset sizes expand.",
        suggestedAction:
          "Validate user search query intents before committing engineering roadmap bandwidth.",
        factors: {
          recurrence: "HIGH",
          impact: "MEDIUM",
          urgency: "LOW",
        },
        whyPriorityExplanation:
          "Consistent volume indicates clear interest, but no immediate system failure or churn threat requiring emergency triage.",
      },
    ],
  },
};

export const PRESET_2_ENTERPRISE: DemoPreset = {
  id: "enterprise-deals",
  name: "B2B Enterprise Closing & Security Audit",
  badge: "Revenue & Sales",
  description: "Enterprise pilot security audit deadline, procurement champion departure, and inbound pipeline.",
  input: `EXECUTIVE REVENUE SYNC

Enterprise lead Acme Corp ($120k ARR) submitted their security review questionnaire yesterday. Their procurement deadline is Friday 5 PM, or the contract shifts to Q2 next fiscal year.

CUSTOMER SUCCESS UPDATE

Our primary champion at TechCorp (our second-largest customer) announced they are leaving the company next month. We do not have a strong executive relationship with the VP of Engineering yet.

ENGINEERING UPDATE

Single Sign-On (SAML/Okta) integration completed staging QA today and is ready for production rollout upon founder sign-off.

INBOUND PIPELINE

Inbound pipeline generated 9 qualified inbound inquiries this week, up 40% week-over-week. Two inbound leads specifically asked about HIPAA compliance.`,
  result: {
    summary:
      "A time-sensitive $120k ARR contract hinges on completing Acme Corp's security questionnaire by Friday. Simultaneously, key account TechCorp faces retention risk due to a departing champion. SAML is ready for release to capture expanding enterprise demand.",
    suggestedFocus:
      "Expedite Acme Corp's security questionnaire completion before Friday's deadline and schedule an executive outreach to TechCorp's VP of Engineering.",
    analyzedAt: "Just now",
    signals: [
      {
        id: "sig-ent-1",
        priority: "HIGH",
        category: "Revenue Risk",
        title: "$120k Acme Corp deal deadline at risk without security questionnaire",
        evidence: "Procurement deadline Friday 5 PM • slips to Q2 if missed",
        whyItMatters:
          "High revenue concentration ($120k ARR) will delay quarter targets if procurement window closes.",
        suggestedAction:
          "Coordinate engineering and legal to complete and return the security review questionnaire by Thursday.",
        factors: {
          recurrence: "LOW",
          impact: "HIGH",
          urgency: "HIGH",
        },
        whyPriorityExplanation:
          "Imminent hard deadline with severe revenue downside if not handled immediately.",
      },
      {
        id: "sig-ent-2",
        priority: "MEDIUM",
        category: "Customer Retention",
        title: "Key account TechCorp champion departing next month",
        evidence: "Primary liaison leaving • weak executive relationship with VP Eng",
        whyItMatters:
          "Unmanaged champion turnover at top accounts frequently precipitates contract non-renewal.",
        suggestedAction:
          "Book a strategic roadmap review with TechCorp's VP of Engineering before champion departure.",
        factors: {
          recurrence: "LOW",
          impact: "HIGH",
          urgency: "MEDIUM",
        },
        whyPriorityExplanation:
          "Substantial ARR at risk; requires proactive relationship building before the transition occurs.",
      },
      {
        id: "sig-ent-3",
        priority: "MONITOR",
        category: "Product Expansion",
        title: "HIPAA compliance inquiries emerging from inbound pipeline",
        evidence: "2 of 9 inbound leads asked specifically for HIPAA compliance",
        whyItMatters:
          "Signals emerging demand in healthcare vertical; could unlock new market segment.",
        suggestedAction:
          "Assess engineering effort and compliance certification roadmap for HIPAA.",
        factors: {
          recurrence: "MEDIUM",
          impact: "MEDIUM",
          urgency: "LOW",
        },
        whyPriorityExplanation:
          "Emerging market opportunity that warrants validation before allocating compliance budget.",
      },
    ],
  },
};

export const PRESET_3_INCIDENT: DemoPreset = {
  id: "billing-incident",
  name: "Payment Failure & Churn Warning",
  badge: "Operations & CS",
  description: "Stripe webhook failure, failed renewal retries, support backlog, and customer satisfaction rating.",
  input: `OPERATIONS LOG

At 03:00 AM, payment gateway webhooks experienced intermittent SSL timeouts. Approximately 34 recurring subscription renewal charges failed to record confirmation in our database.

SUPPORT INBOX

18 tickets were filed today regarding billing receipt discrepancies and temporary account downgrade notices. CS first response time jumped from 15 minutes to 3.5 hours.

INFRASTRUCTURE MONITORING

Database connection pool stabilized at 82% utilization after increasing capacity limits. Webhook retry queues are clearing gradually.

FOUNDER NOTE

Annual renewal for Enterprise client FinEdge ($45k) is scheduled for automated processing in 48 hours.`,
  result: {
    summary:
      "A billing webhook glitch triggered 34 failed renewal records and an influx of 18 support tickets. Urgent manual audit is required to prevent inadvertent account downgrades, especially for high-value accounts renewing this week.",
    suggestedFocus:
      "Prevent account lockout for affected billing accounts and verify FinEdge's upcoming automated renewal.",
    analyzedAt: "Just now",
    signals: [
      {
        id: "sig-inc-1",
        priority: "HIGH",
        category: "Financial / Ops",
        title: "34 subscription renewals unconfirmed due to webhook SSL timeouts",
        evidence: "34 unrecorded renewal charges • 18 support tickets filed",
        whyItMatters:
          "Legitimate paying customers risk automatic system lockouts, generating immediate churn risk.",
        suggestedAction:
          "Run reconciliation script on payment logs and temporarily suspend auto-downgrades.",
        factors: {
          recurrence: "LOW",
          impact: "HIGH",
          urgency: "HIGH",
        },
        whyPriorityExplanation:
          "Active revenue disruption affecting dozens of paying users simultaneously.",
      },
      {
        id: "sig-inc-2",
        priority: "MEDIUM",
        category: "Key Account",
        title: "FinEdge $45k renewal due in 48h requires payment confirmation check",
        evidence: "Automated renewal scheduled in 48h • post-webhook issue",
        whyItMatters:
          "Payment failure on a top client creates customer embarrassment and friction.",
        suggestedAction:
          "Contact FinEdge account lead directly to verify billing details prior to charge.",
        factors: {
          recurrence: "LOW",
          impact: "HIGH",
          urgency: "HIGH",
        },
        whyPriorityExplanation:
          "High revenue stake with short 48-hour execution window.",
      },
      {
        id: "sig-inc-3",
        priority: "MONITOR",
        category: "Support Health",
        title: "Support first-response time elevated to 3.5 hours",
        evidence: "Response time increased from 15m to 3.5h due to billing ticket spike",
        whyItMatters:
          "Temporary customer sentiment degradation; will normalize once billing issues are clarified.",
        suggestedAction:
          "Post in-app status banner acknowledging the billing sync delay.",
        factors: {
          recurrence: "LOW",
          impact: "MEDIUM",
          urgency: "MEDIUM",
        },
        whyPriorityExplanation:
          "Secondary symptom of the primary billing issue; mitigated by proactive status communication.",
      },
    ],
  },
};

export const DEMO_PRESETS: DemoPreset[] = [
  PRESET_1_SAAS,
  PRESET_2_ENTERPRISE,
  PRESET_3_INCIDENT,
];

export const EXAMPLE_BUSINESS_INPUT = PRESET_1_SAAS.input;
export const INITIAL_ANALYSIS_RESULT: AnalysisResult = PRESET_1_SAAS.result;

export const INITIAL_FOLLOW_UPS: FollowUpItem[] = [
  {
    id: "fu-1",
    action: "Review onboarding flow and investigate recurring drop-offs",
    owner: "Product",
    dueDate: "Today",
    priority: "HIGH",
    status: "Open",
    source: "Customer Feedback & KPIs",
    notes: "5 users abandoned setup; unblock API dependency before shipping redesign.",
    createdAt: "2026-10-01",
  },
  {
    id: "fu-2",
    action: "Send personalized follow-up notes & proposals to 2 demo leads",
    owner: "Sales",
    dueDate: "Today",
    priority: "HIGH",
    status: "In Progress",
    source: "Sales Update",
    notes: "Demos completed yesterday; ensure deck & custom quote are attached.",
    createdAt: "2026-10-01",
  },
  {
    id: "fu-3",
    action: "Conduct customer discovery interviews on search use cases",
    owner: "Design",
    dueDate: "Next Week",
    priority: "MONITOR",
    status: "Open",
    source: "Product Requests",
    notes: "14 mentions this week; gather exact search query requirements.",
    createdAt: "2026-10-01",
  },
];
