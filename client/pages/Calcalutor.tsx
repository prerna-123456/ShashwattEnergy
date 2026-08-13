import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Building2,
  ChevronDown,
  ArrowRight,
  Users,
  ShieldCheck,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Share2,
  Menu,
  X,
  ContactRound,
  Earth,
  type LucideIcon,
} from "lucide-react";

// Photos — served from the /public/calculatorimg folder
const heroImg = "/calculatorimg/hero.png";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const indianStates: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

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

export default function Calculator() {
  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const features: Feature[] = [
    {
      icon: Users,
      title: "Precision Engineering",
      desc: "Our calculator uses irradiation and structural data to provide reliable estimates of solar energy generation, system capacity, and potential savings.",
    },
    {
      icon: ShieldCheck,
      title: "Premium Hardware",
      desc: "We use high-quality monocrystalline panels and industrial-grade inverters, with selected modules backed by up to 25-year performance warranties.",
    },
    {
      icon: TrendingUp,
      title: "Smart Monitoring",
      desc: "Our solar installations can include real-time monitoring, helping you track energy production and system performance from anywhere.",
    },
  ];

  // Calculator form state
  const [propertyType, setPropertyType] = useState<"Residential" | "Commercial">("Residential");
  const [state, setState] = useState("");
  const [bill, setBill] = useState("");
  const [result, setResult] = useState<{ sizeKw: number; monthlySavings: number } | null>(null);

  const handleCalculate = () => {
    const billValue = parseFloat(bill);
    if (!billValue || billValue <= 0) {
      setResult(null);
      return;
    }
    // Rough estimate: ~1kW offsets about ₹1000 of monthly bill for residential,
    // commercial tariffs are a bit higher so it takes slightly less capacity.
    const perKwOffset = propertyType === "Residential" ? 1000 : 1300;
    const sizeKw = Math.round((billValue / perKwOffset) * 10) / 10;
    const monthlySavings = Math.round(billValue * 0.85);
    setResult({ sizeKw, monthlySavings });
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
              <Link to="/residential" className="hover:text-white/80">Residential</Link>
              <Link to="/commercial" className="hover:text-white/80 ">Commercial</Link>
              <Link to="/pm-surya-ghar" className="hover:text-white/80">PM Surya Ghar Yojana</Link>
              <Link to="/about" className="hover:text-white/80">About Us</Link>
              <Link to="/projects" className="hover:text-white/80">Projects</Link>
              <Link to="/faq" className="hover:text-white/80">FAQ</Link>
              <Link to="/blog" className="hover:text-white/80">Blog</Link>
              <Link to="/calculator" className="border-b-2 border-[#BA0013] text-[#BA0013]">Calculator</Link>
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
                <Link to="/residential" onClick={() => setMenuOpen(false)}>Residential</Link>
                <Link to="/commercial" onClick={() => setMenuOpen(false)}>Commercial</Link>
                <Link to="/pm-surya-ghar" onClick={() => setMenuOpen(false)}>PM Surya Ghar Yojana</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
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
            alt="Modern home with rooftop solar panels"
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
                Solar Calculator
              </span>
              <h1
                style={{ transitionDelay: heroIn ? "120ms" : "0ms" }}
                className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Discover Your <br />Solar Potential
              </h1>
              <p
                style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
                className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[18px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Estimate the solar system size you may need, your potential savings, and the environmental
                impact of switching to clean energy — all in just a few simple steps.
              </p>
            </div>
          </div>
        </section>

        {/* ============ CALCULATOR ============ */}
        <section className="bg-[#f1f0ee] pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-28 items-start px-8 md:px-0">
            <Reveal>
              <span className="block text-[14px] font-bold tracking-widest uppercase text-[#BA0013] mb-6">
                Calculate Your Solar Potential
              </span>

              <div className="bg-white rounded-[8px] shadow-[0_14px_28px_rgba(26,28,26,0.14)] border border-[#dfddda] p-8">
                {/* Property Type */}
                <div className="mb-7">
                  <div className="text-[14px] font-bold tracking-widest uppercase text-[#5D3F3C] mb-3">
                    1. Property Type
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPropertyType("Residential")}
                      className={`flex flex-col items-center justify-center gap-2 rounded-[8px] border py-6 transition-colors ${propertyType === "Residential"
                        ? "border-[#BA0013] bg-[#FCE3E7] text-[#BA0013]"
                        : "border-[#dfddda] bg-[#faf9f7] text-[#5D3F3C] hover:border-[#5D3F3C]/40"
                        }`}
                    >
                      <HomeIcon size={22} />
                      <span className="font-medium text-[24px]">Residential</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPropertyType("Commercial")}
                      className={`flex flex-col items-center justify-center gap-2 rounded-[8px] border py-6 transition-colors ${propertyType === "Commercial"
                        ? "border-[#BA0013] bg-[#FCE3E7] text-[#BA0013]"
                        : "border-[#dfddda] bg-[#faf9f7] text-[#5D3F3C] hover:border-[#5D3F3C]/40"
                        }`}
                    >
                      <Building2 size={22} />
                      <span className="font-medium text-[24px]">Commercial</span>
                    </button>
                  </div>
                </div>

                {/* State */}
                <div className="mb-7">
                  <div className="text-[14px] font-bold tracking-widest uppercase text-[#5D3F3C] mb-3">
                    2. Select State
                  </div>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full appearance-none bg-[#faf9f7] text-[16px] border border-[#dfddda] rounded-[8px] px-4 py-3.5 text-[#1A1C1A] focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 focus:border-[#BA0013]"
                    >
                      <option value="">Choose your state</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D3F3C] pointer-events-none" />
                  </div>
                </div>

                {/* Bill */}
                <div className="mb-8">
                  <div className="text-[14px] font-bold tracking-widest uppercase text-[#5D3F3C] mb-3">
                    3. Average Monthly Electricity Bill
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D3F3C]">₹</span>
                    <input
                      type="number"
                      min={0}
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                      placeholder="Enter your average monthly electricity bill"
                      className="w-full bg-[#faf9f7] border border-[#dfddda] rounded-[8px] pl-9 pr-4 py-3.5 text-[#1A1C1A] placeholder:text-[#5D3F3C]/60 focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 focus:border-[#BA0013]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCalculate}
                  className="w-full flex items-center justify-center gap-2 bg-[#BA0013] hover:bg-[#9f0010] transition-colors text-white text-[16px] py-4 rounded-xl"
                >
                  Calculate My Solar Potential <ArrowRight size={18} />
                </button>

                {result && (
                  <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-[#dfddda]">
                    <div>
                      <div className="text-2xl font-extrabold text-[#BA0013] mb-1">
                        {result.sizeKw} kW
                      </div>
                      <div className="text-xs tracking-wider uppercase text-[#5D3F3C] font-semibold">
                        Recommended System Size
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#BA0013] mb-1">
                        ₹{result.monthlySavings.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs tracking-wider uppercase text-[#5D3F3C] font-semibold">
                        Est. Monthly Savings
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="text-[30px] md:text-[40px] font-bold leading-tight text-[#1A1C1A] mb-10">
                Built to Make an <br />Impact
              </h2>

              <div className="space-y-10">
                {features.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-[8px] bg-[#FCE3E7] text-[#BA0013] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-[#1A1C1A] mb-1.5">{title}</h3>
                      <p className="text-[#5D3F3C] text-[16px] font-medium max-w-md">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Solar Switch CTA */}
        <section className="min-h-105 bg-[url('/cta-bg.png')] bg-cover bg-center">
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
                systems. Based in Hubballi, serving <br />
                the nation.
              </p>

              <div className="mt-8 flex items-center gap-8">
                <Link to="#" aria-label="Website" className="text-white">
                  <Earth size={20} />
                </Link>
                <Link to="#" aria-label="Share" className="text-white">
                  <Share2 size={20} />
                </Link>
                <Link to="#" aria-label="Profile" className="text-white">
                  <ContactRound size={20} />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-[24px] font-semibold text-[#BA0013]">
                Service
              </h3>
              <div className="flex flex-col gap-5 text-[16px] leading-tight text-[#FAF9F6]">
                <Link to="/residential">Residential Solar</Link>
                <Link to="/commercial">Commercial Solar</Link>
                <Link to="/industrial">Industrial Solutions</Link>
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
                    <a href="tel:+917619575683" className="hover:underline focus-visible:underline active:underline">
                      +917619575683
                    </a>{" "}
                    /{" "}
                    <a href="tel:+919972975683" className="hover:underline focus-visible:underline active:underline">
                      9972975683
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
                    C-512, 7th cross, Industrial Estate, Gokul
                    <br />
                    Road, Hubballi - 580032
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 bg-[#341010] py-4 text-center text-[16px] text-[#FAF9F6]">
            All rights reserved. Designed by Spitel @2026
          </div>
        </footer>
      </div>
    </main>
  );
}
