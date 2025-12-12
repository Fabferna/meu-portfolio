import { Code2, Layout, Smartphone, Server } from 'lucide-react';

export const personalInfo = {
  name: "Fabio Javarrotti",
  nickname: "FaFeJAVA",
  role: "Front-end Developer & UI Engineer",
  bio: "Transformo ideias complexas em interfaces pixel-perfect, acessíveis e de alta performance. Especialista em ecossistema React com background sólido em Node.js.",
  social: {
    github: "https://github.com/Fabferna",
    linkedin: "https://www.linkedin.com/in/fabio-javarrotti-372172120/",
    email: "seuemail@exemplo.com"
  }
};

export const skills = [
  { name: "React Ecosystem", icon: Code2, desc: "Next.js, Vite, Hooks, Context API" },
  { name: "UI/UX Engineering", icon: Layout, desc: "Tailwind, CSS Modules, Figma to Code, A11y" },
  { name: "Mobile First", icon: Smartphone, desc: "Responsive Design, Touch Interfaces" },
  { name: "Back-end Integration", icon: Server, desc: "Node.js, Express, REST APIs consumption" },
];

export const projects = [
  {
    id: 'antonio-henrique',
    title: 'Antônio Henrique - Visual & Motion',
    description: 'Portfólio minimalista e imersivo para um Designer de Motion. Foco total em mídia visual, tipografia ousada e performance de carregamento.',
    tags: ['HTML5', 'CSS3', 'Motion UI'],
    image: '/assets/antonio-henrique.png',
    demoUrl: 'https://fabferna.github.io/antonio-henrique/',
    repoUrl: null,
    featured: true
  },
  {
    id: 'nimbo',
    title: 'Nimbo — Agência Criativa',
    description: 'Landing page institucional com estética "Dark Mode" moderna, gradientes sutis e arquitetura pensada para conversão.',
    tags: ['React', 'Tailwind', 'Responsive'],
    image: '/assets/nimbo-cover.jpg',
    demoUrl: 'https://fabferna.github.io/nimbo-site/',
    repoUrl: null,
    featured: true
  },
  {
    id: 'rpg-online',
    title: 'Aethelgard RPG',
    description: 'Interface rica para um RPG textual de navegador. Sistema de abas complexo, gerenciamento de estado e lore imersiva.',
    tags: ['JavaScript Vanilla', 'CSS Grid', 'Game UI'],
    image: '/assets/rpg-online-screenshot.png',
    demoUrl: 'https://meu-rpg-online-html.vercel.app/',
    repoUrl: 'https://github.com/Fabferna/meu-rpg-online',
    featured: false
  }
];