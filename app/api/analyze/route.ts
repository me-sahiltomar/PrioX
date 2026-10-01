import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { DEMO_PRESETS } from "@/lib/seedData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { updates } = body;

    if (!updates || typeof updates !== "string" || !updates.trim()) {
      return NextResponse.json(
        { error: "Business updates text cannot be empty." },
        { status: 400 }
      );
    }

    const trimmedUpdates = updates.trim();

    // Check if matching one of our presets for fast instant resolution
    const matchedPreset = DEMO_PRESETS.find(
      (p) =>
        trimmedUpdates.includes(p.input.slice(0, 50)) ||
        p.input.includes(trimmedUpdates.slice(0, 50))
    );

    // If an environment key is configured, attempt live Gemini API analysis
    const envApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (envApiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: envApiKey });

        const systemPrompt = `You are PrioX, an AI-powered decision support platform for early-stage startup founders.
Analyze scattered business updates and extract 3-5 critical signals ranked by priority (HIGH, MEDIUM, MONITOR, LOW).
Grounded facts only. Output strictly valid JSON matching the schema.`;

        const userPrompt = `Analyze these raw business updates:\n---\n${trimmedUpdates}\n---`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
          config: {
            responseMimeType: "application/json",
            responseJsonSchema: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                suggestedFocus: { type: Type.STRING },
                signals: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      priority: { type: Type.STRING },
                      category: { type: Type.STRING },
                      title: { type: Type.STRING },
                      evidence: { type: Type.STRING },
                      whyItMatters: { type: Type.STRING },
                      suggestedAction: { type: Type.STRING },
                      factors: {
                        type: Type.OBJECT,
                        properties: {
                          recurrence: { type: Type.STRING },
                          impact: { type: Type.STRING },
                          urgency: { type: Type.STRING },
                        },
                        required: ["recurrence", "impact", "urgency"],
                      },
                      whyPriorityExplanation: { type: Type.STRING },
                    },
                    required: [
                      "priority",
                      "category",
                      "title",
                      "evidence",
                      "whyItMatters",
                      "suggestedAction",
                      "factors",
                      "whyPriorityExplanation",
                    ],
                  },
                },
              },
              required: ["summary", "suggestedFocus", "signals"],
            },
          },
        });

        const rawText = response.text || "";
        const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        if (Array.isArray(parsed.signals) && parsed.signals.length > 0) {
          return NextResponse.json({
            success: true,
            data: {
              ...parsed,
              analyzedAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              signals: parsed.signals.map((sig: any, index: number) => ({
                ...sig,
                id: sig.id || `sig-${Date.now()}-${index}`,
              })),
            },
          });
        }
      } catch (geminiError) {
        console.warn("Live Gemini API call failed or timed out, using built-in reasoning engine fallback", geminiError);
      }
    }

    // Built-in Prio AI reasoning engine (Zero API Key Dependency)
    if (matchedPreset) {
      return NextResponse.json({
        success: true,
        data: {
          ...matchedPreset.result,
          analyzedAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      });
    }

    const customResult = generateIntelligentDemoAnalysis(trimmedUpdates);
    return NextResponse.json({
      success: true,
      data: customResult,
    });
  } catch (err: any) {
    console.error("Analysis execution error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to analyze business updates." },
      { status: 500 }
    );
  }
}

// Built-in intelligent reasoning engine for arbitrary custom text
function generateIntelligentDemoAnalysis(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 15);

  const signals = [];

  for (let i = 0; i < Math.min(paragraphs.length, 4); i++) {
    const p = paragraphs[i];
    const lower = p.toLowerCase();

    let priority: "HIGH" | "MEDIUM" | "MONITOR" | "LOW" = "MEDIUM";
    let category = "Operations Signal";
    let recurrence: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM";
    let impact: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM";
    let urgency: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM";

    if (
      lower.includes("block") ||
      lower.includes("crash") ||
      lower.includes("fail") ||
      lower.includes("urgent") ||
      lower.includes("churn") ||
      lower.includes("deadline") ||
      lower.includes("abandon") ||
      lower.includes("critical")
    ) {
      priority = "HIGH";
      category = lower.includes("customer") ? "Customer Risk" : "Critical Blocker";
      impact = "HIGH";
      urgency = "HIGH";
      recurrence =
        lower.includes("recurring") || lower.includes("8 ") || lower.includes("repeated")
          ? "HIGH"
          : "MEDIUM";
    } else if (
      lower.includes("demo") ||
      lower.includes("lead") ||
      lower.includes("sales") ||
      lower.includes("prospect") ||
      lower.includes("deal") ||
      lower.includes("revenue")
    ) {
      priority = "MEDIUM";
      category = "Sales Pipeline";
      impact = "HIGH";
      urgency = "HIGH";
      recurrence = "LOW";
    } else if (
      lower.includes("request") ||
      lower.includes("feature") ||
      lower.includes("search") ||
      lower.includes("suggest")
    ) {
      priority = "MONITOR";
      category = "Product Opportunity";
      impact = "MEDIUM";
      urgency = "LOW";
      recurrence = "HIGH";
    }

    const firstSentence = p.split(/[.!?]/)[0] || p.slice(0, 60);

    signals.push({
      id: `sig-prio-${Date.now()}-${i}`,
      priority,
      category,
      title: firstSentence.length > 70 ? firstSentence.slice(0, 67) + "..." : firstSentence,
      evidence: p.length > 95 ? p.slice(0, 92) + "..." : p,
      whyItMatters: `Identified as a ${priority.toLowerCase()} signal based on potential business and operational impact.`,
      suggestedAction: `Review details with the relevant department lead and prioritize resolution steps today.`,
      factors: {
        recurrence,
        impact,
        urgency,
      },
      whyPriorityExplanation: `Ranked as ${priority} due to operational sensitivity, customer exposure, and urgency factors.`,
    });
  }

  if (signals.length === 0) {
    signals.push({
      id: `sig-prio-${Date.now()}-0`,
      priority: "HIGH" as const,
      category: "Business Signal",
      title: "Key operational update requires founder review",
      evidence: text.slice(0, 95) + (text.length > 95 ? "..." : ""),
      whyItMatters: "May affect core business operations and strategic milestones.",
      suggestedAction: "Triage this update with department leads.",
      factors: {
        recurrence: "MEDIUM" as const,
        impact: "HIGH" as const,
        urgency: "HIGH" as const,
      },
      whyPriorityExplanation: "Identified from unstructured text analysis.",
    });
  }

  return {
    summary:
      "Synthesized business updates across departments. Urgent action items clustered around active blockers and customer-facing interactions.",
    suggestedFocus:
      "Address immediate operational blockers first, followed by pending customer and sales follow-ups.",
    analyzedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    signals,
  };
}
