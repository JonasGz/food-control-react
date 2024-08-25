import "../styles/reset.scss";

export const metadata = {
  title: "Food Control",
  description: "Controle de gastos com lanches",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
