import React, { useState } from "react";
import { IWord, IResult } from "./project-interfaces";
import { PATH_DATA_AUDIO } from "./constants-audiochallenge";

interface IProps {
  gameResult: Array<IResult>;
}

export function Result(props: IProps) {
  const { gameResult } = props;
  console.log(gameResult);

  const audio = new Audio();
  audio.volume = 0.2;

  function playAudio(word: IWord) {
    const path = `${PATH_DATA_AUDIO}${word.audio}`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  return (
    <div className="result__section">
      <ul className="result">
        {gameResult.map((item) => {
          const question = item.questionWord;
          return (
            <li key={question.id} className="result__line">
              <div
                className={
                  item.isAnswerCorrect
                    ? "result__icon icon-correct"
                    : "result__icon icon-incorrect"
                }
              ></div>
              <button
                className="btn-audio result__audio"
                onClick={() => playAudio(question)}
              ></button>
              <span className="result__word">{question.word}: </span>
              <span className="result__translation">
                {question.transcription}
              </span>{" "}
              -
              <span className="result__translation">
                {question.wordTranslate}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
