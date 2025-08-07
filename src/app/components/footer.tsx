import { forwardRef } from "react";
import * as Icons from "./icons";

export const Footer = forwardRef<
    HTMLElement | null,
    React.ComponentProps<"footer">
>((props, ref) => {
    return (
        <footer
            ref={ref}
            className="w-full flex flex-wrap flex-row items-center py-[16px]"
            {...props}
        >
            <div className="footer-icon-container flex flex-row items-center justify-center py-[8px] gap-[20px] px-[24px]">
                <Icons.Gmail
                    className="footer-icon w-[24px] cursor-pointer"
                    fillColor="rgb(var(--jaguar-100))"
                    onClick={() => {
                        window.location.href = "mailto:falhnf25@gmail.com";
                    }}
                />
                <Icons.Github
                    className="footer-icon w-[24px] cursor-pointer"
                    fillColor="rgb(var(--jaguar-100))"
                    onClick={() =>
                        window.open("https://github.com/naufalhanif25")
                    }
                />
                <Icons.Whatsapp
                    className="footer-icon w-[24px] cursor-pointer"
                    fillColor="rgb(var(--jaguar-100))"
                    onClick={() =>
                        window.open(
                            "https://api.whatsapp.com/send?phone=6285180554208"
                        )
                    }
                />
                <Icons.Instagram
                    className="footer-icon w-[24px] cursor-pointer"
                    fillColor="rgb(var(--jaguar-100))"
                    onClick={() =>
                        window.open(
                            "https://www.instagram.com/fal.hnf?igsh=cWl6MWt0cDRqMWw5"
                        )
                    }
                />
                <Icons.Linkedin
                    className="footer-icon w-[24px] cursor-pointer"
                    fillColor="rgb(var(--jaguar-100))"
                    onClick={() =>
                        window.open(
                            "https://www.linkedin.com/in/naufal-hanif-4a17a3315?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BljQBlo1aRQuyYEw7gP8ejw%3D%3D"
                        )
                    }
                />
            </div>
            <p className="additional-text text-[11pt] select-none">
                &copy; 2025 Naufal Hanif. All rights reserved.
            </p>
        </footer>
    );
});

Footer.displayName = "Footer";
