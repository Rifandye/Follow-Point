import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ServerProtectedComponent({ children }) {
  const token = cookies().get("Authorization")?.value;

  if (!token) {
    redirect("/login?error=please%20login%20first");
  }
  return <>{children}</>;
}
