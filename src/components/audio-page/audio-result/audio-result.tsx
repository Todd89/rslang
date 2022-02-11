import { useEffect } from "react";

import { IWordAudio, IAudioResult } from "../../../interface/interface-audio";

import {
  AUDIO_PATH_DATA_AUDIO,
  AUDIO_PATH_UTILS_AUDIO,
} from "../../../const/const-audio";
import "./audio-result.css";

interface IProps {
  gameResult: Array<IAudioResult>;
}

export function Result(props: IProps) {
  const { gameResult } = props;

  const audio = new Audio();
  audio.volume = 0.2;

  function playAudio(word: IWordAudio) {
    const path = `${AUDIO_PATH_DATA_AUDIO}${word.audio}`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  function playAudioResult() {
    const path = `${AUDIO_PATH_UTILS_AUDIO}end.mp3`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  useEffect(() => {
    playAudioResult();
  }, []);

  return (
    <div className="result__section">
      <ul className="result">
        {gameResult.map((item, index) => {
          const question = item.questionWord;
          return (
            <li key={index} className="result__line">
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
                {question.transcription} - {question.wordTranslate}
              </span>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
