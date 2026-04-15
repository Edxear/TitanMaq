(function setupTitanChatbot() {
  function buildBotUI(rootPath) {
    const host = document.createElement('section');
    host.className = 'titan-chatbot';
    host.setAttribute('aria-label', 'Chat de ayuda TitanMaq');

    host.innerHTML = `
      <button class="titan-chatbot-toggle" type="button" aria-expanded="false">Chat TitanMaq</button>
      <div class="titan-chatbot-panel" hidden>
        <div class="titan-chatbot-header">Asistente TitanMaq</div>
        <div class="titan-chatbot-messages" aria-live="polite"></div>
        <form class="titan-chatbot-form" autocomplete="off">
          <input class="titan-chatbot-input" type="text" placeholder="Ej: horario, contacto, servicios" />
          <button class="titan-chatbot-send" type="submit">Enviar</button>
        </form>
      </div>
    `;

    const links = {
      inicio: `${rootPath}index.html`,
      servicios: `${rootPath}views/servicios.html`,
      contacto: `${rootPath}views/contacto.html`,
      productos: `${rootPath}views/productos.html`,
      piezas: `${rootPath}views/piezas.html`,
      industrias: `${rootPath}views/industrias.html`,
      capacitacion: `${rootPath}views/capacitacion.html`,
      tecnologia: `${rootPath}views/tecnologia.html`,
      distribuidor: `${rootPath}views/distribuidor.html`,
    };

    const button = host.querySelector('.titan-chatbot-toggle');
    const panel = host.querySelector('.titan-chatbot-panel');
    const messages = host.querySelector('.titan-chatbot-messages');
    const form = host.querySelector('.titan-chatbot-form');
    const input = host.querySelector('.titan-chatbot-input');

    const addMessage = (role, text) => {
      const div = document.createElement('div');
      div.className = `titan-chat-msg ${role}`;
      div.innerHTML = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    };

    const answers = (q) => {
      const text = q.toLowerCase();

      if (text.includes('horario') || text.includes('atencion')) {
        return 'Nuestro horario de atencion es <strong>Lun a Vie: 8:00 a 18:00</strong> y <strong>Sabados: 8:00 a 12:00</strong>.';
      }
      if (text.includes('contacto') || text.includes('telefono') || text.includes('mail')) {
        return `Puedes ir a <a href="${links.contacto}">Contacto</a> o llamar al +54 (3446) 000-000.`;
      }
      if (text.includes('servicio') || text.includes('soporte')) {
        return `En <a href="${links.servicios}">Servicios</a> tienes mantenimiento, soporte 24/7, monitoreo y repuestos.`;
      }
      if (text.includes('producto') || text.includes('camion') || text.includes('compactador')) {
        return `Puedes ver la linea en <a href="${links.productos}">Productos</a>.`;
      }
      if (text.includes('pieza') || text.includes('repuesto')) {
        return `Para repuestos y consulta de piezas, entra a <a href="${links.piezas}">Piezas</a>.`;
      }
      if (text.includes('industria') || text.includes('mineria') || text.includes('petroleo')) {
        return `Tenemos soluciones por sector en <a href="${links.industrias}">Industrias</a>.`;
      }
      if (text.includes('capacit')) {
        return `Programas para operadores y tecnicos en <a href="${links.capacitacion}">Capacitacion</a>.`;
      }
      if (text.includes('tecnolog') || text.includes('monitoreo')) {
        return `Revisa monitoreo de flota en <a href="${links.tecnologia}">Tecnologia</a>.`;
      }
      if (text.includes('distribuidor') || text.includes('sucursal')) {
        return `Te ayudamos a encontrar tu sucursal en <a href="${links.distribuidor}">Distribuidor</a>.`;
      }

      return `Puedo ayudarte con: horario, contacto, servicios, productos, piezas, industrias, capacitacion, tecnologia y distribuidor.`;
    };

    button.addEventListener('click', () => {
      const open = panel.hasAttribute('hidden');
      if (open) {
        panel.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        input.focus();
      } else {
        panel.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      addMessage('user', q);
      addMessage('bot', answers(q));
      input.value = '';
    });

    addMessage('bot', 'Hola, soy el asistente TitanMaq. Puedo guiarte por paginas, horarios y servicios.');
    return host;
  }

  window.initTitanChatbot = function initTitanChatbot(rootPath) {
    if (document.querySelector('.titan-chatbot')) return;
    document.body.appendChild(buildBotUI(rootPath || './'));
  };
})();
