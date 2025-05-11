"use client";

import React, { useRef, useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard";
import {
    EffectComposer,
    Bloom,
    DepthOfField,
} from "@react-three/postprocessing";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import * as Icons from "./components/icons";
import { Typing } from "./components/typing";
import { Canvas } from "@react-three/fiber";
import { BackToTop } from "./components/backtotop";
import { Project } from "./components/project";
import { PlayIcon, PauseIcon } from "./components/musicicon";

export default function Home() {
    const [code, setCode] = useState<string>('console.log("Naufal Hanif");');
    const essenceRef = useRef<HTMLElement | null>(null);
    const projectRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollDistanceRef = useRef<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [blur, setBlur] = useState(0);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxBlur = 8;
        const maxScroll = 1200;
        const newBlur = Math.min((scrollY / maxScroll) * maxBlur, maxBlur);

        setBlur(newBlur);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToElement = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const executeCode = () => {
        eval(`${code}`);
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const childCount = container.children.length;

            if (childCount > 0) {
                scrollDistanceRef.current =
                    (container.offsetWidth - (24 - 16) * 2) / childCount;
            }
        }
    }, []);

    const scrollByDistance = (distance: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: distance,
                behavior: "smooth",
            });
        }
    };

    const handleScrollLeft = () => {
        scrollByDistance(-scrollDistanceRef.current);
    };

    const handleScrollRight = () => {
        scrollByDistance(scrollDistanceRef.current);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = true;
            audio.volume = 0.25;
        }
    }, []);

    const toggleAudio = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((err) => {
                console.log("Play failed:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <ParallaxProvider>
                <audio ref={audioRef} src="/music/bgmusic.mp3" />
                <BackToTop
                    width="26"
                    height="26"
                    fillColor="rgb(var(--supernova-800))"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                />
                <header className="fixed z-100 w-full flex flex-row items-center justify-between py-[16px] px-[24px]">
                    <span className="header-icon w-[160px]">
                        <Icons.Icon
                            className="w-[22px] cursor-pointer overflow-visible"
                            fillColor="rgb(var(--supernova-400))"
                        />
                    </span>
                    <nav className="header-nav flex flex-row items-center justify center translate-y-[2px]">
                        <button
                            className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                            onClick={() => scrollToElement(essenceRef)}
                        >
                            Essence
                            <hr />
                        </button>
                        <button
                            className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                            onClick={() => scrollToElement(projectRef)}
                        >
                            Project
                            <hr />
                        </button>
                        <button
                            className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                            onClick={() => scrollToElement(contactRef)}
                        >
                            Contact
                            <hr />
                        </button>
                    </nav>
                    <span className="w-[160px] flex flex-row items-center justify-end">
                        <button
                            className="solid-button text-[11pt] font-[500] py-[4px] px-[20px] rounded-[32px]"
                            onClick={toggleAudio}
                        >
                            {isPlaying ? (
                                <PlayIcon
                                    color="rgb(var(--jaguar-950))"
                                    width="24px"
                                    height="24px"
                                />
                            ) : (
                                <PauseIcon
                                    color="rgb(var(--jaguar-950))"
                                    width="24px"
                                    height="24px"
                                />
                            )}
                        </button>
                    </span>
                </header>
                <main className="w-full flex flex-col items-center justify-center">
                    <Parallax
                        speed={-25}
                        easing="easeInOut"
                        style={{
                            filter: `blur(${blur}px)`,
                            willChange: "transform",
                        }}
                    >
                        <section
                            ref={essenceRef}
                            className="w-full h-[100vh] flex items-center justify-center"
                        >
                            <div className="left h-full flex flex-grow flex-col justify-center gap-[36px]">
                                <span className="flex flex-col gap-[20px] py-[2px]">
                                    <span className="flex flex-col leading-[40px]">
                                        <h1 className="text-[16pt] font-semibold">HOLA,</h1>
                                        <h1 className="text-[32pt] font-semibold">
                                            I&apos;AM{" "}
                                            <ins className="subtext no-underline">
                                                NAUFAL HANIF
                                            </ins>
                                        </h1>
                                    </span>
                                    <span className="tags w-fit px-[24px] py-[4px]">
                                        <Typing
                                            texts={[
                                                "Software Developer",
                                                "Machine Learner",
                                                "UI/UX Designer",
                                                "3D Animator",
                                            ]}
                                            speed={100}
                                            className="text-[11pt] font-medium select-none"
                                        />
                                    </span>
                                </span>
                                <span className="flex flex-col gap-[20px]">
                                    <p className="text-[12pt] text-justify">
                                        I am an Informatics student at Syiah
                                        Kuala University with interests in
                                        software development, machine learning,
                                        UI/UX design, and 3D animation.
                                    </p>
                                    <span className="techstack-container w-full items-center gap-y-[16px]">
                                        <Icons.MySQL
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.Java
                                            className="w-[28px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.Python
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.PHP
                                            className="w-[30px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.Laravel
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.JS
                                            className="w-[28px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.TS
                                            className="w-[28px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.HTML
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.CSS
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.TailwindCSS
                                            className="w-[26px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.NodeJS
                                            className="w-[28px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.ElectronJS
                                            className="w-[24px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.NextJS
                                            className="w-[24px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                        <Icons.ReactJS
                                            className="w-[30px]"
                                            fillColor="rgb(var(--jaguar-200))"
                                        />
                                    </span>
                                </span>
                                <span className="jaguar-display jaguar-display-font text-[10pt] pb-[16px] flex flex-col gap-[16px] rounded-[8px] overflow-hidden">
                                    <span className="jaguar-display-header w-full flex flex-row align-center justify-between text-[11pt] px-[24px] py-[8px]">
                                        saymyname.js
                                        <button
                                            onClick={executeCode}
                                            className="jaguar-display-icon"
                                        >
                                            <svg
                                                width="20px"
                                                height="20px"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 6.741c0-1.544 1.674-2.505 3.008-1.728l9.015 5.26c1.323.771 1.323 2.683 0 3.455l-9.015 5.258C7.674 19.764 6 18.803 6 17.26V6.741zM17.015 12L8 6.741V17.26L17.015 12z"
                                                    fill="rgb(var(--jaguar-200))"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                    <textarea
                                        id="inner-display"
                                        className="h-[48px] text-[12pt] px-[24px] outline-none resize-none overflow-auto no-scrollbar"
                                        style={{
                                            overflow: "auto",
                                            scrollbarWidth: "none",
                                            msOverflowStyle: "none",
                                        }}
                                        spellCheck={false}
                                        value={code}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    ></textarea>
                                </span>
                            </div>
                            <div className="keyboard canvas-bg h-[100vh] min-w-[50vw] items-center justify-center">
                                <Canvas
                                    camera={{ position: [0, 0, 5], fov: 45 }}
                                >
                                    <directionalLight
                                        position={[2, 12, 32]}
                                        intensity={8.4}
                                        castShadow
                                        color="#f0e5f9"
                                    />
                                    <Keyboard />
                                    <EffectComposer>
                                        <DepthOfField
                                            focusDistance={24}
                                            focalLength={16}
                                            bokehScale={0.12}
                                            height={640}
                                        />
                                        <Bloom
                                            intensity={0.04}
                                            luminanceThreshold={0.012}
                                            luminanceSmoothing={0.008}
                                        />
                                    </EffectComposer>
                                </Canvas>
                            </div>
                        </section>
                    </Parallax>
                    <section
                        ref={projectRef}
                        className="section-bg w-full z-1 flex flex-col gap-[24px] pt-[32px] pb-[36px]"
                    >
                        <h1 className="project-title font-semibold text-[36px] text-center">
                            Project
                        </h1>
                        <div className="relative project-section w-full flex">
                            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-between">
                                <svg
                                    className="arrow-button w-[74px] h-[74px] z-100"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={handleScrollLeft}
                                >
                                    <path
                                        d="M15 18L9 12L15 6"
                                        className="translate-x-[-0.8px]"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <svg
                                    className="arrow-button w-[74px] h-[674x] z-100"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={handleScrollRight}
                                >
                                    <path
                                        d="M9 18L15 12L9 6"
                                        className="translate-x-[0.8px]"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="container-fade left-0 z-10 fixed w-full flex flex-row items-center justify-between pointer-events-none"></div>
                            <div
                                ref={scrollRef}
                                className="w-full h-full py-[16px] no-scrollbar scroll-smooth overflow-hidden"
                                onWheel={(e) => e.preventDefault()}
                                onTouchMove={(e) => e.preventDefault()}
                            >
                                <div
                                    ref={scrollContainerRef}
                                    className="w-fit flex flex-row gap-[16px] px-[20px]"
                                >
                                    <Project
                                        imageUrl="/image/mubes.png"
                                        content="MUBES HMIF 2024"
                                        desc="HMIF 2024 Grand Conference website"
                                    />
                                    <Project
                                        imageUrl="/image/tkid.png"
                                        content="TransKoetaradja.id"
                                        desc="Trans Koetaradja city bus website prototype"
                                    />
                                    <Project
                                        imageUrl="/image/bluestamp.png"
                                        content="Bluestamp"
                                        desc="Story sharing website prototype"
                                    />
                                    <Project
                                        imageUrl="/image/zenosent.png"
                                        content="Zenosent"
                                        desc="Journal finder desktop app"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer
                    ref={contactRef}
                    className="w-full flex flex-wrap flex-row items-center py-[16px]"
                >
                    <div className="footer-icon-container flex flex-row items-center justify-center py-[8px] gap-[20px] px-[24px]">
                        <Icons.Gmail
                            className="footer-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--jaguar-100))"
                            onClick={() => {
                                window.location.href =
                                    "mailto:minku.developer23@gmail.com";
                            }}
                        />
                        <Icons.Github
                            className="footer-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--jaguar-100))"
                            onClick={() =>
                                window.open("https://github.com/naufalhanif25")
                            }
                        />
                        <Icons.Whatsapp
                            className="footer-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--jaguar-100))"
                            onClick={() =>
                                window.open("https://api.whatsapp.com/send?phone=6282181916822")
                            }
                        />
                        <Icons.Instagram
                            className="footer-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--jaguar-100))"
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/fal.hnf?igsh=cWl6MWt0cDRqMWw5"
                                )
                            }
                        />
                        <Icons.Linkedin
                            className="footer-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--jaguar-100))"
                            onClick={() =>
                                window.open(
                                    "https://www.linkedin.com/in/naufal-hanif-4a17a3315?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BljQBlo1aRQuyYEw7gP8ejw%3D%3D"
                                )
                            }
                        />
                    </div>
                    <p className="additional-text text-[11pt] select-none">
                        &copy; 2025 Naufal Hanif. All rights reserved.
                    </p>
                </footer>
                <div className="bottom-fade z-1 w-full h-[64px] fixed left-0 bottom-0 pointer-events-none"></div>
            </ParallaxProvider>
        </>
    );
}
