import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative">
      <span className="opacity-0">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = Array.from(text);
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {chars.map((c, i) => (
          <Char key={i} char={c} index={i} total={chars.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}
