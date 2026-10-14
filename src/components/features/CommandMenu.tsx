import { ArrowUpRight, CornerDownLeft, Hash, Mail, Search } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { navItems, personalInfo, projects } from '../../data/content';
import { cn } from '../../lib/utils';

type Item = { id: string; group: string; label: string; hint?: string; icon: typeof Hash; run: () => void };

/**
 * Paleta de comandos (Ctrl/⌘ + K). Sem animação de abertura de propósito:
 * é uma ação de teclado, repetida muitas vezes — precisa parecer instantânea.
 */
export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActiveIndex(0);
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      restoreFocus.current?.focus?.();
    }
  }, [open]);

  const close = () => onOpenChange(false);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      close();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    return [
      ...navItems.map((n) => ({ id: `nav-${n.id}`, group: 'Navegação', label: n.label, icon: Hash, run: go(n.id) })),
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        group: 'Projetos',
        label: p.title,
        hint: p.category,
        icon: ArrowUpRight,
        run: () => {
          close();
          window.open(p.demoUrl, '_blank', 'noopener,noreferrer');
        },
      })),
      {
        id: 'email',
        group: 'Contato',
        label: 'Enviar e-mail',
        hint: personalInfo.social.email,
        icon: Mail,
        run: () => {
          close();
          window.location.href = `mailto:${personalInfo.social.email}`;
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.run();
    } else if (e.key === 'Tab') {
      // Mantém o foco dentro do diálogo.
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  if (!open) return null;

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-ink-sunken/70 backdrop-blur-sm" onClick={close} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de comandos"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-ink-raised shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)]"
        data-testid="command-menu"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={18} className="text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Buscar seções, projetos, contato…"
            className="h-14 flex-1 bg-transparent text-ivory outline-none placeholder:text-subtle focus-visible:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Buscar"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">Esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Resultados" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">Nada encontrado para “{query}”.</li>}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            const active = i === activeIndex;
            return (
              <li key={item.id} role="presentation">
                {showGroup && <div className="eyebrow px-3 pb-1.5 pt-3 text-[0.65rem]">{item.group}</div>}
                <div
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={active}
                  onPointerMove={() => setActiveIndex(i)}
                  onClick={item.run}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm',
                    active ? 'bg-ivory/[0.07] text-ivory' : 'text-muted',
                  )}
                >
                  <item.icon size={16} aria-hidden className={active ? 'text-accent' : ''} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="hidden truncate font-mono text-xs text-subtle sm:block">{item.hint}</span>}
                  {active && <CornerDownLeft size={14} aria-hidden className="text-subtle" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[0.7rem] text-subtle">
          <span>{personalInfo.name}</span>
          <span>↑↓ navegar · ↵ abrir</span>
        </div>
      </div>
    </div>
  );
}
