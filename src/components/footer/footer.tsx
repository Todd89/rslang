const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <a href="">logo</a>
        <nav className="header__nav nav container">
            <ul className="nav__list">
                <li className="nav__item">
                  <a className="nav__link nav__link--active">Учебник</a>
                </li>
                <li>
                  <a className="nav__link" href="#">Мини-игры</a>
                </li>
                
                <li>
                  <a className="nav__link" href="#">Статистика</a>
                </li>
            </ul>
        </nav>
        
        <a className="footer__link" href="https://rs.school/js/">
          <img 
            src="https://rs.school/images/rs_school_js.svg" 
            width="61" 
            height="23" 
            alt="RS School logo"
          />
        </a>
        
        <a className="footer__author-link" href="https://github.com/Romnasi">Гитхаб Александра</a>
        <a className="footer__author-link" href="https://github.com/Romnasi">Гитхаб Ольги</a>
        <a className="footer__author-link" href="https://github.com/Romnasi">Гитхаб Ромы</a>
        
        <span className="footer__year">2022</span>
      </div>
    </footer>
  );
}

export default Footer;