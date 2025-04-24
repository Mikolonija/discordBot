import { HeaderStyle } from '@/components/Header/style';
import { Link, useLocation } from 'react-router-dom';
import { routers } from '@/router/routes';
import { RouteId } from '@/utils/types/router';
import logo from '@/assets/logo.svg';

const Header = () => {
  const location = useLocation();

  return (
    <HeaderStyle>
      <div className="g-container">
        <nav className="nav">
          <div className="g-left">
            <Link to="/">
              <img src={logo} alt="logo" width={60} height={60} />
            </Link>
            <Link to="/">
              <h1 className="g-font-bold16">DiscordBot</h1>
            </Link>
          </div>
          <ul className="nav-pages-list g-right ">
            {routers
              .filter((r) => r.id !== RouteId.NotFound)
              .map((route) => {
                const isActive = location.pathname === route.path;
                return (
                  <li className="g-font-bold14" key={route.id}>
                    <Link to={route.path} className={isActive ? 'g-btn-submit' : 'g-btn-cancel'}>
                      {route.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </HeaderStyle>
  );
};

export default Header;
