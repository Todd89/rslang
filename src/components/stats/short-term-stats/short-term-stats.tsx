import "./short-term-stats.css";

//user
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../../store/data/selectors";

import httpClient from "../../../services/http-client";
import { useEffect, useState } from "react";
//user
const data = [
  { new: 0, best: 0, rate: 0, all: 0, correct: 0 }, //sprint
  { new: 0, best: 0, rate: 0, all: 0, correct: 0 }, //audio
];
const dataDay = {
  learnedWords: 0,
  new: 0,
  rate: 0,
};

function ShortTermStats() {
  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);
  const [isStat, setIsStat] = useState(false);

  useEffect(() => {
    const getStat = async () => {
      const shortStat = await httpClient.getUserStatistic(userAuthData);

      data[0].new = shortStat.optional.sprint.newWords;
      data[0].best = shortStat.optional.sprint.bestSeries;
      data[0].correct = shortStat.optional.sprint.successCounter;
      data[0].all =
        shortStat.optional.sprint.successCounter +
        shortStat.optional.sprint.failCounter;
      data[0].rate = Math.ceil(
        (data[0].correct / (data[0].all === 0 ? 1 : data[0].all)) * 100
      );
      data[1].new = shortStat.optional.audio.newWords;
      data[1].best = shortStat.optional.audio.bestSeries;
      data[1].correct = shortStat.optional.audio.successCounter;
      data[1].all =
        shortStat.optional.audio.successCounter +
        shortStat.optional.audio.failCounter;
      data[1].rate = Math.ceil(
        (data[1].correct / (data[1].all === 0 ? 1 : data[1].all)) * 100
      );

      dataDay.learnedWords = shortStat.learnedWords;

      dataDay.learnedWords = isNaN(dataDay.learnedWords)
        ? 0
        : dataDay.learnedWords;

      dataDay.new = data.reduce((sum, item) => {
        return sum + item.new;
      }, 0);
      const allWords = data.reduce((sum, item) => sum + item.all, 0);
      dataDay.rate = Math.ceil(
        (data.reduce((sum, item) => sum + item.correct, 0) /
          (allWords === 0 ? 1 : allWords)) *
          100
      );
      setIsStat(true);
    };
    if (
      userAuthorized &&
      userAuthData &&
      userAuthData.userId &&
      userAuthData.token
    ) {
      getStat();
    }
  }, []);

  return (
    <>
      {isStat && (
        <>
          <h3 className="stats__title">Статистика за сегодня</h3>
          <div className="stats__info-wrapper">
            <div className="stats__block">
              <h4 className="stats__block-header">Спринт</h4>
              <p className="stats__description">
                Количество новых слов:
                <span className="stats__line stat-new"> {data[0].new}</span>
              </p>
              <p className="stats__description">
                Правильных ответов:
                <span className="stats__line stats__line--proc stat-correct"> {data[0].rate}%</span>
              </p>
              <p className="stats__description">
                Cамая длинная серия:
                <span className="stats__line stat-best"> {data[0].best}</span>
              </p>
            </div>
            <div className="stats__block">
              <h4 className="stats__block-header">Аудиовызов</h4>
              <p className="stats__description">
                Количество новых слов:
                <span className="stats__line stat-new"> {data[1].new}</span>
              </p>
              <p className="stats__description">
                Правильных ответов:
                <span className="stats__line stats__line--proc stat-correct"> {data[1].rate}%</span>
              </p>
              <p className="stats__description">
                Cамая длинная серия:
                <span className="stats__line stat-best"> {data[1].best}</span>
              </p>
            </div>
            <div className="stats__block">
              <h4 className="stats__block-header">Всего за день</h4>
              <p className="stats__description">
                Количество новых слов:
                <span className="stats__line stat-new"> {dataDay.new}</span>
              </p>
              <p className="stats__description">
                Изученных слов:
                <span className="stats__line stat-new">
                  {dataDay.learnedWords}
                </span>
              </p>
              <p className="stats__description">
                Правильных ответов:
                <span className="stats__line stats__line--proc stat-correct">{dataDay.rate}%</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShortTermStats;
