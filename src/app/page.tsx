"use client";

import React, { useRef, useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard";
import {
    EffectComposer,
    Bloom,
    DepthOfField,
} from "@react-three/postprocessing";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import * as Icons from "./components/icons";
import { Typing } from "./components/typing";
import { Canvas } from "@react-three/fiber";
import { BackToTop } from "./components/backtotop";
import { Project } from "./components/project";
import { AutoScroll } from "./components/autoscroll";

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
    const autoScrollRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const positionRef = useRef(0);
    const headerRef = useRef<HTMLHeadElement | null>(null);
    const [isAligned, setIsAligned] = useState(false);
    const [alignPercentage, setAlignPercentage] = useState(0);
    const [isScrollLeft, setIsScrollLeft] = useState(true);
    const [bodyWidth, setBodyWidth] = useState(0);
    const [bodyHeight, setBodyHeight] = useState(0);

    let projectIndex = 1;

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const maxBlur = 8;
                    const maxScroll = 1200;
                    const newBlur = Math.min(
                        (scrollY / maxScroll) * maxBlur,
                        maxBlur
                    );

                    const rect = headerRef.current?.getBoundingClientRect();

                    const fixedTop = rect?.top ?? 0;
                    const fixedBottom = rect?.bottom ?? 0;
                    const scrollTop =
                        projectRef.current?.getBoundingClientRect().top ?? 0;
                    const percentage = Math.abs(
                        (fixedBottom - scrollTop) / (fixedBottom - fixedTop)
                    );

                    setAlignPercentage(percentage);
                    setIsAligned(fixedBottom > scrollTop);
                    setBlur(newBlur);

                    ticking = false;
                });

                ticking = true;
            }
        };

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
        const content = autoScrollRef.current;
        if (!content) return;

        const animate = () => {
            if (isPaused || !content) {
                animationFrameRef.current = requestAnimationFrame(animate);

                return;
            }

            if (isScrollLeft) {
                positionRef.current -= 1;
            } else {
                if (positionRef.current < 0) {
                    positionRef.current += 1;
                } else {
                    return;
                }
            }

            if (Math.abs(positionRef.current) >= content.scrollWidth / 2) {
                positionRef.current = 0;
            }

            content.style.transform = `translateX(${positionRef.current}px)`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPaused, isScrollLeft]);

    const stopAutoScroll = () => {
        setIsPaused(true);
    };

    const startAutoScroll = () => {
        setIsPaused(false);
    };

    const renderContent = () => {
        return Array.from({ length: 2 }).map((_, i) => (
            <AutoScroll
                key={`content-${i}`}
                contactRef={contactRef}
                scrollToElement={scrollToElement}
            />
        ));
    };

    const scrollToLeft = () => {
        setIsScrollLeft(true);
    };

    const scrollToRight = () => {
        setIsScrollLeft(false);
    };

    useEffect(() => {
        const checkScreenSize = () => {
            const viewHeight = window.innerHeight;
            const viewWidth = window.innerWidth;

            setBodyWidth(viewWidth);
            setBodyHeight(viewHeight);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const renderFirstSection = () => {
        return (
            <section
                className={`w-full flex items-center justify-center ${
                    bodyHeight > 800
                        ? "h-screen"
                        : bodyHeight > 600
                        ? "h-svh"
                        : "h-fit pt-[20px]"
                }`}
            >
                <div className="left h-full flex flex-grow flex-col justify-center gap-[36px]">
                    <span className="flex flex-col gap-[20px] py-[2px]">
                        <span className="flex flex-col leading-[40px]">
                            <p className="text-[16pt] font-semibold">HOLA,</p>
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
                            I am an Informatics student at Syiah Kuala
                            University with interests in software development,
                            machine learning, UI/UX design, and 3D animation.
                        </p>
                        <span className="techstack-container w-full items-center gap-y-[16px]">
                            <Icons.MySQL
                                className="w-[26px]"
                                fillColor="rgb(var(--jaguar-200))"
                            />
                            <Icons.MongoDB
                                className="w-[28px]"
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
                            <Icons.ExpressJS
                                className="w-[28px]"
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
                                <Icons.Execute
                                    className="size-[20px]"
                                    strokeColor="rgb(var(--jaguar-200))"
                                />
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
                            onChange={(e) => setCode(e.target.value)}
                        ></textarea>
                    </span>
                </div>
                <div className="keyboard canvas-bg relative h-[100vh] min-w-[50vw] items-center justify-center">
                    {bodyWidth > 800 && (
                        <Canvas
                            camera={{
                                position: [0, 0, 5],
                                fov: 45,
                            }}
                            className="keyboard-kanvas"
                        >
                            <directionalLight
                                position={[2, 12, 32]}
                                intensity={8.4}
                                castShadow
                                color="rgba(var(--jaguar-900), 0.5)"
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
                    )}
                </div>
            </section>
        );
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
                <header
                    ref={headerRef}
                    className="fixed z-100 w-full flex flex-row items-center justify-between py-[16px] px-[24px]"
                    style={{
                        backgroundColor: `rgba(var(--jaguar-950), ${
                            isAligned && alignPercentage <= 100
                                ? alignPercentage
                                : 0
                        })`,
                    }}
                >
                    <span className="header-icon w-[160px]">
                        <Icons.Icon
                            className="w-[22px] cursor-pointer overflow-visible"
                            fillColor="rgb(var(--supernova-400))"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                        />
                    </span>
                    <nav className="header-nav flex flex-row items-center justify center">
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
                            Projects
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
                            className="music-nav-button solid-button text-[11pt] font-[500] py-[4px] px-[20px] rounded-[32px]"
                            onClick={toggleAudio}
                        >
                            {isPlaying ? (
                                <Icons.PlayIcon
                                    color="rgb(var(--jaguar-950))"
                                    width="24px"
                                    height="24px"
                                />
                            ) : (
                                <Icons.PauseIcon
                                    color="rgb(var(--jaguar-950))"
                                    width="24px"
                                    height="24px"
                                />
                            )}
                        </button>
                    </span>
                </header>
                <main
                    ref={essenceRef}
                    className="w-full flex flex-col items-center justify-center"
                >
                    {bodyHeight > 600 && bodyWidth > 800 ? (
                        <Parallax
                            speed={-25}
                            easing="easeInOut"
                            style={{
                                filter: `blur(${blur}px)`,
                                willChange: "transform",
                            }}
                        >
                            {renderFirstSection()}
                        </Parallax>
                    ) : (
                        renderFirstSection()
                    )}
                    <section
                        ref={projectRef}
                        className="section-bg relative w-full z-1 flex flex-col gap-[28px] py-[24px]"
                    >
                        <div className="experience-nav-buttons w-full flex flex-row items-center justify-start px-[24px] gap-[12px]">
                            {isPaused ? (
                                <Icons.Play
                                    className="size-[20px] fill-[rgb(var(--supernova-400))] hover:fill-[rgb(var(--supernova-300))] duration-[160ms] ease-out"
                                    onClick={startAutoScroll}
                                />
                            ) : (
                                <Icons.Pause
                                    className="size-[20px] fill-[rgb(var(--supernova-400))] hover:fill-[rgb(var(--supernova-300))] duration-[160ms] ease-out"
                                    onClick={stopAutoScroll}
                                />
                            )}
                            {isScrollLeft ? (
                                <Icons.ArrowRight
                                    className="size-[20px] fill-[rgb(var(--supernova-400))] hover:fill-[rgb(var(--supernova-300))] duration-[160ms] ease-out"
                                    onClick={scrollToRight}
                                />
                            ) : (
                                <Icons.ArrowLeft
                                    className="size-[20px] fill-[rgb(var(--supernova-400))] hover:fill-[rgb(var(--supernova-300))] duration-[160ms] ease-out"
                                    onClick={scrollToLeft}
                                />
                            )}
                        </div>
                        <div
                            className="overflow-hidden"
                            onWheel={(e) => e.preventDefault()}
                            onTouchMove={(e) => e.preventDefault()}
                        >
                            <div
                                ref={autoScrollRef}
                                className="scroll-section-child w-fit px-[32px] gap-[64px] flex flex-row"
                            >
                                {renderContent()}
                            </div>
                        </div>
                        <div className="py-[16px]">
                            <h1 className="project-title font-semibold text-[36px] text-center">
                                Projects
                            </h1>
                            <div className="relative project-section w-full flex">
                                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-between">
                                    <Icons.ScrollLeft
                                        className="arrow-button size-[74px] z-100"
                                        onClick={handleScrollLeft}
                                        strokeColor="currentColor"
                                        strokeWidth="1"
                                    />
                                    <Icons.ScrollRight
                                        className="arrow-button size-[74px] z-100"
                                        onClick={handleScrollRight}
                                        strokeColor="currentColor"
                                        strokeWidth="1"
                                    />
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
                                            projectIndex={projectIndex++}
                                            imageUrl="/image/mubes.png"
                                            content="MUBES HMIF 2024"
                                            desc="HMIF 2024 Grand Conference website"
                                            techstack={["Laravel", "MySQL"]}
                                            github="https://github.com/naufalhanif25/website-mubes-2024.git"
                                        />
                                        <Project
                                            projectIndex={projectIndex++}
                                            imageUrl="/image/tkid.png"
                                            content="TransKoetaradja.id"
                                            desc="Trans Koetaradja city bus website prototype"
                                            techstack={["Figma"]}
                                        />
                                        <Project
                                            projectIndex={projectIndex++}
                                            imageUrl="/image/bluestamp.png"
                                            content="Bluestamp"
                                            desc="Story sharing website prototype"
                                            techstack={["Laravel", "MySQL"]}
                                            github="https://github.com/naufalhanif25/bluestamp.git"
                                        />
                                        <Project
                                            projectIndex={projectIndex++}
                                            imageUrl="/image/zenosent.png"
                                            content="Zenosent"
                                            desc="Journal finder desktop app"
                                            techstack={["Electron.js"]}
                                            github="https://github.com/naufalhanif25/zenosent.git"
                                        />
                                        <Project
                                            projectIndex={projectIndex++}
                                            imageUrl="/image/teras-beasiswa.png"
                                            content="Teras Beasiswa"
                                            desc="Indonesia scholarship search engine"
                                            techstack={["Laravel", "MySQL"]}
                                            github="https://github.com/naufalhanif25/teras-beasiswa.git"
                                        />
                                    </div>
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
                                window.open(
                                    "https://api.whatsapp.com/send?phone=6282181916822"
                                )
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
            <SpeedInsights/>
            <Analytics/>
        </>
    );
}
