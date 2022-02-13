import "./sprint-game-block.css";
import {
  IGameBlockProps,
  IWordInAnswerArray,
} from "../../../interface/interface";
import { useState, useEffect } from "react";

const GameBlock: React.FC<IGameBlockProps> = ({
  word,
  changeWordCount,
  changePageState,
  changeAnswersArray,
  answer,
  typeOfAnswer,
  makeRandomAnswer,
  englishAnswer,
  changeWord,
}) => {
  const [answers, setAnswers] = useState<Array<IWordInAnswerArray>>([]);
  const [seconds, setSeconds] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [scoreX, setScoreX] = useState<number>(1);


  useEffect(() => {
    let sec = 60;
    const interval = setInterval(() => {
      sec -= 1;
      if (sec === 0) {
        clearInterval(interval);
      }
      setSeconds(sec);
    }, 1000);
    makeRandomAnswer();
    return () => clearInterval(interval);
  }, []);

  const AUDIO_RIGHT = new Audio();
  AUDIO_RIGHT.src = "/assets/audio/right.mp3";

  const AUDIO_WRONG = new Audio();
  AUDIO_WRONG.src = "/assets/audio/wrong.mp3";

  if (answers.length === 10) {
    changeAnswersArray(answers);
    changePageState("congratulation");
  }

  const makeAnswersArray = (rightAnswer: boolean, playerAnswer: boolean) => {
    console.log(word)
    if (rightAnswer === playerAnswer) {
      const ANSWER_STATE = { isAnwserTrue: true };
      const ANWSER_WORD = { ...word, ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD);
      setAnswers(NEW_ARR);
      AUDIO_RIGHT.play();
    } else {
      const ANSWER_STATE = { isAnwserTrue: false };
      const ANWSER_WORD = { ...word, ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD);
      setAnswers(NEW_ARR);
      AUDIO_WRONG.play();
    }
  };

  const changeScoreX = (answers:IWordInAnswerArray[]) => {
    let result = 1;
    const LAST_WORD = answers.length - 1;    
      if(answers[LAST_WORD]?.isAnwserTrue && answers[LAST_WORD - 1]?.isAnwserTrue && answers[LAST_WORD-2]?.isAnwserTrue) {
        result = 2;
      } else if (answers[LAST_WORD]?.isAnwserTrue && answers[LAST_WORD-1]?.isAnwserTrue) {
        result = 1.5
      } else if (answers[LAST_WORD]?.isAnwserTrue) {
        result = 1.25
      }
    console.log('result',result)
    setScoreX(result)
  };

  const changeScore = (answer: boolean, playerAnswer: boolean) => {
    let newScore = score + (100 * scoreX);
    if (answer === playerAnswer) {
      setScore(newScore);
    }
  };

  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/png/sprint_girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'>
          <div className='game-sprint-block__timer'><span className='game-sprint-block__text'>{seconds} sec</span></div>
          <div className='game-sprint-block__level-up'>
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
          <div className='game-sprint-block__english-word'>{englishAnswer}</div>
          <div className='game-sprint-block__russian-word'>{answer}</div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={() => {
              makeAnswersArray(typeOfAnswer as boolean, false);
              changeScoreX(answers)
              changeScore(typeOfAnswer as boolean, false);
              changeWordCount();
              changeWord();
              makeRandomAnswer();
            }}
          >
            Неверно
          </button>
          <button
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={() => {
              makeAnswersArray(typeOfAnswer as boolean, true);
              changeScoreX(answers)
              changeScore(typeOfAnswer as boolean, true);
              changeWordCount();
              changeWord();
              makeRandomAnswer();
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
