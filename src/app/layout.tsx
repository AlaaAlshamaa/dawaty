import type { Metadata } from "next";
import "./globals.css";
import "./golden-theme.css";
import { Cairo, Tajawal, El_Messiri } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-body",
});

const almessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-heading",
});


export const metadata = {
  title: "Dawaty — لحظتك تبدأ بدعوة",
  description: "منصة لإنشاء دعوات رقمية فاخرة للمناسبات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
<html
  lang="ar"
  dir="rtl"
  className={`${tajawal.variable} ${almessiri.variable} ${cairo.variable}`}
>      
      <body>{children}</body>
    </html>
  );
}
