import { useState, useRef, useEffect } from "react";

export function AutoRender({
    children,
    props,
    rootMargin = "0px",
    threshold = 0,
    firstState = false,
    setOnce = false,
}: {
    children?: React.ReactNode;
    props?: React.ComponentProps<"div">;
    rootMargin?: string;
    threshold?: number;
    firstState?: boolean;
    setOnce?: boolean;
}) {
    const [isVisible, setIsVisible] = useState(firstState);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const target = containerRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;

                setIsVisible(isIntersecting);

                if (setOnce && isIntersecting) {
                    observer.unobserve(target);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        observer.observe(target);

        return () => {
            observer.unobserve(target);
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={containerRef} {...props}>
            {isVisible && children}
        </div>
    );
}
