'use client';
import { useEffect, useState } from "react";
import { UseEmblaCarouselType } from "embla-carousel-react";

type ProgressProps = {
    emblaApi: UseEmblaCarouselType | undefined
    total:number;
}

export default function ProgressBar({emblaApi, total} : ProgressProps) {
    const [progress, setProgess] = useState(0)

    useEffect(()=>{
        //if no emblaApi, do nothing
        if(!emblaApi) return;

        const updateBar = ()=>{
            const currentIndex = emblaApi.selectedScrollSnap()
            const bar = ((currentIndex+1)/total) * 100
            setProgess 
        }

        updateBar()
        emblaApi.on("select", updateBar);

        return ()=>{
            emblaApi.off("select", updateBar)
        }
        
    },[emblaApi, total])
    return 
}