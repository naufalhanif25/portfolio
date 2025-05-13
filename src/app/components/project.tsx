import React, { useState } from "react";
import * as Icons from "./icons";

export function Project({
    projectIndex,
    imageUrl,
    content,
    desc,
    techstack,
    github,
    url,
}: {
    projectIndex: number;
    imageUrl: string;
    content: string;
    desc: string;
    techstack?: string[];
    github?: string;
    url?: string;
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
            <span className="w-full flex-grow relative rounded-[6px] overflow-hidden">
                <span className="project-index-container rounded-bl-[8px] px-[16px] py-[2px] z-10 top-0 right-0 absolute">
                    <h1 className="text-[16pt] font-semibold">{projectIndex}</h1>
                </span>
                <img
                    src={imageUrl}
                    className="w-full h-full object-cover opacity-[0.85]"
                />
            </span>
            <span className="flex flex-col items-center justify-center w-full gap-[6px]">
                <h1 className="font-bold text-[18pt]">{content}</h1>
                <p className="text-[12pt] mb-[6px] text-center">{desc}</p>
            </span>
            <div className="w-full flex items-center justify-between">
                <span className="size-fit flex flex-row items-center justify-center gap-[12px]">
                    {github ? (
                        <Icons.Github
                            className="project-icon w-[26px] cursor-pointer"
                            fillColor="rgb(var(--supernova-400))"
                            onClick={() => window.open(github)}
                        />
                    ) : (
                        ""
                    )}

                    {url ? (
                        <Icons.Link
                            className="project-icon w-[24px] cursor-pointer"
                            fillColor="rgb(var(--supernova-400))"
                            onClick={() => window.open(url)}
                        />
                    ) : null}
                </span>

                {techstack ? (
                    <div className="project-techstack flex flex-row items-center py-[4px] px-[20px] gap-[16px] w-fit rounded-[32px] overflow-hidden">
                        {techstack?.map((item, index) => (
                            <div
                                key={index}
                            >
                                <h1 className="text-[10pt] font-semibold">
                                    {item}
                                </h1>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </span>
    );
}
