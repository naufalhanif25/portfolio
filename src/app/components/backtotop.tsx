import React, { useEffect, useRef } from "react";

export function BackToTop({
    width,
    height,
    fillColor,
    onClick,
}: {
    width: string;
    height: string;
    fillColor: string;
    onClick: () => void;
}) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const bodyElement = document.body;
        const bodyWidth = bodyElement.clientWidth;
        const bodyHeight = bodyElement.clientHeight;
        const buttonElement = buttonRef.current;

        const handleScroll = () => {
            const isBottom = window.innerHeight + window.scrollY >= bodyElement.offsetHeight - 8;

            if (isBottom) {
                if (buttonElement) {
                    if (bodyWidth && bodyHeight && (bodyWidth >= 768 || bodyHeight >= 768)) buttonElement.style.transform = "translateY(-34px)";
                    else buttonElement.style.transform = "translateY(-24px)";
                }
            } 
            else {
                if (buttonElement) {
                    buttonElement.style.transform = "translateY(0px)";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [buttonRef]);

    return (
        <>
            <button
                className="backtotop z-1000 w-[38px] h-[38px] fixed flex items-center justify-center bottom-[24px] right-[24px] rounded-[32px]"
                onClick={onClick}
                ref={buttonRef}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={fillColor}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="translate-y-[-1px]"
                >
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
        </>
    );
}
