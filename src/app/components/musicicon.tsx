export function PlayIcon({
    color,
    width,
    height,
}: {
    color: string;
    width: string;
    height: string;
}) {
    return (
        <svg
            fill={color}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            id="sound-max"
            data-name="Flat Line"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="secondary"
                d="M11,5V19L7,15H4a1,1,0,0,1-1-1V10A1,1,0,0,1,4,9H7Z"
                fill={color}
                strokeWidth={1.6}
            ></path>
            <path
                id="primary"
                d="M18.36,5.64a9,9,0,0,1,0,12.72"
                stroke={color}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            ></path>
            <path
                id="primary-2"
                data-name="primary"
                d="M15.54,8.46a5,5,0,0,1,0,7.08"
                stroke={color}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            ></path>
            <path
                id="primary-3"
                data-name="primary"
                d="M11,5V19L7,15H4a1,1,0,0,1-1-1V10A1,1,0,0,1,4,9H7Z"
                stroke={color}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            ></path>
        </svg>
    );
}

export function PauseIcon({
    color,
    width,
    height,
}: {
    color: string;
    width: string;
    height: string;
}) {
    return (
        <svg
            fill={color}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            id="sound-mute-alt"
            data-name="Flat Line"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="secondary"
                d="M11,5V19L7,15H4a1,1,0,0,1-1-1V10A1,1,0,0,1,4,9H7Z"
                fill={color}
                strokeWidth={1.6}
            ></path>
            <path
                id="primary"
                d="M16,14.5l5-5m-5,0,5,5M7,9H4a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H7l4,4V5Z"
                stroke={color}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            ></path>
        </svg>
    );
}
