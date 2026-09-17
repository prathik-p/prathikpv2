import "./index.scss";

function Welcome() {
  return (
    <div className="welcome-art" role="img" aria-label="Welcome">
      <div className="welcome-stack" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} style={{ "--layer": index }}>Welcome</span>
        ))}
      </div>
    </div>
  );
}
export default Welcome;
