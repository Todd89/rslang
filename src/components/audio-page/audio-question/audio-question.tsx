import { useEffect } from "react";
import "./audio-question.css";

import {
  AUDIO_PATH_DATA_AUDIO,
  AUDIO_PATH_UTILS_AUDIO,
  AUDIO_PATH_IMAGES,
} from "../../../const/const-audio";

import { IWordAudio } from "../../../interface/interface-audio";

import { AudioAnswer } from "../audio-answer/audio-answer";

interface IProps {
  questionWord: IWordAudio;
  answers: Array<IWordAudio>;
  rightAnswer: boolean;
  answerReceived: boolean;
  onClick: (answer: IWordAudio, correctAnswer: IWordAudio) => void;
  onClickNext: () => void;
  isTimerOn: boolean;
}

export function AudioQuestion(props: IProps) {
  const {
    questionWord,
    answers,
    rightAnswer,
    answerReceived,
    onClick,
    onClickNext,
    isTimerOn,
  } = props;
  const audio = new Audio();
  audio.volume = 0.2;

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.2;
    function playAudio(word: IWordAudio) {
      const path = `${AUDIO_PATH_DATA_AUDIO}${word.audio}`;

      audio.src = path;
      audio.load();
      setTimeout(() => {
        audio.play();
      }, 500);
    }
    if (!answerReceived && isTimerOn) {
      playAudio(questionWord);
    }
  }, [answerReceived, isTimerOn, questionWord]);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.2;

    function playAudioAfterAnswer(isCorrectAnswer: boolean) {
      const path = isCorrectAnswer
        ? `${AUDIO_PATH_UTILS_AUDIO}right.mp3`
        : `${AUDIO_PATH_UTILS_AUDIO}wrong.mp3`;

      audio.src = path;
      audio.load();
      audio.play();
    }

    if (answerReceived && rightAnswer && !isTimerOn) {
      playAudioAfterAnswer(true);
    } else if (answerReceived && !rightAnswer && !isTimerOn) {
      playAudioAfterAnswer(false);
    }
  }, [answerReceived, rightAnswer, isTimerOn]);

  if (answerReceived) {
    const style = {
      backgroundImage: `url('${AUDIO_PATH_IMAGES}${questionWord.image}')`,
    };
    return (
      <div className="question__section">
        <div className="question__image question__answered" style={style}></div>
        <span className="questionText">
          {questionWord.word} - {questionWord.transcription} -{" "}
          {questionWord.wordTranslate}
        </span>
        <button className="btn" id="btn__next" onClick={onClickNext}>
          Следующий
        </button>
      </div>
    );
  } else {
    return (
      <div className="question__section">
        <div
          key={Math.random()}
          className="question__image question__unanswered animation"
        ></div>
        <div className="answers__section">
          {answers.map((item, index) => {
            const paramAnswer = {
              questionWord: questionWord,
              word: item,
              onClick: onClick,
            };
            return (
              <AudioAnswer
                key={Math.random()}
                id={String(index)}
                {...paramAnswer}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
