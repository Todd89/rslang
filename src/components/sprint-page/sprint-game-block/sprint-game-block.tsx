import "./sprint-game-block.css";
import {
  IGameBlockProps,
  IRandomWordInGame
} from "../../../interface/interface";
import { useState, useEffect } from "react";

const GameBlock: React.FC<IGameBlockProps> = ({
  word,
  randomWordsInGame,
  changeWordCount,
  changePageState,
  changeAnswersArray,
  changeWord,

}) => {
  const [answers, setAnswers] = useState<any>([]);
  const [seconds, setSeconds] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [scoreX, setScoreX] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [playerRealAnswer, setPlayerRealAnswer] = useState<boolean | undefined>();
  const [finish, setFinish] = useState<boolean | undefined>(false);
  
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
    if(count > 0) {

      changeScoreX(answers)
              
      changeScore(randomWordsInGame[count-1].TYPE_OF_ANSWER, playerRealAnswer as boolean);

    }

  }, [count]);

  const AUDIO_RIGHT = new Audio();
  AUDIO_RIGHT.src = "/assets/sound/right.mp3";
  AUDIO_RIGHT.volume = 0.2;

  const AUDIO_WRONG = new Audio();
  AUDIO_WRONG.src = "/assets/sound/wrong.mp3";
  AUDIO_WRONG.volume = 0.2;

  const AUDIO_END = new Audio();
  AUDIO_END.src = "/assets/sound/end.mp3";
  AUDIO_END.volume = 0.2;

  if (answers.length === 59) {
    changeAnswersArray(answers);
    changePageState("congratulation");
    AUDIO_END.load();
    AUDIO_END.play();
  }

  const makeAnswersArray = (rightAnswer: boolean, playerAnswer: boolean) => {

    if (rightAnswer === playerAnswer) {
      const ANSWER_STATE = { TYPE_OF_ANSWER: true };
      const ANWSER_WORD = { ...randomWordsInGame[count], ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD);
      setAnswers(NEW_ARR);
      AUDIO_RIGHT.play();
    } else {
      const ANSWER_STATE = { TYPE_OF_ANSWER: false };
      const ANWSER_WORD = {  ...randomWordsInGame[count], ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD);
      setAnswers(NEW_ARR);
      AUDIO_WRONG.play();
    }
  };

  const changeScoreX = (answers:IRandomWordInGame[]) => {
    
    let result = 1;
    const LAST_WORD = answers.length - 1;    
      if(answers[LAST_WORD]?.TYPE_OF_ANSWER && answers[LAST_WORD - 1]?.TYPE_OF_ANSWER && answers[LAST_WORD-2]?.TYPE_OF_ANSWER) {
        result = 2;
      } else if (answers[LAST_WORD]?.TYPE_OF_ANSWER && answers[LAST_WORD-1]?.TYPE_OF_ANSWER) {
        result = 1.5
      } else if (answers[LAST_WORD]?.TYPE_OF_ANSWER) {
        result = 1.25
      }

    setScoreX(result)
  };

  const changeScore = (answer: boolean, playerAnswer: boolean) => {
    let newScore = score + (100 * scoreX);
    if (answer === playerAnswer) {
      setScore(newScore);
    }
  };

  const changeCount = () => {
    setCount(count + 1)
  };


  if (document.getElementById('level-up')) {
    const EL = document.getElementById('level-up') as HTMLElement;
    const EL_FIRST = EL.firstElementChild;
    const EL_SECOND = EL.firstElementChild?.nextElementSibling;
    const EL_THIRD = EL.firstElementChild?.nextElementSibling?.nextElementSibling;
    const EL_ARR = [EL_FIRST, EL_SECOND, EL_THIRD]
  
    switch(scoreX ) {
      case 1.25: EL_FIRST?.classList.add('view');
      break;
      case 1.5: EL_SECOND?.classList.add('view');
      break;
      case 2:  EL_THIRD?.classList.add('view');
      break;
      default: EL_ARR.forEach(el => el?.classList.remove('view'))
    }
  }

  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/png/rocket-girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div  className='game-sprint-block__top-lights'>
          <div className='game-sprint-block__timer'><span className='game-sprint-block__text'>{seconds} sec</span></div>
          <div id="level-up" className='game-sprint-block__level-up'>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/png/cool.png' alt='класс' />
            </div>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/png/cool.png' alt='класс' />
            </div>
            <div className='game-sprint-block__cool-symbol'>
              <img src='/assets/images/png/cool.png' alt='класс' />
            </div>
          </div>
          <div className='game-sprint-block__score'>
            <span className='game-sprint-block__text'>Score:{score}</span>
          </div>
        </div>
        <div className='game-sprint-block__quastion'>
          <div className='game-sprint-block__english-word'>{randomWordsInGame[count].ENGLISH_WORD}</div>
          <div className='game-sprint-block__russian-word'>{randomWordsInGame[count].RUSSIAN_WORD}</div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={() => {
              setPlayerRealAnswer(false);
              
              makeAnswersArray(randomWordsInGame[count].TYPE_OF_ANSWER, false);
              
              changeWordCount();
              
              changeWord();
              
              changeCount()
             
            }}
          >
            Неверно
          </button>
          <button
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={() => {
              setPlayerRealAnswer(true);

              makeAnswersArray(randomWordsInGame[count].TYPE_OF_ANSWER, true);
              
              changeWordCount();
             
              changeWord();
              
              changeCount()

             
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
