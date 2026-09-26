"use client";

import { useState, useRef, useEffect } from 'react'
import { usePathname } from "next/navigation";
import { useAnimation } from "@/_contexts/AnimationContext";
import { useStore } from "@/lib/store";
import AccountButton from "@/_components/accountButton";
import TransitionLink from "@/_components/transitionLink";

export default function NavBar() {
    const { gsap, useGSAP } = useAnimation();

    const [navDisplayed, setNavDisplayed] = useState(false);

    const navContainerRef = useRef(null);
    const navRef = useRef(null);
    const navImgContainerRef = useRef(null);
    const navImgRef = useRef(null);

    const closeInstantlyRef = useRef(false);

    const isPageCovered = useStore((state) => state.isPageCovered);

    const headerRef = useRef(null);
    const pathname = usePathname();
    const [sectionTheme, setSectionTheme] = useState("light");
    const [isScrolled, setIsScrolled] = useState(false);

    // Adapte la couleur du header à la section située sous lui (attribut data-header-theme)
    useEffect(() => {
        let frame = null;

        function update() {
            frame = null;
            const header = headerRef.current;
            if (!header) return;

            const elements = document.elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2);
            const section = elements
                .filter((element) => !header.contains(element))
                .map((element) => element.closest("[data-header-theme]"))
                .find(Boolean);

            setSectionTheme(section?.dataset.headerTheme ?? "light");
            setIsScrolled(window.scrollY > 16);
        }

        function requestUpdate() {
            if (frame === null) frame = requestAnimationFrame(update);
        }

        // Le contenu de la page peut changer sans scroll (streaming, loading.js, transitions)
        const resizeObserver = new ResizeObserver(requestUpdate);
        resizeObserver.observe(document.body);

        update();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [pathname]);

    useEffect(() => {
        if (!isPageCovered || !navDisplayed) return;

        closeInstantlyRef.current = true;
        setNavDisplayed(false);
    }, [isPageCovered]);

    useGSAP(() => {
        if (navDisplayed == true) {
            const navItems = gsap.utils.toArray(navRef.current.querySelectorAll("a"));

            gsap.set(navImgContainerRef.current, { clipPath: "inset(0 0% 100% 0)", opacity: 1 });
            gsap.set(navImgRef.current, { scale: 1.2 });
            gsap.set(navContainerRef.current, { display: "flex", opacity: 1, x: "200%" });
            navItems.forEach((item) => {
                gsap.set(item, { opacity: 1, y: '100%' });
            });

            const tl = gsap.timeline();
            tl.to(navContainerRef.current, {
                x: 0,
                duration: 0.6,
                ease: "power3.out",
            })
            tl.to(navImgContainerRef.current, {
                clipPath: "inset(0 0% 0% 0)",
                duration: 0.5,
                ease: "power2.out",
            })
            tl.to(navImgRef.current, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            }, "<");            
            tl.to(navItems, {
                y: '0%',
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.2
            }, "<");

        } else if (closeInstantlyRef.current) {
            closeInstantlyRef.current = false;

            gsap.killTweensOf(navContainerRef.current);
            gsap.set(navContainerRef.current, { x: "200%", display: "none" });

        } else {
            const tl = gsap.timeline();
            tl.to(navContainerRef.current, {
                x: "200%",
                duration: 0.6,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(navContainerRef.current, { display: "none" });
                }
            })
        }
    }, { scope: navContainerRef, dependencies: [navDisplayed] });

    const isDark = navDisplayed || sectionTheme === "dark";

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 z-50 flex w-screen items-center justify-between px-8 transition-[padding,color,background-color] duration-500 lg:px-16 ${isScrolled ? "py-4" : "py-8"} ${isDark ? "text-background" : "text-foreground"} ${isScrolled && !isDark ? "bg-background/85 backdrop-blur-md" : "bg-transparent"}`}
            >
                <TransitionLink href="/" aria-label="Artheca - Accueil">
                    <img
                        src="/logo.png"
                        alt=""
                        className={`h-auto transition-[width,filter] duration-500 ${isScrolled ? "w-20" : "w-28"} ${isDark ? "invert" : ""}`}
                    />
                </TransitionLink>

                <div className="flex items-center gap-8 lg:gap-12">
                    <AccountButton isDark={isDark} />
                    <button
                        type="button"
                        onClick={() => setNavDisplayed(!navDisplayed)}
                        aria-expanded={navDisplayed}
                        aria-label={navDisplayed ? "Fermer le menu" : "Ouvrir le menu"}
                        className="group flex cursor-pointer items-center gap-4 text-xs uppercase tracking-widest"
                    >
                        <span className="hidden transition-colors group-hover:text-(--hightlight-orange) lg:inline">{navDisplayed ? "Fermer" : "Menu"}</span>
                        <span className="relative block h-3 w-9" aria-hidden="true">
                            <span className={`absolute right-0 h-px w-9 bg-current transition-all duration-500 ${navDisplayed ? "top-1/2 rotate-45" : "top-0"}`} />
                            <span className={`absolute right-0 h-px bg-current transition-all duration-500 ${navDisplayed ? "top-1/2 w-9 -rotate-45" : "top-full w-6 group-hover:w-9"}`} />
                        </span>
                    </button>
                </div>
            </header>

            <div className="fixed top-0 left-0 z-49 hidden h-screen w-screen items-center justify-between bg-(--secondary-bg) px-16 pt-16 opacity-0" ref={navContainerRef}>
                <nav>
                    <ul ref={navRef} className="flex flex-col gap-16 font-rosarivo">
                        <li className="overflow-hidden"><TransitionLink href="/" className="block text-8xl text-background hover:text-(--hightlight-orange) transition-colors duration-500 opacity-0 leading-normal"><span className="text-4xl">01</span> Accueil</TransitionLink></li>
                        <li className="overflow-hidden"><TransitionLink href="/paintings" className="block text-8xl text-background hover:text-(--hightlight-orange) transition-colors duration-500 opacity-0 leading-normal"><span className="text-4xl">02</span> Peintures</TransitionLink></li>
                        <li className="overflow-hidden"><TransitionLink href="/about" className="block text-8xl text-background hover:text-(--hightlight-orange) transition-colors duration-500 opacity-0 leading-normal"><span className="text-4xl">03</span> À propos</TransitionLink></li>
                        <li className="overflow-hidden"><TransitionLink href="/tickets" className="block text-8xl text-background hover:text-(--hightlight-orange) transition-colors duration-500 opacity-0 leading-normal"><span className="text-4xl">04</span> Billetterie</TransitionLink></li>
                    </ul>
                </nav>
                <div ref={navImgContainerRef} className="h-full flex flex-col justify-center opacity-0">
                    <figure className="h-3/4 overflow-hidden">
                        <img className="h-full" src="/paintings/SaturnoDevorandoASuHijo.jpg" alt="Peinture mise en avant" ref={navImgRef} />
                    </figure>
                    <p className="font-rosarivo text-sm text-background pt-4">Saturne dévorant un de ses fils</p>
                    <p className="text-xs text-background opacity-60">Francisco de Goya - 1820</p>
                </div>
            </div>
        </>
    )
}
