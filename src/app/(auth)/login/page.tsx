import { signin, signinWithGoogle } from "@/actions/authAction";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth()
  if(session?.user){
    redirect("/")
  }

  return (
    <div className="flex justify-center mt-18 w-full">
      <Card className="w-full max-w-md h-">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Fill in the details below to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
            </div>
            <div className="flex-col items-center justify-center gap-2 mt-6">
              <Button type="submit" className="w-[50%] p-[20px] ml-[25%] font-semibold text-sm cursor-pointer">
                Login
              </Button>
              <span className="text-sm text-muted-foreground flex items-center justify-center mt-4 mb-4 font-bold text-lg ">
                Or
              </span>
            </div>
          </form>
          <form action={signinWithGoogle} className="flex justify-center items-center">
            <Button type="submit" className="w-[60%] p-[20px] cursor-pointer">
              {/* add google logo */}
              Login with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground pt-4">
          <span>
            Don&apos;t have an account?
            <Link href={"/signup"}>
              <Button variant={"link"} className="cursor-pointer">
                Create
              </Button>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
