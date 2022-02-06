import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AppRoute } from "../../const/const";
import MainPage from "../main-page/main-page";
import AudioPage from "../audio-page/audio-page";
import SprintPage from "../sprint-page/sprint-page";
import TextBook from "../text-book/text-book";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage />
        </Route>

        <Route exact path={AppRoute.TEXTBOOK}>
          <TextBook />
        </Route>

        <Route exact path={AppRoute.AUDIO_CHALLENGE}>
          <AudioPage />
        </Route>

        <Route exact path={AppRoute.SPRINT}>
          <SprintPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
