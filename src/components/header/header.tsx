import Authorization from "../authorization/authorization";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AppRoute } from "../../const/const";
import { useSelector, useDispatch } from "react-redux";
import { getAuthorizeStatus } from "../../store/data/selectors";
import { resetStore, changeAuthorizeStatus } from "../../store/action";
import { initialState } from "../../store/data/data";

const Header: React.FC = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isAuthorize = useSelector(getAuthorizeStatus);

  const changeForm = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsRegistration((prev) => !prev);
  };

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  const logout = () => {
    dispatch(resetStore(initialState));
    dispatch(changeAuthorizeStatus(false));
    localStorage.clear();
  };

  return (
    <>
      {isFormOpen && (
        <Authorization
          isRegistration={isRegistration}
          changeForm={changeForm}
          toggleForm={toggleForm}
        />
      )}
      <header className="header">
        <div className="header__wrapper container">
          <Link className="header__logo logo" to={AppRoute.ROOT}>
            RS Lang
          </Link>
          <nav
            className={
              isOpenNav ? "header__nav nav nav--open" : "header__nav nav"
            }
          >
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to={AppRoute.TEXTBOOK}
                  className="nav__link nav__link--active"
                >
                  Учебник
                </Link>
              </li>
              <li className="nav__item">
                <Link to={AppRoute.AUDIO_CHALLENGE} className="nav__link">
                  Аудиовызов
                </Link>
              </li>
              <li className="nav__item">
                <Link to={AppRoute.SPRINT} className="nav__link">
                  Спринт
                </Link>
              </li>

              <li className="nav__item">
                <Link to={AppRoute.STATS} className="nav__link">
                  Статистика
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => {
              setIsOpenNav((prev) => !prev);
            }}
          >
            <span className="visually-hidden">Menu toggle</span>
          </button>

          <button
            className={
              !isAuthorize
                ? "btn header__authorization"
                : "btn header__authorization header__authorization--authorized"
            }
            onClick={() => {
              if (isAuthorize) {
                logout();
                return;
              }
              toggleForm();
            }}
            disabled={isOpenNav}
          >
            {isAuthorize ? "Выйти" : "Войти"}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
