import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/content';

function useLocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Footer() {
  const time = useLocalTime();
  return (
    <footer className="border-t border-line py-8" data-testid="site-footer">
      <div className="container flex flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
        <p className="font-mono text-xs">
          Horário de Brasília — <time>{time}</time>
        </p>
        <a href="#inicio" className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-ivory">
          Voltar ao topo
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-line transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            <ArrowUp size={14} aria-hidden />
          </span>
        </a>
      </div>
    </footer>
  );
}
