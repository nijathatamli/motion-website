import { useEffect, useRef, useState } from "react";

const gifs = [
  "hero-space-voyage-preview-eECLH3Yc", "hero-codenest-preview-Cgppc2qV", "hero-vex-ventures-preview-BczMFIiw",
  "hero-stellar-ai-v2-preview-DjvxjG3C", "hero-asme-preview-B_nGDnTP", "hero-transform-data-preview-Cx5OU29N",
  "hero-vitara-preview-Cjz2QYyU", "hero-terra-preview-BFjrCr7T", "hero-skyelite-preview-DHaZIgUv",
  "hero-aethera-preview-DknSlcTa", "hero-designpro-preview-D8c5_een", "hero-stellar-ai-preview-D3HL6bw1",
  "hero-xportfolio-preview-D4A8maiC", "hero-orbit-web3-preview-BXt4OttD", "hero-nexora-preview-cx5HmUgo",
  "hero-evr-ventures-preview-DZxeVFEX", "hero-planet-orbit-preview-DWAP8Z1P", "hero-new-era-preview-CocuDUm9",
  "hero-wealth-preview-B70idl_u", "hero-luminex-preview-CxOP7ce6", "hero-celestia-preview-0yO3jXO8",
].map((n) => `https://motionsites.ai/assets/${n}.gif`);

const row1 = gifs.slice(0, 11);
const row2 = gifs.slice(11);

function Row({ images, transform }: { images: string[]; transform: string }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div className="flex gap-3" style={{ transform, willChange: "transform" }}>
      {tripled.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] max-w-none flex-shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: "clip" }}
      aria-hidden="true"
    >
      <Row images={row1} transform={`translateX(${offset - 200}px)`} />
      <Row images={row2} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  );
}
