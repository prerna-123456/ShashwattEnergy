import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ContactRound,
  Crosshair,
  Building,
  Building2,
  Hotel,
  House,
  Hd,
  Earth,
  Mail,
  Menu,
  PenTool,
  Phone,
  RotateCcw,
  MapPin,
  Share2,
  Settings,
  Wrench,
  X,
} from "lucide-react";

const features = [
  {
    title: "Customized Solar Design",
    image: "/design1.png",
  },
  {
    title: "Professional Installation",
    image: "/design2.png",
  },
  {
    title: "Quality Components",
    image: "/design3.png",
  },
  {
    title: "End-to-End Support",
    image: "/design4.png",
  },
];

const trustCarouselImages = [
  "/trust.webp",
  "/trust2.webp",
  "/trust3.webp",
  "/trust4.webp",
  "/trust5.webp",
];

const heroSlides = [
  {
    title: "Turn Sunlight Into\nLong-Term Savings",
    desc: "Empowering Indian homes and businesses with high-performance solar infrastructure. We deliver end-to-end  engineering excellence for a sustainable future.",
    image: "/hero-bg.webp",
    primaryLabel: "Consult Our Experts",
    primaryLink: "/contact",
    secondaryLabel: "About Us",
    secondaryLink: "/about",
  },
  {
    title: "Generate Clean Energy and\nReduce Your Power Bills",
    desc: "Harness the power of the sun to create a smarter, more sustainable, and cost-effective energy future.",
    image: "/hero-bg2.webp",
    primaryLabel: "Consult Our Experts",
    primaryLink: "/contact",
    secondaryLabel: "About Us",
    secondaryLink: "/about",
  },
  {
    title: "Power Your World with\nClean Energy",
    desc: "Switch to solar and generate clean, renewable power that reduces your dependence on conventional energy while building a more sustainable future.",
    image: "/hero-bg3.webp",
    primaryLabel: "Consult Our Experts",
    primaryLink: "/contact",
    secondaryLabel: "About Us",
    secondaryLink: "/about",
  },
  {
    title: "Reliable Solar Backup,\nWhenever You Need It",
    desc: "Stay powered through outages with dependable solar backup solutions designed to keep your home or business running without interruption.",
    image: "/hero-bg4.webp",
    primaryLabel: "Consult Our Experts",
    primaryLink: "/contact",
    secondaryLabel: "About Us",
    secondaryLink: "/about",
  },
  {
    title: "Step Into a Smarter\nEnergy Future",
    desc: "Take control of the way you power your home or business with clean solar energy. Reduce your dependence on the grid, lower your electricity bills, and enjoy an energy solution designed around your needs.",
    image: "/hero-bg5.webp",
    primaryLabel: "Consult Our Experts",
    primaryLink: "/contact",
    secondaryLabel: "About Us",
    secondaryLink: "/about",
  },
];

const solutions = [
  {
    title: "Home",
    desc: "Power your home sustainably with solar energy and gain long-term savings on electricity costs.",
    image: "/solution1.jpg",
  },
  {
    title: "Institutions",
    desc: "Empowering schools, hospitals, and universities with reliable and sustainable solar energy networks.",
    image: null,
  },
  {
    title: "Industry",
    desc: "Harness solar energy for uninterrupted power and long-term savings in industrial operations.",
    image: "/solution2.jpg",
  },
  {
    title: "Housing Societies",
    desc: "Transform your housing society with solar power for cost savings and a greener community.",
    image: null,
  },
  {
    title: "Commercial Complexes",
    desc: "Make your commercial space energy-efficient with cost-saving solar solutions.",
    image: "/solution3.jpg",
  },
  {
    title: "Warehouse",
    desc: "Power your warehouse sustainably with solar energy, ensuring long-term savings.",
    image: null,
  },
];

const partnerLogos = [
  {
    src: "/logo5.png",
    alt: "Partner logo 1",
  },
  {
    src: "/logo3.png",
    alt: "Partner logo 2",
  },
  {
    src: "/logo7.png",
    alt: "Partner logo 3",
  },
  {
    src: "/logo2.png",
    alt: "Partner logo 4",
  },
  {
    src: "/logo4.png",
    alt: "Partner logo 5",
  },
  {
    src: "/logo6.png",
    alt: "Partner logo 4",
  },
  {
    src: "/logo1.webp",
    alt: "Partner logo 5",
  },
];

const livingSpaces = [
  {
    title: "Independent Homes",
    desc: "Maximum autonomy with custom rooftop designs tailored to family needs.",
    image: "/home1.webp",
    Icon: House,
  },
  {
    title: "Malls",
    desc: "Powering malls with efficient solar energy and long-term savings.",
    image: "/mall.webp",
    Icon: Building,
  },
  {
    title: "Warehouse",
    desc: "Reliable solar power for efficient and sustainable warehouse operations.",
    image: "/warehouse.webp",
    Icon: Building2,
  },
  {
    title: "Commercials",
    desc: "Smart solar solutions for energy-efficient commercial spaces.",
    image: "/commercials.webp",
    Icon: Building2,
  },
  {
    title: "Housing Societies",
    desc: "Community-scale power for savings on common utility costs and green branding.",
    image: "/solution2.jpg",
    Icon: Hotel,
  },
];

const faqItems = [
  {
    question: "How does a solar power system work for my home?",
    answer:
      "A solar power system uses solar panels to capture sunlight and convert it into electricity using an inverter. This electricity powers your home's appliances. If your system generates more power than you use, the excess can be sent back to the grid or stored in a battery (if installed).",
  },
  {
    question: "What is net metering and how does it benefit me?",
    answer:
      "Net metering lets you send excess solar electricity back to the grid and receive credits on your bill, helping reduce your overall electricity costs.",
  },
];

const blogPosts = [
  {
    category: "Commercial Solar",
    title: "Complete Guide to Commercial  Rooftop Solar",
    slug: "commercial-rooftop-solar-guide",
    desc: "How commercial rooftop solar differs from residential systems and what business owners should consider before installing..",
    date: "Mar 17, 2026",
    image: "/blogsimg/commercial-rooftop-solar.webp",
  },
  {
    category: "Housing Societies",
    title: "Solar Solutions for Apartments and Residential Communities",
    slug: "solar-apartments-residential-communities",
    desc: "Apartments have different rooftop and ownership considerations than independent homes. Here's how solar can still work for them.",
    date: "Feb 17, 2026",
    image: "/blogsimg/solar-apartments.webp",
  },
  {
    category: "Housing Societies",
    title: "How Housing Societies Can Benefit from Rooftop Solar",
    slug: "housing-societies-rooftop-solar",
    desc: "Rooftop solar can help housing societies cut common-area electricity costs. Here's how societies typically approach a solar decision.",
    date: "Jan 20, 2026",
    image: "/blogsimg/housing-societies-solar.webp",
  },
];

const customerStories = [
  {
    name: "Commercial Customer",
    system: "25 kW On-Grid System",
    quote:
      "The ShashWatt Energy team made our solar installation simple and seamless. The system is performing efficiently, helping us significantly reduce our monthly electricity costs.",
  },
  {
    name: "Rural Property Owner",
    system: "10 kW Off-Grid System",
    quote:
      "We now have reliable power even in areas with limited grid connectivity. The team provided excellent guidance and installed the system professionally.",
  },
  {
    name: "Residential Customer",
    system: "8 kW Hybrid System",
    quote:
      "Our hybrid solar system provides reliable backup along with significant energy savings. The entire installation process was smooth, professionally handled, and hassle-free.",
  },
];

export default function Index() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [activeTrustImage, setActiveTrustImage] = useState(0);
  const [featuresAnimated, setFeaturesAnimated] = useState(false);
  const [showLogoIntro, setShowLogoIntro] = useState(true);
  const featuresRef = useRef<HTMLElement | null>(null);
  const trustSectionRef = useRef<HTMLElement | null>(null);
  const journeySectionRef = useRef<HTMLElement | null>(null);
  const pmSectionRef = useRef<HTMLElement | null>(null);
  const impactSectionRef = useRef<HTMLElement | null>(null);
  const precisionSectionRef = useRef<HTMLElement | null>(null);
  const trustSectionInView = useInView(trustSectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const journeySectionInView = useInView(journeySectionRef, {
    once: true,
    margin: "-25% 0px -25% 0px",
  });
  const pmSectionInView = useInView(pmSectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const impactSectionInView = useInView(impactSectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const precisionSectionInView = useInView(precisionSectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const impactHeadingPrefix = "Creating Real ";
  const impactHeadingHighlight = "Environmental Impact";
  const impactHeadingText = `${impactHeadingPrefix}${impactHeadingHighlight}`;
  const [impactTypedLength, setImpactTypedLength] = useState(0);

  useEffect(() => {
    const logoIntroTimer = window.setTimeout(() => {
      setShowLogoIntro(false);
    }, 1300);

    return () => window.clearTimeout(logoIntroTimer);
  }, []);

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const storyTimer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % customerStories.length);
    }, 4000);

    return () => window.clearInterval(storyTimer);
  }, []);

  useEffect(() => {
    const trustTimer = window.setInterval(() => {
      setActiveTrustImage((current) => (current + 1) % trustCarouselImages.length);
    }, 3000);

    return () => window.clearInterval(trustTimer);
  }, []);

  useEffect(() => {
    if (!impactSectionInView) return;

    setImpactTypedLength(0);

    const impactTimer = window.setInterval(() => {
      setImpactTypedLength((current) => {
        if (current >= impactHeadingText.length) {
          window.clearInterval(impactTimer);
          return current;
        }

        return current + 1;
      });
    }, 90);

    return () => window.clearInterval(impactTimer);
  }, [impactHeadingText.length, impactSectionInView]);

  useEffect(() => {
    const featureStrip = featuresRef.current;

    if (!featureStrip) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(featureStrip);

    return () => observer.disconnect();
  }, []);

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
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#431013]">
      {/* ================= HERO ================= */}
      <section
        className="home-hero-carousel relative min-h-170 sm:min-h-180 md:min-h-190 lg:min-h-190 overflow-hidden bg-[#9ca3a3] text-white"
      >
        {/* ================= BACKGROUND SLIDES ================= */}
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.title.replace(/\n/g, " ")}
            className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${activeHeroSlide === index
              ? "opacity-100"
              : "opacity-0"
              }`}
          />
        ))}

        {/* ================= OVERLAY ================= */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(20,31,35,0.34)_0%,rgba(18,25,20,0.18)_34%,rgba(7,14,10,0.68)_100%)]" />
        <div className="absolute inset-0 z-1 bg-black/10" />
        {/* ================= NAVBAR ================= */}
        <nav className="absolute -left-4 right-0 top-0 z-30 text-white">
          <div className="mx-auto flex h-25 md:h-29.5 max-w-7xl items-center justify-between px-6 sm:px-6 md:px-0">

            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="relative z-40 flex items-center"
            >
              <img
                src="/logo.png"
                alt="Shashwatt Energy"
                className="h-20 w-auto sm:h-16 md:h-20"
              />
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden items-center gap-8 text-[14px] font-semibold md:flex">

              <Link to="/" className="hover:text-white/80">
                Home
              </Link>

              <SolarSolutionsNav />

              <Link to="/ev-charging" className="hover:text-white/80">
                EV Charging
              </Link>

              <Link
                to="/pm-surya-ghar"
                className="hover:text-white/80"
              >
                PM Surya Ghar Yojana
              </Link>

              <Link to="/about" className="hover:text-white/80">
                About Us
              </Link>

              <Link to="/projects" className="hover:text-white/80">
                Projects
              </Link>

              <Link to="/faq" className="hover:text-white/80">
                FAQs
              </Link>

              <Link to="/blog" className="hover:text-white/80">
                Blogs
              </Link>

              <Link to="/calculator" className="hover:text-white/80">
                Calculator
              </Link>
            </div>

            {/* ================= CONTACT DESKTOP ================= */}
            <Link
              to="/contact"
              className="hidden rounded-[8px] bg-[#BA0013] px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-[#BA0013] md:block"
            >
              Contact Us
            </Link>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              className="relative z-40 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {menuOpen && (
            <div
              className="absolute left-4 right-4 top-20 z-40 rounded-lg bg-black/65 px-6 py-5 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-4 text-sm">

                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>

                <SolarSolutionsNav />

                <Link to="/ev-charging" className="hover:text-white/80">
                  EV Charging
                </Link>

                <Link
                  to="/pm-surya-ghar"
                  onClick={() => setMenuOpen(false)}
                >
                  PM Surya Ghar Yojana
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  to="/projects"
                  onClick={() => setMenuOpen(false)}
                >
                  Projects
                </Link>

                <Link
                  to="/faq"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>

                <Link
                  to="/blog"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>

                <Link
                  to="/calculator"
                  onClick={() => setMenuOpen(false)}
                >
                  Calculator
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* ================= HERO CONTENT ================= */}
        <div
          className="relative z-1 mx-auto flex min-h-170 sm:min-h-180 md:min-h-190 lg:min-h-190 max-w-7xl items-center px-8 sm:px-6 md:px-8 lg:px-0 pt-28 sm:pt-28 md:pt-32 lg:pt-20"
        >

          <div
            className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-40 min-h-100 sm:min-h-105 md:min-h-112.5 lg:min-h-97.5 max-w-full lg:max-w-210"
          >

            {heroSlides.map((slide, index) => (
              <div
                key={slide.title}
                className={`transition-all duration-700 ease-out ${activeHeroSlide === index
                  ? "relative translate-y-0 opacity-100"
                  : "pointer-events-none absolute translate-y-8 opacity-0"
                  }`}
              >

                {/* Heading */}
                <h1
                  className="whitespace-pre-line text-[38px] leading-[1.15] tracking-normal  text-white sm:text-[48px] sm:leading-[1.12] md:text-[54px] lg:text-[60px] font-bold"
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p
                  className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 max-w-full sm:max-w-162.5 md:max-w-180 lg:max-w-186.75 text-[18px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-normal lg:leading-[1.45]  text-white"
                >
                  {slide.desc}
                </p>

                {/* Buttons */}
                <div
                  className="mt-7 sm:mt-8 md:mt-9 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8"
                >

                  <Link
                    to={slide.primaryLink}
                    className="rounded-full bg-[#FFDAD8] px-5 py-2.5 sm:px-6 sm:py-3 text-[16px] sm:text-[15px] md:text-[16px] font-regular text-[#341010] transition hover:bg-white"
                  >
                    {slide.primaryLabel}
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="rounded-full border border-[#FFDAD8] px-5 py-2.5 sm:px-6 sm:py-3 text-[16px] sm:text-[15px] md:text-[16px] font-regular text-white transition hover:bg-[#FFDAD8] hover:text-[#341010]"
                  >
                    {slide.secondaryLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDER DOTS ================= */}
        <div
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveHeroSlide(index)}
              aria-label={`Show ${slide.title.replace(/\n/g, " ")}`}
              aria-current={
                activeHeroSlide === index
                  ? "true"
                  : undefined
              }
              className={`h-2.5 rounded-full transition-all duration-300 ${activeHeroSlide === index
                ? "w-0 bg-[#FFDAD8]"
                : "w-0 bg-white/65 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>

      <section ref={featuresRef} className="w-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <div className="max-w-360 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center justify-center overflow-hidden text-center h-40 px-8 lg:px-0
                ${index !== features.length - 1
                    ? "border-r border-gray-300"
                    : ""
                  }
                ${index < 2
                    ? "md:border-b-0 border-b border-gray-300"
                    : ""
                  }
              `}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`absolute top-9 h-12 w-12 object-contain transition-all duration-1400 ease-out ${featuresAnimated
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-6 scale-50 opacity-0"
                    }`}
                  style={{ transitionDelay: `${360 + index * 360}ms` }}
                />
                <h3
                  className={`text-[#222] text-[16px] md:text-[16px] font-regular transition-transform duration-1000 ease-out ${featuresAnimated ? "translate-y-8" : "translate-y-0"
                    }`}
                >
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Shadow */}
        <div className="h-8 bg-linear-to-b from-white to-transparent"></div>
      </section>

      {/* Solutions for Every Need */}
      <section className="bg-[#faf9f7] py-20 lg:py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-0">

          {/* Heading */}
          <div className="text-center mb-8">
            <p className="uppercase tracking-[5px] text-[#93000D] text-[16px] font-bold mb-5">
              Versatility
            </p>

            <h2 className="text-[34px] md:text-[40px] font-bold leading-tight text-[#1A1C1A] mb-4">
              Solutions for Every Need
            </h2>

            <p className="max-w-142.5 mx-auto text-[16px] lg:text-[16px] leading-6 text-[#5D3F3C]">
              Providing specialized solar infrastructure tailored for
              residential, commercial, and industrial segments across India.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {[0, 1, 2].map((column) => (
              <div key={column} className="flex flex-col gap-6">

                {solutions
                  .filter((_, index) => index % 3 === column)
                  .map((item) => {
                    const isHovered = hoveredCard === item.title;

                    return (
                      <div
                        key={item.title}
                        onMouseEnter={() => setHoveredCard(item.title)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`
                        flex flex-col rounded-lg
                        border border-[#dedbd7]
                        p-7
                        transition-all duration-300 ease-in-out
                        shadow-[0_18px_36px_rgba(39,31,25,0.08)]
                        ${isHovered
                            ? "bg-[#341010] shadow-[0_22px_44px_rgba(39,31,25,0.12)]"
                            : "bg-white"
                          }
                        ${item.image
                            ? "min-h-101"
                            : "min-h-56.5 justify-center"
                          }
                      `}
                      >

                        {/* Image */}
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="mb-8 h-48 w-full rounded-md object-cover"
                          />
                        )}

                        {/* Title */}
                        <h3
                          className={`mb-3 text-[24px] font-semibold leading-tight transition-colors duration-300
                          ${isHovered
                              ? "text-white"
                              : "text-[#1A1C1A]"
                            }
                        `}
                        >
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`max-w-67.5 text-[16px] lg:text-[16px] leading-[1.55] transition-colors duration-300
                          ${isHovered
                              ? "text-white"
                              : "text-[#5D3F3C]"
                            }
                        `}
                        >
                          {item.desc}
                        </p>

                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f7] py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-0">
          <div className="grid gap-10 border-b border-[#ead5cf] pb-12 text-center md:grid-cols-3 md:gap-0">
            <div className="md:border-r md:border-[#ead5cf]">
              <h3 className="mb-5 font-serif text-[40px] leading-none text-[#BA0013] md:text-[56px]">
                3,000+ kW
              </h3>
              <p className="text-[16px] font-semibold uppercase tracking-[2px] text-[#5D3F3C]">
                Solar Installation
              </p>
            </div>

            <div className="md:border-r md:border-[#ead5cf]">
              <h3 className="mb-5 font-serif text-[40px] leading-none text-[#1A1C1A] md:text-[56px]">
                4.2M+ kWh
              </h3>
              <p className="text-[16px] font-semibold uppercase tracking-[2px] text-[#5D3F3C]">
                Clean Energy Generated
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-serif text-[40px] leading-none text-[#BA0013] md:text-[56px]">
                50,000+
              </h3>
              <p className="text-[16px] font-semibold uppercase tracking-[2px] text-[#5D3F3C]">
                Trees Planted
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust ShashWatt?*/}
      <section
        ref={trustSectionRef}
        className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20"
      >
        {/* Background Animation */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 -top-32 bottom-0 z-0 hidden bg-[#341010] md:block"
          initial={{ x: "0%" }}
          animate={trustSectionInView ? { x: "-100%" } : { x: "0%" }}
          transition={{
            duration: 1.15,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        <div className="relative flex items-center">
          <div
            className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-8 sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-32 md:px-6 lg:px-0"
          >

            {/* ================= IMAGE SECTION ================= */}
            <div className="relative mx-auto w-full max-w-145 md:mx-0">

              {/* 30Y Warranty - Desktop Only */}
              <div
                className="absolute -left-23.75 top-0 z-10 hidden rounded-lg border border-[#E7BDB8BD]/74 bg-[#F4F3F1] px-10 py-7 text-center shadow-[0_18px_45px_rgba(39,31,25,0.18)] md:block"
              >
                <p className="text-[40px] font-bold leading-none text-[#BA0013]">
                  30Y
                </p>

                <p className="mt-5 whitespace-nowrap text-[16px] text-[#5D3F3C]">
                  Performance Warranty
                </p>
              </div>

              {/* Image */}
              <div
                className="relative h-65 w-full overflow-hidden rounded-xl shadow-[0_18px_35px_rgba(39,31,25,0.18)] sm:h-80 md:h-103.75 md:w-145 md:rounded-lg md:shadow-[0_24px_45px_rgba(39,31,25,0.22)] md:mt-16"
              >
                {trustCarouselImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt="Residential rooftop solar installation"
                    className={`
                      absolute inset-0 h-full w-full object-cover
                      transition-opacity duration-700
                      ${index === activeTrustImage
                        ? "opacity-100"
                        : "opacity-0"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* ================= CONTENT SECTION ================= */}
            <motion.div
              className="w-full max-w-125 md:max-w-125"
              initial={{ opacity: 0, x: 72 }}
              animate={
                trustSectionInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 72 }
              }
              transition={{
                delay: 0.85,
                duration: 0.75,
                ease: "easeOut",
              }}
            >
              {/* Small Heading */}
              <p
                className="mb-4 text-[16px] font-bold uppercase tracking-[4px] text-[#93000D] sm:text-[16px] sm:tracking-[5px] md:mb-6"
              >
                Reliability
              </p>

              {/* Main Heading */}
              <h2
                className="mb-8 text-[34px] font-bold leading-[1.2] text-[#1A1C1A] sm:text-[34px] md:mb-10 md:text-[40px]"
              >
                Why Trust{" "}
                <span className="text-[#BA0013]">
                  ShashWatt?
                </span>
              </h2>

              {/* Features */}
              <div className="space-y-7 sm:space-y-8 md:space-y-9">

                {/* Feature 1 */}
                <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#BA0013] text-white sm:h-12 sm:w-12"
                  >
                    <RotateCcw size={19} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="mb-1.5 text-[19px] font-semibold leading-tight text-[#1A1C1A] sm:text-[22px] md:mb-2 md:text-[24px]"
                    >
                      Proven Track Record
                    </h3>

                    <p
                      className="text-[16px] leading-[1.55] text-[#5D3F3C] sm:text-[15px] md:text-[16px]"
                    >
                      Over 3,000 kW installed across diverse terrains
                      and property types in India.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#BA0013] text-white sm:h-12 sm:w-12"
                  >
                    <Hd size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="mb-1.5 text-[19px] font-semibold leading-tight text-[#1A1C1A] sm:text-[22px] md:mb-2 md:text-[24px]"
                    >
                      Tier-1 Components
                    </h3>

                    <p
                      className="text-[16px] leading-[1.55] text-[#5D3F3C] sm:text-[15px] md:text-[16px]"
                    >
                      We partner with industry leaders such as Adani,
                      RenewSys, Enphase and Panasonic for maximum
                      efficiency.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#BA0013] text-white sm:h-12 sm:w-12"
                  >
                    <Settings size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="mb-1.5 text-[19px] font-semibold leading-tight text-[#1A1C1A] sm:text-[22px] md:mb-2 md:text-[24px]"
                    >
                      Precision Engineering
                    </h3>

                    <p
                      className="text-[16px] leading-[1.55] text-[#5D3F3C] sm:text-[15px] md:text-[16px]"
                    >
                      Custom structural designs tailored for maximum
                      solar harvesting based on your roof orientation.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seamless Installation Journey */}
      <section ref={journeySectionRef} className="bg-[#faf9f7] py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <h2 className="mb-20 text-center text-[34px] lg:text-[40px] font-bold leading-tight text-[#1A1C1A]">
            Seamless <span className="text-[#BA0013]">Installation Journey</span>
          </h2>

          <div className="relative">
            <div className="absolute left-28 right-28 top-12.5 hidden h-1 bg-[#E7BDB84D] md:block" />
            <motion.div
              aria-hidden="true"
              className="absolute left-28 right-28 top-12.5 hidden h-1 origin-left bg-[#BA0013] md:block"
              initial={{ scaleX: 0 }}
              animate={journeySectionInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 6.6, ease: "easeInOut" }}
            />

            <div className="relative grid gap-12 text-center md:grid-cols-4 md:gap-8">
              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-9 flex h-25 w-25 items-center justify-center rounded-full border-4 border-[#E7BDB8] bg-[#EFEEEB] text-[#BA0013]"
                  animate={journeySectionInView ? { borderColor: "#BA0013" } : { borderColor: "#E7BDB8" }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                >
                  <Crosshair size={32} />
                </motion.div>
                <h3 className="mb-3 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  Rooftop Survey
                </h3>
                <p className="max-w-57 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  Physical & satellite analysis for optimal plant design.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-9 flex h-25 w-25 items-center justify-center rounded-full border-4 border-[#E7BDB8] bg-[#EFEEEB] text-[#BA0013]"
                  animate={journeySectionInView ? { borderColor: "#BA0013" } : { borderColor: "#E7BDB8" }}
                  transition={{ delay: 0.85, duration: 0.45 }}
                >
                  <PenTool size={30} strokeWidth={2.5} />
                </motion.div>
                <h3 className="mb-3 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  Solar Plant Design
                </h3>
                <p className="max-w-60 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  Customized engineering blueprints for your site.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-9 flex h-25 w-25 items-center justify-center rounded-full border-4 border-[#E7BDB8] bg-[#EFEEEB] text-[#BA0013]"
                  animate={journeySectionInView ? { borderColor: "#BA0013" } : { borderColor: "#E7BDB8" }}
                  transition={{ delay: 1.6, duration: 0.45 }}
                >
                  <Wrench size={30} strokeWidth={2.5} />
                </motion.div>
                <h3 className="mb-3 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  Installation
                </h3>
                <p className="max-w-66 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  Expert end-to-end site execution and commissioning.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-9 flex h-25 w-25 items-center justify-center rounded-full border-4 border-[#E7BDB8] bg-[#EFEEEB] text-[#BA0013]"
                  animate={journeySectionInView ? { borderColor: "#BA0013" } : { borderColor: "#E7BDB8" }}
                  transition={{ delay: 2.35, duration: 0.45 }}
                >
                  <Settings size={30} strokeWidth={2.5} />
                </motion.div>
                <h3 className="mb-3 text-[24px] font-semibold leading-tight text-[#1A1C1A]">
                  Post-Installation Support
                </h3>
                <p className="max-w-66 text-[16px] leading-[1.45] text-[#5D3F3C]">
                  Reliable support for long-term performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PM Surya Ghar */}
      <section id="pm-surya-ghar" ref={pmSectionRef} className="relative overflow-hidden bg-[#faf9f7] py-16 lg:py-24">
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-20 bottom-28 z-0 bg-[#341010]"
          initial={{ x: "0%" }}
          animate={pmSectionInView ? { x: "100%" } : { x: "0%" }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-[1fr_1.12fr] lg:px-0">
          <div className="mb-28">
            <motion.div
              initial={{ opacity: 0, x: -72 }}
              animate={pmSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -72 }}
              transition={{ delay: 0.85, duration: 0.75, ease: "easeOut" }}
            >
              <p className="mb-6 text-[16px] font-bold uppercase tracking-[5px] text-[#93000D]">
                Subsidy
              </p>

              <h2 className="mb-8 text-[34px] font-bold leading-[1.28] text-[#3b0508] md:text-[40px]">
                <span className="text-[#93000D]">Empanelled with PM Surya Ghar:</span>
                <span className="text-[#410002]"> Muft Bijli Yojana</span>
              </h2>

              <p className="mb-8 max-w-180 text-[16px] lg:text-[18px] leading-[1.45] text-[#1A1C1A]">
                We handle paperwork, liaison, commissioning, subsidy applications, and loan applications.
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-6 text-[#410002]"
                initial={{ opacity: 0, x: -40 }}
                animate={pmSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: 1.15, duration: 0.55, ease: "easeOut" }}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-3 border-[#4a090b]">
                  <Check size={14} strokeWidth={3} />
                </span>
                <p className="text-[16px] leading-tight">
                  Direct Benefit Transfer to your account
                </p>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-[#410002]"
                initial={{ opacity: 0, x: -40 }}
                animate={pmSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: 1.35, duration: 0.55, ease: "easeOut" }}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-3 border-[#4a090b]">
                  <Check size={14} strokeWidth={3} />
                </span>
                <p className="text-[16px] leading-tight">
                  Authorized solar modules only
                </p>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-[#410002]"
                initial={{ opacity: 0, x: -40 }}
                animate={pmSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: 1.55, duration: 0.55, ease: "easeOut" }}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-3 border-[#4a090b]">
                  <Check size={14} strokeWidth={3} />
                </span>
                <p className="text-[16px] leading-tight">
                  End-to-end documentation assistance
                </p>
              </motion.div>
            </div>
          </div>

          <div className="relative pb-10 pr-0 md:pr-18">
            <img
              src="/yojana.webp"
              alt="Rooftop solar installation under PM Surya Ghar scheme"
              className="h-94 w-full rounded-xl object-cover shadow-[0_24px_50px_rgba(39,31,25,0.22)] -mt-28 lg:mt-0"
            />

            <div className="absolute bottom-0 right-0 rounded-2xl bg-[#BA0013] px-8 py-6 text-white shadow-[0_24px_45px_rgba(39,31,25,0.28)]">
              <p className="mb-2 text-[16px] leading-none">
                ₹78,000
              </p>
              <p className="text-[24px] font-semibold leading-none">
                Max Subsidy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creating Real Environmental Impact */}
      <section ref={impactSectionRef} className="relative isolate bg-[#faf9f7] py-16">
        <div className="mx-auto max-w-[1748px] px-0">
          <div className="mx-auto pt-5 text-center">
            <h2
              aria-label={impactHeadingText}
              className="relative z-10 mx-auto mb-10 min-h-22 px-8 text-[34px] font-bold leading-tight text-[#1A1C1A] md:min-h-12 md:text-[40px]"
            >
              {impactHeadingPrefix.slice(0, impactTypedLength)}
              <span className="text-[#93000D]">
                {impactHeadingHighlight.slice(
                  0,
                  Math.max(impactTypedLength - impactHeadingPrefix.length, 0),
                )}
              </span>
              {impactTypedLength < impactHeadingText.length && (
                <span className="ml-1 inline-block h-9 w-0.5 translate-y-1 bg-[#93000D] md:h-10" />
              )}
            </h2>
            <motion.p
              className="relative z-10 mx-auto max-w-170 px-6 text-[20px] font-normal leading-[1.45] text-[#1A1C1A] md:text-[18px]"
              initial={{ opacity: 0, x: -72 }}
              animate={
                impactTypedLength >= impactHeadingText.length
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -72 }
              }
              transition={{ duration: 1.05, ease: "easeOut" }}
            >
              ShashWatt has installed <span className="font-bold text-[#007100]">3,000+ kW </span> of solar capacity, generating an estimated
              <span className="font-bold text-[#007100]"> 4.2 million kWh</span> of clean energy annually and avoiding approximately
              <span className="font-bold text-[#007100]"> 3,000</span> tonnes of CO₂ emissions each year — equivalent to the carbon sequestration of around
              <span className="font-bold text-[#007100]"> 50,000</span> trees.
            </motion.p>

            <img
              src="/impact.webp"
              alt="Solar panels with wind turbines and greenery"
              className="relative z-0 block h-full w-full object-fill md:h-full md:-mt-40"
            />
          </div>
        </div>
      </section>

      {/* Built with Precision */}
      <section ref={precisionSectionRef} className="relative overflow-hidden bg-[#faf9f7] py-16 md:pb-0 md:pt-20 lg:pb-12 lg:pt-28 lg:-mt-28">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#341010]"
          initial={{ opacity: 1 }}
          animate={precisionSectionInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 2.35, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-0">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="mb-6 text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
                Built with Precision
              </h2>
              <p className="max-w-160 text-[16px] leading-[1.45] text-[#5D3F3C] md:text-[18px]">
                Our engineering team focuses on the details that ensure 25+ years <br />
                of trouble-free performance. From rust-resistant mounting to <br />
                UV-protected cabling, every component is selected for <br />
                the Indian
                climate.
              </p>
            </div>

            <div className="flex items-start justify-start gap-9 pt-3 text-center md:justify-end md:pt-18">
              <div>
                <p className="mb-2 text-[20px] lg:text-[16px] leading-none text-[#BA0013]">
                  30Y
                </p>
                <p className="text-[20px] lg:text-[16px] leading-tight text-[#5D3F3C]">
                  Warranty
                </p>
              </div>
              <div className="h-16 w-px bg-[#E7BDB866]" />
              <div>
                <p className="mb-2 text-[20px] lg:text-[16px] leading-none text-[#BA0013]">
                  10+
                </p>
                <p className="text-[20px] lg:text-[16px] leading-tight text-[#5D3F3C]">
                  Quality Checkpoints
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.img
              src="/precision1.jpg"
              alt="Solar cabling detail"
              className="h-67 w-full rounded-lg object-cover"
              initial={{ opacity: 0, x: "115%", y: 0, scale: 0.96 }}
              animate={precisionSectionInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: "115%", y: 0, scale: 0.96 }}
              transition={{ delay: 4.05, duration: 1.45, ease: "easeOut" }}
            />
            <motion.img
              src="/precision2.jpeg"
              alt="Solar inverter display"
              className="h-67 w-full rounded-lg object-cover"
              initial={{ opacity: 0, x: "calc(50% + 1rem)", y: 0, scale: 0.96 }}
              animate={precisionSectionInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: "calc(50% + 1rem)", y: 0, scale: 0.96 }}
              transition={{ delay: 2.45, duration: 1.35, ease: "easeOut" }}
            />
            <motion.img
              src="/precision3.jpg"
              alt="Rooftop solar panel installation"
              className="h-67 w-full rounded-lg object-cover"
              initial={{ opacity: 0, x: "-115%", y: 0, scale: 0.96 }}
              animate={precisionSectionInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: "-115%", y: 0, scale: 0.96 }}
              transition={{ delay: 3.35, duration: 1.45, ease: "easeOut" }}
            />
            <motion.img
              src="/precision4.jpg"
              alt="Solar mounting hardware"
              className="h-67 w-full rounded-lg object-cover"
              initial={{ opacity: 0, x: "-115%", y: 0, scale: 0.96 }}
              animate={precisionSectionInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: "-115%", y: 0, scale: 0.96 }}
              transition={{ delay: 4.7, duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="bg-white py-24">
        <style>{`
        @keyframes partners-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
        <div className="mx-auto max-w-8xl overflow-hidden px-8 lg:px-0">
          <h2 className="mb-20 text-center text-[34px] font-bold leading-tight text-[#1A1C1A]">
            Our Partners
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex w-max items-center gap-28"
              style={{ animation: "partners-marquee 18s linear infinite" }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex h-20 w-36 shrink-0 items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-30 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailored Solutions */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <div className="text-center">
            <h2 className="text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              Tailored Solutions for{" "}
              <span className="text-[#93000D]">Every Living Space</span>
            </h2>
            <p className="mx-auto mt-4 max-w-150 text-[16px] lg:text-[18px] leading-[1.45] text-[#5D3F3C]">
              From individual bungalows to sprawling housing societies, we have the
              expertise to provide solar solutions for any home configuration.
            </p>
          </div>

          <div className="relative mt-18">
            <div className="absolute left-4 right-4 top-0 hidden h-px bg-[#FAF9F6] md:block" />

            <div className="grid gap-10 md:grid-cols-5 md:gap-6">
              {livingSpaces.map(({ title, desc, image, Icon }) => (
                <div key={title} className="group relative pt-0">
                  <div className="absolute -top-10 -left-8 z-10 flex h-17.5 w-17.5 items-center justify-center rounded-full bg-[#BA00131A] text-[#BA0013]">
                    <Icon size={27} strokeWidth={2.5} />
                  </div>

                  <div className="relative flex min-h-65 overflow-hidden rounded-lg border border-[#E8E0DC] bg-[#FAF9F6] px-8 py-12 text-center shadow-sm transition duration-700 group-hover:-translate-y-2 group-hover:border-[#BA0013]/30 group-hover:bg-white group-hover:shadow-[0_18px_45px_rgba(186,0,19,0.14)]">
                    <div className="flex w-full flex-col items-center justify-center transition duration-700 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                      <h3 className="mb-6 whitespace-pre-line text-[24px] font-semibold leading-[1.18] text-[#1A1C1A]">
                        {title}
                      </h3>
                      <p className="max-w-52 text-[18px] lg:text-[16px] leading-[1.45] text-[#5D3F3C]">
                        {desc}
                      </p>
                    </div>

                    <div className="absolute inset-0 flex -translate-y-7 flex-col items-center justify-center px-5 opacity-0 transition duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <img
                        src={image}
                        alt={`${title.replace(/\n/g, " ")} solar solution`}
                        className="mb-5 h-30 w-full rounded-md object-cover shadow-[0_10px_24px_rgba(26,28,26,0.12)] transition duration-700 group-hover:scale-[1.03]"
                      />
                      <h3 className="whitespace-pre-line text-[20px] font-semibold leading-[1.18] text-[#BA0013]">
                        {title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-245 px-8">
          <h2 className="mb-16 text-center text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
            Frequently Asked{" "}
            <span className="text-[#BA0013]">Questions</span>
          </h2>

          <div className="space-y-5">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-lg border border-[#E8E0DC] bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className={`flex w-full items-center justify-between px-7 py-6 text-left text-[18px] lg:text-[16px] leading-tight transition ${isOpen
                      ? "bg-[#BA0013] font-medium text-white"
                      : "bg-white font-normal text-[#1A1C1A]"
                      }`}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-7 py-7">
                      <p className="max-w-212 text-[18px] lg:text-[16px] leading-[1.45] text-[#5D3F3C]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-15 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-md border border-[#BA0013] px-6 py-3 text-[16px] font-normal text-[#BA0013] transition hover:bg-[#BA0013] hover:text-white"
            >
              View All FAQs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Solar Insights */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#BA00131A] px-4 py-2 text-[16px] uppercase tracking-[2px] text-[#BA0013]">
              Insights
            </span>

            <h2 className="mt-6 text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              Solar Insights &{" "}
              <span className="text-[#BA0013]">Updates</span>
            </h2>

            <p className="mx-auto mt-4 max-w-150 text-[16px] leading-[1.45] text-[#5D3F3C]">
              Expert guidance on energy arbitrage, infrastructure readiness, and the future of solar
              technology.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-lg bg-white shadow-[0_22px_55px_rgba(39,31,25,0.10)] transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#3B0B0B] hover:shadow-[0_26px_60px_rgba(59,11,11,0.24)]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-49 w-full object-cover transition duration-700 ease-out group-hover:brightness-95"
                />

                <div className="px-12 py-12">
                  <p className="mb-6 text-[16px] uppercase leading-none text-[#BA0013] transition duration-700 group-hover:text-[#E7BDB8]">
                    {post.category}
                  </p>

                  <h3 className="mb-6 text-[24px] font-semibold leading-[1.18] text-[#1A1C1A] transition duration-700 group-hover:text-white">
                    {post.title}
                  </h3>

                  <p className="mb-10 text-[18px] lg:text-[16px] leading-[1.45] text-[#5D3F3C] transition duration-700 group-hover:text-[#F4E8E6]">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between gap-4 border-t border-transparent pt-0 transition-all duration-700 group-hover:border-[#E7BDB8]/30 group-hover:pt-5">
                    <p className="text-[16px] lg:text-[14px] font-semibold text-[#5D3F3C] transition duration-700 group-hover:text-white">
                      {post.date}
                    </p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[16px] text-[#BA0013] transition duration-700 group-hover:text-[#FF2D3F]"
                    >
                      Read Article
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-md border border-[#BA0013] px-9 py-4 text-[16px] font-normal text-[#BA0013] transition hover:bg-[#BA0013] hover:text-white"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-0">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#BA00131A] px-4 py-2 text-[16px] uppercase tracking-[2px] text-[#BA0013]">
              Customer Stories
            </span>

            <h2 className="mt-6 text-[34px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
              What Our{" "}
              <span className="text-[#BA0013]">Satisfied Customers</span> Say
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-225 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeStory * 100}%)` }}
            >
              {customerStories.map((story, index) => {
                const isRedCard = index % 2 === 1;

                return (
                  <div key={story.name} className="w-full shrink-0">
                    <div
                      className={`rounded-2xl px-10 py-18 text-center shadow-[0_24px_45px_rgba(39,31,25,0.18)] transition duration-500 ${isRedCard
                        ? "bg-[#93000D] text-white"
                        : "bg-white text-[#1A1C1A]"
                        }`}
                    >
                      <h3 className="text-[24px] font-bold leading-tight">
                        {story.name}
                      </h3>

                      <p
                        className={`mt-3 text-[16px] leading-tight ${isRedCard ? "text-[#F4E8E6]" : "text-[#5D3F3C]"
                          }`}
                      >
                        {story.system}
                      </p>

                      <p
                        className={`mx-auto mt-8 max-w-160 text-[18px] italic leading-[1.55] ${isRedCard ? "text-white" : "text-[#1A1C1A]"
                          }`}
                      >
                        "{story.quote}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {customerStories.map((story, index) => (
              <button
                key={story.name}
                type="button"
                onClick={() => setActiveStory(index)}
                aria-label={`Show ${story.name}`}
                aria-current={activeStory === index ? "true" : undefined}
                className={`h-2.5 w-2.5 rounded-full transition ${activeStory === index ? "bg-[#BA0013]" : "bg-[#E7BDB8]"
                  }`}
              />
            ))}
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
    </main>
  );
}
