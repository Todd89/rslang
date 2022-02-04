import GameBlock from '../game-block/game-block';
import httpClient  from '../../../services/http-client';
import './main-block.css'

const MainBlock: React.FC = () => {
  
  return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
        <div>
          <img
            src='/assets/images/png/sprint_girl.png' alt="girl"
          />
        </div>
        <GameBlock />
        </div>
      </main>
  );
};

export default MainBlock;