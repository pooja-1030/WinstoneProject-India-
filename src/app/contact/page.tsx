import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Winstone Projects. Visit our Bangalore office or send us an inquiry about our premium residential and commercial developments.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Page Hero */}
      <section className="bg-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('/professional-pattern-76L9dIPN.jpg')", backgroundSize: "400px" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-medium tracking-[0.3em] uppercase">Reach Out</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
            Contact <span className="text-gold">Us</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Our expert team is available 7 days a week to help you find the perfect property.
          </p>
        </div>
      </section>

      <Contact />
    </main>
  );
}
