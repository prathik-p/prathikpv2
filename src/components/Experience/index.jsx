import { useState } from "react";
import "./index.scss";

const roles = [
  {
    company: "Strawberry Labs",
    role: "Full Stack AI Engineer",
    dates: "Jun 2025 - Jul 2026",
    location: "Dubai / Remote",
    points: [
      "Enabled purchases and recurring subscriptions for Parkabox by delivering end-to-end checkout, order, and subscription workflows.",
      "Streamlined financial operations with secure Stripe and TotalPay payments, payment reconciliation, and automated transactional emails.",
      "Expanded Berrydesk into real-time voice support and improved conversation responsiveness, benchmarking AI providers to inform vendor selection.",
      "Helped turn AI research into Berrydesk product capabilities, enabling autonomous agent workflows and access to business tools through six OAuth integrations.",
    ],
    mobilePoints: [
      "Enabled Parkabox purchases and subscriptions, streamlining payments, reconciliation, and customer notifications.",
      "Expanded Berrydesk into responsive, real-time voice support and evaluated AI providers to guide vendor selection.",
      "Turned AI research into autonomous workflows and connected agents to business tools through six OAuth integrations.",
    ],
    stack: "React / Next.js / NestJS / PostgreSQL / Prisma / Pipecat",
  },
  {
    company: "CCS Technologies",
    role: "ReactJS Developer Intern",
    dates: "Feb 2025 - Jun 2025",
    location: "Kochi, Kerala",
    points: [
      "Turned client business requirements into workflow-specific internal applications using custom React and SharePoint web parts.",
      "Improved usability and access to enterprise data through responsive interfaces connected to SharePoint lists and document libraries.",
      "Contributed to scalable, maintainable client solutions with reusable React components and structured SharePoint integrations.",
    ],
    stack: "React / SharePoint / SPFx",
  },
];

function Experience() {
  const [selected, setSelected] = useState(roles[0].company);
  return (
    <section className="experience-section content-section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <fieldset className="panel-selector">
        <legend className="sr-only">Choose an employer</legend>
        {roles.map((job, index) => <label key={job.company}><input type="radio" name="employer" checked={selected === job.company} onChange={() => setSelected(job.company)} aria-controls={`role-${index}`} /><span>{job.company}</span></label>)}
      </fieldset>
      <div className="experience-list">
        {roles.map((job, index) => (
          <article className="experience-entry" id={`role-${index}`} key={job.company} aria-hidden={selected !== job.company}>
            <div className="experience-meta"><p>{job.dates}</p><span>{job.location}</span></div>
            <div className="experience-details">
              <h3>{job.company}</h3>
              <p className="role-title">{job.role}</p>
              <ul className={job.mobilePoints ? "experience-points-desktop" : undefined}>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
              {job.mobilePoints && <ul className="experience-points-mobile">{job.mobilePoints.map((point) => <li key={point}>{point}</li>)}</ul>}
              <p className="stack-line">{job.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
