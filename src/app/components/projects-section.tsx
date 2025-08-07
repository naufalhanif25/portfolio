import { useRef, useEffect, useState, forwardRef, RefObject } from "react";
import * as Icons from "./icons";
import { Projects } from "./projects";
import { AutoScroll } from "./autoscroll";
import projects from "../assets/json/projects.json";

export const ProjectsSection = forwardRef<
    HTMLElement | null,
    {
        refs: {
            contactRef: RefObject<HTMLElement | null>;
        };
        callbacks: {
            scrollToElement: (ref: React.RefObject<HTMLElement | null>) => void;
        };
    }
>(({ refs, callbacks }, ref) => {
    const [isPaused, setIsPaused] = useState(false);
    const autoScrollRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollDistanceRef = useRef<number>(0);
    const animationFrameRef = useRef<number>(0);
    const positionRef = useRef(0);
    const [isScrollLeft, setIsScrollLeft] = useState(true);
    const [speedIndex, setSpeedIndex] = useState(0);
    const speedArr = [1.0, 1.25, 1.5, 2.0];
    const totalProject = projects.length;

    useEffect(() => {
        const getDistance = () => {
            const scrollContainer = scrollContainerRef.current;

            if (scrollContainer) {
                const childCount = scrollContainer.children.length;

                if (childCount > 0)
                    scrollDistanceRef.current =
                        (scrollContainer.offsetWidth + 18) / childCount;
            }
        };

        getDistance();

        window.addEventListener("resize", getDistance);

        return () => window.removeEventListener("resize", getDistance);
    }, [scrollContainerRef]);

    useEffect(() => {
        const autoScrollElement = autoScrollRef.current;

        if (!autoScrollElement) return;

        const stepWidth = (speedIndex + 1) * speedArr[speedIndex];
        const tileWidth = autoScrollElement.scrollWidth / 2;

        const animate = () => {
            if (isPaused || !autoScrollElement) {
                animationFrameRef.current = requestAnimationFrame(animate);

                return;
            }

            positionRef.current += isScrollLeft ? -stepWidth : stepWidth;

            if (Math.abs(positionRef.current) >= tileWidth && isScrollLeft)
                positionRef.current = 0;
            else if (positionRef.current >= 0 && !isScrollLeft)
                positionRef.current = -tileWidth;

            autoScrollElement.style.transform = `translateX(${positionRef.current}px)`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
        };
    }, [autoScrollRef, isPaused, isScrollLeft, speedIndex]);

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

    const renderContent = () => {
        return Array.from({ length: 2 }).map((_, index) => (
            <AutoScroll
                key={`autoscroll-${index}`}
                contactRef={refs.contactRef}
                scrollToElement={callbacks.scrollToElement}
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

    const changeSpeed = () => {
        const speedArrLength = speedArr.length;

        if (speedIndex < speedArrLength - 1) setSpeedIndex(speedIndex + 1);
        else setSpeedIndex(0);
    };

    const stopAutoScroll = () => {
        setIsPaused(true);
    };

    const startAutoScroll = () => {
        setIsPaused(false);
    };

    return (
        <section
            ref={ref}
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
                    className="scroll-section-child w-fit flex flex-row"
                >
                    {renderContent()}
                </span>
            </div>
            <div className="py-[16px] flex flex-col gap-[6px]">
                <h2 className="projects-title font-semibold text-[28pt] text-center">
                    Projects
                </h2>
                <div className="relative projects-section w-full flex">
                    <span className="projects-section-child absolute left-0 top-0 w-full h-full flex items-center justify-between">
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
                        className="projects-section-child w-full h-full py-[16px] no-scrollbar scroll-smooth overflow-hidden"
                        onWheel={(e) => e.preventDefault()}
                        onTouchMove={(e) => e.preventDefault()}
                    >
                        <span
                            ref={scrollContainerRef}
                            className="w-fit flex flex-row gap-[18px] px-[18px]"
                        >
                            {projects.map((project, index) => {
                                return (
                                    <Projects
                                        key={`project-${index}`}
                                        projectIndex={index + 1}
                                        imageUrl={project.imageUrl}
                                        url={project.url || ""}
                                        content={project.content}
                                        desc={project.desc}
                                        techstack={project.techstack}
                                        github={project.github || ""}
                                    />
                                );
                            })}
                        </span>
                    </span>
                </div>
            </div>
        </section>
    );
});

ProjectsSection.displayName = "ProjectsSection";
