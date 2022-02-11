import "./sprint-game-block.css";
import { randomNum } from "../sprint-methods/sprint-methods";
import { IGameBlockProps, IWordInAnswerArray } from "../../../interface/interface";
import { useState, useEffect } from 'react';

const GameBlock: React.FC<IGameBlockProps> = ({
  word,
  changeWordCount,
  wordsInGame,
  changePageState,
  changeAnswersArray
}) => {
  
  const [answers, setAnswers] = useState<Array<IWordInAnswerArray>>([]);
  const [seconds, setSeconds] = useState<number>(60);
  const [answer, setAnswer] = useState<string>("");
  const [rightAnswer, setRightAnswer] = useState<boolean | undefined>();
  const [score, setScore] = useState<number>(0);

  const makeRandomAnswer = () => {
    const VALUE = randomNum(9);
   
    if (VALUE < 6) {
      setAnswer(word.wordTranslate.toUpperCase());
      setRightAnswer(true);
      console.log('makeRandomAnswer',rightAnswer)
      console.log('word',word)
    } else {
      const WRONG_NUM = randomNum(59);
      if (wordsInGame[WRONG_NUM].wordTranslate !== word.wordTranslate) {
        setAnswer(wordsInGame[WRONG_NUM].wordTranslate.toUpperCase());
        setRightAnswer(false);
        console.log('makeRandomAnswer',rightAnswer)
        console.log('word',word)
      }
    }
   
  };

  useEffect(() => {
    let sec = 60;
    const interval = setInterval(() => {
      sec -= 1;
      setSeconds(sec);
    }, 1000)
    makeRandomAnswer();
    return () => clearInterval(interval);
  }, []);


  const AUDIO_RIGHT = new Audio();
  AUDIO_RIGHT.src = "/assets/audio/right.mp3";

  const AUDIO_WRONG = new Audio();
  AUDIO_WRONG.src = "/assets/audio/wrong.mp3";

  if(answers.length === 10) {
    changeAnswersArray(answers);
    changePageState('congratulation');
  }


  const makeAnswersArray = (rightAnswer:boolean, playerAnswer:boolean) => {
    if (rightAnswer === playerAnswer) {
      const ANSWER_STATE = { isAnwserTrue: true };
      const ANWSER_WORD = { ...word, ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD)
      setAnswers(NEW_ARR)
      AUDIO_RIGHT.play();
    } else {
      const ANSWER_STATE = { isAnwserTrue: false };
      const ANWSER_WORD = { ...word, ...ANSWER_STATE };
      const NEW_ARR = answers.slice();
      NEW_ARR.push(ANWSER_WORD)
      setAnswers(NEW_ARR)
      AUDIO_WRONG.play();
    }
  };

  const changeScore = (answer:boolean, playerAnswer: boolean) => {
    let newScore = score + 100;
    if(answer === playerAnswer) {
      setScore(newScore)
    }
  }

console.log(rightAnswer)
  
  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/png/sprint_girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'>
          <div className='game-sprint-block__timer'>{ seconds }</div> 
          <div className='game-sprint-block__level-up'></div> 
          <div className='game-sprint-block__score'>{ score }</div> 
        </div>
        <div className='game-sprint-block__quastion'>
          <div className='game-sprint-block__english-word'>
            '{word.word.toUpperCase()}'
          </div>
          <div className='game-sprint-block__russian-word'>{answer}</div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            id = 'wrong'
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={(e) => {
              let el = e.target as HTMLElement;
             if (el.id === 'wrong') {
              changeScore(rightAnswer as boolean, false)
              makeAnswersArray(rightAnswer as boolean, false)
              changeWordCount();
              makeRandomAnswer();
             }
            }}
            
          >
            Неверно
          </button>
          <button
            id = 'right'
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={(e) => {
              let el = e.target as HTMLElement;
               if (el.id === 'right') {
              changeScore(rightAnswer as boolean, true)
              makeAnswersArray(rightAnswer as boolean, true)
              changeWordCount();
              makeRandomAnswer();
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

