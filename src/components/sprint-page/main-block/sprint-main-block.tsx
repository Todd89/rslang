import GameBlock from '../sprint-game-block/sprint-game-block';
import './sprint-main-block.css';

const MainBlock: React.FC = () => {
  
  return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
        <div>
          <img
            src='/assets/images/png/sprint_girl.png' alt="девочка"
          />
        </div>
        <GameBlock />
        </div>
      </main>
  );
};

export default MainBlock;