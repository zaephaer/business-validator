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
