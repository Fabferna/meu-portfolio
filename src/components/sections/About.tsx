import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { journey, personalInfo } from '../../data/content';
import { easeInOut } from '../../lib/motion';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function About() {
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1]);

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="py-24 md:py-36">
      <div className="container">
        <SectionHeader
          id="sobre-title"
          index="03"
          eyebrow="Sobre"
          title={
            <>
              Código é o meio. <em className="font-serif font-normal italic">Experiência</em> é o produto.
            </>
          }
        />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <motion.div
            ref={photoRef}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line md:col-span-5"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0 round 16px)' }}
            whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0 round 16px)' }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.2, ease: easeInOut }}
          >
            <motion.img
              src="/assets/me.webp"
              alt={`Retrato de ${personalInfo.name}`}
              loading="lazy"
              decoding="async"
              style={{ scale }}
              className="h-full w-full object-cover object-[50%_25%] grayscale-[35%]"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-line bg-ink/70 px-4 py-2 text-xs backdrop-blur-md">
              <span>{personalInfo.name}</span>
              <span className="font-mono text-muted">{personalInfo.nickname}</span>
            </div>
          </motion.div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal className="space-y-6 text-xl leading-relaxed text-muted md:text-2xl md:leading-snug">
              <p>
                Sou <span className="text-ivory">desenvolvedor front-end e engenheiro de UI</span>. Meu trabalho é pegar uma ideia —
                às vezes ainda vaga — e transformá-la em uma interface que as pessoas entendem em segundos e têm vontade de usar.
              </p>
              <p>
                Não entrego só telas bonitas: entrego arquitetura escalável, performance medida e acessibilidade que inclui todo
                mundo.
              </p>
            </Reveal>

            <h3 className="eyebrow mb-6 mt-16">Trajetória</h3>
            <ol className="border-t border-line">
              {journey.map((item, i) => (
                <Reveal as="li" key={item.period} delay={i * 0.08} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr]">
                  <span className={cn('font-mono text-sm', item.current ? 'text-accent' : 'text-subtle')}>{item.period}</span>
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="mt-1 leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
