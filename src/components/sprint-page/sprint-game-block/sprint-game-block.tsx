import "./sprint-game-block.css";
import { randomNum } from "../sprint-methods/sprint-methods";
import { IGameBlockProps, IWordInAnswerArray } from "../../../interface/interface";
import { useState } from 'react';

const GameBlock: React.FC<IGameBlockProps> = ({
  word,
  changeWordCount,
  wordsInGame,
  changePageState,
  changeAnswersArray
}) => {
  let answer = "";
  let rightAnswer: boolean;
  const [answers, setAnswers] = useState<Array<IWordInAnswerArray>>([])
  const AUDIO_RIGHT = new Audio();
  AUDIO_RIGHT.src = "/assets/audio/right.mp3";

  const AUDIO_WRONG = new Audio();
  AUDIO_WRONG.src = "/assets/audio/wrong.mp3";

  if(answers.length === 10) {
    changeAnswersArray(answers);
    changePageState('congratulation');
  }

  const makeRandomAnswer = () => {
    const VALUE = randomNum(9);
    if (VALUE < 6) {
      answer = word.wordTranslate.toUpperCase();
      rightAnswer = true;
    } else {
      const WRONG_NUM = randomNum(59);
      if (wordsInGame[WRONG_NUM].wordTranslate !== word.wordTranslate) {
        answer = wordsInGame[WRONG_NUM].wordTranslate.toUpperCase();
        rightAnswer = false;
      }
    }
  };

  const makeAnswersArray = (rightAnswer:boolean) => {
    if (!rightAnswer) {
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
  }

  makeRandomAnswer();
  console.log(answers)

  return (
    <div>
      <div className='girl-image'>
        <img src='/assets/images/png/sprint_girl.png' alt='девочка' />
      </div>
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'></div>
        <div className='game-sprint-block__quastion'>
          <div className='game-sprint-block__english-word'>
            '{word.word.toUpperCase()}'
          </div>
          <div className='game-sprint-block__russian-word'>{answer}</div>
        </div>
        <div className='game-sprint-block__buttons-block'>
          <button
            className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={() => {
              makeAnswersArray(rightAnswer)
              changeWordCount();
            }}
          >
            Неверно
          </button>
          <button
            className='game-sprint-block__button game-sprint-block__button_right'
            onClick={() => {
              makeAnswersArray(rightAnswer)
              changeWordCount();
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
