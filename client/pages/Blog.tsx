import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, Clock } from "lucide-react";
import { blogArticles, type BlogArticle } from "../data/Blogarticles";
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

// Photos — served from the /public/blogsimg folder
const heroImg = "/blogsimg/hero.webp";
const campusImg = "/blogsimg/campus.webp";

// Categories actually used across the current 11-article library. Keeping
// this derived from the data (rather than a separate hardcoded list) means
// the filter bar can never show a category with zero matching articles.
const CATEGORY_OPTIONS: string[] = Array.from(
  new Set(blogArticles.map((a) => a.category))
);

const YEAR_OPTIONS: string[] = Array.from(
  new Set(blogArticles.map((a) => a.date.split(", ").pop() as string))
).sort();

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

export default function Blog() {
  // Load the brand font (Plus Jakarta Sans, used for everything).
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const heading: CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const body: CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // Reading "category" / "search" from the URL lets links from the
  // BlogDetail sidebar (Categories, Search) land here pre-filtered.
  const [searchParams] = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState(
    () => searchParams.get("category") ?? "All"
  );
  const [yearFilter, setYearFilter] = useState("All");
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [visibleCount, setVisibleCount] = useState(9);

  // Re-sync filters if the URL query changes (e.g. navigating here again
  // from a different sidebar link without a full page reload), and jump
  // straight to the articles section so a filtered link doesn't just land
  // on the hero.
  useEffect(() => {
    setCategoryFilter(searchParams.get("category") ?? "All");
    setSearch(searchParams.get("search") ?? "");

    if (searchParams.get("category") || searchParams.get("search")) {
      const el = document.getElementById("articles");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  // Reset how many cards are showing whenever a filter changes.
  useEffect(() => {
    setVisibleCount(9);
  }, [categoryFilter, yearFilter, search]);

  const filteredArticles = blogArticles
    .filter((a) => {
      if (categoryFilter !== "All" && a.category !== categoryFilter) return false;
      if (yearFilter !== "All" && !a.date.endsWith(yearFilter)) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.excerpt.toLowerCase().includes(q) &&
          !a.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a: BlogArticle, b: BlogArticle) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={body} className="bg-[#faf9f7] text-[#1A1C1A] antialiased">

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
            <Link to="/blog" className="border-b-2 border-[#BA0013] text-[#BA0013]">Blogs</Link>
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
      <header className="relative z-10 min-h-138.5 overflow-hidden md:min-h-138.5">
        <img
          src={heroImg}
          alt="Modern home with rooftop solar panels"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.47)_38%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.32)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl items-center px-8 pt-36 lg:pt-26 md:min-h-140 md:px-0 md:pt-32 lg:min-h-138.5">
          <div className="max-w-185">
            <span
              style={{ ...heading, backgroundColor: "#FFDAD8" }}
              className={`inline-flex rounded-full px-5 py-2 text-[16px] font-medium uppercase leading-none tracking-normal text-[#341010] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              Insights
            </span>
            <h1
              style={{ ...heading, transitionDelay: heroIn ? "120ms" : "0ms" }}
              className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              Powering Your Knowledge
            </h1>
            <p
              style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
              className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[18px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              Explore practical insights, helpful guides, and the latest ideas in solar energy to
              make smarter decisions for your home, business, and a more sustainable future.
            </p>
          </div>
        </div>
      </header>

      {/* ============ A BRIGHTER WAY TO THINK ABOUT ENERGY ============ */}
      <section className="bg-[#faf9f7] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 md:grid-cols-2 md:gap-14 md:px-0">
          <Reveal>
            <span style={heading} className="mb-3 block text-[16px] font-bold uppercase tracking-[2px] text-[#BA0013]">
              Insights &amp; Ideas
            </span>
            <h2 style={heading} className="mb-5 text-[28px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              A Brighter Way to Think About Energy
            </h2>
            <p className="mb-8 max-w-140 text-[16px] leading-[1.45] text-[#5D3F3C]">
              Explore practical insights, solar innovations, industry updates, and helpful guides
              to make smarter decisions about clean energy for your home, business, or community.
            </p>
            <a
              href="#articles"
              style={heading}
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#BA0013] transition hover:gap-3"
            >
              Scroll to Explore
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </Reveal>

          <Reveal delay={100}>
            <img
              src={campusImg}
              alt="Commercial solar campus with EV charging hub"
              className="h-70 w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)] md:h-102"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ ARTICLES ============ */}
      <section id="articles" className="bg-[#faf9f7] pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-8 md:px-0">
          <Reveal className="mb-16 flex flex-col gap-6 border-b border-[#dfddda] pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("All")}
                  style={heading}
                  className={`rounded-full px-4 py-2 text-[16px] font-semibold transition-colors duration-200 ${categoryFilter === "All"
                    ? "text-[#BA0013]"
                    : "text-[#5D3F3C] hover:text-[#1A1C1A]"
                    }`}
                >
                  All
                </button>
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    style={heading}
                    className={`rounded-full px-4 py-2 text-[16px] font-semibold transition-colors duration-200 ${categoryFilter === cat
                      ? "text-[#BA0013]"
                      : "text-[#5D3F3C] hover:text-[#1A1C1A]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search
                  size={16}
                  strokeWidth={2.5}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5D3F3C]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Blogs"
                  style={body}
                  className="w-48 rounded-full border border-[#dfddda] bg-white py-2 pl-10 pr-4 text-[16px] text-[#1A1C1A] focus:border-[#BA0013]/40 focus:outline-none md:w-56"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span style={heading} className="mr-1 text-[16px] font-semibold uppercase tracking-widest text-[#5D3F3C]">
                Year
              </span>
              <button
                type="button"
                onClick={() => setYearFilter("All")}
                style={heading}
                className={`rounded-full px-4 py-1.5 text-[16px] font-semibold transition-colors duration-200 ${yearFilter === "All" ? "text-[#BA0013]" : "text-[#5D3F3C] hover:text-[#1A1C1A]"
                  }`}
              >
                All Years
              </button>
              {YEAR_OPTIONS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYearFilter(yr)}
                  style={heading}
                  className={`rounded-full px-4 py-1.5 text-[16px] font-semibold transition-colors duration-200 ${yearFilter === yr ? "text-[#BA0013]" : "text-[#5D3F3C] hover:text-[#1A1C1A]"
                    }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </Reveal>

          {filteredArticles.length === 0 ? (
            <Reveal>
              <div className="rounded-[8px] border border-[#dfddda] bg-white py-20 text-center">
                <p style={heading} className="mb-2 text-[24px] font-semibold text-[#1A1C1A]">
                  No articles match your search
                </p>
                <p className="text-[16px] text-[#5D3F3C]">Try a different category, year or search term.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 100}>
                  <article className="flex h-full flex-col overflow-hidden rounded-[8px] border border-[#dfddda] bg-white shadow-[0_14px_28px_rgba(26,28,26,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(26,28,26,0.18)]">
                    <Link to={`/blog/${a.slug}`} className="group relative block aspect-video overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <span
                        style={heading}
                        className="absolute left-4 top-4 rounded-[4px] bg-[#BA0013] px-3 py-1 text-[14px] font-semibold text-white"
                      >
                        {a.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col px-7 py-8">
                      <Link to={`/blog/${a.slug}`}>
                        <h3 style={heading} className="mb-4 text-[24px] font-semibold leading-tight text-[#1A1C1A] transition hover:text-[#BA0013]">
                          {a.title}
                        </h3>
                      </Link>
                      <p className="mb-5 flex-1 text-[16px] leading-[1.45] text-[#5D3F3C]">{a.excerpt}</p>
                      <div className="mb-5 flex items-center gap-1.5 text-[14px] font-medium text-[#5D3F3C]">
                        <Clock size={13} strokeWidth={2.5} />
                        {a.readTime}
                        <span className="mx-1">•</span>
                        {a.date}
                      </div>
                      <Link
                        to={`/blog/${a.slug}`}
                        style={heading}
                        className="inline-flex items-center gap-2 text-[16px] font-medium text-[#BA0013] transition hover:gap-3"
                      >
                        View Article
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {hasMore && (
            <Reveal className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 6)}
                style={heading}
                className="inline-flex items-center justify-center rounded-[6px] border border-[#BA0013] px-9 py-4 text-[16px] font-normal text-[#BA0013] transition hover:bg-[#BA0013] hover:text-white"
              >
                Load More Articles
              </button>
            </Reveal>
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
  );
}
