/* Arquivo: assets/js/script.js (Atualizado: inclui Nimbo + carrossel condicional) */
/**
 * Interatividade do site: render de projetos, modal, carrossel (condicional) e menu mobile.
 * Acessível, modular e sem dependências externas.
 */

(() => {
  // Utils
  const qs  = (sel, el=document) => el.querySelector(sel);
  const qsa = (sel, el=document) => [...el.querySelectorAll(sel)];
  const on  = (el, ev, cb, opts) => el && el.addEventListener(ev, cb, opts);

  // Projetos (adicionei o Nimbo)
  const state = {
    projects: [
      {
        id: 'rpg-online',
        title: 'RPG Online (HTML/CSS/JS)',
        desc: 'Experimento web com UI responsiva e foco em performance.',
        cover: 'assets/images/rpg-online-screenshot.png',
        links: [
          { href: 'https://meu-rpg-online-html.vercel.app/', label: 'Ver ao vivo' },
          { href: 'https://github.com/seuusuario/meu-rpg-online', label: 'GitHub' },
        ]
      },
      {
        id: 'portfolio',
        title: 'Portfólio (este site)',
        desc: 'Tema dark, acessibilidade, carrossel e modal com focus trap.',
        cover: 'assets/images/background-abstract.jpg',
        links: [
          { href: '#', label: 'Case (em breve)' }
        ]
      },
      {
        id: 'nimbo-site',
        title: 'Nimbo — Agência (Landing)',
        desc: 'Landing institucional com UI moderna, gradientes escuros e layout responsivo.',
        cover: 'assets/images/nimbo-cover.jpg', // 👉 salve a imagem enviada com este nome e caminho
        links: [
          { href: 'https://fabferna.github.io/nimbo-site/', label: 'Ver ao vivo' }
          // Se tiver repositório no futuro, adicione aqui: { href: 'https://github.com/Fabferna/nimbo-site', label: 'GitHub' }
        ]
      },
      // Adicione mais projetos aqui conforme necessário
    ]
  };

  // Elementos
  const sidebar       = qs('[data-sidebar]');
  const menuBtn       = qs('[data-menu-button]');
  const projectsGrid  = qs('[data-projects-grid]');
  const carouselEl    = qs('.carousel');
  const track         = qs('[data-carousel-track]');

  // Modal
  const modal         = qs('[data-modal]');
  const modalDialog   = qs('[data-modal-dialog]');
  const modalBackdrop = qs('[data-modal-backdrop]');
  const modalClose    = qs('[data-modal-close]');
  const modalImg      = qs('[data-modal-image]');
  const modalTitle    = qs('[data-modal-title]');
  const modalDesc     = qs('[data-modal-desc]');
  const modalLinks    = qs('[data-modal-links]');

  // ---------- Render ----------

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = state.projects.map(p => `
      <article class="project-card" tabindex="0" data-project-id="${p.id}">
        <img src="${p.cover}" alt="Capa do projeto ${p.title}" class="project-cover" />
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-actions">
            <button class="btn" data-open-modal data-project-id="${p.id}">
              <i class="fa-regular fa-eye"></i> Detalhes
            </button>
            ${p.links?.[0] ? `<a class="link" href="${p.links[0].href}" target="_blank" rel="noopener">Abrir</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  }

  // Oculta o carrossel quando houver menos de 4 projetos
  function renderCarousel() {
    if (!carouselEl) return;

    if (state.projects.length < 4) {
      carouselEl.remove();
      return;
    }

    if (!track) return;
    track.innerHTML = state.projects.map(p => `
      <article class="carousel-item">
        <img src="${p.cover}" alt="Prévia do projeto ${p.title}" class="project-cover" />
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-actions">
            <button class="btn" data-open-modal data-project-id="${p.id}">
              <i class="fa-regular fa-eye"></i> Detalhes
            </button>
            ${p.links?.[0] ? `<a class="link" href="${p.links[0].href}" target="_blank" rel="noopener">Abrir</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  }

  // ---------- Modal ----------

  let lastFocused = null;

  function openModal(projectId) {
    const p = state.projects.find(x => x.id === projectId);
    if (!p) return;

    lastFocused = document.activeElement;

    modalImg.src = p.cover;
    modalImg.alt = `Imagem do projeto ${p.title}`;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalLinks.innerHTML = (p.links || []).map(l => `
      <a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>
    `).join('');

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => modalDialog.focus(), 0);
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  function handleModalClicks(e) {
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) {
      const id = openBtn.getAttribute('data-project-id');
      openModal(id);
    }
  }

  // Focus trap
  function trapFocus(e) {
    if (modal.getAttribute('aria-hidden') === 'true') return;
    if (e.key !== 'Tab') return;

    const focusables = qsa('a, button, input, textarea, [tabindex]:not([tabindex="-1"])', modalDialog)
      .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
    if (!focusables.length) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  // ---------- Carrossel ----------

  function setupCarouselControls() {
    const prev = qs('[data-carousel-prev]');
    const next = qs('[data-carousel-next]');
    const localTrack = qs('[data-carousel-track]');
    if (!prev || !next || !localTrack) return;

    on(prev, 'click', () => localTrack.scrollBy({ left: -localTrack.clientWidth * 0.8, behavior: 'smooth' }));
    on(next, 'click', () => localTrack.scrollBy({ left:  localTrack.clientWidth * 0.8, behavior: 'smooth' }));

    on(localTrack, 'keydown', (e) => {
      if (e.key === 'ArrowLeft')  localTrack.scrollBy({ left: -localTrack.clientWidth * 0.8, behavior: 'smooth' });
      if (e.key === 'ArrowRight') localTrack.scrollBy({ left:  localTrack.clientWidth * 0.8, behavior: 'smooth' });
    });
  }

  // ---------- Sidebar / Menu ----------

  function setupSidebar() {
    if (!sidebar || !menuBtn) return;

    menuBtn.setAttribute('aria-controls', 'sidebar');
    menuBtn.setAttribute('aria-expanded', 'false');

    const open  = () => { sidebar.classList.add('open');  menuBtn.setAttribute('aria-expanded', 'true'); };
    const close = () => { sidebar.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };
    const toggle = () => (sidebar.classList.contains('open') ? close() : open());

    on(menuBtn, 'click', toggle);

    on(document, 'click', (e) => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) close();
      }
    });

    on(document, 'keydown', (e) => { if (e.key === 'Escape') close(); });

    qsa('.menu-links a', sidebar).forEach(a => on(a, 'click', close));
  }

  // ---------- Active link ----------

  function highlightActiveLink() {
    const path = location.pathname.split('/').pop() || 'index.html';
    qsa('.menu-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  // ---------- Eventos globais ----------

  on(document, 'click', handleModalClicks);
  on(modalClose, 'click', closeModal);
  on(modalBackdrop, 'click', closeModal);
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
  on(modalDialog, 'keydown', trapFocus);

  // ---------- Init ----------
  function init() {
    renderProjects();
    renderCarousel();          // remove carrossel se < 4
    setupCarouselControls();   // só ativa se existir
    setupSidebar();
    highlightActiveLink();
  }
  document.readyState !== 'loading' ? init() : on(document, 'DOMContentLoaded', init);
})();
