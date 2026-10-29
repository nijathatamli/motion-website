import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import LiveProjectButton from "../components/LiveProjectButton";

const img = (id: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${id}.png&w=1280&q=85`;

const projects = [
  { name: "Nextlevel Studio", category: "Client", images: ["/project-1a.jpg", "/project-1b.jpg", "/project-1.jpg"] },
  { name: "Aura Brand Identity", category: "Personal", images: ["/project-2a.jpg", "/project-2b.jpg", "/project-2.jpg"] },
  { name: "Solaris Digital", category: "Client", images: ["/project-3a.jpg", "/project-3b.jpg", "/project-3.jpg"] },
];

const focus: Record<string, string> = {
  "/project-1a.jpg": "50% 22%",
  "/project-1b.jpg": "50% 58%",
  "/project-1.jpg": "55% 30%",
  "/project-3.jpg": "31% 50%",
  "/project-2a.jpg": "50% 38%",
  "/project-2b.jpg": "50% 55%",
  "/project-3a.jpg": "50% 40%",
  "/project-3b.jpg": "50% 55%",
  "/project-3c.jpg": "50% 15%",
  "/project-2.jpg": "50% 85%",
};

const radius = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

function Card({ index, total, project, progress }: { index: number; total: number; project: (typeof projects)[number]; progress: MotionValue<number> }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.article
        className={`${radius} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
        style={{ scale, top: `${index * 28}px`, position: "relative", transformOrigin: "top center" }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="hero-heading font-black leading-none" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col text-[#D7E2EA]">
              <span className="font-light uppercase tracking-widest opacity-60" style={{ fontSize: "clamp(0.75rem, 1.2vw, 1rem)" }}>
                {project.category}
              </span>
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <img src={project.images[0]} alt="" loading="lazy" className={`${radius} w-full object-cover`} style={{ flex: "183 1 0px", minHeight: 0, objectPosition: focus[project.images[0]] }} />
            {project.images[1].startsWith("ig:") ? (
              <div
                className={`${radius} relative min-h-0 w-full overflow-hidden bg-black`}
                style={{ flex: "252 1 0px", containerType: "inline-size" }}
              >
                <iframe
                  src={`https://www.instagram.com/p/${project.images[1].slice(3)}/embed/`}
                  title="Instagram video"
                  loading="lazy"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  scrolling="no"
                  className="absolute left-1/2 top-1/2 border-0"
                  style={{ width: "max(100cqw, 326px)", height: "max(180cqw, 600px)", transform: "translate(-50%, -43%)" }}
                />
              </div>
            ) : (
              <img src={project.images[1]} alt="" loading="lazy" className={`${radius} w-full object-cover`} style={{ flex: "252 1 0px", minHeight: 0, objectPosition: focus[project.images[1]] }} />
            )}
          </div>
          <div className="w-[60%]">
            <img src={project.images[2]} alt={`${project.name} preview`} loading="lazy" className={`${radius} aspect-[1280/853] w-full object-cover`} style={{ objectPosition: focus[project.images[2]] }} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <h2
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </h2>
      <div ref={ref}>
        {projects.map((p, i) => (
          <Card key={p.name} index={i} total={projects.length} project={p} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
