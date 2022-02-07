import Header from "../header/header";
import { useState } from "react";
import { AUDIO_RULES, AUDIO_QUESTIONS_ARRAY } from "../../const/const-audio";
import { AudioLevel } from "./audio-level/audio-level";
import { Audiochallenge } from "./audiochallenge/audiochallenge";
import "./audio-page.css";

function AudioPage() {
  const arrLevels = [1, 2, 3, 4, 5, 6];

  const [audioGroup, SetAudioGroup] = useState(-1);
  const [audioPage, SetAudioPage] = useState(-1);
  const [audioIsGameOn, SetAudioIsGameOn] = useState(false);
  const [audioKey, SetAudioKey] = useState(Math.random());
  //const [isRepeatGame, SetIsRepeatGame] = useState(false);

  function changeState(
    group: number,
    page: number,
    isGame: boolean
    //  isRepeat: boolean
  ) {
    SetAudioGroup(group);
    SetAudioPage(page);
    SetAudioIsGameOn(isGame);
    SetAudioKey(Math.random());
    //SetIsRepeatGame(isRepeat);
  }

  return (
    <>
      <Header />
      <main>
        {audioIsGameOn ? (
          <Audiochallenge
            key={audioKey}
            audioGroup={audioGroup}
            audioPage={audioPage}
            isGameOn={audioIsGameOn}
            changeState={changeState}
          />
        ) : (
          <div className="container">
            <h1>Audio Challenge</h1>
            <div className="game__section game__wrapper horizontal">
              <div className="game__levels-image"></div>
              <div className="game__rules-section game__wrapper vertical">
                <h2>Правила игры</h2>
                <p className="game_rules-text">{AUDIO_RULES}</p>
                <div className="game__leves">
                  {arrLevels.map((item) => {
                    return (
                      <AudioLevel
                        id={item}
                        key={item}
                        changeState={changeState}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default AudioPage;
