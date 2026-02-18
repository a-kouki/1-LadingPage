import Image from "next/image"

export function Section(){

    const specialImg = [
        {s:"/1.png"},
        {s:"/2.png"},
        {s:"/3.png"},
        {s:"/section_1.png"},
    ]

    const contact = [
        {s:"/1_1.png", p:"Fique por dentro das Promoções e Novidades!!",h:""},
        {s:"/Instagram.svg", p:"Siga no Instagram", h:"https://www.instagram.com/marcos_pokone01/"},
        {s:"/whatsapp.svg", p:"Me contate pelo WhatsApp", h:""},
    ]

    const cars = [
    { name: "VW/POLO Confortline", year: "2023/24", type:"flex", price: "R$ 95.990,00", href:"/cars/VW POLO Confortline.jpg" },
    { name: "Uno Attractive 1.0", year: "2021", type:"flex", price: "R$ 53.999,00",href:"/cars/Uno Attractive 1.0.jpg" },
    { name: "HYUNDAI HB20S", year: "2016", type:"flex", price: "R$ 72.990,00",href:"/cars/HYUNDAI HB20S.jpeg"},
    { name: "FIAT STRADA", year: "2019/2020",type:"flex", price: "R$ 61.990,00",href:"/cars/FIAT STRADA.jpeg" },
    { name: "CHEVROLET ONIX", year: "2022/2023",type:"", price: "R$ 75.990,00", href:"/cars/CHEVROLET ONIX.jpeg" },
    { name: "CHEVROLET CORSA", year: "2009/2010",type:"", price: "R$ 32.990,00",href:"/cars/CHEVROLET CORSA.jpeg" },
    ];

    return(
        <>
        <div className="flex justify-center bg-bg-primary w-full pt-10">
        <h2 className="flex justify-center text-4xl sm:text-5xl md:text-5xl  pb-3 font-oswald px-2">
            MARCOS SOUZA - RONDONÓPOLIS
        </h2>
        </div>
        <div className="flex justify-center flex-row bg-bg-primary">
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

        <div className="overflow-hidden bg-bg-primary">
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

        <div className="flex justify-center bg-bg-primary" id="veiculos">
        <div className="px-2 md:px-pxGloabl max-w-widthGlobal w-full">
          <h2 className="font-bebas text-5xl text-primary">Destaques</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 mt-6">
            {cars.map((_,i) => (
              <a key={i} className="flex flex-col hover:cursor-pointer" target="_blank" href="
              https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0
              ">
                <div className="relative w-full sm:w-full h-70">
                  <Image
                    src={_.href}
                    alt={_.name}
                    loading="lazy"
                    className="rounded-4xl object-cover"
                    fill
                  />
                </div>

                  <p className="font-bold text-[18px]">{_.name}</p>
                  <p>{_.year}</p>
              </a>
            ))}
          </div>
        </div>
        </div>

        <div className="flex justify-center pt-10 bg-bg-primary">
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