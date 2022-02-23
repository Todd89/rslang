import { WordContentComponent } from "../../../../interface/interface";
import { createMarkup } from "../../../../utils/utils";

const WordContent: React.FC<WordContentComponent> = ({
  word,
  transcription,
  wordTranslate,
  textExample,
  textExampleTranslate,
  textMeaning,
  textMeaningTranslate,
  audio,
  audioMeaning,
  audioExample,
  isPlayAudio,
  playAudioHandler,
}) => {
  return (
    <>
      <ul className="word-card__word-list">
        <li className="word-card__word-item">
          <span className="word-card__target-word">{word}</span>
        </li>

        <li className="word-card__word-item">
          <span className="word-card__transcription">{transcription}</span>
        </li>

        <li className="word-card__word-item word-card__word-item--btn">
          <span className="word-card__translation">{wordTranslate}</span>
          <button
            className="word-card__audio-btn"
            disabled={isPlayAudio}
            onClick={() =>
              playAudioHandler([audio, audioMeaning, audioExample])
            }
          >
            <span className="visually-hidden">Включить аудио</span>
            <svg className="word-card__audio-icon" width="28" height="28">
              <use xlinkHref="#audio-icon"></use>
            </svg>
          </button>
        </li>
      </ul>

      <ul className="word-card__explanation">
        <li className="word-card__explanation-item">
          <p
            className="word-card__explanation-en"
            dangerouslySetInnerHTML={createMarkup(textMeaning)}
          />
        </li>
        <li className="word-card__explanation-item">
          <p
            className="word-card__explanation-ru"
            dangerouslySetInnerHTML={createMarkup(textMeaningTranslate)}
          />
        </li>
      </ul>

      <ul className="word-card__example">
        <li className="word-card__example-item">
          <p
            className="word-card__example-en"
            dangerouslySetInnerHTML={createMarkup(textExample)}
          />
        </li>
        <li className="word-card__example-item">
          <p
            className="word-card__example-ru"
            dangerouslySetInnerHTML={createMarkup(textExampleTranslate)}
          />
        </li>
      </ul>
    </>
  );
};

export default WordContent;
