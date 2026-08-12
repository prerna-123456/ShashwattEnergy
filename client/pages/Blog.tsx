import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
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
  Search,
} from "lucide-react";

export default function Blog() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f7] text-[#1A1C1A]">
      <nav className="absolute left-0 right-0 top-0 z-20 text-white">
        <div className="mx-auto flex h-29.5 max-w-7xl items-center justify-between px-6 md:px-0">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Shashwatt Energy"
              className="h-14 w-auto md:-ml-4"
            />

            <div className="flex flex-col leading-none">
              <img
                src="/logo-text.png"
                alt="Shashwatt Energy"
                className="h-14 w-auto md:-ml-4 md:mt-2"
              />
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-[14px] font-semibold md:flex">
            <Link to="/" className="hover:text-white/80">Home</Link>
            <Link to="/residential" className="hover:text-white/80">Residential</Link>
            <Link to="/commercial" className="hover:text-white/80 ">Commercial</Link>
            <Link to="/pm-surya-ghar" className="hover:text-white/80">PM Surya Ghar Yojana</Link>
            <Link to="/about" className="hover:text-white/80">About Us</Link>
            <Link to="/projects" className="hover:text-white/80">Projects</Link>
            <Link to="/faq" className="hover:text-white/80">FAQ</Link>
            <Link to="/blog" className="border-b-2 border-[#BA0013] text-[#BA0013]">Blog</Link>
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

      {/* Hero Section */}
      <section
        className="relative min-h-138.5 overflow-hidden bg-white bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%),url('/blog-hero-bg.png')] bg-cover bg-center text-white md:min-h-138.5 lg:min-h-138.5"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-6 pt-24 md:min-h-140 md:px-0 lg:min-h-138.5">
          <div className="max-w-165">
            <span className="inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] font-medium leading-none tracking-normal text-[#341010]">
              INSIGHTS
            </span>

            <h1 className="mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white sm:text-[56px] lg:text-[56px]">
              Powering Your Knowledge
            </h1>

            <p className="mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white md:text-[18px]">
              Explore practical insights, helpful guides, and the latest ideas in solar energy to make smarter decisions for your home, business, and a more sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Intro Feature */}
      <section className="bg-white">
        <div className="bg-[#faf9f7] py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 md:grid-cols-2 md:px-0">
            <div>
              <p className="mb-5 text-[14px] font-bold uppercase tracking-[1px] text-[#BA0013]">
                Insights & Ideas
              </p>
              <h2 className="max-w-120 text-[36px] font-bold leading-[1.12] text-[#1A1C1A] md:text-[40px]">
                A Brighter Way to
                <br />
                Think About Energy
              </h2>
            </div>

            <p className="max-w-142 justify-self-end text-left text-[18px] leading-normal text-[#7A5D58] md:pt-10 md:text-right">
              Explore practical insights, solar innovations, industry updates, and helpful guides
              to make smarter decisions about clean energy for your home, business, or community.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-0 md:py-10">
          <div>
            <span className="inline-flex rounded-full bg-[#FFDAD8] px-5 py-2 text-[16px] uppercase tracking-[0.5px] text-[#BA0013]">
              Insights & Ideas
            </span>

            <h3 className="mt-6 text-[18px] leading-tight text-[#1A1C1A]">
              A Brighter Way to Think About Energy
            </h3>

            <p className="mt-7 max-w-125 text-[16px] leading-[1.55] text-[#7A5D58]">
              Explore practical insights, solar innovations, industry updates, and helpful
              guides to make smarter decisions about clean energy for your home, business,
              or community.
            </p>

            <Link
              to="#blog-list"
              className="mt-10 inline-flex items-center gap-5 text-[16px] font-medium text-[#BA0013] transition hover:gap-6"
            >
              <span className="h-px w-14 bg-[#BA0013]" />
              Scroll to Explore
            </Link>
          </div>

          <img
            src="/blog1.png"
            alt="Solar campus with rooftop panels and EV charging hub"
            className="aspect-[1.36/1] w-full rounded-[10px] object-cover shadow-[0_18px_36px_rgba(26,28,26,0.16)]"
          />
        </div>
      </section>

      {/* Blog Articles */}
      <section id="blog-list" className="bg-white py-14 md:py-20">
        <div className="border-b border-[#E8E0DC]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-5 md:flex-row md:items-center md:justify-between md:px-0">
            <div className="flex flex-wrap items-center gap-7 text-[16px] text-[#7A5D58]">
              {[
                "All",
                "Solar Basics",
                "Residential",
                "Commercial",
                "Government Schemes",
                "Sustainability",
              ].map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className={`pb-2 transition hover:text-[#BA0013] ${index === 0
                    ? "border-b-2 border-[#BA0013] text-[#BA0013]"
                    : ""
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="flex w-full max-w-62 items-center gap-3 text-[#7A5D58] md:justify-end">
              <Search size={18} strokeWidth={2} />
              <input
                type="search"
                placeholder="Search Insights"
                className="w-full bg-transparent text-[16px] outline-none placeholder:text-[#7A5D58]"
              />
            </label>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-x-8 gap-y-14 px-6 md:grid-cols-3 md:px-0">
          {[
            {
              category: "Residential",
              title: "Solar for Homes: How to Choose the Right Capacity",
              desc: "Calculate your monthly energy consumption and determine the optimal kilowatt size for your...",
              readTime: "5 min read",
              date: "May 12, 2024",
              image: "/blog-img.jpg",
            },
            {
              category: "Government Schemes",
              title: "PM Surya Ghar Yojana: A Step-by-Step Guide to Subsidies",
              desc: "A comprehensive walkthrough of India's latest rooftop solar scheme and how to claim your...",
              readTime: "8 min read",
              date: "May 10, 2024",
              image: "/blog-img2.jpg",
            },
            {
              category: "Commercial",
              title: "Commercial Solar: Tax Benefits and Accelerated Depreciation",
              desc: "Learn how businesses can leverage significant tax savings to achieve ROI on solar projects in...",
              readTime: "6 min read",
              date: "May 05, 2024",
              image: "/blog-img3.jpg",
            },
            {
              category: "Solar Basics",
              title: "Maintaining Your Solar Panels for Decades of Performance",
              desc: "Simple maintenance tips and professional cleaning schedules to ensure maximum efficiency",
              readTime: "4 min read",
              date: "Apr 28, 2024",
              image: "/blog-img4.jpg",
            },
            {
              category: "Sustainability",
              title: "The Impact of Solar Energy on Property Value in India",
              desc: "Exploring why 'Solar-Ready' homes are commanding higher prices in the modern Indian...",
              readTime: "7 min read",
              date: "Apr 22, 2024",
              image: "/blog-img5.jpg",
            },
            {
              category: "Solar Basics",
              title: "Understanding Grid-Tied vs. Off-Grid Systems",
              desc: "Which system type is right for your location? A deep dive into the pros and cons of energy...",
              readTime: "10 min read",
              date: "Apr 15, 2024",
              image: "/blog-img6.jpg",
            },
          ].map((article) => (
            <article key={article.title} className="group">
              <div className="relative overflow-hidden rounded-[10px]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="aspect-[1.72/1] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-[6px] bg-white/90 px-3 py-1.5 text-[16px] font-semibold text-[#7A3C38] shadow-[0_8px_18px_rgba(26,28,26,0.12)]">
                  {article.category}
                </span>
              </div>

              <h3 className="mt-6 text-[16px] leading-[1.4] text-[#2A1D1B]">
                {article.title}
              </h3>
              <p className="mt-4 text-[16px] leading-normal text-[#7A5D58]">
                {article.desc}
              </p>

              <div className="mt-5 flex items-center gap-3 text-[16px] text-[#7A5D58]">
                <span>{article.readTime}</span>
                <span className="h-1 w-1 rounded-full bg-[#BA0013]" />
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-18 text-center">
          <Link
            to="#blog-list"
            className="inline-flex h-12 items-center justify-center rounded-[8px] border-2 border-[#BA0013] px-9 text-[16px] font-bold text-[#BA0013] transition hover:bg-[#BA0013] hover:text-white"
          >
            View All Articles
          </Link>
        </div>
      </section>

      {/* Featured Blog Article */}
      <section className="bg-white px-6 py-16 md:py-20 lg:px-0">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[10px] bg-[#fbf9f6] md:grid-cols-[1.08fr_0.92fr]">
          <img
            src="/blog-features.png"
            alt="Large solar farm at sunset"
            className="h-150 w-full object-cover md:h-107"
          />

          <div className="flex min-h-82 items-center px-9 py-12 md:min-h-107 md:px-16">
            <div className="max-w-98">
              <p className="mb-5 flex items-center gap-2 text-[16px] uppercase leading-none text-[#BA0013]">
                <span className="h-2 w-2 rounded-full bg-[#BA0013]" />
                Solar Tech
              </p>

              <h2 className="text-[18px] leading-[1.22] text-[#1A1C1A]">
                The Future of High-Efficiency N-Type
                <br />
                Solar Panels
              </h2>

              <p className="mt-7 text-[16px] leading-[1.55] text-[#5D3F3C]">
                Discover why N-Type technology is becoming the new standard for residential
                and commercial solar installations in India, offering superior performance
                in high temperatures and better longevity.
              </p>

              <Link
                to="#blog-list"
                className="mt-10 inline-flex items-center gap-3 text-[16px] font-bold text-[#BA0013] transition hover:gap-4"
              >
                Read Article
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Switch CTA */}
      <section className="min-h-105 bg-[url('/cta-bg.png')] bg-cover bg-center">
        <div className="mx-auto flex min-h-105 max-w-7xl items-center px-6 lg:px-0">
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
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.25fr_1fr_1fr_1.35fr] lg:px-0">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src="/logo.png"
                alt="Shashwatt Energy"
                className="h-14 w-auto md:-ml-6"
              />
              <span className="flex flex-col leading-none">
                <img
                  src="/logo-text.png"
                  alt="Shashwatt Energy"
                  className="h-14 w-auto md:-ml-4 md:mt-2"
                />
              </span>
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
              <Link to="/calculator">Calculator</Link>
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
              <Link to="/faq">FAQ</Link>
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
                  C-512, Industrial Estate, Gokul
                  <br />
                  Road, Hubballi - 580030
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
