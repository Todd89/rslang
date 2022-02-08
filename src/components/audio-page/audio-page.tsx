import Header from "../header/header";
import { useState } from "react";
import { Audiochallenge } from "./audiochallenge/audiochallenge";
import "./audio-page.css";

import { AudioLevels } from "./audio-levels/audio-levels";

function AudioPage() {
  // console.log("AudioPage");

  const [isGameOn, SetIsGameOn] = useState(false);
  const [isGameLoaded, SetIsGameLoaded] = useState(false);

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
