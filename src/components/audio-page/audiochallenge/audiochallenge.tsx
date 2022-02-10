import { useEffect, useState, useRef } from "react";
import "./audiochallenge.css";

import {
  AUDIO_ANSWER_TIME,
  AUDIO_LIVES_AMOUNT,
  AUDIO_EMPTY_WORD,
  AUDIO_QUESTIONS_ARRAY,
} from "../../../const/const-audio";
import {
  IWordAudio,
  IAudioResult,
  IUserWord,
} from "../../../interface/interface-audio";
import { AudioQuestion } from "../audio-question/audio-question";
import { Result } from "../audio-result/audio-result";
import { AudioLives } from "../audio-lives/audio-lives";

interface IProps {
  changeState: (isOn: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
}

export function Audiochallenge(props: IProps) {
  //User functions
  const userAuthorized = true; //заменить на state из Appa
  const userId = "user";
  const initialUserWords: Array<IUserWord> = []; //заменить на получение информации с сервера
  const [userWords, setUserWords] = useState(initialUserWords);

  //User functions

  const { changeState, changeGameLoadedStatus } = props;

  const [showResult, setShowResult] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [rightAnswer, setRightAnswer] = useState(false);
  const [answerReceived, setAnswerReceived] = useState(false);
  const [isTimerOn, setIsTimerOn] = useState(false);

  const [questionsAnswered, setQuestionsAnswered] = useState(
    Array(AUDIO_QUESTIONS_ARRAY.length).fill(false)
  );
  const [lives, setLives] = useState(AUDIO_LIVES_AMOUNT);

  const initialStateResult: Array<IAudioResult> = [];
  const [gameResult, setGameResult] = useState(initialStateResult);

  const timerId: { current: NodeJS.Timeout | null } = useRef(null);

  const questionsAmount = AUDIO_QUESTIONS_ARRAY.length;

  const questionWord = AUDIO_QUESTIONS_ARRAY[currentQuestion].questionWord;

  function resetParameters(isOn: boolean, isLoad: boolean) {
    changeState(isOn);
    changeGameLoadedStatus(isLoad);
    setShowResult(false);
    setCurrentQuestion(0);
    setRightAnswer(false);
    setAnswerReceived(false);
    setIsTimerOn(false);
    setQuestionsAnswered(Array(AUDIO_QUESTIONS_ARRAY.length).fill(false));
    setLives(AUDIO_LIVES_AMOUNT);
    setGameResult(initialStateResult);
  }

  useEffect(() => {
    if (!answerReceived && !showResult && !isTimerOn) {
      setIsTimerOn(true);
      timerId.current = setTimeout(() => {
        if (timerId.current) {
          answerNorReceived();
          setIsTimerOn(false);
          return clearTimeout(timerId.current);
        }
      }, AUDIO_ANSWER_TIME);
    }
  }, [answerReceived, showResult, isTimerOn, rightAnswer, answerNorReceived]);

  function answerNorReceived(): void {
    setAnswerReceived(true);
    afterAnswer(AUDIO_EMPTY_WORD, questionWord);
  }

  function afterAnswer(answer: IWordAudio, correctAnswer: IWordAudio): void {
    setAnswerReceived(true);
    if (answer === correctAnswer) {
      setRightAnswer(true);
    } else {
      setLives(lives - 1);
    }
    if (timerId.current) {
      clearTimeout(timerId.current);
      setIsTimerOn(false);
    }
    setQuestionsAnswered(() => {
      return questionsAnswered.map((item, index) =>
        index === currentQuestion ? answer === correctAnswer : item
      );
    });
  }

  function nextQuestion(): void {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questionsAmount && lives > 0) {
      setCurrentQuestion(nextQuestion);
      setAnswerReceived(false);
      setRightAnswer(false);
    } else {
      const arrResult = AUDIO_QUESTIONS_ARRAY.map((item, index) => {
        return {
          questionWord: item.questionWord,
          isAnswerCorrect: questionsAnswered[index],
        };
      });
      setGameResult(arrResult);
      setShowResult(true);
    }
  }

  const paramQuestion = {
    questionWord: questionWord,
    answers: AUDIO_QUESTIONS_ARRAY[currentQuestion].answers,
    rightAnswer: rightAnswer,
    answerReceived: answerReceived,
    onClick: afterAnswer,
    onClickNext: nextQuestion,
    isTimerOn: isTimerOn,
  };

  useEffect(() => {
    const checkAnswer = (event: KeyboardEvent) => {
      if (event.key === "1") {
        return afterAnswer(paramQuestion.answers[0], questionWord);
      }
      if (event.key === "2") {
        return afterAnswer(paramQuestion.answers[1], questionWord);
      }
      if (event.key === "3") {
        return afterAnswer(paramQuestion.answers[2], questionWord);
      }
      if (event.key === "4") {
        return afterAnswer(paramQuestion.answers[3], questionWord);
      }
      if (event.key === "ArrowRight") {
        if (answerReceived) {
          return nextQuestion();
        }
      }
    };

    document.addEventListener("keydown", checkAnswer, false);

    return () => {
      document.removeEventListener("keydown", checkAnswer, false);
    };
  });

  return (
    <div className="container">
      <div className="game__section">
        <div className="game__wrapper vertical">
          {showResult ? (
            <div className="game__wrapper horizontal">
              <div className="game__finish-image"></div>
              <div className="game__wrapper vertical">
                <div className="game__wrapper horizontal">
                  <button
                    className="btn btn-repeate"
                    id="btn-repeate"
                    onClick={() => {
                      resetParameters(true, true);
                    }}
                  >
                    Повторить эту же игру
                  </button>
                  <button
                    className="btn btn-repeate"
                    id="btn-repeate"
                    onClick={() => {
                      resetParameters(true, false);
                    }}
                  >
                    Новая игра с выбором уровней
                  </button>
                </div>
                <Result gameResult={gameResult} />
              </div>
            </div>
          ) : (
            <div className="game__wrapper horizontal">
              <div className="game__left-image"></div>
              <div className="game__wrapper vertical">
                <AudioLives amount={lives} />
                <div className="game__container">
                  <AudioQuestion {...paramQuestion} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
