import { AnimatePresence, motion as Motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";

export default function FaqCards({ id, title, description, isOpen, onToggle }) {
  return (
    <div
      className={`
        rounded-xl border transition-all duration-300
        ${isOpen
          ? "border-[#2596BE]/40 bg-[#0e1424] shadow-[0_0_20px_rgba(37,150,190,0.08)]"
          : "border-gray-700/30 bg-[#080c18] hover:border-gray-600/50 hover:bg-[#0b101f]"
        }
      `}
    >
      <h3>
        <button
          id={`faq-header-${id}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          className="
            w-full flex justify-between items-center gap-4
            text-white px-5 py-4 sm:px-6 sm:py-5
            cursor-pointer text-left
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18] focus-visible:rounded-xl
            rounded-xl
          "
        >
          <span
            className={`
              font-semibold tracking-wide transition-colors duration-200
              text-sm sm:text-base leading-snug
              ${isOpen ? "text-white" : "text-white/80"}
            `}
          >
            {title}
          </span>

          <Motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              shrink-0 text-lg transition-colors duration-200
              ${isOpen ? "text-[#2596BE]" : "text-[#2596BE]/50"}
            `}
          >
            <IoMdArrowDropdown />
          </Motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-header-${id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-[#2596BE]/10">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed tracking-wide">
                {description}
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
