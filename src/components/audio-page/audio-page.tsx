import Header from "../header/header";
import { AUDIO_RULES } from "../../const/const-audio";
import { AudioLevel } from "./audio-level/audio-level";
import "./audio-page.css";

function AudioPage() {
  const arrLevels = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h1>Audio Challenge</h1>
          <div className="game__section game__wrapper horizontal">
            <div className="game__levels-image"></div>
            <div className="game__rules-section game__wrapper vertical">
              <h2>Правила игры</h2>
              <span className="game_rules-text">{AUDIO_RULES}</span>
              <div className="game__leves">
                {arrLevels.map((item) => {
                  return <AudioLevel id={item} key={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AudioPage;
