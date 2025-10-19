"use client";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Tesla",
  "Adobe",
  "Spotify",
  "Airbnb",
];

export default function LogoScroll() {
    const allCompanies = [...companies,...companies,...companies]
  return (
    <section>
      <div className="relative overflow-hidden">
        {/* Blur gradients */}
        <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-blue-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-100 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex items-center gap-16 opacity-60 mt-6 animate-scroll whitespace-nowrap">
          {/* First set */}
          {allCompanies.map((partner, index) => (
            <div key={`first-${index}`} className="text-gray-500 uppercase tracking-wide text-md font-semibold flex-shrink-0">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
