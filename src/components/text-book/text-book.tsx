import Header from "../header/header";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const/const";
import WordCard from "./word-card/word-card";


const sections = [
  { name: 1 }, 
  { name: 2 }, 
  { name: 3 }, 
  { name: 4 }, 
  { name: 5 }, 
  { name: 6 }, 
  { name: 7 }, 
];

const TextBook: React.FC = () => {
  return (
    <>
      <Header />

      <main className="textbook">
        <div className="textbook__wrapper container">
          <h1 className="textbook__title visually-hidden">Учебник</h1>

          <section className="game-link">
            <h2 className="game-link__title">Изучите слова в мини-играх</h2>
            <ul className="game-link__list">
              <li>
                <Link to={AppRoute.SPRINT}>Спринт</Link>
              </li>
  
              <li>
                <Link to={AppRoute.AUDIO_CHALLENGE}>Аудиовызов</Link>
              </li>
            </ul>
          </section>


          <section className="textbook-sections">
            <h2>Разделы</h2>
            <ul className="textbook__textbook-sections textbook-sections__list">
              {sections.map(({name}) => (
                <li key={name} className="textbook-sections__item">
                  <label htmlFor={`textbook-${name}`} className="textbook-sections__label">
                    {name}
                  </label>
                  <input 
                      className="textbook-sections__control" 
                      id={`textbook-${name}`} 
                      type="radio" 
                      checked={name === 1}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="words">
            <ul className="textbook__words words__list">
              <li className="words__item">
                <WordCard />
              </li>
            </ul>
          </section>
          

        </div>
      </main>
    </>
  );
}

export default TextBook;