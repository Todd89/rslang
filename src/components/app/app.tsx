import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import MainPage from '../main-page/main-page';
import AudioChallenge from '../audio-page/audio-page';
import SprintPage from '../sprint-page/sprint-page';
import TextBook from '../text-book/text-book';
import Stats from '../stats/stats';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../store/data/selectors';
import httpClient from '../../services/http-client';
import { useDispatch } from 'react-redux';
import { addNewTokens, changeAuthorizeStatus } from '../../store/action';

const App: React.FC = () => {
  const userAuthData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getRefreshToken = async () => {
      if (userAuthData && userAuthData.userId && userAuthData.refreshToken) {
        const res = await httpClient.getNewUserToken(userAuthData.userId, userAuthData.refreshToken);
        if (res) {
          dispatch(addNewTokens(res));
          return;
        }
        dispatch(changeAuthorizeStatus(false));
      }
    }
    getRefreshToken();
  }, []);

  return (
    <BrowserRouter >
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage />
        </Route>
        
        <Route exact path={AppRoute.TEXTBOOK}>
          <TextBook />
        </Route>

        <Route exact path={AppRoute.AUDIO_CHALLENGE}>
          <AudioChallenge />
        </Route>
        
        <Route exact path={AppRoute.SPRINT}>
          <SprintPage />
        </Route>

        <Route exact path={AppRoute.STATS}>
          <Stats />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
