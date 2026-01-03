// ✅ WHAT YOU WANT:
// 1) Remove the Gallery section from your Home/Services page
// 2) Make Gallery its own page at /gallery
// 3) Update the Header nav link to go to /gallery (instead of #gallery)

// ✅ DO THIS IN 3 STEPS:
// A) Update your existing home page file (app/page.tsx): remove <JobGallery />
// B) Create a new gallery page file (app/gallery/page.tsx)
// C) Update the Header nav link from "#gallery" to "/gallery"

// -----------------------------------------------------------------------------
// A) UPDATE: app/page.tsx  (HOME PAGE)
// -----------------------------------------------------------------------------
// 1) REMOVE this line from your home page JSX:
//    <JobGallery />
//
// 2) REMOVE the entire JobGallery() component from app/page.tsx (since it will move to /gallery)
//
// 3) UPDATE your Header nav link to "/gallery" (see section C below)

// -----------------------------------------------------------------------------
// B) CREATE: app/gallery/page.tsx  (NEW GALLERY PAGE)
// -----------------------------------------------------------------------------
// Create folder: app/gallery/
// Create file:   app/gallery/page.tsx
// Paste this entire code:

"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

const COMPANY = {
  name: "MK-CLEANING SOLUTIONS",
  phone: "+44 7311599309",
};

const SOCIALS = {
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/yourpage",
  tiktok: "https://tiktok.com/@yourpage",
  whatsapp: "https://wa.me/447311599309",
};

type JobTag = "Bins" | "Driveway" | "Garden" | "Windows";
type JobStatus = "Completed" | "In Progress";

const JOB_GALLERY: Array<{
  id: number;
  title: string;
  status: JobStatus;
  image: string;
  tag: JobTag;
  location?: string;
}> = [
  {
    id: 1,
    title: "Driveway Pressure Wash",
    status: "Completed",
    image: "/Michael03.jpg", // driveway
    tag: "Driveway",
    location: "Sheffield",
  },
  {
    id: 2,
    title: "Wheelie Bin Deep Clean",
    status: "In Progress",
    image: "/Michael02.jpg", // bin
    tag: "Bins",
    location: "Barnsley",
  },
  {
    id: 3,
    title: "Window Cleaning (Detached)",
    status: "Completed",
    image: "/Michael03.jpg", // windows
    tag: "Windows",
    location: "Wakefield",
  },
  {
    id: 4,
    title: "Garden Clear & Tidy",
    status: "Completed",
    image: "/Michael04.jpg", // garden
    tag: "Garden",
    location: "Penistone",
  },
  {
    id: 5,
    title: "Driveway Moss Removal",
    status: "Completed",
    image: "/Michael03.jpg", // driveway
    tag: "Driveway",
    location: "Royston",
  },
  {
    id: 6,
    title: "Garden Waste Removal",
    status: "In Progress",
    image: "/Michael03.jpg", // garden
    tag: "Garden",
    location: "Huddersfield",
  },
  {
    id: 7,
    title: "Bin Cleaning (Terraced)",
    status: "Completed",
    image: "/Michael03.jpg", // bin
    tag: "Bins",
    location: "Hoyland",
  },
  {
    id: 8,
    title: "Window Cleaning (Shop Front)",
    status: "Completed",
    image: "/Michael03.jpg", // windows
    tag: "Windows",
    location: "Cawthorne",
  },
];

function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function BrandGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
      }}
    >
      {children}
    </span>
  );
}

export default function GalleryPage() {
  const telHref = useMemo(() => `tel:${COMPANY.phone.replace(/\s+/g, "")}`, []);
  const waHref = useMemo(() => SOCIALS.whatsapp, []);

  const [filter, setFilter] = useState<"All" | JobTag>("All");
  const [active, setActive] = useState<(typeof JOB_GALLERY)[number] | null>(null);

  const filtered = JOB_GALLERY.filter((j) => (filter === "All" ? true : j.tag === filter));
  const tabs: Array<"All" | JobTag> = ["All", "Bins", "Driveway", "Garden", "Windows"];

  return (
    <main className="bg-mk min-h-screen">
      <Header telHref={telHref} />

      <section className="container-pad pt-10 pb-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 shadow-soft hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </a>

        <div className="mt-6 glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Gallery of recent jobs<BrandGradientText>recent jobs</BrandGradientText>
              </h1>
              <p className="mt-2 text-slate-600">
                Browse completed and in-progress work. Tap an image to view full-size.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 shadow-soft hover:bg-white"
              >
                <MessageCircle className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />
                WhatsApp
                <ExternalLink className="h-4 w-4 text-slate-500" />
              </a>

              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white shadow-soft hover:opacity-95"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                }}
              >
                Get Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const activeTab = t === filter;
              return (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={classNames(
                    "rounded-full px-4 py-2 text-sm font-semibold border shadow-soft transition",
                    activeTab
                      ? "text-white border-transparent"
                      : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white"
                  )}
                  style={
                    activeTab
                      ? {
                          backgroundImage:
                            "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                        }
                      : undefined
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-pad pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((job) => (
            <button
              key={job.id}
              onClick={() => setActive(job)}
              className="group text-left overflow-hidden rounded-3xl border border-slate-200 bg-white/70 backdrop-blur shadow-soft hover:shadow-glow transition"
              type="button"
            >
              <div className="relative">
                <img
                  src={job.image}
                  alt={job.title}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.70) 100%)",
                  }}
                />

                <div className="absolute left-3 top-3">
                  <span
                    className={classNames(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border shadow-soft",
                      job.status === "Completed"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-sky-50 text-sky-800 border-sky-200"
                    )}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 shadow-soft">
                    {job.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-semibold text-white">{job.title}</div>
                  {job.location ? <div className="text-xs text-white/80">{job.location}</div> : null}
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm font-semibold text-slate-900">{job.title}</div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                    }}
                  />
                  <span className="text-xs text-slate-600">Tap to view</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" className="container-pad pb-14">
        <div className="glass rounded-3xl p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-extrabold">Want a great service like this?</div>
              <div className="mt-1 text-slate-600">Call or WhatsApp for the fastest quote.</div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white shadow-soft hover:opacity-95"
              >
                <PhoneCall className="h-5 w-5" />
                Call now
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-white shadow-soft hover:opacity-95"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                }}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp photos
                <ExternalLink className="h-4 w-4 text-white/80" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div>
                <div className="font-extrabold">{active.title}</div>
                <div className="text-sm text-slate-600">
                  {active.tag} • {active.status}
                  {active.location ? ` • ${active.location}` : ""}
                </div>
              </div>
              <button
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                onClick={() => setActive(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <img src={active.image} alt={active.title} className="w-full max-h-[75vh] object-cover" />
          </div>
        </div>
      ) : null}
    </main>
  );
}


function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={SOCIALS.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="rounded-xl border border-slate-200 bg-white/70 p-2 shadow-soft hover:bg-white transition"
      >
        <Facebook className="h-5 w-5" style={{ color: "rgb(var(--mk-blue))" }} />
      </a>

      <a
        href={SOCIALS.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="rounded-xl border border-slate-200 bg-white/70 p-2 shadow-soft hover:bg-white transition"
      >
        <Instagram className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />
      </a>

      <a
        href={SOCIALS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="rounded-xl border border-slate-200 bg-white/70 p-2 shadow-soft hover:bg-white transition"
      >
        <MessageCircle className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />
      </a>
    </div>
  );
}


function Header({ telHref }: { telHref: string }) {
  return (
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
            <a href="/" className="hover:text-slate-900">Home</a>
            <a href="/gallery" className="hover:text-slate-900">Gallery</a>
            <a href="/about" className="hover:text-slate-900">About</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#quote" className="hover:text-slate-900">Quote</a>
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <SocialLinks />
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white shadow-soft hover:opacity-95"
            >
              <PhoneCall className="h-4 w-4" />
              Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
