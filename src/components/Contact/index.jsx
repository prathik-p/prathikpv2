import "./index.scss";

function Contact() {
  return (
    <section className="contact-section content-section" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Have something in mind?<br />Let&rsquo;s build it.</h2>
      <p>For engineering roles, collaborations, or a conversation about your next product.</p>
      <a className="contact-email" href="mailto:prathikprejith32@gmail.com">prathikprejith32@gmail.com <span aria-hidden="true">&#8599;</span></a>
      <div className="contact-links">
        <a className="primary-link" href="mailto:prathikprejith32@gmail.com">Email me <span aria-hidden="true">&#8599;</span></a>
        <a href="https://www.linkedin.com/in/prathik-prejith-378305279" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">&#8599;</span></a>
        <a href="/Prathik-Resume.pdf" download>Download r&eacute;sum&eacute; <span aria-hidden="true">&#8595;</span></a>
      </div>
      <footer className="site-footer"><span>Prathik Prejith</span><a href="#home">Back to top <span aria-hidden="true">&#8593;</span></a></footer>
    </section>
  );
}

export default Contact;
