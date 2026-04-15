(function setupTitanChatbot() {
  function buildBotUI(rootPath) {
    const host = document.createElement('section');
    host.className = 'titan-chatbot';
    host.setAttribute('aria-label', 'Chat de ayuda TitanMaq');

    host.innerHTML = `
      <button class="titan-chatbot-toggle" type="button" aria-expanded="false">Chat TitanMaq</button>
      <div class="titan-chatbot-panel" hidden>
        <div class="titan-chatbot-header">
          <span>Asistente TitanMaq</span>
          <span class="titan-chatbot-tone-badge">Modo comercial</span>
        </div>
        <div class="titan-chatbot-tools">
          <button class="titan-tone-btn active" type="button" data-tone="comercial">Comercial</button>
          <button class="titan-tone-btn" type="button" data-tone="tecnico">Tecnico</button>
        </div>
        <div class="titan-chatbot-quick" role="list">
          <button type="button" class="titan-quick-btn" data-query="Horario de atencion">Horario</button>
          <button type="button" class="titan-quick-btn" data-query="Como contacto con ustedes">Contacto</button>
          <button type="button" class="titan-quick-btn" data-query="Que servicios ofrecen">Servicios</button>
          <button type="button" class="titan-quick-btn" data-query="Necesito un distribuidor">Distribuidor</button>
          <button type="button" class="titan-quick-btn" data-query="Quiero ver capacitacion">Capacitacion</button>
        </div>
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
    const toneBadge = host.querySelector('.titan-chatbot-tone-badge');
    const toneButtons = host.querySelectorAll('.titan-tone-btn');
    const quickButtons = host.querySelectorAll('.titan-quick-btn');

    let tone = 'comercial';

    const addMessage = (role, text) => {
      const div = document.createElement('div');
      div.className = `titan-chat-msg ${role}`;
      div.innerHTML = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    };

    const setTone = (newTone) => {
      tone = newTone;
      toneBadge.textContent = tone === 'tecnico' ? 'Modo tecnico' : 'Modo comercial';
      toneButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.tone === tone);
      });
    };

    const intentAnswer = (intent) => {
      const replies = {
        horario: {
          comercial: 'Nuestro horario de atencion es <strong>Lun a Vie: 8:00 a 18:00</strong> y <strong>Sabados: 8:00 a 12:00</strong>. Si quieres, te guio al formulario para que te contacte un asesor hoy mismo.',
          tecnico: 'Horario operativo de soporte comercial: <strong>Lun-Vie 08:00-18:00</strong>; cobertura sabado: <strong>08:00-12:00</strong>. Fuera de franja, se recomienda registrar consulta en contacto para trazabilidad.',
        },
        contacto: {
          comercial: `Puedes ir a <a href="${links.contacto}">Contacto</a> o llamar al +54 (3446) 000-000. Te ayudamos con cotizacion y disponibilidad.`,
          tecnico: `Canal de entrada recomendado: <a href="${links.contacto}">formulario de Contacto</a>. Telefono operativo: +54 (3446) 000-000 para escalamiento rapido.`,
        },
        servicios: {
          comercial: `En <a href="${links.servicios}">Servicios</a> tienes mantenimiento, soporte 24/7, monitoreo y repuestos.`,
          tecnico: `La seccion <a href="${links.servicios}">Servicios</a> detalla mantenimiento preventivo/correctivo, monitoreo y soporte tecnico con foco en continuidad operativa.`,
        },
        productos: {
          comercial: `Puedes ver la linea completa en <a href="${links.productos}">Productos</a> y comparar modelos por aplicacion.`,
          tecnico: `En <a href="${links.productos}">Productos</a> puedes revisar especificaciones clave (motor, carga util, potencia, configuracion de trabajo).`,
        },
        piezas: {
          comercial: `Para repuestos y consulta de piezas, entra a <a href="${links.piezas}">Piezas</a>.`,
          tecnico: `Gestion de repuestos en <a href="${links.piezas}">Piezas</a> con trazabilidad por formulario y datos de identificacion de parte.`,
        },
        industrias: {
          comercial: `Tenemos soluciones por sector en <a href="${links.industrias}">Industrias</a>.`,
          tecnico: `La pagina <a href="${links.industrias}">Industrias</a> organiza aplicaciones por vertical (mineria, pavimentacion, energia y mas).`,
        },
        capacitacion: {
          comercial: `Programas para operadores y tecnicos en <a href="${links.capacitacion}">Capacitacion</a>.`,
          tecnico: `Los planes en <a href="${links.capacitacion}">Capacitacion</a> cubren operacion segura, diagnostico y mantenimiento con enfoque por rol.`,
        },
        tecnologia: {
          comercial: `Revisa monitoreo de flota en <a href="${links.tecnologia}">Tecnologia</a>.`,
          tecnico: `En <a href="${links.tecnologia}">Tecnologia</a> tienes monitoreo en tiempo real, alertas y soporte para mantenimiento predictivo.`,
        },
        distribuidor: {
          comercial: `Te ayudamos a encontrar tu sucursal en <a href="${links.distribuidor}">Distribuidor</a>.`,
          tecnico: `Puedes localizar cobertura comercial y tecnica por zona desde <a href="${links.distribuidor}">Distribuidor</a>.`,
        },
        fallback: {
          comercial: 'Puedo ayudarte con: horario, contacto, servicios, productos, piezas, industrias, capacitacion, tecnologia y distribuidor.',
          tecnico: 'Intenciones disponibles: horario, contacto, servicios, productos, piezas, industrias, capacitacion, tecnologia y distribuidor.',
        },
      };

      return replies[intent][tone];
    };

    const detectIntent = (text) => {
      if (text.includes('horario') || text.includes('atencion')) return 'horario';
      if (text.includes('contacto') || text.includes('telefono') || text.includes('mail')) return 'contacto';
      if (text.includes('servicio') || text.includes('soporte')) return 'servicios';
      if (text.includes('producto') || text.includes('camion') || text.includes('compactador')) return 'productos';
      if (text.includes('pieza') || text.includes('repuesto')) return 'piezas';
      if (text.includes('industria') || text.includes('mineria') || text.includes('petroleo')) return 'industrias';
      if (text.includes('capacit')) return 'capacitacion';
      if (text.includes('tecnolog') || text.includes('monitoreo')) return 'tecnologia';
      if (text.includes('distribuidor') || text.includes('sucursal')) return 'distribuidor';
      return 'fallback';
    };

    const answers = (q) => {
      const text = q.toLowerCase();

      if (text.includes('modo tecnico') || text.includes('tecnico')) {
        setTone('tecnico');
        return 'Listo, cambie a <strong>modo tecnico</strong>. Puedes preguntarme por servicios, piezas, tecnologia o soporte.';
      }
      if (text.includes('modo comercial') || text.includes('comercial')) {
        setTone('comercial');
        return 'Perfecto, ahora estoy en <strong>modo comercial</strong> para orientarte mejor en ventas y contacto.';
      }

      return intentAnswer(detectIntent(text));
    };

    toneButtons.forEach((toneBtn) => {
      toneBtn.addEventListener('click', () => {
        setTone(toneBtn.dataset.tone || 'comercial');
        addMessage('bot', tone === 'tecnico'
          ? 'Modo tecnico activado. Te doy respuestas mas precisas y orientadas a operacion.'
          : 'Modo comercial activado. Te ayudo con una orientacion mas directa de contacto y compra.');
      });
    });

    quickButtons.forEach((quickBtn) => {
      quickBtn.addEventListener('click', () => {
        const q = quickBtn.dataset.query || '';
        if (!q) return;
        addMessage('user', q);
        addMessage('bot', answers(q));
      });
    });

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

    addMessage('bot', 'Hola, soy el asistente TitanMaq. Puedes usar botones rapidos o cambiar entre modo comercial y tecnico.');
    return host;
  }

  window.initTitanChatbot = function initTitanChatbot(rootPath) {
    if (document.querySelector('.titan-chatbot')) return;
    document.body.appendChild(buildBotUI(rootPath || './'));
  };
})();
