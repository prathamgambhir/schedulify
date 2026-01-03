"use client";

import { Clock, LinkIcon, Mail, Video } from "lucide-react";
import { motion } from "motion/react"
import { fadeInUp } from "@/app/page";

const features = [
  {
    title: "Automated G-Meet Links",
    description:
      "Every booking generates a unique Google Meet link automatically added to both calendars.",
    icon: <Video className="w-6 h-6 text-blue-600" />,
    className: "md:col-span-2 bg-blue-50/50 border-blue-100",
  },
  {
    title: "Smart Availability",
    description:
      "Set your hours once and let Schedulify handle the time zones.",
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    className: "bg-orange-50/50 border-orange-100",
  },
  {
    title: "Email Workflows",
    description:
      "Automated reminders and confirmation emails for all participants.",
    icon: <Mail className="w-6 h-6 text-purple-600" />,
    className: "bg-purple-50/50 border-purple-100",
  },
  {
    title: "Custom Links",
    description:
      "Create personalized booking pages that match your professional brand.",
    icon: <LinkIcon className="w-6 h-6 text-emerald-600" />,
    className: "md:col-span-2 bg-emerald-50/50 border-emerald-100",
  },
];

export default function Features () {
    return <section className="py-24 lg:py-32 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-blue-600">scale.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Powerful tools designed to eliminate the friction of coordinating
            calendars.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] border transition-all hover:shadow-xl hover:-translate-y-1 ${feature.className}`}
            >
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
}