import { useState } from "react";
import Header from "../header/header";
import { Audiochallenge } from "./audiochallenge/audiochallenge";
import { AudioAuto } from "./audio-auto/audio-auto";
import "./audiopage.css";
import { useLocation } from "react-router";
import { LocationState } from "../../interface/interface";

import { AudioLevels } from "./audio-levels/audio-levels";

function AudioPage() {
  const [isGameOn, SetIsGameOn] = useState(false);
  const [isGameLoaded, SetIsGameLoaded] = useState(false);

  const location = useLocation<LocationState>();
  let group = -1;
  let page = -1;

  if (location.state) {
    const locationState = location.state as any;
    group = locationState.group;
    page = locationState.page - 1;
  }

  function changeState(isOn: boolean) {
    SetIsGameOn(isOn);
  }

  const changeGameLoadedStatus = function (isLoad: boolean) {
    SetIsGameLoaded(isLoad);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2>Аудиовызов</h2>
          {isGameOn && isGameLoaded ? (
            <Audiochallenge
              changeState={changeState}
              changeGameLoadedStatus={changeGameLoadedStatus}
            />
          ) : group >= 0 ? (
            <AudioAuto
              group={group}
              page={page}
              changeState={changeState}
              isGameLoaded={isGameLoaded}
              changeGameLoadedStatus={changeGameLoadedStatus}
            />
          ) : (
            <AudioLevels
              changeState={changeState}
              isGameLoaded={isGameLoaded}
              changeGameLoadedStatus={changeGameLoadedStatus}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default AudioPage;
