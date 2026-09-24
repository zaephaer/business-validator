import type { Report } from '../../types/report';
import { heading2, heading3 } from '../../styles/brutal';

interface Props {
  data: Report['viralHooks'];
}

export function ViralHooks({ data }: Props) {
  return (
    <section id="hooks">
      <h2 className={heading2}>6. Viral Hooks</h2>
      <h3 className={heading3}>Thumbnail Headline</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.headline}</p>
      <h3 className={heading3}>Landing Page Hero Copy</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.heroCopy}</p>
      <h3 className={heading3}>Launch Post</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.launchPost}</p>
      <h3 className={heading3}>Cold Outreach Message</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.coldOutreach}</p>
      <h3 className={heading3}>Demo Video Script</h3>
      <p className="mt-2 font-body text-sm text-ink/90">{data.demoScript}</p>
    </section>
  );
}
