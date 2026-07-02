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
