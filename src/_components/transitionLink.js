"use client";

import NextLink from "next/link";
import { useStore } from "@/lib/store";
import { usePathname } from "next/navigation";

export default function TransitionLink({ href, children, ...props }) {
    const { setDestinationUrl, setIsTransitionActive } = useStore();
    const pathname = usePathname();

    return (
        <NextLink href={href} {...props} onClick={(e) => {
            e.preventDefault();
            if (href === pathname) return;
            setDestinationUrl(href);
            setIsTransitionActive(true);
        }}>
            {children}
        </NextLink>
    )
}