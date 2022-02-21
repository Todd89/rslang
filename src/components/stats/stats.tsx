import Footer from "../footer/footer";
import Header from "../header/header";
import ShortTermStats from "./short-term-stats/short-term-stats";
import LongStatistic from "./statistic-long/statistic-long";
import "./stats.css";

const Stats: React.FC = () => {
  
  return (
    <>
      <Header />
      <main className='stats'>
        <div className='stats__wrapper container'>
          <div className='game__wrapper horizontal'>
            <img
              className='image-stat'
              src='assets/images/girl-stat.png'
              alt='девочка'
            />
            <div className='stat__section'>
              <h2 className='stat__header'>Статистика</h2>
              <ShortTermStats />
              <h3>Статистика за весь период</h3>
              <div className='stat__block stat-long'>
                <LongStatistic />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Stats;
