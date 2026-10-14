import { MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { CommandMenu } from './components/features/CommandMenu';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';

function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
      >
        Pular para o conteúdo
      </a>

      <Header onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}

export default App;
