import { useState, ReactNode } from 'react';

interface CyberpunkLayoutProps {
  /** Sidebar content. If omitted, layout renders without a sidebar. */
  sidebar?: ReactNode;
  /** Title shown in the sidebar header bar. */
  sidebarTitle?: string;
  /** Main page content. */
  children: ReactNode;
  /**
   * When true the main content area stretches to fill all available space
   * (no max-width / padding constraints). Useful for the code-editor view.
   */
  fullWidth?: boolean;
}

/**
 * Global layout shell for the Cyberpunk Design System.
 *
 * Renders below the fixed Navbar (64px spacer is handled in App.tsx).
 * - Left: optional 280px collapsible sidebar  (#0B0E14)
 * - Right: scrollable main content area        (#0B0E14, max-w 1200px, 48px pad)
 */
export default function CyberpunkLayout({
  sidebar,
  sidebarTitle = 'Menu',
  children,
  fullWidth = false,
}: CyberpunkLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const hasSidebar = sidebar !== undefined;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Sidebar open button (visible when sidebar is collapsed) */}
      {hasSidebar && !isSidebarOpen && (
        <button
          className="plh-sidebar-open-btn"
          onClick={() => setIsSidebarOpen(true)}
          title={`Open ${sidebarTitle}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      {hasSidebar && (
        <div className={`plh-sidebar${isSidebarOpen ? '' : ' collapsed'}`}>
          {/* Header bar */}
          <div className="plh-sidebar-header">
            <button
              className="plh-sidebar-toggle"
              onClick={() => setIsSidebarOpen(false)}
              title="Close Sidebar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <h3 className="plh-sidebar-title" style={{ marginRight: '36px' }}>
              {sidebarTitle}
            </h3>
          </div>

          {/* Scrollable body – page-specific content is injected here */}
          <div className="plh-sidebar-body">
            {sidebar}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className={`plh-main-content${fullWidth ? ' full-width' : ''}`}>
        <div className="plh-main-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
