import { useEffect, useRef } from "react";
import { RefObject } from "react";
import * as Icons from "./icons";
import { Review } from "./review";

export function AutoScroll({
    contactRef,
    scrollToElement,
}: {
    contactRef: RefObject<HTMLElement | null>;
    scrollToElement: any;
}) {
    const mainExpContainerRef = useRef<HTMLDivElement>(null);
    const childExpRef = useRef<HTMLSpanElement>(null);
    const scrollVerticalContainerRef = useRef<HTMLDivElement>(null);
    const scrollVerticalDistanceRef = useRef<number>(0);

    useEffect(() => {
        if (mainExpContainerRef.current && childExpRef.current) {
            const childHeight = childExpRef.current.offsetHeight;
            mainExpContainerRef.current.style.height = `${childHeight}px`;
        }
    }, []);

    useEffect(() => {
        if (scrollVerticalContainerRef.current && scrollVerticalDistanceRef) {
            const container = scrollVerticalContainerRef.current;
            const childCount = container.children.length;

            if (childCount > 0) {
                const childHeight =
                    container.offsetHeight / childCount + 16 / childCount;
                scrollVerticalDistanceRef.current = childHeight;
            }
        }
    }, []);

    const scrollVerticalByDistance = (distance: number) => {
        if (mainExpContainerRef.current) {
            mainExpContainerRef.current.scrollBy({
                top: distance,
                behavior: "smooth",
            });
        }
    };

    const handleScrollUp = () => {
        scrollVerticalByDistance(-scrollVerticalDistanceRef.current);
    };

    const handleScrollDown = () => {
        scrollVerticalByDistance(scrollVerticalDistanceRef.current);
    };

    return (
        <div className="w-fit flex flex-row items-center justify-start gap-[64px]">
            <span className="jaguar-display py-[20px] px-[32px] rounded-[12px] gap-[12px] flex flex-col items-center justify-center">
                <h1 className="text-[11pt] font-medium">Main Tech Stack</h1>
                <span className="flex flex-row items-center justify-center gap-[16px]">
                    <Icons.MySQL
                        className="w-[30px]"
                        fillColor="rgb(var(--jaguar-200))"
                    />
                    <Icons.MongoDB
                        className="w-[32px]"
                        fillColor="rgb(var(--jaguar-200))"
                    />
                    <Icons.Laravel
                        className="w-[30px]"
                        fillColor="rgb(var(--jaguar-200))"
                    />
                    <Icons.ExpressJS
                        className="w-[32px]"
                        fillColor="rgb(var(--jaguar-200))"
                    />
                    <Icons.NextJS
                        className="w-[28px]"
                        fillColor="rgb(var(--jaguar-200))"
                    />
                </span>
            </span>
            <div className="flex flex-ro items-center justify-center gap-[12px]">
                <div className="max-h-[108px] overflow-hidden">
                    <div
                        ref={mainExpContainerRef}
                        className="overflow-y-auto no-scrollbar scroll-smooth pointer-events-none"
                        onWheel={(e) => e.preventDefault()}
                        onTouchMove={(e) => e.preventDefault()}
                    >
                        <div
                            ref={scrollVerticalContainerRef}
                            className="relative flex flex-col h-fit items-center justify-center gap-[16px]"
                        >
                            <span
                                ref={childExpRef}
                                className="supernova-display py-[20px] w-[432px] rounded-[64px] gap-[20px] flex flex-row items-center justify-center"
                            >
                                <img
                                    className="size-[64px]"
                                    src="image/hmif.png"
                                />
                                <span className="flex flex-col items-center justify-center gap-[8px]">
                                    <p className="text-[12pt] font-semibold text-nowrap text-center">
                                        Himpunan Mahasiswa Informatika
                                    </p>
                                    <hr className="second-hr w-full" />
                                    <p className="text-[10pt] text-nowrap text-center">
                                        Member of Kominkraf 2024-2025
                                    </p>
                                </span>
                            </span>
                            <span className="supernova-display py-[20px] w-[432px] rounded-[64px] gap-[20px] flex flex-row items-center justify-center">
                                <img
                                    className="size-[64px]"
                                    src="image/usk.png"
                                />
                                <span className="flex flex-col items-center justify-center gap-[8px]">
                                    <p className="text-[12pt] font-semibold text-nowrap text-center">
                                        Syiah Kuala University
                                    </p>
                                    <hr className="second-hr w-full" />
                                    <p className="text-[10pt] text-nowrap text-center">
                                        Informatics Bachelor Degree
                                    </p>
                                </span>
                                <span className="flex flex-col items-center justify-center gap-[4px]">
                                    <h1 className="text-[10pt] font-medium text-nowrap text-center">
                                        Last GPA
                                    </h1>
                                    <h1 className="text-[12pt] font-semibold text-nowrap text-center">
                                        3.62 / 4
                                    </h1>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <span className="h-full flex flex-col items-center justify-center gap-[8px]">
                    <button
                        className="experience-scroll-button p-[4px] rounded-[32px]"
                        onClick={handleScrollUp}
                    >
                        <Icons.ArrowUp
                            className="size-[20px]"
                            strokeColor="rgb(var(--supernova-300))"
                            strokeWidth="4"
                        />
                    </button>
                    <button
                        className="experience-scroll-button p-[4px] rounded-[32px]"
                        onClick={handleScrollDown}
                    >
                        <Icons.ArrowDown
                            className="size-[20px]"
                            strokeColor="rgb(var(--supernova-300))"
                            strokeWidth="4"
                        />
                    </button>
                </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-[16px]">
                <Review
                    title="Happy Clients"
                    value={6}
                    icon={
                        <Icons.SmileEmoji
                            className="size-[38px]"
                            strokeColor="rgb(var(--jaguar-100))"
                            strokeWidth="1.2"
                        />
                    }
                />
                <Review
                    title="Working Hours"
                    value={12 * 7}
                    icon={
                        <Icons.Clock
                            className="size-[38px]"
                            strokeColor="rgb(var(--jaguar-100))"
                            strokeWidth="1.2"
                        />
                    }
                />
                <Review
                    title="Projects"
                    value={5}
                    icon={
                        <Icons.Bag
                            className="size-[42px]"
                            strokeColor="rgb(var(--jaguar-100))"
                            strokeWidth="1.2"
                        />
                    }
                />
            </div>
            <div
                className="supernova-display hitmeup-button rounded-[64px] flex flex-row items-center justify-center py-[20px] px-[36px] gap-[20px]"
                onClick={() => scrollToElement(contactRef)}
            >
                <span>
                    <Icons.Phone
                        className="size-[42px]"
                        strokeColor="rgb(var(--supernova-200))"
                        strokeWidth="1.1"
                    />
                </span>
                <span className="flex flex-col items-center justify-center gap-[8px]">
                    <h1 className="text-[12pt] font-semibold text-nowrap text-center">
                        Hit Me Up
                    </h1>
                    <hr className="second-hr w-full" />
                    <p className="text-[10pt] text-nowrap text-center">
                        Say hi anytime
                    </p>
                </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-[16px]">
                <h1 className="text-[11pt] font-semibold text-nowrap text-center">
                    Other Skills
                </h1>
                <span className="jaguar-display flex flex-row items-center justify-center gap-[12px] py-[12px] px-[18px] rounded-[12px]">
                    <Icons.Photoshop className="size-[36px]" />
                    <Icons.Photoshop className="size-[36px]" />
                    <Icons.PremierePro className="size-[36px]" />
                    <Icons.Figma className="size-[32px]" />
                    <Icons.Blender className="size-[32px]" />
                </span>
            </div>
        </div>
    );
}
