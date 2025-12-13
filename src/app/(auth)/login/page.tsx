import { signin, signinWithGoogle } from "@/actions/authAction";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
  const session = await auth();
  if (session?.user) {
    redirect("/");
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
              <Button
                type="submit"
                className="w-[50%] p-[20px] ml-[25%] font-semibold text-sm cursor-pointer"
              >
                Login
              </Button>
              <span className="text-sm text-muted-foreground flex items-center justify-center mt-4 mb-4 font-bold text-lg ">
                Or
              </span>
            </div>
          </form>
          <form
            action={signinWithGoogle}
            className="flex justify-center items-center"
          >
            <Button type="submit" className="w-[60%] p-[20px] cursor-pointer">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA2FBMVEVHcEwHsYsZld0OvF8yhv4KuHATrJdNgtH/hiv+0Av/SEspv0T+Sj++qgwyhf3/UGb+TD3/iR1WwxV8xgD+RkH+RUD/zgn/S1H/R0P/zwn/tQoekuMcm8j/SUv1zAJGwiY0hv3mygCyyQEUvFklvkYCqKz/qBD/YDL/jRwxhv//aC0FrZgDo7yBxgClyAH+RkEzhfwNvF//zgT/0g88gvVFf+z/UWoBqKoKn8f/WjQKt3T/S1P/cSj7xQMnjPBAwSxRfOH/nxOYxwFlxQbFygEYvVRVet3dygGPQSe/AAAAL3RSTlMA+/2iYWUYDROclv79Bie5r/j4+GNyOz7RW/6jXFjIuuE2/s073LHByorr3YfIsuWqn+wAAAEUSURBVCiRrdDZVsIwEAbgiHahtFoQBOQcAfed0DaFSjcU4f3fyEmTNClUr/yvknxnkpkg9A8xu5brWl2zhvqDGc+gv2+uLWwVhmcVcp6jyJ7Z3MLQUrEdx5FdFlYr79ftGEp70IvZs1cVmyaXoA9iW7kTXXmgj7/M50ESpx6Hvu95TbY2ZNhB04dcsDUheb7d5jkhgSGRf1pAWIIAnx4gDlgwLhEa4tdiGYZD2i1v6KTIhGI5SrLbqKNQm4hP2G2uP9+kjdIU4ye+mYKdf42FvS4bjTTVxfYdrJO1NDgwtJfFEnQkLyrse07zcbSgqnTgdLKsNedIVUdqxrywKL0z9r7/9qZEDR1G144hml5D8v2/UMkPwUwyMLiq0boAAAAASUVORK5CYII="
                  alt="@google-logo"
                />
              </Avatar>
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
