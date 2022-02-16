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
import httpClient from "../../../services/http-client";
import { SprintNums } from "../../../const/const";
import {
  changeScoreX,
  createNewUserWord,
  makeAnswersArray,
  addViewToBonus,
} from "../sprint-methods/sprint-methods";

const GameBlock: React.FC<IGameBlockProps> = ({
  word,
  randomWordsInGame,
  changeWordCount,
  changePageState,
  changeAnswersArray,
  changeWord,
  loadingUserWords,
}) => {
  const [answers, setAnswers] = useState<IRandomWordInGame[]>([]);
  const [seconds, setSeconds] = useState<number>(SprintNums.MINUTE);
  const [score, setScore] = useState<number>(0);
  const [scoreX, setScoreX] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [playerRealAnswer, setPlayerRealAnswer] = useState<
    boolean | undefined
  >();
  const [finish, setFinish] = useState<boolean | undefined>(false);
  const [user, setUser] = useState<IUserData>();

  const USER_DATA = useSelector(getUserAuthData);

  const AUDIO_RIGHT = new Audio();
  AUDIO_RIGHT.src = "/assets/sound/right.mp3";
  AUDIO_RIGHT.volume = 0.2;

  const AUDIO_WRONG = new Audio();
  AUDIO_WRONG.src = "/assets/sound/wrong.mp3";
  AUDIO_WRONG.volume = 0.2;

  const AUDIO_END = new Audio();
  AUDIO_END.src = "/assets/sound/end.mp3";
  AUDIO_END.volume = 0.2;

  const userI = useSelector(getUserAuthData);

  if (answers.length === SprintNums.MAX_ANSWERS_LENGTH) {
    changeAnswersArray(answers);
    changePageState("congratulation");
    AUDIO_END.load();
    AUDIO_END.play();
  }

  if (!user) {
    const NEW_USER = {
      userId: USER_DATA.userId,
      token: USER_DATA.token,
    };
    setUser(NEW_USER);
  }

  useEffect(() => {
    let sec = 60;
    const interval = setInterval(() => {
      sec -= 1;
      if (sec === 0) {
        setFinish(true);
        clearInterval(interval);
        changePageState("congratulation");
        AUDIO_END.load();
        AUDIO_END.play();
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
      changeScoreX(answers, setScoreX);

      changeScore(
        randomWordsInGame[count - 1].TYPE_OF_ANSWER,
        playerRealAnswer as boolean
      );
    }
  }, [count]);

  const changeScore = (answer: boolean, playerAnswer: boolean) => {
    let newScore = score + SprintNums.PLUS_TO_SCORE * scoreX;
    if (answer === playerAnswer) {
      setScore(newScore);
    }
  };

  const changeCount = () => {
    setCount(count + 1);
  };

  if (document.getElementById("level-up")) {
    addViewToBonus(scoreX);
  }

  return (
    <div>
      <div className="girl-image">
        <img src="/assets/images/png/rocket-girl.png" alt="девочка" />
      </div>
      <div className="game-sprint-block">
        <div className="game-sprint-block__top-lights">
          <div className="game-sprint-block__timer">
            <span className="game-sprint-block__text">{seconds} sec</span>
          </div>
          <div id="level-up" className="game-sprint-block__level-up">
            <div className="game-sprint-block__cool-symbol">
              <img src="/assets/images/cool.png" alt="класс" />
            </div>
            <div className="game-sprint-block__cool-symbol">
              <img src="/assets/images/cool.png" alt="класс" />
            </div>
            <div className="game-sprint-block__cool-symbol">
              <img src="/assets/images/cool.png" alt="класс" />
            </div>
          </div>
          <div className="game-sprint-block__score">
            <span className="game-sprint-block__text">Score:{score}</span>
          </div>
        </div>
        <div className="game-sprint-block__quastion">
          <div className="game-sprint-block__english-word">
            {randomWordsInGame[count].ENGLISH_WORD}
          </div>
          <div className="game-sprint-block__russian-word">
            {randomWordsInGame[count].RUSSIAN_WORD}
          </div>
        </div>
        <div className="game-sprint-block__buttons-block">
          <button
            className="game-sprint-block__button game-sprint-block__button_wrong"
            onClick={async () => {
              const SUCCESS = randomWordsInGame[count].TYPE_OF_ANSWER
                ? false
                : true;
              const NEW_WORD = createNewUserWord(
                { ...randomWordsInGame[count] },
                SUCCESS
              );

              setPlayerRealAnswer(false);
              makeAnswersArray(
                randomWordsInGame[count].TYPE_OF_ANSWER,
                false,
                randomWordsInGame,
                answers,
                setAnswers,
                AUDIO_RIGHT,
                AUDIO_WRONG,
                count
              );
              changeWordCount();
              changeWord();
              changeCount();

              if (
                !loadingUserWords.find(
                  (el) => el.wordId === randomWordsInGame[count].ID
                )
              ) {
                await httpClient.createUserWord(
                  user as IUserData,
                  NEW_WORD,
                  randomWordsInGame[count].ID
                );
              } else {
                await httpClient.updateUserWord(
                  user as IUserData,
                  NEW_WORD,
                  randomWordsInGame[count].ID
                );
              }
            }}
          >
            Неверно
          </button>
          <button
            className="game-sprint-block__button game-sprint-block__button_right"
            onClick={async () => {
              const SUCCESS = randomWordsInGame[count].TYPE_OF_ANSWER
                ? true
                : false;
              const NEW_WORD = createNewUserWord(
                { ...randomWordsInGame[count] },
                SUCCESS
              );

              setPlayerRealAnswer(true);
              makeAnswersArray(
                randomWordsInGame[count].TYPE_OF_ANSWER,
                true,
                randomWordsInGame,
                answers,
                setAnswers,
                AUDIO_RIGHT,
                AUDIO_WRONG,
                count
              );
              changeWordCount();
              changeWord();
              changeCount();

              if (
                !loadingUserWords.find(
                  (el) => el.wordId === randomWordsInGame[count].ID
                )
              ) {
                await httpClient.createUserWord(
                  user as IUserData,
                  NEW_WORD,
                  randomWordsInGame[count].ID
                );
              } else {
                await httpClient.updateUserWord(
                  user as IUserData,
                  NEW_WORD,
                  randomWordsInGame[count].ID
                );
              }
            }}
          >
            Правильно
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBlock;
