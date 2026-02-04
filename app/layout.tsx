import "./globals.css";

export const metadata = {
  title: "Coding AI Agent",
  description: "A simple coding AI agent built with Next.js"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <h1>Coding AI Agent</h1>
            <p>Generate, explain, and refactor code with a focused AI workflow.</p>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
