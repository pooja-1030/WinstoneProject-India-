"use client";

import { useRouter, usePathname } from "next/navigation";

interface Props {
  categories: string[];
  activeCategory: string;
}

export default function ProjectFilter({ categories, activeCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const setCategory = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== "All") params.set("category", cat);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            activeCategory === cat
              ? "bg-gold text-dark shadow-[0_0_12px_rgba(201,164,92,0.3)]"
              : "bg-white text-dark/60 border border-dark/10 hover:border-gold hover:text-gold"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
