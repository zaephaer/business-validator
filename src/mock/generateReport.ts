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
