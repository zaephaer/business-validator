import type { Report } from '../../types/report';
import { cardTight, heading2, heading4, list } from '../../styles/brutal';

interface Props {
  data: Report['swot'];
}

export function SWOTAnalysis({ data }: Props) {
  return (
    <section id="swot">
      <h2 className={heading2}>8. SWOT Analysis</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={`${cardTight} bg-lime`}>
          <h4 className={heading4}>Strengths</h4>
          <ul className={list}>
            {data.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={cardTight}>
          <h4 className={heading4}>Weaknesses</h4>
          <ul className={list}>
            {data.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={cardTight}>
          <h4 className={heading4}>Opportunities</h4>
          <ul className={list}>
            {data.opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${cardTight} bg-violet text-white`}>
          <h4 className={heading4}>Threats</h4>
          <ul className={`${list} text-white/90`}>
            {data.threats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
