import Footer from "../footer/footer";
import Header from "../header/header";
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
              <h3>Краткосрочная статистика</h3>
              <div className="game__wrapper horizontal stat__wrapper">
                <div className="stat__block stat-sprint">
                  <h4 className="stat__block-header">Спринт</h4>
                  <p>
                    Сегодня вы встретились с
                    <span className="stat__line stat-new">5</span>
                    <span>новыми словами!</span>
                  </p>
                  <p>
                    Сегодня вы дали
                    <span className="stat__line stat-correct">5%</span>
                    <span>правильных ответов!</span>
                  </p>
                  <p>
                    Cамая длинная серия верных ответов составила
                    <span className="stat__line stat-best">5</span>
                    <span>слов!</span>
                  </p>
                </div>
                <div className="stat__block stat-audio">
                  <h4 className="stat__block-header">Аудиовызов</h4>
                  <p>
                    Сегодня вы встретились с
                    <span className="stat__line stat-new">5</span>
                    <span>новыми словами!</span>
                  </p>
                  <p>
                    Сегодня вы дали
                    <span className="stat__line stat-correct">5%</span>
                    <span>правильных ответов!</span>
                  </p>
                  <p>
                    Cамая длинная серия верных ответов составила
                    <span className="stat__line stat-best">5</span>
                    <span>слов!</span>
                  </p>
                </div>
                <div className="stat__block stat-day">
                  <h4 className="stat__block-header">Всего за день</h4>
                  <p>
                    Сегодня вы встретились с
                    <span className="stat__line stat-new">5</span>
                    <span>новыми словами!</span>
                  </p>
                  <p>
                    Сегодня вы изучили
                    <span className="stat__line stat-new">5</span>
                    <span> слов!</span>
                  </p>
                  <p>
                    Сегодня вы дали
                    <span className="stat__line stat-correct">5%</span>
                    <span>правильных ответов!</span>
                  </p>
                </div>
              </div>
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
