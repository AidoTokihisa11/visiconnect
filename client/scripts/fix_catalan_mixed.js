// Fix mixed Spanish/Catalan strings in ca.json — replace common Spanish words with proper Catalan
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'i18n', 'ca.json');
let content = fs.readFileSync(file, 'utf8');

// Word/phrase-level Spanish → Catalan replacements
// Order matters: longer phrases first to avoid partial-match issues
const replacements = [
  // Phrases entières (visibles dans les screenshots)
  ['"Comenzar Gratuït"', '"Comença gratis"'],
  ['"Comenzar gratuït"', '"Comença gratis"'],
  ['"Empezar gratuït"', '"Comença gratis"'],
  ['"Probar gratuït"', '"Prova gratis"'],
  ['"Benvingut de nuevo"', '"Benvingut de nou"'],
  ['"¡Benvingut a VisiConnect!"', '"Benvingut a VisiConnect!"'],
  ['"Benvingut a VisioConnect"', '"Benvingut a VisioConnect"'],
  ['"Inicie sesión para continuar"', '"Inicia sessió per continuar"'],
  ['"Inicia sesión para continuar"', '"Inicia sessió per continuar"'],
  ['"¿Olvidó su contrasenya?"', '"Has oblidat la contrasenya?"'],
  ['"¿Olvidaste tu contrasenya?"', '"Has oblidat la contrasenya?"'],
  ['"Contrasenya olvidada"', '"Contrasenya oblidada"'],
  ['"Iniciar sesión"', '"Inicia sessió"'],
  ['"O continuar con"', '"O continua amb"'],
  ['"O CONTINUAR CON"', '"O CONTINUA AMB"'],
  ['"¿No tienes una compte?"', '"No tens un compte?"'],
  ['"¿No tiene compte?"', '"No tens un compte?"'],
  ['"¿Ya tienes una compte?"', '"Ja tens un compte?"'],
  ['"Crear una compte"', '"Crear un compte"'],
  ['"Crear compte"', '"Crear un compte"'],
  ['"Accede a tu compte de VisiConnect"', '"Accedeix al teu compte de VisiConnect"'],
  ['"Únete a VisiConnect hoy"', "\"Uneix-te a VisiConnect avui\""],
  ['"Connectant..."', '"Connectant..."'],
  ['"Correu profesional"', '"Correu professional"'],
  ['"Confirmar contrasenya"', '"Confirma la contrasenya"'],
  ['"Acepto los {{terms}} y la {{privacy}}"', '"Accepto els {{terms}} i la {{privacy}}"'],
  ['"términos de servicio"', '"termes de servei"'],
  ['"política de privacidad"', '"política de privacitat"'],
  ['"Ingresa tu email para restablecer tu contrasenya"', '"Introdueix el teu correu per restablir la contrasenya"'],
  ['"Enviar enlace de restablecimiento"', "\"Enviar enllaç de restabliment\""],
  ['"Correu de restablecimiento enviado"', "\"Correu de restabliment enviat\""],
  ['"Por favor, inténtalo de nuevo"', '"Si us plau, torna-ho a provar"'],
  ['"Recordarme"', '"Recorda\'m"'],
  ['"Dirección de email"', '"Adreça de correu electrònic"'],

  // CTA / pages
  ['"¿Listo para transformar sus comunicaciones?"', '"A punt per transformar les vostres comunicacions?"'],
  ['"Únase a miles de equipos que confían en VisioConnect."', "\"Uneix-te a milers d'equips que confien en VisioConnect.\""],
  ['"¿Listo para empezar?"', '"A punt per començar?"'],
  ['"Únase a miles de equipos que ya usan VisioConnect para sus reunions."', "\"Uneix-te a milers d'equips que ja utilitzen VisioConnect per a les seves reunions.\""],
  ['"Empezar gratis"', '"Comença gratis"'],
  ['"Comenzar gratis"', '"Comença gratis"'],
  ['"Comenzar"', '"Comença"'],
  ['"Suscribirse"', '"Subscriure-s\'hi"'],
  ['"Solicitud de demo"', '"Sol·licitud de demo"'],
  ['"Suport técnico"', '"Suport tècnic"'],
  ['"Otro"', '"Altre"'],

  // Common UI
  ['"Éxito"', '"Èxit"'],
  ['"Atrás"', '"Enrere"'],
  ['"Cerrar"', '"Tancar"'],
  ['"Nombre"', '"Nom"'],
  ['"Dirección"', '"Adreça"'],
  ['"Ciudad"', '"Ciutat"'],

  // Navigation
  ['"Acerca de"', '"Sobre"'],
  ['"Documentación"', '"Documentació"'],
  ['"Comunidad"', '"Comunitat"'],
  ['"Carreras"', '"Carreres"'],
  ['"Privacidad"', '"Privacitat"'],
  ['"Termes de servicio"', '"Termes de servei"'],
  ['"Desarrolladores"', '"Desenvolupadors"'],
  ['"Guía de usuario"', "\"Guia d'usuari\""],
  ['"Integraciones"', '"Integracions"'],

  // Hero / general copy (frequent)
  ['"Videoconferencia de nueva generación"', '"Videoconferència de nova generació"'],
  ['"Videoconferencia"', '"Videoconferència"'],
  ['"de nueva generación."', '"de nova generació."'],
  ['"de nueva generación"', '"de nova generació"'],
  ['"Calidad HD, inicio instantáneo, seguretat integrada. Únete a tu equipo con un clic, desde cualquier dispositivo."',
    "\"Qualitat HD, inici instantani, seguretat integrada. Uneix-te al teu equip amb un clic, des de qualsevol dispositiu.\""],
  ['"Ver en acción"', '"Veure en acció"'],
  ['"Ya adoptado por {{count}}+ equipos"', '"Ja adoptat per més de {{count}} equips"'],
  ['"Unir-se a la sala"', '"Unir-se a la sala"'],

  // Recurring fragments
  ['"Calidad"', '"Qualitat"'],
  ['"calidad"', '"qualitat"'],
  ['"Seguridad"', '"Seguretat"'],
  ['"seguridad"', '"seguretat"'],
  ['"Cifrado"', '"Xifrat"'],
  ['"cifrado"', '"xifrat"'],
  ['"profesional"', '"professional"'],
  ['"profesionales"', '"professionals"'],
  ['"reunions"', '"reunions"'], // already correct
  ['"Reunió"', '"Reunió"'], // correct
  ['"Grabación"', '"Enregistrament"'],
  ['"Grabar"', '"Enregistrar"'],
  ['"Graba tus reunions y accede a ellas más tarde"', '"Enregistra les teves reunions i accedeix-hi més tard"'],
  ['"Cámara"', '"Càmera"'],
  ['"Silenciar"', '"Silenciar"'],
  ['"Activar micrófono"', '"Activar micròfon"'],
  ['"Compartir pantalla"', '"Compartir pantalla"'],
  ['"Comparte tu pantalla, aplicaciones o pestañas específicas"', "\"Comparteix la teva pantalla, aplicacions o pestanyes específiques\""],
  ['"Chatea durante las llamadas con missatges y archivos"', '"Xateja durant les trucades amb missatges i arxius"'],
  ['"Pizarra"', '"Pissarra"'],
  ['"Colabora visualmente con una pizarra integrada"', "\"Col·labora visualment amb una pissarra integrada\""],
  ['"Cifrado de extremo a extremo y controles de seguretat"', '"Xifrat d\'extrem a extrem i controls de seguretat"'],
  ['"Característiques poderosas"', '"Funcionalitats potents"'],
  ['"Todo lo que necesitas para reunions productivas"', '"Tot el que necessites per a reunions productives"'],
  ['"Calidad de video cristalina fins a 4K con audio de calidad de estudio"', "\"Qualitat de vídeo cristal·lina fins a 4K amb àudio de qualitat d'estudi\""],
  ['"Videollamadas HD"', '"Videotrucades HD"'],
  ['"Chat integrado"', '"Xat integrat"'],
  ['"Seguretat avanzada"', '"Seguretat avançada"'],

  // Pricing
  ['"Preus simples y transparentes"', '"Preus simples i transparents"'],
  ['"Elige el plan que se adapte a tus necesidades"', '"Tria el pla que s\'adapti a les teves necessitats"'],
  ['"Para descubrir la plataforma sin compromiso."', '"Per descobrir la plataforma sense compromís."'],
  ['"Para equipos ágiles y freelancers."', '"Per a equips àgils i autònoms."'],
  ['"Para organizaciones a gran escala."', '"Per a organitzacions a gran escala."'],
  ['"Duración il·limitada"', '"Durada il·limitada"'],
  ['"5 GB de emmagatzematge Cloud"', "\"5 GB d'emmagatzematge al núvol\""],
  ['"Suport prioritario"', '"Suport prioritari"'],
  ['"Transcripciones IA (10h/mes)"', '"Transcripcions IA (10h/mes)"'],
  ['"Salas de subgrupos"', '"Sales de subgrups"'],
  ['"Salas de grupos"', '"Sales de grups"'],
  ['"SSO y Administración avanzada"', '"SSO i administració avançada"'],
  ['"Transcripciones il·limitadas"', '"Transcripcions il·limitades"'],
  ['"45 min per reunió"', '"45 min per reunió"'],
  ['"Chat en tiempo real"', '"Xat en temps real"'],
  ['"Mensual"', '"Mensual"'],
  ['"Anual"', '"Anual"'],
  ['"por usuario"', '"per usuari"'],
  ['"Compara nuestros planes"', '"Compara els nostres plans"'],
  ['"Característica"', '"Característica"'],
  ['"Participants máx."', '"Participants màx."'],
  ['"Duración de reunions"', '"Durada de reunions"'],
  ['"Calidad de video"', '"Qualitat de vídeo"'],
  ['"si disponible"', '"si està disponible"'],
  ['"Telèfon prioritario"', '"Telèfon prioritari"'],
  ['"Grabación en la nube"', '"Enregistrament al núvol"'],
  ['"Transcripción IA"', '"Transcripció IA"'],
  ['"horas"', '"hores"'],
  ['"Incluido"', '"Inclòs"'],
  ['"Preguntas frecuentes"', '"Preguntes freqüents"'],
  ['"Plan Gratuït"', '"Pla Gratuït"'],

  // Common phrases
  ['"Configuració"', '"Configuració"'], // OK
  ['"configuració"', '"configuració"'], // OK
  ['"de su compte"', '"del teu compte"'],
  ['"su compte"', '"el teu compte"'],
  ['"comptes profesionales"', '"comptes professionals"'],
  ['"Tornar al inici de sessió"', "\"Tornar a l'inici de sessió\""],
  ['"Missatge enviado con éxito!"', '"Missatge enviat amb èxit!"'],
  ['"Error al enviar el missatge."', '"Error en enviar el missatge."'],
  ['"Su nombre"', '"El teu nom"'],
  ['"Su cognom"', '"El teu cognom"'],
  ['"su@email.com"', '"tu@email.com"'],
  ['"Su empresa (opcional)"', '"La teva empresa (opcional)"'],
  ['"Categoría"', '"Categoria"'],
  ['"Describa su solicitud..."', '"Descriu la teva sol·licitud..."'],
  ['"Enviando..."', '"Enviant..."'],
  ['"Enviar missatge"', '"Enviar missatge"'],
  ['"Contáctenos"', '"Contacta\'ns"'],
  ['"Informació de contacto"', '"Informació de contacte"'],
  ['"No dude en contactarnos por email o mediante el formulario a continuación."',
    "\"No dubtis a contactar-nos per correu o mitjançant el formulari següent.\""],
  ['"Para consultas empresariales, contacte a nuestro equipo comercial."',
    '"Per a consultes empresarials, contacta amb el nostre equip comercial."'],
  ['"Empresas"', '"Empreses"'],
  ['"Horario"', '"Horari"'],

  // misc
  ['"Todos los derechos reservados"', '"Tots els drets reservats"'],
  ['"Última actualización: {{date}}"', '"Última actualització: {{date}}"'],
];

let count = 0;
for (const [from, to] of replacements) {
  const before = content;
  // Use split/join for safe global literal replacement
  content = content.split(from).join(to);
  if (content !== before) count++;
}

// Validate JSON
try {
  JSON.parse(content);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] ca.json — ${count} replacement groups applied`);
} catch (e) {
  console.error(`[FAIL] JSON invalid after replacements: ${e.message}`);
  process.exit(1);
}
