// Inject shared layout templates and mark active nav item per page.
(function initLayoutComponents() {
  const root = document.body?.dataset?.root || './';
  const page = document.body?.dataset?.page || '';
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');

  if (!headerHost && !footerHost) return;

  const loadTemplate = async (target, templatePath) => {
    if (!target) return;
    try {
      const res = await fetch(templatePath);
      if (!res.ok) return;
      const html = (await res.text()).replaceAll('__ROOT__', root);
      target.innerHTML = html;
    } catch (_err) {
      // Silent fail keeps page content available even if templates cannot be loaded.
    }
  };

  const fallbackHeader = `
    <header>
      <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="${root}index.html">
            <img src="${root}IMG/titanmaq_navbar.png" alt="TitanMaq" loading="lazy">
          </a>
          <div class="navbar-nav ms-3">
            <a class="nav-link text-white" href="${root}index.html">Inicio</a>
            <a class="nav-link text-white" href="${root}views/servicios.html">Servicios</a>
            <a class="nav-link text-white" href="${root}views/contacto.html">Contacto</a>
          </div>
        </div>
      </nav>
    </header>
  `;

  const fallbackFooter = `
    <footer>
      <div class="footer-bottom">
        <p class="footer-text">© 2025 TitanMaq. Todos los derechos reservados.</p>
      </div>
    </footer>
  `;

  const loadChatbot = () => {
    if (window.initTitanChatbot) {
      window.initTitanChatbot(root);
      return;
    }

    const script = document.createElement('script');
    script.src = `${root}js/chatbot.js`;
    script.async = true;
    script.onload = () => {
      if (window.initTitanChatbot) {
        window.initTitanChatbot(root);
      }
    };
    document.body.appendChild(script);
  };

  Promise.all([
    loadTemplate(headerHost, `${root}partials/header.html`),
    loadTemplate(footerHost, `${root}partials/footer.html`),
  ]).then(() => {
    if (headerHost && !headerHost.innerHTML.trim()) {
      headerHost.innerHTML = fallbackHeader;
    }
    if (footerHost && !footerHost.innerHTML.trim()) {
      footerHost.innerHTML = fallbackFooter;
    }

    if (!page) return;
    const active = document.querySelector(`.dropdown-menu a[data-page="${page}"]`);
    if (active) {
      active.setAttribute('aria-current', 'page');
      active.classList.add('active');
    }

    loadChatbot();
  });
})();
