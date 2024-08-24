import "../styles/reset.scss";
import { AuthProvider } from "./auth-config/auth-config";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Navbar />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
