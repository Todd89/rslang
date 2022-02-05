import { Link } from "react-router-dom";
import { AppRoute, teamMembers } from "../../const/const";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">

        <div className="footer__logo-wrapper">
          <Link to={AppRoute.ROOT} className="footer__logo logo">
            RS Lang
          </Link>

          <a className="footer__link footer__link--rss" href="https://rs.school/js/">
            <img 
              src="assets/images/rss-logo.svg" 
              width="116" 
              height="43" 
              alt="RS School logo"
            />
          </a>
        </div>


        <nav className="footer__nav nav nav--footer container">
            <ul className="nav__list nav__list--footer">
                <li className="nav__item">
                  <Link to={AppRoute.TEXTBOOK} className="nav__link">
                    Учебник
                  </Link>
                </li>

                <li className="nav__item">
                  <Link to={AppRoute.AUDIO_CHALLENGE} className="nav__link" href="#">
                    Аудиовызов
                  </Link>
                </li>

                <li className="nav__item">
                  <Link to={AppRoute.SPRINT} className="nav__link" href="#">
                    Спринт
                  </Link>
                </li>
                
                <li className="nav__item">
                  <Link to={AppRoute.STATS} className="nav__link" href="#">
                    Статистика
                  </Link>
                </li>
            </ul>
        </nav>
        
        <ul className="footer__gh-list">
          {teamMembers.map(({name}) => (
            <li className="footer__gh-item">
              <a 
                  className="footer__author-link" 
                  href="https://github.com/Romnasi"
              >
                <svg 
                    className="footer__gh-icon"
                    width="20" 
                    height="20" 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                >
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
                </svg>
                <span className="footer__member-name">{name}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <span className="footer__year">2022</span>
      </div>
    </footer>
  );
}

export default Footer;