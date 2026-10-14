import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { personalInfo } from '../../data/content';
import { easeOut } from '../../lib/motion';
import { ButtonLink } from '../ui/Button';
import { SplitLine } from '../ui/Reveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Brilho que segue o cursor com mola — decorativo, então pode ter inércia.
  const mx = useMotionValue(70);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(40rem 40rem at ${sx}% ${sy}%, rgb(var(--accent) / 0.13), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  // Parallax suave ao sair da dobra.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(16px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-32 md:pt-40"
      data-testid="hero"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: glow }} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(var(--ivory)/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--ivory)/0.04)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />

      <div className="container flex flex-1 flex-col">
        <motion.div {...fadeUp(0.1)} className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 md:mb-14">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-raised/60 py-1.5 pl-3 pr-4 text-sm text-ivory backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Agenda aberta para novos projetos
          </span>
          <span className="eyebrow">{personalInfo.role}</span>
        </motion.div>

        <motion.h1 id="hero-title" style={{ y: headlineY, opacity: fade }} className="text-display font-medium">
          <SplitLine delay={0.15}>
            <span className="flex items-center gap-[0.18em]">
              Interfaces
              <motion.span
                aria-hidden
                className="relative inline-block h-[0.78em] w-[1.5em] overflow-hidden rounded-full border border-line align-middle"
                initial={reduce ? false : { clipPath: 'inset(0 50% 0 50% round 999px)' }}
                animate={{ clipPath: 'inset(0 0% 0 0% round 999px)' }}
                transition={{ duration: 1.2, delay: 0.7, ease: easeOut }}
              >
                <img src="/assets/me.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_28%]" />
              </motion.span>
            </span>
          </SplitLine>
          <SplitLine delay={0.25}>
            que <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">convertem.</em>
          </SplitLine>
          <SplitLine delay={0.35} className="text-muted">
            Código que <em className="font-serif font-normal italic tracking-[-0.02em] text-ivory">escala.</em>
          </SplitLine>
        </motion.h1>

        <div className="mt-auto grid gap-10 pt-14 md:grid-cols-12 md:items-end md:pt-20">
          <motion.p {...fadeUp(0.6)} className="max-w-md text-lg leading-relaxed text-muted md:col-span-5">
            Olá, sou o <span className="text-ivory">{personalInfo.name}</span>. {personalInfo.bio}
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center gap-3 md:col-span-4 md:col-start-6">
            <ButtonLink href="#trabalhos" magnetic icon={<ArrowDown size={18} aria-hidden />} data-testid="cta-projects">
              Ver trabalhos
            </ButtonLink>
            <ButtonLink href="#contato" variant="ghost" icon={<ArrowUpRight size={18} aria-hidden />}>
              Falar comigo
            </ButtonLink>
          </motion.div>

          <motion.dl {...fadeUp(0.8)} className="grid grid-cols-2 gap-6 text-sm md:col-span-3 md:grid-cols-1 md:gap-4 md:text-right">
            <div>
              <dt className="eyebrow">Especialidade</dt>
              <dd className="mt-1 text-ivory">React · TypeScript · Motion</dd>
            </div>
            <div>
              <dt className="eyebrow">Base</dt>
              <dd className="mt-1 text-ivory">{personalInfo.location}</dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
