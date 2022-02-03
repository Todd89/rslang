const teamMembers = [
  {
    name: "Александр",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Todd89",
    avatar: "",
  },
  {
    name: "Ольга",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Todd89",
    avatar: "",
  },
  {
    name: "Роман",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Romnasi",
    avatar: "",
  }
]


const OurTeam: React.FC = () => {
  return (
    <section>
      <div className="container">
        <h2>Наша каоманда</h2>

        <ul>
          {teamMembers.map(({ name, work, ghLink }) => (
            <li>
              <article>
                <span>{name}</span>
                <p>{work}</p>
                <a href={ghLink}>Ссылка на гитхаб</a>
              </article>
            </li>
          ))} 
        </ul>
      </div>
    </section>
  );
}

export default OurTeam;