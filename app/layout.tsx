import "./globals.css";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Taquin",
  description: "Petit jeu du taquin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pacifico.className}>{children}</body>
    </html>
  );
}
