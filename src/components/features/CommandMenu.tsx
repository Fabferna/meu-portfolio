import { useEffect, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { projects, personalInfo } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-full text-xs text-zinc-500 font-mono shadow-lg cursor-pointer hover:bg-zinc-800 transition-colors" onClick={() => setOpen(true)}>
        <span>Command Menu</span>
        <kbd className="bg-zinc-800 px-1.5 rounded text-zinc-300 border border-zinc-700">Ctrl K</kbd>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center px-4 py-3 border-b border-zinc-800">
                <Search className="w-5 h-5 text-zinc-500 mr-3" />
                <input 
                  placeholder="O que você procura? (Projetos, Contato...)" 
                  className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-600 focus:ring-0"
                  autoFocus
                />
                <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
              </div>

              <div className="p-2 max-h-[60vh] overflow-y-auto">
                <div className="text-xs font-semibold text-zinc-500 px-2 py-1 mb-1 uppercase tracking-wider">Navegação</div>
                {['home', 'sobre', 'projetos', 'contato'].map((section) => (
                  <button 
                    key={section}
                    onClick={() => handleNav(section)}
                    className="w-full text-left flex items-center px-2 py-2 rounded-lg text-zinc-300 hover:bg-primary/10 hover:text-primary transition-colors group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Ir para {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}

                <div className="text-xs font-semibold text-zinc-500 px-2 py-1 mt-3 mb-1 uppercase tracking-wider">Projetos Recentes</div>
                {projects.map((p) => (
                  <a 
                    key={p.id}
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
                    {p.title}
                  </a>
                ))}
              </div>
              
              <div className="bg-zinc-950 px-4 py-2 text-xs text-zinc-600 border-t border-zinc-800 flex justify-between items-center">
                <span>{personalInfo.name} Portfolio</span>
                <div className="flex gap-2">
                    <span className="bg-zinc-800 px-1.5 rounded text-zinc-400">↑↓</span>
                    <span className="bg-zinc-800 px-1.5 rounded text-zinc-400">Enter</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}