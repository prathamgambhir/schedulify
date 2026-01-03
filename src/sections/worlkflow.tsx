import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

export default function Workflow() {
    return <section className="py-24 bg-slate-950 rounded-3xl text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold">
                The smarter way <br />
                to work.
              </h2>
              <div className="space-y-10">
                {[
                  {
                    step: "01",
                    title: "Connect Google Calendar",
                    desc: "Sync your schedule in seconds with secure OAuth.",
                  },
                  {
                    step: "02",
                    title: "Share Your Unique Link",
                    desc: "Custom URLs that look professional on any platform.",
                  },
                  {
                    step: "03",
                    title: "Automate Everything",
                    desc: "We send the links, the reminders, and the calendar invites.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-blue-500 font-mono text-xl font-bold">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-blue-600/10 border border-blue-500/20 rounded-[3rem] p-8 backdrop-blur-md">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-blue-400 border-blue-400/30"
                  >
                    Live Syncing
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-full bg-slate-800 rounded-lg animate-pulse" />
                  <div className="h-12 w-3/4 bg-slate-800 rounded-lg animate-pulse" />
                  <div className="h-12 w-full bg-blue-600/20 rounded-lg border border-blue-600/30 flex items-center px-4 gap-3">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-blue-400 font-mono">
                      G-Meet Link Generated...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
}