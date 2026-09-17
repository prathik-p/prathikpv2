import { useEffect, useRef, useState } from "react";
import AboutSection from "../../components/AboutSection";
import FullStackDev from "../../components/FullStackDev";
import PrathikPrejith from "../../components/PrathikPrejith";
import Welcome from "../../components/Welcome";
import Navbar from "../../components/Navbar";
import Experience from "../../components/Experience";
import Projects from "../../components/Projects";
import Typewriter from "../../components/Typewriter";
import Contact from "../../components/Contact";
import useSectionScroll from "../../hooks/useSectionScroll";
import "./index.scss";
import "./sections.scss";

function HomePage() {
  const [intro, setIntro] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try { return sessionStorage.getItem("portfolio-welcomed") !== "true"; } catch { return true; }
  });
  const [paused, setPaused] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const skipRef = useRef(null);
  const homeRef = useRef(null);
  const deckRef = useRef(null);
  useSectionScroll(deckRef);

  useEffect(() => {
    try { sessionStorage.setItem("portfolio-welcomed", "true"); } catch { /* The intro still works when storage is unavailable. */ }
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    if (homeRef.current) observer.observe(homeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setIntro(false);
    };
    preference.addEventListener("change", update);
    const timer = window.setTimeout(() => {
      const hadFocus = document.activeElement === skipRef.current;
      setIntro(false);
      if (hadFocus) requestAnimationFrame(() => homeRef.current?.focus());
    }, 2200);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", update);
    };
  }, []);

  function skipIntro() {
    setIntro(false);
    requestAnimationFrame(() => homeRef.current?.focus());
  }

  return (
    <>
      {intro && (
        <div className="welcome-overlay">
          <Welcome />
          <button ref={skipRef} className="text-button intro-skip" onClick={skipIntro}>Skip intro <span aria-hidden="true">&#8599;</span></button>
        </div>
      )}
      <div className="portfolio" {...(intro ? { inert: "" } : {})}>
        <a className="skip-link" href="#projects">Skip to projects</a>
        <Navbar />
        <main className="section-deck" ref={deckRef} aria-label="Portfolio sections">
          <section ref={homeRef} tabIndex={-1} className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero-introduction">
              <h1 id="hero-title">Full stack engineer building<br className="desktop-break" /> web products and voice AI.</h1>
            </div>
            <div className={`marquee-stage${paused || intro || !heroVisible ? " is-paused" : ""}`} aria-hidden="true">
              <div className="marquee-bands">
                <div className="marquee marquee-name">
                  <div className="marquee-track">
                    {[0, 1].map((group) => (
                      <div className="marquee-group" key={group}>
                        {[0, 1].map((item) => <PrathikPrejith key={item} />)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="marquee marquee-role">
                  <div className="marquee-track">
                    {[0, 1].map((group) => (
                      <div className="marquee-group" key={group}>
                        {[0, 1].map((item) => <FullStackDev key={item} />)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`hero-bottom${paused || intro || !heroVisible ? " is-paused" : ""}`}>
              <Typewriter paused={paused || intro || !heroVisible} reducedMotion={reducedMotion} />
              <div className="hero-actions">
                <div className="hero-cta-group">
                  <a className="primary-link" href="#projects">View projects <span aria-hidden="true">&#8599;</span></a>
                  <a className="secondary-link" href="#contact">Contact me <span aria-hidden="true">&#8599;</span></a>
                </div>
                <button className="text-button motion-toggle" aria-pressed={paused || reducedMotion} disabled={reducedMotion} onClick={() => setPaused(!paused)}>
                  {reducedMotion ? "Reduced motion on" : paused ? "Resume motion" : "Pause motion"}
                </button>
              </div>
            </div>
          </section>
          <Projects />
          <AboutSection />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
export default HomePage;
