import Image from "next/image"
export function Contact(){

    const year = new Date().getFullYear()
    return (
        <>
        <div className="flex justify-center bg-primary">
            <div className="flex flex-col px-2 md:px-pxGloabl max-w-widthGlobal w-full text-white pt-20 text-2xl">
                <div className="flex flex-col md:flex-row items-center md:justify-between pb-10 gap-y-10 md:gap-y-0">
                    <div className="flex flex-col items-center">
                    {/*<p className="text-secondary font-grandHotel text-7xl"> Creamery</p>*/}
                    <Image
                        src='/favicon.png'
                        alt='Logo'
                        loading="lazy"
                        className="w-30 h-30"
                        width={100}
                        height={100}
                        />
                    <p className="text-[18px]">Seu próximo carro começa aqui.</p>
                    </div>

                    <div className="flex gap-x-10">
                        <nav>
                            <ul className="flex flex-col gap-y-3">
                                <li><a href="#inicio">Inicio</a></li>
                                <li><a href="#veiculos">Veículos</a></li>
                                <li><a href="#mais">Mais</a></li>
                                <li><a href="#contatos">Contatos</a></li>
                            </ul>
                        </nav>

                        <div className="flex flex-col items-end text-[15px] md:text-2xl">
                            <p>marcossouzamarcosr@gmail.com</p>
                            <p>66 9933-3085</p>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <a href="https://koukiwebservice.com" target="_blank" className="hover:cursor-pointer">
                <p className="flex w-full justify-end text-[15px] py-5">@{year}. kouki web service</p>
                </a>
            </div>
        </div>
        </>
    )
}