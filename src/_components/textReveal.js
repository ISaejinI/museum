"use client";

import { useRef } from "react";
import { useAnimation } from "@/_contexts/AnimationContext";
import { useStore } from "@/lib/store";

const SPLIT_TYPES = {
    lines: { type: "lines", mask: "lines" },
    words: { type: "words", mask: "words" },
    chars: { type: "words,chars", mask: "chars" },
};

export default function TextReveal({
    children,
    as: Tag = "div",
    by = "lines",
    onScroll = true,
    start = "top 85%",
    duration = 1.2,
    stagger = 0.1,
    delay = 0,
    className = "",
}) {
    const { gsap, SplitText, useGSAP } = useAnimation();
    const containerRef = useRef(null);

    const isReady = useStore((state) => !state.isFirstLoad && !state.isPageCovered && !state.isTransitionActive);

    useGSAP(() => {
        const container = containerRef.current;

        if (!isReady) {
            gsap.set(container, { autoAlpha: 0 });
            return;
        }

        gsap.set(container, { autoAlpha: 1 });

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        SplitText.create(container, {
            ...SPLIT_TYPES[by],
            autoSplit: true,
            onSplit: (self) => gsap.from(self[by], {
                yPercent: 110,
                duration,
                stagger,
                delay,
                ease: "expo.out",
                scrollTrigger: onScroll ? { trigger: container, start, once: true } : undefined,
            }),
        });
    }, { scope: containerRef, dependencies: [isReady] });

    return (
        <Tag ref={containerRef} className={className}>
            {children}
        </Tag>
    );
}
