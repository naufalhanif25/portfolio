import type { Metadata } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

const codepro = Source_Code_Pro({
    variable: "--font-codepro",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Naufal Hanif | Portfolio",
    description:
        "A third-year informatics student at Syiah Kuala University interested in website development and machine learning.",
    keywords: [
        "Naufal",
        "Hanif",
        "Naufal Hanif",
        "Portfolio",
        "Website development",
        "Software development",
        "Machine learning",
        "UI/UX design",
        "IT",
        "Code",
        "Programmer",
        "Developer",
        "Informatics",
        "Syiah Kuala",
        "Syiah Kuala University",
    ],
    icons: "images/icon.ico",
    other: {
        "google-site-verification":
            "QCAW3DiOi51Iz-5jXaXemUoOkT_4InHkMUWrvG5dYXY",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="overscroll-none">
            <body
                className={`${montserrat.variable} ${codepro.variable} antialiased overflow-x-hidden overscroll-none`}
            >
                {children}
            </body>
        </html>
    );
}
