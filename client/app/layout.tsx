import { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ReduxProvider } from "@/redux/provider";
export const metadata: Metadata = {
  title: "Good actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          <ReduxProvider>
            <Header />
            <main className="bg-light h-full py-20 overflow-y-auto">
              <div className="mx-auto max-w-7xl py-6 ">{children}</div>
            </main>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
