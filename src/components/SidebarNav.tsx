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
    <nav className="sidebar-nav">
      <div className="sidebar-nav__brand">Idea Validator</div>
      {onBack && (
        <button type="button" className="sidebar-nav__back" onClick={onBack}>
          &larr; Back to Start
        </button>
      )}
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={section.id === activeId ? 'active' : ''}
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
