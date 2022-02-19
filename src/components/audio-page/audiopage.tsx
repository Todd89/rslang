import Header from "../header/header";
import { useState } from "react";
import { Audiochallenge } from "./audiochallenge/audiochallenge";
import "./audiopage.css";
import { useLocation } from "react-router";
import { LocationState } from "../../interface/interface";

import { AudioLevels } from "./audio-levels/audio-levels";

function AudioPage() {
  const [isGameOn, SetIsGameOn] = useState(false);
  const [isGameLoaded, SetIsGameLoaded] = useState(false);
  const location = useLocation<LocationState>();

  if (location.state) {
    const locationState = location.state as any;
    const { group, page} = locationState;
    console.log("group", group);
    console.log("page", page);
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
          <h2>Audio Challenge</h2>
          {isGameOn && isGameLoaded ? (
            <Audiochallenge
              changeState={changeState}
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
