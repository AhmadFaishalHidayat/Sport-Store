import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SPORTS STORE",
    description: "App ecommerce Sports Store",
    openGraph: {
        images: ["/app/public/assets/SPORT.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
                <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
                <script src="https://ultimate-employee.web.app/ultimate-employee.js?apiKey=df596947120990f980b3ccf4128a1292e72bbf0389991f389b6f4660e6051eb7"></script>
            </body>
        </html>
    );
}
