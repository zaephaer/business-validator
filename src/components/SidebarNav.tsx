export interface SidebarSection {
  id: string;
  label: string;
}

interface Props {
  sections: SidebarSection[];
  activeId: string;
  onNavigate: (id: string) => void;
  onBack?: () => void;
}

export function SidebarNav({ sections, activeId, onNavigate, onBack }: Props) {
  return (
    <nav className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col border-r-2 border-ink bg-white p-5">
      <div className="font-heading text-sm font-bold uppercase tracking-wide">
        <span className="rounded-md border-2 border-ink bg-violet px-2 py-1 text-white">Idea</span> Validator
      </div>
      {onBack && (
        <button
          type="button"
          className="mt-5 rounded-lg border-2 border-ink bg-cream px-3 py-2 text-left font-body text-sm font-medium transition-transform hover:-translate-y-0.5 hover:shadow-brutal-sm"
          onClick={onBack}
        >
          &larr; Back to Start
        </button>
      )}
      <ul className="mt-6 flex-1 space-y-1 overflow-y-auto">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={
                section.id === activeId
                  ? 'active block rounded-lg border-2 border-ink bg-lime px-3 py-2 font-body text-sm font-semibold'
                  : 'block rounded-lg border-2 border-transparent px-3 py-2 font-body text-sm text-ink/70 hover:border-ink/20 hover:bg-cream'
              }
              onClick={(e) => {
                e.preventDefault();
                onNavigate(section.id);
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
