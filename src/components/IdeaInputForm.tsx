import { useState } from 'react';

interface Props {
  onSubmit: (idea: string) => void;
}

export function IdeaInputForm({ onSubmit }: Props) {
  const [idea, setIdea] = useState('');
  const trimmed = idea.trim();

  return (
    <form
      className="idea-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onSubmit(trimmed);
      }}
    >
      <h1>Turn a one-line startup idea into a complete pre-launch report.</h1>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g. An AI-powered meal planner for people with diabetes"
        aria-label="Startup idea"
      />
      <button type="submit" disabled={!trimmed}>
        Validate My Idea
      </button>
    </form>
  );
}
