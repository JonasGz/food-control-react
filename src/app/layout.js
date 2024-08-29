import { AuthProvider } from "./auth-config/auth-config";
import { Page } from "./components/Page/Page";
import "../styles/reset.scss";

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <Page>{children}</Page>
        </AuthProvider>
      </body>
    </html>
  );
}
