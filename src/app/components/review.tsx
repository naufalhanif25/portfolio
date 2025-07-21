import React, { ReactNode } from "react";

export function Review({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: ReactNode
}) {
    return (
        <span className="jaguar-display rounded-[12px] gap-[8px] w-[168px] py-[16px] flex flex-col items-center justify-center">
            <h4 className="text-[11pt] font-medium text-nowrap text-center">{title}</h4>
            <span className="flex flex-row items-center justify-center gap-[16px]">
                {icon}
                <h5 className="text-[24pt] font-semibold">{value}</h5>
            </span>
        </span>
    );
}
