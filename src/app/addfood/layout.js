import { Inter } from "next/font/google";
import "../../styles/reset.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
};

export default function AddFoodPage({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
