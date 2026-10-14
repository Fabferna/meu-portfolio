import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Command } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navItems, personalInfo } from '../../data/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import { easeDrawer, easeOut } from '../../lib/motion';
import { cn } from '../../lib/utils';

const sectionIds = navItems.map((n) => n.id);

export function Header({ onOpenCommand }: { onOpenCommand: () => void }) {
  const active = useActiveSection(sectionIds);
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4" data-testid="site-header">
        <div className="container">
          <div
            className={cn(
              'flex h-14 items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
              scrolled || menuOpen ? 'border-line bg-ink-raised/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
            )}
          >
            <a href="#inicio" className="group flex items-baseline gap-1.5 text-[0.95rem] font-medium tracking-tight">
              <span className="font-serif text-xl italic">Fabio</span>
              <span className="text-muted transition-colors duration-200 group-hover:text-ivory">Javarrotti</span>
              <span className="sr-only">— voltar ao início</span>
            </a>

            <nav aria-label="Principal" className="hidden md:block">
              <ul className="flex items-center gap-1 text-sm">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id} className="relative">
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-4 py-2 transition-colors duration-200',
                          isActive ? 'text-ivory' : 'text-muted hover:text-ivory',
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-ivory/[0.07]"
                            transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.15 }}
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenCommand}
                className="press hidden h-10 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors duration-200 hover:text-ivory lg:inline-flex"
                aria-label="Abrir menu de comandos (Ctrl + K)"
                aria-keyshortcuts="Control+K Meta+K"
              >
                <Command size={14} aria-hidden />K
              </button>
              <a
                href="#contato"
                className="press hidden h-10 items-center gap-1.5 rounded-full bg-ivory px-4 text-sm font-medium text-ink transition-colors duration-200 hover:bg-accent sm:inline-flex"
              >
                Iniciar projeto <ArrowUpRight size={16} aria-hidden />
              </a>
              <button
                ref={toggleRef}
                type="button"
                className="press relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                onClick={() => setMenuOpen((o) => !o)}
                data-testid="menu-toggle"
              >
                <span
                  className={cn(
                    'absolute h-px w-4 bg-ivory transition-transform duration-300 ease-out',
                    menuOpen ? 'rotate-45' : '-translate-y-[3px]',
                  )}
                />
                <span
                  className={cn(
                    'absolute h-px w-4 bg-ivory transition-transform duration-300 ease-out',
                    menuOpen ? '-rotate-45' : 'translate-y-[3px]',
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-10 pt-28 md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: easeDrawer }}
          >
            <nav aria-label="Menu móvel">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, transform: 'translateY(16px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: easeOut }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-4 text-4xl font-medium tracking-tight"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-2 text-muted">
              <p className="eyebrow">Fale comigo</p>
              <a href={`mailto:${personalInfo.social.email}`} className="block text-lg text-ivory underline-offset-4 hover:underline">
                {personalInfo.social.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
