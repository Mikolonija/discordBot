import { NotFoundStyle } from '@/pages/NotFound/style';
import userNotFoundPage from '@/assets/user-not-found_page.svg';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundStyle>
      <div className="g-container">
        <div className="card">
          <img className="not-found" src={userNotFoundPage} alt="" />
          <h1 className="g-font-bold32">We’ve lost this page</h1>
          <p className="g-font-normal14">
            Oh dear, it seems like we've hit a bump in the digital road. The page you're trying to
            reach seems to have taken a little vacation. But don't worry, we're here to help you
            find your way back!
          </p>
          <button onClick={() => navigate('/')} className="g-btn-submit g-font-bold14">
            Back
          </button>
        </div>
      </div>
    </NotFoundStyle>
  );
};

export default NotFound;
