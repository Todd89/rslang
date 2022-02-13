const WordCard:React.FC = () => {
  return (
    <article className="word-card">

      <div>
        <img 
            src="https://vismmax-rslang.herokuapp.com/files/02_1221.jpg" 
            alt="agreement"
            width="390"
            height="260"
        />
      </div>
      
      <ul className="word-card__word-list">
        <li>
          agreement
        </li>
        <li>
          [əgríːmənt]
        </li>
        <li>
          соглашение
        </li>
      </ul>

      <ul>
        <li>
          An agreement is a formal decision about future action.
        </li>
        <li>
          Соглашение - это формальное решение о будущих действиях
        </li>
      </ul>

      <ul>
        <li>
          I think you’ll get Tom’s agreement to this proposal.
        </li>
        <li>
          Я думаю, что вы получите согласие Тома на это предложение
        </li>
      </ul>
      
      <button>Включить аудио</button>

      {/* only authorized */}
      {/* <button>Отметить как сложное</button>
      <button>Отметить как изученное</button> */}
    </article>
  );
}

export default WordCard;