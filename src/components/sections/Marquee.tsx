import { stack } from '../../data/content';

/** Faixa contínua da stack. Movimento constante → easing linear; pausa no hover. */
export function Marquee() {
  const items = [...stack, ...stack];
  return (
    <section aria-label="Tecnologias que utilizo" className="group border-y border-line py-6 md:py-8">
      <ul className="sr-only">
        {stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div aria-hidden className="mask-fade-x flex overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 text-2xl tracking-tight text-muted md:px-10 md:text-4xl">
              {i % 3 === 1 ? <em className="font-serif italic text-ivory">{item}</em> : item}
              <span className="ml-12 inline-block h-1.5 w-1.5 rounded-full bg-accent md:ml-20" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
