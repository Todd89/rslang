import Header from "../header/header";
import { Link } from "react-router-dom";
import { AppRoute, PaginationData } from "../../const/const";
import WordCard from "./word-card/word-card";
import Footer from "../footer/footer";
import Pagination from "./pagination/pagination";
import { useState } from "react";


const sections = [
  { 
    name: 1, 
  }, 
  { name: 2 }, 
  { name: 3 }, 
  { name: 4 }, 
  { name: 5 }, 
  { name: 6 }, 
  { name: "7 - Сложные слова" }, 
];

const TextBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <Header />

      <main className="textbook">
        <div className="textbook__wrapper container">
          <h1 className="textbook__title visually-hidden">Учебник</h1>

          <aside className="game-link">
            <h2 className="game-link__title">Изучите слова в мини-играх</h2>
            <ul className="game-link__list">
              <li className="game-link__item">
                <Link className="game-link__link" to={AppRoute.SPRINT}>
                  Спринт
                </Link>
              </li>
  
              <li className="game-link__item">
                <Link className="game-link__link" to={AppRoute.AUDIO_CHALLENGE}>
                  Аудиовызов
                </Link>
              </li>
            </ul>
          </aside>


          <section className="textbook-nav">
            <h2 className="textbook-nav__title">
              Разделы учебника
            </h2>
            <ol className="textbook__textbook-nav textbook-nav__list">
              {sections.map(({name}) => (
                <li key={name} className="textbook-nav__item">            
                  <input 
                      className="textbook-nav__control visually-hidden"
                      name="word-sections" 
                      id={`textbook-${name}`} 
                      type="radio" 
                      defaultChecked={name === 1}
                  />
                  <label htmlFor={`textbook-${name}`} className="textbook-nav__label">
                    Часть {name}
                  </label>
                </li>
              ))}
            </ol>
          </section>

          <section className="textbook__words">
            <ul className="textbook__words-list">
              <li className="textbook__words-item">
                <WordCard />
              </li>
              <li className="textbook__words-item">
                <WordCard />
              </li>
              <li className="textbook__words-item">
                <WordCard />
              </li>
            </ul>
          </section>
          
          <Pagination
              currentPage={currentPage}
              totalCount={PaginationData.TOTAL_COUNT}
              siblingCount={PaginationData.SIBLING_COUNT}
              pageSize={PaginationData.PAGE_SIZE} 
              onPageChange={(page: number) => setCurrentPage(page)}
          />

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TextBook;