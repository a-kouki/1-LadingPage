import { Calendar } from "lucide-react";
import { Gauge } from "lucide-react";
import Image from "next/image";
import Car from '../../../public/cars/VW POLO Confortline.jpg'

export default function Destaques() {
  const cars = [
    { name: "VW/POLO Confortline", year: "2023/24", type:"flex", price: "R$ 95.990,00", href:"/cars/VW POLO Confortline.jpg" },
    { name: "Uno Attractive 1.0", year: "2021", type:"flex", price: "R$ 53.999,00",href:"/cars/Uno Attractive 1.0.jpg" },
    { name: "HYUNDAI HB20S", year: "2016", type:"flex", price: "R$ 72.990,00",href:"/cars/HYUNDAI HB20S.jpeg"},
    { name: "FIAT STRADA", year: "2019/2020",type:"flex", price: "R$ 61.990,00",href:"/cars/FIAT STRADA.jpeg" },
    { name: "CHEVROLET ONIX", year: "2022/2023",type:"", price: "R$ 75.990,00", href:"/cars/CHEVROLET ONIX.jpeg" },
    { name: "CHEVROLET CORSA", year: "2009/2010",type:"", price: "R$ 32.990,00",href:"/cars/CHEVROLET CORSA.jpeg" },
  ];

  return (
  <section id="carros" className="py-16 px-4 md:px-40 bg-black text-center sm:mt-10">
  <h2 className="text-3xl font-extrabold uppercase mb-10">
    Veículos em <span className="text-rose-500">Destaque</span>
  </h2>

  {/* ✅ Troquei flex-wrap por grid responsivo */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
    {cars.map((car, i) => (
      <div
        key={i}
        className="border-2 border-gray-500 rounded-lg w-full max-w-sm overflow-hidden hover:border-red-600 transition-all duration-300"
      >
        <div className="h-60 bg-gray-700 flex items-center justify-center relative">
          <span className="absolute top-6 right-2 bg-red-600 px-3 py-2 text-xs font-bold rounded-2xl z-10">
            {car.price}
          </span>

          <Image
            src={car.href}
            alt={car.name}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 text-left">
          <h3 className="font-bold text-lg uppercase">{car.name}</h3>

          <div className="text-sm text-gray-400 mt-2 flex gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="text-[#FF4D00] w-4 h-4" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="text-[#FF4D00] w-4 h-4" />
              <span>FLEX</span>
            </div>
          </div>

          <a 
          href="https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0"
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block w-full">
          <button className="mt-4 bg-red-600 text-white w-full py-2 rounded text-sm font-semibold hover:bg-red-700 transition hover:cursor-pointer">
            Fale Comigo →
          </button>
          </a>
        </div>
      </div>
    ))}
  </div>

<a 
  href="https://pokonemultimarcas.com.br/"
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-block">
  <button className="mt-10 bg-red-600 px-8 py-3 font-semibold rounded-2xl hover:bg-red-700 transition hover:cursor-pointer">
    Ver mais
  </button>
  </a>
</section>

  );
}
