import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SolarSolutionsMobileLinks, SolarSolutionsNav } from "../components/SolarSolutionsNav";
import {
  Sun,
  CloudRain,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
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

// About Us images are served from the public/abtusimg folder.
const heroImg = "/abtusimg/hero.png";
const legacyImg = "/abtusimg/legacy.png";
const advantageImg = "/abtusimg/advantage.jpg";
const project1 = "/abtusimg/project-1.png";
const project2 = "/abtusimg/project-2.png";
const project3 = "/abtusimg/project-3.png";
const project4 = "/abtusimg/project-4.png";
const project5 = "/abtusimg/project-5.png";
const project6 = "/abtusimg/project-6.png";
const teamAbhijit = "/abtusimg/team-abhijit.png";
const teamShashank = "/abtusimg/team-shashank.png";

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
    src: "/logo1.png",
    alt: "Partner logo 5",
  },
];

interface AdvantageCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  bg: string;
  borderTop?: boolean;
}

interface Partner {
  name: string;
  logo: string;
}

interface ProjectItem {
  img: string;
  title: string;
  subtitle: string;
  location: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
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

export default function AboutUs() {
  // Triggers the hero text entrance animation once on mount.
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const advantageCards: AdvantageCard[] = [
    {
      icon: Sun,
      title: "Outstanding Efficiency",
      desc: "Our modules deliver reliable power generation and consistent performance across varying weather and light conditions.",
      bg: "bg-[#f1f0ee]",
    },
    {
      icon: CloudRain,
      title: "Excellent Low Light Performance",
      desc: "Our modules are designed to deliver reliable power generation across varying weather and light conditions.",
      bg: "bg-white",
    },
    {
      icon: ClipboardList,
      title: "Easy Purchase",
      desc: "Enjoy a hassle-free solar panel purchase with easy steps, transparent pricing, and expert support.",
      bg: "bg-white",
      borderTop: true,
    },
    {
      icon: ShieldCheck,
      title: "Lifetime Support",
      desc: "Enjoy lifetime support with expert guidance to keep your solar system efficient and hassle-free.",
      bg: "bg-[#f1f0ee]",
      borderTop: true,
    },
  ];


  const team: TeamMember[] = [
    {
      name: "Abhijit Limaye",
      role: "Founder & Managing Partner",
      bio: "With over two decades of engineering expertise, Abhijit spearheads the technical innovation and strategic expansion of our solar portfolio.",
      img: teamAbhijit,
    },
    {
      name: "Shashank Revankar",
      role: "Managing Partner",
      bio: "Shashank leads our operations and customer success initiatives, ensuring every project meets our rigorous standards of precision and service.",
      img: teamShashank,
    },
  ];

  const projects: ProjectItem[] = [
    { img: project1, title: "Residential Rooftop", subtitle: "Residential Rooftop – 5 kW Solar Installation", location: "Hubballi, Karnataka" },
    { img: project2, title: "Residential Rooftop", subtitle: "Residential Rooftop – 3 kW Solar Installation", location: "Hubballi, Karnataka" },
    { img: project3, title: "Residential Rooftop", subtitle: "Residential Rooftop – 6 kW Solar Installation", location: "Hubballi, Karnataka" },
    { img: project4, title: "Industrial Complex", subtitle: "Industrial Complex – 100 kW Solar Farm", location: "Hubballi, Karnataka" },
    { img: project5, title: "Commercial Building", subtitle: "Commercial Building – 25 kW Rooftop System", location: "Hubballi, Karnataka" },
    { img: project6, title: "Commercial Building", subtitle: "Commercial Building – 50 kW Solar Array", location: "Hubballi, Karnataka" },
  ];

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
              <Link to="/about" className="border-b-2 border-[#BA0013] text-[#BA0013]">About Us</Link>
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
            alt="Aerial view of homes with solar panel roofs"
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
                About Us
              </span>
              <h1
                style={{ transitionDelay: heroIn ? "120ms" : "0ms" }}
                className={`mt-8 text-[42px] font-bold leading-[1.05] tracking-normal text-white transition-all duration-700 ease-out sm:text-[56px] lg:text-[56px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Powering Progress Through Clean Energy.
              </h1>
              <p
                style={{ transitionDelay: heroIn ? "240ms" : "0ms" }}
                className={`mt-7 max-w-140 text-[18px] font-medium leading-[1.55] text-white transition-all duration-700 ease-out md:text-[18px] ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                We are dedicated to revolutionizing the Indian solar landscape with high-performance
                industrial-grade technology for every home and business.
              </p>
            </div>
          </div>
        </section>

        {/* ============ OUR LEGACY ============ */}
        <section className="bg-[#faf9f7] py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 md:grid-cols-2 md:gap-14 md:px-0">
            <Reveal>
              <span className="block text-[14px] font-bold uppercase tracking-widest text-[#BA0013] mb-3">
                Our Legacy
              </span>
              <h2 className="text-[30px] font-bold leading-tight text-[#1A1C1A] mb-5 max-w-xl md:text-[40px]">
                Building a Greener Tomorrow, One Roof at a Time.
              </h2>
              <p className="mb-4 max-w-lg text-[18px] leading-[1.45] text-[#5D3F3C]">
                At ShashWatt Energy, we are dedicated to harnessing the infinite power of the sun to create
                sustainable, affordable, and innovative solar energy solutions. As a trusted partner in clean
                energy, we aim to revolutionize the way communities and businesses access renewable power,
                fostering a greener planet for future generations.
              </p>
              <p className="mb-4 max-w-lg text-[18px] leading-[1.45] text-[#5D3F3C]">
                To deliver cutting-edge solar energy solutions that empower individuals and organizations to
                transition to a sustainable energy future while reducing their carbon footprint.
              </p>
              <p className="mb-8 max-w-lg text-[18px] leading-[1.45] text-[#5D3F3C]">
                To become a global leader in renewable energy, driving positive change by making solar power
                accessible to all and creating a world powered by clean, limitless energy.
              </p>
              <div className="flex gap-14 border-t border-[#dfddda] pt-8">
                <div>
                  <div className="mb-1 text-[18px] font-bold text-[#1A1C1A]">3+ MW</div>
                  <div className="text-[16px] uppercase tracking-wider text-[#5D3F3C]">
                    Total Capacity Installed
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[18px] font-bold text-[#1A1C1A]">100%</div>
                  <div className="text-[16px] uppercase tracking-wider text-[#5D3F3C]">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150} className="relative">
              <img
                src={legacyImg}
                alt="Solar panels on a modern building roof"
                className="h-142.75 w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)]"
              />
              <div className="absolute -bottom-6 -right-4 w-56 rounded-[8px] bg-[#BA0013] p-6 text-white shadow-[0_16px_28px_rgba(186,0,19,0.22)] sm:-right-8">
                <span className="mb-3 block text-2xl font-extrabold">99</span>
                <p className="text-[24px] leading-snug">
                  Clean energy is an investment in tomorrow.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ ADVANTAGE ============ */}
        <section className="bg-[#faf9f7] pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto grid max-w-7xl gap-16 px-8 lg:grid-cols-[0.85fr_1.15fr] md:px-0">
            <Reveal>
              <h2 className="mb-4 text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
                The <span className="text-[#BA0013]">ShashWatt Energy</span> Advantage
              </h2>
              <p className="mb-8 max-w-112.5 text-[18px] leading-[1.45] text-[#5D3F3CCC]">
                Discover what sets ShashWatt Energy apart through high-performance technology, dependable
                service, and a customer-first approach.
              </p>
              <img
                src={advantageImg}
                alt="Solar consultation with clients"
                className="aspect-[4/3.3] w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)]"
              />
            </Reveal>

            <div className="grid overflow-hidden rounded-[8px] border border-[#dfddda] sm:grid-cols-2">
              {advantageCards.map(({ icon: Icon, title, desc, bg, borderTop }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div
                    className={
                      `h-full p-8 ${bg} ` +
                      (i % 2 === 0 ? "sm:border-r border-[#dfddda] " : "") +
                      (borderTop ? "border-t border-[#dfddda] " : "")
                    }
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FCE3E7] text-[#BA0013]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mb-2.5 text-[22px] font-medium text-[#1A1C1A]">
                      {title}
                    </h3>
                    <p className="text-[16px] text-[#5D3F3CB2]">{desc}</p>
                  </div>
                </Reveal>
              ))}
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
            <h2 className="mb-20 text-center text-[40px] font-bold leading-tight text-[#1A1C1A]">
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

        {/* ============ PROJECTS ============ */}
        <section className="bg-[#faf9f7] pb-16 md:pb-24 pt-16 md:pt-16">
          <div className="mx-auto max-w-7xl px-8 md:px-0">
            <Reveal className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="mb-3 block text-[14px] font-bold uppercase tracking-widest text-[#BA0013]">
                  Portfolio
                </span>
                <h2 className="mb-3 text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">Our Projects</h2>
                <p className="max-w-xl text-[20px] leading-relaxed text-[#5D3F3C]">
                  Every project reflects our commitment to quality, innovation, and sustainable energy. From
                  homes to commercial spaces, we deliver solar solutions built to perform for years.
                </p>
              </div>
              <Link to="/projects" className="flex items-center gap-2 whitespace-nowrap text-[16px] text-[#BA0013] transition hover:gap-3">
                View All Case Studies <ArrowRight size={16} />
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-55 sm:auto-rows-65 lg:auto-rows-70 gap-2 md:gap-3">
              {projects.map((p, i) => {
                const spanClasses = [
                  "col-span-2 lg:col-span-2", // wide tile (start of row 1)
                  "col-span-1",
                  "col-span-1",
                  "col-span-1",
                  "col-span-1",
                  "col-span-2 lg:col-span-2", // wide tile (end of row 2)
                ][i % 6];

                return (
                  <Reveal key={i} delay={(i % 6) * 80} className={spanClasses}>
                    <div className="group relative rounded-[8px] overflow-hidden h-full w-full">
                      <img
                        src={p.img}
                        alt={`${p.title} - ${p.subtitle}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="font-semibold text-[22px] leading-tight">{p.title}</div>
                        <div className="text-[18px] text-white">{p.subtitle}</div>
                        <div className="flex items-center gap-1.5 pt-2 text-xs text-white/90">
                          <MapPin size={13} className="shrink-0" />
                          {p.location}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ LEADERSHIP ============ */}
        {/* <section className="bg-[#f1f0ee] py-16 text-center md:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-0">
            <Reveal>
              <h2 className="mb-4 text-[30px] font-bold leading-tight text-[#1A1C1A] md:text-[40px]">
                Our <span className="text-[#BA0013]">Leadership Team</span>
              </h2>
              <p className="mx-auto mb-14 max-w-5xl text-[20px] leading-[1.45] text-[#5D3F3C]">
                Meet the passionate professionals driving ShashWatt&apos;s vision for a cleaner, more sustainable
                future. Together, we combine expertise, innovation, and dedication to deliver exceptional solar
                solutions.
              </p>
            </Reveal>

            <div className="grid gap-12 text-left sm:grid-cols-2">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 150}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="mb-6 aspect-[4/3.6] w-full rounded-[8px] object-cover shadow-[0_16px_28px_rgba(26,28,26,0.18)]"
                  />
                  <div className="mb-1 text-[16px] text-[#1A1C1A] font-sans">{member.name}</div>
                  <div className="mb-3 text-[16px] font-medium font-sans uppercase tracking-widest text-[#BA0013]">
                    {member.role}
                  </div>
                  <p className="max-w-md text-[14px] text-[#5D3F3C] font-sans">{member.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}

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
      </div>
    </main>
  );
}
