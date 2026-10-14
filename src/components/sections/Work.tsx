import { projects } from '../../data/content';
import { ProjectCase } from '../features/ProjectCase';
import { SectionHeader } from '../ui/SectionHeader';

export function Work() {
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-title" className="py-24 md:py-36">
      <div className="container">
        <SectionHeader
          id="trabalhos-title"
          index="01"
          eyebrow="Trabalhos selecionados"
          title={
            <>
              Projetos que unem <em className="font-serif font-normal italic">estética</em> e{' '}
              <em className="font-serif font-normal italic">resultado</em>.
            </>
          }
          aside="Uma seleção de produtos reais — do portfólio de um artista visual a uma aplicação de jogo completa no navegador."
        />

        <div className="space-y-24 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
