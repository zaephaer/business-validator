import type { Report } from '../../types/report';

interface Props {
  data: Report['launchStrategy'];
}

export function LaunchStrategy({ data }: Props) {
  return (
    <section id="launch" className="report-section">
      <h2>5. Launch Strategy</h2>
      <h3>Launch Channels</h3>
      <ul>
        {data.channels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3>First 100 Users</h3>
      <p>{data.first100Users}</p>
      <h3>Acquisition Channels</h3>
      <ul>
        {data.acquisitionChannels.map((channel) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
      <h3>Growth Plan</h3>
      <ol>
        {data.weeklyRoadmap.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
