import type { Report } from '../../types/report';
import { heading2, heading3, list } from '../../styles/brutal';

interface Props {
  data: Report['launchStrategy'];
}

export function LaunchStrategy({ data }: Props) {
  return (
    <section id="launch">
      <h2 className={heading2}>5. Launch Strategy</h2>
      <h3 className={heading3}>Launch Channels</h3>
      <ul className={list}>
        {data.channels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3 className={heading3}>First 100 Users</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.first100Users}</p>
      <h3 className={heading3}>Acquisition Channels</h3>
      <ul className={list}>
        {data.acquisitionChannels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3 className={heading3}>Growth Plan</h3>
      <ol className={`${list} list-decimal`}>
        {data.weeklyRoadmap.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
