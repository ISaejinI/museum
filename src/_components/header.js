"use client";

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState, useRef } from 'react'
import { useAnimation } from "@/_contexts/AnimationContext";

export default function NavBar() {
    const { gsap, useGSAP } = useAnimation();

    const [navDisplayed, setNavDisplayed] = useState(false);

    const navContainerRef = useRef(null);
    const navRef = useRef(null);
    const navImgContainerRef = useRef(null);
    const navImgRef = useRef(null);
    
    useGSAP(() => {
        if (navDisplayed == true) {
            const navItems = gsap.utils.toArray(navRef.current.querySelectorAll("a"));

            gsap.set(navImgContainerRef.current, { clipPath: "inset(0 0% 100% 0)", opacity: 1 });
            gsap.set(navImgRef.current, { scale: 1.2 });
            gsap.set(navContainerRef.current, { display: "flex", opacity: 1, x: "200%" });
            navItems.forEach((item) => {
                gsap.set(item, { opacity: 1, y: '-100%' });
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

    return (
        <>
            <header className="flex items-center justify-between z-50">
                <img src="/logo.png" alt="Logo" />
                <button onClick={() => setNavDisplayed(!navDisplayed)}>
                    {navDisplayed ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </button>
            </header>

            <div className={`absolute top-0 left-0 w-screen h-screen opacity-0 hidden bg-amber-950 flex items-center justify-between px-16 pt-16 z-49`} ref={navContainerRef}>
                <nav>
                    <ul ref={navRef} className="flex flex-col gap-16 font-(family-name:--font-rosarivo)">
                        <li className="overflow-hidden"><a href="/" className="block text-8xl text-amber-200 hover:text-amber-50 opacity-0 leading-normal"><span className="text-4xl">01</span> Accueil</a></li>
                        <li className="overflow-hidden"><a href="/paintings" className="block text-8xl text-amber-200 hover:text-amber-50 opacity-0 leading-normal"><span className="text-4xl">02</span> Peintures</a></li>
                        <li className="overflow-hidden"><a href="/about" className="block text-8xl text-amber-200 hover:text-amber-50 opacity-0 leading-normal"><span className="text-4xl">03</span> À propos</a></li>
                        <li className="overflow-hidden"><a href="/tickets" className="block text-8xl text-amber-200 hover:text-amber-50 opacity-0 leading-normal"><span className="text-4xl">04</span> Billetterie</a></li>
                    </ul>
                </nav>
                <div ref={navImgContainerRef} className="h-full flex flex-col justify-center opacity-0">
                    <figure className="h-3/4 overflow-hidden">
                        <img className="h-full" src="/paintings/SaturnoDevorandoASuHijo.jpg" alt="Peinture mise en avant" ref={navImgRef} />
                    </figure>
                    <p className="text-xs">Saturne dévorant un de ses fils</p>
                    <p className="text-xs">Francisco de Goya - 1820</p>
                </div>
            </div>
        </>
    )
}


// Animations : 
// Toggle -> morph
// Fond qui sort de la droite
// Img -> Dézoom et rideau qui tombe
// Texte -> Apparaît du bas vers le haut sans dépasser sa div