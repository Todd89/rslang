const MainFeature = () => {
  return (
    <section className="feature">
      <div className="feature__wrapper container">
        <h2 className="feature__title">Описание возможностей и преимуществ приложения</h2>
        <ul className="feature__list">
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Учебник</h3>
              <p className="feature__item-text">
                Более 3900 слов для изучения, с изображениями, разбитых на 
                разделы по уровню твоей подготовки с удобной навигацией.
              </p>
            </article>
          </li>
          
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Список слов</h3>
              <p className="feature__item-text">
                Создай свой персональный список слов для изучения слов 
                - добавляй слова, которым хочешь уделить особое 
                внимание и удаляй, уже известные.
              </p>
            </article>
          </li>
          
          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Игры</h3>
              <p className="feature__item-text">
                Тебя ждут 2 удивительные игры на запоминание слов 
                и восприятия на слух.
              </p>
            </article>
          </li>

          <li className="feature__item">
            <article className="feature__card">
              <h3 className="feature__item-title">Статистика</h3>
              <p className="feature__item-text">
                Отслеживай свой прогресс в индивидуальной статистике, 
                ставь цели и вдохновляйся на и достижение 
                новых результатов каждый день!
              </p>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MainFeature;