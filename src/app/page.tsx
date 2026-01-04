"use client";

import React from "react";
import Hero from "@/sections/hero";
import Features from "@/sections/features";
import Workflow from "@/sections/worlkflow";
import FinalCta from "@/sections/final-cta";
import HowItWorks from "@/sections/how-it-works";

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Workflow /> */}
      <FinalCta />
    </div>
  );
}


/*
ToDo Left
>>>>[fixed]-All the buttons and clickable items should be redirecting to something
>>>>>[fixed]-Toastify effects should be added on Login, signup, create events, delete events, update usernmae, Booking etc
>>>>[fixedddd]Signup ke baad turant signin not working
-responsive
-Dark mode if possible
*/