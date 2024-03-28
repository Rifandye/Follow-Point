import LoginRegisterProtector from "@/components/loginRegisterProtector";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginRegisterProtector>{children}</LoginRegisterProtector>
      </body>
    </html>
  );
}
