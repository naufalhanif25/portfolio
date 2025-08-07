import { useRef, useEffect, useState, RefObject } from "react";
import * as Icons from "./icons";

export function Header({
    refs,
    callbacks,
}: {
    refs: {
        essenceRef: RefObject<HTMLElement | null>;
        projectRef: RefObject<HTMLElement | null>;
        contactRef: RefObject<HTMLElement | null>;
    };
    callbacks: {
        scrollToElement: (ref: React.RefObject<HTMLElement | null>) => void;
    };
}) {
    const headerRef = useRef<HTMLHeadElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

    return (
        <>
            <audio ref={audioRef} src="/music/bgmusic.mp3" />
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
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    />
                </span>
                <nav className="header-nav-bg header-nav h-full px-[32px] rounded-b-[24px] flex flex-row items-center justify center">
                    <button
                        className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                        onClick={() =>
                            callbacks.scrollToElement(refs.essenceRef)
                        }
                    >
                        Essence
                        <hr />
                    </button>
                    <button
                        className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                        onClick={() =>
                            callbacks.scrollToElement(refs.projectRef)
                        }
                    >
                        Projects
                        <hr />
                    </button>
                    <button
                        className="link-button w-[86px] flex flex-col items-center text-[12pt] gap-[4px]"
                        onClick={() =>
                            callbacks.scrollToElement(refs.contactRef)
                        }
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
        </>
    );
}
