import { auth } from "@/auth";
import { SignupForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth()
    if(session?.user){
      redirect("/")
    }

  return (
    <div className="flex justify-center mt-18">
      <SignupForm />
    </div>
  );
}
