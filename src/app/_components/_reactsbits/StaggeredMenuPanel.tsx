// StaggeredMenuPanel.tsx
import React from 'react';

interface Item {
  label: string;
  ariaLabel: string;
  link: string;
}
interface SocialItem {
  label: string;
  link: string;
}

interface Props {
  open: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  preLayersRef: React.RefObject<HTMLDivElement | null>;
  colors?: string[];
  items: Item[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  accentColor?: string;
  position?: 'left' | 'right';
}

export const StaggeredMenuPanel: React.FC<Props> = ({
  open,
  panelRef,
  preLayersRef,
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  accentColor = 'red',
  position = 'right',
}) => (
  <div
    className={`staggered-menu-wrapper ${open ? 'active' : ''}`} 
    data-position={position}
    data-open={open || undefined}
    style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
  >
    <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
      {colors.map((c, i) => (
        <div key={i} className="sm-prelayer" style={{ background: c }} />
      ))}
    </div>

    <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
      <div className="sm-panel-inner">
        <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
          {items.length ? (
            items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={idx}>
                <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel}>
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            ))
          ) : (
            <li className="sm-panel-itemWrap">
              <span className="sm-panel-item">
                <span className="sm-panel-itemLabel">No items</span>
              </span>
            </li>
          )}
        </ul>
        {displaySocials && socialItems.length > 0 && (
          <div className="sm-socials">
            <h3 className="sm-socials-title">Rede Sociais</h3>
            <ul className="sm-socials-list">
              {socialItems.map((s, i) => (
                <li key={i} className="sm-socials-item">
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  </div>
);
