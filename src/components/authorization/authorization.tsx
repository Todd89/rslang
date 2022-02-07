import { AuthorizationComponentProps } from "../../interface/interface";

const Authorization: React.FC<AuthorizationComponentProps> = ({ 
  isRegistration, changeForm, toggleForm 
}) => {
  return (
    <>
      <div className="modal authorization" id="modal">
        <button 
            type="button"
            className="modal__close authorization__close"
            onClick={() => toggleForm()}
        >
          <span className="visually-hidden">
            Закрыть форму
          </span>
        </button>
        <div className="modal__guts">

          <form className="authorization__form" autoComplete="off">
            <h3 className="authorization__title">
              {isRegistration ? "Регистрация" : "Войдите в аккаунт"} 
            </h3> 
            <ul className="authorization__list">
              <li className="authorization__item">
                <label className="authorization__label" htmlFor="email">
                  Введите почту
                </label>
                <input 
                    className="authorization__control" 
                    id="email" 
                    type="text"
                    placeholder="kirkorov@mail.ru"
                    autoFocus
                />
              </li>

              <li className="authorization__item">
                <label className="authorization__label" htmlFor="parol">
                  Введите пароль
                </label>
                <input 
                    className="authorization__control" 
                    id="parol" 
                    type="password" 
                />
              </li>
            </ul>

            <div className="authorization__buttons-wrapper">
              <button type="button" className="btn authorization__btn">
                {isRegistration ? "Зарегистрироваться" : "Войти"}
              </button>
              <div className="authorization__question">
                <span className="authorization__question-text">
                  {isRegistration ? "Уже зарегистрированы?" : "Еще нет аккаунта?"}
                </span> 
                <button 
                  className="authorization__question-btn"
                  onClick={(evt) => changeForm(evt)}
                >
                  {isRegistration ? "Войдите" : "Зарегистрируйтесь"}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div className="overlay" id="modal-overlay"></div>
    </>
  );
}

export default Authorization;