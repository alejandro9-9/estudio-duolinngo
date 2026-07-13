import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import styles from "./quiz.module.css";

const nunito = Nunito({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test de Nivel de Estudio - Estilo Duolingo",
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${nunito.className} ${styles.page} flex-1 min-h-screen flex flex-col items-center justify-center p-4`}
    >
      {children}
    </div>
  );
}
