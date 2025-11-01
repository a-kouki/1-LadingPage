import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import PorqueMeEscolher from "./_components/porquemeescolher";
import Destaques from "./_components/destaque";
import Sobre from "./_components/sobre";
import Footer from "./_components/footer";

export default function App() {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />
      <Hero />
      <PorqueMeEscolher />
      <Destaques />
      <Sobre />
      <Footer />
    </div>
  );
}
