import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';
import type { Project } from '../../data/content';
import { easeInOut } from '../../lib/motion';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';

export function ProjectCase({ project, reversed }: { project: Project; reversed: boolean }) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  // Parallax leve da imagem dentro da moldura.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);

  // Cursor “Ver ao vivo” que segue o ponteiro com mola.
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 300, damping: 28, mass: 0.5 });
  const sy = useSpring(cy, { stiffness: 300, damping: 28, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
  };

  const headingId = `project-${project.id}-title`;

  return (
    <article aria-labelledby={headingId} className="grid items-center gap-8 md:grid-cols-12 md:gap-10" data-testid="project-card">
      <motion.a
        ref={frameRef}
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className={cn(
          'group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink-raised md:col-span-7 md:cursor-none',
          reversed && 'md:order-2 md:col-start-6',
        )}
        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(12% 8% 12% 8% round 24px)', opacity: 0.4 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.2, ease: easeInOut }}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]">
          <motion.img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ y: imgY }}
            className="absolute -top-[7%] left-0 h-[114%] w-full object-cover object-top"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        <motion.span
          className="pointer-events-none absolute left-0 top-0 hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink md:inline-flex"
          style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
          initial={false}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          Ver ao vivo <ArrowUpRight size={16} />
        </motion.span>
      </motion.a>

      <div className={cn('md:col-span-5', reversed ? 'md:order-1 md:col-start-1' : 'md:col-start-8 md:col-span-5')}>
        <Reveal className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{project.index}</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          <span>{project.category}</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h3 id={headingId} className="mt-5 text-4xl font-medium tracking-[-0.03em] md:text-5xl">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/title inline-flex items-start gap-2 decoration-accent decoration-2 underline-offset-[6px] hover:underline"
            >
              {project.title}
              <ArrowUpRight
                aria-hidden
                className="mt-1 size-6 shrink-0 text-muted transition-transform duration-300 ease-out group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-accent"
              />
              <span className="sr-only">(abre o projeto em nova aba)</span>
            </a>
          </h3>
        </Reveal>

        <Reveal delay={0.1} className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
          {project.description}
        </Reveal>

        <Reveal delay={0.15} className="mt-7 flex flex-wrap items-center gap-2">
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {tag}
              </li>
            ))}
          </ul>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press ml-1 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition-colors duration-200 hover:bg-ivory/[0.06] hover:text-ivory"
            >
              <Github size={14} aria-hidden /> Código-fonte
            </a>
          )}
        </Reveal>
      </div>
    </article>
  );
}
