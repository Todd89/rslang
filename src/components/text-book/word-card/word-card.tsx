import { Url } from "../../../const/const";
import { WordData } from "../../../interface/interface";


const createMarkup = (textExample: string) => {
  return {__html: textExample};
}

const WordCard:React.FC<WordData> = ({
  word,
  image,
  textExample,
  textExampleTranslate,
  textMeaning,
  textMeaningTranslate,
  transcription,
  wordTranslate,
}) => {

  return (
    <article className="word-card">

      <div className="word-card__image-wrapper">
        <img 
            src={`${Url.DOMEN}/${image}`} 
            alt="agreement"
            width="390"
            height="260"
        />
      </div>
      
      <ul className="word-card__word-list">
        <li className="word-card__word-item">
          <span className="word-card__target-word">
            {word}
          </span> 
        </li>
        <li className="word-card__word-item">
          <span className="word-card__transcription">
            {transcription}
          </span> 
        </li>
        <li className="word-card__word-item word-card__word-item--btn">
          <span className="word-card__translation">
            {wordTranslate}
          </span> 

          <button className="word-card__audio-btn">
            <span className="visually-hidden">
              Включить аудио
            </span>
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

      <div className="word-card__auth-buttons">
        <button className="word-card__complex-btn">
          <svg className="word-card__complex-icon" width="11" height="24">
            <use xlinkHref="#flash-icon"></use>
          </svg>
          <span>Cложное</span> 
        </button>
        <button className="word-card__check-btn">
          <svg className="word-card__check-icon" width="22" height="16">
            <use xlinkHref="#check-icon"></use>
          </svg>
          <span>Изученное</span> 
        </button>
      </div>
      
    </article>
  );
}

export default WordCard;