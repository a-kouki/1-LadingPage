import { info } from "console";
import Image from "next/image"

export function Section(){

    const specialImg = [
        {s:"/1.png"},
        {s:"/2.png"},
        {s:"/3.png"},
        {s:"/section_1.png"},
    ]

    const contact = [
        {s:"/1_1.png", p:"Fique por dentro das Promoções e Novidades!!",h:"https://www.instagram.com/marcos_pokone01/"},
        {s:"/Instagram.svg", p:"Siga no Instagram", h:"https://www.instagram.com/marcos_pokone01/"},
        {s:"/whatsapp.svg", p:"Me contate pelo WhatsApp", h:"https://www.whatsapp.com/catalog/556699333085/?app_absent=0&utm_source=ig"},
    ]

    const cars = [
    { name: "Corolla GLI", year: "2012", info:[""], type:"1.5 Flex", price: "R$ 63.990,00", href:"/cars/Corolla GLI.jpg" },
    { name: "JEEP/RENEGADE LONGITUDE", year: "2015/2016",info:["motor 1.8", "4x2", "Câmbio automático"], type:"", price: "R$ 69.990,00",href:"/cars/JEEP RENEGADE LONGITUDE.jpg" },
    { name: "KWID INTENSE", year: "2022/23", type:"flex",info:["motor 1.0", "Conforto Interior", "Manual"], price: "",href:"/cars/Kwid Intense.jpg"},
    { name: "Gol G5", year: "2009",type:"",info:["Completo", "Todo equipado"], price: "R$ 34.990,00",href:"/cars/Gol G5 Completo.jpg" },
    { name: "", year: "",type:"",info:[], price: "",href:"/cars/sonho_realizado.jpg" },
    ];

    const whatsappLink =
    "https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0"

    return(
        <>
        <div className="flex justify-center bg-bg-primary w-full pt-10 text-black">
        <h2 className="flex justify-center text-4xl sm:text-5xl md:text-5xl  pb-3 font-oswald px-2">
            MARCOS SOUZA - RONDONÓPOLIS
        </h2>
        </div>
        <div className="flex justify-center flex-row bg-bg-primary text-black">
        <div className="text-[13px] md:text-[19px]  grid grid-cols-1 md:grid-cols-3 gap-x-10 px-2 md:px-pxGloabl max-w-widthGlobal font-abeezee items-center">
            <div className="flex  flex-col items-start sm:items-center">
                <p className="text-secondary text-2xl sm:text-3xl font-bebas">Vendedor de Veículos</p>
                <p className="text-[15px]">“Marcos começou sua carreira humilde como lavador de carros, mas sua dedicação e paixão pelo setor automotivo o levaram a se tornar um dos vendedores mais confiáveis da região. Sempre buscando oferecer o melhor atendimento, ele combina conhecimento técnico com atenção personalizada, garantindo que cada cliente saia satisfeito e confiante com sua escolha.”</p>
            </div>
            <div className="flex col-span-2 gap-x-2 md:gap-x-5">
                <div className="relative w-350 h-80 ">
                <Image 
                src="/man.jpg"
                alt=""
                fill
                className="object-cover col-span-1 rounded-3xl"
                loading="lazy"
                />
                </div>
                <div className="flex flex-col w-300">
                    <div className="relative w-full h-full">
                        <Image 
                            src="/favicon.png"
                            alt=""
                            fill
                            loading="lazy"
                            className="object-cover rounded-3xl"
                        />
                    </div>
                    <div className="w-full flex items-center flex-col font-bebas h-full justify-center">
                        <p className=""><span className="text-4xl text-primary">10+</span> anos no mercado</p>
                        <p className=""><span className="text-4xl text-primary">99%</span> de satisfação</p>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div className="overflow-hidden bg-bg-primary text-black">
        <div className="w-[105vw] font-grandHotel py-10 flex justify-between text-2xl md:text-3xl gap-x-5">
        {[...Array(5)].map((_, i) => (
            /*<p key={i} className={ i%2 == 0 ? "text-primary" : "text-secondary"}>
                Creamery
            </p>*/
            <Image 
            key={i}
            src="/favicon.png"
            alt="logo"
            loading="lazy"
            className="w-15 h-15"
            width={100}
            height={100}
            />
        ))}
        </div>
        </div>

         {/* ── DESTAQUES ───────────────────────────────────────────────── */}
      <div className="flex justify-center bg-bg-primary text-black" id="veiculos">
        <div className="px-2 md:px-pxGloabl max-w-widthGlobal w-full">
          <h2 className="font-bebas text-5xl text-primary">Destaques</h2>
 
          <div className="grid grid-cols-1 w-fit max-w-full mx-auto sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {cars.map((car, i) => (
              <a
                key={i}
                className="group w-65 sm:w-full  flex flex-col hover:cursor-pointer rounded-3xl overflow-hidden border border-black/8 hover:border-primary/40 hover:shadow-lg transition-all duration-200 bg-white"
                target="_blank"
                href={whatsappLink}
              >
                <div className="relative w-full h-80 sm:h-90 lg:w-full lg:h-110 overflow-hidden">
                  <Image
                    src={car.href}
                    alt={car.name}
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  {/* gradiente na base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
 
                  {/* preço sobreposto */}
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <p className="text-white font-bebas text-2xl leading-none">
                      {car.price}
                    </p>
                    <p className="text-white/70 text-[11px]">{car.year}</p>
                  </div>
                </div>
 
                {/* Info estilo post */}
                <div className="flex flex-col gap-2 p-4 bg-white">
 
                  {/* cabeçalho: avatar + vendedor + status */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-black/10">
                      <Image
                        src="/favicon.png"
                        alt="logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[12px] font-semibold text-black/70">
                      Marcos Souza
                    </span>
                    <span className="ml-auto text-[11px] text-black/30">
                      À venda
                    </span>
                  </div>
 
                  {/* nome do veículo */}
                  <p className="font-bold text-[16px] leading-tight">
                    {car.name}
                  </p>
 
                  {/* tags de especificação */}
                  {car.info.length > 0 && car.info[0] !== "" && (
                    <div className="flex flex-wrap gap-1">
                      {car.info.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[11px] bg-black/6 text-black/55 rounded-full px-2 py-0.5 border border-black/6"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
 
                  {/* CTA WhatsApp */}
                  <div className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2 text-[13px] font-semibold mt-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.71 19.79 19.79 0 0 1 1.61 1.1 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Tenho interesse
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

        <div className="flex justify-center pt-10 bg-bg-primary text-black">
        <div className="px-2 md:px-pxGloabl max-w-widthGlobal w-full">
            <div className="flex items-center gap-5 pb-2">
            {/*<h2 className="font-grandHotel text-5xl text-secondary">Creamery</h2>*/}
                <Image 
                src="/favicon.png"
                alt="logo"
                loading="lazy"
                className="rounded-2xl md:rounded-3xl w-20 h-20 md:w-25 md:h-25"
                width={120}
                height={120}/>
                <p className="font-semibold text-[12px] leading-3 sm:text-2xl sm:leading-5">
                    Aqui você encontra veículos selecionados, atendimento direto e negociação sem complicação.
                </p>
            </div>

            <div className="relative w-full h-50 md:h-100">
                <Image
                src="/our_store.jpg"
                alt="Store Were I sell vehicles"
                loading="lazy"
                className="object-cover rounded-3xl"
                fill
                />

                <div
              className="
                absolute inset-0
                bg-linear-to-t
                from-black/70
                via-black/30
                to-transparent
                rounded-3xl
              "
            />

            <p className="relative top-[65%] md:top-[75%] left-[10%] w-[90%] text-5xl md:text-7xl text-white font-bebas">
              Loja
            </p>
            </div>

            <div className="flex gap-10 justify-between items-center pt-10 pb-3">
                <p className="font-semibold text-[17px] leading-3 sm:text-2xl sm:leading-5">
                    Cada carro é escolhido pensando em qualidade, procedência e custo-benefício.
                </p>
                <div className="flex">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-primary w-5 sm:w-10 h-5 sm:h-10 rounded-4xl"></div>
                ))}
                </div>
            </div>
            
            <div className="container grid md:grid-rows-1 gap-y-2 grid-cols-2 md:grid-cols-3 gap-x-2  leading-5 h-auto md:h-70 xl:h-60">
                <div>
                    <div className="card bg-black/50 h-[100%] flex justify-center">
                    <p className="title text-secondary  text-[20px] md:text-2xl leading-5 font-oswald">Garantia Completa</p>
                    <p className="text text-white text-[14px] md:text-[16px] ">
                        Todos os veículos com garantia e procedência verificada
                    </p>
                    </div>
                </div>

                <div>
                    <div className="card bg-black/50 h-[100%] flex justify-center">
                    <p className="title font-cormorant text-secondary text-[20px] md:text-2xl leading-5 font-oswald">Qualidade Certificada</p>
                    <p className="text text-white text-[14px] md:text-[16px] ">
                        Inspeção rigorosa em todos os veículos do nosso estoque
                    </p>
                    </div>
                </div>

                <div className="card col-span-2 md:col-span-1  h-[100%] md:h-full ">
                    <div className="card bg-black/50 h-full flex justify-center">
                    <p className="title font-cormorant text-secondary text-[20px] md:text-2xl leading-5 font-oswald">Financiamento Facilitado</p>
                    <p className="text text-white text-[14px] md:text-[16px] ">
                        Melhores taxas e condições especiais de pagamento                    
                    </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-10 pb-5" id='mais'>
                <h2 className="font-bebas text-5xl text-primary">Veja Mais</h2>
                <p className="text-[12px] sm:text-[20px] bg-primary text-white rounded-4xl px-5">mais opções pra você escolher</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {cars.slice(0,4).map((_,i) => (
                    <div key={i} className="relative w-full h-50">
                        <Image 
                        src={_.href}
                        alt={_.name}
                        fill
                        loading="lazy"
                        className="object-cover  rounded-4xl"/>
                    </div>
                ))}
            </div>

            <h2 className="font-bebas text-5xl text-primary pt-10 pb-5" id="contatos">Contatos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10">
                <div className="flex gap-2 col-span-2">
                    {contact.map((_,i) => (
                        <a className="relative w-[75%] h-100 overflow-hidden hover:cursor-pointer" href={_.h} key={i} target="_blank">
                            <Image
                            src={_.s}
                            alt=""
                            fill
                            className="object-cover rounded-4xl"
                            loading="lazy"/>
                            {i === 0 && <><div className="absolute inset-0 bg-black/30 rounded-4xl"></div></>}
                            <div className="absolute bottom-10 p-2 w-full flex flex-col gap-y-3">
                                <p className={`text-[15px] leading-5 md:text-2xl ${i === 0 && "text-white"}`} >{_.p}</p>
                                <div className="flex justify-between p-2 rounded-4xl bg-white text-[12px] w-full">
                                    <p>Navegar</p>
                                    <p>{">"}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <a 
                href="https://maps.app.goo.gl/jJU8hpVXjfQgUrNZ8"
                className="relative w-full h-60 md:h-100 flex justify-center items-end hover:cursor-pointer" target="_blank">
                    <Image
                    src="/brazil.svg"
                    alt=""
                    fill
                    className="object-contain"
                    loading="lazy"/>
                    <p>Clique no Mapa</p>
                </a>
            </div>

        </div>
        </div>

        
        </>
    )
}
