import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/content';
import { ButtonLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const email = personalInfo.social.email;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const swap = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)', transform: 'translateY(6px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' },
    exit: reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)', transform: 'translateY(-6px)' },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden pb-12 pt-24 md:pt-40">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] [background:radial-gradient(60%_80%_at_50%_100%,rgb(var(--accent)/0.16),transparent_70%)]"
      />
      <div className="container">
        <Reveal className="eyebrow mb-8 flex gap-4 border-t border-line pt-6">
          <span className="text-accent">04</span>
          <span>Contato</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 id="contato-title" className="max-w-[14ch] text-display font-medium">
            Vamos criar algo <em className="font-serif font-normal italic text-accent">memorável?</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:items-end">
          <Reveal delay={0.1} className="md:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Tem um produto, uma landing page ou um redesign em mente? Me conte sobre o projeto e vamos desenhar juntos o
              próximo passo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${email}`} magnetic icon={<ArrowUpRight size={18} aria-hidden />} data-testid="cta-email">
                Enviar e-mail
              </ButtonLink>
              <button
                type="button"
                onClick={copy}
                className="press inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-[0.95rem] text-ivory transition-colors duration-200 hover:border-ivory/30"
                data-testid="copy-email"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {copied ? (
                    <motion.span key="ok" {...swap} className="inline-flex items-center gap-2">
                      <Check size={16} className="text-emerald-400" aria-hidden /> Copiado!
                    </motion.span>
                  ) : (
                    <motion.span key="copy" {...swap} className="inline-flex items-center gap-2">
                      <Copy size={16} aria-hidden /> Copiar e-mail
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? 'E-mail copiado para a área de transferência' : ''}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <ul className="divide-y divide-line border-y border-line">
              {[
                { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: Linkedin },
                { label: 'GitHub', href: personalInfo.social.github, icon: Github },
              ].map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 text-2xl tracking-tight transition-colors duration-200 hover:text-accent"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={22} strokeWidth={1.5} aria-hidden className="text-muted transition-colors duration-200 group-hover:text-accent" />
                      {label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="text-muted transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
