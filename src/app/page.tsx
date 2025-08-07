"use client";

import React, { useRef, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { BackToTop } from "./components/backtotop";
import { Header } from "./components/header";
import { EssenceSection } from "./components/essence-section";
import { ProjectsSection } from "./components/projects-section";
import { Footer } from "./components/footer";

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const essenceRef = useRef<HTMLElement | null>(null);
    const projectRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);

    const scrollToElement = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const updateBodyHeight = () => {
            const bodyElement = document.body;
            const windowHeight = window.innerHeight;
            const mainHeight = mainRef.current?.clientHeight;

            if (mainHeight) {
                if (windowHeight > mainHeight)
                    bodyElement.style.height = "100vh";
                else bodyElement.style.height = "max-content";
            }
        };

        updateBodyHeight();

        window.addEventListener("resize", updateBodyHeight);

        return () => window.removeEventListener("resize", updateBodyHeight);
    }, [mainRef]);

    return (
        <div ref={mainRef}>
            <BackToTop
                width="26"
                height="26"
                fillColor="rgb(var(--supernova-800))"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <Header
                refs={{
                    essenceRef,
                    projectRef,
                    contactRef,
                }}
                callbacks={{
                    scrollToElement,
                }}
            />
            <main className="w-full flex flex-col items-center justify-center">
                <EssenceSection ref={essenceRef} />
                <ProjectsSection
                    ref={projectRef}
                    refs={{ contactRef }}
                    callbacks={{ scrollToElement }}
                />
            </main>
            <Footer ref={contactRef} />
            <div className="bottom-fade z-10 w-full h-[64px] fixed left-0 bottom-0 pointer-events-none"></div>
            <SpeedInsights />
            <Analytics />
        </div>
    );
}
