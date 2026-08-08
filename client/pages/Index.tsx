import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Leaf,
  Menu,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const features = [
  "Customized Solar Design",
  "Professional Installation",
  "Quality Components",
  "End-to-End Support",
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
    title: "Housing Society",
    desc: "Transform your housing society with solar power for cost savings and a greener community.",
    image: null,
  },
  {
    title: "Commercial Complex",
    desc: "Make your commercial space energy-efficient with cost-saving solar solutions.",
    image: "/solution3.jpg",
  },
  {
    title: "Warehouse",
    desc: "Power your warehouse sustainably with solar energy, ensuring long-term savings.",
    image: null,
  },
];

function SolarIllustration() {
  return <div className="relative h-[250px] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#b5d7d0] via-[#89b5b1] to-[#456e72] shadow-[0_24px_60px_-25px_rgba(0,0,0,.6)] sm:h-[330px]">
    <div className="absolute -right-10 top-[-35px] h-44 w-44 rounded-full bg-[#f7cf72] blur-[1px]" />
    <div className="absolute bottom-[-30px] left-[-10%] h-44 w-[125%] rounded-[50%] bg-[#294a40]" />
    <div className="absolute bottom-4 left-[12%] h-24 w-52 -skew-y-12 rounded-lg border-4 border-[#d5e0dc] bg-[#26434a] shadow-2xl sm:left-[16%] sm:h-32 sm:w-72">
      <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-1 opacity-80">{Array.from({ length: 12 }).map((_, i) => <span key={i} className="border border-[#6e9aa0] bg-[#32606b]" />)}</div>
    </div>
    <div className="absolute bottom-10 right-[13%] h-16 w-28 -skew-y-12 rounded bg-[#375760] opacity-90 sm:h-20 sm:w-36" />
    <div className="absolute bottom-7 left-[10%] h-4 w-14 rounded-full bg-[#d9e9ce] opacity-80" />
    <div className="absolute bottom-2 right-[22%] h-5 w-24 rounded-full bg-[#d9e9ce] opacity-70" />
  </div>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  return <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#431013]">
    <nav className="absolute left-0 right-0 top-0 z-20 border-b border-white/20 bg-[#63191b]/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-10"><div className="text-lg font-bold tracking-tight">sunward<span className="text-[#f4b23c]">.</span></div><div className="hidden gap-8 text-sm text-white/75 md:flex"><Link to="#solutions" className="hover:text-white">Solutions</Link><Link to="#process" className="hover:text-white">How it works</Link><Link to="#stories" className="hover:text-white">Our impact</Link></div></div>
        <div className="hidden items-center gap-5 md:flex"><span className="text-sm text-white/70">(800) 555-SUN</span><Link to="#contact" className="rounded-full bg-[#f4b23c] px-5 py-2.5 text-sm font-bold text-[#431013] transition hover:bg-white">Get a quote <ArrowRight className="ml-1 inline" size={15} /></Link></div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <div className="border-t border-white/20 px-6 py-5 md:hidden"><div className="flex flex-col gap-4 text-sm"><Link to="#solutions" onClick={() => setMenuOpen(false)}>Solutions</Link><Link to="#process" onClick={() => setMenuOpen(false)}>How it works</Link><Link to="#contact" onClick={() => setMenuOpen(false)}>Get a quote</Link></div></div>}
    </nav>

    <section className="bg-[#63191b] pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.03fr_.97fr] lg:gap-20 lg:px-10">
        <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e89d71]/40 bg-[#7e2928] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-[#f3c8a2]"><Sparkles size={13} /> Powering better days</div><h1 className="max-w-xl text-5xl font-bold leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-[76px]">Your energy.<br /><span className="text-[#f4b23c]">Your choice.</span></h1><p className="mt-7 max-w-md text-base leading-7 text-white/70 sm:text-lg">Make your home brighter, your business stronger, and your future more sustainable with solar made simple.</p><div className="mt-9 flex flex-wrap items-center gap-4"><Link to="#contact" className="rounded-full bg-[#f4b23c] px-6 py-3.5 text-sm font-bold text-[#431013] transition hover:-translate-y-0.5 hover:bg-white">See your savings <ArrowRight className="ml-2 inline" size={16} /></Link><Link to="#solutions" className="text-sm font-semibold text-white/80 hover:text-white">Explore solutions <ChevronRight className="ml-1 inline" size={16} /></Link></div><div className="mt-12 flex gap-8 border-t border-white/15 pt-6"><div><p className="text-2xl font-bold text-[#f4b23c]">12k+</p><p className="mt-1 text-xs text-white/55">happy customers</p></div><div><p className="text-2xl font-bold text-[#f4b23c]">28M</p><p className="mt-1 text-xs text-white/55">kWh produced</p></div></div></div>
        <SolarIllustration />
      </div>
    </section>

    <section className="w-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-center h-32 px-6
                ${
                  index !== features.length - 1
                    ? "border-r border-gray-300"
                    : ""
                }
                ${
                  index < 2
                    ? "md:border-b-0 border-b border-gray-300"
                    : ""
                }
              `}
            >
              <h3 className="text-[#222] text-sm md:text-base font-medium">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Shadow */}
      <div className="h-8 bg-gradient-to-b from-gray-100/70 to-transparent"></div>
    </section>

    <section className="bg-[#faf9f7] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[6px] text-red-700 text-sm font-semibold mb-4">
            Versatility
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#222] mb-5">
            Solutions for Every Need
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 leading-8">
            Providing specialized solar infrastructure tailored for
            residential, commercial, and industrial segments across India.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {solutions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-xl mb-7"
                />
              )}

              <h3 className="text-3xl font-semibold text-[#222] mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>;
}
