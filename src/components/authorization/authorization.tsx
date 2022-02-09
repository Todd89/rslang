import { AuthorizationComponentProps } from "../../interface/interface";
import React, { useRef, useState } from "react";
import httpClient from "../../services/http-client"

const Authorization: React.FC<AuthorizationComponentProps> = ({ 
  isRegistration, 
  changeForm, 
  toggleForm 
}) => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const authorize = async () => {
    if (isRegistration) {
      const newUser = await httpClient.createUser({
        name: nameValue,
        email: emailValue, 
        password: passwordValue
      });
      console.log(newUser);
      return;
    }
    const user = await httpClient.signIn({
      email: emailValue, 
      password: passwordValue
    });
    console.log(user);
  } 

  

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

          <form className="authorization__form" autoComplete="off"
            onSubmit={(evt) => {
              evt.preventDefault();
              authorize();
            }}
          >
            <h3 className="authorization__title">
              {isRegistration ? "Регистрация" : "Войдите в аккаунт"} 
            </h3> 
            <ul className="authorization__list">
              <li className="authorization__item">
                <label className="authorization__label" htmlFor="name">
                  Введите ваше имя <span className="authorization__star">*</span>
                </label>
                <input 
                    className="authorization__control" 
                    id="name" 
                    type="text"
                    placeholder="Филипп"
                    ref={inputName}
                    autoComplete="off"
                    autoFocus
                    required
                    onChange={() => {
                      if (null !== inputName.current) {
                        setNameValue(inputName.current.value);
                      }
                    }}
                />
              </li>

              <li className="authorization__item">
                <label className="authorization__label" htmlFor="email">
                  Введите почту <span className="authorization__star">*</span>
                </label>
                <input 
                    className="authorization__control" 
                    id="email" 
                    type="email"
                    placeholder="kirkorov@mail.ru"
                    ref={inputEmail}
                    autoComplete="off"
                    required
                    onChange={() => {
                      if (null !== inputEmail.current) {
                        setEmailValue(inputEmail.current.value);
                      }
                    }}
                />
              </li>

              <li className="authorization__item">
                <label className="authorization__label" htmlFor="parol">
                  <span>Введите пароль </span><span className="authorization__star">*</span>                  
                </label>
                <input 
                    className="authorization__control" 
                    id="parol" 
                    type="password"
                    required 
                    ref={inputPassword}
                    minLength={8}
                    onChange={() => {
                      if (null !== inputPassword.current) {
                        setPasswordValue(inputPassword.current.value);
                      }
                    }}
                />
              </li>
            </ul>

            <div className="authorization__buttons-wrapper">
              <button 
                  className="btn authorization__btn"
                  
              >
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

      <div
          onClick={() => toggleForm()} 
          className="overlay" 
      >
      </div>
    </>
  );
}

export default Authorization;