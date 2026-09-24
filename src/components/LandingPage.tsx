import { motion } from 'framer-motion';
import { fadeUpItem, staggerContainer } from '../styles/motion';

interface Props {
  onGetStarted: () => void;
}

const STEPS = [
  { title: 'Describe your idea', body: 'Type a one-line pitch for your startup idea.' },
  { title: 'We analyze it', body: 'Market scoring, competitor scan, and monetization modeling, instantly.' },
  { title: 'Get your report', body: 'A complete pre-launch report, ready to act on or share.' },
];

export function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        <p className="mb-4 inline-block rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wide">
          Idea validator
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Know if your startup idea is worth building, before you build it.
        </h1>
        <p className="mt-4 font-body text-lg text-ink/80">
          Turn a one-line pitch into a complete pre-launch report: market score, competitors, monetization
          ideas, MVP scope, and more.
        </p>
        <motion.button
          type="button"
          onClick={onGetStarted}
          whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 0 #161616' }}
          whileTap={{ x: 0, y: 0, boxShadow: '2px 2px 0 0 #161616' }}
          className="mt-8 rounded-xl border-2 border-ink bg-violet px-8 py-4 font-heading text-base font-bold text-white shadow-brutal"
        >
          Start Validating
        </motion.button>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-medium text-ink/70">
          <span className="h-2 w-2 rounded-full bg-violet" />
          Demo mode: reports are generated from sample data, no AI model is connected yet.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={fadeUpItem}
            className="rounded-xl border-2 border-ink bg-white p-5 text-left shadow-brutal"
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-lime font-heading text-sm font-bold">
              {i + 1}
            </div>
            <h3 className="font-heading text-base font-bold">{step.title}</h3>
            <p className="mt-1 font-body text-sm text-ink/80">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
