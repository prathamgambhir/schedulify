"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Calendar, Link as LinkIcon, Users, Zap } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Set your availability",
    description: "Define exactly when you're free to meet. Our system syncs with your Google Calendar to prevent double-bookings automatically.",
    features: ["Custom working hours", "Buffer times between meetings"],
    video: "/videos/availability.mp4",
    align: "right", // Text on right, Video on left
  },
  {
    number: "2",
    title: "Create public & private events",
    description: "Design different meeting types for different needs. Use public links for general booking or private links for exclusive consultations.",
    features: ["Unique event URLs", "One-time use links"],
    video: "/videos/events.mp4",
    align: "left", // Text on left, Video on right
  },
  {
    number: "3",
    title: "Let others book effortlessly",
    description: "Share your link and let guests pick a time that works for everyone. No more back-and-forth emails.",
    features: ["Mobile-optimized booking", "Instant calendar invites"],
    video: "/videos/booking.mp4",
    align: "right",
  },
  {
    number: "4",
    title: "Automate your workflow",
    description: "Sit back as Schedulify generates Google Meet links, sends email reminders, and updates your calendar in real-time.",
    features: ["Auto Google Meet links", "Email notifications"],
    video: "/videos/automation.mp4",
    align: "left",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How it <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Focus on your work while we handle the coordination. Here is how Schedulify transforms your calendar.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-32 md:space-y-48">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col gap-12 lg:gap-24 items-center ${
                step.align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: step.align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-slate-900">{step.number}.</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-4 pt-4">
                  {step.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Video/Mockup Side */}
              <motion.div 
                initial={{ opacity: 0, x: step.align === "left" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="flex-1 w-full"
              >
                <div className="relative group">
                  {/* Browser Mockup Shell */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-slate-50 relative overflow-hidden">
                       <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                       >
                        <source src={step.video} type="video/mp4" />
                       </video>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}