"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const AnimationContext = createContext(null);

export function AnimationProvider({ children }) {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            lerp: 0.07,
            anchors: true,
            autoRaf: false
        });

        lenisInstance.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        setLenis(lenisInstance);

        return () => {
            gsap.ticker.remove((time) => {
                lenisInstance.raf(time * 1000);
            });
            lenisInstance.destroy();
            setLenis(null);
        }
    }, []);

    return (
        <AnimationContext.Provider value={{ gsap, ScrollTrigger, lenis }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  return context;
}