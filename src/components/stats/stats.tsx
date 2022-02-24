import Footer from "../footer/footer";
import Header from "../header/header";
import ShortTermStats from "./short-term-stats/short-term-stats";
import LongStatistic from "./statistic-long/statistic-long";

import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../store/data/selectors";

const Stats: React.FC = () => {
  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);

  return (
    <>
      <Header />
      <main className="stats">
        <div className="stats__wrapper container">
          
          <div className="stats__section">
            <h2 className="stats__header visually-hidden">Статистика</h2>
            {userAuthorized &&
            userAuthData &&
            userAuthData.userId &&
            userAuthData.token ? (
              <>
                <ShortTermStats />
                <h3 className="stats__title">Статистика за весь период</h3>
                <div className="stats__long">
                  <img
                    className="stats__image"
                    src="assets/images/girl-stat.png"
                    alt="девочка"
                  />
                  <LongStatistic />
                </div>
              </>
            ) : (
              <p className="stats__no-stat">
                Извините, статистика доступна только для зарегистрированных
                пользователей
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Stats;
