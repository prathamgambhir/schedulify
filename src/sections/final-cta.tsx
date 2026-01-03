import { Button } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="px-6 py-44 pb-24">
      <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 leading-tight">
          Ready to clear your <br />
          calendar?
        </h2>
        <div className="flex flex-col mt-8 sm:flex-row gap-4 justify-center items-center relative z-10">
          <Button
            size="default"
            className="bg-white text-blue-600 hover:bg-slate-50 rounded-full px-12 h-16 text-lg font-bold"
          >
            Get Started Free
          </Button>
          <p className="text-blue-100 font-medium sm:ml-4">
            No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
