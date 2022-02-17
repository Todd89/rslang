import Header from "../header/header";
import { Link } from "react-router-dom";
import { AppRoute, PaginationData, textbookSections } from "../../const/const";
import WordCard from "./word-card/word-card";
import Footer from "../footer/footer";
import Pagination from "./pagination/pagination";
import { useState, useEffect } from "react";
import httpClient from "../../services/http-client";
import LoadingScreen from "../loading-screen/loading-screen";
import { WordData } from "../../interface/interface";

const TextBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeGroup, setActiveGroup] = useState<number>(1);
  const [words, setWords] = useState<WordData[] | null>(null)

  useEffect(() => {
    const getWords = async () => {
      const pageIndex = (currentPage - 1).toString();
      const groupIndex = (activeGroup - 1).toString();

      const data = await httpClient.getChunkOfWords(pageIndex, groupIndex);
      setWords(data);
    }
    getWords();
  }, [currentPage, activeGroup])

  return (
    <>
      <Header />

      <main className="textbook is-auth">
        <div className="textbook__wrapper container">
          <h1 className="textbook__title visually-hidden">Учебник</h1>

          <aside className="game-link">
            <h2 className="game-link__title">Изучите слова в мини-играх</h2>
            <ul className="game-link__list">
              <li className="game-link__item">
                <Link 
                  className="game-link__link" 
                  to={{
                    pathname: AppRoute.SPRINT,
                    state: {
                      words
                    },
                  }}
                >
                  Спринт
                </Link>
              </li>
  
              <li className="game-link__item">
                <Link 
                  className="game-link__link"
                  to={{
                    pathname: AppRoute.AUDIO_CHALLENGE,
                    state: {
                      words
                    },
                  }}
                >
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
              {textbookSections.map(({name, labelClass, id}) => (
                <li key={id} className="textbook-nav__item">            
                  <input 
                      className="textbook-nav__control visually-hidden"
                      name="word-sections" 
                      id={`textbook-${name}`} 
                      type="radio" 
                      defaultChecked={name === activeGroup}
                  />
                  <label 
                      className={labelClass}
                      htmlFor={`textbook-${name}`}
                      onClick={() => setActiveGroup(id)} 
                  >
                    Часть {name}
                  </label>
                </li>
              ))}
            </ol>
          </section>

          {
            !words && 
            <LoadingScreen />
          }

          {
            words && 
            <section className="textbook__words">
              <ul className="textbook__words-list">
                {words.map((data) => (
                  <li className="textbook__words-item" key={data.id}>
                    <WordCard 
                      {...data}
                    />
                  </li>
                ))}
              </ul>
            </section>
          }
          
          {
            words && 
            <Pagination
                currentPage={currentPage}
                totalCount={PaginationData.TOTAL_COUNT}
                siblingCount={PaginationData.SIBLING_COUNT}
                pageSize={PaginationData.PAGE_SIZE} 
                onPageChange={(page: number) => setCurrentPage(page)}
            />
          }

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TextBook;