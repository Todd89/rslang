import "./sprint-game-block.css";
import { useSelector } from "react-redux";
import {
  IGameBlockProps,
  IRandomWordInGame,
  IUserData,
  IStatistic,
} from "../../../interface/interface";
import { useState, useEffect } from "react";
import { getUserAuthData } from "../../../store/data/selectors";
import { SprintNums, NULL_STATISTIC, SprintPages } from "../../../const/const";
import { AUDIO } from "../../../const/const-audio";
import {
  changeScoreX,
  makeAnswersArray,
  addViewToBonus,
  workWithUserWord,
  newStatistic,
} from "../sprint-methods/sprint-methods";
import httpClient from "../../../services/http-client";

const GameBlock: React.FC<IGameBlockProps> = ({
  randomWordsInGame,
  loadingUserWords,
  changePageState,
  changeAnswersArray,
  changeLoadingUserWords,
  changeState,
  state,
  changeMainScore,
}) => {
  const [answers, setAnswers] = useState<IRandomWordInGame[]>([]);
  const [seconds, setSeconds] = useState<number>(SprintNums.MINUTE);
  const [score, setScore] = useState<number>(0);
  const [scoreX, setScoreX] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [playerRealAnswer, setPlayerRealAnswer] = useState<
    boolean | undefined
  >();
  const [user, setUser] = useState<IUserData>();
  const [learnWordsInGame, setlearnWordsInGame] = useState<number>(0);
  const [newWordsInGame, setNewWordsInGame] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic>();
  const [bestSeries, setBestSeries] = useState<Array<number>>([0]);
  const [finish, setFinish] = useState<boolean | undefined>(false);
  const [rightAnswerCount, setRightAnswerCount] = useState<number>(0);

  let englishWord;
  let russianWord;

  if (randomWordsInGame.length > 0) {
    englishWord = randomWordsInGame[count].ENGLISH_WORD;
    russianWord = randomWordsInGame[count].RUSSIAN_WORD;
  } else {
    englishWord = "";
    russianWord = "";
  }

  const USER_DATA = useSelector(getUserAuthData);

  if (!user) {
    if (USER_DATA) {
      const NEW_USER = {
        userId: USER_DATA.userId,
        token: USER_DATA.token,
      };
      setUser(NEW_USER);
    }
  }

  const makeEndGame = () => {
    if (user) {
      newStatistic(
        statistic as IStatistic,
        user as IUserData,
        learnWordsInGame,
        newWordsInGame,
        bestSeries,
        answers
      );
    }
    changeAnswersArray(answers);
    changeMainScore(score);
    AUDIO.src = "/assets/sound/end.mp3";
    AUDIO.volume = 0.2;
    AUDIO.play();
    changePageState(SprintPages.CONGRATULATION_PAGE);
  };

  const changeRightAnswersCount = (type: boolean) => {
    if (type) {
      setRightAnswerCount(rightAnswerCount + 1);
    } else {
      setRightAnswerCount(0);
    }
  };

  const getAnswer = async (type: boolean) => {
    setPlayerRealAnswer(type);
    makeAnswersArray(
      randomWordsInGame[count].TYPE_OF_ANSWER,
      type,
      randomWordsInGame,
      answers,
      changeRightAnswersCount,
      setAnswers,
      makeBestSeries,
      nullBestSeries,
      AUDIO,
      count
    );
    changeCount();
    if (user) {
      await workWithUserWord(
        type,
        user as IUserData,
        loadingUserWords,
        randomWordsInGame,
        count,
        changeLoadingUserWords,
        learnWordsInGame,
        newWordsInGame,
        setNewWordsInGame,
        setlearnWordsInGame
      );
    }
  };

  if (state) {
    if (answers.length === randomWordsInGame.length) {
      makeEndGame();
    }
  } else {
    if (answers.length === SprintNums.MAX_ANSWERS_LENGTH) {
      makeEndGame();
    }
  }

  useEffect(() => {
    if (!answers.length && user) {
      const getStatisic = async () => {
        const STATISTIC = await httpClient.getUserStatistic(user as IUserData);
        if (!STATISTIC) {
          await httpClient.putUserStatistic(user as IUserData, NULL_STATISTIC);
          setStatistic(NULL_STATISTIC);
        }
        if (STATISTIC) setStatistic(STATISTIC);
      };
      getStatisic();
    }
  }, []);

  useEffect(() => {
    let sec = 60;
    const interval = setInterval(() => {
      sec -= 1;
      if (sec === 0) {
        setFinish(true);
        clearInterval(interval);
        changePageState("congratulation");
        AUDIO.src = "/assets/sound/end.mp3";
        AUDIO.volume = 0.2;
        AUDIO.play();
      }
      setSeconds(sec);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (finish) {
      changeAnswersArray(answers);
    }
  }, [finish]);

  useEffect(() => {
    if (count > 0) {
      changeScoreX(rightAnswerCount, setScoreX);

      changeScore(
        randomWordsInGame[count - 1].TYPE_OF_ANSWER,
        playerRealAnswer as boolean
      );
    }
  }, [rightAnswerCount]);

  const changeScore = (answer: boolean, playerAnswer: boolean) => {
    let newScore = score + scoreX;
    if (answer === playerAnswer) {
      setScore(newScore);
    }
  };

  const changeCount = () => {
    if (count < randomWordsInGame.length - 1) setCount(count + 1);
  };

  const makeBestSeries = () => {
    let lastItem = bestSeries.length - 1;
    bestSeries[lastItem] = bestSeries[lastItem] + 1;
    setBestSeries(bestSeries);
  };

  const nullBestSeries = () => {
    let newArr = bestSeries.slice();
    newArr.push(0);
    setBestSeries(newArr);
  };

  if (document.getElementById("level-up")) {
    addViewToBonus(rightAnswerCount);
  }

  useEffect(() => {
    const checkAnswer = async (e: KeyboardEvent) => {
      if (
        newWordsInGame === SprintNums.NEW_WORDS_FIRST_PAGE ||
        newWordsInGame === SprintNums.NEW_WORDS_SECOND_PAGE ||
        newWordsInGame === SprintNums.NEW_WORDS_THIRD_PAGE
      ) {
        setNewWordsInGame(newWordsInGame + 1);
      }
      if (e.keyCode === 37) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        await getAnswer(false);
      } else if (e.keyCode === 39) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        await getAnswer(true);
      }
    };

    document.addEventListener("keydown", checkAnswer, false);

    return () => {
      document.removeEventListener("keydown", checkAnswer, false);
    };
  });

  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/rocket-girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'>
          <div className='game-sprint-block__timer'>
            <span className='game-sprint-block__text game-sprint-block__text-time'>
              {seconds} сек
            </span>
          </div>
          <div id='level-up' className='game-sprint-block__level-up'>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/cool.png' alt='класс' />
            </div>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/cool.png' alt='класс' />
            </div>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/cool.png' alt='класс' />
            </div>
          </div>
          <div className='game-sprint-block__score'>
            <span className='game-sprint-block__text game-sprint-block__text-score'>
              Очки: {score}
            </span>
          </div>
        </div>
        <div className='game-sprint-block__quastion'>
          <div className='game-sprint-block__english-word'>{englishWord}</div>
          <div className='game-sprint-block__score-x' id='score-x'>
            +{scoreX}
          </div>
          <div className='game-sprint-block__russian-word'>{russianWord}</div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={async () => {
              getAnswer(false);
            }}
          >
            Неверно
          </button>
          <button
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={async () => {
              getAnswer(true);
            }}
          >
            Правильно
          </button>
        </div>
      </div>
      <button
        className='game-sprint-block__button-close'
        onClick={() => {
          changePageState(SprintPages.GREETING_PAGE);
          changeState(undefined);
        }}
      ></button>
    </div>
  );
};

export default GameBlock;
