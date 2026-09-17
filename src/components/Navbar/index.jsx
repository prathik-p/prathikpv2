import { useEffect, useRef, useState } from "react";
import "./index.scss";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About me" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// eslint-disable-next-line react/prop-types -- Internal presentational helper receives a string.
function RollingLabel({ text }) {
  return <><span className="sr-only">{text}</span><span className="nav-roll" aria-hidden="true">{[...text].map((letter, index) => <span className="nav-letter" key={index} style={{ "--letter-delay": `${index * 12}ms` }}><span>{letter === " " ? "\u00a0" : letter}</span><span>{letter === " " ? "\u00a0" : letter}</span></span>)}</span></>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const currentLabel = active === "projects" ? "Selected projects" : sections.find(({ id }) => id === active)?.label || "Prathik Prejith";

  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#f5f4f0");
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: "-15% 0px -65% 0px" });
    ["home", ...sections.map(({ id }) => id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Storage may be unavailable in private browsing. */ }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      menuRef.current?.focus();
    }
  }

  return (
    <>
    <header ref={headerRef} className={`navbar${active && active !== "home" ? " is-compact" : ""}`} onKeyDown={handleKeyDown}>
      <a className="wordmark" href="#home" aria-label="Prathik Prejith, home" onClick={() => setOpen(false)}><span className="wordmark-full" aria-hidden="true">Prathik Prejith</span><span className="wordmark-short" aria-hidden="true">P P</span></a>
      <a className="mobile-project-link" href="#projects" onClick={() => setOpen(false)}>Projects</a>
      <button ref={menuRef} className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <span className="menu-label">{open ? "Close" : "Menu"}</span>
        <span className="mobile-section-label">{currentLabel}</span>
        <svg className="menu-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <nav id="primary-navigation" aria-label="Main navigation" className={`nav-links${open ? " is-open" : ""}`}>
        <a className="mobile-home-link" href="#home" aria-current={active === "home" ? "location" : undefined} onClick={() => setOpen(false)}>Home</a>
        {sections.map(({ id, label }) => (
          <a key={id} className={id === "contact" ? "nav-contact" : undefined} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}><RollingLabel text={label} /></a>
        ))}
        <a className="github-link" href="https://github.com/prathik-p" target="_blank" rel="noreferrer"><RollingLabel text="GitHub" /><span aria-hidden="true">&#8599;</span></a>
      </nav>
    </header>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
        <span className={`theme-symbol ${theme}`} aria-hidden="true" />
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </>
  );
}

export default Navbar;
