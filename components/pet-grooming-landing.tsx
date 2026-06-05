"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  Bath,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Instagram,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";

type Card = {
  title: string;
  copy: string;
  icon: typeof Bath;
};

const services: Card[] = [
  {
    title: "Bath & Brush",
    copy: "A calming cleanse with coat-safe products, gentle brushing, and a fresh finish.",
    icon: Bath,
  },
  {
    title: "Full Grooming",
    copy: "Breed-aware styling, sanitary trim, bath, brush, blow dry, and finishing touches.",
    icon: Scissors,
  },
  {
    title: "Nail Trimming",
    copy: "Precise nail care with paw balm and patient handling for anxious pets.",
    icon: Sparkles,
  },
  {
    title: "Pet Spa",
    copy: "Hydrating masks, soothing aromatherapy, and extra-soft towel service.",
    icon: Waves,
  },
];

const reasons: Card[] = [
  {
    title: "Expert Groomers",
    copy: "Certified stylists who understand coat types, temperament, and comfort cues.",
    icon: Award,
  },
  {
    title: "Quality Service",
    copy: "Premium products, clean tools, and thoughtful updates from arrival to pickup.",
    icon: Star,
  },
  {
    title: "Happy Pets",
    copy: "Low-stress appointments designed around gentle pacing and positive handling.",
    icon: Heart,
  },
  {
    title: "Safe Environment",
    copy: "Sanitized suites, secure check-in, and careful supervision throughout every visit.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    name: "Maya R.",
    pet: "with Biscuit",
    quote:
      "The team treated Biscuit like royalty. He came home fluffy, relaxed, and somehow even cuter.",
  },
  {
    name: "Jordan L.",
    pet: "with Olive",
    quote:
      "Online booking was easy, the salon is spotless, and Olive's full groom was perfect.",
  },
  {
    name: "Amara K.",
    pet: "with Theo",
    quote:
      "Theo gets nervous, but they moved at his pace. It is the first groom he has ever enjoyed.",
  },
];

const gallery = [
  { title: "Cloud Coat Refresh", tall: true, image: "/images/hero-dog.png" },
  { title: "Before & After Trim", tall: false, image: "/images/before-after.png" },
  { title: "Spa Day Finish", tall: false, image: "/images/hero-dog.png" },
  { title: "Soft Puppy Shape", tall: true, image: "/images/before-after.png" },
  { title: "Fresh Face Detail", tall: false, image: "/images/hero-dog.png" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function PetGroomingLanding() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(cursorY, { stiffness: 90, damping: 24 });
  const heroY = useTransform(smoothY, [0, 900], [-20, 20]);
  const heroX = useTransform(smoothX, [0, 1400], [-18, 18]);

  const navItems = useMemo(
    () => [
      ["Services", "#services"],
      ["Why Us", "#why-us"],
      ["Reviews", "#testimonials"],
      ["Gallery", "#gallery"],
      ["Book", "#booking"],
    ],
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.to("[data-parallax='slow']", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <main className="min-h-screen overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(111,138,104,0.18),transparent_66%)] blur-sm md:block"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_20px_60px_rgba(49,74,54,0.1)] backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-2 font-semibold text-[#253327]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#314a36] text-white">
              <PawPrint size={19} aria-hidden="true" />
            </span>
            LumaPaw
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-[#586152] md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-[#314a36]">
                {label}
              </a>
            ))}
          </div>
          <a
            href="#booking"
            className="hidden items-center gap-2 rounded-full bg-[#314a36] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#314a36]/20 transition hover:-translate-y-0.5 hover:bg-[#253b2a] md:flex"
          >
            Book Appointment
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#314a36] text-white md:hidden"
          >
            <PawPrint size={18} aria-hidden="true" />
          </button>
        </nav>
        {menuOpen ? (
          <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-white/70 bg-white/90 p-4 text-sm font-semibold shadow-xl backdrop-blur-xl md:hidden">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-[#314a36] hover:bg-[#eef4e8]"
              >
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <section id="top" ref={heroRef} className="mesh-bg relative min-h-screen px-4 pb-20 pt-32 sm:pt-36">
        <FloatingDecor />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-[#314a36] shadow-sm backdrop-blur-xl">
              <Sparkles size={16} aria-hidden="true" />
              Premium grooming studio
            </div>
            <h1 className="font-display max-w-3xl text-balance text-5xl leading-[0.95] text-[#1f261f] sm:text-6xl lg:text-7xl">
              Professional Grooming for Happy Pets
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f675c]">
              Pampering your pets with expert grooming and loving care.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#314a36] px-7 py-4 font-semibold text-white shadow-2xl shadow-[#314a36]/20 transition hover:-translate-y-1 hover:bg-[#263c2b]"
              >
                Book Appointment
                <CalendarCheck className="transition group-hover:rotate-6" size={19} aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8cbb8] bg-white/65 px-7 py-4 font-semibold text-[#314a36] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
              >
                View Services
              </a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {["4.9 rating", "2k+ pets", "Same-week slots"].map((item) => (
                <div key={item} className="glass rounded-3xl p-4 text-center">
                  <p className="text-sm font-bold text-[#314a36]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            data-parallax="slow"
            className="relative z-10 mx-auto w-full max-w-3xl"
            style={{ x: heroX, y: heroY }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          >
            <DeviceMockups />
          </motion.div>
        </div>
      </section>

      <SectionIntro
        id="services"
        kicker="Signature services"
        title="A grooming menu built for comfort and polish"
        copy="Each appointment pairs premium products with patient handling, clear communication, and a salon experience pets can settle into."
      />
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FeatureCard key={service.title} card={service} index={index} />
          ))}
        </div>
      </section>

      <section id="why-us" className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal className="rounded-[2rem] bg-[#314a36] p-8 text-white shadow-2xl shadow-[#314a36]/20 sm:p-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#dce8d7]">Why choose us</p>
            <h2 className="font-display text-balance text-4xl leading-tight sm:text-5xl">
              Calm expertise, spotless standards, delighted pets.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <reason.icon className="mb-4 text-[#f2d6bc]" size={24} aria-hidden="true" />
                  <h3 className="font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{reason.copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="grid gap-5">
            <div className="glass rounded-[2rem] p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-semibold text-[#314a36]">Today&apos;s salon flow</p>
                <Clock size={20} aria-hidden="true" />
              </div>
              {["Warm welcome", "Coat consult", "Groom + spa", "Photo-ready pickup"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 border-t border-[#e4d8c8] py-4 first:border-t-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf0e4] text-sm font-bold text-[#314a36]">
                    {index + 1}
                  </span>
                  <span className="font-medium text-[#374238]">{step}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] bg-[#f7e6d3] p-7">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8d5e40]">Bento proof</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["Hypoallergenic", "Sanitized", "No rush", "Photo updates"].map((item) => (
                  <div key={item} className="rounded-3xl bg-white/70 p-4 font-semibold text-[#314a36]">
                    <Check className="mb-3" size={18} aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20">
        <div data-reveal className="mx-auto max-w-5xl rounded-[2rem] bg-white p-5 shadow-[0_30px_90px_rgba(49,74,54,0.12)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#6f8a68]">Testimonials</p>
              <h2 className="font-display mt-3 text-4xl text-[#1f261f]">Loved by pet parents</h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#eef4e8] text-[#314a36] transition hover:bg-[#dfe9d9]"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setActive((active + 1) % testimonials.length)}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#314a36] text-white transition hover:bg-[#263c2b]"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-[#fbf7ee] p-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 flex gap-1 text-[#c98d66]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} fill="currentColor" size={18} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="font-display text-3xl leading-tight text-[#243026]">
                &quot;{testimonials[active].quote}&quot;
              </blockquote>
              <p className="mt-6 font-semibold text-[#314a36]">
                {testimonials[active].name} <span className="font-normal text-[#6d7469]">{testimonials[active].pet}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#6f8a68]">Gallery</p>
            <h2 className="font-display mt-3 text-balance text-4xl leading-tight sm:text-5xl">
              Before, after, and every polished detail between.
            </h2>
          </div>
          <div className="masonry">
            {gallery.map((item, index) => (
              <motion.figure
                data-reveal
                key={`${item.title}-${index}`}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-[0_24px_70px_rgba(49,74,54,0.1)]"
              >
                <div className={`relative overflow-hidden rounded-[1.25rem] ${item.tall ? "h-[440px]" : "h-[280px]"}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-2 py-4 font-semibold text-[#314a36]">{item.title}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 rounded-[2rem] bg-[#263c2b] p-5 text-white shadow-2xl shadow-[#314a36]/20 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
          <div data-reveal className="p-4 sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dce8d7]">Book a visit</p>
            <h2 className="font-display mt-4 text-balance text-4xl leading-tight sm:text-5xl">
              Your pet&apos;s fresh-start appointment is waiting.
            </h2>
            <div className="mt-8 grid gap-4 text-white/82">
              <p className="flex items-center gap-3">
                <Phone size={19} aria-hidden="true" /> (555) 018-PAWS
              </p>
              <p className="flex items-center gap-3">
                <Mail size={19} aria-hidden="true" /> hello@lumapaw.studio
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={19} aria-hidden="true" /> 128 Willow Lane, Greenpoint
              </p>
            </div>
          </div>
          <form data-reveal className="grid gap-4 rounded-[1.5rem] bg-white p-5 text-[#1f261f] sm:grid-cols-2 sm:p-7">
            <label className="grid gap-2 text-sm font-semibold">
              Your name
              <input className="rounded-2xl border border-[#e1d6c7] bg-[#fffdf8] px-4 py-3" name="name" autoComplete="name" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Pet name
              <input className="rounded-2xl border border-[#e1d6c7] bg-[#fffdf8] px-4 py-3" name="pet" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Service
              <select className="rounded-2xl border border-[#e1d6c7] bg-[#fffdf8] px-4 py-3" name="service" defaultValue="Full Grooming">
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Preferred date
              <input className="rounded-2xl border border-[#e1d6c7] bg-[#fffdf8] px-4 py-3" name="date" type="date" />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
              Notes
              <textarea className="min-h-28 rounded-2xl border border-[#e1d6c7] bg-[#fffdf8] px-4 py-3" name="notes" />
            </label>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#314a36] px-6 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-[#263c2b] sm:col-span-2"
            >
              Request Appointment
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <footer className="px-4 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-[#e2d7c8] bg-white/70 p-6 text-sm text-[#5f675c] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[#314a36]">LumaPaw Grooming</p>
            <p className="mt-1">Premium grooming and pet spa care.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-[#314a36]">
                {label}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            {[Instagram, Mail, Phone].map((Icon, index) => (
              <a
                key={index}
                href={index === 0 ? "https://instagram.com" : "#booking"}
                aria-label={index === 0 ? "Instagram" : index === 1 ? "Email" : "Phone"}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#eef4e8] text-[#314a36] transition hover:-translate-y-1"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionIntro({
  id,
  kicker,
  title,
  copy,
}: {
  id: string;
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <section id={id} className="px-4 pt-24">
      <div data-reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#6f8a68]">{kicker}</p>
        <h2 className="font-display mt-4 text-balance text-4xl leading-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#626b5f]">{copy}</p>
      </div>
    </section>
  );
}

function FeatureCard({ card, index }: { card: Card; index: number }) {
  const Icon = card.icon;

  return (
    <motion.article
      data-reveal
      whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
      className="group rounded-[1.75rem] border border-white/70 bg-white/78 p-6 shadow-[0_24px_70px_rgba(49,74,54,0.1)] backdrop-blur-xl"
    >
      <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf0e4] text-[#314a36] transition group-hover:scale-110">
        <Icon size={25} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-[#253327]">{card.title}</h3>
      <p className="mt-3 leading-7 text-[#626b5f]">{card.copy}</p>
    </motion.article>
  );
}

function DeviceMockups() {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-14 hidden h-20 w-20 rounded-full bg-[#f7e6d3] blur-2xl sm:block" />
      <div className="relative rounded-[2rem] bg-[#1d241f] p-3 shadow-[0_38px_90px_rgba(49,74,54,0.28)]">
        <div className="overflow-hidden rounded-[1.35rem] bg-[#fbf7ee]">
          <div className="flex items-center gap-2 border-b border-[#e6dac8] bg-white/80 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#c98d66]" />
            <span className="h-3 w-3 rounded-full bg-[#e6c76d]" />
            <span className="h-3 w-3 rounded-full bg-[#6f8a68]" />
            <span className="ml-3 h-4 w-36 rounded-full bg-[#edf1e8]" />
          </div>
          <div className="grid gap-5 p-5 md:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-3xl bg-[#314a36] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">LumaPaw</p>
              <h3 className="font-display mt-4 text-3xl leading-tight">Soft coats, happy hearts.</h3>
              <div className="mt-8 space-y-3">
                {["Full grooming", "Spa upgrade", "Photo updates"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm">
                    <Check size={16} aria-hidden="true" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
              <Image
                src="/images/hero-dog.png"
                alt="Freshly groomed fluffy dog in a premium grooming salon"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="absolute -bottom-12 -right-2 w-32 rounded-[2rem] bg-[#1d241f] p-2 shadow-2xl sm:w-44 lg:-right-10"
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-[#fffdf8]">
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/30" />
          <div className="relative h-48 sm:h-60">
            <Image
              src="/images/before-after.png"
              alt="Before and after pet grooming transformation"
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <div className="h-3 w-20 rounded-full bg-[#dfe9d9]" />
            <div className="mt-2 h-3 w-14 rounded-full bg-[#f1dec8]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[5%] top-[22%] h-40 w-40 rounded-full bg-[#f2d6bc]/45 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[7%] top-[18%] h-56 w-56 rounded-full bg-[#c8d8bd]/50 blur-3xl"
      />
      {[14, 34, 62, 82].map((left, index) => (
        <motion.div
          key={left}
          animate={{ y: [0, index % 2 === 0 ? -16 : 16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden rounded-full border border-white/70 bg-white/45 p-3 text-[#6f8a68] shadow-lg backdrop-blur md:block"
          style={{ left: `${left}%`, top: `${18 + index * 13}%` }}
        >
          <PawPrint size={18} />
        </motion.div>
      ))}
    </div>
  );
}
