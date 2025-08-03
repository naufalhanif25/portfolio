"use client";

import React, { useRef, useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import * as Icons from "./components/icons";
import { Typing } from "./components/typing";
import { BackToTop } from "./components/backtotop";
import { Project } from "./components/project";
import { AutoScroll } from "./components/autoscroll";
import { Scrolling } from "./components/scrolling";
import Image from "next/image";
import projects from "./assets/json/projects.json";

export default function Home() {
    const [code, setCode] = useState<string>("console.log(\"Naufal Hanif\");");
    const mainRef = useRef<HTMLDivElement>(null);
    const essenceRef = useRef<HTMLElement | null>(null);
    const projectRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollDistanceRef = useRef<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const autoScrollRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const positionRef = useRef(0);
    const headerRef = useRef<HTMLHeadElement | null>(null);
    const [isScrollLeft, setIsScrollLeft] = useState(true);
    const firstSectionRef = useRef<HTMLDivElement>(null);
    const textAreaIndexRef = useRef<HTMLSpanElement>(null);
    const [textAreaLines, setTextAreaLines] = useState(1);
    const [textAreaScrollPos, setTextAreaScrollPos] = useState(0);
    const [speedIndex, setSpeedIndex] = useState(0);
    const nameContainerRef = useRef<HTMLSpanElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const [photoContainerHeight, setPhotoContainerHeight] = useState(0);
    const [showScrollingText, setShowScrollingText] = useState(false);
    const speedArr = [1.0, 1.25, 1.5, 2.0];
    const totalProject = projects.length;

    const scrollToElement = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const executeCode = () => {
        eval(code);
    };

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.loop = true;
            audio.volume = 0.25;
        }
    }, [audioRef]);

    const toggleAudio = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (isPlaying) audio.pause();
        else audio.play().catch((err) => console.error(err));

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const getDistance = () => {
            const scrollContainer = scrollContainerRef.current;

            if (scrollContainer) {
                const childCount = scrollContainer.children.length;

                if (childCount > 0) scrollDistanceRef.current = (scrollContainer.offsetWidth - 18) / childCount;
            }
        }

        getDistance();

        window.addEventListener("resize", getDistance);

        return () => window.removeEventListener("resize", getDistance);
    }, [scrollContainerRef]);

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
        const autoScrollElement = autoScrollRef.current;

        if (!autoScrollElement) return;

        const animate = () => {
            if (isPaused || !autoScrollElement) {
                animationFrameRef.current = requestAnimationFrame(animate);

                return;
            }

            const stepWidth = (speedIndex + 1) * speedArr[speedIndex];

            positionRef.current += (isScrollLeft ? -stepWidth : stepWidth);

            const tileWidth = autoScrollElement.scrollWidth / 2;

            if (Math.abs(positionRef.current) >= tileWidth && isScrollLeft) positionRef.current = 0;
            else if (positionRef.current >= 0 && !isScrollLeft) positionRef.current = -tileWidth;

            autoScrollElement.style.transform = `translateX(${positionRef.current}px)`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [autoScrollRef, isPaused, isScrollLeft, speedIndex]);

    const stopAutoScroll = () => {
        setIsPaused(true);
    };

    const startAutoScroll = () => {
        setIsPaused(false);
    };

    const renderContent = () => {
        return Array.from({ length: 2 }).map((_, index) => (
            <AutoScroll
                key={`autoscroll-${index}`}
                contactRef={contactRef}
                scrollToElement={scrollToElement}
                totalProject={totalProject}
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
        const checkSectionHeight = () => {
            const firstSectionElement = firstSectionRef.current;
            const height = firstSectionElement?.clientHeight;

            photoRef.current?.classList.add("show-up");
            nameContainerRef.current?.classList.add("show-up");

            if (height) setPhotoContainerHeight(height);
        }

        checkSectionHeight();

        window.addEventListener("resize", checkSectionHeight);

        return () => window.removeEventListener("resize", checkSectionHeight);
    }, [firstSectionRef]);

    const updateScrollPos = (event: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textAreaElement = event.currentTarget;

        if (textAreaElement) setTextAreaScrollPos(textAreaElement.scrollTop);
    }

    const checkTextAreaLines = (event: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textAreaElement = event.currentTarget;
        const lines = textAreaElement?.value.split("\n").length;

        if (lines) setTextAreaLines(lines);

        updateScrollPos(event);
    }

    useEffect(() => {
        const textAreaIndexElement = textAreaIndexRef.current;

        if (textAreaIndexElement) textAreaIndexElement.scrollTop = textAreaScrollPos;
    }, [textAreaIndexRef, textAreaLines, textAreaScrollPos]);

    const changeSpeed = () => {
        const speedArrLength = speedArr.length;

        if (speedIndex < speedArrLength - 1) setSpeedIndex(speedIndex + 1);
        else setSpeedIndex(0);
    }

    useEffect(() => {
        const updateBodyHeight = () => {
            const bodyElement = document.body;
            const windowHeight = window.innerHeight;
            const mainHeight = mainRef.current?.clientHeight;

            if (mainHeight) {
                if (windowHeight > mainHeight) bodyElement.style.height = "100vh";
                else bodyElement.style.height = "max-content";
            }
        }

        updateBodyHeight();

        window.addEventListener("resize", updateBodyHeight);

        return () => window.removeEventListener("resize", updateBodyHeight);
    }, [mainRef]);

    useEffect(() => {
        const checkNameContainerWidth = () => {
            const nameContainerElement = nameContainerRef.current;

            if (nameContainerElement) {
                const firstChildElement = nameContainerElement.children[0] as HTMLElement;
                const secondChildElement = nameContainerElement.children[1] as HTMLElement;
                const currentFontSize = `${Math.round((nameContainerElement.clientWidth + (32 * 2)) / 6)}px`;

                nameContainerElement.style.lineHeight = currentFontSize;
                firstChildElement.style.fontSize = currentFontSize;
                secondChildElement.style.fontSize = currentFontSize;
            }
        }

        checkNameContainerWidth();

        window.addEventListener("resize", checkNameContainerWidth);

        return () => window.removeEventListener("resize", checkNameContainerWidth);
    }, [nameContainerRef]);

    return (
        <div ref={mainRef}>
            <audio ref={audioRef} src="/music/bgmusic.mp3" />
            <BackToTop
                width="26"
                height="26"
                fillColor="rgb(var(--supernova-800))"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <header
                ref={headerRef}
                className="fixed z-100 w-full h-[60px] flex flex-row items-center justify-between px-[24px]"
            >
                <span className="header-icon w-[160px] gap-[8px] flex items-center">
                    <Icons.Icon
                        className="flex items-center justify-center cursor-pointer overflow-visible"
                        width={32}
                        height={32}
                        fillColor="rgb(var(--supernova-400))"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    />
                </span>
                <nav className="header-nav-bg header-nav h-full px-[32px] rounded-b-[24px] flex flex-row items-center justify center">
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
                        className="music-nav-button solid-button text-[11pt] py-[4px] px-[20px] rounded-[32px]"
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
                <section className="first-section w-screen h-fit gap-[64px] flex flex-row items-center justify-center">
                    <div
                        ref={firstSectionRef}
                        className="flex flex-row items-center justify-center"
                    >
                        <div className="left h-full flex flex-col grow justify-center gap-[36px]">
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
                                            "Web developer",
                                            "Machine learning enthusiast",
                                            "UI/UX designer",
                                        ]}
                                        speed={100}
                                        className="text-[11pt] font-medium select-none"
                                    />
                                </span>
                            </span>
                            <span className="flex flex-col gap-[20px] grow">
                                <p className="text-[12pt] text-justify text-wrap">
                                    I am an Informatics student from Syiah Kuala University 
                                    with an interest in web development, 
                                    machine learning, and UI/UX design.
                                </p>
                                <span className="techstack-container grow items-center gap-y-[16px]">
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
                            <span className="h-full flex flex-col grow jaguar-display jaguar-display-font text-[10pt] pb-[16px] gap-[16px] rounded-[8px] overflow-hidden">
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
                                <span className="h-[64px] flex flex-row items-center justify-center gap-[12px] px-[24px]">
                                    <span ref={textAreaIndexRef} className="textarea-index h-full w-fit pr-[16px] flex flex-col overflow-y-auto pointer-events-none no-scrollbar">
                                        {Array.from({ length: textAreaLines }).map((_, index) => (
                                            <h1 key={`textindex-${index}`} className="text-[12pt] opacity-[0.75] text-left">{index + 1}</h1>
                                        ))}
                                    </span>
                                    <textarea
                                        onKeyDown={checkTextAreaLines}
                                        onKeyUp={checkTextAreaLines}
                                        onScroll={updateScrollPos}
                                        className="textarea-code-editor h-full grow text-[12pt] text-nowrap outline-none resize-none overflow-auto no-scrollbar overflow-auto"
                                        spellCheck={false}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    ></textarea>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="right flex flex-col items-center justify-center">
                        <span 
                            className="photo-container supernova-display w-full h-full rounded-[32px] relative flex items-center justify-center" 
                            style={{ height: `${photoContainerHeight}px` }}
                            onMouseEnter={() => setTimeout(() => setShowScrollingText(true), 320)}
                            onMouseLeave={() => setTimeout(() => setShowScrollingText(false), 320)}
                        >       
                            <span ref={nameContainerRef} className="name-container absolute bottom-0 right-0 w-full h-full flex flex-col items-center justify-center rounded-[32px] overflow-hidden">
                                <h1 className="name-text text-center font-thin">NAUFAL</h1>
                                <h1 className="name-text text-center font-thin">HANIF</h1>
                            </span>
                            <span className="absolute bottom-0 right-0 flex flex-col h-full w-full items-center justify-between rounded-[32px] overflow-hidden">
                                <span className="name-header w-full px-[32px] py-[16px] flex items-center justify-between rounded-t-[32px] overflow-hidden z-1">
                                    <h4 className="text-[11pt] leading-[11pt] font-medium">Image Viewer</h4>
                                    <h5 className="text-[11pt] leading-[11pt] font-medium">me.webp</h5>
                                </span>
                                <span className="name-footer w-full px-[32px] mb-[24px] flex items-center justify-between rounded-b-[32px] overflow-hidden z-1">
                                    <h5 className="text-[10pt] leading-[10pt] font-medium">1024 px</h5>
                                    <h5 className="text-[10pt] leading-[10pt] font-medium">81.7 KB</h5>
                                </span>
                            </span>
                            <span className="name-container-bio w-full flex flex-col items-center justify-center absolute bottom-0 px-[16%] py-[32px] rounded-[32px] overflow-hidden z-3 pointer-events-none">
                                <span className="supernova-display w-full overflow-hidden h-fit py-[20px] flex items-center justify-center rounded-full">
                                    {showScrollingText ? (
                                        <Scrolling 
                                            texts={[
                                                "Naufal Hanif",
                                                "Informatics student",
                                                "Syiah Kuala University",
                                            ]}
                                            animationSpeed={250}
                                            delay={1500}
                                            className={{
                                                parent: "w-full h-full flex items-center justify-center",
                                                child: "flex items-center justify-center text-[14pt] text-center text-nowrap leading-[14pt]"
                                            }}
                                        />
                                    ) : (
                                        <p className="text-[14pt] text-center text-nowrap leading-[14pt] translate-y-[200%]">Naufal Hanif</p>
                                    )}
                                </span>
                            </span>
                            <Image 
                                ref={photoRef}
                                className="my-photo absolute bottom-0 pointer-events-none z-2"
                                width={720}
                                height={720}
                                src="/images/me.webp"
                                alt="Naufal Hanif"
                            />
                        </span>
                    </div>
                </section>
                <section
                    ref={projectRef}
                    className="relative w-full z-1 flex flex-col gap-[28px] py-[24px]"
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
                        <button 
                            className="speed-button size-[20px] flex items-center text-[14pt]"
                            onClick={changeSpeed}
                        >
                            {speedArr[speedIndex]}x
                        </button>
                    </div>
                    <div
                        className="overflow-hidden"
                        onWheel={(e) => e.preventDefault()}
                        onTouchMove={(e) => e.preventDefault()}
                    >
                        <span
                            ref={autoScrollRef}
                            className="scroll-section-child w-fit px-[32px] gap-[64px] flex flex-row"
                        >
                            {renderContent()}
                        </span>
                    </div>
                    <div className="py-[16px] flex flex-col gap-[6px]">
                        <h2 className="project-title font-semibold text-[28pt] text-center">
                            Projects
                        </h2>
                        <div className="relative project-section w-full flex">
                            <span className="project-section-child absolute left-0 top-0 w-full h-full flex items-center justify-between">
                                <Icons.ScrollLeft
                                    className="arrow-button size-[74px] z-50"
                                    onClick={handleScrollLeft}
                                    strokeColor="currentColor"
                                    strokeWidth="1"
                                />
                                <Icons.ScrollRight
                                    className="arrow-button size-[74px] z-50"
                                    onClick={handleScrollRight}
                                    strokeColor="currentColor"
                                    strokeWidth="1"
                                />
                            </span>
                            <div className="container-fade left-0 z-10 fixed w-full flex flex-row items-center justify-between pointer-events-none"></div>
                            <span
                                ref={scrollRef}
                                className="project-section-child w-full h-full py-[16px] no-scrollbar scroll-smooth overflow-hidden"
                                onWheel={(e) => e.preventDefault()}
                                onTouchMove={(e) => e.preventDefault()}
                            >
                                <span
                                    ref={scrollContainerRef}
                                    className="w-fit flex flex-row gap-[18px] px-[18px]"
                                >
                                    {projects.map((project, index) => {
                                        const currentIndex = index + 1;

                                        return (
                                            <Project
                                                key={currentIndex}
                                                projectIndex={currentIndex}
                                                imageUrl={project.imageUrl}
                                                url={project.url || ""}
                                                content={project.content}
                                                desc={project.desc}
                                                techstack={project.techstack}
                                                github={project.github || ""}
                                            />
                                        )
                                    })}
                                </span>
                            </span>
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
                            window.location.href = "mailto:falhnf25@gmail.com";
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
                                "https://api.whatsapp.com/send?phone=6285180554208"
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
            <div className="bottom-fade z-10 w-full h-[64px] fixed left-0 bottom-0 pointer-events-none"></div>
            <SpeedInsights/>
            <Analytics/>
        </div>
    );
}
