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
        const bodyWidth = document.querySelector("body")?.clientWidth;

        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 1;

            if (isBottom && Number(bodyWidth) >= 800) {
                if (buttonRef.current) {
                    buttonRef.current.style.transform = "translateY(-34px)";
                }
            }
            else {
                if (buttonRef.current) {
                    buttonRef.current.style.transform = "translateY(0px)";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <button
                className="backtotop z-9999 w-[38px] h-[38px] fixed flex items-center justify-center bottom-[24px] right-[24px] rounded-[32px]"
                onClick={onClick}
                id="backtotop"
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
