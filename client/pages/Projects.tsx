import { useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Menu,
  X,
  ContactRound,
  Earth,
} from "lucide-react";

// Photos — served from the /public/projectsimg folder
const heroImg = "/projectsimg/hero.webp";
const work1 = "/projectsimg/work-1.png";
const work2 = "/projectsimg/work-2.png";
const work3 = "/projectsimg/work-3.png";
const work4 = "/projectsimg/work-4.png";
const work5 = "/projectsimg/work-5.png";
const work6 = "/projectsimg/work-6.png";
const work7 = "/projectsimg/work-7.png";
const work8 = "/projectsimg/work-8.png";
const work9 = "/projectsimg/work-9.png";

type RoofType = "Solar on Sheet" | "Solar on Structure" | "Solar Roof";
type ProjectType = "Residential" | "Commercial";
type SystemType = "On-Grid" | "Off-Grid" | "Hybrid";
type Quality = "Standard" | "Premium";

interface WorkItem {
  img: string;
  title: string;
  subtitle: string;
  location: string;
  roofType: RoofType;
  projectType: ProjectType;
  systemType: SystemType;
  quality: Quality;
}

const ROOF_OPTIONS: RoofType[] = ["Solar on Sheet", "Solar on Structure", "Solar Roof"];
const PROJECT_OPTIONS: ProjectType[] = ["Residential", "Commercial"];
const SYSTEM_OPTIONS: SystemType[] = ["On-Grid", "Off-Grid", "Hybrid"];
const QUALITY_OPTIONS: Quality[] = ["Standard", "Premium"];

// Fades + slides content up into view the first time it enters the viewport.
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

// A single filter dropdown: pill trigger + floating option panel.
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = value !== "All";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full border transition-colors duration-200 ${isActive
          ? "bg-[#BA0013] border-[#BA0013] text-white"
          : "bg-white border-[#dfddda] text-[#1A1C1A] hover:border-[#5D3F3C]/40"
          }`}
      >
        {isActive ? value : label}
        <ChevronDown
          size={15}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-40 mt-2 min-w-45 rounded-[8px] bg-white shadow-lg ring-1 ring-[#dfddda] overflow-hidden py-1.5">
          {["All", ...options].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${value === opt
                ? "text-[#BA0013] font-semibold bg-[#FCE3E7]"
                : "text-[#5D3F3C] hover:bg-[#f1f0ee]"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.887.525 3.65 1.436 5.152L2 22l4.973-1.404A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.2a8.17 8.17 0 0 1-4.169-1.141l-.299-.177-3.106.878.847-3.09-.194-.313A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.201-8.2 4.52 0 8.199 3.68 8.199 8.2 0 4.52-3.679 8.2-8.199 8.2z" />
    </svg>
  );
}

export default function Projects() {
  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const work: WorkItem[] = [
    {
      img: work1,
      title: "Residential Rooftop",
      subtitle: "– 5 kW Solar Installation",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Structure",
      projectType: "Residential",
      systemType: "On-Grid",
      quality: "Premium",
    },
    {
      img: work2,
      title: "Residential Rooftop",
      subtitle: "– 4 kW Solar Installation",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Sheet",
      projectType: "Residential",
      systemType: "On-Grid",
      quality: "Standard",
    },
    {
      img: work3,
      title: "Commercial Building",
      subtitle: "– 10 kW Rooftop System",
      location: "Hubballi, Karnataka",
      roofType: "Solar Roof",
      projectType: "Commercial",
      systemType: "Hybrid",
      quality: "Premium",
    },
    {
      img: work4,
      title: "Residential Rooftop",
      subtitle: "– 6 kW Solar Installation",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Structure",
      projectType: "Residential",
      systemType: "Hybrid",
      quality: "Premium",
    },
    {
      img: work5,
      title: "Residential Rooftop",
      subtitle: "– 5 kW Solar Installation",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Sheet",
      projectType: "Residential",
      systemType: "Off-Grid",
      quality: "Standard",
    },
    {
      img: work6,
      title: "Industrial Complex",
      subtitle: "– 80 kW Solar Farm",
      location: "Hubballi, Karnataka",
      roofType: "Solar Roof",
      projectType: "Commercial",
      systemType: "On-Grid",
      quality: "Premium",
    },
    {
      img: work7,
      title: "Commercial Building",
      subtitle: "– 15 kW Rooftop System",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Structure",
      projectType: "Commercial",
      systemType: "On-Grid",
      quality: "Standard",
    },
    {
      img: work8,
      title: "Residential Rooftop",
      subtitle: "– 3 kW Carport System",
      location: "Hubballi, Karnataka",
      roofType: "Solar on Structure",
      projectType: "Residential",
      systemType: "Off-Grid",
      quality: "Standard",
    },
    {
      img: work9,
      title: "Residential Rooftop",
      subtitle: "– 7 kW Solar Installation",
      location: "Hubballi, Karnataka",
      roofType: "Solar Roof",
      projectType: "Residential",
      systemType: "Hybrid",
      quality: "Premium",
    },
  ];

  const [roofFilter, setRoofFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [systemFilter, setSystemFilter] = useState("All");
  const [qualityFilter, setQualityFilter] = useState("All");

  const hasActiveFilters =
    roofFilter !== "All" || projectFilter !== "All" || systemFilter !== "All" || qualityFilter !== "All";

  const filteredWork = work.filter((p) => {
    if (roofFilter !== "All" && p.roofType !== roofFilter) return false;
    if (projectFilter !== "All" && p.projectType !== projectFilter) return false;
    if (systemFilter !== "All" && p.systemType !== systemFilter) return false;
    if (qualityFilter !== "All" && p.quality !== qualityFilter) return false;
    return true;
  });

  const resetFilters = () => {
    setRoofFilter("All");
    setProjectFilter("All");
    setSystemFilter("All");
    setQualityFilter("All");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="bg-[#faf9f7] text-[#1A1C1A] antialiased">

        <nav className="absolute left-0 right-0 top-0 z-20 text-white">
          <div className="mx-auto flex h-29.5 max-w-7xl items-center justify-between px-8 md:px-0">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Shashwatt Energy"
                className="h-22 w-auto -ml-2 md:-ml-3"
              />
            </Link>

            <div className="hidden items-center gap-8 text-[14px] font-semibold md:flex">
              <Link to="/" className="hover:text-white/80">Home</Link>
              <SolarSolutionsNav />
              <Link to="/ev-charging" className="hover:text-white/80">EV Charging</Link>
              <Link to="/pm-surya-ghar" className="hover:text-white/80">PM Surya Ghar Yojana</Link>
              <Link to="/about" className="hover:text-white/80">About Us</Link>
              <Link to="/projects" className="border-b-2 border-[#BA0013] text-[#BA0013]">Projects</Link>
              <Link to="/faq" className="hover:text-white/80">FAQs</Link>
              <Link to="/blog" className="hover:text-white/80">Blogs</Link>
              <Link to="/calculator" className="hover:text-white/80">Calculator</Link>
            </div>

            <Link to="/contact" className="hidden rounded-[8px] bg-[#BA0013] px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-[#BA0013] md:block">
              Contact Us
            </Link>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
          {menuOpen &&
            <div className="mx-6 rounded-lg bg-black/55 px-6 py-5 backdrop-blur-md md:hidden">
              <div className="flex flex-col gap-4 text-sm">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <SolarSolutionsNav />
                <Link to="/ev-charging" className="hover:text-white/80">EV Charging</Link>
                <Link to="/pm-surya-ghar" onClick={() => setMenuOpen(false)}>PM Surya Ghar Yojana</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQs</Link>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Blogs</Link>
                <Link to="/calculator" onClick={() => setMenuOpen(false)}>Calculator</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
              </div>
            </div>
          }
        </nav>

        {/* ============ HERO ============ */}
        <section className="relative min-h-138.5 overflow-hidden bg-white bg-cover bg-center text-white md:min-h-138.5 lg:min-h-138.5">
          <img
            src={heroImg}
            alt="Aerial view of homes with solar panel roofs"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-8 pt-36 lg:pt-30 md:min-h-140 md:px-0 md:pt-32 lg:min-h-138.5">
            <div className="max-w-185">
              <span
                className={`inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] uppercase leading-none tracking-normal text-[#341010] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Projects
              </span>
              <h1
                style={{ transitionDelay: heroIn ? "120ms" : "0ms" }}
                className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Solar in Action
              </h1>
              <p
                style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
                className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[18px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                From homes and villas to apartments, housing societies, and commercial spaces, explore the
                solar installations helping people and businesses move towards a cleaner energy future.
              </p>
            </div>
          </div>
        </section>

        {/* ============ OUR PROJECTS ============ */}
        <section className="bg-[#faf9f7] pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-7xl px-8 md:px-0">
            <Reveal className="max-w-6xl mb-10">
              <span className="block text-[14px] font-bold tracking-widest uppercase text-[#BA0013] mb-3">
                OUR work
              </span>
              <h2 className="text-[30px] md:text-[40px] font-bold leading-tight text-[#1A1C1A] mb-4">
                Built to Make an Impact
              </h2>
              <p className="text-[18px] leading-[1.45] text-[#5D3F3C]">
                Every ShashWatt project is a reflection of our commitment to quality, precision, and sustainable energy. From residential rooftops to large-scale commercial installations, we create solar solutions that are designed around the unique needs of every space.
              </p>
            </Reveal>

            {/* Filter bar */}
            <Reveal delay={80} className="relative z-30 mb-10">
              <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[#dfddda]">
                <FilterDropdown
                  label="Roof Type"
                  value={roofFilter}
                  options={ROOF_OPTIONS}
                  onChange={setRoofFilter}
                />
                <FilterDropdown
                  label="Project Type"
                  value={projectFilter}
                  options={PROJECT_OPTIONS}
                  onChange={setProjectFilter}
                />
                <FilterDropdown
                  label="System Type"
                  value={systemFilter}
                  options={SYSTEM_OPTIONS}
                  onChange={setSystemFilter}
                />
                <FilterDropdown
                  label="Quality"
                  value={qualityFilter}
                  options={QUALITY_OPTIONS}
                  onChange={setQualityFilter}
                />

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full text-[#5D3F3C] hover:text-[#BA0013] transition-colors duration-200"
                  >
                    <RotateCcw size={14} strokeWidth={2.5} />
                    Reset Filters
                  </button>
                )}

                <span className="ml-auto text-sm font-medium text-[#5D3F3C]">
                  {filteredWork.length} {filteredWork.length === 1 ? "project" : "projects"}
                </span>
              </div>
            </Reveal>

            {filteredWork.length === 0 ? (
              <Reveal>
                <div className="text-center py-20 rounded-[8px] ring-1 ring-[#dfddda]">
                  <p className="text-lg font-semibold text-[#1A1C1A] mb-2">
                    No projects match these filters
                  </p>
                  <p className="text-[#5D3F3C] mb-6">Try adjusting or resetting your filters.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full bg-[#BA0013] text-white hover:bg-[#9f0010] transition"
                  >
                    <RotateCcw size={14} strokeWidth={2.5} />
                    Reset Filters
                  </button>
                </div>
              </Reveal>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWork.map((p, i) => (
                  <Reveal key={`${p.img}-${p.title}-${p.subtitle}`} delay={(i % 3) * 100}>
                    <div className="group rounded-[8px] overflow-hidden border border-[#dfddda] bg-white h-full flex flex-col shadow-[0_14px_28px_rgba(26,28,26,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(26,28,26,0.18)]">
                      <div className="relative aspect-[4/3.3] overflow-hidden">
                        <img
                          src={p.img}
                          alt={`${p.title} - ${p.subtitle}`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-semibold text-[16px] text-[#1A1C1A] mb-1">
                          {p.title} {p.subtitle}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[#5D3F3C] text-sm mb-3">
                          <MapPin size={14} strokeWidth={2.5} className="shrink-0" />
                          {p.location}
                        </div>
                        <div className="mt-auto flex flex-wrap gap-1.5">
                          {[p.roofType, p.projectType, p.systemType, p.quality].map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f1f0ee] text-[#5D3F3C]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Solar Switch CTA */}
        <section className="min-h-105 bg-[url('/cta-bg.webp')] bg-cover bg-center">
          <div className="mx-auto flex min-h-105 max-w-7xl items-center px-8 lg:px-0">
            <div className="w-full max-w-113.75 text-center md:ml-12">
              <h2 className="mx-auto text-[30px] font-bold leading-[1.16] text-[#1A1C1A] md:text-[40px]">
                Ready to Make the
                <br />
                Switch to Solar?
              </h2>

              <p className="mx-auto mt-6 text-[18px] leading-normal text-[#1A1C1A] md:text-[18px]">
                Start your journey towards energy independence today
                with India's most trusted solar engineering team.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-5">
                <Link
                  to="/contact"
                  className="inline-flex h-12.5 min-w-33.5 items-center justify-center rounded-xl bg-[#BA0013] px-7 text-[16px] text-white shadow-[0_16px_28px_rgba(186,0,19,0.22)] transition hover:bg-[#BA0013]"
                >
                  Contact Us
                </Link>

                <Link
                  to="/calculator"
                  className="inline-flex h-12.5 min-w-41 items-center justify-center rounded-xl bg-white px-7 text-[16px] text-[#1A1C1A] shadow-[0_16px_28px_rgba(39,31,25,0.12)] transition hover:text-[#BA0013]"
                >
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#341010] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-[1.25fr_1fr_1fr_1.35fr] lg:px-0">
            <div>
              <Link to="/" className="inline-flex items-center">
                <img
                  src="/logo.png"
                  alt="Shashwatt Energy"
                  className="h-20 w-auto -ml-3 md:-ml-3"
                />
              </Link>

              <p className="mt-8 max-w-72 text-[16px] leading-[1.55] text-white/90">
                Empowering a sustainable future by <br />
                delivering innovative solar energy <br />
                systems. We are based in Hubballi <br />
                and serve the nation.
              </p>

              <div className="mt-8 flex items-center gap-8">
                <a
                  href="https://www.instagram.com/shashwattenergy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white hover:text-white/80"
                >
                  <InstagramIcon size={28} />
                </a>
                <a
                  href="https://www.facebook.com/shashwattenergy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white hover:text-white/80"
                >
                  <FacebookIcon size={28} />
                </a>
                <a
                  href="https://wa.me/917619575683"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-white hover:text-white/80"
                >
                  <WhatsAppIcon size={28} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-[24px] font-semibold text-[#BA0013]">
                Services
              </h3>
              <div className="flex flex-col gap-5 text-[16px] leading-tight text-[#FAF9F6]">
                <Link to="/residential">Residential Solar</Link>
                <Link to="/commercial">Commercial Solar</Link>
                <Link to="/ev-charging">EV Charging</Link>
                <Link to="/pm-surya-ghar">
                  PM Surya Ghar
                  <br />
                  Yojana
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-[24px] font-semibold text-[#BA0013]">
                About Us
              </h3>
              <div className="flex flex-col gap-5 text-[16px] leading-tight text-[#FAF9F6]">
                <Link to="/about">About Us</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blogs</Link>
                <Link to="/faq">FAQs</Link>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-[24px] font-semibold text-[#BA0013]">
                Support
              </h3>
              <div className="flex flex-col gap-5 text-[16px] leading-[1.45] text-[#FAF9F6]">
                <div className="flex gap-4">
                  <Phone className="mt-0.5 shrink-0 text-[#BA0013]" size={18} />
                  <p>
                    <a href="tel:+9176195 75683" className="hover:underline focus-visible:underline active:underline">
                      +91 7619575683
                    </a>{" "}
                    /{" "}
                    <a href="tel:+9195916 75683" className="hover:underline focus-visible:underline active:underline">
                      +91 9591675683
                    </a>
                  </p>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-0.5 shrink-0 text-[#BA0013]" size={18} />
                  <a href="mailto:connect@shashwatt.com" className="hover:underline focus-visible:underline active:underline">
                    connect@shashwatt.com
                  </a>
                </div>
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 shrink-0 text-[#BA0013]" size={18} />
                  <p>
                    C-512, 7th Cross, Industrial Estate, Gokul
                    Road, Hubballi - 580032
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 bg-[#341010] py-4 text-center text-[16px] text-[#FAF9F6]">
            © 2026 All Rights Reserved. ShashWatt Energy. Powered by{" "}
            <a
              href="https://spitel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Spitel
            </a>{" "}
            Pvt Ltd
          </div>
        </footer>
      </div>
    </main>
  );
}
