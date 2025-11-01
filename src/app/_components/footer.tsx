import Image from "next/image";
import Logo from "../../../public/Group 39.svg";
import { Phone, Mail, MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contatos" className="bg-[#FF2F33] text-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Descrição */}
        <div className="text-[#C7C7C7]">
          <Image
            src={Logo}
            alt="Logo da empresa"
            width={150}
            height={150}
            loading="lazy"
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Seu parceiro de confiança na compra do veículo dos seus sonhos.
          </p>
        </div>

        {/* Links Rápidos */}
       <div>
        <h4 className="font-bold mb-3 text-white">Links Rápidos</h4>
        <ul className="text-sm space-y-2 text-[#C7C7C7]">
            <li><a href="#inicio" className="hover:text-white transition cursor-pointer">INÍCIO</a></li>
            <li><a href="#carros" className="hover:text-white transition cursor-pointer">CARROS</a></li>
            <li><a href="#contatos" className="hover:text-white transition cursor-pointer">CONTATOS</a></li>
            <li><a href="#sobre" className="hover:text-white transition cursor-pointer">SOBRE</a></li>
        </ul>
        </div>


        {/* Contatos */}
        <div>
          <h4 className="font-bold mb-3 text-white">Contatos</h4>
          <ul className="text-sm space-y-2 text-[#C7C7C7]">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white" /> 66 9933-3085
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" /> marcossouzamarcosr@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-8 h-8 text-white" /> Av. Bandeirantes, 3791 - Jardim Marialva, Rondonópolis - MT, 78720-300
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h4 className="font-bold mb-3 text-white">Redes Sociais</h4>
          <div className="flex gap-3">
            <a
            href="https://www.instagram.com/marcos_pokone01/"
            target="_blank" 
            rel="noopener noreferrer">
            <div className="w-8 h-8 bg-black/30 rounded flex items-center justify-center hover:bg-black/60 transition cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-xs text-center text-[#E5E5E5]">
        © 2025 Rondonópolis Motors. Todos os direitos reservados.
      </p>
    </footer>
  );
}
