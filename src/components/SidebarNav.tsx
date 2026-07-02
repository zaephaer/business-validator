export interface SidebarSection {
  id: string;
  label: string;
}

interface Props {
  sections: SidebarSection[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export function SidebarNav({ sections, activeId, onNavigate }: Props) {
  return (
    <nav className="sidebar-nav">
      <div className="sidebar-nav__brand">Idea Validator</div>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={section.id === activeId ? 'active' : ''}
              onClick={() => onNavigate(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
