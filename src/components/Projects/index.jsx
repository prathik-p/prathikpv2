import { useState } from "react";
import "./index.scss";

function Projects() {
  const [selected, setSelected] = useState("speed");
  return (
    <section className="projects-section content-section" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Selected projects</h2>
      <fieldset className="panel-selector">
        <legend className="sr-only">Choose a project</legend>
        <label><input type="radio" name="project" value="speed" checked={selected === "speed"} onChange={() => setSelected("speed")} aria-controls="speed-project" /><span>AI Speed Detection</span></label>
        <label><input type="radio" name="project" value="flight" checked={selected === "flight"} onChange={() => setSelected("flight")} aria-controls="flight-project" /><span>Flight Trajectories</span></label>
      </fieldset>
      <div className="project-list">
        <article className="project-entry" id="speed-project" aria-hidden={selected !== "speed"} {...(selected !== "speed" ? { inert: "" } : {})}>
          <div className="project-heading"><p>Computer vision / Real-time systems</p><span>Mar 2024 - Oct 2024</span></div>
          <h3>Making traffic data<br />visible in real time.</h3>
          <p className="project-description">AI Speed Detection uses surveillance footage to monitor vehicle speeds and capture license plate information in a React dashboard.</p>
          <div className="project-summary">
            <div><h4>The problem</h4><p>Bring vehicle tracking, camera streams, and historical records into one usable interface.</p></div>
            <div><h4>My contribution</h4><p>Developed the React interface and real-time streaming integration, alongside vehicle detection with YOLOv8 and ByteTrack.</p></div>
          </div>
          <details className="project-detail">
            <summary>Inside the implementation</summary>
            <p>WebSockets carry live video into the interface. YOLOv8 detects vehicles and ByteTrack tracks them across frames, while the dashboard presents current and historical vehicle and license plate information.</p>
          </details>
          <div className="project-bottom"><p>React / YOLOv8 / ByteTrack / WebSockets</p><a href="https://github.com/UnparallelStudios/ai-speed-frontend" target="_blank" rel="noreferrer" aria-label="View AI Speed Detection source on GitHub">Source code <span aria-hidden="true">&#8599;</span></a></div>
        </article>
        <article className="project-entry" id="flight-project" aria-hidden={selected !== "flight"} {...(selected !== "flight" ? { inert: "" } : {})}>
          <div className="project-heading"><p>Machine learning / Aviation</p><span>Dec 2024 - Apr 2025</span></div>
          <h3>Learning the path<br />from real flights.</h3>
          <p className="project-description">Ideal Path Estimation for Flight Trajectories explores how inverse reinforcement learning and deep imitation learning can replicate expert flight paths.</p>
          <div className="project-summary">
            <div><h4>The problem</h4><p>Estimate flight trajectories under varying conditions, using real-world flight data as the reference.</p></div>
            <div><h4>My contribution</h4><p>Developed trajectory models with TensorFlow and PyTorch, and a React frontend to compare predicted and actual flight paths.</p></div>
          </div>
          <details className="project-detail">
            <summary>Inside the implementation</summary>
            <p>Custom neural network architectures were trained and evaluated on real-world flight trajectories. The React interface supports interactive comparisons of predicted paths against the original flight data.</p>
          </details>
          <div className="project-bottom"><p>React / TensorFlow / PyTorch / IRL</p><a href="mailto:prathikprejith32@gmail.com?subject=Flight%20trajectory%20project">Ask about this project <span aria-hidden="true">&#8599;</span></a></div>
        </article>
      </div>
    </section>
  );
}

export default Projects;
