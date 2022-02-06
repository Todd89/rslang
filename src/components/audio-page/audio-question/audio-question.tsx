import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  AUDIO_PATH_DATA_AUDIO,
  AUDIO_PATH_UTILS_AUDIO,
  AUDIO_PATH_IMAGES,
} from "../../../const/const-audio";

import { IWord, IQuestion } from "../../../interface/interface-audio";

import { Answer } from "./answer";
import { render } from "@testing-library/react";

interface IProps {
  questionWord: IWord;
  answers: Array<IWord>;
  rightAnswer: boolean;
  answerReceived: boolean;
  onClick: (answer: IWord, correctAnswer: IWord) => void;
  onClickNext: () => void;
}

export function Question(props: IProps) {
  const {
    questionWord,
    answers,
    rightAnswer,
    answerReceived,
    onClick,
    onClickNext,
  } = props;
  const audio = new Audio();
  audio.volume = 0.2;

  function playAudio(word: IWord) {
    const path = `${PATH_DATA_AUDIO}${word.audio}`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  function playAudioAfterAnswer(isCorrectAnswer: boolean) {
    const path = isCorrectAnswer
      ? `${PATH_UTILS_AUDIO}right.mp3`
      : `${PATH_UTILS_AUDIO}wrong.mp3`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  useEffect(() => {
    if (!answerReceived) {
      playAudio(questionWord);
    }
  });

  useEffect(() => {
    if (answerReceived && rightAnswer) {
      playAudioAfterAnswer(true);
    } else if (answerReceived && !rightAnswer) {
      playAudioAfterAnswer(false);
    }
  });

  if (answerReceived) {
    const style = {
      backgroundImage: `url('${PATH_IMAGES}${questionWord.image}')`,
    };
    return (
      <div className="question__section">
        <div
          key={Math.random()}
          className="question__image question__answered"
          style={style}
        ></div>
        <span className="questionText">
          {questionWord.word} - {questionWord.transcription} -{" "}
          {questionWord.wordTranslate}
        </span>
        <button className="btn btn__next" onClick={onClickNext}>
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
          {answers.map((item) => {
            const paramAnswer = {
              questionWord: questionWord,
              word: item,
              onClick: onClick,
            };
            return <Answer key={item.id} {...paramAnswer} />;
          })}
        </div>
      </div>
    );
  }
}
