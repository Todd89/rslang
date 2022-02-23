import Header from "../header/header";
import { Link } from "react-router-dom";
import { AppRoute, PaginationData, textbookSections } from "../../const/const";
import WordCard from "./word-card/word-card";
import Footer from "../footer/footer";
import Pagination from "./pagination/pagination";
import { useState, useEffect } from "react";
import httpClient from "../../services/http-client";
import LoadingScreen from "../loading-screen/loading-screen";
import { WordData, IUserWord } from "../../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { addTextbookState } from "../../store/action";
import { getTextbookState, getUserAuthData } from "../../store/data/selectors";
import { Url } from "../../const/const";

const COMPLEX_GROUP_INDEX = 6;
const PAGE_START_INDEX = 0;
const PAGINATION_START_INDEX = 1;

const checkWord = (
  curWordId: string,
  userWords: IUserWord[]
): [boolean, boolean, boolean] => {
  const index = userWords.map(({ wordId }) => wordId).indexOf(curWordId);
  if (index === -1) {
    return [false, false, false];
  }
  const {
    difficulty,
    optional: { learned },
  } = userWords[index];
  const isDifficulty = difficulty === "true" ? true : false;
  return [isDifficulty, learned, true];
};

const TextBook: React.FC = () => {
  const [words, setWords] = useState<WordData[] | null>(null);
  const [userWords, setUserWords] = useState(null);
  const userAuthData = useSelector(getUserAuthData);
  const [audioPath, setAudioPath] = useState<string[]>([]);
  const [isPlayAudio, setIsPlayAudio] = useState(false);

  useEffect(() => {
    const startAudio = () => {
      const audio = new Audio();
      let idx = 0;

      const playAudio = () => {
        audio.src = `${Url.DOMEN}/${audioPath[idx]}`;
        audio.currentTime = 0;
        audio.play();
      };

      audio.addEventListener("ended", () => {
        if (idx !== audioPath.length - 1) {
          idx++;
          playAudio();
          return;
        }
        setIsPlayAudio(false);
      });

      playAudio();
    };

    if (isPlayAudio) {
      startAudio();
    }
  }, [isPlayAudio, audioPath]);

  const playAudioHandler = (paths: string[]) => {
    setAudioPath(paths);
    setIsPlayAudio(true);
  };

  const dispatch = useDispatch();
  const { group, page } = useSelector(getTextbookState);

  useEffect(() => {
    const getWords = async () => {
      const pageIndex = page ? String(page - 1) : String(PAGE_START_INDEX);
      const groupIndex = String(group);

      const data = await httpClient.getChunkOfWords(pageIndex, groupIndex);
      setWords(data);
    };

    const getDifficultWords = async () => {
      if (userAuthData && userAuthData.userId && userAuthData.token) {
        const { userId, token } = userAuthData;
        const data = await httpClient.getDifficultWords({ userId, token });
        const difficultWords = data[0]["paginatedResults"];
        console.log(difficultWords);
        const adaptedComplexWords = difficultWords.map((wordData: any) => {
          const adaptWordData = Object.assign({}, wordData, {
            id: wordData._id,
          });
          delete adaptWordData._id;
          return adaptWordData;
        });
        setWords(adaptedComplexWords);
      }
    };

    if (group === COMPLEX_GROUP_INDEX) {
      getDifficultWords();
    } else {
      getWords();
    }
  }, [group, page, userAuthData]);

  const getDifficultWordsE = async () => {
    if (group === COMPLEX_GROUP_INDEX) {
      if (userAuthData && userAuthData.userId && userAuthData.token) {
        const { userId, token } = userAuthData;
        const data = await httpClient.getDifficultWords({ userId, token });
        const difficultWords = data[0]["paginatedResults"];
        const adaptedComplexWords = difficultWords.map((wordData: any) => {
          const adaptWordData = Object.assign({}, wordData, {
            id: wordData._id,
          });
          delete adaptWordData._id;
          return adaptWordData;
        });
        setWords(adaptedComplexWords);
      }
    }
  };

  useEffect(() => {
    const getUserWord = async () => {
      if (userAuthData && userAuthData.userId && userAuthData.token) {
        const { userId, token } = userAuthData;
        const usedWords = await httpClient.getAllUserWords({ userId, token });
        setUserWords(usedWords);
      }
    };

    getUserWord();
  }, [userAuthData, group, page]);

  return (
    <>
      <Header />

      <main className={userAuthData ? "textbook is-auth" : "textbook"}>
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
            <h2 className="textbook-nav__title">Разделы учебника</h2>
            <ol className="textbook__textbook-nav textbook-nav__list">
              {textbookSections.map(({ name, labelClass, id }) => (
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
                    onClick={() => {
                      dispatch(addTextbookState({ group: id }));
                      dispatch(
                        addTextbookState({ page: PAGINATION_START_INDEX })
                      );
                    }}
                  >
                    Часть {name}
                  </label>
                </li>
              ))}
            </ol>
          </section>

          {(!words || !(!userAuthData || userWords)) && <LoadingScreen />}

          {words && (!userAuthData || userWords) && (
            <section className="textbook__words">
              <ul className="textbook__words-list">
                {words.map((data) => {
                  let difficulty = false;
                  let learned = false;
                  let hasUserWord = false;
                  if (userAuthData && userWords) {
                    [difficulty, learned, hasUserWord] = checkWord(
                      data.id,
                      userWords
                    );
                  }

                  return (
                    <li className="textbook__words-item" key={data.id}>
                      <WordCard
                        {...data}
                        difficulty={Boolean(difficulty)}
                        learned={learned}
                        hasUserWord={hasUserWord}
                        isPlayAudio={isPlayAudio}
                        playAudioHandler={playAudioHandler}
                        getDifficultWordsE={getDifficultWordsE}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {group !== COMPLEX_GROUP_INDEX &&
            words &&
            (!userAuthData || userWords) && (
              <Pagination
                currentPage={page || 1}
                totalCount={PaginationData.TOTAL_COUNT}
                siblingCount={PaginationData.SIBLING_COUNT}
                pageSize={PaginationData.PAGE_SIZE}
                onPageChange={(currPage: number) =>
                  dispatch(addTextbookState({ page: currPage }))
                }
              />
            )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TextBook;
