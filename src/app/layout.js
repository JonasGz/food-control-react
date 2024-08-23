import { Inter } from "next/font/google";
import "../styles/reset.scss";
import { AuthProvider } from "./auth-config/auth-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
