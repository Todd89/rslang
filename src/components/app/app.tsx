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
        <Route path={AppRoute.ROOT}>
          <MainPage />
        </Route>

        <Route path={AppRoute.TEXTBOOK}>
          <TextBook />
        </Route>

        <Route path={AppRoute.AUDIO_CHALLENGE}>
          <AudioPage />
        </Route>

        <Route path={AppRoute.SPRINT}>
          <SprintPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
