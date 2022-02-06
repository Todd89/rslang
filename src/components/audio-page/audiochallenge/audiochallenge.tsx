import { useState } from "react";
import ReactDOM from "react-dom";
import "./audiochallenge.css";
import Header from "../../header/header";

import {
  AUDIO_ANSWER_TIME,
  AUDIO_LIVES_AMOUNT,
  AUDIO_EMPTY_WORD,
} from "../../../const/const-audio";
import {
  IAudioQuestion,
  IWord,
  IAudioResult,
} from "../../../interface/interface-audio";
import { Question } from "../audio-question/audio-question";
import { Result } from "../audio-result/audio-result";
import { AudioLives } from "../audio-lives/audio-lives";
import { createArrayOfQuestions } from "../audio-utils/audio-utils";

interface IProps {
  arrQuestions: Array<IAudioQuestion>;
}

export function game() {
  const arrQuestions = createArrayOfQuestions();
  console.log(arrQuestions);
  ReactDOM.render(
    <Audiochallenge key={Math.random()} arrQuestions={arrQuestions} />,
    document.getElementById("root")
  );
}

function Audiochallenge(props: IProps) {
  const { arrQuestions } = props;

  const [showResult, setShowResult] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [rightAnswer, setRightAnswer] = useState(false);
  const [answerReceived, setAnswerReceived] = useState(false);

  const [questionsAnswered, setQuestionsAnswered] = useState(
    Array(arrQuestions.length).fill(false)
  );
  const [lives, setLives] = useState(AUDIO_LIVES_AMOUNT);

  const initialStateResult: Array<IAudioResult> = [];
  const [gameResult, setGameResult] = useState(initialStateResult);

  const questionsAmount = arrQuestions.length;

  const paramQuestion = {
    questionWord: arrQuestions[currentQuestion].questionWord,
    answers: arrQuestions[currentQuestion].answers,
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
    console.log();
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
      const arrResult = arrQuestions.map((item, index) => {
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
    <>
      <main>
        <div className="container">
          <h1>Audio Challenge</h1>
          <div className="game__section">
            <div className="game__wrapper vertical">
              {showResult ? (
                <div className="game__wrapper horizontal">
                  <div className="game__finish-image"></div>
                  <div className="game__wrapper vertical">
                    <button className="btn btn-repeate" onClick={() => game()}>
                      Повторить игру
                    </button>
                    <Result gameResult={gameResult} />
                  </div>
                </div>
              ) : (
                <div className="game__wrapper horizontal">
                  <div className="game__left-image"></div>
                  <div className="game__wrapper vertical">
                    <AudioLives amount={lives} />

                    <div className="game__container">
                      <Question {...paramQuestion} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
