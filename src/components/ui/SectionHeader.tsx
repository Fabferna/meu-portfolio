import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = { index: string; eyebrow: string; title: ReactNode; aside?: ReactNode; id: string };

export function SectionHeader({ index, eyebrow, title, aside, id }: Props) {
  return (
    <div className="mb-14 grid gap-6 border-t border-line pt-6 md:mb-20 md:grid-cols-12 md:gap-8">
      <Reveal className="eyebrow flex gap-4 md:col-span-3">
        <span className="text-accent">{index}</span>
        <span>{eyebrow}</span>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 id={id} className="text-display-sm font-medium">
            {title}
          </h2>
        </Reveal>
        {aside && (
          <Reveal delay={0.12} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
