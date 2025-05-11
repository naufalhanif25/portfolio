import React, { useState, useEffect } from "react";

interface TypingEffectProps {
    texts: string[];
    speed?: number;
    className?: any;
}

export const Typing: React.FC<TypingEffectProps> = ({
    texts,
    className,
    speed = 100,
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;

        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const next = currentText.slice(0, displayedText.length + 1);

                setDisplayedText(next);

                if (next === currentText) {
                    setPause(true);
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                const prev = currentText.slice(0, displayedText.length - 1);

                setDisplayedText(prev);

                if (prev === "") {
                    setIsDeleting(false);
                    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, pause, textIndex]);

    useEffect(() => {
        if (pause) {
            const pauseTimeout = setTimeout(() => setPause(false), 3000);

            return () => clearTimeout(pauseTimeout);
        }
    }, [pause]);

    return (
        <ins className={"flex flex-row gap-[2px] no-underline " + className}>
            {displayedText}
            <span className="blinking-cursor font-bold"></span>
        </ins>
    );
};
