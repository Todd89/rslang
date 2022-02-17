import Footer from "../footer/footer";
import Header from "../header/header";
import ShortTermStats from "./short-term-stats/short-term-stats";
import "./stats.css";

const Stats: React.FC = () => {
  return (
    <>
      <Header />

      <main className="stats">
        <div className="stats__wrapper container">
          <div className="game__wrapper horizontal">
            <img
              className="image-stat"
              src="assets/images/girl-stat.png"
              alt=""
            />
            <div className="stat__section">
              <h2 className="stat__header">Статистика</h2>
              <ShortTermStats />
              <h3>Долгосрочная статистика</h3>
              <div className="stat__block stat-long"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Stats;
