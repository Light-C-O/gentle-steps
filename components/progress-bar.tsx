'use client';
import { useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

type ProgressProps = {
    emblaApi: EmblaCarouselType | undefined
    total:number;
}

export default function ProgressBar({emblaApi, total} : ProgressProps) {
    // Stores the current progress percentage (0 → 100), start from 0 by default
    const [progress, setProgess] = useState(0)

    useEffect(()=>{
        //if no embla there, do nothing
        if(!emblaApi) return;

        //to calculate and update the bar
        const updateBar = ()=>{
            //the current slide
            const currentIndex = emblaApi.selectedScrollSnap()
            //conver indext to %, +1 is to make it start at 1, since index starts at 0
            const bar = ((currentIndex+1)/total) * 100

            //update
            setProgess(bar)
        }

        updateBar()
        //listernr, check if slide changes
        emblaApi.on("select", updateBar);

        return ()=>{
            //removes the old listener before attching a new one
            emblaApi.off("select", updateBar)
        }
        
    },[emblaApi, total])
    return (
        <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-full bg-blue-500 transition-all duration-300"
            //the width is controlled by progress state 
            style={{width:`${progress}%`}}></div>
        </div>
    )
}