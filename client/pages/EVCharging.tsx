import { useState } from "react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  Menu,
  X,
  Home,
  Building2,
  Gauge,
  Zap,
  Landmark,
  ContactRound,
  Earth,
  Mail,
  Phone,
  MapPin,
  Share2,
  Factory,
  Warehouse,
  CircleCheck,
  TrendingUp,
  Grid2X2,
  Leaf,
} from "lucide-react";

export default function EVCharging() {

  const [menuOpen, setMenuOpen] = useState(false);
  const chargingSolutions = [
    {
      title: "Home EV Chargers",
      description:
        "Compact 3.3 kW to 7.2 kW AC wall-box chargers designed for safe and convenient overnight home charging, with smart app monitoring and load protection.",
      image: "/ev1.webp",
      icon: Home,
      features: "Safe  •  Smart  •  Convenient",
    },
    {
      title: "Commercial & Fleet Charging",
      description:
        "Dual-port 11 kW / 22 kW AC chargers designed for corporate offices, hotels, hospitals and residential society parking areas.",
      image: "/ev2.webp",
      icon: Building2,
      features: "Efficient  •  Scalable  •  Reliable",
    },
    {
      title: "Fast DC Charging Hubs",
      description:
        "High-speed 30 kW to 60 kW DC fast chargers for highway hubs, public charging corridors and commercial fleet operations.",
      image: "/ev3.webp",
      icon: Gauge,
      features: "High Speed  •  Powerful  •  Future Ready",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f7] text-[#1A1C1A]">
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
            <Link to="/ev-charging" className="border-b-2 border-[#BA0013] text-[#BA0013]">EV Charging</Link>
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
              <SolarSolutionsMobileLinks onNavigate={() => setMenuOpen(false)} />
                <Link to="/ev-charging" className="border-b-2 border-[#BA0013] text-[#BA0013]">EV Charging</Link>
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

      {/* Hero Section */}
      <section
        className="relative min-h-138.5 overflow-hidden bg-white bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%),url('/ev-bg.webp')] bg-cover bg-center text-white md:min-h-138.5 lg:min-h-138.5"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-8 pt-36 lg:pt-24 md:min-h-140 md:px-0 lg:min-h-138.5">
          <div className="max-w-165">
            <span className="inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] font-medium leading-none tracking-normal text-[#341010]">
              EV Charging
            </span>

            <h1 className="mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white sm:text-[56px] lg:text-[56px]">
              EV Charging Solutions
            </h1>

            <p className="mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white md:text-[18px]">
              Powering the transition to electric mobility with reliable, efficient and scalable EV charging solutions for homes, businesses and public spaces.
            </p>
          </div>
        </div>
      </section>

      {/* EV Charging Solutions */}
      <section className="bg-[#FAF9F6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-4 text-[14px] font-bold uppercase tracking-normal text-[#BA0013]">
              <span className="h-px w-14 bg-[#BA0013]" />
              <span>Our EV Charging Solutions</span>
              <span className="h-px w-14 bg-[#BA0013]" />
            </div>

            <h2 className="mt-4 text-[34px] font-bold leading-[1.12] text-[#1C1C1C] md:text-[44px]">
              Charging for Every Need
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {chargingSolutions.map((solution) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.title}
                  className="overflow-hidden rounded-[8px] bg-white shadow-[0_18px_45px_rgba(24,38,26,0.08)] ring-1 ring-black/5"
                >
                  <div className="relative h-56 overflow-hidden md:h-64">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#BA0013] text-white shadow-[0_10px_22px_rgba(23,107,44,0.26)]">
                      <Icon size={28} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div className="px-6 pb-0 pt-7">
                    <h3 className="text-[23px] font-bold leading-tight text-[#BA0013]">
                      {solution.title}
                    </h3>
                    <div className="mt-4 h-0.5 w-10 bg-[#BA0013]" />

                    <p className="mt-6 min-h-28 text-[16px] font-medium leading-[1.55] text-[#5D3F3C]">
                      {solution.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-3 bg-[#F1F7EE] px-6 py-4 text-[14px] font-bold text-[#BA0013]">
                    <Zap size={18} className="shrink-0 text-[#BA0013]" />
                    <span>{solution.features}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enphase Installer Badge */}
      <section className="bg-[#FAF9F6] pt-0 md:pt-0 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <div className="relative overflow-hidden rounded-[18px] bg-[#F7F9F4] px-8 py-7 shadow-[0_18px_45px_rgba(24,38,26,0.06)] ring-1 ring-black/5 md:px-14">
            <div className="absolute right-0 top-0 hidden h-full w-60 opacity-60 md:block">
              <div className="h-full w-full bg-[radial-gradient(circle,rgba(23,107,44,0.28)_1.6px,transparent_1.6px)] [bg-size:13px_13px]" />
            </div>

            <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:gap-11">
              <div className="flex justify-start md:w-[39%]">
                <img
                  src="/gold.png"
                  alt="Enphase Gold Installer"
                  className="h-auto w-full max-w-87.5 object-contain object-left mix-blend-multiply"
                />
              </div>

              <div className="hidden h-31 w-px bg-[#D4D8CF] md:block" />

              <div className="max-w-xl md:flex-1">
                <h3 className="text-[22px] font-bold leading-tight text-[#BA0013] md:text-[24px]">
                  Certified Installation Expertise
                </h3>

                <p className="mt-5 max-w-145 text-[16px] font-medium leading-[1.55] text-[#5D3F3C]">
                  As an Enphase Gold Installer, we bring certified expertise,
                  highest quality standards and reliable service for all your
                  energy needs.
                </p>
              </div>
            </div>
          </div>
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
    </main>
  )
}
