import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, BedDouble, Maximize2, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProjectFilter from "./ProjectFilter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Winstone Projects' portfolio of premium villas, residential apartments, commercial spaces, and township developments across Bangalore.",
};

async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const projects = await getAllProjects();
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const activeCategory = searchParams.category || "All";

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <section className="bg-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('/professional-pattern-76L9dIPN.jpg')", backgroundSize: "400px" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-medium tracking-[0.3em] uppercase">Our Portfolio</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
            All <span className="text-gold">Projects</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Explore our complete portfolio of premium developments crafted across Bangalore&apos;s most sought-after locations.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            <div className="flex items-center gap-1.5 text-dark/50 text-sm shrink-0">
              <Filter size={14} />
              <span>Filter:</span>
            </div>
            <ProjectFilter categories={categories} activeCategory={activeCategory} />
          </div>

          {/* Count */}
          <p className="text-dark/50 text-sm mb-7">
            Showing <strong className="text-dark">{filtered.length}</strong> project{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-dark/40">
              No projects found in this category.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-xl overflow-hidden border border-dark/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, ${
                            ["#1a1a2e","#16213e","#0f3460","#533483","#1a1a2e","#0f3460"][i % 6]
                          } 0%, #C9A45C22 100%)`,
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                    <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-sm text-gold text-xs font-medium px-3 py-1.5 rounded tracking-wider uppercase border border-gold/20">
                      {project.category}
                    </div>
                    <div className={`absolute top-4 right-4 text-xs font-medium px-3 py-1.5 rounded tracking-wider uppercase ${
                      project.status === "Ongoing"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : project.status === "Upcoming"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-gold/20 text-gold border border-gold/30"
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-dark text-lg mb-2 leading-tight group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-dark/50 text-xs mb-3">
                      <MapPin size={11} />
                      <span>{project.location}</span>
                    </div>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-dark/50 pt-4 border-t border-dark/8">
                      {project.bedrooms && (
                        <span className="flex items-center gap-1">
                          <BedDouble size={12} /> {project.bedrooms} BHK
                        </span>
                      )}
                      {project.area && (
                        <span className="flex items-center gap-1">
                          <Maximize2 size={12} /> {project.area}
                        </span>
                      )}
                      {project.price && (
                        <span className="ml-auto font-semibold text-gold text-sm">
                          {project.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
