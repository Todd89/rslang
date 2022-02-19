import "./sprint-game-block.css";
import { useSelector } from "react-redux";
import {
  IGameBlockProps,
  IRandomWordInGame,
  IUserData,
  IStatistic,
  IWordInArray,
  LocationState
} from "../../../interface/interface";
import { useState, useEffect } from "react";
import { getUserAuthData } from "../../../store/data/selectors";
import { SprintNums, NULL_STATISTIC } from "../../../const/const";
import {
  changeScoreX,
  makeAnswersArray,
  addViewToBonus,
  workWithUserWord,
  newStatistic,
} from "../sprint-methods/sprint-methods";
import httpClient from "../../../services/http-client";
import { useLocation } from "react-router";

const GameBlock: React.FC<IGameBlockProps> = ({
  randomWordsInGame,
  loadingUserWords,
  changePageState,
  changeAnswersArray,
  changeLoadingUserWords,
}) => {
  const [answers, setAnswers] = useState<IRandomWordInGame[]>([]);
  const [seconds, setSeconds] = useState<number>(SprintNums.MINUTE);
  const [score, setScore] = useState<number>(0);
  const [scoreX, setScoreX] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [playerRealAnswer, setPlayerRealAnswer] = useState<
    boolean | undefined
  >();
  const [user, setUser] = useState<IUserData>();
  const [learnWordsInGame, setlearnWordsInGame] = useState<number>(0);
  const [newWordsInGame, setNewWordsInGame] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic>();
  const [bestSeries, setBestSeries] = useState<number>(0);
  const [finish, setFinish] = useState<boolean | undefined>(false);

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


  // const getWordsFromGroupFromTextBook = async (page:number, group: number) => {
  //   const PROMIS_ARR = [];
  //   let RESULT: Array<Array<IWordInArray>> = [];
  //   for (let i = page; i >= 0; i--) {
  //     const WORDS_CHUNK = httpClient.getChunkOfWords(i.toString(), group.toString());
  //     PROMIS_ARR.push(WORDS_CHUNK);
  //   }
  //   await Promise.all(PROMIS_ARR).then((values) => {
  //     RESULT = values;
  //   });
  
  //   return RESULT;
  // };

  // const makeAnwersArrayFromTextBook = async (page:number, group: number) => {
  //   const WORDS =  await getWordsFromGroupFromTextBook(page, group);
  //   changeAllWord(WORDS);
  //   const FLAT_WORDS_FOR_WORK = WORDS.flat();
  //   setwordsInGame(FLAT_WORDS_FOR_WORK);
  //   setFirstWord(FLAT_WORDS_FOR_WORK);
  //   console.log(FLAT_WORDS_FOR_WORK)
  // } 

  // const makeUserWords = async () => {
  //   if (user) {
  //     const LOADING_WORDS = await httpClient.getAllUserWords(user);
  
  //     changeLoadingUserWords(LOADING_WORDS);
  
  //   }
  // }

  // const location = useLocation<LocationState>();

  // useEffect (() => {
  //   if (location.state) {
  //     const locationState = location.state as any;
  //     const {group, page} = locationState;
  //     console.log("group", group);
  //     console.log("page", page);
  //     makeUserWords();
  //     makeAnwersArrayFromTextBook(page, group);
  //   }
  // },[])
 

  

  const makeEndGame = () => {
    if (user) {
      newStatistic(
        statistic as IStatistic,
        user as IUserData,
        learnWordsInGame,
        newWordsInGame,
        bestSeries,
      );
    }
    changeAnswersArray(answers);
    changePageState("congratulation");
    AUDIO_END.play();
  };


  const getAnswer = async (type:boolean) => {
    setPlayerRealAnswer(type);
    makeAnswersArray(
      randomWordsInGame[count].TYPE_OF_ANSWER,
      type,
      randomWordsInGame,
      answers,
      setAnswers,
      makeBestSeries,
      nullBestSeries,
      AUDIO_RIGHT,
      AUDIO_WRONG,
      count
    );
    changeCount();
    if (user) {
      await workWithUserWord(
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
  } 

  if (!user) {
    if (USER_DATA) {
      const NEW_USER = {
        userId: USER_DATA.userId,
        token: USER_DATA.token,
      };
      setUser(NEW_USER);
    }
  }

  if (answers.length === SprintNums.MAX_ANSWERS_LENGTH) {
    makeEndGame();
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
    let sec = 10;
    const interval = setInterval(() => {
      sec -= 1;
      if (sec === 0) {
        setFinish(true);
        clearInterval(interval);
        changePageState("congratulation");
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

  const makeBestSeries = () => {
    setBestSeries(bestSeries + 1)
  }

  const nullBestSeries = () => {
    setBestSeries(0)
  }

  if (document.getElementById("level-up")) {
    addViewToBonus(scoreX);
  }

  useEffect(()=>{

    const checkAnswer = async (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        await getAnswer(false)
      } else if (e.keyCode === 39) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        await getAnswer(true)
      }
    };

  document.addEventListener("keydown", checkAnswer, false);

  return () => {
    document.removeEventListener("keydown", checkAnswer, false);
  };
})

  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/rocket-girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'>
          <div className='game-sprint-block__timer'>
            <span className='game-sprint-block__text'>{seconds} sec</span>
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
            <span className='game-sprint-block__text'>Score:{score}</span>
          </div>
        </div>
        <div className='game-sprint-block__quastion'>
          <div className='game-sprint-block__english-word'>
            {randomWordsInGame[count].ENGLISH_WORD}
          </div>
          <div className='game-sprint-block__russian-word'>
            {randomWordsInGame[count].RUSSIAN_WORD}
          </div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={async () => {
              getAnswer(false)
            }}
          >
            Неверно
          </button>
          <button
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={async () => {
              getAnswer(true)
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
