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
        "Machine learning",
        "IT",
        "Code",
        "Programmer",
        "Developer",
        "Informatics",
        "Syiah Kuala",
        "Syiah Kuala University",
    ],
    icons: "image/myicon.ico",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.variable} ${codepro.variable} antialiased overflow-x-hidden`}
            >
                {children}
            </body>
        </html>
    );
}
