import Header from "../header/header";
import MainFirstScreen from "../main-first-screen/main-first-screen";
import OurTeam from "../our-team/our-team";
import MainFeature from "../main-feature/main-feature";
import Footer from "../footer/footer";

const MainPage: React.FC = () => {
  return (
    <>
      <Header />

      <main>
        <MainFirstScreen />

        <MainFeature />
    
        <OurTeam />
      </main>

      <Footer />
    </>
  );
}

export default MainPage;