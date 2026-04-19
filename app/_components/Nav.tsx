"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { baseURL } from "@/services/api"

export function Nav(){
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
            <div className="bg-bg-primary flex justify-center border-0  relative z-10 " id="inicio">
                <div className="flex max-w-widthGlobal w-full px-2 md:px-pxGloabl justify-between items-center py-3">
                    {/*<p className="font-grandHotel text-5xl text-secondary">marcos</p>*/}
                    <a href={`${baseURL}`}>
                    <Image
                    src='/favicon.png'
                    alt='Logo'
                    loading="lazy"
                    className="w-15 h-15"
                    width={100}
                    height={100}
                    />
                    </a>
                    <nav className="hidden md:flex">
                        <ul className="flex  gap-x-10 text-[17px]">
                            <li className="hover:text-primary hover:cursor-pointer"><a href={`${baseURL}/#inicio`}>Início</a></li>
                            <li className="hover:text-primary hover:cursor-pointer"><a href={`${baseURL}/#veiculos`}>Veículos</a></li>
                            <li className="hover:text-primary hover:cursor-pointer"><a href={`${baseURL}/#mais`}>Mais</a></li>
                            <li className="hover:text-primary hover:cursor-pointer"><a href={`${baseURL}/#contatos`}>Contatos</a></li>
                        </ul>
                    </nav>
        
                    
                    <div className="hidden md:flex gap-x-2">
                    {
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-primary w-10 h-10 rounded-4xl"></div>
                    ))}
                    </div>
        
                    <div className="hover:cursor-pointer md:hidden"  onPointerDown={() => setSwhoMenu(!showMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="60" height="60" viewBox="0 0 24 24" fill="black"><path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5zM20.25 7H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5zM20.25 18.5H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5z"/></svg>
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
                                
                                rounded-b-4xl
                                z-50
                            "
                            >     
                            <nav className="">
                            <ul className="flex flex-col  gap-x-10 text-[24px] text-white">
                                <li className="hover:cursor-pointer"><a href="#inicio">Inicio</a></li>
                                <li className="hover:cursor-pointer"><a href="#veiculos">Veículos</a></li>
                                <li className="hover:cursor-pointer"><a href="#mais">Mais</a></li>
                                <li className="hover:cursor-pointer"><a href="#contatos">Contatos</a></li>
                            </ul>
                            </nav>
                        </div>
                }        
            </div>
        </>
    )
} 