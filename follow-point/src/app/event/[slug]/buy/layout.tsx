import ServerProtectedComponent from "@/components/ServerProtectedComponent";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServerProtectedComponent>{children}</ServerProtectedComponent>
      </body>
    </html>
  );
}
