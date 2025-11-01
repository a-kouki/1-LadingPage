"use client"
import Image from "next/image";
import Logo from "../../../public/Group 39.svg"
import { useStaggeredMenu } from "./_reactsbits/useStaggeredMenu";
import { StaggeredMenuPanel } from "./_reactsbits/StaggeredMenuPanel";
import { StaggeredMenuToggle } from "./_reactsbits/StaggeredMenuToggle";
import "./_reactsbits/StaggeredMenu.css"

export default function Navbar() {
  const { open, toggleMenu, panelRef, preLayersRef } = useStaggeredMenu('right', '#fff');

    const menuItems = [
    { label: "INÍCIO", ariaLabel: "Go to home page", link: "#inicio" },
    { label: "CARROS", ariaLabel: "Learn about us", link: "#carros" },
    { label: "CONTATOS", ariaLabel: "View our services", link: "#contatos" },
    { label: "SOBRE", ariaLabel: "Get in touch", link: "#sobre" },
  ];

  const socialItems = [
    { label: "Instagram", link: "https://www.instagram.com/marcos_pokone01/" },
    { label: "Whatsapp", link: "https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0" },
  ];

      
  return (
    <>
    <nav className="relative flex justify-between items-center m-auto px-10 py-4 bg-black text-white max-w-6xl">
      <Image
      src={Logo}
      alt="marcos veículos"
      width={150}
      height={150}
      priority
        />
    
    <div className="hidden md:flex items-center gap-10">
        <ul className="hidden md:flex gap-6 text-sm font-semibold">
        {menuItems.map((n, i) => (
            <li key={i}>
            <a href={n.link} className="hover:text-red-500 transition">
                {n.label}
            </a>
            </li>
       )) }
      </ul>
      
      <a 
      href="https://api.whatsapp.com/send/?phone=556699333085&text=Ol%C3%A1%21+Vim+do+seu+site+e+gostaria+de+saber+mais+sobre+os+carros&type=phone_number&app_absent=0"
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-block">
      <button className="bg-[#A20400] border border-[#FF4D00] text-white px-4 py-2 rounded text-sm font-semibold hover:cursor-pointer">
        
        Fale Comigo
      </button>
      </a>
    </div>

    <StaggeredMenuToggle open={open} toggleMenu={toggleMenu}/>
    </nav>

     <StaggeredMenuPanel
        open={open}
        panelRef={panelRef}
        preLayersRef={preLayersRef}
        items={menuItems}
        socialItems={socialItems}
        displaySocials
      />

    </>
  );
}
