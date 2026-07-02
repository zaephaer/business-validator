# Cloud-Console Restyle — Design Spec

Date: 2026-07-02

## Summary

Replace the current "Investor Deck" dark navy/gold visual theme with a
light "cloud console" theme, modeled on a Tencent Cloud EdgeOne screenshot
the user shared: dark sidebar navigation, white main content area, blue
accent color, card-style panels, and a slim dark top navbar.

This supersedes the visual-design section of
`docs/superpowers/specs/2026-07-02-business-idea-validator-design.md` (the
"Investor Deck" direction). Layout structure, component boundaries, and all
functional behavior (report generation, scrollspy, PDF export, back-to-start)
are unchanged — this is a palette/typography/chrome change only.

## Goals

- Recolor the whole app from dark-on-navy to a light theme, except the
  sidebar and a new top navbar, which stay dark for contrast (matching the
  reference screenshot).
- Replace the gold accent with a blue accent throughout (buttons, active
  nav state, verdict/score highlights).
- Add a slim dark top navbar to the report page, matching the reference's
  header bar.
- Keep the existing report structure exactly as-is: one continuous
  scrollable document with sidebar scrollspy navigation. No tabs, no
  splitting the report into separate views — confirmed explicitly with the
  user, since introducing tabs would require new state, change scrollspy
  behavior, and complicate the single-document PDF export.

## Non-goals

- No changes to report content, data generation, or component structure.
- No tab-based navigation (considered and explicitly rejected for this pass).
- No changes to the input screen's or analyzing screen's layout beyond the
  color/font tokens flipping globally (they don't get their own top navbar —
  that's report-page-only, matching the approved mockup).

## Color Tokens (`src/styles/tokens.css`)

All existing tokens are replaced in place (same names where the semantic
role is unchanged), plus two new sidebar-specific tokens and a navbar token,
since the sidebar keeps a dark background while the rest of the page flips
to a light background — the old single set of text-color tokens can no
longer serve both contexts.

```css
:root {
  --color-bg: #ffffff;              /* main content background (was #0b1120) */
  --color-bg-panel: #1c1c1e;        /* sidebar background, stays dark (was #0f172a) */
  --color-bg-card: #f9fafb;         /* card / stat-block background (was #111827) */
  --color-border: #e5e7eb;          /* borders on light content (was #1e293b) */
  --color-navbar-bg: #141414;       /* new: top navbar background */
  --color-sidebar-border: #3a3a3c;  /* new: borders inside the dark sidebar */
  --color-sidebar-text: #c7c7cc;    /* new: default sidebar nav link text */
  --color-accent: #2563eb;          /* replaces --color-gold (#e2c766) */
  --color-text-primary: #111827;    /* headings on light content (was #f1f5f9) */
  --color-text-body: #374151;       /* body text on light content (was #e2e8f0) */
  --color-text-muted: #6b7280;      /* muted text on light content (was #94a3b8) */
  --color-text-faint: #9ca3af;      /* faint text on light content (was #64748b) */
  --font-sans: 'Poppins', 'Segoe UI', Arial, sans-serif; /* unchanged */
}
```

Every existing CSS rule that references `--color-gold` is updated to
reference `--color-accent` instead. Every rule that colors sidebar-specific
elements (nav link text, the "Back to Start" button border) switches from
the general `--color-text-muted` / `--color-border` tokens to the new
`--color-sidebar-text` / `--color-sidebar-border` tokens, since those
general tokens now resolve to dark colors meant for the light content area
and would be unreadable against the still-dark sidebar.

The active sidebar link's highlight becomes
`background: rgba(37, 99, 235, 0.15)` (the accent color's RGB, at 15%
opacity) instead of the current gold-tinted background.

Primary buttons (`Validate My Idea`, `Export PDF`) keep their existing rule
shape — `background: var(--color-accent); color: var(--color-bg);` — which
still produces the intended white-text-on-blue-button look now that
`--color-bg` is white, with no extra token needed.

## New Element: Top Navbar

A slim dark bar (`--color-navbar-bg`) spanning the full width, containing
the app name, added only to `ReportPage.tsx` (matching the approved
mockup — the input and analyzing screens do not get one). Structurally,
`ReportPage`'s existing top-level `<div className="report-page">` gets
wrapped in a new outer `<div className="report-page-wrapper">` with the
navbar bar as a sibling above it:

```tsx
<div className="report-page-wrapper">
  <div className="top-navbar">Business Idea Validator</div>
  <div className="report-page">
    {/* existing sidebar + content, unchanged */}
  </div>
</div>
```

New CSS:

```css
.top-navbar {
  background: var(--color-navbar-bg);
  color: #ffffff;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
}
```

## Testing

This is a CSS/token/markup-chrome change with no new interactive behavior
(the navbar is static text, not a button or link). Consistent with how the
original design's CSS-only tasks were handled, no new Vitest test is
required for the token or navbar-markup changes. The existing
`ReportPage.test.tsx` render test already covers the page still rendering
correctly with the new wrapper markup — it asserts on content presence,
not exact DOM structure, so it should continue to pass unchanged.

Verification is manual: reload the app in the browser preview and visually
confirm the input screen, analyzing screen, and report screen all render
with the new light theme / dark sidebar / blue accents, with no console
errors, matching the approved mockup.

## Rollout

Single pass, no feature flag — this replaces the visual theme outright.
Approved mockup archived at
`.superpowers/brainstorm/979-1782981131/content/console-restyle.html`.
