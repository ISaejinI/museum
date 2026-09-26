"use client"

import { useRef } from "react";
import { useAnimation } from "@/_contexts/AnimationContext";

export default function Hero() {
    const heroRef = useRef(null);
    const heroImgRef = useRef(null);

    const { gsap, useGSAP } = useAnimation();

    useGSAP(() => {
        gsap.to(heroImgRef.current, {
            maskSize: "120% auto",
            scale: 1,
            objectFit: "cover",
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight * 3,
                scrub: true,
                pin: true,
            },
        });
    }, { scope: heroRef });


    return (
        <section className="relative bg-foreground" data-header-theme="dark" ref={heroRef}>
            <div className="h-screen w-screen">
                <img className="mask-[url(/jar_mask.svg)] mask-no-repeat mask-size-[10%_auto] mask-center h-full w-full object-cover scale-125" src="/paintings/LaPrimavera.jpg" alt="" ref={heroImgRef} />
            </div>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl w-full text-center text-background">Welcome to the Museum</h1>
        </section>
    );
}