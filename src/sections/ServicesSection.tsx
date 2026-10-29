import FadeIn from "../components/FadeIn";

const services: [string, string[]][] = [
  ["Hackathon Winner", ["Winner of ", "*five hackathons*", " across cybersecurity, AI, cloud, and technology, including ", "*1st Place at AzCON Future Tech*", " for Milli Cloud Security, ", "*1st Place at AI for Cyber*", ", and ", "*2nd Place at Metro Hackathon*", "."]],
  ["National Competition", ["Achieved ", "*4th Place in the Cybersecurity Republic CTF Challenge*", ", organized by AKTA, competing in practical cybersecurity and problem-solving challenges."]],
  ["Programming & ICPC", ["*3rd Place — University Programming Olympiad*", " and ", "*two-time ICPC participant*", ", competing in algorithmic problem solving under strict time constraints."]],
  ["Robotics & Engineering", ["Competitor in the ", "*World Robotics Championship (WRC)*", " and ", "*World Robot Olympiad (WRO)*", ", working with programming, embedded systems, engineering design, and robotics."]],
  ["Competitive Experience", ["Participated in ", "*10+ hackathons, programming competitions, cybersecurity events, and international bootcamps*", ", delivering technical solutions under real-world time and team constraints."]],
];

export default function ServicesSection() {
  return (
    <section
      id="awards"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(2.2rem, 9.5vw, 140px)" }}
      >
        Achievements
      </h2>
      <div className="mx-auto max-w-5xl">
        {services.map(([name, desc], i) => (
          <FadeIn
            key={name}
            delay={i * 0.1}
            className={`flex items-start gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12 ${i === services.length - 1 ? "border-b" : ""}`}
          >
            <span
              className="font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-3 pt-1 text-[#0C0C0C]">
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {name}
              </h3>
              <p className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                {desc.map((part, k) =>
                  part.startsWith("*") ? (
                    <strong key={k} className="font-semibold">{part.slice(1, -1)}</strong>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
