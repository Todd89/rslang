import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import MainPage from '../main-page/main-page';
import AudioChallenge from '../audio-page/audio-page';
import SprintPage from '../sprint-page/sprint-page';
import TextBook from '../text-book/text-book';
import Stats from '../stats/stats';

function App() {
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
