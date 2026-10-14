import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { AnchorHTMLAttributes, PointerEvent, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'ghost';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  magnetic?: boolean;
  icon?: ReactNode;
};

const base =
  'group/btn press relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-ivory text-ink',
  ghost: 'border border-line text-ivory transition-colors duration-200 hover:border-ivory/30',
};

/**
 * Link com aparência de botão. A variante primária ganha um preenchimento de
 * acento que “sobe” no hover e, opcionalmente, atração magnética ao cursor.
 */
export function ButtonLink({ variant = 'primary', magnetic = false, icon, className, children, ...props }: ButtonLinkProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      <a {...props} onPointerMove={onMove} onPointerLeave={reset} className={cn(base, variants[variant], className)}>
        {variant === 'primary' && (
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover/btn:translate-y-0"
          />
        )}
        <span className="relative">{children}</span>
        {icon && (
          <span className="relative transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover/btn:-translate-y-0.5 [@media(hover:hover)]:group-hover/btn:translate-x-0.5">
            {icon}
          </span>
        )}
      </a>
    </motion.span>
  );
}
