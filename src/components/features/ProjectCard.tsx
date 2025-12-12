import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ProjectProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    demoUrl: string;
    repoUrl: string | null;
  }
}

export function ProjectCard({ project }: ProjectProps) {
  return (
    <article className="group relative bg-surface border border-zinc-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-800 hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-all"
          >
            <ExternalLink size={16} /> Ver Projeto
          </a>
          {project.repoUrl && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Ver código no GitHub"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}