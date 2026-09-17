import { useState } from "react";
import "./index.scss";

const roles = [
  {
    company: "Strawberry Labs",
    role: "Full Stack AI Engineer",
    dates: "Jun 2025 - Jul 2026",
    location: "Dubai / Remote",
    points: [
      "Built Parkabox, an e-commerce platform with checkout, subscriptions, order management, and Stripe / TotalPay payments.",
      "Developed AI customer support and low-latency voice pipelines with Parlant, Pipecat, WebRTC, and Twilio, optimizing speech and LLM integrations.",
      "Connected Berrydesk to WhatsApp, Discord, Slack, Google Drive, Notion, and Stripe through OAuth integrations.",
    ],
    stack: "React / Next.js / NestJS / PostgreSQL / Prisma / Pipecat",
  },
  {
    company: "CCS Technologies",
    role: "ReactJS Developer Intern",
    dates: "Feb 2025 - Jun 2025",
    location: "Kochi, Kerala",
    points: [
      "Built custom SharePoint web parts using React and the SharePoint Framework, progressing from hands-on training to client projects.",
      "Developed responsive UI components, integrated SharePoint data sources, and worked on performance and scalability.",
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
              <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <p className="stack-line">{job.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
