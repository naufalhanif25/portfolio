import { useState, useEffect } from "react";
import { useSpring, animated, easings } from "@react-spring/web";

export function Scrolling({
    texts,
    animationSpeed = 250,
    delay = 1500,
    className = { parent: "", child: "" },
}: {
    texts: string[];
    animationSpeed?: number;
    delay?: number;
    className?: { parent?: string, child?: string };
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationStyles, animationApi] = useSpring(() => ({
        from: { transform: "translateY(-200%)", opacity: 0 },
        to: { transform: "translateY(0%)", opacity: 1 },
        config: { duration: animationSpeed, easing: (time) => easings.easeInOutQuad(time) },
    }));

    useEffect(() => {
        animationApi.start({
            from: { transform: "translateY(200%)", opacity: 0 },
            to: { transform: "translateY(0%)", opacity: 1 },
            config: { duration: animationSpeed, easing: (time) => easings.easeInOutQuad(time) },
        });

        const outTimer = setTimeout(() => {
            animationApi.start({
                from: { transform: "translateY(0%)", opacity: 1 },
                to: { transform: "translateY(-200%)", opacity: 0 },
                config: { duration: animationSpeed, easing: (time) => easings.easeInOutQuad(time) },
            });
        }, animationSpeed + delay);

        const changeTimer = setTimeout(() => {
            setCurrentIndex((index) => (index + 1) % texts.length);
        }, (animationSpeed * 2) + delay);

        return () => {
            clearTimeout(outTimer);
            clearTimeout(changeTimer);
        };
    }, [currentIndex]);

    return (
        <div className={className.parent}>
            <animated.div style={animationStyles} className={className.child}>
                {texts[currentIndex]}
            </animated.div>
        </div>
    );
}
