import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AppRoute, ResponseStatus } from "../../const/const";
import MainPage from "../main-page/main-page";
import AudioPage from "../audio-page/audiopage";
import SprintPage from "../sprint-page/sprint-page";
import TextBook from "../text-book/text-book";
import Stats from "../stats/stats";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAuthData } from "../../store/data/selectors";
import httpClient from "../../services/http-client";
import {
  addNewTokens,
  changeAuthorizeStatus,
  resetStore,
} from "../../store/action";
import { initialState } from "../../store/data/data";

const App: React.FC = () => {
  const userAuthData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRefreshToken = async () => {
      if (userAuthData && userAuthData.userId && userAuthData.refreshToken) {
        const res = await httpClient.getNewUserToken(
          userAuthData.userId,
          userAuthData.refreshToken
        );

        if (res === ResponseStatus.UNAUTHORIZE) {
          console.log("clear LS");
          dispatch(resetStore(initialState));
          dispatch(changeAuthorizeStatus(false));
          localStorage.clear();
          return;
        }

        if (res) {
          dispatch(addNewTokens(res));
          return;
        }
      }
    };
    getRefreshToken();
  }, []);

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

        <Route exact path={AppRoute.STATS}>
          <Stats />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
