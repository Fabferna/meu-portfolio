import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { easeOut } from '../../lib/motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span';
};

/** Entrada sutil ao rolar: opacidade + leve deslocamento + desfoque, uma única vez. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateY(${y}px)`, filter: 'blur(6px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: easeOut }}
    >
      {children}
    </Comp>
  );
}

/** Revela o texto linha a linha, como uma cortina subindo. */
export function SplitLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={reduce ? { opacity: 0 } : { transform: 'translateY(105%)' }}
        animate={reduce ? { opacity: 1 } : { transform: 'translateY(0%)' }}
        transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}
