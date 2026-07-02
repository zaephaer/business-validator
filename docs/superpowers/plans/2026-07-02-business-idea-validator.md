# Business Idea Validator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-only React webapp where a founder enters a one-line startup idea and gets a full, investor-grade validation report (10 sections) rendered in an "Investor Deck" visual style, exportable as a PDF.

**Architecture:** Vite + React + TypeScript SPA with three states (`input` → `analyzing` → `report`) managed in `App.tsx`. Report content comes from a keyword-aware mock generator (`generateReport`) rather than a real API, isolated behind a single async function so it can be swapped later. The report renders as one scrollable document with a sticky sidebar nav and a PDF export button.

**Tech Stack:** React 18, TypeScript, Vite, Vitest + React Testing Library, `html2pdf.js`. No backend, no database, no router.

**Spec:** `docs/superpowers/specs/2026-07-02-business-idea-validator-design.md`

---

## File Structure

```
package.json
tsconfig.json
vite.config.ts
index.html
src/
  main.tsx
  App.tsx
  testSetup.ts
  styles/
    tokens.css
    global.css
  types/
    report.ts
    html2pdf.d.ts
  mock/
    seededRandom.ts
    seededRandom.test.ts
    templateBanks.ts
    templateBanks.test.ts
    generateReport.ts
    generateReport.test.ts
  utils/
    scrollspy.ts
    scrollspy.test.ts
  components/
    IdeaInputForm.tsx
    IdeaInputForm.test.tsx
    AnalyzingSequence.tsx
    AnalyzingSequence.test.tsx
    SidebarNav.tsx
    SidebarNav.test.tsx
    ExportPdfButton.tsx
    ExportPdfButton.test.tsx
    ReportPage.tsx
    ReportPage.test.tsx
    sections/
      ExecutiveSummary.tsx / .test.tsx
      MarketScore.tsx / .test.tsx
      CompetitorScan.tsx / .test.tsx
      MonetizationIdeas.tsx / .test.tsx
      MVPFeatureList.tsx / .test.tsx
      LaunchStrategy.tsx / .test.tsx
      ViralHooks.tsx / .test.tsx
      BusinessModelCanvas.tsx / .test.tsx
      SWOTAnalysis.tsx / .test.tsx
      FinancialProjections.tsx / .test.tsx
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/testSetup.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/App.tsx`
- Create: `src/main.tsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "business-idea-validator",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "html2pdf.js": "^0.10.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "jsdom": "^25.0.1",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testSetup.ts',
  },
});
```

- [ ] **Step 4: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Business Idea Validator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `src/testSetup.ts`**

```typescript
import '@testing-library/jest-dom/vitest';

Element.prototype.scrollIntoView = function scrollIntoView() {};
```

- [ ] **Step 6: Create `src/styles/tokens.css`**

```css
:root {
  --color-bg: #0b1120;
  --color-bg-panel: #0f172a;
  --color-bg-card: #111827;
  --color-border: #1e293b;
  --color-gold: #e2c766;
  --color-text-primary: #f1f5f9;
  --color-text-body: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-text-faint: #64748b;
  --font-serif: Georgia, 'Times New Roman', serif;
}
```

- [ ] **Step 7: Create `src/styles/global.css`**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-body);
  font-family: var(--font-serif);
}

button {
  font-family: inherit;
  cursor: pointer;
}
```

- [ ] **Step 8: Create `src/App.tsx` with a placeholder body**

```tsx
export function App() {
  return <div>Business Idea Validator</div>;
}
```

- [ ] **Step 9: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 10: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 11: Verify the build compiles**

Run: `npm run build`
Expected: `tsc -b` and `vite build` both succeed, producing a `dist/` folder.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src/testSetup.ts src/styles src/App.tsx src/main.tsx
git commit -m "Scaffold Vite + React + TypeScript project"
```

---

### Task 2: Full Design System (Investor Deck styles)

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace `src/styles/global.css` with the full design system**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-body);
  font-family: var(--font-serif);
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Idea input screen */
.idea-input-form {
  max-width: 560px;
  margin: 15vh auto;
  padding: 0 24px;
  text-align: center;
}

.idea-input-form h1 {
  color: var(--color-text-primary);
  font-size: 28px;
  margin-bottom: 24px;
}

.idea-input-form textarea {
  width: 100%;
  min-height: 90px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-body);
  font-family: var(--font-serif);
  font-size: 15px;
  padding: 12px;
  resize: vertical;
}

.idea-input-form button {
  margin-top: 16px;
  background: var(--color-gold);
  color: var(--color-bg);
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 15px;
}

.idea-input-form button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Analyzing screen */
.analyzing-sequence {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: var(--color-text-muted);
  gap: 16px;
}

.analyzing-sequence__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Report page layout */
.report-page {
  display: flex;
  min-height: 100vh;
}

.sidebar-nav {
  width: 220px;
  flex-shrink: 0;
  background: var(--color-bg-panel);
  border-right: 1px solid var(--color-border);
  padding: 20px 12px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  font-size: 13px;
}

.sidebar-nav__brand {
  color: var(--color-gold);
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav button {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text-muted);
  padding: 8px 6px;
  border-radius: 4px;
}

.sidebar-nav button.active {
  color: var(--color-gold);
  background: rgba(226, 199, 102, 0.08);
}

.report-page__actions {
  position: fixed;
  top: 16px;
  right: 24px;
}

.export-pdf-button {
  background: var(--color-gold);
  color: var(--color-bg);
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: bold;
}

.report-page__content {
  flex: 1;
  padding: 32px 48px;
  max-width: 900px;
}

.report-section {
  margin-bottom: 40px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.report-section:first-child {
  border-top: none;
}

.report-section h2 {
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}

.report-section__eyebrow {
  color: var(--color-text-faint);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.report-section__idea {
  color: var(--color-text-primary);
  font-size: 24px;
  margin: 4px 0 16px;
}

.verdict-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.verdict-card__title {
  color: var(--color-gold);
  font-weight: bold;
  margin-bottom: 8px;
}

.summary-facts dt {
  color: var(--color-text-faint);
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 10px;
}

.summary-facts dd {
  margin: 2px 0 0;
  color: var(--color-text-body);
}

.score-badge {
  display: inline-block;
  font-size: 28px;
  color: var(--color-gold);
  font-weight: bold;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px 20px;
  margin-bottom: 12px;
}

.monetization-table,
.forecast-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.monetization-table th,
.monetization-table td,
.forecast-table th,
.forecast-table td {
  border: 1px solid var(--color-border);
  padding: 8px;
  text-align: left;
}

.canvas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.canvas-block {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px;
}

.swot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
```

- [ ] **Step 2: Verify the build still compiles**

Run: `npm run build`
Expected: succeeds (CSS has no syntax errors).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "Add full investor-deck design system styles"
```

---

### Task 3: Report Type Definitions

**Files:**
- Create: `src/types/report.ts`

- [ ] **Step 1: Create `src/types/report.ts`**

```typescript
export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface MonetizationModel {
  name: string;
  revenuePotential: 'Low' | 'Medium' | 'High';
  complexity: 'Low' | 'Medium' | 'High';
  pricingStrategy: string;
}

export type CanvasBlock =
  | 'customerSegments'
  | 'valuePropositions'
  | 'channels'
  | 'customerRelationships'
  | 'revenueStreams'
  | 'keyActivities'
  | 'keyResources'
  | 'keyPartners'
  | 'costStructure';

export interface ScenarioForecast {
  bestCase: number[];
  baseCase: number[];
  worstCase: number[];
}

export interface UnitEconomics {
  cac: number;
  ltv: number;
  ltvToCacRatio: number;
  grossMarginPct: number;
}

export interface Report {
  idea: string;
  executiveSummary: {
    verdict: string;
    why: string;
    targetCustomer: string;
    coreProblem: string;
    valueProposition: string;
    recommendedModel: string;
  };
  marketScore: {
    score: number;
    reasoning: string;
    successFactors: string[];
    risks: string[];
  };
  competitorScan: {
    direct: Competitor[];
    indirect: Competitor[];
    unservedNeeds: string[];
    gaps: string[];
  };
  monetization: MonetizationModel[];
  mvp: {
    build: string[];
    avoid: string[];
  };
  launchStrategy: {
    channels: string[];
    first100Users: string;
    acquisitionChannels: string[];
    weeklyRoadmap: string[];
  };
  viralHooks: {
    headline: string;
    heroCopy: string;
    launchPost: string;
    coldOutreach: string;
    demoScript: string;
  };
  businessModelCanvas: Record<CanvasBlock, string[]>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  financials: {
    revenueForecast: ScenarioForecast;
    unitEconomics: UnitEconomics;
    operatingCosts: Record<string, string>;
    milestones: string[];
    investorSnapshot: Record<string, string>;
  };
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds (unused file, but must type-check cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/types/report.ts
git commit -m "Add Report type definitions"
```

---

### Task 4: Seeded Random Utility

**Files:**
- Create: `src/mock/seededRandom.ts`
- Test: `src/mock/seededRandom.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from 'vitest';
import { hashStringToSeed, createSeededRandom, randomInRange } from './seededRandom';

describe('hashStringToSeed', () => {
  it('produces the same hash for the same string', () => {
    expect(hashStringToSeed('a marketplace for bikes')).toBe(hashStringToSeed('a marketplace for bikes'));
  });

  it('produces different hashes for different strings', () => {
    expect(hashStringToSeed('idea one')).not.toBe(hashStringToSeed('idea two'));
  });
});

describe('createSeededRandom', () => {
  it('produces the same sequence for the same seed', () => {
    const randA = createSeededRandom(42);
    const randB = createSeededRandom(42);
    const sequenceA = [randA(), randA(), randA()];
    const sequenceB = [randB(), randB(), randB()];
    expect(sequenceA).toEqual(sequenceB);
  });

  it('produces different first values for different seeds', () => {
    const randA = createSeededRandom(1);
    const randB = createSeededRandom(999);
    expect(randA()).not.toBe(randB());
  });
});

describe('randomInRange', () => {
  it('returns a value within the inclusive range', () => {
    const rand = createSeededRandom(7);
    for (let i = 0; i < 20; i++) {
      const value = randomInRange(rand, 10, 20);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(20);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/mock/seededRandom.test.ts`
Expected: FAIL with "Cannot find module './seededRandom'" (file doesn't exist yet).

- [ ] **Step 3: Create `src/mock/seededRandom.ts`**

```typescript
export function hashStringToSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

export function createSeededRandom(seed: number): () => number {
  let state = seed || 1;
  return function next(): number {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function randomInRange(rand: () => number, min: number, max: number): number {
  return Math.round(min + rand() * (max - min));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/mock/seededRandom.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/mock/seededRandom.ts src/mock/seededRandom.test.ts
git commit -m "Add deterministic seeded random utility"
```

---

### Task 5: Keyword Detection + Template Banks

**Files:**
- Create: `src/mock/templateBanks.ts`
- Test: `src/mock/templateBanks.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from 'vitest';
import { detectBusinessModel, detectIndustry } from './templateBanks';

describe('detectBusinessModel', () => {
  it('detects marketplace ideas', () => {
    expect(detectBusinessModel('A marketplace for used bikes')).toBe('marketplace');
  });

  it('detects subscription/SaaS ideas', () => {
    expect(detectBusinessModel('A SaaS app for freelancers')).toBe('subscription');
  });

  it('detects retail/physical product ideas', () => {
    expect(detectBusinessModel('A physical product for home brewing')).toBe('retail');
  });

  it('falls back to generic when no keyword matches', () => {
    expect(detectBusinessModel('A community for retirees')).toBe('generic');
  });
});

describe('detectIndustry', () => {
  it('detects health ideas', () => {
    expect(detectIndustry('An app for diabetes meal planning')).toBe('health');
  });

  it('detects fintech ideas', () => {
    expect(detectIndustry('A budgeting tool for fintech investors')).toBe('fintech');
  });

  it('detects AI ideas', () => {
    expect(detectIndustry('An AI-powered writing assistant')).toBe('ai');
  });

  it('detects education ideas', () => {
    expect(detectIndustry('An online course platform for students')).toBe('education');
  });

  it('falls back to generic when no keyword matches', () => {
    expect(detectIndustry('A tool for scheduling meetings')).toBe('generic');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/mock/templateBanks.test.ts`
Expected: FAIL with "Cannot find module './templateBanks'".

- [ ] **Step 3: Create `src/mock/templateBanks.ts`**

```typescript
import type { MonetizationModel } from '../types/report';

export type BusinessModelSignal = 'subscription' | 'marketplace' | 'retail' | 'generic';
export type IndustrySignal = 'health' | 'fintech' | 'ai' | 'education' | 'generic';

export function detectBusinessModel(idea: string): BusinessModelSignal {
  const text = idea.toLowerCase();
  if (text.includes('marketplace')) return 'marketplace';
  if (text.includes('saas') || text.includes('app') || text.includes('platform') || text.includes('subscription')) {
    return 'subscription';
  }
  if (text.includes('product') || text.includes('physical') || text.includes('device') || text.includes('store')) {
    return 'retail';
  }
  return 'generic';
}

export function detectIndustry(idea: string): IndustrySignal {
  const text = idea.toLowerCase();
  if (text.includes('health') || text.includes('medical') || text.includes('diabetes') || text.includes('fitness')) {
    return 'health';
  }
  if (text.includes('finance') || text.includes('fintech') || text.includes('bank') || text.includes('invest')) {
    return 'fintech';
  }
  if (text.includes('ai-powered') || text.includes('artificial intelligence') || text.includes(' ai ') || text.startsWith('ai ')) {
    return 'ai';
  }
  if (text.includes('education') || text.includes('learning') || text.includes('student') || text.includes('course')) {
    return 'education';
  }
  return 'generic';
}

interface BusinessModelBank {
  recommendedModel: string;
  monetization: MonetizationModel[];
  revenueStreams: string[];
  costStructure: string[];
}

export const businessModelBanks: Record<BusinessModelSignal, BusinessModelBank> = {
  subscription: {
    recommendedModel: 'Tiered monthly subscription',
    monetization: [
      { name: 'Tiered SaaS subscription', revenuePotential: 'High', complexity: 'Low', pricingStrategy: 'Free trial, then $15-$49/mo tiers by usage' },
      { name: 'Usage-based add-ons', revenuePotential: 'Medium', complexity: 'Medium', pricingStrategy: 'Metered pricing on top of a base subscription' },
      { name: 'Annual plan discount', revenuePotential: 'Medium', complexity: 'Low', pricingStrategy: '2 months free for annual prepay to improve cash flow' },
    ],
    revenueStreams: ['Monthly/annual subscription fees', 'Usage-based overage charges'],
    costStructure: ['Cloud hosting and API costs', 'Customer support tooling', 'Payment processing fees'],
  },
  marketplace: {
    recommendedModel: 'Take-rate marketplace',
    monetization: [
      { name: 'Transaction commission', revenuePotential: 'High', complexity: 'Medium', pricingStrategy: '10-20% take rate per completed transaction' },
      { name: 'Featured listing fees', revenuePotential: 'Medium', complexity: 'Low', pricingStrategy: 'Flat fee for sellers to boost visibility' },
      { name: 'Subscription for power sellers', revenuePotential: 'Medium', complexity: 'Medium', pricingStrategy: 'Monthly fee for lower commission and analytics' },
    ],
    revenueStreams: ['Transaction commissions', 'Listing/promotion fees'],
    costStructure: ['Payments and fraud infrastructure', 'Trust & safety operations', 'Two-sided marketing spend'],
  },
  retail: {
    recommendedModel: 'Direct-to-consumer unit sales',
    monetization: [
      { name: 'Unit sales markup', revenuePotential: 'Medium', complexity: 'Medium', pricingStrategy: 'Cost-plus pricing with 40-60% gross margin target' },
      { name: 'Subscribe-and-save refills', revenuePotential: 'High', complexity: 'Medium', pricingStrategy: 'Recurring shipments at a discount to one-off purchase' },
      { name: 'Wholesale/B2B channel', revenuePotential: 'Medium', complexity: 'High', pricingStrategy: 'Bulk pricing for retail partners' },
    ],
    revenueStreams: ['Direct product sales', 'Recurring refill/subscription orders'],
    costStructure: ['Manufacturing/COGS', 'Fulfillment and shipping', 'Inventory carrying costs'],
  },
  generic: {
    recommendedModel: 'Freemium with paid upgrade',
    monetization: [
      { name: 'Freemium upgrade', revenuePotential: 'Medium', complexity: 'Low', pricingStrategy: 'Free core experience, paid tier unlocks advanced features' },
      { name: 'One-time license fee', revenuePotential: 'Low', complexity: 'Low', pricingStrategy: 'Single upfront payment per user or seat' },
      { name: 'Sponsorship/partnership revenue', revenuePotential: 'Low', complexity: 'Medium', pricingStrategy: 'Revenue share with aligned partners' },
    ],
    revenueStreams: ['Upgrade purchases', 'Partnership revenue share'],
    costStructure: ['Hosting and infrastructure', 'General operations'],
  },
};

interface IndustryBank {
  competitorNames: string[];
  risks: string[];
  successFactors: string[];
  targetCustomer: string;
  channels: string[];
}

export const industryBanks: Record<IndustrySignal, IndustryBank> = {
  health: {
    competitorNames: ['Noom', 'MyFitnessPal', 'Livongo', 'Headspace Health'],
    risks: ['HIPAA and health-data compliance overhead', 'Long sales cycles with healthcare partners', 'User trust barriers around sensitive health data'],
    successFactors: ['Clinical credibility and trust signals', 'Simple onboarding for non-technical users', 'Integration with existing care/health ecosystems'],
    targetCustomer: 'Health-conscious individuals managing a chronic condition or wellness goal',
    channels: ['Health & wellness communities', 'Patient advocacy groups', 'Provider referral partnerships'],
  },
  fintech: {
    competitorNames: ['Mint', 'YNAB', 'Chime', 'Plaid-powered challengers'],
    risks: ['Regulatory and compliance overhead (KYC/AML)', 'High customer acquisition cost in a crowded category', 'Trust barrier around handling money'],
    successFactors: ['Bank-grade security and transparent trust signals', 'Frictionless onboarding and account linking', 'Clear, defensible unit economics'],
    targetCustomer: 'Financially engaged consumers or small businesses seeking more control over money',
    channels: ['Personal finance communities', 'Content/SEO around money management', 'Affiliate and referral partnerships'],
  },
  ai: {
    competitorNames: ['ChatGPT plugins/GPTs', 'Notion AI', 'Jasper', 'Vertical AI copycats'],
    risks: ['Fast-moving foundation model competition', 'Thin differentiation if built only as a prompt wrapper', 'API cost volatility at scale'],
    successFactors: ['Proprietary data or workflow lock-in beyond the base model', 'Fast iteration to stay ahead of platform-level features', 'Clear ROI story versus doing it manually'],
    targetCustomer: 'Professionals looking to automate a specific, repetitive knowledge-work task',
    channels: ['Product Hunt and AI-focused communities', 'Twitter/X build-in-public audience', 'Niche Slack/Discord communities'],
  },
  education: {
    competitorNames: ['Coursera', 'Duolingo', 'Khan Academy', 'Udemy'],
    risks: ['Long user habit-formation curve', 'Price sensitivity among learners', 'Free alternatives lowering willingness to pay'],
    successFactors: ['Strong completion/engagement mechanics', 'Credible outcomes or certification value', 'Word-of-mouth among students/educators'],
    targetCustomer: 'Self-directed learners seeking a specific skill or credential',
    channels: ['Reddit and niche learning communities', 'Educator/influencer partnerships', 'SEO-driven content marketing'],
  },
  generic: {
    competitorNames: ['Established incumbent #1', 'Established incumbent #2', 'Well-funded startup challenger'],
    risks: ['Undifferentiated positioning versus incumbents', 'Unproven willingness to pay', 'Customer acquisition cost higher than assumed'],
    successFactors: ['Clear wedge use case to win an initial beachhead market', 'Fast feedback loop with early users', 'Distribution advantage or unfair edge'],
    targetCustomer: 'Early adopters actively frustrated with the current best alternative',
    channels: ['Product Hunt', 'Relevant subreddits and forums', 'Direct outreach to early adopters'],
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/mock/templateBanks.test.ts`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add src/mock/templateBanks.ts src/mock/templateBanks.test.ts
git commit -m "Add keyword detection and template banks for mock report generation"
```

---

### Task 6: Mock Report Generator

**Files:**
- Create: `src/mock/generateReport.ts`
- Test: `src/mock/generateReport.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from 'vitest';
import { buildReport } from './generateReport';

describe('buildReport', () => {
  it('selects the marketplace business model bank for marketplace ideas', () => {
    const report = buildReport('A marketplace connecting freelance designers with startups');
    expect(report.executiveSummary.recommendedModel).toBe('Take-rate marketplace');
    expect(report.monetization[0].name).toBe('Transaction commission');
  });

  it('selects the health industry bank for health-related ideas', () => {
    const report = buildReport('An AI-powered meal planner for people with diabetes');
    expect(report.competitorScan.direct.map((c) => c.name)).toContain('Noom');
  });

  it('falls back to generic banks for ideas with no recognized keywords', () => {
    const report = buildReport('A tool for xyz');
    expect(report.executiveSummary.recommendedModel).toBe('Freemium with paid upgrade');
  });

  it('produces the same numeric outputs for the same idea (deterministic)', () => {
    const a = buildReport('A marketplace for vintage furniture');
    const b = buildReport('A marketplace for vintage furniture');
    expect(a.marketScore.score).toBe(b.marketScore.score);
    expect(a.financials.unitEconomics.cac).toBe(b.financials.unitEconomics.cac);
  });

  it('populates every top-level report section for any idea', () => {
    const report = buildReport('Something completely generic');
    expect(report.executiveSummary).toBeDefined();
    expect(report.marketScore).toBeDefined();
    expect(report.competitorScan.direct.length).toBeGreaterThan(0);
    expect(report.monetization.length).toBeGreaterThan(0);
    expect(report.mvp.build.length).toBe(5);
    expect(report.mvp.avoid.length).toBe(10);
    expect(report.launchStrategy.weeklyRoadmap.length).toBeGreaterThan(0);
    expect(report.viralHooks.headline).toContain('Something completely generic');
    expect(Object.keys(report.businessModelCanvas).length).toBe(9);
    expect(report.swot.strengths.length).toBeGreaterThan(0);
    expect(report.financials.revenueForecast.baseCase.length).toBe(12);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/mock/generateReport.test.ts`
Expected: FAIL with "Cannot find module './generateReport'".

- [ ] **Step 3: Create `src/mock/generateReport.ts`**

```typescript
import type { Competitor, Report } from '../types/report';
import { businessModelBanks, detectBusinessModel, detectIndustry, industryBanks } from './templateBanks';
import { createSeededRandom, hashStringToSeed, randomInRange } from './seededRandom';

function buildCompetitors(names: string[]): Competitor[] {
  return names.map((name, i) => ({
    name,
    strength: i % 2 === 0 ? 'Strong existing user base and brand trust' : 'Deep feature set and integrations',
    weakness: i % 2 === 0 ? 'Slow to iterate, dated experience for newer users' : 'High price point and steep learning curve',
  }));
}

export function buildReport(idea: string): Report {
  const trimmedIdea = idea.trim();
  const modelSignal = detectBusinessModel(trimmedIdea);
  const industrySignal = detectIndustry(trimmedIdea);
  const modelBank = businessModelBanks[modelSignal];
  const industryBank = industryBanks[industrySignal];

  const seed = hashStringToSeed(trimmedIdea);
  const rand = createSeededRandom(seed);

  const marketScoreValue = randomInRange(rand, 6, 9);
  const directCompetitors = buildCompetitors(industryBank.competitorNames.slice(0, 4));
  const indirectCompetitors = buildCompetitors(['Manual/spreadsheet workflows', 'Generic productivity tools']);

  const cac = randomInRange(rand, 20, 120);
  const ltv = randomInRange(rand, 80, 480);
  const monthlyBase = randomInRange(rand, 500, 4000);

  const buildForecast = (multiplier: number): number[] =>
    Array.from({ length: 12 }, (_, month) => Math.round(monthlyBase * multiplier * (1 + month * 0.35)));

  return {
    idea: trimmedIdea,
    executiveSummary: {
      verdict: marketScoreValue >= 7 ? 'Strong opportunity worth validating' : 'Promising but needs sharper focus before building',
      why: `Growing demand signals, ${directCompetitors.length} identifiable direct competitors, a clear monetization path via ${modelBank.recommendedModel.toLowerCase()}, and an achievable MVP scope.`,
      targetCustomer: industryBank.targetCustomer,
      coreProblem: `${industryBank.targetCustomer} currently rely on fragmented, manual, or outdated alternatives to solve this problem.`,
      valueProposition: `"${trimmedIdea}" removes the friction of existing alternatives with a focused, purpose-built experience.`,
      recommendedModel: modelBank.recommendedModel,
    },
    marketScore: {
      score: marketScoreValue,
      reasoning: `Market timing favors this idea given rising interest in the space, though competitive intensity from ${directCompetitors[0]?.name ?? 'incumbents'} means differentiation is essential.`,
      successFactors: industryBank.successFactors,
      risks: industryBank.risks,
    },
    competitorScan: {
      direct: directCompetitors,
      indirect: indirectCompetitors,
      unservedNeeds: ['A simpler, faster onboarding than existing tools', 'Better pricing for early-stage/individual users'],
      gaps: ['No dominant player has won on speed-to-value', 'Existing tools are built for teams, not individuals'],
    },
    monetization: modelBank.monetization,
    mvp: {
      build: [
        'Core idea-to-outcome workflow (the single job the product must do)',
        'Simple onboarding with no required account for the first use',
        'One clear call-to-action per screen',
        'Minimal but real output the user can immediately use or share',
        'Basic analytics to see where users drop off',
      ],
      avoid: [
        'Multi-user team/collaboration features',
        'Custom branding or white-labeling',
        'Native mobile apps (web-first is enough for v1)',
        'Complex role-based permissions',
        'Third-party integrations beyond the essential one',
        'AI model fine-tuning or custom model training',
        'Internationalization/localization',
        'Offline mode',
        'Advanced admin dashboards',
        'Billing plan customization beyond 1-2 tiers',
      ],
    },
    launchStrategy: {
      channels: ['Product Hunt', 'Reddit', 'X', 'LinkedIn', ...industryBank.channels],
      first100Users: `${industryBank.targetCustomer}, sourced directly from communities where they already discuss this problem.`,
      acquisitionChannels: industryBank.channels,
      weeklyRoadmap: [
        'Week 1: Ship a working landing page and collect emails from interested users',
        'Week 2: Launch a minimal usable version to the waitlist for direct feedback',
        'Week 3: Publish launch posts on Product Hunt and relevant communities',
        'Week 4: Iterate on onboarding based on drop-off data from the first cohort',
      ],
    },
    viralHooks: {
      headline: `Stop doing "${trimmedIdea}" the hard way`,
      heroCopy: `${trimmedIdea} — validated, simplified, and ready in minutes.`,
      launchPost: `We built ${trimmedIdea} because the existing options were too slow, too generic, or too expensive. Here's what we shipped, and why.`,
      coldOutreach: `Hi {name}, I noticed you work on problems related to ${trimmedIdea.toLowerCase()}. We built something that might save you real time — open to a quick look?`,
      demoScript: `[0:00] The problem: ${industryBank.targetCustomer} struggle with this today. [0:15] The fix: here's ${trimmedIdea} solving it live. [0:45] The result: how this saves time/money. [1:00] Call to action: try it now.`,
    },
    businessModelCanvas: {
      customerSegments: [industryBank.targetCustomer],
      valuePropositions: [`Faster, simpler way to achieve the outcome behind "${trimmedIdea}"`],
      channels: industryBank.channels,
      customerRelationships: ['Self-serve with responsive support', 'Community-driven feedback loop'],
      revenueStreams: modelBank.revenueStreams,
      keyActivities: ['Product development', 'Customer support and feedback triage', 'Content/community-led marketing'],
      keyResources: ['Core product/technology', 'Founding team domain expertise', 'Early user community'],
      keyPartners: ['Distribution/community partners', 'Infrastructure and API providers'],
      costStructure: modelBank.costStructure,
    },
    swot: {
      strengths: ['Fast, focused MVP scope', 'Clear initial target customer', 'Low upfront infrastructure cost'],
      weaknesses: ['Limited brand recognition versus incumbents', 'Small team bandwidth for support and sales'],
      opportunities: ['Underserved segment within a growing market', 'Potential for word-of-mouth virality'],
      threats: industryBank.risks,
    },
    financials: {
      revenueForecast: {
        bestCase: buildForecast(1.4),
        baseCase: buildForecast(1.0),
        worstCase: buildForecast(0.6),
      },
      unitEconomics: {
        cac,
        ltv,
        ltvToCacRatio: Math.round((ltv / cac) * 10) / 10,
        grossMarginPct: randomInRange(rand, 55, 85),
      },
      operatingCosts: {
        infrastructure: '$200-$800/mo depending on usage',
        aiApiCosts: '$100-$1,000/mo depending on volume',
        marketing: '$500-$2,000/mo for early paid experiments',
        team: 'Founder-only or 1-2 contractors pre-revenue',
        subscriptions: '$100-$300/mo for core SaaS tooling',
      },
      milestones: [
        'Break-even estimated once monthly recurring revenue covers infrastructure + tooling costs',
        'First 100 paying customers as the initial revenue target',
        '1,000 active users as the initial growth target',
        'Pre-seed/friends-and-family funding sufficient to reach these milestones',
      ],
      investorSnapshot: {
        arrPotential: `$${(monthlyBase * 12).toLocaleString()} in year-one ARR at base case`,
        paybackPeriod: `${Math.max(1, Math.round(cac / (ltv / 12)))} months`,
        profitabilityTimeline: '12-18 months to profitability at base-case growth',
        keyAssumptions: `Assumes ${modelBank.recommendedModel.toLowerCase()} pricing and steady month-over-month growth`,
      },
    },
  };
}

export async function generateReport(idea: string): Promise<Report> {
  return buildReport(idea);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/mock/generateReport.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/mock/generateReport.ts src/mock/generateReport.test.ts
git commit -m "Add keyword-aware mock report generator"
```

---

### Task 7: Scrollspy Utility

**Files:**
- Create: `src/utils/scrollspy.ts`
- Test: `src/utils/scrollspy.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from 'vitest';
import { determineActiveSection } from './scrollspy';

describe('determineActiveSection', () => {
  const sections = [
    { id: 'summary', top: 0 },
    { id: 'market', top: 500 },
    { id: 'competitors', top: 1000 },
  ];

  it('returns the first section when scrolled to the top', () => {
    expect(determineActiveSection(sections, 0)).toBe('summary');
  });

  it('returns the section whose offset has been passed', () => {
    expect(determineActiveSection(sections, 520)).toBe('market');
  });

  it('returns the last matching section when multiple thresholds are passed', () => {
    expect(determineActiveSection(sections, 1050)).toBe('competitors');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/scrollspy.test.ts`
Expected: FAIL with "Cannot find module './scrollspy'".

- [ ] **Step 3: Create `src/utils/scrollspy.ts`**

```typescript
export interface SectionOffset {
  id: string;
  top: number;
}

export function determineActiveSection(sections: SectionOffset[], scrollY: number): string {
  let active = sections[0]?.id ?? '';
  for (const section of sections) {
    if (scrollY >= section.top - 80) {
      active = section.id;
    }
  }
  return active;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/scrollspy.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/utils/scrollspy.ts src/utils/scrollspy.test.ts
git commit -m "Add scrollspy active-section utility"
```

---

### Task 8: IdeaInputForm Component

**Files:**
- Create: `src/components/IdeaInputForm.tsx`
- Test: `src/components/IdeaInputForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IdeaInputForm } from './IdeaInputForm';

describe('IdeaInputForm', () => {
  it('disables submit until the idea field has content', () => {
    render(<IdeaInputForm onSubmit={() => {}} />);
    expect(screen.getByRole('button', { name: /validate my idea/i })).toBeDisabled();
  });

  it('calls onSubmit with the trimmed idea text', () => {
    const onSubmit = vi.fn();
    render(<IdeaInputForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/startup idea/i), { target: { value: '  A meal planner app  ' } });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));
    expect(onSubmit).toHaveBeenCalledWith('A meal planner app');
  });

  it('does not call onSubmit when the field is empty or whitespace', () => {
    const onSubmit = vi.fn();
    render(<IdeaInputForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/startup idea/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/IdeaInputForm.test.tsx`
Expected: FAIL with "Cannot find module './IdeaInputForm'".

- [ ] **Step 3: Create `src/components/IdeaInputForm.tsx`**

```tsx
import { useState } from 'react';

interface Props {
  onSubmit: (idea: string) => void;
}

export function IdeaInputForm({ onSubmit }: Props) {
  const [idea, setIdea] = useState('');
  const trimmed = idea.trim();

  return (
    <form
      className="idea-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onSubmit(trimmed);
      }}
    >
      <h1>Turn a one-line startup idea into a complete pre-launch report.</h1>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g. An AI-powered meal planner for people with diabetes"
        aria-label="Startup idea"
      />
      <button type="submit" disabled={!trimmed}>
        Validate My Idea
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/IdeaInputForm.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/IdeaInputForm.tsx src/components/IdeaInputForm.test.tsx
git commit -m "Add IdeaInputForm component"
```

---

### Task 9: AnalyzingSequence Component

**Files:**
- Create: `src/components/AnalyzingSequence.tsx`
- Test: `src/components/AnalyzingSequence.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AnalyzingSequence } from './AnalyzingSequence';

describe('AnalyzingSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the first stage message immediately', () => {
    render(<AnalyzingSequence onComplete={() => {}} />);
    expect(screen.getByText('Scanning competitors...')).toBeInTheDocument();
  });

  it('cycles through stage messages over time', () => {
    render(<AnalyzingSequence onComplete={() => {}} />);
    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByText('Scoring market opportunity...')).toBeInTheDocument();
  });

  it('calls onComplete after the final stage', () => {
    const onComplete = vi.fn();
    render(<AnalyzingSequence onComplete={onComplete} />);
    act(() => {
      vi.advanceTimersByTime(900 * 5);
    });
    expect(onComplete).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/AnalyzingSequence.test.tsx`
Expected: FAIL with "Cannot find module './AnalyzingSequence'".

- [ ] **Step 3: Create `src/components/AnalyzingSequence.tsx`**

```tsx
import { useEffect, useState } from 'react';

const STAGES = [
  'Scanning competitors...',
  'Scoring market opportunity...',
  'Modeling monetization options...',
  'Building financial projections...',
  'Assembling your report...',
];

const STAGE_DURATION_MS = 900;

interface Props {
  onComplete: () => void;
}

export function AnalyzingSequence({ onComplete }: Props) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) {
      const finishTimer = setTimeout(onComplete, STAGE_DURATION_MS);
      return () => clearTimeout(finishTimer);
    }
    const timer = setTimeout(() => setStageIndex((i) => i + 1), STAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stageIndex, onComplete]);

  return (
    <div className="analyzing-sequence">
      <div className="analyzing-sequence__spinner" />
      <p>{STAGES[stageIndex]}</p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/AnalyzingSequence.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/AnalyzingSequence.tsx src/components/AnalyzingSequence.test.tsx
git commit -m "Add AnalyzingSequence loading component"
```

---

### Task 10: SidebarNav Component

**Files:**
- Create: `src/components/SidebarNav.tsx`
- Test: `src/components/SidebarNav.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarNav } from './SidebarNav';

const sections = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'market', label: 'Market Score' },
];

describe('SidebarNav', () => {
  it('renders a link for every section', () => {
    render(<SidebarNav sections={sections} activeId="summary" onNavigate={() => {}} />);
    expect(screen.getByText('Executive Summary')).toBeInTheDocument();
    expect(screen.getByText('Market Score')).toBeInTheDocument();
  });

  it('marks the active section', () => {
    render(<SidebarNav sections={sections} activeId="market" onNavigate={() => {}} />);
    expect(screen.getByText('Market Score')).toHaveClass('active');
  });

  it('calls onNavigate when a section link is clicked', () => {
    const onNavigate = vi.fn();
    render(<SidebarNav sections={sections} activeId="summary" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('Market Score'));
    expect(onNavigate).toHaveBeenCalledWith('market');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/SidebarNav.test.tsx`
Expected: FAIL with "Cannot find module './SidebarNav'".

- [ ] **Step 3: Create `src/components/SidebarNav.tsx`**

```tsx
export interface SidebarSection {
  id: string;
  label: string;
}

interface Props {
  sections: SidebarSection[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export function SidebarNav({ sections, activeId, onNavigate }: Props) {
  return (
    <nav className="sidebar-nav">
      <div className="sidebar-nav__brand">Idea Validator</div>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={section.id === activeId ? 'active' : ''}
              onClick={() => onNavigate(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/SidebarNav.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/SidebarNav.tsx src/components/SidebarNav.test.tsx
git commit -m "Add SidebarNav component"
```

---

### Task 11: ExportPdfButton Component

**Files:**
- Create: `src/types/html2pdf.d.ts`
- Create: `src/components/ExportPdfButton.tsx`
- Test: `src/components/ExportPdfButton.test.tsx`

- [ ] **Step 1: Create `src/types/html2pdf.d.ts`**

```typescript
declare module 'html2pdf.js';
```

- [ ] **Step 2: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { ExportPdfButton } from './ExportPdfButton';

const saveMock = vi.fn();
const fromMock = vi.fn(() => ({ save: saveMock }));
const setMock = vi.fn(() => ({ from: fromMock }));

vi.mock('html2pdf.js', () => ({
  default: vi.fn(() => ({ set: setMock })),
}));

describe('ExportPdfButton', () => {
  it('triggers html2pdf export when clicked', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <div>
        <div ref={ref}>content</div>
        <ExportPdfButton targetRef={ref} fileName="test-report.pdf" />
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /export pdf/i }));
    expect(setMock).toHaveBeenCalledWith(expect.objectContaining({ filename: 'test-report.pdf' }));
    expect(saveMock).toHaveBeenCalled();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/components/ExportPdfButton.test.tsx`
Expected: FAIL with "Cannot find module './ExportPdfButton'".

- [ ] **Step 4: Create `src/components/ExportPdfButton.tsx`**

```tsx
import type { RefObject } from 'react';
import html2pdf from 'html2pdf.js';

interface Props {
  targetRef: RefObject<HTMLDivElement>;
  fileName: string;
}

export function ExportPdfButton({ targetRef, fileName }: Props) {
  function handleExport() {
    if (!targetRef.current) return;
    html2pdf()
      .set({ filename: fileName, margin: 0.4, jsPDF: { format: 'letter' } })
      .from(targetRef.current)
      .save();
  }

  return (
    <button type="button" className="export-pdf-button" onClick={handleExport}>
      Export PDF
    </button>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ExportPdfButton.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add src/types/html2pdf.d.ts src/components/ExportPdfButton.tsx src/components/ExportPdfButton.test.tsx
git commit -m "Add ExportPdfButton component"
```

---

### Task 12: ExecutiveSummary Section Component

**Files:**
- Create: `src/components/sections/ExecutiveSummary.tsx`
- Test: `src/components/sections/ExecutiveSummary.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExecutiveSummary } from './ExecutiveSummary';

const data = {
  verdict: 'Strong opportunity worth validating',
  why: 'Growing demand and clear monetization path.',
  targetCustomer: 'Busy professionals',
  coreProblem: 'No easy way to plan meals',
  valueProposition: 'A faster way to plan meals',
  recommendedModel: 'Tiered monthly subscription',
};

describe('ExecutiveSummary', () => {
  it('renders the verdict, why, and key facts', () => {
    render(<ExecutiveSummary data={data} ideaLabel="AI meal planner" />);
    expect(screen.getByText(/Strong opportunity worth validating/)).toBeInTheDocument();
    expect(screen.getByText(data.why)).toBeInTheDocument();
    expect(screen.getByText(data.targetCustomer)).toBeInTheDocument();
    expect(screen.getByText(/AI meal planner/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/ExecutiveSummary.test.tsx`
Expected: FAIL with "Cannot find module './ExecutiveSummary'".

- [ ] **Step 3: Create `src/components/sections/ExecutiveSummary.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['executiveSummary'];
  ideaLabel: string;
}

export function ExecutiveSummary({ data, ideaLabel }: Props) {
  return (
    <section id="summary" className="report-section">
      <div className="report-section__eyebrow">Startup Idea Validation Report</div>
      <h1 className="report-section__idea">&quot;{ideaLabel}&quot;</h1>
      <div className="verdict-card">
        <div className="verdict-card__title">VERDICT: {data.verdict}</div>
        <p>{data.why}</p>
      </div>
      <dl className="summary-facts">
        <dt>Target Customer</dt>
        <dd>{data.targetCustomer}</dd>
        <dt>Core Problem</dt>
        <dd>{data.coreProblem}</dd>
        <dt>Value Proposition</dt>
        <dd>{data.valueProposition}</dd>
        <dt>Recommended Business Model</dt>
        <dd>{data.recommendedModel}</dd>
      </dl>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/ExecutiveSummary.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ExecutiveSummary.tsx src/components/sections/ExecutiveSummary.test.tsx
git commit -m "Add ExecutiveSummary section component"
```

---

### Task 13: MarketScore Section Component

**Files:**
- Create: `src/components/sections/MarketScore.tsx`
- Test: `src/components/sections/MarketScore.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarketScore } from './MarketScore';

const data = {
  score: 8,
  reasoning: 'Strong timing and clear demand signals.',
  successFactors: ['Fast onboarding', 'Clear differentiation'],
  risks: ['Crowded category', 'Slow enterprise sales cycles'],
};

describe('MarketScore', () => {
  it('renders the score, reasoning, success factors, and risks', () => {
    render(<MarketScore data={data} />);
    expect(screen.getByText('8/10')).toBeInTheDocument();
    expect(screen.getByText(data.reasoning)).toBeInTheDocument();
    expect(screen.getByText('Fast onboarding')).toBeInTheDocument();
    expect(screen.getByText('Crowded category')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/MarketScore.test.tsx`
Expected: FAIL with "Cannot find module './MarketScore'".

- [ ] **Step 3: Create `src/components/sections/MarketScore.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['marketScore'];
}

export function MarketScore({ data }: Props) {
  return (
    <section id="market" className="report-section">
      <h2>1. Market Score</h2>
      <div className="score-badge">{data.score}/10</div>
      <p>{data.reasoning}</p>
      <h3>Success Factors</h3>
      <ul>
        {data.successFactors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
      <h3>Risks</h3>
      <ul>
        {data.risks.map((risk) => (
          <li key={risk}>{risk}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/MarketScore.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/MarketScore.tsx src/components/sections/MarketScore.test.tsx
git commit -m "Add MarketScore section component"
```

---

### Task 14: CompetitorScan Section Component

**Files:**
- Create: `src/components/sections/CompetitorScan.tsx`
- Test: `src/components/sections/CompetitorScan.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompetitorScan } from './CompetitorScan';

const data = {
  direct: [{ name: 'Noom', strength: 'Strong brand', weakness: 'High price' }],
  indirect: [{ name: 'Spreadsheets', strength: 'Free', weakness: 'Manual' }],
  unservedNeeds: ['Faster onboarding'],
  gaps: ['No player wins on speed'],
};

describe('CompetitorScan', () => {
  it('renders direct, indirect competitors, unserved needs, and gaps', () => {
    render(<CompetitorScan data={data} />);
    expect(screen.getByText(/Noom/)).toBeInTheDocument();
    expect(screen.getByText('Spreadsheets')).toBeInTheDocument();
    expect(screen.getByText('Faster onboarding')).toBeInTheDocument();
    expect(screen.getByText('No player wins on speed')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/CompetitorScan.test.tsx`
Expected: FAIL with "Cannot find module './CompetitorScan'".

- [ ] **Step 3: Create `src/components/sections/CompetitorScan.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['competitorScan'];
}

export function CompetitorScan({ data }: Props) {
  return (
    <section id="competitors" className="report-section">
      <h2>2. Competitor Scan</h2>
      <h3>Direct Competitors</h3>
      <ul>
        {data.direct.map((c) => (
          <li key={c.name}>
            <strong>{c.name}</strong> — {c.strength}; {c.weakness}
          </li>
        ))}
      </ul>
      <h3>Indirect Alternatives</h3>
      <ul>
        {data.indirect.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <h3>Unserved Needs</h3>
      <ul>
        {data.unservedNeeds.map((need) => (
          <li key={need}>{need}</li>
        ))}
      </ul>
      <h3>Market Gaps</h3>
      <ul>
        {data.gaps.map((gap) => (
          <li key={gap}>{gap}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/CompetitorScan.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/CompetitorScan.tsx src/components/sections/CompetitorScan.test.tsx
git commit -m "Add CompetitorScan section component"
```

---

### Task 15: MonetizationIdeas Section Component

**Files:**
- Create: `src/components/sections/MonetizationIdeas.tsx`
- Test: `src/components/sections/MonetizationIdeas.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MonetizationIdeas } from './MonetizationIdeas';

const data = [
  { name: 'Transaction commission', revenuePotential: 'High' as const, complexity: 'Medium' as const, pricingStrategy: '10-20% take rate' },
];

describe('MonetizationIdeas', () => {
  it('renders each monetization model as a row', () => {
    render(<MonetizationIdeas data={data} />);
    expect(screen.getByText('Transaction commission')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('10-20% take rate')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/MonetizationIdeas.test.tsx`
Expected: FAIL with "Cannot find module './MonetizationIdeas'".

- [ ] **Step 3: Create `src/components/sections/MonetizationIdeas.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['monetization'];
}

export function MonetizationIdeas({ data }: Props) {
  return (
    <section id="monetization" className="report-section">
      <h2>3. Monetization Ideas</h2>
      <table className="monetization-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Revenue Potential</th>
            <th>Complexity</th>
            <th>Pricing Strategy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((model) => (
            <tr key={model.name}>
              <td>{model.name}</td>
              <td>{model.revenuePotential}</td>
              <td>{model.complexity}</td>
              <td>{model.pricingStrategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/MonetizationIdeas.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/MonetizationIdeas.tsx src/components/sections/MonetizationIdeas.test.tsx
git commit -m "Add MonetizationIdeas section component"
```

---

### Task 16: MVPFeatureList Section Component

**Files:**
- Create: `src/components/sections/MVPFeatureList.tsx`
- Test: `src/components/sections/MVPFeatureList.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MVPFeatureList } from './MVPFeatureList';

const data = {
  build: ['Core workflow'],
  avoid: ['Team collaboration'],
};

describe('MVPFeatureList', () => {
  it('renders build-first and avoid lists', () => {
    render(<MVPFeatureList data={data} />);
    expect(screen.getByText('Core workflow')).toBeInTheDocument();
    expect(screen.getByText('Team collaboration')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/MVPFeatureList.test.tsx`
Expected: FAIL with "Cannot find module './MVPFeatureList'".

- [ ] **Step 3: Create `src/components/sections/MVPFeatureList.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['mvp'];
}

export function MVPFeatureList({ data }: Props) {
  return (
    <section id="mvp" className="report-section">
      <h2>4. MVP Feature List</h2>
      <h3>Build First</h3>
      <ul>
        {data.build.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h3>Do Not Build</h3>
      <ul>
        {data.avoid.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/MVPFeatureList.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/MVPFeatureList.tsx src/components/sections/MVPFeatureList.test.tsx
git commit -m "Add MVPFeatureList section component"
```

---

### Task 17: LaunchStrategy Section Component

**Files:**
- Create: `src/components/sections/LaunchStrategy.tsx`
- Test: `src/components/sections/LaunchStrategy.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LaunchStrategy } from './LaunchStrategy';

const data = {
  channels: ['Product Hunt'],
  first100Users: 'Early adopters from niche communities',
  acquisitionChannels: ['Reddit communities'],
  weeklyRoadmap: ['Week 1: Ship landing page'],
};

describe('LaunchStrategy', () => {
  it('renders channels, first 100 users, acquisition channels, and roadmap', () => {
    render(<LaunchStrategy data={data} />);
    expect(screen.getByText('Product Hunt')).toBeInTheDocument();
    expect(screen.getByText(data.first100Users)).toBeInTheDocument();
    expect(screen.getByText('Reddit communities')).toBeInTheDocument();
    expect(screen.getByText('Week 1: Ship landing page')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/LaunchStrategy.test.tsx`
Expected: FAIL with "Cannot find module './LaunchStrategy'".

- [ ] **Step 3: Create `src/components/sections/LaunchStrategy.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['launchStrategy'];
}

export function LaunchStrategy({ data }: Props) {
  return (
    <section id="launch" className="report-section">
      <h2>5. Launch Strategy</h2>
      <h3>Launch Channels</h3>
      <ul>
        {data.channels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3>First 100 Users</h3>
      <p>{data.first100Users}</p>
      <h3>Acquisition Channels</h3>
      <ul>
        {data.acquisitionChannels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3>Growth Plan</h3>
      <ol>
        {data.weeklyRoadmap.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/LaunchStrategy.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/LaunchStrategy.tsx src/components/sections/LaunchStrategy.test.tsx
git commit -m "Add LaunchStrategy section component"
```

---

### Task 18: ViralHooks Section Component

**Files:**
- Create: `src/components/sections/ViralHooks.tsx`
- Test: `src/components/sections/ViralHooks.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ViralHooks } from './ViralHooks';

const data = {
  headline: 'Stop doing it the hard way',
  heroCopy: 'Validated, simplified, ready in minutes.',
  launchPost: 'We built this because existing options were too slow.',
  coldOutreach: 'Hi, open to a quick look?',
  demoScript: '[0:00] The problem...',
};

describe('ViralHooks', () => {
  it('renders all five hook types', () => {
    render(<ViralHooks data={data} />);
    expect(screen.getByText(data.headline)).toBeInTheDocument();
    expect(screen.getByText(data.heroCopy)).toBeInTheDocument();
    expect(screen.getByText(data.launchPost)).toBeInTheDocument();
    expect(screen.getByText(data.coldOutreach)).toBeInTheDocument();
    expect(screen.getByText(data.demoScript)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/ViralHooks.test.tsx`
Expected: FAIL with "Cannot find module './ViralHooks'".

- [ ] **Step 3: Create `src/components/sections/ViralHooks.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['viralHooks'];
}

export function ViralHooks({ data }: Props) {
  return (
    <section id="hooks" className="report-section">
      <h2>6. Viral Hooks</h2>
      <h3>Thumbnail Headline</h3>
      <p>{data.headline}</p>
      <h3>Landing Page Hero Copy</h3>
      <p>{data.heroCopy}</p>
      <h3>Launch Post</h3>
      <p>{data.launchPost}</p>
      <h3>Cold Outreach Message</h3>
      <p>{data.coldOutreach}</p>
      <h3>Demo Video Script</h3>
      <p>{data.demoScript}</p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/ViralHooks.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ViralHooks.tsx src/components/sections/ViralHooks.test.tsx
git commit -m "Add ViralHooks section component"
```

---

### Task 19: BusinessModelCanvas Section Component

**Files:**
- Create: `src/components/sections/BusinessModelCanvas.tsx`
- Test: `src/components/sections/BusinessModelCanvas.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BusinessModelCanvas } from './BusinessModelCanvas';
import type { CanvasBlock } from '../../types/report';

const data: Record<CanvasBlock, string[]> = {
  customerSegments: ['Busy professionals'],
  valuePropositions: ['Faster outcome'],
  channels: ['Product Hunt'],
  customerRelationships: ['Self-serve'],
  revenueStreams: ['Subscription fees'],
  keyActivities: ['Product development'],
  keyResources: ['Core technology'],
  keyPartners: ['Infrastructure providers'],
  costStructure: ['Cloud hosting'],
};

describe('BusinessModelCanvas', () => {
  it('renders all nine canvas blocks with their content', () => {
    render(<BusinessModelCanvas data={data} />);
    expect(screen.getByText('Customer Segments')).toBeInTheDocument();
    expect(screen.getByText('Busy professionals')).toBeInTheDocument();
    expect(screen.getByText('Cost Structure')).toBeInTheDocument();
    expect(screen.getByText('Cloud hosting')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/BusinessModelCanvas.test.tsx`
Expected: FAIL with "Cannot find module './BusinessModelCanvas'".

- [ ] **Step 3: Create `src/components/sections/BusinessModelCanvas.tsx`**

```tsx
import type { CanvasBlock, Report } from '../../types/report';

interface Props {
  data: Report['businessModelCanvas'];
}

const BLOCK_LABELS: Record<CanvasBlock, string> = {
  customerSegments: 'Customer Segments',
  valuePropositions: 'Value Propositions',
  channels: 'Channels',
  customerRelationships: 'Customer Relationships',
  revenueStreams: 'Revenue Streams',
  keyActivities: 'Key Activities',
  keyResources: 'Key Resources',
  keyPartners: 'Key Partners',
  costStructure: 'Cost Structure',
};

export function BusinessModelCanvas({ data }: Props) {
  return (
    <section id="canvas" className="report-section">
      <h2>7. Business Model Canvas</h2>
      <div className="canvas-grid">
        {(Object.keys(BLOCK_LABELS) as CanvasBlock[]).map((block) => (
          <div key={block} className="canvas-block">
            <h4>{BLOCK_LABELS[block]}</h4>
            <ul>
              {data[block].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/BusinessModelCanvas.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/BusinessModelCanvas.tsx src/components/sections/BusinessModelCanvas.test.tsx
git commit -m "Add BusinessModelCanvas section component"
```

---

### Task 20: SWOTAnalysis Section Component

**Files:**
- Create: `src/components/sections/SWOTAnalysis.tsx`
- Test: `src/components/sections/SWOTAnalysis.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SWOTAnalysis } from './SWOTAnalysis';

const data = {
  strengths: ['Fast MVP scope'],
  weaknesses: ['Limited brand recognition'],
  opportunities: ['Underserved segment'],
  threats: ['Crowded category'],
};

describe('SWOTAnalysis', () => {
  it('renders all four SWOT quadrants', () => {
    render(<SWOTAnalysis data={data} />);
    expect(screen.getByText('Fast MVP scope')).toBeInTheDocument();
    expect(screen.getByText('Limited brand recognition')).toBeInTheDocument();
    expect(screen.getByText('Underserved segment')).toBeInTheDocument();
    expect(screen.getByText('Crowded category')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/SWOTAnalysis.test.tsx`
Expected: FAIL with "Cannot find module './SWOTAnalysis'".

- [ ] **Step 3: Create `src/components/sections/SWOTAnalysis.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['swot'];
}

export function SWOTAnalysis({ data }: Props) {
  return (
    <section id="swot" className="report-section">
      <h2>8. SWOT Analysis</h2>
      <div className="swot-grid">
        <div>
          <h4>Strengths</h4>
          <ul>
            {data.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Weaknesses</h4>
          <ul>
            {data.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Opportunities</h4>
          <ul>
            {data.opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Threats</h4>
          <ul>
            {data.threats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/SWOTAnalysis.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/SWOTAnalysis.tsx src/components/sections/SWOTAnalysis.test.tsx
git commit -m "Add SWOTAnalysis section component"
```

---

### Task 21: FinancialProjections Section Component

**Files:**
- Create: `src/components/sections/FinancialProjections.tsx`
- Test: `src/components/sections/FinancialProjections.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FinancialProjections } from './FinancialProjections';

const data = {
  revenueForecast: {
    bestCase: Array.from({ length: 12 }, (_, i) => 1000 + i * 100),
    baseCase: Array.from({ length: 12 }, (_, i) => 800 + i * 80),
    worstCase: Array.from({ length: 12 }, (_, i) => 500 + i * 50),
  },
  unitEconomics: { cac: 50, ltv: 200, ltvToCacRatio: 4, grossMarginPct: 70 },
  operatingCosts: { infrastructure: '$200-$800/mo' },
  milestones: ['Break-even once MRR covers costs'],
  investorSnapshot: { arrPotential: '$12,000 in year-one ARR' },
};

describe('FinancialProjections', () => {
  it('renders the forecast table, unit economics, costs, milestones, and snapshot', () => {
    render(<FinancialProjections data={data} />);
    expect(screen.getByText(/CAC: \$50/)).toBeInTheDocument();
    expect(screen.getByText(/LTV:CAC ratio: 4x/)).toBeInTheDocument();
    expect(screen.getByText(/infrastructure: \$200-\$800\/mo/)).toBeInTheDocument();
    expect(screen.getByText('Break-even once MRR covers costs')).toBeInTheDocument();
    expect(screen.getByText(/arrPotential: \$12,000 in year-one ARR/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/FinancialProjections.test.tsx`
Expected: FAIL with "Cannot find module './FinancialProjections'".

- [ ] **Step 3: Create `src/components/sections/FinancialProjections.tsx`**

```tsx
import type { Report } from '../../types/report';

interface Props {
  data: Report['financials'];
}

export function FinancialProjections({ data }: Props) {
  return (
    <section id="financials" className="report-section">
      <h2>9. Financial Projections</h2>
      <h3>Revenue Forecast (12 months)</h3>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Best Case</th>
            <th>Base Case</th>
            <th>Worst Case</th>
          </tr>
        </thead>
        <tbody>
          {data.revenueForecast.baseCase.map((_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>${data.revenueForecast.bestCase[i].toLocaleString()}</td>
              <td>${data.revenueForecast.baseCase[i].toLocaleString()}</td>
              <td>${data.revenueForecast.worstCase[i].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Unit Economics</h3>
      <ul>
        <li>CAC: ${data.unitEconomics.cac}</li>
        <li>LTV: ${data.unitEconomics.ltv}</li>
        <li>LTV:CAC ratio: {data.unitEconomics.ltvToCacRatio}x</li>
        <li>Gross margin: {data.unitEconomics.grossMarginPct}%</li>
      </ul>
      <h3>Operating Costs</h3>
      <ul>
        {Object.entries(data.operatingCosts).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3>Milestones</h3>
      <ul>
        {data.milestones.map((milestone) => (
          <li key={milestone}>{milestone}</li>
        ))}
      </ul>
      <h3>Investor Snapshot</h3>
      <ul>
        {Object.entries(data.investorSnapshot).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/FinancialProjections.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FinancialProjections.tsx src/components/sections/FinancialProjections.test.tsx
git commit -m "Add FinancialProjections section component"
```

---

### Task 22: ReportPage Assembly

**Files:**
- Create: `src/components/ReportPage.tsx`
- Test: `src/components/ReportPage.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReportPage } from './ReportPage';
import { buildReport } from '../mock/generateReport';

describe('ReportPage', () => {
  it('renders every report section for a full report', () => {
    const report = buildReport('A marketplace for used bikes');
    render(<ReportPage report={report} />);

    expect(screen.getByText(/1\. Market Score/)).toBeInTheDocument();
    expect(screen.getByText(/2\. Competitor Scan/)).toBeInTheDocument();
    expect(screen.getByText(/3\. Monetization Ideas/)).toBeInTheDocument();
    expect(screen.getByText(/4\. MVP Feature List/)).toBeInTheDocument();
    expect(screen.getByText(/5\. Launch Strategy/)).toBeInTheDocument();
    expect(screen.getByText(/6\. Viral Hooks/)).toBeInTheDocument();
    expect(screen.getByText(/7\. Business Model Canvas/)).toBeInTheDocument();
    expect(screen.getByText(/8\. SWOT Analysis/)).toBeInTheDocument();
    expect(screen.getByText(/9\. Financial Projections/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export pdf/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ReportPage.test.tsx`
Expected: FAIL with "Cannot find module './ReportPage'".

- [ ] **Step 3: Create `src/components/ReportPage.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import type { Report } from '../types/report';
import { SidebarNav, type SidebarSection } from './SidebarNav';
import { ExportPdfButton } from './ExportPdfButton';
import { determineActiveSection } from '../utils/scrollspy';
import { ExecutiveSummary } from './sections/ExecutiveSummary';
import { MarketScore } from './sections/MarketScore';
import { CompetitorScan } from './sections/CompetitorScan';
import { MonetizationIdeas } from './sections/MonetizationIdeas';
import { MVPFeatureList } from './sections/MVPFeatureList';
import { LaunchStrategy } from './sections/LaunchStrategy';
import { ViralHooks } from './sections/ViralHooks';
import { BusinessModelCanvas } from './sections/BusinessModelCanvas';
import { SWOTAnalysis } from './sections/SWOTAnalysis';
import { FinancialProjections } from './sections/FinancialProjections';

const SECTIONS: SidebarSection[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'market', label: 'Market Score' },
  { id: 'competitors', label: 'Competitor Scan' },
  { id: 'monetization', label: 'Monetization' },
  { id: 'mvp', label: 'MVP Features' },
  { id: 'launch', label: 'Launch Strategy' },
  { id: 'hooks', label: 'Viral Hooks' },
  { id: 'canvas', label: 'Business Model Canvas' },
  { id: 'swot', label: 'SWOT' },
  { id: 'financials', label: 'Financials' },
];

interface Props {
  report: Report;
}

export function ReportPage({ report }: Props) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.offsetTop : 0 };
      });
      setActiveId(determineActiveSection(offsets, window.scrollY));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleNavigate(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="report-page">
      <SidebarNav sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} />
      <div className="report-page__actions">
        <ExportPdfButton targetRef={containerRef} fileName={`${report.idea}-validation-report.pdf`} />
      </div>
      <div className="report-page__content" ref={containerRef}>
        <ExecutiveSummary data={report.executiveSummary} ideaLabel={report.idea} />
        <MarketScore data={report.marketScore} />
        <CompetitorScan data={report.competitorScan} />
        <MonetizationIdeas data={report.monetization} />
        <MVPFeatureList data={report.mvp} />
        <LaunchStrategy data={report.launchStrategy} />
        <ViralHooks data={report.viralHooks} />
        <BusinessModelCanvas data={report.businessModelCanvas} />
        <SWOTAnalysis data={report.swot} />
        <FinancialProjections data={report.financials} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ReportPage.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/ReportPage.tsx src/components/ReportPage.test.tsx
git commit -m "Assemble ReportPage from sidebar nav and all section components"
```

---

### Task 23: App Wiring & Integration Test

**Files:**
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('walks from input to analyzing to report', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/startup idea/i), {
      target: { value: 'A marketplace for used bikes' },
    });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));

    expect(screen.getByText(/Scanning competitors/i)).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(900 * 6);
    });

    expect(screen.getByText(/1\. Market Score/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL — `App` still renders the Task 1 placeholder `<div>Business Idea Validator</div>`, so the idea textarea/labels don't exist.

- [ ] **Step 3: Replace `src/App.tsx` with the full state machine**

```tsx
import { useState } from 'react';
import { IdeaInputForm } from './components/IdeaInputForm';
import { AnalyzingSequence } from './components/AnalyzingSequence';
import { ReportPage } from './components/ReportPage';
import { generateReport } from './mock/generateReport';
import type { Report } from './types/report';

type Status = 'input' | 'analyzing' | 'report';

export function App() {
  const [status, setStatus] = useState<Status>('input');
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState<Report | null>(null);

  function handleSubmit(submittedIdea: string) {
    setIdea(submittedIdea);
    setStatus('analyzing');
  }

  function handleAnalyzingComplete() {
    generateReport(idea).then((result) => {
      setReport(result);
      setStatus('report');
    });
  }

  if (status === 'input') {
    return <IdeaInputForm onSubmit={handleSubmit} />;
  }

  if (status === 'analyzing') {
    return <AnalyzingSequence onComplete={handleAnalyzingComplete} />;
  }

  if (report) {
    return <ReportPage report={report} />;
  }

  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files pass (every task's tests plus this one).

- [ ] **Step 6: Run the production build**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "Wire App state machine: input -> analyzing -> report"
```

---

### Task 24: Manual Browser Verification

**Files:** none (manual QA pass, no code changes expected unless a bug is found)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite prints a local URL (e.g. `http://localhost:5173`).

- [ ] **Step 2: Verify the input screen**

Open the URL in a browser. Confirm the dark investor-deck styling, the headline, and that "Validate My Idea" is disabled until text is entered.

- [ ] **Step 3: Verify the analyzing sequence**

Type an idea containing a recognizable keyword (e.g. "A marketplace for handmade furniture") and submit. Confirm the staged status messages cycle for a few seconds before the report appears.

- [ ] **Step 4: Verify the report screen**

Confirm all 10 sections render with the sticky sidebar nav, that clicking a sidebar link scrolls to that section and highlights it, and that the layout matches the approved mockup at `.superpowers/brainstorm/1914-1782962894/content/combined-preview.html`.

- [ ] **Step 5: Verify keyword variation**

Reload and submit a different idea from a different category (e.g. "An AI-powered budgeting app for freelancers") and confirm the competitors, recommended model, and copy visibly differ from the furniture-marketplace run.

- [ ] **Step 6: Verify PDF export**

Click "Export PDF" and confirm a PDF file downloads and visually matches the on-screen report (dark background, gold accents, all sections present).

- [ ] **Step 7: Fix any issues found**

If any visual or functional issue is found, fix it in the relevant component/style file, re-run `npm test` and `npm run build`, then commit the fix with a descriptive message (e.g. `git commit -m "Fix sidebar active-state highlighting on scroll"`).
