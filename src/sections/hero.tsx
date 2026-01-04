"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {motion} from "motion/react"
import Image from "next/image"
import heroBgd from "../../public/hero-bgd.png";
import { useRouter } from "next/navigation"


export default function Hero() {
  const router = useRouter();
    return <section className="relative px-6 pt-12 pb-16 lg:pt-8 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <Badge className="bg-white text-blue-600 border-blue-100 px-4 py-1.5 shadow-sm rounded-full">
              ✨ Intelligent Scheduling
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Own your time, <br />
              <span className="text-blue-600">Schedule effortless.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
              The professional way to manage meetings. Sync Google Calendar,
              generate G-Meet links, and automate your workflow.
            </p>
            <div className="flex sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                onClick={() => router.push("/dashboard")}
                size="lg"
                className="rounded-full px-24 h-14 w-56 text-lg bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all hover:-translate-y-1"
              >
                Get Started Free <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
              <Image
                src={heroBgd}
                alt="Schedulify App"
                width={800}
                height={600}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
}