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
import { useDispatch, useSelector } from "react-redux";
import { addTextbookState } from "../../store/action";
import { getTextbookState } from "../../store/data/selectors";


const TextBook: React.FC = () => {
  const [words, setWords] = useState<WordData[] | null>(null);
  const dispatch = useDispatch();
  let {group, page} = useSelector(getTextbookState);

  useEffect(() => {
    const getWords = async () => {
      const pageIndex = String(page);
      const groupIndex = String(group);

      const data = await httpClient.getChunkOfWords(pageIndex, groupIndex);
      setWords(data);
    }
    getWords();
  }, [group, page])

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
                    state: { group, page },
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
                    state: { group, page },
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
                      id={`textbook-${id}`} 
                      type="radio" 
                      defaultChecked={id === group}
                  />
                  <label 
                      className={labelClass}
                      htmlFor={`textbook-${id}`}
                      onClick={() => dispatch(addTextbookState({group: id}))} 
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
                currentPage={page || 1}
                totalCount={PaginationData.TOTAL_COUNT}
                siblingCount={PaginationData.SIBLING_COUNT}
                pageSize={PaginationData.PAGE_SIZE} 
                onPageChange={(currPage: number) => dispatch(addTextbookState({page: currPage}))}
            />
          }

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TextBook;