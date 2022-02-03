import { Link } from "react-router-dom";
import { AppRoute } from '../../const/const';

const Header: React.FC = () => {

  return (
    <header className="header">
      <div className="header__wrapper container">
        <Link className="header__logo" to={AppRoute.ROOT}>
          RS Lang
        </Link>
        <nav className="header__nav nav">
            <ul className="nav__list">
                <li className="nav__item">
                  <Link to={AppRoute.ROOT} className="nav__link nav__link--active">
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
                  <Link to={AppRoute.ROOT} className="nav__link">
                    Статистика
                  </Link>
                </li>
            </ul>
        </nav>
        <button className="header__login">login</button>
      </div>
    </header>
  );
}

export default Header;