
import { Inter } from "next/font/google";
import "../app/globals.css";  // Ensure this imports Tailwind's styles
import LayoutProvider from "@/components/layoutProvider/LayoutProvider";
import Toast from "@/utils/toast";
import Provider from "@/utils/sessionProvider";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "住房Hub",
  description: "预订酒店系统",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="cn">
      <head>
        {/* Any additional metadata or head elements can be added here */}
      </head>
      <body className={inter.className}>
        <Provider>
        <Toast/>
        <LayoutProvider>
          {children}
        </LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}
