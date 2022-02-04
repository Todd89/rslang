import './game-block.css';

const GameBlock: React.FC = () => {
  return (  
      <div className='game-sprint-block'>
        <div className='game-sprint-block__top-lights'></div>
        <div className='game-sprint-block__quastion'></div>
        <div className='game-sprint-block__buttons-block'>
          <button className='game-sprint-block__button game-sprint-block__button_wrong'>Неверно</button>
          <button className='game-sprint-block__button game-sprint-block__button_right'>Правильно</button>
        </div>
      </div>
      )
    };

export default GameBlock;
