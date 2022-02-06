interface IPropsLives {
  amount: number;
}

function LivesLeft(props: IPropsLives) {
  const { amount } = props;
  const arrLives = [
    ...Array(amount).fill(true),
    ...Array(LIVES_AMOUNT - amount).fill(false),
  ];

  return (
    <div className="game__lives">
      {arrLives.map((item) => {
        return item ? (
          <div className="game__life"></div>
        ) : (
          <div className="game__life-lost"></div>
        );
      })}
    </div>
  );
}