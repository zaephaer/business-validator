import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (idea: string) => void;
}

export function IdeaInputForm({ onSubmit }: Props) {
  const [idea, setIdea] = useState('');
  const trimmed = idea.trim();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-xl rounded-2xl border-2 border-ink bg-white p-8 shadow-brutal-lg sm:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (trimmed) onSubmit(trimmed);
        }}
      >
        <p className="mb-2 inline-block rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wide">
          Idea validator
        </p>
        <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
          Turn a one-line startup idea into a complete pre-launch report.
        </h1>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. An AI-powered meal planner for people with diabetes"
          aria-label="Startup idea"
          className="mt-6 min-h-[110px] w-full resize-y rounded-xl border-2 border-ink bg-cream p-4 font-body text-base placeholder:text-ink/50 focus:outline-none focus:shadow-brutal-sm"
        />
        <motion.button
          type="submit"
          disabled={!trimmed}
          whileHover={trimmed ? { x: -2, y: -2, boxShadow: '6px 6px 0 0 #161616' } : undefined}
          whileTap={trimmed ? { x: 0, y: 0, boxShadow: '2px 2px 0 0 #161616' } : undefined}
          className="mt-6 w-full rounded-xl border-2 border-ink bg-violet px-6 py-3 font-heading text-base font-bold text-white shadow-brutal transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          Validate My Idea
        </motion.button>
      </motion.form>
    </div>
  );
}
