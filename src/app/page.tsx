"use client";

import React from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  LinkIcon,
  Mail,
  Video,
  CheckCircle2,
  Zap,
  Globe,
  Github,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
