import React, { useState } from "react";

export function Project({
    imageUrl,
    content,
    desc,
}: {
    imageUrl: string;
    content: string;
    desc: string;
}) {
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const center = width / 2;
        const maxRotation = 4;
        const rotateYEvent = ((x - center) / center) * maxRotation;

        setRotateY(rotateYEvent);
    };

    const handleMouseLeave = () => {
        setRotateY(0);
    };

    return (
        <span
            className="project-view supernova-display h-fit text-[10pt] py-[18px] px-[18px] flex flex-col items-center justify-center gap-[18px] rounded-[12px] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(600px) rotateY(${rotateY}deg)`,
                transition: "transform 240ms ease-out",
            }}
        >
            <img
                src={imageUrl}
                className="w-full flex-grow rounded-[6px] object-cover opacity-[0.85]"
            />
            <span className="flex flex-col items-center justify-center w-full gap-[6px]">
                <h1 className="font-bold text-[18pt]">{content}</h1>
                <p className="text-[12pt] mb-[6px] text-center">{desc}</p>
            </span>
        </span>
    );
}
