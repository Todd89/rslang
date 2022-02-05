import { Link } from "react-router-dom";
import { AppRoute } from "../../const/const";

const MainFeature = () => {
  return (
    <section className="feature">
      <div className="feature__wrapper container">
        <h2 className="feature__title visually-hidden">Описание возможностей и преимуществ приложения</h2>
        <ul className="feature__list">
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Учебник</h3>
              <div className="feature__card-wrapper">
                <img 
                  className="feature__image"
                  width="400" 
                  height="400" 
                  src="assets/images/girl-lies.png" 
                  alt="Читающая девушка" 
                />
                <p className="feature__item-text">
                  Более 3900 слов с картинками для изучения, разбитых на 
                  разделы по уровням подготовки с удобной навигацией
                </p>
                <Link className="btn" to={AppRoute.TEXTBOOK}>Попробовать</Link>
              </div>
            </article>
          </li>
          
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Список слов</h3>
              <div className="feature__card-wrapper">
                <img 
                  className="feature__image"
                  width="400" 
                  height="400" 
                  src="assets/images/reading-girl.png" 
                  alt="Читающая девушка" 
                />
                <p className="feature__item-text">
                  Создай свой персональный список для изучения 
                  - добавляй слова, которым хочешь уделить особое 
                  внимание и удаляй уже известные
                </p>
                <Link className="btn" to={AppRoute.TEXTBOOK}>Попробовать</Link>
              </div>
            </article>
          </li>
          
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Аудиовызов</h3>
              <div className="feature__card-wrapper">
                <img 
                  className="feature__image feature__image--audio"
                  width="450" 
                  height="450" 
                  src="assets/images/listening-girl.png" 
                  alt="Девушка в наушниках" 
                />
                <p className="feature__item-text">
                  Проверь, как быстро ты понимаешь на слух
                  - слушай и изучай новые слова!
                </p>
              <Link className="btn" to={AppRoute.TEXTBOOK}>Попробовать</Link>
              </div>
            </article>
          </li>

          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Статистика</h3>
              <div className="feature__card-wrapper">
                <img 
                  className="feature__image"
                  width="400" 
                  height="400" 
                  src="assets/images/stats.png" 
                  alt="Девушка в наушниках" 
                />
                <p className="feature__item-text">
                  Отслеживай свой прогресс в индивидуальной статистике, 
                  ставь цели и вдохновляйся на достижение 
                  новых результатов каждый день!
                </p>
                <Link className="btn" to={AppRoute.TEXTBOOK}>Попробовать</Link>
              </div>
            </article>
          </li>

          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Спринт</h3>
              <div className="feature__card-wrapper">
                <img 
                  className="feature__image feature__image--audio"
                  width="450" 
                  height="450" 
                  src="assets/images/listening-girl.png" 
                  alt="Девушка в наушниках" 
                />
                <p className="feature__item-text">
                  Испытай себя в знании английских слов, 
                  зарабатывай очки и достигни лучшего результата в ответах на время.
                </p>
              <Link className="btn" to={AppRoute.SPRINT}>Попробовать</Link>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MainFeature;