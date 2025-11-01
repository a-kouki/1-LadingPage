import Image from "next/image";
import Man from "../../../public/man_2.png";
import StarBorder from "./_reactsbits/StarBorder";

export default function Hero() {
  return (
    <section id="inicio" className="relative text-white flex items-center justify-center bg-black overflow-hidden min-h-[70vh] px-6">
      {/* 🔴 Elipse de fundo com blur controlado */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[50%]
          bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.6)_0%,_rgba(139,0,0,0.9)_40%,_transparent_80%)]
          blur-[80px] opacity-90 pointer-events-none"
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center ">
        {/* 🧱 Coluna esquerda (texto) */}
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">
            O carro dos seus <br />
            sonhos está aqui
          </h1>

          <p className="mt-3 text-lg text-gray-100">
            Seu próximo carro está a um clique de distância
          </p>

          
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <a 
            href="https://pokonemultimarcas.com.br/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block">
            <button className="bg-red-600 hover:bg-red-700 px-[26px] py-[15px] rounded-[20px] font-semibold  transition hover:cursor-pointer ">
              Ver carros disponíveis
            </button>
            </a>
            <a 
              href="https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0"
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block">
                <StarBorder
                  as="button"
                  className="custom-class hover:cursor-pointer"
                  color="red"
                  speed="5s"
                >
                Simular financiamento

                </StarBorder>
                  
            </a>
          </div>
        </div>

        {/* 📸 Coluna direita (imagem representada) */}
        <div className="relative flex justify-center md:justify-end ">
          {/* Imagem principal */}
          <Image
            src={Man}
            alt="vendedor de carros marcos de Rondoópolis"
            className="relative z-10 w-[250px] md:w-[500px] h-auto"
            priority
          />

          {/* 🔳 Fade inferior para suavizar o corte */}
          
        </div>
      </div>
    </section>
  );
}
