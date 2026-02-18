"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function Header(){

    const [showMenu, setSwhoMenu] = useState(false)

    const menuref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleOutMenu(e: PointerEvent){
            if(menuref.current && !menuref.current.contains(e.target as Node)){
                setSwhoMenu(false)
            }
        }

        if(showMenu){
        document.addEventListener("pointerdown", handleOutMenu);
        }
    
        return () => {
        document.removeEventListener("pointerdown", handleOutMenu)
        };
    },[showMenu])
    return (
    <>
    <p className="bg-primary flex justify-center text-white px-2 overflow-x-hidden">Atendimento: Segunda a Sexta 08h às 18h • Sábado 08h às 12h</p>
    <div className="bg-bg-primary flex justify-center border-0 md:border-b relative z-10 " id="inicio">
        <div className="flex max-w-widthGlobal w-full px-2 md:px-pxGloabl justify-between items-center py-3">
            {/*<p className="font-grandHotel text-5xl text-secondary">marcos</p>*/}
            <Image
            src='/favicon.png'
            alt='Logo'
            loading="lazy"
            className="w-15 h-15"
            width={100}
            height={100}
            />
            <nav className="hidden md:flex">
                <ul className="flex  gap-x-10 text-[17px]">
                    <li className="hover:text-primary hover:cursor-pointer"><a href="#inicio">Início</a></li>
                    <li className="hover:text-primary hover:cursor-pointer"><a href="#veiculos">Veículos</a></li>
                    <li className="hover:text-primary hover:cursor-pointer"><a href="#mais">Mais</a></li>
                    <li className="hover:text-primary hover:cursor-pointer"><a href="#contatos">Contatos</a></li>
                </ul>
            </nav>

            
            <div className="hidden md:flex gap-x-2">
            {
            [...Array(3)].map((_, i) => (
                <div key={i} className="bg-primary w-10 h-10 rounded-4xl"></div>
            ))}
            </div>

            <div className="hover:cursor-pointer md:hidden"  onPointerDown={() => setSwhoMenu(!showMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="60" height="60" viewBox="0 0 24 24" fill="#5c899d"><path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5zM20.25 7H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5zM20.25 18.5H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5z"/></svg>
            </div>
        </div>

        {showMenu &&
                <div
                    ref={menuref}
                    className="
                    md:hidden
                        absolute
                        top-full
                        left-1/2
                        -translate-x-1/2
                        w-full
                        max-w-300
                        bg-primary
                        px-10
                        py-10
                        border-x
                        border-b
                        rounded-b-4xl
                        z-50
                    "
                    >     
                    <nav className="">
                    <ul className="flex flex-col  gap-x-10 text-[24px]">
                        <li className="hover:text-white hover:cursor-pointer"><a href="#inicio">Inicio</a></li>
                        <li className="hover:text-white hover:cursor-pointer"><a href="#veiculos">Veículos</a></li>
                        <li className="hover:text-white hover:cursor-pointer"><a href="#mais">Mais</a></li>
                        <li className="hover:text-white hover:cursor-pointer"><a href="#contatos">Contatos</a></li>
                    </ul>
                    </nav>
                </div>
            }        
    </div>
    
    <div className=" bg-bg-primary flex justify-center pt-0 sm:pt-10 pb-10 px-2 md:px-pxGloabl">
        <div className="relative max-w-widthGlobal w-full h-100 ">
            {/*
            <Image 
            src="/hero.png"
            alt=""
            fill
            priority
            className="
                object-cover
                rounded-tr-[100px] sm:rounded-tr-[150px]
                rounded-bl-[100px] sm:rounded-bl-[150px]
                rounded-tl-[15px]
                rounded-br-[15px]
            "
            />*/}

            <video 
            src="/video_2.mp4"
            poster="/hero_1.png"
            preload="metadata"
            playsInline
            muted
            autoPlay
            loop
            className="
                w-full
                h-full
                object-cover
                rounded-tr-[100px] sm:rounded-tr-[150px]
                rounded-bl-[100px] sm:rounded-bl-[150px]
                rounded-tl-[15px]
                rounded-br-[15px]
            "
            />

            <div
            className="
                absolute inset-0
                bg-linear-to-b from-black/50 to-primary/70
                rounded-tr-[100px] sm:rounded-tr-[150px]
                rounded-bl-[100px] sm:rounded-bl-[150px]
                rounded-tl-[15px]
                rounded-br-[15px]
            "
            />

            <div
            className="
                absolute inset-0
                flex flex-col
                items-center justify-center
                text-white
                px-6 sm:px-20
                text-center
            "
            >
            <h1 className="text-3xl sm:text-4xl font-bebas max-w-[600px]">
                O carro dos seus sonhos está aqui
            </h1>

            <p className="italic mt-3 max-w-[550px]">
                Seu próximo carro está a um clique de distância
            </p>

            <div className="flex gap-x-3 sm:gap-x-10 items-center pt-8 text-[15px]">
                <a href="#veiculos" className="bg-secondary text-black px-7 sm:px-10 py-1 rounded-4xl hover:cursor-pointer">
                veículos
                </a>

                <a
                href="https://www.whatsapp.com/catalog/556699333085/?app_absent=0&utm_source=ig" 
                target="_blank"
                className="font-bold border border-secondary text-secondary px-7 py-1 rounded-4xl hover:cursor-pointer hover:text-white hover:border-white hover:bg-secondary">
                simular financiamento
                </a>
            </div>
            </div>

        </div>
    </div>

    <div className="bg-primary text-white">
        <div className="flex justify-center gap-x-5 sm:gap-x-20 py-1">
            <div className="flex flex-col items-center">
                <svg width="48" height="48" version="1.1" id="light" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                        viewBox="0 0 24 24">
                    <g>
                        <path d="M14.5,15.2c-0.5,0-1-0.2-1.3-0.5l-1-1c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l1,1c0.3,0.3,0.9,0.3,1.3,0
                            c0.4-0.4,0.4-0.9,0-1.3l-3-3c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l3,3c0.7,0.7,0.7,1.9,0,2.7C15.5,15,15,15.2,14.5,15.2z"/>
                    </g>
                    <g>
                        <path d="M3.5,8.5C3.3,8.5,3.1,8.4,3,8.2c-0.1-0.3,0-0.5,0.3-0.7l4.3-1.8c0.9-0.4,2-0.2,2.7,0.5l0.6,0.6c0.2,0.2,0.2,0.5,0,0.7
                            s-0.5,0.2-0.7,0L9.6,7C9.2,6.6,8.5,6.5,8,6.7L3.7,8.5C3.6,8.5,3.6,8.5,3.5,8.5z"/>
                    </g>
                    <g>
                        <path d="M10.8,10.5c-0.5,0-0.9-0.2-1.3-0.5C9.1,9.5,8.9,8.9,9,8.3C9.1,7.7,9.4,7.2,10,7l3.5-1.7c0.7-0.3,1.4-0.4,2.1-0.1l5.2,2.1
                            c0.3,0.1,0.4,0.4,0.3,0.7c-0.1,0.3-0.4,0.4-0.7,0.3l-5.2-2.1c-0.4-0.2-0.9-0.2-1.2,0l-3.5,1.7C10.2,8,10,8.2,10,8.5
                            c0,0.3,0,0.5,0.2,0.7c0.3,0.3,0.7,0.3,1,0.2l3.1-1.6c0.2-0.1,0.5,0,0.7,0.2c0.1,0.2,0,0.5-0.2,0.7l-3.1,1.6
                            C11.4,10.4,11.1,10.5,10.8,10.5z"/>
                    </g>
                    <g>
                        <path d="M12.5,17.1c-0.5,0-1-0.2-1.3-0.6l-1.3-1.3c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l1.3,1.3c0.3,0.3,0.9,0.3,1.3,0
                            s0.3-0.9,0-1.3l-1-1c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l1,1c0.7,0.7,0.7,1.9,0,2.7C13.5,16.9,13,17.1,12.5,17.1z"/>
                    </g>
                    <g>
                        <path d="M10.3,18.9c-0.5,0-0.9-0.2-1.3-0.5l-2.3-2.1c-0.9-0.8-2-1.2-3.2-1.2C3.2,15,3,14.8,3,14.5S3.2,14,3.5,14
                            c1.4,0,2.8,0.5,3.9,1.5l2.3,2.1c0.4,0.3,0.9,0.3,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-1-1c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l1,1
                            c0.7,0.7,0.7,1.9,0,2.7C11.3,18.7,10.8,18.9,10.3,18.9z"/>
                    </g>
                    <g>
                        <path d="M18.1,15.5c-0.3,0-0.5,0-0.8-0.1l-1.9-0.6c-0.3-0.1-0.4-0.4-0.3-0.6c0.1-0.3,0.4-0.4,0.6-0.3l1.9,0.6
                            c0.5,0.2,1.1,0.1,1.5-0.3l1.1-1c0.2-0.2,0.5-0.2,0.7,0c0.2,0.2,0.2,0.5,0,0.7l-1.1,1C19.2,15.3,18.6,15.5,18.1,15.5z"/>
                    </g>
                    <g>
                        <path d="M23.5,16h-3c-0.3,0-0.5-0.2-0.5-0.5v-9C20,6.2,20.2,6,20.5,6h3C23.8,6,24,6.2,24,6.5v9C24,15.8,23.8,16,23.5,16z M21,15h2
                            V7h-2V15z"/>
                    </g>
                    <g>
                        <path d="M3.5,16h-3C0.2,16,0,15.8,0,15.5v-9C0,6.2,0.2,6,0.5,6h3C3.8,6,4,6.2,4,6.5v9C4,15.8,3.8,16,3.5,16z M1,15h2V7H1V15z"/>
                    </g>
                    </svg>
                <p>Confiança</p>
            </div>
            <div className="flex flex-col items-center">
                
                <svg width="48" height="48"  version="1.1" id="_x31__px" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	                viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                <g>
                    <path d="M19.5,21h-17C1.122,21,0,19.878,0,18.5v-1C0,15.57,1.57,14,3.5,14h10.35c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H3.5
                        C2.122,15,1,16.122,1,17.5v1C1,19.327,1.673,20,2.5,20h17c0.827,0,1.5-0.673,1.5-1.5v-1c0-0.626-0.233-1.223-0.657-1.681
                        c-0.188-0.203-0.175-0.519,0.028-0.707c0.201-0.188,0.519-0.176,0.707,0.028C21.672,15.784,22,16.622,22,17.5v1
                        C22,19.878,20.878,21,19.5,21z"/>
                </g>
                <g>
                    <path d="M2,24c-1.103,0-2-0.897-2-2v-3.5C0,18.224,0.224,18,0.5,18S1,18.224,1,18.5V22c0,0.551,0.449,1,1,1s1-0.449,1-1v-1.5
                        C3,20.224,3.224,20,3.5,20S4,20.224,4,20.5V22C4,23.103,3.103,24,2,24z"/>
                </g>
                <g>
                    <path d="M20,24c-1.103,0-2-0.897-2-2v-1.5c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V22c0,0.551,0.449,1,1,1s1-0.449,1-1v-3.5
                        c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V22C22,23.103,21.103,24,20,24z"/>
                </g>
                <g>
                    <path d="M2.5,15c-0.064,0-0.129-0.012-0.192-0.039c-0.255-0.106-0.375-0.399-0.269-0.654l1.99-4.77C4.42,8.604,5.323,8,6.33,8h3.39
                        c0.276,0,0.5,0.224,0.5,0.5S9.997,9,9.72,9H6.33C5.736,9,5.183,9.371,4.952,9.923l-1.99,4.77C2.881,14.884,2.695,15,2.5,15z"/>
                </g>
                <g>
                    <path d="M6.5,18h-3C3.224,18,3,17.776,3,17.5S3.224,17,3.5,17h3C6.776,17,7,17.224,7,17.5S6.776,18,6.5,18z"/>
                </g>
                <g>
                    <path d="M18.5,18h-3c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h3c0.276,0,0.5,0.224,0.5,0.5S18.776,18,18.5,18z"/>
                </g>
                <g>
                    <path d="M18,14c-0.066,0-0.132-0.013-0.194-0.04C17.568,13.861,12,11.454,12,6.536V2.357c0-0.214,0.137-0.405,0.34-0.474l5.5-1.857
                        c0.104-0.035,0.216-0.035,0.32,0l5.5,1.857C23.863,1.952,24,2.143,24,2.357v4.179c0,4.918-5.568,7.325-5.806,7.425
                        C18.132,13.987,18.066,14,18,14z M13,2.716v3.82c0,3.785,4.055,5.958,5,6.414c0.944-0.457,5-2.638,5-6.414v-3.82l-5-1.688L13,2.716
                        z"/>
                </g>
                <g>
                    <path d="M17.5,9c-0.009,0-0.019,0-0.028-0.001c-0.142-0.008-0.274-0.076-0.363-0.187l-2-2.5c-0.172-0.216-0.137-0.53,0.078-0.703
                        c0.216-0.173,0.53-0.137,0.703,0.078l1.651,2.064l3.105-3.105c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707l-3.5,3.5
                        C17.76,8.948,17.632,9,17.5,9z"/>
                </g>
                </svg>

                <p>Garantia</p>
            </div>
            <div className="flex flex-col items-center">

                <svg width="48" height="48" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                <path className="cls-1" d="M10.5,1C5.25,1,1,5.25,1,10.5s4.25,9.5,9.5,9.5,9.5-4.25,9.5-9.5S15.75,1,10.5,1ZM0,10.5C0,4.7,4.7,0,10.5,0s10.5,4.7,10.5,10.5-4.7,10.5-10.5,10.5S0,16.3,0,10.5Z"/>
                <path className="cls-1" d="M10.5,7c-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5Zm-4.5,3.5c0-2.49,2.01-4.5,4.5-4.5s4.5,2.01,4.5,4.5-2.01,4.5-4.5,4.5-4.5-2.01-4.5-4.5Z"/>
                <path className="cls-1" d="M7.48,8.35c.08,.26-.07,.54-.33,.62L.65,10.98c-.26,.08-.54-.07-.62-.33-.08-.26,.07-.54,.33-.62l6.5-2c.26-.08,.54,.07,.62,.33ZM.5,13.5c0-.28,.22-.5,.5-.5H7.5c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H1c-.28,0-.5-.22-.5-.5Z"/>
                <path className="cls-1" d="M13.52,8.35c-.08,.26,.07,.54,.33,.62l6.5,2c.26,.08,.54-.07,.62-.33,.08-.26-.07-.54-.33-.62l-6.5-2c-.26-.08-.54,.07-.62,.33Zm6.98,5.15c0-.28-.22-.5-.5-.5h-6.5c-.28,0-.5,.22-.5,.5s.22,.5,.5,.5h6.5c.28,0,.5-.22,.5-.5Z"/>
                <path className="cls-1" d="M8.46,13.5c.28-.02,.52,.18,.54,.46l.5,6c.02,.28-.18,.52-.46,.54-.28,.02-.52-.18-.54-.46l-.5-6c-.02-.28,.18-.52,.46-.54Zm4.08,0c.28,.02,.48,.26,.46,.54l-.5,6c-.02,.28-.26,.48-.54,.46-.28-.02-.48-.26-.46-.54l.5-6c.02-.28,.26-.48,.54-.46Z"/>
                </svg>

                <p>Teste Drive</p>
            </div>
        </div>
    </div>

         
    


    </>)
}
