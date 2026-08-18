import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Search } from "lucide-react";
import { blogArticles, getArticleBySlug, getRelatedArticles } from "../data/Blogarticles"
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

// Categories across the whole library, used in the sidebar. Derived from
// the data so a category never appears with zero articles behind it.
const ALL_CATEGORIES: string[] = Array.from(new Set(blogArticles.map((a) => a.category)));

// Matches the fonts + palette used across the ShashWatt Energy site
// (Blog.tsx uses the same pair). Loaded once per detail-page visit,
// same pattern as the list page.
export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;

  // ---- Sidebar pin, driven by JS instead of CSS `position: sticky` ----
  // `sticky` depends on every ancestor having `overflow: visible` (and no
  // transform), which is fragile inside a shared layout component. This
  // computes `position: fixed` directly from the sidebar's own scroll
  // position instead, so it stays pinned no matter what any ancestor does.
  // `position: fixed` is used because it escapes ancestor `overflow: hidden`
  // clipping entirely (the same reason fixed-position modals work inside
  // overflow-hidden containers) — unlike sticky, which has no such escape.
  const sidebarWrapRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const SIDEBAR_TOP_OFFSET = 112; // px gap kept from the top of the viewport

  useEffect(() => {
    function updateSidebarPosition() {
      const wrap = sidebarWrapRef.current;
      const aside = sidebarRef.current;
      if (!wrap || !aside) return;

      // Only pin on large screens — below `lg` the sidebar stacks under
      // the article and should scroll normally.
      if (window.innerWidth < 1024) {
        setSidebarStyle({});
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const asideHeight = aside.offsetHeight;
      const maxTravel = Math.max(wrap.offsetHeight - asideHeight, 0);

      if (wrapRect.top > SIDEBAR_TOP_OFFSET) {
        // Not scrolled to it yet — sits in normal flow.
        setSidebarStyle({});
        return;
      }

      const overshoot = SIDEBAR_TOP_OFFSET - wrapRect.top;

      if (overshoot >= maxTravel) {
        // Reached the bottom of the two-column area — stop pinning so it
        // doesn't overlap the Related Articles section below.
        setSidebarStyle({ position: "absolute", top: maxTravel, left: 0, right: 0 });
      } else {
        // Pinned to the viewport.
        setSidebarStyle({
          position: "fixed",
          top: SIDEBAR_TOP_OFFSET,
          left: wrapRect.left,
          width: wrapRect.width,
        });
      }
    }

    updateSidebarPosition();
    window.addEventListener("scroll", updateSidebarPosition, { passive: true });
    window.addEventListener("resize", updateSidebarPosition);
    return () => {
      window.removeEventListener("scroll", updateSidebarPosition);
      window.removeEventListener("resize", updateSidebarPosition);
    };
  }, [article]);

  const handleSidebarSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = sidebarSearch.trim();
    navigate(q ? `/blog?search=${encodeURIComponent(q)}` : "/blog");
  };

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

  // Scroll to top whenever the article changes (navigating between
  // articles via "Related Articles" should not preserve scroll position).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const heading: CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const body: CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  // Unknown slug — send the reader back to the blog index rather than
  // rendering a broken page.
  if (!article) {
    return (
      <div style={body} className="bg-[#faf9f7] text-[#1A1C1A] antialiased min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 style={heading} className="text-[28px] font-bold mb-4 text-[#1A1C1A]">
            Article not found
          </h1>
          <p className="text-[16px] text-[#5D3F3C] mb-8">
            The article you're looking for doesn't exist or may have moved.
          </p>
          <button
            type="button"
            onClick={() => navigate("/blog")}
            style={heading}
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#BA0013] px-6 py-3 text-[16px] font-semibold text-[#BA0013] transition hover:bg-[#BA0013] hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to All Blogs
          </button>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article, 3);
  const tocHeadings = article.content.sections.map((s) => s.heading);

  // Recent Posts sidebar — latest 3 articles by date, excluding the one
  // currently being read.
  const recentPosts = blogArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div style={body} className="bg-[#faf9f7] text-[#1A1C1A] antialiased">
      <nav className="absolute left-0 right-0 top-0 z-20 text-[#1A1C1A]">
        <div className="mx-auto flex h-29.5 max-w-7xl items-center justify-between px-8 md:px-0">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Shashwatt Energy"
              className="h-22 w-auto -ml-2 md:-ml-3"
            />
          </Link>

          <div className="hidden items-center gap-8 text-[14px] font-semibold md:flex">
            <Link to="/" className="hover:text-black/80">Home</Link>
            <SolarSolutionsNav />
            <Link to="/ev-charging" className="hover:text-white/80">EV Charging</Link>
            <Link to="/pm-surya-ghar" className="hover:text-black/80">PM Surya Ghar Yojana</Link>
            <Link to="/about" className="hover:text-black/80">About Us</Link>
            <Link to="/projects" className="hover:text-black/80">Projects</Link>
            <Link to="/faq" className="hover:text-black/80">FAQs</Link>
            <Link to="/blog" className="border-b-2 border-[#BA0013] text-[#BA0013]">Blogs</Link>
            <Link to="/calculator" className="hover:text-black/80">Calculator</Link>
          </div>

          <Link to="/contact" className="hidden rounded-[8px] bg-[#BA0013] px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-[#BA0013] md:block">
            Contact Us
          </Link>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen &&
          <div className="mx-6 rounded-lg bg-black/55 px-6 py-5 backdrop-blur-md md:hidden text-white">
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
      <div className="mx-auto max-w-7xl px-8 pt-30 pb-16 md:px-0 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* ============ MAIN COLUMN ============ */}
          <div>
            {/* ---- Header ---- */}
            <header className="pb-8">
              <Link
                to="/blog"
                style={heading}
                className="w-fit flex items-center gap-2 text-[16px] font-medium text-[#5D3F3C] hover:text-[#BA0013] transition-colors duration-200 mb-10"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to All Blogs
              </Link>

              <span
                style={{ ...heading, backgroundColor: "#FFDAD8" }}
                className="inline-flex rounded-full px-5 py-2 text-[16px] font-medium uppercase leading-none tracking-normal text-[#341010] mb-6"
              >
                {article.category}
              </span>

              <h1
                style={heading}
                className="text-[32px] md:text-[44px] font-bold leading-[1.1] mb-5 mt-1 text-[#1A1C1A]"
              >
                {article.title}
              </h1>

              <p className="text-[18px] leading-[1.55] text-[#5D3F3C] mb-6">{article.excerpt}</p>

              <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#5D3F3C]">
                {article.date}
                <span className="mx-1">•</span>
                <Clock size={14} strokeWidth={2.5} />
                {article.readTime}
              </div>
            </header>

            {/* ---- Featured Image ---- */}
            <div className="mb-12">
              <div className="rounded-[8px] overflow-hidden shadow-[0_16px_28px_rgba(26,28,26,0.18)] aspect-video">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ---- Article Body ---- */}
            <article className="pb-4">
              <p className="text-[18px] leading-[1.55] text-[#1A1C1A] mb-10">
                {article.content.introduction}
              </p>

              {/* Table of Contents */}
              <div className="rounded-[8px] border border-[#dfddda] bg-[#f1f0ee] p-7 mb-12">
                <h2 style={heading} className="text-[16px] font-bold uppercase tracking-widest text-[#5D3F3C] mb-4">
                  Table of Contents
                </h2>
                <ol className="space-y-2">
                  {tocHeadings.map((h, i) => (
                    <li key={h}>
                      <a
                        href={`#section-${i}`}
                        style={heading}
                        className="text-[16px] font-medium text-[#1A1C1A] hover:text-[#BA0013] transition-colors duration-200"
                      >
                        {i + 1}. {h}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Sections */}
              {article.content.sections.map((section, i) => (
                <section key={section.heading} id={`section-${i}`} className="mb-10 scroll-mt-24">
                  <h2 style={heading} className="text-[24px] font-semibold mb-4 leading-tight text-[#1A1C1A]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-[16px] leading-[1.45] text-[#1A1C1A] mb-4">
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              <hr className="border-[#dfddda] my-10" />

              <section>
                <h2 style={heading} className="text-[24px] font-semibold mb-4 leading-tight text-[#1A1C1A]">
                  Conclusion
                </h2>
                <p className="text-[16px] leading-[1.45] text-[#1A1C1A]">{article.content.conclusion}</p>
              </section>
            </article>
          </div>

          {/* ============ SIDEBAR ============ */}
          <div ref={sidebarWrapRef} className="relative lg:h-full">
            <aside
              ref={sidebarRef}
              style={sidebarStyle}
              className="flex flex-col gap-8 pb-4 lg:w-80"
            >
              {/* Search */}
              <form onSubmit={handleSidebarSearch} className="relative">
                <Search
                  size={16}
                  strokeWidth={2.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D3F3C]"
                />
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search Blogs"
                  style={body}
                  className="w-full pl-10 pr-4 py-3 text-[16px] rounded-full border border-[#dfddda] bg-white text-[#1A1C1A] focus:outline-none focus:border-[#BA0013]/40"
                />
              </form>

              {/* Recent Posts */}
              <div>
                <h3
                  style={heading}
                  className="text-[16px] font-bold uppercase tracking-widest text-[#5D3F3C] mb-4"
                >
                  Recent Posts
                </h3>
                <div className="flex flex-col gap-3">
                  {recentPosts.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      style={heading}
                      className="block rounded-[8px] border border-[#dfddda] bg-white p-4 text-[16px] font-medium text-[#1A1C1A] leading-snug shadow-[0_14px_28px_rgba(26,28,26,0.08)] hover:text-[#BA0013] hover:border-[#BA0013]/40 transition-colors duration-200"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3
                  style={heading}
                  className="text-[16px] font-bold uppercase tracking-widest text-[#5D3F3C] mb-4"
                >
                  Categories
                </h3>
                <div className="flex flex-col gap-3">
                  {ALL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to={`/blog?category=${encodeURIComponent(cat)}`}
                      style={heading}
                      className="block rounded-[8px] border border-[#dfddda] bg-white px-4 py-3 text-[16px] font-medium text-[#1A1C1A] shadow-[0_14px_28px_rgba(26,28,26,0.08)] hover:text-[#BA0013] hover:border-[#BA0013]/40 transition-colors duration-200"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ============ RELATED ARTICLES ============ */}
      {related.length > 0 && (
        <section className="bg-[#faf9f7] px-8 md:px-0 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <h2 style={heading} className="text-[28px] md:text-[32px] font-bold mb-10 text-[#1A1C1A]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-[#dfddda] bg-white shadow-[0_14px_28px_rgba(26,28,26,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(26,28,26,0.18)]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      style={heading}
                      className="absolute top-4 left-4 rounded-[4px] bg-[#BA0013] px-3 py-1 text-[14px] font-semibold text-white"
                    >
                      {r.category}
                    </span>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 style={heading} className="font-semibold text-[24px] text-[#1A1C1A] mb-4 leading-tight">
                      {r.title}
                    </h3>
                    <p className="text-[16px] leading-[1.45] text-[#5D3F3C] mb-5 flex-1">{r.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#5D3F3C]">
                      <Clock size={13} strokeWidth={2.5} />
                      {r.readTime}
                      <span className="mx-1">•</span>
                      {r.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

// Re-export for convenience if a caller only imports from this file.
export { blogArticles };
