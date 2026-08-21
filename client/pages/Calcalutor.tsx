import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
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
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

// lucide-react no longer ships branded/logo icons (Facebook, Instagram,
// WhatsApp) — they were removed over trademark concerns. These are small
// inline SVGs matching the size/stroke of the rest of the icon set.
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

// Photos — served from the /public/calculatorimg folder
const heroImg = "/calculatorimg/hero.webp";

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

interface CalculatorErrors {
  state?: string;
  bill?: string;
}

const MIN_MONTHLY_BILL = 100;
const MAX_MONTHLY_BILL = 1000000;

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
  const [errors, setErrors] = useState<CalculatorErrors>({});

  // TC_183: switching property type should give the user a fresh form —
  // no stale state/bill/result/errors carried over.
  const handlePropertyTypeChange = (type: "Residential" | "Commercial") => {
    setPropertyType(type);
    setState("");
    setBill("");
    setResult(null);
    setErrors({});
  };

  // TC_184: changing (or clearing) the state selection invalidates any
  // previous result — it must be recalculated, not silently kept.
  const handleStateChange = (value: string) => {
    setState(value);
    setResult(null);
    setErrors((prev) => ({ ...prev, state: undefined }));
  };

  const handleBillChange = (value: string) => {
    setBill(value);
    setResult(null);
    setErrors((prev) => ({ ...prev, bill: undefined }));
  };

  const handleCalculate = () => {
    const newErrors: CalculatorErrors = {};

    if (!state) {
      newErrors.state = "Please select your state.";
    }

    const billValue = parseFloat(bill);
    if (bill.trim() === "" || Number.isNaN(billValue)) {
      newErrors.bill = "Please enter your average monthly electricity bill.";
    } else if (billValue < MIN_MONTHLY_BILL || billValue > MAX_MONTHLY_BILL) {
      newErrors.bill = `Please enter an amount between ₹${MIN_MONTHLY_BILL.toLocaleString("en-IN")} and ₹${MAX_MONTHLY_BILL.toLocaleString("en-IN")}.`;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
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
              <SolarSolutionsNav />
              <Link to="/ev-charging" className="hover:text-white/80">EV Charging</Link>
              <Link to="/pm-surya-ghar" className="hover:text-white/80">PM Surya Ghar Yojana</Link>
              <Link to="/about" className="hover:text-white/80">About Us</Link>
              <Link to="/projects" className="hover:text-white/80">Projects</Link>
              <Link to="/faq" className="hover:text-white/80">FAQs</Link>
              <Link to="/blog" className="hover:text-white/80">Blogs</Link>
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
                      aria-pressed={propertyType === "Residential"}
                      onClick={() => handlePropertyTypeChange("Residential")}
                      className={`flex flex-col items-center justify-center gap-2 rounded-[8px] border py-6 transition-colors ${propertyType === "Residential"
                        ? "border-[#BA0013] bg-[#FCE3E7] text-[#BA0013]"
                        : "border-[#dfddda] bg-[#faf9f7] text-[#5D3F3C] hover:border-[#5D3F3C]/40"
                        }`}
                    >
                      <HomeIcon size={22} />
                      <span className="font-medium text-[16px] sm:text-[24px]">
                        Residential
                      </span>
                    </button>

                    <button
                      type="button"
                      aria-pressed={propertyType === "Commercial"}
                      onClick={() => handlePropertyTypeChange("Commercial")}
                      className={`flex flex-col items-center justify-center gap-2 rounded-[8px] border py-6 transition-colors ${propertyType === "Commercial"
                        ? "border-[#BA0013] bg-[#FCE3E7] text-[#BA0013]"
                        : "border-[#dfddda] bg-[#faf9f7] text-[#5D3F3C] hover:border-[#5D3F3C]/40"
                        }`}
                    >
                      <Building2 size={22} />
                      <span className="font-medium text-[16px] sm:text-[24px]">
                        Commercial
                      </span>
                    </button>
                  </div>
                </div>

                {/* State */}
                <div className="mb-7">
                  <label htmlFor="calc-state" className="block text-[14px] font-bold tracking-widest uppercase text-[#5D3F3C] mb-3">
                    2. Select State
                  </label>
                  <div className="relative">
                    <select
                      id="calc-state"
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      aria-invalid={!!errors.state}
                      className={`w-full appearance-none bg-[#faf9f7] text-[16px] border rounded-[8px] px-4 py-3.5 text-[#1A1C1A] focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 ${errors.state ? "border-red-500" : "border-[#dfddda] focus:border-[#BA0013]"
                        }`}
                    >
                      <option value="">Choose your state</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D3F3C] pointer-events-none" />
                  </div>
                  {errors.state && (
                    <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                {/* Bill */}
                <div className="mb-8">
                  <label htmlFor="calc-bill" className="block text-[14px] font-bold tracking-widest uppercase text-[#5D3F3C] mb-3">
                    3. Average Monthly Electricity Bill
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D3F3C]">₹</span>
                    <input
                      id="calc-bill"
                      type="number"
                      min={MIN_MONTHLY_BILL}
                      max={MAX_MONTHLY_BILL}
                      value={bill}
                      onChange={(e) => handleBillChange(e.target.value)}
                      placeholder="Enter your average monthly electricity bill"
                      aria-invalid={!!errors.bill}
                      className={`w-full bg-[#faf9f7] border rounded-[8px] pl-9 pr-4 py-3.5 text-[#1A1C1A] placeholder:text-[#5D3F3C]/60 focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 ${errors.bill ? "border-red-500" : "border-[#dfddda] focus:border-[#BA0013]"
                        }`}
                    />
                  </div>
                  {errors.bill && (
                    <p className="mt-2 text-sm text-red-600">{errors.bill}</p>
                  )}
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
                    <a href="tel:+917619575683" className="hover:underline focus-visible:underline active:underline">
                      +91 7619575683
                    </a>{" "}
                    /{" "}
                    <a href="tel:+919591675683" className="hover:underline focus-visible:underline active:underline">
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
