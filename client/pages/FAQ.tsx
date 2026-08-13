import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
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

// Photo — served from the /public/faqimg folder
const heroImg = "/faqimg/faq-hero.png";

interface FaqItem {
  question: string;
  answer: string;
}

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

// Single accordion row — click to expand/collapse the answer.
function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#dfddda]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={`font-semibold text-base md:text-lg transition-colors duration-200 ${open ? "text-[#BA0013]" : "text-[#1A1C1A]"
            }`}
        >
          {item.question}
        </span>
        <span
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${open ? "bg-[#BA0013] text-white rotate-45" : "bg-[#f1f0ee] text-[#5D3F3C]"
            }`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-[#5D3F3C] leading-relaxed pb-6 pr-10">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const faqs: FaqItem[] = [
    {
      question: "Who is ShashWatt Energy, and how can you help me make smarter energy choices?",
      answer:
        "Hi, I'm Suryaputra Karna, your trusted solar companion from ShashWatt Energy. I'm here to guide you toward a smarter, cleaner, and more affordable energy future. Inspired by the limitless power of the sun, we help you make informed and sustainable solar energy choices.",
    },
    {
      question: "Why keep paying electricity bills every month when you can generate your own solar power?",
      answer:
        "Instead of paying electricity bills month after month, you can invest in a solar system that can help power your home for decades. Solar allows you to generate clean energy, reduce your dependence on grid electricity, and work toward long-term energy savings.",
    },
    {
      question: "Should I choose a regular inverter or a microinverter for my solar system?",
      answer:
        "Both are useful options, but microinverters can offer better flexibility and performance in certain situations. They are particularly beneficial for homes with trees or areas that cause shading. Since each panel operates independently, shading on one panel has less impact on the performance of the others.",
    },
    {
      question: "How can solar and battery storage help reduce rising electricity costs?",
      answer:
        "With solar and battery storage, you can generate electricity during the day, store excess energy, and use that stored energy when electricity is more expensive. This can help you reduce energy costs and gain greater control over your power usage.",
    },
    {
      question: "Can solar panels be recycled after their useful life?",
      answer:
        "Yes. Solar panels can be recycled through key stages such as delamination, separation, extraction, and purification. Glass makes up a major portion of a solar panel's weight, while materials such as aluminium and copper can also be recovered and recycled.",
    },
    {
      question: "Can I turn my unused land or space into an EV charging hub?",
      answer:
        "Absolutely! You can transform unused space into a smart EV charging hub and create a future-ready business opportunity. With ShashWatt Energy EV Chargers, you can provide convenient charging while supporting the transition toward clean mobility. Power your land. Power your future. Choose Shashwatt Energy.",
    },
    {
      question: "Can ShashWatt Energy's solar solutions increase the value of my home?",
      answer:
        "Solar can make a home more attractive to potential buyers while helping reduce electricity expenses. An energy-efficient solar system can add to your property's long-term appeal and functionality. With ShashWatt Energy, you're investing in your home, your savings, and your future.",
    },
    {
      question: "How does ShashWatt Energy make solar power a part of your everyday life?",
      answer:
        "Solar panels use photovoltaic (PV) cells to capture sunlight and generate DC electricity. An inverter then converts this DC electricity into AC electricity that can be used to power your home. With ShashWatt Energy, you can integrate clean solar energy into your everyday life.",
    },
    {
      question: "Is a ShashWatt Energy solar rooftop system affordable for my home?",
      answer:
        "Absolutely! ShashWatt Energy offers solar rooftop solutions along with EMI options designed to make switching to solar more accessible and budget-friendly. You can start generating your own clean energy while working toward lower electricity costs.",
    },
    {
      question: "Will solar panels work during cloudy or rainy weather?",
      answer:
        "Yes. Solar panels can continue generating electricity during cloudy weather because daylight is still available, although their output may be lower than on a sunny day. Rain can also help wash away dust and dirt from the panels. This monsoon, switch to solar with Shashwatt Energy and power your home smarter.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
              <Link to="/faq" className="border-b-2 border-[#BA0013] text-[#BA0013]">FAQ</Link>
              <Link to="/blog" className="hover:text-white/80">Blog</Link>
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
            alt="Modern home with a solar panel roof at dusk"
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
                FAQs
              </span>
              <h1
                style={{ transitionDelay: heroIn ? "120ms" : "0ms" }}
                className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Your Questions, <br />Answered
              </h1>
              <p
                style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
                className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[16px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                From choosing the right solar system to understanding installation, savings, subsidies,
                and maintenance, find simple answers to everything you need to know before making the
                switch to solar energy.
              </p>
            </div>
          </div>
        </section>

        {/* ============ FAQ LIST ============ */}
        <section className="bg-[#faf9f7] pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-7xl px-8 md:px-0">
            <Reveal className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <span
                    className="block text-[14px] font-bold tracking-widest uppercase text-[#BA0013] mb-3"
                  >
                    Need to Know
                  </span>
                  <h2 className="text-[30px] md:text-[40px] font-bold leading-tight text-[#1A1C1A] max-w-xl">
                    Curious About <br />Solar?
                  </h2>
                </div>
                <p className="text-[16px] font-medium leading-[1.45] text-[#5D3F3C] max-w-xl md:text-right">
                  Whether you're exploring solar for your home, business, or community, find clear
                  answers to the questions that matter most — from installation and savings to
                  maintenance and long-term support.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="border-t border-[#dfddda]">
                {faqs.map((item, i) => (
                  <FaqRow
                    key={item.question}
                    item={item}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
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
