import { getRationclass } from "../lib/ratio";
import Image from "next/image"
import { api, baseURL } from "@/services/api"

import { CarImgCoudinary } from '../ui/CarImageCloudinary';

type Car = {
  name: string; src: string; year: string; price: string; href: string;
  info: string[]; ratio: string; description: string; public_id: string;
  brand: string; category: string; inStock: string;
}

async function load(): Promise<Car[]> {
  try {
    const res = await fetch(`${baseURL}/api/cars`, {
      //{cache: 'force-cache'}
      next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return [] 
  }
}


export async function OtherProducts(){
    const cars = await load()
    //const [cars, setCars] = useState<Car[]>([])
    
  
    
    return(
        <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cars.slice(-4).map((car,i) => (
                <div key={i} className="relative w-full h-50">
                    {/* 
                    <Image 
                    src={car.href}
                    alt={car.name}
                    fill
                    loading="lazy"
                    className="object-cover  rounded-4xl"/>
                    */}
                    {car.public_id ? 
                    <CarImgCoudinary
                      public_id={car.public_id} 
                      name={car.name}
                      clas={`object-cover rounded-4xl`}
                    />
                    : 
                    <Image
                      src={`/favicon.png`}
                      alt="Marcos Veículos"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    }
                </div>
            ))}
        </div>
        </>
    )
}