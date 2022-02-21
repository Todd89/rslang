import "./short-term-stats.css";
import { FORMER_STAT } from "../../../const/const-audio";

//user
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../../store/data/selectors";
import { getUserStatistic } from "../../audio-page/audio-utils/audio-utils";
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

  async function getShortTermStat(game: string) {
    const getStat = getUserStatistic(userAuthData);

    await getStat;
  }

  if (userAuthorized) {
    getShortTermStat("sprint");
    getShortTermStat("audio");

    data[0].new = FORMER_STAT.optional.sprint.newWords;
    data[0].best = FORMER_STAT.optional.sprint.bestSeries;
    data[0].correct = FORMER_STAT.optional.sprint.successCounter;
    data[0].all =
      FORMER_STAT.optional.sprint.successCounter +
      FORMER_STAT.optional.sprint.failCounter;
    data[0].rate = Math.ceil(
      (data[0].correct / (data[0].all === 0 ? 1 : data[0].all)) * 100
    );
    data[1].new = FORMER_STAT.optional.audio.newWords;
    data[1].best = FORMER_STAT.optional.audio.bestSeries;
    data[1].correct = FORMER_STAT.optional.audio.successCounter;
    data[1].all =
      FORMER_STAT.optional.audio.successCounter +
      FORMER_STAT.optional.audio.failCounter;
    data[1].rate = Math.ceil(
      (data[1].correct / (data[1].all === 0 ? 1 : data[1].all)) * 100
    );

    dataDay.learnedWords =
      FORMER_STAT.optional.sprint.learnedWords +
      FORMER_STAT.optional.audio.learnedWords;

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
  }
  return (
    <>
      <h3>Краткосрочная статистика</h3>
      <div className="game__wrapper horizontal stat__wrapper">
        <div className="stat__block stat-sprint">
          <h4 className="stat__block-header">Спринт</h4>
          <p>
            Количество новых слов:
            <span className="stat__line stat-new">{data[0].new}</span>
          </p>
          <p>
            Правильных ответов:
            <span className="stat__line stat-correct">{data[0].rate}%</span>
          </p>
          <p>
            Cамая длинная серия:
            <span className="stat__line stat-best">{data[0].best}</span>
          </p>
        </div>
        <div className="stat__block stat-audio">
          <h4 className="stat__block-header">Аудиовызов</h4>
          <p>
            Количество новых слов:
            <span className="stat__line stat-new">{data[1].new}</span>
          </p>
          <p>
            Правильных ответов:
            <span className="stat__line stat-correct">{data[1].rate}%</span>
          </p>
          <p>
            Cамая длинная серия:
            <span className="stat__line stat-best">{data[1].best}</span>
          </p>
        </div>
        <div className="stat__block stat-day">
          <h4 className="stat__block-header">Всего за день</h4>
          <p>
            Количество новых слов:
            <span className="stat__line stat-new">{dataDay.new}</span>
          </p>
          <p>
            Изученных слов:
            <span className="stat__line stat-new">{dataDay.learnedWords}</span>
          </p>
          <p>
            Правильных ответов:
            <span className="stat__line stat-correct">{dataDay.rate}%</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default ShortTermStats;
