const WordCard:React.FC = () => {
  return (
    <article className="word-card">

      <div className="word-card__image-wrapper">
        <img 
            src="https://vismmax-rslang.herokuapp.com/files/02_1221.jpg" 
            alt="agreement"
            width="390"
            height="260"
        />
      </div>
      
      <ul className="word-card__word-list">
        <li className="word-card__word-item">
          <span className="word-card__target-word">
            biodegradable
          </span> 
        </li>
        <li className="word-card__word-item">
          <span className="word-card__transcription">
            [əgríːmənt]
          </span> 
        </li>
        <li className="word-card__word-item word-card__word-item--btn">
          <span className="word-card__translation">
            соглашение
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
          <p className="word-card__explanation-en">
            An agreement is a formal decision about future action.
          </p>
        </li>
        <li className="word-card__explanation-item">
          <p className="word-card__explanation-ru">
            Соглашение - это формальное решение о будущих действиях
          </p>
        </li>
      </ul>

      <ul className="word-card__example">
        <li className="word-card__example-item">
          <p className="word-card__example-en">
            I think you’ll get Tom’s agreement to this proposal.
          </p>
        </li>
        <li className="word-card__example-item">
          <p className="word-card__example-ru">
            Я думаю, что вы получите согласие Тома на это предложение          
          </p>
        </li>
      </ul>

      {/* only authorized */}
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