import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "KOREA PropTech AI — 부동산의 미래를 시뮬레이션합니다",
  description: "데이터 민주화 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${notoSans.variable} ${spaceMono.variable} ${bebasNeue.variable} cursor-default overflow-x-hidden bg-[#0D1117] font-sans text-[#E2E8F0] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
