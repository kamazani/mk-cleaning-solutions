"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Sparkles,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Binoculars,
  Droplets,
  Leaf,
  Wind,
  Star,
  Facebook,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Clock,
  BadgeCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

/**
 * ✅ PRO NOTES (what I changed)
 * - Removed duplicate imports + removed stray JSX at the bottom (that would break your page)
 * - Added social icons to the Header (desktop) + Footer (all) in a clean way
 * - Made Hero more professional: stronger headline, brand gradient, trust stats, better buttons
 * - Upgraded Services cards (hover + badge + improved structure)
 * - Upgraded Gallery: filters + "lightbox" modal to view images big (very professional)
 * - Moved “Follow” section OUT of your quote form (forms should be simple)
 * - Added "Why choose us" band for trust + conversion
 *
 * ✅ Update images easily:
 * - Put images in /public/jobs/
 * - Update JOB_GALLERY array titles/status/tags whenever you want
 *
 * ✅ Brand colours:
 * - Uses CSS vars: --mk-blue and --mk-green (set in globals.css)
 */

const COMPANY = {
  name: "MK-CLEANING SOLUTIONS",
  phone: "+44 7311599309",
  email: "hello@mkcleaningsolutions.co.uk",
  areas: [
    "Barnsley",
    "Royston",
    "Wakefield",
    "Cawthorne",
    "Penistone",
    "Hoyland",
    "Sheffield",
    "Huddersfield",
  ],
};

const SOCIALS = {
  facebook: "https://www.facebook.com/profile.php?id=61583394993748",
  instagram: "https://www.instagram.com/mkc_solutions?igsh=cjNzZzYwNWU4dXo%3D&utm_source=qr",
  tiktok: "https://tiktok.com/@yourpage", // optional
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
    image: "/Michael01.jpg",
    tag: "Driveway",
    location: "Sheffield",
  },
  {
    id: 2,
    title: "Wheelie Bin Deep Clean",
    status: "In Progress",
    image: "/Michael02.jpg",
    tag: "Bins",
    location: "Barnsley",
  },
  {
    id: 3,
    title: "Window Cleaning (Detached)",
    status: "Completed",
    image: "/Michael03.jpg",
    tag: "Windows",
    location: "Wakefield",
  },
  {
    id: 4,
    title: "Garden Clear & Tidy",
    status: "Completed",
    image: "/Michael04.jpg",
    tag: "Garden",
    location: "Penistone",
  },
];

const services = [
  {
    title: "Wheelie Bin Cleaning",
    desc: "Fresh, hygienic bins with a deodorising rinse. Regular rounds or one-off cleans.",
    icon: Binoculars,
    bullets: ["High-pressure wash", "Sanitise & deodorise", "Eco-friendly products"],
  },
  {
    title: "Driveway Cleaning",
    desc: "Deep pressure washing to lift grime, weeds, moss and stains for a like-new look.",
    icon: Droplets,
    bullets: ["Block paving & concrete", "Weed/moss removal", "Optional re-sanding (add-on)"],
  },
  {
    title: "Garden Cleaning",
    desc: "Outdoor tidy-ups and clear-outs to make your garden feel clean, open and cared for.",
    icon: Leaf,
    bullets: ["Seasonal tidy-ups", "Patios & paths", "Waste removal ready"],
  },
  {
    title: "Window Cleaning",
    desc: "Crystal-clear windows with a streak-free finish. Frames and sills included.",
    icon: Wind,
    bullets: ["Pure water system", "Frames & sills cleaned", "Regular rounds available"],
  },
];

const pricing = [
  {
    name: "Starter Shine",
    price: "From £15",
    note: "Perfect for one service",
    includes: ["One service", "Quick turnaround", "Text confirmation"],
    highlight: false,
  },
  {
    name: "Most Popular",
    price: "From £35",
    note: "Bundle & save",
    includes: ["2–3 services", "Priority slots", "Discounted add-ons"],
    highlight: true,
  },
  {
    name: "Full Exterior",
    price: "From £65",
    note: "Big clean, big impact",
    includes: ["Multiple areas", "Deep clean focus", "Before/after photos"],
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Driveway looks brand new. Fast, friendly and professional — highly recommend.",
    stars: 5,
  },
  {
    name: "James P.",
    text: "Wheelie bins went from awful to spotless. No smell at all afterwards.",
    stars: 5,
  },
  {
    name: "Nadia K.",
    text: "Windows are crystal clear. Great attention to detail and reliable timing.",
    stars: 5,
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

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const telHref = useMemo(() => `tel:${COMPANY.phone.replace(/\s+/g, "")}`, []);
  const waHref = useMemo(() => SOCIALS.whatsapp, []);

  async function submit(formData: FormData) {
    setStatus("sending");
    try {
      const payload = Object.fromEntries(formData.entries());
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-mk min-h-screen relative">
      {/* Background image underlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('/Michael03.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />
      {/* Page content */}
      <div className="relative z-10">
        <Header telHref={telHref} />

        {/* HERO */}
        <section className="container-pad pt-12 pb-12 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-soft">
                <Sparkles className="h-4 w-4" style={{ color: "rgb(var(--mk-blue))" }} />
                <span className="text-sm font-medium text-slate-700">
                  Exterior cleaning • Fast bookings • Professional finish
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Spotless, <BrandGradientText>Cleaning</BrandGradientText> from the outside in.
              </h1>

              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {COMPANY.name} provides premium <strong>bin cleaning</strong>, <strong>driveway washing</strong>,{" "}
                <strong>garden tidy-ups</strong>, and <strong>window cleaning</strong> — reliable service, consistent results.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white shadow-soft hover:opacity-95"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                  }}
                >
                  Get a Free Quote <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-6 py-3 shadow-soft hover:bg-white"
                >
                  <PhoneCall className="h-5 w-5" style={{ color: "rgb(var(--mk-blue))" }} />
                  Call {COMPANY.phone}
                </a>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-6 py-3 shadow-soft hover:bg-white"
                >
                  <MessageCircle className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />
                  WhatsApp
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <TrustCard
                  icon={<ShieldCheck className="h-5 w-5" style={{ color: "rgb(var(--mk-blue))" }} />}
                  title="Trusted & Insured"
                  desc="Professional local service"
                />
                <TrustCard
                  icon={<Clock className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />}
                  title="Quick Turnaround"
                  desc="Same-week slots available"
                />
                <TrustCard
                  icon={<BadgeCheck className="h-5 w-5 text-indigo-600" />}
                  title="Quality Finish"
                  desc="Streak-free and thorough"
                />
              </div>

              <div className="mt-6 text-sm text-slate-600">
                Serving: <span className="font-semibold text-slate-800">{COMPANY.areas.slice(0, 4).join(", ")}</span>{" "}
                <span className="text-slate-500">+ more</span>
              </div>
            </div>

            <HeroArt />
          </div>
        </section>

        {/* WHY US */}
        <section className="container-pad pb-2">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-3">
              <WhyCard
                title="Modern equipment"
                desc="Powerful, controlled cleaning that protects surfaces while lifting stains."
              />
              <WhyCard
                title="Eco-conscious products"
                desc="We keep it clean while being mindful of your home and the environment."
              />
              <WhyCard
                title="Reliable communication"
                desc="Clear booking, confirmations, and quick responses by phone or WhatsApp."
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="container-pad py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Services  <BrandGradientText>shine</BrandGradientText>
              </h2>
              <p className="mt-2 text-slate-600">Choose one service or bundle and save.</p>
            </div>
            <a
              href="#quote"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 shadow-soft hover:bg-white"
            >
              Request quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="group glass rounded-3xl p-6 transition hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-2xl p-3 shadow-soft"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                    }}
                  >
                    <s.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                      <span className="hidden sm:inline-flex rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
                        Popular
                      </span>
                    </div>

                    <p className="mt-1 text-slate-600">{s.desc}</p>

                    <ul className="mt-4 grid gap-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4" style={{ color: "rgb(var(--mk-green))" }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="container-pad py-12">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Simple pricing that <BrandGradientText>makes sense</BrandGradientText>
          </h2>
          <p className="mt-2 text-slate-600">
            Transparent starting prices — final quote depends on size and condition.
          </p>

          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={classNames(
                  "rounded-3xl p-6 border shadow-soft transition",
                  p.highlight
                    ? "bg-slate-900 text-white border-slate-900 hover:opacity-[0.98]"
                    : "bg-white/70 border-slate-200 hover:bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className={classNames("text-lg font-bold", !p.highlight && "text-slate-900")}>
                    {p.name}
                  </div>
                  {p.highlight && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08))",
                        border: "1px solid rgba(255,255,255,0.22)",
                      }}
                    >
                      Best value
                    </span>
                  )}
                </div>

                <div className="mt-4 text-4xl font-extrabold">{p.price}</div>
                <div className={classNames("mt-1 text-sm", p.highlight ? "text-white/80" : "text-slate-600")}>
                  {p.note}
                </div>

                <ul className="mt-5 grid gap-2">
                  {p.includes.map((i) => (
                    <li
                      key={i}
                      className={classNames(
                        "flex items-center gap-2 text-sm",
                        p.highlight ? "text-white/90" : "text-slate-700"
                      )}
                    >
                      <CheckCircle2
                        className={classNames("h-4 w-4", p.highlight ? "text-emerald-300" : "")}
                        style={!p.highlight ? { color: "rgb(var(--mk-green))" } : undefined}
                      />
                      {i}
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote"
                  className={classNames(
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-soft",
                    p.highlight ? "bg-white text-slate-900 hover:opacity-95" : "bg-slate-900 text-white hover:opacity-95"
                  )}
                >
                  Get quote <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* AREAS + TESTIMONIALS */}
        <section className="container-pad py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="glass rounded-3xl p-7">
              <h3 className="text-2xl font-extrabold">Areas served</h3>
              <p className="mt-2 text-slate-600">
                Covering Barnsley, Sheffield, Wakefield, Huddersfield and nearby areas.
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {COMPANY.areas.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-slate-700">
                    <MapPin className="h-4 w-4" style={{ color: "rgb(var(--mk-blue))" }} />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-sm font-semibold">Same-week availability</div>
                <div className="text-sm text-slate-600">Message or call for the next slot.</div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-bold">Follow us</div>
                <div className="mt-2">
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-7">
              <h3 className="text-2xl font-extrabold">Customer love</h3>
              <p className="mt-2 text-slate-600">What clients say about MK-CLEANING SOLUTIONS.</p>

              <div className="mt-5 grid gap-4">
                {testimonials.map((t) => (
                  <div key={t.name} className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{t.name}</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-slate-700">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE FORM */}
        <section id="quote" className="container-pad py-14">
          <div className="glass rounded-3xl p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Get a free Quote <BrandGradientText>quote</BrandGradientText>
                </h2>
                <p className="mt-2 text-slate-600">Tell us what you need — we’ll reply ASAP.</p>
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 shadow-soft hover:bg-white"
                >
                  <MessageCircle className="h-5 w-5" style={{ color: "rgb(var(--mk-green))" }} />
                  WhatsApp
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
              </div>
            </div>

            <form className="mt-7 grid gap-4 md:grid-cols-2" action={(fd) => submit(fd)}>
              <Field label="Full name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" placeholder="07..." />
              <Field label="Email" name="email" placeholder="you@email.com" />
              <Field label="Postcode / Area" name="area" placeholder="S..." />

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-800">Service(s)</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {services.map((s) => (
                    <label
                      key={s.title}
                      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-3 hover:bg-white transition"
                    >
                      <input type="checkbox" name="services" value={s.title} className="h-4 w-4" />
                      <span className="text-sm text-slate-800">{s.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-800">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about the job (size, condition, preferred date)..."
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:ring-2 focus:ring-sky-300"
                  required
                />
                <p className="mt-2 text-xs text-slate-500">
                  Tip: add photos on WhatsApp for the fastest quote.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white shadow-soft hover:opacity-95 disabled:opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
                }}
              >
                {status === "sending" ? "Sending..." : "Send request"} <ArrowRight className="h-4 w-4" />
              </button>

              {status === "sent" && (
                <p className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                  Thanks! Your request was sent. We’ll get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
                  Something went wrong sending the form. Please call {COMPANY.phone}.
                </p>
              )}
            </form>
          </div>
        </section>

        <Footer telHref={telHref} />
        <MobileStickyCall telHref={telHref} />
      </div>
    </main>
  );
}

function TrustCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-slate-200 bg-white/80 p-2 shadow-soft">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft hover:bg-white transition">
      <div className="text-lg font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 text-slate-600">{desc}</div>
    </div>
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
            <Link href="#services" className="hover:text-slate-900">Services</Link>
            <Link href="/gallery" className="hover:text-slate-900">Gallery</Link>
            <Link href="/about" className="hover:text-slate-900">About</Link>
            <Link href="#pricing" className="hover:text-slate-900">Pricing</Link>
            <Link href="#quote" className="hover:text-slate-900">Quote</Link>
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

function HeroArt() {
  return (
    <div className="relative">
      {/* Replace abstract art with a real cleaning image */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-soft border border-slate-200 bg-white/70">
        <video
          src="/mkvid1.mp4"
          className="w-full h-80 object-cover"
          controls
          playsInline
          poster="/Michael03.jpg"
        >
          Sorry, your browser does not support embedded videos.
        </video>
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
      <div className="text-xs font-semibold text-slate-600">{title}</div>
      <div className="mt-1 text-base font-bold text-slate-900">{value}</div>
    </div>
  );
}

function Field({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:ring-2 focus:ring-sky-300"
        required
      />
    </div>
  );
}

function Footer({ telHref }: { telHref: string }) {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="container-pad py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-extrabold">{COMPANY.name}</div>
            <p className="mt-2 text-sm text-slate-600">
              Wheelie bin cleaning, driveway cleaning, garden cleaning, and window cleaning.
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>

          <div>
            <div className="font-bold">Contact</div>
            <div className="mt-2 text-sm text-slate-700">
              Phone:{" "}
              <a className="underline" href={telHref}>
                {COMPANY.phone}
              </a>
            </div>
            <div className="mt-1 text-sm text-slate-700">
              Email:{" "}
              <a className="underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </div>
          </div>

          <div>
            <div className="font-bold">Hours</div>
            <div className="mt-2 text-sm text-slate-700">Mon–Sat: 8:00–18:00</div>
            <div className="mt-1 text-sm text-slate-700">Sunday: Closed</div>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCall({ telHref }: { telHref: string }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 sm:hidden">
      <div className="container-pad">
        <a
          href={telHref}
          className="flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-white shadow-soft hover:opacity-95"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(var(--mk-blue)), rgb(var(--mk-green)))",
          }}
        >
          <PhoneCall className="h-5 w-5" />
          Call MK-Cleaning
        </a>
      </div>
    </div>
  );
}
