"use client";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

const COMPANY = {
  name: "MK-CLEANING SOLUTIONS",
  phone: "+44 7311599309",
  email: "hello@mkcleaningsolutions.co.uk",
};

export default function AboutPage() {
  return (
    <main className="bg-mk min-h-screen relative">
      {/* Background image underlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/Michael03.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />
      {/* Page content */}
      <div className="relative z-10">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="container-pad flex flex-col md:flex-row items-start md:items-center justify-between py-3 gap-3 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div
              className="h-10 w-10 rounded-2xl shadow-soft grid place-items-center overflow-hidden bg-white"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
              }}
            >
              <img
                src="/Michael03.jpg"
                alt="MK-Cleaning Solutions Logo"
                className="object-cover h-10 w-10"
              />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">{COMPANY.name}</div>
              <div className="text-xs text-slate-600">Bins • Driveways • Gardens • Windows</div>
            </div>
          </div>
          <nav className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 text-sm font-semibold text-slate-700 w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full md:w-auto">
              <Link href="/" className="hover:text-slate-900">Home</Link>
              <Link href="/gallery" className="hover:text-slate-900">Gallery</Link>
              <Link href="/about" className="hover:text-slate-900 font-bold">About</Link>
              <Link href="#pricing" className="hover:text-slate-900">Pricing</Link>
              <Link href="#quote" className="hover:text-slate-900">Quote</Link>
            </div>
            <div className="flex items-center gap-3 mt-2 md:mt-0">
              <a
                href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white shadow-soft hover:opacity-95"
              >
                <PhoneCall className="h-4 w-4" />
                Call
              </a>
            </div>
          </nav>
        </div>
      </header>
      <section className="container-pad py-12">
        <div className="glass rounded-3xl p-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 text-slate-900">About Us</h1>
          <p className="text-lg text-slate-700 mb-6">
            MK-Cleaning Solutions is a local, family-run business dedicated to providing top-quality exterior cleaning services across Barnsley, Sheffield, Wakefield, Huddersfield, and surrounding areas. We pride ourselves on reliability, professionalism, and delivering a spotless finish every time.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-2 text-slate-900">Our Mission</h2>
          <p className="text-slate-700 mb-6">
            Our mission is to make your home or business shine, using modern equipment and eco-friendly products. We believe in clear communication, honest pricing, and building lasting relationships with our clients.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-2 text-slate-900">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Fully insured and trusted local team</li>
            <li>Flexible bookings and quick turnaround</li>
            <li>Eco-conscious cleaning methods</li>
            <li>Friendly, professional service</li>
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-2 text-slate-900">Contact</h2>
          <p className="text-slate-700">
            Phone: <a className="underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a><br />
            Email: <a className="underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </p>
        </div>
      </section>
      </div>
    </main>
  );
}
