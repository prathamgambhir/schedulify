import { Button } from "@/components/ui/button";
import heroBgd from "../../public/hero-bgd.png";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, LinkIcon, Mail } from "lucide-react";
import LogoScroll from "@/components/logoScroll";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description: "Keep everyone informed with automatic confirmation and reminder emails.",
    extra: "Customizable templates help you maintain your brand tone."
  }
];

// const howItWorks = [
//   { step: "Sign Up", description: "Create your free Schedulrr account" },
//   {
//     step: "Set Availability",
//     description: "Define when you're available for meetings",
//   },
//   {
//     step: "Share Your Link",
//     description: "Send your scheduling link to clients or colleagues",
//   },
//   {
//     step: "Get Booked",
//     description: "Receive confirmations for new appointments automatically",
//   },
// ];

export default function Home() {
  return (
    <main>
      <div className="flex h-auto w-auto items-center pl-24 gap-18 mb-2">
        <div className="flex flex-col items-center justify-center gap-6 pl-10 mb-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-md font-bold text-black-900">
              Own your time ,
            </h3>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
              Schedule Your Meets
            </h1>
            <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
              Effortlessly
            </h1>
          </div>
          <Button className="text-xl p-6 cursor-pointer border hover:bg-white hover:text-black hover:border-black">
            <ArrowRight className="text-xl font-white" />
            Get Started
          </Button>
        </div>
        <Image
          src={heroBgd}
          alt="hero background"
          width={750}
          height={750}
          className="relative"
        ></Image>
      </div>
      <div className="h-24 w-auto">
        <div className="text-center text-lg font-bold opacity-80 pb-[4px]">
          Trusted By
        </div>
        <LogoScroll />
      </div>
      <div className="mt-18 flex flex-col items-center">
        <p className="text-5xl text-center text-blue-600 font-bold p-4 mt-8">
          Features
        </p>
        <div className="flex items-center w-[90%] h-auto flex-wrap justify-center gap-16 mt-8 mb-4 p-6 ">
          {features.map((feature, index) => (
          <Card key={index} className="w-128 h-48 grid grid-cols-4 p-0 m-0 pb-4 br-xl pl-4">
            <CardHeader className="col-span-1 self-center "><feature.icon className="h-16 w-16"/></CardHeader>
            <CardContent className="col-span-3 flex flex-col justify-center gap-4">
              <h2 className="text-xl font-bold">{feature.title}</h2>
              <p className="text-md font-medium">{feature.description}</p>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
