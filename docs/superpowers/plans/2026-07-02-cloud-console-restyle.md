# Cloud-Console Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recolor the whole app from the dark navy/gold "Investor Deck" theme to a light "cloud console" theme (white content, dark sidebar, blue accent), and add a slim dark top navbar to the report page.

**Architecture:** Pure CSS token + selector value changes in `src/styles/tokens.css` and `src/styles/global.css`, plus one new wrapper element (a sticky top navbar) added to `ReportPage.tsx`. No component logic, props, or data flow changes anywhere.

**Tech Stack:** React + TypeScript, plain CSS custom properties (no build tooling changes).

**Spec:** `docs/superpowers/specs/2026-07-02-cloud-console-restyle-design.md`

---

### Task 1: Replace Color Tokens

**Files:**
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Replace the full contents of `src/styles/tokens.css`**

```css
:root {
  --color-bg: #ffffff;
  --color-bg-panel: #1c1c1e;
  --color-bg-card: #f9fafb;
  --color-border: #e5e7eb;
  --color-navbar-bg: #141414;
  --color-sidebar-border: #3a3a3c;
  --color-sidebar-text: #c7c7cc;
  --color-accent: #2563eb;
  --color-text-primary: #111827;
  --color-text-body: #374151;
  --color-text-muted: #6b7280;
  --color-text-faint: #9ca3af;
  --font-sans: 'Poppins', 'Segoe UI', Arial, sans-serif;
}
```

- [ ] **Step 2: Verify the build still compiles**

Run: `npm run build`
Expected: succeeds. (It will emit unused-variable-style warnings from nothing — `--color-gold` is no longer defined, but nothing references it yet until Task 2 removes those references. This is expected to still build since CSS custom properties don't fail a build when undefined; visual breakage is expected and fixed by Task 2, not by this step alone.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "Replace investor-deck color tokens with cloud-console palette"
```

---

### Task 2: Update Global Stylesheet

**Files:**
- Modify: `src/styles/global.css`

This task replaces every reference to the old `--color-gold` token with the new `--color-accent` token, switches sidebar-specific rules to the new `--color-sidebar-text` / `--color-sidebar-border` tokens (since the sidebar keeps a dark background while the rest of the page is now light), and adds the new `.report-page-wrapper` / `.top-navbar` rules with the sidebar's sticky positioning adjusted to sit below the new navbar.

- [ ] **Step 1: Replace the full contents of `src/styles/global.css`**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-body);
  font-family: var(--font-sans);
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
  font-family: var(--font-sans);
  font-size: 15px;
  padding: 12px;
  resize: vertical;
}

.idea-input-form button {
  margin-top: 16px;
  background: var(--color-accent);
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
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Report page layout */
.report-page-wrapper {
  min-height: 100vh;
}

.top-navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 44px;
  display: flex;
  align-items: center;
  background: var(--color-navbar-bg);
  color: #ffffff;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 700;
}

.report-page {
  display: flex;
  min-height: calc(100vh - 44px);
}

.sidebar-nav {
  width: 220px;
  flex-shrink: 0;
  background: var(--color-bg-panel);
  border-right: 1px solid var(--color-sidebar-border);
  padding: 20px 12px;
  position: sticky;
  top: 44px;
  height: calc(100vh - 44px);
  overflow-y: auto;
  font-size: 13px;
}

.sidebar-nav__brand {
  color: var(--color-accent);
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.sidebar-nav__back {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: 1px solid var(--color-sidebar-border);
  border-radius: 4px;
  color: var(--color-sidebar-text);
  padding: 8px 10px;
  margin-bottom: 16px;
  font-size: 12px;
}

.sidebar-nav__back:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav a {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-sidebar-text);
  padding: 8px 6px;
  border-radius: 4px;
}

.sidebar-nav a.active {
  color: var(--color-accent);
  /* --color-accent (#2563eb) at 15% opacity */
  background: rgba(37, 99, 235, 0.15);
}

.report-page__actions {
  position: fixed;
  top: 54px;
  right: 24px;
}

.export-pdf-button {
  background: var(--color-accent);
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
  color: var(--color-accent);
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
  color: var(--color-accent);
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
Expected: succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "Recolor global stylesheet for cloud-console theme and add top navbar styles"
```

---

### Task 3: Add Top Navbar to ReportPage

**Files:**
- Modify: `src/components/ReportPage.tsx:62-81` (the returned JSX)

This wraps the existing `.report-page` div (unchanged internally) in a new `.report-page-wrapper` div, with the `.top-navbar` bar as a sibling above it. No props, state, or imports change.

- [ ] **Step 1: Replace the `return` statement in `src/components/ReportPage.tsx`**

Find this block (currently lines 62-81):

```tsx
  return (
    <div className="report-page">
      <SidebarNav sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} onBack={handleBack} />
      <div className="report-page__actions">
        <ExportPdfButton targetRef={containerRef} fileName={`${slugifyFileName(report.idea)}-validation-report.pdf`} />
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
```

Replace it with:

```tsx
  return (
    <div className="report-page-wrapper">
      <div className="top-navbar">Business Idea Validator</div>
      <div className="report-page">
        <SidebarNav sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} onBack={handleBack} />
        <div className="report-page__actions">
          <ExportPdfButton targetRef={containerRef} fileName={`${slugifyFileName(report.idea)}-validation-report.pdf`} />
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
    </div>
  );
```

- [ ] **Step 2: Run the existing ReportPage test to confirm it still passes unchanged**

Run: `npx vitest run src/components/ReportPage.test.tsx`
Expected: PASS (3 tests) — this test asserts on content/text presence and roles, not exact DOM nesting, so it is unaffected by the new wrapper `div`s.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: all test files pass (59 tests, matching the count before this change — no new tests were added because this step introduces no new interactive behavior, only static wrapper markup, consistent with the spec's testing section).

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ReportPage.tsx
git commit -m "Add sticky top navbar to the report page"
```

---

### Task 4: Manual Browser Verification

**Files:** none (manual QA pass, no code changes expected unless a bug is found)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite prints a local URL.

- [ ] **Step 2: Verify the input screen**

Open the URL. Confirm: white background, dark heading/body text, Poppins font, textarea with light gray border, and a solid blue "Validate My Idea" button (disabled/faded until text is entered).

- [ ] **Step 3: Verify the analyzing screen**

Submit an idea. Confirm the spinner's accent ring is blue (not gold) and status text is readable on the white background.

- [ ] **Step 4: Verify the report screen**

Confirm: a slim dark top navbar reading "Business Idea Validator" stays pinned at the top while scrolling; below it, a dark sidebar (near-black, not navy) with light gray nav links and a blue highlight on the active section; a white content area with dark headings, blue verdict/score accents, light-gray-bordered cards; and the "Export PDF" button (blue, fixed position) sits clear of the navbar, not overlapping it.

- [ ] **Step 5: Verify the "Back to Start" button**

Click it, confirm the browser confirmation dialog appears, confirm accepting it returns to the (now white-themed) input screen.

- [ ] **Step 6: Verify PDF export still works and is still scoped correctly**

Click "Export PDF". Confirm no console errors, and that the export pipeline still targets only the report content area (not the sidebar or navbar) — this was true before this restyle and nothing in this plan changed `containerRef`'s target, but confirm visually/via console logs since the visual theme changed.

- [ ] **Step 7: Check for console errors across all three screens**

Confirm no new console errors or warnings were introduced by the CSS/markup changes.

- [ ] **Step 8: Fix any issues found**

If any visual or functional issue is found, fix it in the relevant CSS/component file, re-run `npm test` and `npm run build`, then commit the fix with a descriptive message.
