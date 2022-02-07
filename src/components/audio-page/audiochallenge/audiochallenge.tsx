import { useState } from "react";
import ReactDOM from "react-dom";
import "./audiochallenge.css";
import Header from "../../header/header";

import {
  AUDIO_ANSWER_TIME,
  AUDIO_LIVES_AMOUNT,
  AUDIO_EMPTY_WORD,
  AUDIO_QUESTIONS_ARRAY,
  // AUDIO_CURRENT_GAME_PARAMETERS,
} from "../../../const/const-audio";
import {
  IAudioQuestion,
  IWord,
  IAudioResult,
} from "../../../interface/interface-audio";
import { AudioQuestion } from "../audio-question/audio-question";
import { Result } from "../audio-result/audio-result";
import { AudioLives } from "../audio-lives/audio-lives";

interface IProps {
  // arrQuestions: Array<IAudioQuestion>;
  audioGroup: number;
  audioPage: number;
  isGameOn: boolean;
  changeState: (
    group: number,
    page: number,
    isOn: boolean
    //  isRepeat: boolean
  ) => void;
}

export function Audiochallenge(props: IProps) {
  //console.log("Audiochallenge");
  //const { arrQuestions } = props;
  const { audioGroup, audioPage, isGameOn, changeState } = props;

  const [showResult, setShowResult] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [rightAnswer, setRightAnswer] = useState(false);
  const [answerReceived, setAnswerReceived] = useState(false);

  const [questionsAnswered, setQuestionsAnswered] = useState(
    Array(AUDIO_QUESTIONS_ARRAY.length).fill(false)
  );
  const [lives, setLives] = useState(AUDIO_LIVES_AMOUNT);

  const initialStateResult: Array<IAudioResult> = [];
  const [gameResult, setGameResult] = useState(initialStateResult);

  const questionsAmount = AUDIO_QUESTIONS_ARRAY.length;

  const paramQuestion = {
    questionWord: AUDIO_QUESTIONS_ARRAY[currentQuestion].questionWord,
    answers: AUDIO_QUESTIONS_ARRAY[currentQuestion].answers,
    rightAnswer: rightAnswer,
    answerReceived: answerReceived,
    onClick: afterAnswer,
    onClickNext: nextQuestion,
  };

  let timerId: ReturnType<typeof setTimeout> = setTimeout(() => "", 1000);

  if (!answerReceived && !showResult) {
    timerId = setTimeout(() => {
      answerNorReceived();
      clearTimeout(timerId);
    }, AUDIO_ANSWER_TIME);
  }

  function answerNorReceived(): void {
    afterAnswer(AUDIO_EMPTY_WORD, paramQuestion.questionWord);
  }

  function afterAnswer(answer: IWord, correctAnswer: IWord): void {
    if (timerId) {
      clearTimeout(timerId);
    }
    setAnswerReceived(true);
    //console.log();
    if (answer === correctAnswer) {
      setRightAnswer(true);
    } else {
      setLives(lives - 1);
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
      setRightAnswer(false);
      setAnswerReceived(false);
      setCurrentQuestion(nextQuestion);
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

  return (
    <div className="container">
      <h1>Audio Challenge</h1>
      <div className="game__section">
        <div className="game__wrapper vertical">
          {showResult ? (
            <div className="game__wrapper horizontal">
              <div className="game__finish-image"></div>
              <div className="game__wrapper vertical">
                <div className="game__wrapper horizontal">
                  <button
                    className="btn btn-repeate"
                    onClick={() => {
                      changeState(audioGroup, audioPage, true);
                      setQuestionsAnswered(
                        Array(AUDIO_QUESTIONS_ARRAY.length).fill(false)
                      );
                    }}
                  >
                    Повторить игру
                  </button>
                  <button
                    className="btn btn-repeate"
                    onClick={() => {
                      changeState(audioGroup, audioPage, false);
                      setQuestionsAnswered(
                        Array(AUDIO_QUESTIONS_ARRAY.length).fill(false)
                      );
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
