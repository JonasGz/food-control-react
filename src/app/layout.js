import "../styles/reset.scss";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
