import { useEffect, useState, useRef } from "react";
import "./audiochallenge.css";

import {
  AUDIO_ANSWER_TIME,
  AUDIO_LIVES_AMOUNT,
  AUDIO_EMPTY_WORD,
  AUDIO_QUESTIONS_ARRAY,
  AUDIO_BEST_SERIES,
  AUDIO_STAT,
  AUDIO,
} from "../../../const/const-audio";
import { IWordAudio, IAudioResult } from "../../../interface/interface-audio";
import { AudioQuestion } from "../audio-question/audio-question";
import { Result } from "../audio-result/audio-result";
import { AudioLives } from "../audio-lives/audio-lives";
import {
  createUpdateUserWord,
  getPutAudioUserStatistic,
  getUserWords,
  getUserWordsForTheGame,
} from "../audio-utils/audio-utils";

//user
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../../store/data/selectors";

//user

import { useLocation } from "react-router";
import { LocationState } from "../../../interface/interface";

interface IProps {
  changeState: (isOn: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
}

export function Audiochallenge(props: IProps) {
  const { changeState, changeGameLoadedStatus } = props;
  const isLoadFromTextBook = false;

  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);

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
  const [currentSeries, setCurrentSeries] = useState(0);

  const timerId: { current: NodeJS.Timeout | null } = useRef(null);

  const questionsAmount = AUDIO_QUESTIONS_ARRAY.length;

  const questionWord = AUDIO_QUESTIONS_ARRAY[currentQuestion].questionWord;
  const location = useLocation<LocationState>();

  async function resetParameters(isOn: boolean, isLoad: boolean) {
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
    setCurrentSeries(0);
    AUDIO_BEST_SERIES[0] = 0;

    if (!isLoad) {
      location.state = {
        hash: "",
        key: "",
        pathname: "",
        search: "",
      };
    }

    if (userAuthorized) {
      AUDIO_STAT.forEach((item) => {
        item.learned = false;
        item.new = false;
      });
      await getUserWords(userAuthData, isLoadFromTextBook);
      await getUserWordsForTheGame(userAuthorized, userAuthData);
    }

    AUDIO.pause();
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
      if (userAuthorized) {
        setCurrentSeries((currentSeries) => currentSeries + 1);
      }
    } else {
      setLives(lives - 1);
      if (userAuthorized) {
        AUDIO_BEST_SERIES[0] = Math.max(AUDIO_BEST_SERIES[0], currentSeries);
        setCurrentSeries(0);
      }
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
      if (userAuthorized) {
        AUDIO_BEST_SERIES[0] = Math.max(AUDIO_BEST_SERIES[0], currentSeries);
        const gameStatistic = {
          gameLearnedWords: AUDIO_STAT.reduce((sum, item) => {
            return item.learned ? sum + 1 : sum;
          }, 0),
          gameBestSeries: AUDIO_BEST_SERIES[0],
          gameSuccessCounter: questionsAnswered.reduce((sum, item) => {
            return item ? sum + 1 : sum;
          }, 0),
          gameFailCounter: questionsAnswered.reduce((sum, item) => {
            return !item ? sum + 1 : sum;
          }, 0),
          gameNewWords: AUDIO_STAT.reduce((sum, item) => {
            return item.new ? sum + 1 : sum;
          }, 0),
        };
        getPutAudioUserStatistic(userAuthData, gameStatistic);
      }
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
    if (answerReceived && userAuthorized && !showResult && !isTimerOn) {
      createUpdateUserWord(
        paramQuestion.questionWord,
        rightAnswer,
        userAuthData
      );
    }
  });

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
              <div className="game__left-image">
                <img
                  className="game__left-img"
                  src="assets/images/girl-thinking.png"
                  alt=""
                />
              </div>
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
