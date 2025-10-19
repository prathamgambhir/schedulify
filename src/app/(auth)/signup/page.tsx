import { signup } from "@/actions/authAction";
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
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth()
    if(session?.user){
      redirect("/")
    }

  return (
    <div className="flex justify-center mt-18">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Fill in the details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="tony stark"
                  required
                  />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  />
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
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
            <div className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full cursor-pointer">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center flex justify-center items-center text-muted-foreground pt-4">
          <span>
            Already have an account?
            <Link href={"/login"}>
              <Button variant={"link"} className="cursor-pointer">
                Login
              </Button>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
