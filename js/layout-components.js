// Inject shared layout templates and mark active nav item per page.
(function initLayoutComponents() {
  const root = document.body?.dataset?.root || './';
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

  Promise.all([
    loadTemplate(headerHost, `${root}partials/header.html`),
    loadTemplate(footerHost, `${root}partials/footer.html`),
  ]).then(() => {
    const page = document.body?.dataset?.page;
    if (!page) return;
    const active = document.querySelector(`.dropdown-menu a[data-page="${page}"]`);
    if (active) {
      active.setAttribute('aria-current', 'page');
      active.classList.add('active');
    }
  });
})();
