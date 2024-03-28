import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginRegisterProtector({ children }) {
  const token = cookies().get("Authorization")?.value;

  if (!token) {
    return <>{children}</>;
  }

  redirect("/");
}
