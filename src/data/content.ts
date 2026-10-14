import { Code2, Layout, Smartphone, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const personalInfo = {
  name: 'Fabio Javarrotti',
  firstName: 'Fabio',
  nickname: 'FaFeJAVA',
  role: 'Front-end Developer & UI Engineer',
  location: 'Brasil · Remoto',
  bio: 'Transformo ideias complexas em interfaces pixel-perfect, acessíveis e de alta performance. Especialista no ecossistema React, com background sólido em Node.js.',
  social: {
    github: 'https://github.com/Fabferna',
    linkedin: 'https://www.linkedin.com/in/fabio-javarrotti-372172120/',
    // TODO: substitua pelo seu e-mail profissional
    email: 'seuemail@exemplo.com',
  },
};

export const navItems = [
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
] as const;

export type Skill = { name: string; icon: LucideIcon; desc: string; stack: string[] };

export const skills: Skill[] = [
  {
    name: 'Produtos em React',
    icon: Code2,
    desc: 'Aplicações rápidas e escaláveis, com arquitetura de componentes pensada para crescer junto com o seu negócio.',
    stack: ['React', 'Next.js', 'Vite', 'TypeScript'],
  },
  {
    name: 'UI Engineering',
    icon: Layout,
    desc: 'Do Figma ao código sem perder um pixel — design systems, microinterações e acessibilidade de verdade.',
    stack: ['Tailwind', 'Framer Motion', 'Figma', 'A11y'],
  },
  {
    name: 'Mobile First',
    icon: Smartphone,
    desc: 'Experiências que funcionam no polegar antes de funcionar no mouse. Responsivo do celular ao ultrawide.',
    stack: ['Responsive', 'Touch UI', 'PWA'],
  },
  {
    name: 'Integração Back-end',
    icon: Server,
    desc: 'Front-ends conectados a APIs reais, com estados de carregamento, erro e cache tratados com cuidado.',
    stack: ['Node.js', 'Express', 'REST'],
  },
];

export const stack = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js',
  'Vite', 'Figma', 'Acessibilidade', 'Design Systems', 'REST APIs', 'Playwright',
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  demoUrl: string;
  repoUrl: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'antonio-henrique',
    index: '01',
    title: 'Antônio Henrique',
    category: 'Portfólio · Visual & Motion',
    year: '2025',
    description:
      'Portfólio minimalista e imersivo para um designer de motion. Foco total em mídia visual, tipografia ousada e performance de carregamento.',
    tags: ['HTML5', 'CSS3', 'Motion UI'],
    image: '/assets/antonio-henrique.webp',
    imageAlt: 'Página inicial do portfólio Antônio Henrique com o título “Visual & Motion” e um carrossel de pôsteres.',
    demoUrl: 'https://fabferna.github.io/antonio-henrique/',
    repoUrl: null,
    featured: true,
  },
  {
    id: 'nimbo',
    index: '02',
    title: 'Nimbo',
    category: 'Landing page · Agência criativa',
    year: '2025',
    description:
      'Landing page institucional com estética dark moderna, gradientes sutis e arquitetura de conteúdo pensada para conversão.',
    tags: ['React', 'Tailwind', 'Responsive'],
    image: '/assets/nimbo-cover.webp',
    imageAlt: 'Landing page da agência criativa Nimbo em tema escuro.',
    demoUrl: 'https://fabferna.github.io/nimbo-site/',
    repoUrl: null,
    featured: true,
  },
  {
    id: 'rpg-online',
    index: '03',
    title: 'Aethelgard RPG',
    category: 'Web app · Game UI',
    year: '2025',
    description:
      'Interface rica para um RPG textual de navegador. Sistema de abas complexo, gerenciamento de estado e lore imersiva.',
    tags: ['JavaScript', 'CSS Grid', 'Game UI'],
    image: '/assets/rpg-online.webp',
    imageAlt: 'Tela do jogo Aethelgard RPG com painéis de personagem e navegação por abas.',
    demoUrl: 'https://meu-rpg-online-html.vercel.app/',
    repoUrl: 'https://github.com/Fabferna/meu-rpg-online',
    featured: false,
  },
];

export const journey = [
  {
    period: '2025 — Atual',
    title: 'Freelancer & Produtos Próprios',
    desc: 'Desenvolvendo soluções completas como a Nimbo e o RPG Aethelgard, com foco em arquitetura escalável e UI imersiva.',
    current: true,
  },
  {
    period: '2024',
    title: 'Especialização em Front-end',
    desc: 'Mergulho profundo no ecossistema React, TypeScript e boas práticas de engenharia de software.',
    current: false,
  },
];

export const process = [
  { step: '01', title: 'Descoberta', desc: 'Entendo o objetivo do negócio, o público e o que define sucesso para o projeto.' },
  { step: '02', title: 'Design & Protótipo', desc: 'Direção visual, hierarquia e fluxos validados antes de qualquer linha de código.' },
  { step: '03', title: 'Engenharia', desc: 'Código tipado, componentizado e testável — rápido hoje e fácil de manter amanhã.' },
  { step: '04', title: 'Lançamento', desc: 'Performance, SEO e acessibilidade revisados. Deploy e acompanhamento pós-entrega.' },
];
