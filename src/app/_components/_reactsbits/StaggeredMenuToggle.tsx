// StaggeredMenuToggle.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  open: boolean;
  toggleMenu: () => void;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
}

export const StaggeredMenuToggle: React.FC<Props> = ({
  open,
  toggleMenu,
  menuButtonColor = '#fff',
  openMenuButtonColor = 'black',
  changeMenuColorOnOpen = true,
}) => {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const [text, setText] = useState(open ? 'Close' : 'Menu');

  useEffect(() => {
    const icon = iconRef.current;
    if (icon) gsap.to(icon, { rotate: open ? 225 : 0, duration: 0.6, ease: 'power4.out' });

    if (changeMenuColorOnOpen && icon) {
      gsap.to(icon, { color: open ? openMenuButtonColor : menuButtonColor, duration: 0.3 });
    }
    setText(open ? 'Close' : 'Menu');
  }, [open, changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  return (
    <button
      onClick={toggleMenu}
      className="sm-toggle md:!hidden"
      aria-label={open ? 'Close menu' : 'Open menu'}
      style={{
        position: open ? "fixed" : "absolute",
        top: "20px",
        right: "30px",
        color: changeMenuColorOnOpen ? undefined : menuButtonColor ,
        zIndex: 1000,
    }} 
    >
      <span className="sm-toggle-text"
      style={{color: open ? "black" : "white"}}>{text}</span>
      <span ref={iconRef} className="sm-icon" aria-hidden="true">
        <span ref={plusHRef} className="sm-icon-line" />
        <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
      </span>
    </button>
  );
};
