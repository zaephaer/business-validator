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
    channels: ['Indie Hackers', 'Relevant subreddits and forums', 'Direct outreach to early adopters'],
  },
};
