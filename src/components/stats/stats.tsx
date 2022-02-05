import Footer from "../footer/footer";
import Header from "../header/header";

const Stats:React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="stats">
        <div className="stats__wrapper container">
          <h1>Stats</h1>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Stats;