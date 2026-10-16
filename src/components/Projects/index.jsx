import { Fragment, useState } from "react";
import "./index.scss";

const projects = [
  {
    id: "speed",
    name: "AI Speed Detection",
    category: "Computer vision / Real-time systems",
    dates: "Mar 2024 - Oct 2024",
    headline: ["Making traffic data", "visible in real time."],
    description: "AI Speed Detection uses surveillance footage to monitor vehicle speeds and capture license plate information in a React dashboard.",
    problem: "Bring vehicle tracking, camera streams, and historical records into one usable interface.",
    contribution: "Developed the React interface and real-time streaming integration, alongside vehicle detection with YOLOv8 and ByteTrack.",
    implementation: "WebSockets carry live video into the interface. YOLOv8 detects vehicles and ByteTrack tracks them across frames, while the dashboard presents current and historical vehicle and license plate information.",
    stack: "React / YOLOv8 / ByteTrack / WebSockets",
    link: { href: "https://github.com/UnparallelStudios/ai-speed-frontend", label: "Source code", ariaLabel: "View AI Speed Detection source on GitHub", external: true },
  },
  {
    id: "flight",
    name: "Flight Trajectories",
    category: "Machine learning / Aviation",
    dates: "Dec 2024 - Apr 2025",
    headline: ["Learning the path", "from real flights."],
    description: "Ideal Path Estimation for Flight Trajectories explores how inverse reinforcement learning and deep imitation learning can replicate expert flight paths.",
    problem: "Estimate flight trajectories under varying conditions, using real-world flight data as the reference.",
    contribution: "Developed trajectory models with TensorFlow and PyTorch, and a React frontend to compare predicted and actual flight paths.",
    implementation: "Custom neural network architectures were trained and evaluated on real-world flight trajectories. The React interface supports interactive comparisons of predicted paths against the original flight data.",
    stack: "React / TensorFlow / PyTorch / IRL",
    link: { href: "mailto:prathikprejith32@gmail.com?subject=Flight%20trajectory%20project", label: "Ask about this project" },
  },
];

function Projects() {
  const [selected, setSelected] = useState(projects[0].id);
  return (
    <section className="projects-section content-section" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Selected projects</h2>
      <fieldset className="panel-selector">
        <legend className="sr-only">Choose a project</legend>
        {projects.map((project) => <label key={project.id}><input type="radio" name="project" value={project.id} checked={selected === project.id} onChange={() => setSelected(project.id)} aria-controls={`${project.id}-project`} /><span>{project.name}</span></label>)}
      </fieldset>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-entry" id={`${project.id}-project`} key={project.id} aria-hidden={selected !== project.id} {...(selected !== project.id ? { inert: "" } : {})}>
            <div className="project-heading"><p>{project.category}</p><span>{project.dates}</span></div>
            <h3>{project.headline.map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-summary">
              <div><h4>The problem</h4><p>{project.problem}</p></div>
              <div><h4>My contribution</h4><p>{project.contribution}</p></div>
            </div>
            <details className="project-detail">
              <summary>Inside the implementation</summary>
              <p>{project.implementation}</p>
            </details>
            <div className="project-bottom">
              <p>{project.stack}</p>
              <a href={project.link.href} aria-label={project.link.ariaLabel} {...(project.link.external ? { target: "_blank", rel: "noreferrer" } : {})}>{project.link.label} <span aria-hidden="true">&#8599;</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
