import "./index.scss";

function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <p className="section-label">About me</p>
      <div className="about-content">
        <h2 id="about-title">From the first pixel<br />to the last endpoint.</h2>
        <p className="about-description">I&rsquo;m Prathik, a full stack AI engineer building web applications and AI-powered products. My work spans responsive interfaces, commerce platforms, voice AI, and the integrations that connect them.</p>
        <div className="practice-grid">
          <div><h3>Web &amp; product</h3><p>React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, and Prisma. From the interface to payments and application data.</p></div>
          <div><h3>AI &amp; voice</h3><p>Conversational AI and voice pipelines with Parlant, Pipecat, WebRTC, and Twilio. Connecting models to real product experiences.</p></div>
        </div>
        <p className="education-note">BTech in Artificial Intelligence and Data Science<br /><span>Rajagiri School of Engineering and Technology, 2025</span></p>
      </div>
    </section>
  );
}
export default AboutSection;
