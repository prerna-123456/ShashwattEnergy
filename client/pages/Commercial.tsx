import { useState } from "react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  Menu,
  X,
  Calculator,
  Landmark,
  ArrowRight,
  ContactRound,
  Earth,
  Mail,
  Phone,
  MapPin,
  Share2,
  Factory,
  DraftingCompass,
  Warehouse,
  CircleCheck,
  BadgeCheck,
  Wrench,
  Shield,
  TrendingUp,
  Grid2X2,
  RefreshCcw,
} from "lucide-react";

export default function Commercial() {

  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Hero Section */}
      <section
        className="relative min-h-138.5 overflow-hidden bg-white bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%),url('/commercial-bg.webp')] bg-cover bg-center text-white md:min-h-138.5 lg:min-h-138.5"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-8 pt-36 lg:pt-24 md:min-h-140 md:px-0 lg:min-h-138.5">
          <div className="max-w-185">
            <span className="inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] font-medium uppercase leading-none tracking-normal text-[#341010]">
              Raising Homes
            </span>

            <h1 className="mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white sm:text-[56px] lg:text-[56px]">
              Invest in Solar for your commercial establishment
            </h1>

            <p className="mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white md:text-[18px]">
              Explore innovative solar solutions for your business and start saving on electricity from Day 1 with our professional industrial grade installations.
            </p>
          </div>
        </div>
      </section>

      {/* Solar */}
      <section className="bg-[#faf9f7] py-14 md:py-28 pt-16 lg:pt-28">
        <div className="mx-auto max-w-7xl px-8 text-center md:px-0">
          <h2 className="text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
            Type of <span className="text-[#BA0013]">Roofs/Installation</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 md:grid-cols-3 md:px-0">
          {[
            {
              icon: Factory,
              title: "Solar-on-Sheet",
              description:
                "Easy to implement and quick installation method for existing infrastructure.",
            },
            {
              icon: DraftingCompass,
              title: "Solar-on-Structure",
              description:
                "Enhanced energy production with bifaciality and optimized structural tilt.",
            },
            {
              icon: Warehouse,
              title: "Solar Roof",
              description:
                "Integrated solar panels that serve as your building's actual roofing material.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="min-h-51.25 rounded-[8px] border border-[#dfddda] bg-white px-7 py-8 shadow-[0_14px_28px_rgba(26,28,26,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(26,28,26,0.18)]"
            >
              <Icon className="h-6 w-6 text-[#BA0013]" strokeWidth={2.2} />
              <h2 className="mt-5 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                {title}
              </h2>
              <p className="mt-4 max-w-62.5 text-[16px] leading-[1.45] text-[#5D3F3C]">
                {description}
              </p>
              {/* <Link
                to="#"
                className="mt-5 inline-flex items-center gap-2 text-[16px] font-medium text-[#BA0013] transition hover:gap-3"
              >
                Know More
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link> */}
            </article>
          ))}
        </div>
      </section>

      {/* Premium Solar Energy Solutions */}
      <section className="bg-[#faf9f7] pb-16 pt-16 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-7xl px-8 md:px-0">
          <div className="text-center">
            <h2 className="text-[28px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              Premium Solar Energy Solutions
            </h2>
            <p className="mt-2 text-[22px] font-bold leading-tight text-[#BA0013] md:text-[32px]">
              Tailored for Every Commercial Property
            </p>
          </div>

          <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="rounded-[8px] bg-[#f1f0ee] px-9 py-10 md:min-h-82">
              <h3 className="text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
                Solar on Sheet
              </h3>

              <div className="mt-7 space-y-6">
                {[
                  {
                    icon: CircleCheck,
                    text: "Panels installed on existing metal sheet of your factory, warehouse or any other commercial property",
                  },
                  {
                    icon: BadgeCheck,
                    text: "Complete installation without drilling any holes, preventing water leakage",
                  },
                  {
                    icon: Wrench,
                    text: "Easy maintenance with an integrated plumbing system",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex gap-4">
                    <Icon
                      className="mt-0.5 h-4.5 w-4.5 flex-none text-[#BA0013]"
                      strokeWidth={2.4}
                    />
                    <p className="max-w-100 text-[16px] leading-[1.45] text-[#1A1C1A]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* <Link
                to="#"
                className="mt-8 inline-flex rounded-[6px] bg-[#BA0013] px-7 py-3 text-[16px] text-white transition hover:bg-[#9f0010]"
              >
                Know More
              </Link> */}
            </div>

            <img
              src="/energy.jpg"
              alt="Solar panels installed on a commercial metal sheet roof"
              className="h-70 w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)] md:h-86"
            />
          </div>
        </div>
      </section>

      {/* Solar on Structure */}
      <section className="bg-[#faf9f7] pb-16 md:pb-24 pt-16 lg:pt-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 md:grid-cols-2 md:gap-14 md:px-0">
          <img
            src="/Structure.jpg"
            alt="Solar panels installed on a custom commercial structure"
            className="h-70 w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)] md:h-82"
          />

          <div className="rounded-[8px] bg-[#f1f0ee] px-9 py-10 md:min-h-82">
            <h3 className="text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              Solar on Structure
            </h3>

            <div className="mt-7 space-y-6">
              {[
                {
                  icon: DraftingCompass,
                  text: "Panels installed on a custom structure designed for your property",
                },
                {
                  icon: Shield,
                  text: "Rust free - Galvanized Iron pipes used for structure",
                },
                {
                  icon: TrendingUp,
                  text: "Produce up to 15% more energy through bifacial technology",
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-4">
                  <Icon
                    className="mt-0.5 h-4.5 w-4.5 flex-none text-[#BA0013]"
                    strokeWidth={2.4}
                  />
                  <p className="max-w-100 text-[16px] leading-[1.45] text-[#1A1C1A]">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* <Link
              to="#"
              className="mt-8 inline-flex rounded-[6px] bg-[#BA0013] px-7 py-3 text-[16px] text-white transition hover:bg-[#9f0010]"
            >
              Know More
            </Link> */}
          </div>
        </div>
      </section>

      {/* Solar Roof */}
      <section className="bg-[#faf9f7] pb-16 md:pb-24 pt-16 lg:pt-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 md:grid-cols-2 md:gap-14 md:px-0">
          <div className="rounded-[8px] bg-[#f1f0ee] px-9 py-10 md:min-h-82">
            <h3 className="text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              Solar On Roof
            </h3>

            <div className="mt-7 space-y-6">
              {[
                {
                  icon: Grid2X2,
                  text: "Specially designed channels for installing solar panels",
                },
                {
                  icon: RefreshCcw,
                  text: "Reduce the use of metal sheet by up to 80%",
                },
                {
                  icon: Wrench,
                  text: "Ideal for new construction / under construction properties",
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-4">
                  <Icon
                    className="mt-0.5 h-4.5 w-4.5 flex-none text-[#BA0013]"
                    strokeWidth={2.4}
                  />
                  <p className="max-w-100 text-[16px] leading-[1.45] text-[#1A1C1A]">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* <Link
              to="#"
              className="mt-8 inline-flex rounded-[6px] bg-[#BA0013] px-7 py-3 text-[16px] text-white transition hover:bg-[#9f0010]"
            >
              Know More
            </Link> */}
          </div>

          <img
            src="/roof.jpg"
            alt="Commercial building with integrated solar roof"
            className="h-70 w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)] md:h-82"
          />
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-[#faf9f7] pb-16 md:pb-24 pt-16 md:pt-10">
        <div className="mx-auto max-w-7xl px-8 md:px-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
                Portfolio of Industrial Excellence
              </h2>
              <p className="mt-4 text-[18px] leading-relaxed text-[#5D3F3C]">
                Proven performance across varied commercial landscapes in India.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[16px] text-[#BA0013] transition hover:gap-3"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                image: "/project2.jpg",
                capacity: "500 kWp",
                title: "Apex Manufacturing Hub",
                location: "Pune Industrial Zone",
              },
              {
                image: "/project3.jpg",
                capacity: "1.2 MWp",
                title: "Global Logistics Park",
                location: "Gurgaon Logistics Corridor",
              },
              {
                image: "/project4.jpg",
                capacity: "750 kWp",
                title: "Textile Processing Unit",
                location: "Tirupur Export Hub",
              },
            ].map(({ image, capacity, title, location }) => (
              <article key={title}>
                <div className="relative overflow-hidden rounded-[8px]">
                  <img
                    src={image}
                    alt={title}
                    className="h-64 w-full object-cover transition duration-300 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-[4px] bg-[#BA0013] px-3 py-1 text-[14px] font-semibold text-white">
                    {capacity}
                  </span>
                </div>

                <h3 className="mt-6 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  {title}
                </h3>
                <p className="mt-2 flex items-center gap-1 text-[16px] leading-tight text-[#5D3F3C]">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Options Section */}
      <section className="bg-[#FAF9F6] pb-16 md:pb-20 pt-16 md:pt-16">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <h2 className="mb-16 text-center text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
            Explore Your Solar Options
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/calculator"
              className="flex min-h-34 items-center gap-9 rounded-lg border border-[#D9D5D0] bg-white px-11 py-8 transition hover:border-[#BA0013]/40"
            >
              <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#FCE3E7] text-[#BA0013]">
                <Calculator size={24} strokeWidth={2.2} />
              </span>

              <span>
                <span className="block text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  Solar Calculator
                </span>
                <span className="mt-3 block max-w-73 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  Estimate your savings and required system
                  size in minutes.
                </span>
              </span>
            </Link>

            <Link
              to="/pm-surya-ghar"
              className="flex min-h-34 items-center gap-9 rounded-lg border border-[#D9D5D0] bg-white px-11 py-8 transition hover:border-[#BA0013]/40"
            >
              <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#FCE3E7] text-[#BA0013]">
                <Landmark size={24} strokeWidth={2.2} />
              </span>

              <span>
                <span className="block text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  PM Surya Ghar
                </span>
                <span className="mt-3 block max-w-73 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  1 kW – ₹30,000, 2 kW – ₹60,000, 3 kW – ₹78,000
                </span>
              </span>
            </Link>
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
                  <a href="tel:+9176195 75683" className="hover:underline focus-visible:underline active:underline">
                    +91 76195 75683
                  </a>{" "}
                  /{" "}
                  <a href="tel:+9195916 75683" className="hover:underline focus-visible:underline active:underline">
                    +91 95916 75683
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
