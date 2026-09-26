"use client";

import { useRef } from "react";
import { useAnimation } from "@/_contexts/AnimationContext";
import { useStore } from "@/lib/store";
import TextReveal from "@/_components/textReveal";

export default function PaintingHero({ painting }) {
    const { gsap, useGSAP } = useAnimation();

    const heroRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const metaRef = useRef(null);

    const isReady = useStore((state) => !state.isFirstLoad && !state.isPageCovered && !state.isTransitionActive);

    useGSAP(() => {
        if (!isReady) {
            gsap.set(imageWrapperRef.current, { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 0 });
            gsap.set(metaRef.current, { autoAlpha: 0 });
            return;
        }

        gsap.timeline()
            .to(imageWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.4, ease: "expo.inOut" })
            .fromTo(imageRef.current, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "expo.out" }, "<0.2")
            .to(metaRef.current, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");

        gsap.to(imageRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, { scope: heroRef, dependencies: [isReady] });

    return (
        <section ref={heroRef} className="header-spacer relative flex h-screen flex-col items-center justify-end px-8 pb-12">
            <div ref={imageWrapperRef} className="invisible relative flex min-h-0 w-full flex-1 justify-center overflow-hidden">
                <img
                    ref={imageRef}
                    src={painting.image}
                    alt={painting.title}
                    className="h-full w-auto max-w-full object-contain shadow-[0_24px_40px_-12px_rgba(21,12,12,0.45)]"
                />
            </div>

            <div className="relative z-10 flex w-full flex-col items-center pt-8 text-center container">
                <TextReveal as="h1" by="words" onScroll={false} stagger={0.08} className="max-w-6xl text-6xl leading-[1.15] lg:text-8xl">
                    {painting.title}
                </TextReveal>
                <p ref={metaRef} className="invisible pt-4 text-xs uppercase tracking-widest">
                    <span>{painting.artist}</span>
                    <span className="px-3 text-(--hightlight-orange)">—</span>
                    <span>{painting.year}</span>
                </p>
            </div>
        </section>
    );
}
