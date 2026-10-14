import type { PointerEvent } from 'react';
import { process, skills } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

/** Atualiza a posição do holofote diretamente no elemento (sem re-render). */
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-ink-sunken py-24 md:py-36">
      <div className="container">
        <SectionHeader
          id="servicos-title"
          index="02"
          eyebrow="Serviços"
          title={
            <>
              Do conceito ao deploy, <em className="font-serif font-normal italic text-muted">sem atalhos.</em>
            </>
          }
          aside="Cuido da camada que o seu cliente vê e sente — com a mesma atenção para o que ele nunca vê: performance, acessibilidade e código sustentável."
        />

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skills.map((skill, i) => (
            <Reveal as="li" key={skill.name} delay={i * 0.06} className="h-full">
              <article
                onPointerMove={trackSpotlight}
                className="group relative flex h-full flex-col bg-ink-sunken p-8 md:p-10"
                data-testid="service-card"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(22rem_circle_at_var(--x)_var(--y),rgb(var(--accent)/0.09),transparent_70%)] [@media(hover:hover)]:group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between">
                  <skill.icon aria-hidden className="size-7 text-accent" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="relative mt-14 text-2xl font-medium tracking-tight md:text-3xl">{skill.name}</h3>
                <p className="relative mt-3 max-w-sm leading-relaxed text-muted">{skill.desc}</p>
                <ul className="relative mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-subtle" aria-label="Ferramentas">
                  {skill.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="eyebrow mb-10">Como trabalho</h3>
          </Reveal>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.08} className="border-t border-line pt-6">
                <span className="font-serif text-5xl italic text-accent">{p.step}</span>
                <h4 className="mt-4 text-xl font-medium tracking-tight">{p.title}</h4>
                <p className="mt-2 leading-relaxed text-muted">{p.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
