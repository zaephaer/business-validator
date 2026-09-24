import type { Report } from '../../types/report';
import { heading2, heading3, list } from '../../styles/brutal';

interface Props {
  data: Report['mvp'];
}

export function MVPFeatureList({ data }: Props) {
  return (
    <section id="mvp">
      <h2 className={heading2}>4. MVP Feature List</h2>
      <h3 className={heading3}>Build First</h3>
      <ul className={list}>
        {data.build.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h3 className={heading3}>Do Not Build</h3>
      <ul className={list}>
        {data.avoid.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
