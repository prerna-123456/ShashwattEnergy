import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface SolarSolutionsNavProps {
  active?: boolean;
  darkText?: boolean;
}

interface SolarSolutionsMobileLinksProps {
  onNavigate: () => void;
}

export function SolarSolutionsNav({
  active = false,
  darkText = false,
}: SolarSolutionsNavProps) {
  const idleClass = darkText
    ? "hover:text-black/80"
    : "hover:text-white/80";

  return (
    <div className="group relative py-4">
      {/* Solar Solutions Button */}
      <button
        type="button"
        className={`inline-flex items-center gap-1 transition ${
          active
            ? "border-b-2 border-[#BA0013] text-[#BA0013]"
            : idleClass
        }`}
      >
        Solar Solutions
        <ChevronDown size={14} strokeWidth={3} />
      </button>

      {/* Desktop Dropdown */}
      <div
        className="
          invisible
          absolute
          left-0
          top-full
          z-50
          min-w-50
          rounded-[8px]
          bg-white
          px-5
          py-4
          text-[#1C1C1C]
          opacity-0
          shadow-xl
          transition
          duration-200
          group-hover:visible
          group-hover:opacity-100
          group-focus-within:visible
          group-focus-within:opacity-100
        "
      >
        <Link
          to="/residential"
          className="
            block
            py-2
            text-[15px]
            font-medium
            text-[#1C1C1C]
            transition
            hover:text-[#BA0013]
          "
        >
          Residential
        </Link>

        <Link
          to="/commercial"
          className="
            block
            py-2
            text-[15px]
            font-medium
            text-[#1C1C1C]
            transition
            hover:text-[#BA0013]
          "
        >
          Commercial
        </Link>
      </div>
    </div>
  );
}

export function SolarSolutionsMobileLinks({
  onNavigate,
}: SolarSolutionsMobileLinksProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Mobile Solar Solutions Button */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1 text-left font-semibold text-white"
      >
        Solar Solutions

        <ChevronDown
          size={14}
          strokeWidth={3}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="mt-1 flex flex-col gap-2 rounded-[8px] bg-white px-4 py-3">
          <Link
            to="/residential"
            onClick={onNavigate}
            className="
              text-[14px]
              font-medium
              text-[#1C1C1C]
              transition
              hover:text-[#BA0013]
            "
          >
            Residential
          </Link>

          <Link
            to="/commercial"
            onClick={onNavigate}
            className="
              text-[14px]
              font-medium
              text-[#1C1C1C]
              transition
              hover:text-[#BA0013]
            "
          >
            Commercial
          </Link>
        </div>
      )}
    </div>
  );
}