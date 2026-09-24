import type { CanvasBlock, Report } from '../../types/report';
import { cardTight, heading2, heading4, list } from '../../styles/brutal';

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
    <section id="canvas">
      <h2 className={heading2}>7. Business Model Canvas</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(BLOCK_LABELS) as CanvasBlock[]).map((block) => (
          <div key={block} className={cardTight}>
            <h4 className={heading4}>{BLOCK_LABELS[block]}</h4>
            <ul className={list}>
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
