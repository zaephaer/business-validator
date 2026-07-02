# Business Idea Validator — Design Spec

Date: 2026-07-02

## Summary

A webapp where a founder enters a one-line startup idea and receives a full,
investor-grade validation report: executive summary, market score, competitor
scan, monetization ideas, MVP feature list, launch strategy, viral hooks,
business model canvas, SWOT, and financial projections. Source spec:
`AI_Startup_Idea_Validator_v2.md`.

This v1 uses a mock data generator instead of a real AI backend, so the app
ships with no server, no database, and no API key requirement. It can export
the generated report as a PDF.

## Goals (v1)

- Enter an idea, see a staged "analyzing" sequence, then a full report.
- Report content varies by keyword signals in the idea text (not one static
  sample), so different ideas feel meaningfully different.
- Report covers every section from the source spec.
- Report is a single scrollable document with a sticky sidebar nav
  (scrollspy) and reads well printed/exported.
- One-click "Export PDF" that preserves the visual styling.

## Non-goals (v1)

- Real Claude/Anthropic API integration.
- Accounts, login, or any server-side persistence.
- Saving/revisiting past reports (no localStorage history).
- Editing or regenerating individual sections.
- Comparing multiple ideas side by side.

The mock generator is isolated behind a single async function so a later pass
can swap in a real API call without touching any UI code.

## Tech Stack

- React + Vite + TypeScript. Client-only SPA, no backend.
- Plain CSS with a small design-token file (CSS custom properties) rather
  than a utility framework — the palette and typography are small and fixed
  (see Visual Design), so tokens are simpler than pulling in Tailwind.
- Vitest + React Testing Library for tests.
- `html2pdf.js` (wraps html2canvas + jsPDF) for PDF export.

## Visual Design

**Style: "Investor Deck."** Dark navy background (`#0b1120` / `#0f172a`),
gold accent (`#e2c766`), serif headings (Georgia), muted slate body text
(`#94a3b8` / `#e2e8f0`). Card-style stat blocks with a subtle border
(`#1e293b`). This was chosen (over a "Clean SaaS" light/indigo direction and
a "Bold Startup" gradient direction) because the product's value proposition
is a due-diligence-style report, and the dark/serif/gold treatment reads as
premium and analyst-grade rather than as a typical SaaS dashboard.

**Layout: single scroll + sticky sidebar nav** (chosen over a tabbed
dashboard and a guided slide/story mode). The report renders as one
continuous document — this matches the "investor report" framing, lets
someone skim top-to-bottom or jump via the sidebar, and requires no
special-casing to turn into a clean PDF (a tabbed or slide-based UI would
need extra work to flatten into one exportable document).

Approved combined mockup (structure + style together) is archived at
`.superpowers/brainstorm/1914-1782962894/content/combined-preview.html`.

## User Flow / States

Single-page app, no router. `App` holds:

```ts
type Status = 'input' | 'analyzing' | 'report';
const [status, setStatus] = useState<Status>('input');
const [report, setReport] = useState<Report | null>(null);
```

1. **Input screen** — headline, one-line idea textarea, "Validate My Idea"
   button. Disabled until the field is non-empty.
2. **Analyzing screen** — on submit, `status` becomes `'analyzing'`. A
   staged sequence of status messages (e.g. "Scanning competitors…",
   "Scoring market…", "Building financials…") cycles over roughly 4–6
   seconds purely for perceived-progress effect.
3. **Report screen** — once `generateReport(idea)` resolves, `status`
   becomes `'report'` and the report renders as the single-scroll document
   with sticky sidebar nav and an "Export PDF" button.

```ts
async function generateReport(idea: string): Promise<Report> {
  // wraps the mock engine in a Promise + timer today;
  // swappable for a real Claude API call later without
  // changing any call site.
}
```

## Report Data Model

One `Report` TypeScript interface mirroring the source spec's sections:

```ts
interface Report {
  idea: string;
  executiveSummary: { verdict: string; why: string; targetCustomer: string;
    coreProblem: string; valueProposition: string; recommendedModel: string; };
  marketScore: { score: number; reasoning: string; successFactors: string[];
    risks: string[]; };
  competitorScan: { direct: Competitor[]; indirect: Competitor[];
    unservedNeeds: string[]; gaps: string[]; };
  monetization: MonetizationModel[]; // ranked
  mvp: { build: string[]; avoid: string[]; };
  launchStrategy: { channels: string[]; first100Users: string;
    acquisitionChannels: string[]; weeklyRoadmap: string[]; };
  viralHooks: { headline: string; heroCopy: string; launchPost: string;
    coldOutreach: string; demoScript: string; };
  businessModelCanvas: Record<CanvasBlock, string[]>;
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[];
    threats: string[]; };
  financials: { revenueForecast: ScenarioForecast; unitEconomics: UnitEconomics;
    operatingCosts: Record<string, string>; milestones: string[];
    investorSnapshot: Record<string, string>; };
}
```

## Mock Data Engine

`generateReport(idea)` is a keyword-aware rules engine, not a single static
sample. It scans the idea text for signals and picks from template banks:

- Business-model signals: "app"/"SaaS" → subscription-model bank;
  "marketplace" → two-sided/commission bank; "physical"/"product" →
  unit-sales/retail bank.
- Industry signals: "health"/"medical", "finance"/"fintech", "AI", "education",
  etc. select industry-flavored competitor names, risks, and channel
  suggestions.
- Falls back to a generic startup template bank when no signal matches, so
  every input always produces a complete report.

Numeric fields (market score, LTV:CAC, forecast figures) are generated within
plausible ranges with light randomization seeded by the idea text, so the
same idea reliably produces the same report (useful for demoing and for
tests), while different ideas produce different numbers.

## Components

- `IdeaInputForm` — textarea + submit button, input state.
- `AnalyzingSequence` — cycles staged status strings.
- `ReportPage` — layout shell: `SidebarNav` (scrollspy) + scrollable content
  area + `ExportPdfButton`.
- One presentational component per report section: `ExecutiveSummary`,
  `MarketScore`, `CompetitorScan`, `MonetizationIdeas`, `MVPFeatureList`,
  `LaunchStrategy`, `ViralHooks`, `BusinessModelCanvas`, `SWOTAnalysis`,
  `FinancialProjections`. Each takes its slice of `Report` as props and has
  no knowledge of the mock engine.
- `ExportPdfButton` — invokes `html2pdf.js` against the report container ref.

## PDF Export

`html2pdf.js` renders the report DOM node to canvas and produces a PDF,
preserving the dark investor-deck styling exactly. A plain
`window.print()` was considered and rejected: default print styles strip
background colors/images unless the user manually enables "print
backgrounds," which would silently break the visual style for most users.

## Testing

- Unit tests for `generateReport`: given idea strings containing specific
  keywords, assert the right template bank was selected (e.g. a "marketplace"
  idea produces two-sided business-model-canvas content).
- Render tests for each section component with representative sample data,
  confirming all required fields render.
- No end-to-end/browser test framework in v1 — manual verification via the
  dev server is sufficient at this scope.

## Error Handling

Minimal, since there's no network/API in v1:
- Submit button disabled when the idea field is empty/whitespace-only.
- No other validation — the mock engine always produces a complete report
  for any non-empty input via its fallback template bank.

## Future Hook (not built now, but designed for)

Swapping in a real Claude API call later only requires changing the body of
`generateReport` (e.g. to call a backend endpoint that calls the Anthropic
API) — no changes to `App`, the analyzing sequence, or any report component,
since they all consume the same `Report` interface.
