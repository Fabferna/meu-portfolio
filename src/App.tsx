import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { ProjectCard } from './components/features/ProjectCard';
import { CommandMenu } from './components/features/CommandMenu';
import { personalInfo, projects, skills } from './data/content';

function App() {
  return (
    <div className="min-h-screen bg-background text-zinc-300 relative selection:bg-primary selection:text-white overflow-x-hidden">
      <CommandMenu />
      
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white tracking-tight hover:text-primary transition-colors">
            Fabio <span className="font-light text-zinc-400">Javarrotti</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#projetos" className="hover:text-primary transition-colors">Projetos</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </nav>
          <a 
            href={personalInfo.social.github} 
            target="_blank" 
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-zinc-700"
          >
            GitHub
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
            <div className="absolute top-20 right-0 -z-10 opacity-20 overflow-hidden pointer-events-none">
                <div className="w-[600px] h-[600px] bg-primary rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4"></div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 text-primary text-sm font-medium mb-6 border border-zinc-700/50 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Disponível para novos projetos
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                    Construindo o futuro da <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Web Experience</span>.
                    </h1>
                    
                    <p className="text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed">
                    Olá, sou o {personalInfo.name}. {personalInfo.bio}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#projetos" className="px-8 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-lg shadow-primary/25 text-center">
                            Ver Projetos
                        </a>
                        <a href="#contato" className="px-8 py-3.5 bg-zinc-800/50 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-all border border-zinc-700 text-center backdrop-blur-sm">
                            Entrar em contato
                        </a>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-[2rem] rotate-6 opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-500"></div>
                    <img 
                        src="/assets/me.png" 
                        alt={personalInfo.name}
                        className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] border-2 border-zinc-800 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                    />
                </div>
            </div>
          
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
                <ChevronDown />
            </div>
        </section>

        <section id="sobre" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Expertise Técnica</h2>
                <p className="text-zinc-400 mb-6">
                  Meu foco não é apenas escrever código, mas criar arquiteturas escaláveis e interfaces que os usuários amam usar.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                      <skill.icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold text-zinc-100 mb-1">{skill.name}</h3>
                      <p className="text-xs text-zinc-500">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Minha Jornada</h3>
                <div className="border-l-2 border-zinc-800 pl-6 space-y-10">
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background"></span>
                    <span className="text-sm text-primary font-mono mb-1 block">2025 - Atual</span>
                    <h4 className="text-white font-medium text-lg">Freelancer & Projetos Pessoais</h4>
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed">Desenvolvendo soluções completas como o Nimbo Agency e o RPG Aethelgard, focando em arquitetura escalável e UI imersiva.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-zinc-700 ring-4 ring-background"></span>
                    <span className="text-sm text-zinc-500 font-mono mb-1 block">2024</span>
                    <h4 className="text-zinc-300 font-medium text-lg">Estudos Intensivos & Especialização</h4>
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed">Mergulho profundo no ecossistema React, TypeScript e boas práticas de Engenharia de Software.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="py-20 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Projetos Selecionados</h2>
              <p className="text-zinc-400">Uma coleção de experimentos e aplicações reais.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="contato" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            
            <div className="container mx-auto px-6 text-center max-w-2xl relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Vamos trabalhar juntos?</h2>
                <p className="text-zinc-400 mb-10 text-lg">
                Estou sempre aberto a discutir desenvolvimento de produtos, oportunidades de trabalho ou parcerias tech.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    <a href={personalInfo.social.linkedin} target="_blank" className="group flex flex-col items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                        <Linkedin size={24} className="group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a href={personalInfo.social.github} target="_blank" className="group flex flex-col items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                        <Github size={24} className="group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a href={`mailto:${personalInfo.social.email}`} className="group flex flex-col items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                        <Mail size={24} className="group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-medium">E-mail</span>
                    </a>
                </div>

                <footer className="text-sm text-zinc-600">
                <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Desenvolvido com React + Tailwind.</p>
                </footer>
            </div>
        </section>
      </main>
    </div>
  );
}

export default App;