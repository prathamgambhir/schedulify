import Image from "next/image";
import Link from "next/link";
import NavLogo from "../../../public/nav-logo.jpg";
import { CalendarClockIcon, CalendarDaysIcon, MailCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-16 pb-8 mt-24">
      {/* 2. Inner container to align content with your dashboard cards */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-12">
          {/* ... Brand Section ... */}
          <div className="space-y-4 col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src={NavLogo}
                alt="logo"
                className="h-auto w-auto"
                height={100}
                width={140}
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Simplifying coordination through automated calendar syncing and
              instant meeting links.
            </p>
          </div>

          {/* ... Platform Links ... */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-900 mb-5">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                <Link href={"/events"}>Events</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                <Link href={"/availability"}>Availability</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                <Link href={"/meetings"}>Meeting</Link>
              </li>
            </ul>
          </div>

          {/* ... Integrations ... */}
          <div className="col-span-1">
            <h4 className="font-semibold text-slate-900 mb-5">Integrations</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                  <CalendarDaysIcon />
                </div>
                Google Calendar
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                  <CalendarClockIcon />
                </div>
                Google Meet
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                  <MailCheck />
                </div>
                Email Reminders
              </li>
            </ul>
          </div>

          {/* ... Project Section ... */}
          <div className="flex flex-col items-start lg:col-span-2 lg:items-end">
            <div className="w-full max-w-[280px] p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Project by Pratham Gambhir
              </p>
              <div className="flex flex-col gap-2">
                <button className="w-full py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all active:scale-95">
                  View on GitHub
                </button>
                <button className="w-full py-2 bg-slate-50 text-black text-sm border border-black/60 font-medium rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                  Connect on X
                </button>
                <button className="w-full py-2 bg-slate-50 text-black text-sm border border-black/60 font-medium rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                  Connect on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400">
            © 2025 Schedulify. All meeting links are encrypted and secure.
          </p>
          <div className="flex items-center gap-8 text-xs text-slate-500 font-medium">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="flex items-center gap-2 py-1 px-3 bg-green-50 text-green-700 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Systems Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
