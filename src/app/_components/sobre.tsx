import Image from "next/image";
import { Star } from "lucide-react";
export default function Sobre() {
  return (
<section id="sobre" className="bg-gradient-to-br from-[#FF0000] to-[#FF763C] px-8 py-16 flex flex-col md:flex-row items-center gap-8 justify-center">
      <Image 
      src='/man.jpg'
      alt="vendedor de carros marcos de Rondoópolis"
      width={200}
      height={200}
      loading="lazy"
      className="w-70 sm:w-90 rounded-4xl"
      />

      <div className="max-w-lg">
        <p className="text-sm leading-relaxed mb-4">
          Marcos começou sua carreira humilde como lavador de carros, mas sua
          dedicação e paixão pelo setor automotivo o levaram a se tornar um dos
          vendedores mais confiáveis da região. Sempre buscando oferecer o melhor
          atendimento, ele combina conhecimento técnico com atenção
          personalizada, garantindo que cada cliente saia satisfeito e confiante
          com sua escolha.
        </p>

        <div className="flex">
            <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_,i) =>(
                <Star key={i} className="w-5 h-5 text-[#FF903C] " fill="#FF903C" />
            ))}
            </div>
        </div>

        <h3 className="font-bold text-lg mb-4">
          MARCOS SOUZA – RONDONÓPOLIS
        </h3>
        
        <div className="w-full h-[1px] bg-white mb-4"></div>

        <div className="flex gap-8 text-sm font-semibold">
          <div className="flex flex-col items-center">
            <span className="block text-2xl text-[#FF9D51] font-bold">10+</span>
            <span className="font-normal">anos no mercado</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block text-2xl text-[#FF9D51] font-bold">98%</span>
            <span className="font-normal">de satisfação</span>
          </div>
        </div>

        <a 
          href="https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0"
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block w-full">
        <button className="mt-6 bg-[#df6100] px-6 py-2 rounded font-bold text-black hover:cursor-pointer hover:bg-amber-600">
          Fale Comigo Agora
        </button>
        </a>
      </div>
    </section>
  );
}
