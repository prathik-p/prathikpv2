import FullStackDev from "../../components/FullStackDev";
import PrathikPrejith from "../../components/PrathikPrejith";
import Welcome from "../../components/Welcome";
import "./index.scss";

function HomePage() {
  return (
    <>
      <div className="homepage-container">
        <div className="welcome-comp">
          <Welcome />
        </div>
        <div className="pp-comp">
          <div className="marquee-pp">
            <PrathikPrejith />
          </div>
          <div className="marquee-pp">
            <PrathikPrejith />
          </div>
        </div>
        <div className="fullstack-comp">
          <div className="marquee-fullst">
            <FullStackDev />
          </div>
          <div className="marquee-fullst">
            <FullStackDev />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
