const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const menuCopy = { en: ['Open menu', 'Close menu'], es: ['Abrir menú', 'Cerrar menú'] };
let currentLanguage = localStorage.getItem('little-castle-language') || 'en';

const translations = {
  en: {
    title: 'Little Castle | Restaurant & Bar in Fuengirola',
    description: 'Little Castle — a relaxed restaurant and bar in Fuengirola for good food, refreshing drinks and easy-going evenings.',
    navStory: 'Our story', navExperience: 'The experience', navGallery: 'A little preview', navVisit: 'Find us', navMaps: 'Open in Google Maps',
    heroEyebrow: 'RESTAURANT · BAR · FUENGIROLA', heroTitle: 'A little place<br>with a <em>big</em> heart.', heroLead: 'Drop in for good food, well-mixed drinks and the kind of easy-going evening you never want to rush.', planVisit: 'Plan your visit', directions: 'Get directions', scroll: 'SCROLL TO DISCOVER',
    assistantEyebrow: 'ASK LITTLE CASTLE', assistantTitle: 'Your little<br><em>castle guide.</em>', assistantText: 'Ask about visiting Little Castle, how to find us or what makes our restaurant and bar a lovely place to linger.', promptOne: 'Where is Little Castle?', promptTwo: 'How do I get directions?', promptThree: 'What is Little Castle like?', chatName: 'Little Castle guide', chatStatus: 'Here to help', chatWelcome: 'Hello! I can help you plan a visit to Little Castle in Fuengirola. What would you like to know?', chatLabel: 'Ask Little Castle a question', chatPlaceholder: 'Ask about Little Castle…', chatSend: 'Send <span aria-hidden="true">↑</span>', chatNote: 'For the latest practical details, we’ll point you to Google Maps.',
    welcome: 'WELCOME IN', storyTitle: 'For those<br>simple, <em>good</em> moments.', storyOne: 'Little Castle is a relaxed restaurant and bar made for long lunches, a refreshing drink after the beach and dinners shared with great company.', storyTwo: 'Come as you are, settle in and let the evening unfold at its own pace.', explore: 'Discover the atmosphere',
    awaits: 'THE LITTLE CASTLE FEEL', experienceTitle: 'A place for<br><em>every</em> occasion.', foodNo: '01 / THE TABLE', foodTitle: 'Good things on the table', foodText: 'A welcoming setting for an easy lunch, a shared meal or simply taking your time.', barNo: '02 / THE BAR', barTitle: 'Something worth raising a glass to', barText: 'Choose a favourite, get comfortable and let the evening find its own rhythm.', companyNo: '03 / THE COMPANY', companyTitle: 'Better around the same table', companyText: 'A casual catch-up, a family meal or a spontaneous night out — everyone is welcome.',
    galleryEyebrow: 'A LITTLE PREVIEW', galleryTitle: 'More of Little Castle,<br><em>coming soon.</em>', galleryText: 'We’re preparing a selection of approved venue photos to share here soon.', gallerySafeTitle: 'The best view is in person.', gallerySafeText: 'Until our photo collection is ready, visit Little Castle in Fuengirola and experience the atmosphere for yourself.', galleryMaps: 'Find us on Google Maps',
    quote: '“Good food, cold glasses<br>and room for more <em>moments.</em>”', visitUs: 'COME AND SEE US', visitTitle: 'Find<br><em>Little Castle.</em>', visitText: 'Little Castle is in Fuengirola, on the Costa del Sol. Open Google Maps for the most up-to-date address, opening hours, contact details and directions.', viewMaps: 'Open Google Maps', openMap: 'Open Google Maps', seeYou: 'SEE YOU SOON', closingTitle: 'Make room for<br>a <em>really</em> good evening.', findCastle: 'Find Little Castle', footerTagline: 'Restaurant & bar · Fuengirola'
  },
  es: {
    title: 'Little Castle | Restaurante y Bar en Fuengirola',
    description: 'Little Castle — un restaurante y bar relajado en Fuengirola para disfrutar de buena comida, bebidas y noches agradables.',
    navStory: 'Nuestra historia', navExperience: 'La experiencia', navGallery: 'Un adelanto', navVisit: 'Encuéntranos', navMaps: 'Abrir en Google Maps',
    heroEyebrow: 'RESTAURANTE · BAR · FUENGIROLA', heroTitle: 'Un lugar pequeño<br>con un corazón <em>enorme.</em>', heroLead: 'Ven a disfrutar de buena comida, bebidas bien preparadas y esas noches tranquilas que no apetece terminar.', planVisit: 'Planifica tu visita', directions: 'Cómo llegar', scroll: 'DESLIZA PARA DESCUBRIR',
    assistantEyebrow: 'PREGUNTA A LITTLE CASTLE', assistantTitle: 'Tu pequeña guía<br>del <em>castillo.</em>', assistantText: 'Pregunta sobre tu visita a Little Castle, cómo encontrarnos o qué hace de nuestro restaurante y bar un lugar para quedarse.', promptOne: '¿Dónde está Little Castle?', promptTwo: '¿Cómo puedo llegar?', promptThree: '¿Cómo es Little Castle?', chatName: 'Guía Little Castle', chatStatus: 'Aquí para ayudarte', chatWelcome: '¡Hola! Puedo ayudarte a planear tu visita a Little Castle en Fuengirola. ¿Qué te gustaría saber?', chatLabel: 'Haz una pregunta a Little Castle', chatPlaceholder: 'Pregunta sobre Little Castle…', chatSend: 'Enviar <span aria-hidden="true">↑</span>', chatNote: 'Para los detalles más recientes, te indicaremos Google Maps.',
    welcome: 'BIENVENIDO', storyTitle: 'Para esos momentos<br>sencillos y <em>bonitos.</em>', storyOne: 'Little Castle es un restaurante y bar relajado para almuerzos largos, una copa refrescante después de la playa y cenas compartidas con buena compañía.', storyTwo: 'Ven como eres, ponte cómodo y deja que la noche siga su propio ritmo.', explore: 'Descubre el ambiente',
    awaits: 'EL ESPÍRITU DE LITTLE CASTLE', experienceTitle: 'Un lugar para<br><em>cada</em> ocasión.', foodNo: '01 / LA MESA', foodTitle: 'Buenas cosas en la mesa', foodText: 'Un ambiente acogedor para un almuerzo tranquilo, una comida compartida o simplemente tomarte tu tiempo.', barNo: '02 / EL BAR', barTitle: 'Algo por lo que brindar', barText: 'Elige tu favorito, ponte cómodo y deja que la noche encuentre su propio ritmo.', companyNo: '03 / LA COMPAÑÍA', companyTitle: 'Mejor alrededor de la misma mesa', companyText: 'Una charla informal, una comida familiar o una salida espontánea: todos son bienvenidos.',
    galleryEyebrow: 'UN PEQUEÑO ADELANTO', galleryTitle: 'Más de Little Castle,<br><em>muy pronto.</em>', galleryText: 'Estamos preparando una selección de fotos aprobadas del local para compartirlas aquí pronto.', gallerySafeTitle: 'La mejor vista es en persona.', gallerySafeText: 'Mientras preparamos nuestra colección de fotos, visita Little Castle en Fuengirola y descubre el ambiente por ti mismo.', galleryMaps: 'Encuéntranos en Google Maps',
    quote: '“Buena comida, copas frías<br>y espacio para más <em>momentos.</em>”', visitUs: 'VEN A VERNOS', visitTitle: 'Encuentra<br><em>Little Castle.</em>', visitText: 'Little Castle está en Fuengirola, en la Costa del Sol. Abre Google Maps para consultar la dirección, el horario, los datos de contacto y cómo llegar actualizados.', viewMaps: 'Abrir Google Maps', openMap: 'Abrir Google Maps', seeYou: 'HASTA PRONTO', closingTitle: 'Haz espacio para<br>una noche <em>realmente</em> buena.', findCastle: 'Encuentra Little Castle', footerTagline: 'Restaurante y bar · Fuengirola'
  }
};

function setLanguage(language) {
  currentLanguage = language;
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').setAttribute('content', copy.description);
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = copy[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = copy[el.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = copy[el.dataset.i18nPlaceholder]; });
  document.querySelectorAll('.language-button').forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  toggle.setAttribute('aria-label', menuCopy[language][nav.classList.contains('open') ? 1 : 0]);
  localStorage.setItem('little-castle-language', language);
}

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', menuCopy[currentLanguage][open ? 1 : 0]);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', menuCopy[currentLanguage][0]);
}));
document.querySelectorAll('.language-button').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(currentLanguage);

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const mapUrl = 'https://maps.app.goo.gl/PcJz3t2NS6W2FnXJ7';
const escapeHtml = value => value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function castleReply(question) {
  const q = question.toLowerCase();
  const es = currentLanguage === 'es';
  if (/hello|hi\b|hola|buenas/.test(q)) return es ? '¡Hola! Estoy aquí para ayudarte a planear tu visita a Little Castle en Fuengirola.' : 'Hello! I’m here to help you plan a visit to Little Castle in Fuengirola.';
  if (/where|address|location|located|donde|dónde|direcci|ubic/.test(q)) return es ? `Little Castle está en Fuengirola, en la Costa del Sol. <a href="${mapUrl}" target="_blank" rel="noopener">Abre Google Maps para ver la ubicación exacta ↗</a>` : `Little Castle is in Fuengirola on the Costa del Sol. <a href="${mapUrl}" target="_blank" rel="noopener">Open Google Maps for the exact location ↗</a>`;
  if (/direction|route|get there|how.*get|cómo.*lleg|llegar|ruta|indicac/.test(q)) return es ? `La forma más sencilla de llegar es usar Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Cómo llegar a Little Castle ↗</a>` : `The easiest way to get here is with Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Get directions to Little Castle ↗</a>`;
  if (/hour|open|closing|time|horario|abre|cerr/.test(q)) return es ? `Consulta el horario más reciente en la ficha de Little Castle en Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Ver horario actualizado ↗</a>` : `Please check Little Castle’s Google Maps listing for the latest opening hours. <a href="${mapUrl}" target="_blank" rel="noopener">View current opening hours ↗</a>`;
  if (/contact|phone|call|email|teléfono|telefono|llamar|contact/.test(q)) return es ? `Los datos de contacto más recientes están en Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Ver datos de contacto ↗</a>` : `The latest contact details are listed on Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">View contact details ↗</a>`;
  if (/menu|food|eat|drink|bar|comida|comer|beber|carta|menú/.test(q)) return es ? 'Little Castle es un restaurante y bar para disfrutar de buena comida, bebidas bien preparadas y momentos relajados. Para consultar la oferta actual, contacta directamente con el local.' : 'Little Castle is a restaurant and bar for good food, well-mixed drinks and easy-going moments. For the current offering, please contact the venue directly.';
  if (/book|reservation|reserve|reserv|mesa/.test(q)) return es ? `Para reservas o disponibilidad, consulta los datos de contacto de Little Castle en Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Abrir datos de contacto ↗</a>` : `For reservations or availability, please use Little Castle’s contact details on Google Maps. <a href="${mapUrl}" target="_blank" rel="noopener">Open contact details ↗</a>`;
  return es ? 'Puedo ayudarte con Little Castle, su ubicación en Fuengirola, cómo llegar, horarios, datos de contacto y el ambiente del restaurante y bar. ¿Qué te gustaría saber?' : 'I can help with Little Castle, its Fuengirola location, directions, opening hours, contact details and restaurant and bar atmosphere. What would you like to know?';
}
function addMessage(content, type) {
  const message = document.createElement('div');
  message.className = `chat-message ${type}`;
  message.innerHTML = content;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function sendQuestion(question) {
  const text = question.trim();
  if (!text) return;
  addMessage(escapeHtml(text), 'user');
  chatInput.value = '';
  window.setTimeout(() => addMessage(castleReply(text), 'bot'), 320);
}
chatForm.addEventListener('submit', event => { event.preventDefault(); sendQuestion(chatInput.value); });
document.querySelectorAll('.assistant-prompt-list button').forEach(button => button.addEventListener('click', () => sendQuestion(translations[currentLanguage][button.dataset.promptKey])));
