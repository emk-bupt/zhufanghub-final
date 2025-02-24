// app/layout.js
import { Inter } from "next/font/google";
import "../app/globals.css";  // Ensure this imports Tailwind's styles
import LayoutProvider from "@/components/layoutProvider/LayoutProvider";
import Toast from "@/utils/toast";
import Provider from "@/utils/sessionProvider";
import { ThemeProvider } from "next-themes";  // Import ThemeProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "住房Hub",
  description: "预订酒店系统",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cn">
      <head>
        {/* Additional head elements */}
      </head>
      <body className={inter.className}>
        <Provider>
          <Toast />
          <LayoutProvider>
            {/* Wrap your entire layout with ThemeProvider */}
            <ThemeProvider enableSystem={true} attribute="class">
              {children}
            </ThemeProvider>
          </LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}
