import { useRef, useEffect, useState, forwardRef } from "react";
import { Typing } from "./typing";
import { Scrolling } from "./scrolling";
import * as Icons from "./icons";
import Image from "next/image";

export const EssenceSection = forwardRef<
    HTMLElement | null,
    React.ComponentProps<"section">
>((props, ref) => {
    const [code, setCode] = useState<string>("console.log(\"Naufal Hanif\");");
    const [showScrollingText, setShowScrollingText] = useState(false);
    const firstSectionRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const [photoContainerHeight, setPhotoContainerHeight] = useState(0);
    const nameContainerRef = useRef<HTMLSpanElement>(null);
    const textAreaIndexRef = useRef<HTMLSpanElement>(null);
    const [textAreaLines, setTextAreaLines] = useState(code.length);
    const [textAreaScrollPos, setTextAreaScrollPos] = useState(0);

    const executeCode = () => {
        eval(code);
    };

    useEffect(() => {
        const checkSectionHeight = () => {
            const firstSectionElement = firstSectionRef.current;
            const height = firstSectionElement?.clientHeight;

            photoRef.current?.classList.add("show-up");
            nameContainerRef.current?.classList.add("show-up");

            if (height) setPhotoContainerHeight(height);
        };

        checkSectionHeight();

        window.addEventListener("resize", checkSectionHeight);

        return () => window.removeEventListener("resize", checkSectionHeight);
    }, [firstSectionRef]);

    useEffect(() => {
        const checkNameContainerWidth = () => {
            const nameContainerElement = nameContainerRef.current;

            if (nameContainerElement) {
                const firstChildElement = nameContainerElement
                    .children[0] as HTMLElement;
                const secondChildElement = nameContainerElement
                    .children[1] as HTMLElement;
                const currentFontSize = `${Math.round(
                    (nameContainerElement.clientWidth + 32 * 2) / 6
                )}px`;

                nameContainerElement.style.lineHeight = currentFontSize;
                firstChildElement.style.fontSize = currentFontSize;
                secondChildElement.style.fontSize = currentFontSize;
            }
        };

        checkNameContainerWidth();

        window.addEventListener("resize", checkNameContainerWidth);

        return () =>
            window.removeEventListener("resize", checkNameContainerWidth);
    }, [nameContainerRef]);

    useEffect(() => {
        const textAreaIndexElement = textAreaIndexRef.current;

        if (textAreaIndexElement)
            textAreaIndexElement.scrollTop = textAreaScrollPos;
    }, [textAreaIndexRef, textAreaLines, textAreaScrollPos]);

    const updateScrollPos = (
        event:
            | React.MouseEvent<HTMLTextAreaElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        const textAreaElement = event.currentTarget;

        if (textAreaElement) setTextAreaScrollPos(textAreaElement.scrollTop);
    };

    const checkTextAreaLines = (
        event:
            | React.MouseEvent<HTMLTextAreaElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        const textAreaElement = event.currentTarget;
        const lines = textAreaElement?.value.split("\n").length;

        if (lines) setTextAreaLines(lines);

        updateScrollPos(event);
    };

    return (
        <section
            ref={ref}
            className="first-section w-screen h-fit gap-[64px] flex flex-row items-center justify-center"
            {...props}
        >
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
                            I am an Informatics student from Syiah Kuala
                            University with an interest in web development,
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
                            <span
                                ref={textAreaIndexRef}
                                className="textarea-index h-full w-fit pr-[16px] flex flex-col overflow-y-auto pointer-events-none no-scrollbar"
                            >
                                {Array.from({ length: textAreaLines }).map(
                                    (_, index) => (
                                        <h1
                                            key={`textindex-${index}`}
                                            className="text-[12pt] opacity-[0.75] text-left"
                                        >
                                            {index + 1}
                                        </h1>
                                    )
                                )}
                            </span>
                            <textarea
                                onKeyDown={checkTextAreaLines}
                                onKeyUp={checkTextAreaLines}
                                onScroll={updateScrollPos}
                                className="textarea-code-editor h-full grow text-[12pt] text-nowrap outline-none resize-none overflow-auto no-scrollbar overflow-auto"
                                spellCheck={false}
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value)
                                }
                            ></textarea>
                        </span>
                    </span>
                </div>
            </div>
            <div className="right flex flex-col items-center justify-center">
                <span
                    className="photo-container supernova-display w-full h-full rounded-[32px] relative flex items-center justify-center"
                    style={{ height: `${photoContainerHeight}px` }}
                    onMouseEnter={() =>
                        setTimeout(() => setShowScrollingText(true), 320)
                    }
                    onMouseLeave={() =>
                        setTimeout(() => setShowScrollingText(false), 320)
                    }
                >
                    <span
                        ref={nameContainerRef}
                        className="name-container absolute bottom-0 right-0 w-full h-full flex flex-col items-center justify-center rounded-[32px] overflow-hidden"
                    >
                        <h1 className="name-text text-center font-thin">
                            NAUFAL
                        </h1>
                        <h1 className="name-text text-center font-thin">
                            HANIF
                        </h1>
                    </span>
                    <span className="absolute bottom-0 right-0 flex flex-col h-full w-full items-center justify-between rounded-[32px] overflow-hidden">
                        <span className="name-header w-full px-[32px] py-[16px] flex items-center justify-between rounded-t-[32px] overflow-hidden z-1">
                            <h4 className="text-[11pt] leading-[11pt] font-medium">
                                Image Viewer
                            </h4>
                            <h5 className="text-[11pt] leading-[11pt] font-medium">
                                me.webp
                            </h5>
                        </span>
                        <span className="name-footer w-full px-[32px] mb-[24px] flex items-center justify-between rounded-b-[32px] overflow-hidden z-1">
                            <h5 className="text-[10pt] leading-[10pt] font-medium">
                                1024 px
                            </h5>
                            <h5 className="text-[10pt] leading-[10pt] font-medium">
                                81.7 KB
                            </h5>
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
                                        child: "flex items-center justify-center text-[14pt] text-center text-nowrap leading-[14pt]",
                                    }}
                                />
                            ) : (
                                <p className="text-[14pt] text-center text-nowrap leading-[14pt] translate-y-[200%]">
                                    Naufal Hanif
                                </p>
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
    );
});

EssenceSection.displayName = "EssenceSection";
