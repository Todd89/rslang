import Footer from "../footer/footer";
import Header from "../header/header";
import ShortTermStats from "./short-term-stats/short-term-stats";
import LongStatistic from "./statistic-long/statistic-long";
import "./stats.css";

//user
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../store/data/selectors";

//user

const Stats: React.FC = () => {
  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);

  return (
    <>
      <Header />
      <main className="stats">
        <div className="stats__wrapper container">
          <div className="game__wrapper horizontal">
            <img
              className="image-stat"
              src="assets/images/girl-stat.png"
              alt="девочка"
            />
            <div className="stat__section">
              <h2 className="stat__header">Статистика</h2>
              {userAuthorized &&
              userAuthData &&
              userAuthData.userId &&
              userAuthData.token ? (
                <>
                  <ShortTermStats />
                  <h3>Статистика за весь период</h3>
                  <div className="stat__block stat-long">
                    <LongStatistic />
                  </div>
                </>
              ) : (
                <span className="stat__block no-stat">
                  Извините, статистика только для зарегистрированных
                  пользователей
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Stats;
