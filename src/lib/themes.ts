import type { Theme } from "@/types";

export const THEMES: Record<"elegant" | "floral" | "minimal", Theme> = {
    elegant: {
        cardBg: "bg-white/5",
        border: "border-white/10",
        primary: "bg-white text-black hover:bg-white/90",
        text: "text-white",
        mutedText: "text-white/70",
        inputBg: "bg-white/10",
      },
    
  floral: {
    cardBg: "bg-white",
    border: "border-[#f0cfe2]",
    primary: "bg-[#1c0f18] text-white hover:bg-[#120a10]",
    text: "text-[#1c0f18]",
    mutedText: "text-[#6a4056]",
    inputBg: "bg-[#fff7fb]",
  },

  minimal: {
    cardBg: "bg-black/20",
    border: "border-white/10",
    primary: "bg-white text-black hover:bg-white/90",
    text: "text-white",
    mutedText: "text-white/60",
    inputBg: "bg-black/25",
  },
};

