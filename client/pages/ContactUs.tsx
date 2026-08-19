import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ArrowRight,
  Check,
  Menu,
  X,
  Share2,
  ContactRound,
  Earth,
} from "lucide-react";

// Photos — served from the /public/calculatorimg folder
const heroImg = "/contactusimg/contact-hero.webp";

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

interface ContactDetail {
  icon: typeof Phone;
  label: string;
  value: string;
  extra?: string;
  href?: string;
  links?: { text: string; href: string }[];
  external?: boolean;
}

const contactDetails: ContactDetail[] = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 78295 75683 / +91 99729 75683",
    links: [
      { text: "+91 78295 75683", href: "tel:+917829575683" },
    ],
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "connect@shashwatt.com",
    href: "mailto:connect@shashwatt.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "C-512, Industrial Estate, Gokul Road, 7th Cross, Hubballi - 580032",
    href: "https://www.google.com/maps/search/?api=1&query=C-512%2C%20Industrial%20Estate%2C%20Gokul%20Road%2C%207th%20Cross%2C%20Hubballi%20-%20580032",
    external: true,
  },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM" },
];

const promises: string[] = [
  "Free Site Assessment & Energy Audit",
  "ROI & Payback Period Projection",
  "Subsidy (PM Surya Ghar) Guidance",
  "Design and Guidance"
];

type RequiredContactField = "fullName" | "email" | "phone" | "city";

const requiredFieldMessage = "This field is required";
const inputBaseClass =
  "w-full bg-[#faf9f7] border rounded-[8px] px-4 py-3.5 text-[#1A1C1A] placeholder:text-[#5D3F3C]/20 focus:outline-none focus:ring-2";

export default function ContactUs() {
  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState<"Residential" | "Commercial">("Residential");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<RequiredContactField, string>>>({});

  const handleSubmit = async () => {
    if (submitting) return;

    const errors: Partial<Record<RequiredContactField, string>> = {};

    if (!fullName.trim()) errors.fullName = requiredFieldMessage;
    if (!email.trim()) errors.email = requiredFieldMessage;
    if (!phone.trim()) errors.phone = requiredFieldMessage;
    if (!city.trim()) errors.city = requiredFieldMessage;

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          propertyType,
          city,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Unable to submit form");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Form submit nahi hua. Please thodi der baad try karein."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const getInputClass = (field: RequiredContactField) =>
    `${inputBaseClass} ${fieldErrors[field]
      ? "border-[#BA0013] focus:border-[#BA0013] focus:ring-[#BA0013]/30"
      : "border-[#dfddda] focus:border-[#BA0013] focus:ring-[#BA0013]/30"
    }`;

  const clearFieldError = (field: RequiredContactField, value: string) => {
    if (!value.trim()) return;
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

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
            alt="Modern home with rooftop solar panels"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-8 pt-36 lg:pt-30 md:min-h-140 md:px-0 md:pt-32 lg:min-h-138.5">
            <div className="max-w-185">
              <span
                className={`inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] font-medium uppercase leading-none tracking-normal text-[#341010] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Contact Us
              </span>
              <h1
                style={{ transitionDelay: heroIn ? "120ms" : "0ms" }}
                className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Let's Start Your Solar Journey
              </h1>
              <p
                style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
                className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[18px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Whether you're exploring solar for your home, business, or community, our team is here
                to help you find the right solution for your energy needs.
              </p>
            </div>
          </div>
        </section>

        {/* ============ CONTACT INFO BAR ============ */}
        <section className="border-b border-[#dfddda] bg-[#faf9f7]">
          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:divide-x divide-[#dfddda] divide-y sm:divide-y-0 px-8 md:px-0">
            {contactDetails.map(({ icon: Icon, label, value, href, links, external }) => (
              <div key={label} className="py-8 sm:py-10 px-0 sm:px-4 md:px-6 sm:first:pl-0">
                <Icon size={18} className="text-[#BA0013] mb-3" />
                <div className="text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-1.5">
                  {label}
                </div>
                <div className="font-bold text-sm text-[#1A1C1A] leading-snug">
                  {links ? (
                    links.map((link, index) => (
                      <span key={link.href}>
                        <a href={link.href} className="hover:underline focus-visible:underline active:underline">
                          {link.text}
                        </a>
                        {index < links.length - 1 ? " / " : ""}
                      </span>
                    ))
                  ) : href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="hover:underline focus-visible:underline active:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FORM ============ */}
        <section className="bg-[#f1f0ee] pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start px-8 md:px-0">
            <Reveal>
              <span className="block text-[16px] font-bold tracking-widest uppercase text-[#BA0013] mb-6">
                LET’S GET IN TOUCH
              </span>
              <h2 className="text-[30px] md:text-[40px] font-bold leading-tight text-[#1A1C1A] mb-6">
                Tell Us About Your Energy Needs
              </h2>
              <p className="text-[16px] leading-[1.45] text-[#5D3F3C] max-w-md mb-10">
                Every building is unique. Share a few details about your property, and our technical
                specialists will prepare a customized feasibility report and solar proposal for you
                within 24 hours of the survey.
              </p>

              <div className="space-y-5">
                {promises.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#FCE3E7] text-[#BA0013] flex items-center justify-center">
                      <Check size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#1A1C1A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-white rounded-[8px] shadow-[0_14px_28px_rgba(26,28,26,0.14)] border border-[#dfddda] p-8">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#FCE3E7] text-[#BA0013] flex items-center justify-center mb-5">
                      <Check size={22} />
                    </div>
                    <h3 className="font-bold text-lg text-[#1A1C1A] mb-2">Form submitted successfully</h3>
                    <p className="text-[#5D3F3C] text-sm">
                      Thanks, {fullName.split(" ")[0] || "there"}. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            clearFieldError("fullName", e.target.value);
                          }}
                          placeholder="John Doe"
                          className={getInputClass("fullName")}
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-2 text-sm font-semibold text-[#BA0013]">
                            {fieldErrors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearFieldError("email", e.target.value);
                          }}
                          placeholder="john@example.com"
                          className={getInputClass("email")}
                        />
                        {fieldErrors.email && (
                          <p className="mt-2 text-sm font-semibold text-[#BA0013]">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            clearFieldError("phone", e.target.value);
                          }}
                          placeholder="+91 00000 00000"
                          className={getInputClass("phone")}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-2 text-sm font-semibold text-[#BA0013]">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                          Property Type
                        </label>
                        <div className="relative">
                          <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value as "Residential" | "Commercial")}
                            className="w-full appearance-none bg-[#faf9f7] border border-[#dfddda] rounded-[8px] px-4 py-3.5 text-[#1A1C1A] focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 focus:border-[#BA0013]"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D3F3C] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          clearFieldError("city", e.target.value);
                        }}
                        placeholder="Pune"
                        className={getInputClass("city")}
                      />
                      {fieldErrors.city && (
                        <p className="mt-2 text-sm font-semibold text-[#BA0013]">
                          {fieldErrors.city}
                        </p>
                      )}
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#5D3F3C] mb-2">
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full bg-[#faf9f7] border border-[#dfddda] rounded-[8px] px-4 py-3.5 text-[#1A1C1A] placeholder:text-[#5D3F3C]/20 focus:outline-none focus:ring-2 focus:ring-[#BA0013]/30 focus:border-[#BA0013] resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#BA0013] hover:bg-[#9f0010] transition-colors text-white font-semibold py-4 rounded-[8px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? "Sending..." : "Send Enquiry"} <ArrowRight size={18} />
                    </button>
                    {submitError && (
                      <p className="mt-4 text-sm font-semibold text-[#BA0013]">
                        {submitError}
                      </p>
                    )}
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MAP ============ */}
        <section className="bg-[#faf9f7] py-16">
          <div className="mx-auto max-w-7xl px-8 md:px-0">
            <a
              href="https://www.google.com/maps/search/?api=1&query=C-512%2C%20Industrial%20Estate%2C%20Gokul%20Road%2C%207th%20Cross%2C%20Hubballi%20-%20580032"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shashwatt Energy address in Google Maps"
              className="relative block h-90 w-full overflow-hidden rounded-xl border border-[#dfddda] shadow-[0_14px_28px_rgba(26,28,26,0.12)] md:h-110"
            >
              <iframe
                title="Shashwatt Energy location map"
                src="https://www.google.com/maps?q=C-512%2C%20Industrial%20Estate%2C%20Gokul%20Road%2C%207th%20Cross%2C%20Hubballi%20-%20580032&output=embed"
                className="h-full w-full border-0 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
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
            ©2026 All Rights Reserved. Shashwatt Energy. Powered By{" "}
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
