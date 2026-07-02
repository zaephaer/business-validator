import type { Report } from '../../types/report';

interface Props {
  data: Report['viralHooks'];
}

export function ViralHooks({ data }: Props) {
  return (
    <section id="hooks" className="report-section">
      <h2>6. Viral Hooks</h2>
      <h3>Thumbnail Headline</h3>
      <p>{data.headline}</p>
      <h3>Landing Page Hero Copy</h3>
      <p>{data.heroCopy}</p>
      <h3>Launch Post</h3>
      <p>{data.launchPost}</p>
      <h3>Cold Outreach Message</h3>
      <p>{data.coldOutreach}</p>
      <h3>Demo Video Script</h3>
      <p>{data.demoScript}</p>
    </section>
  );
}
