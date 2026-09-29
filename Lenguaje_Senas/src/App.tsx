import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, ArrowRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clipboard, Eye, Hand, Heart, Home as HomeIcon, Info, Languages, Menu, MessageCircle, Mic, Pause, Pencil, Play, Search, Settings, ShieldCheck, Sparkles, Trash2, Volume2, X, Zap } from 'lucide-react'
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext'

const navItems = [
  ['inicio', 'Inicio', HomeIcon], ['traductor', 'Traductor', Languages], ['aprendizaje', 'Aprendizaje', BookOpen], ['glosario', 'Glosario', Search], ['comunidad', 'Comunidad', Heart], ['soporte', 'Soporte', CircleHelp], ['quienes-somos', 'Quiénes somos', Info], ['contacto', 'Contacto', MessageCircle],
] as const
const words = [
  ['Hola', 'Saludos', 'Expresión cotidiana para saludar.', '👋'], ['Gracias', 'Saludos', 'Seña de agradecimiento y cortesía.', '🤲'], ['Familia', 'Familia', 'Personas unidas por vínculos afectivos.', '🏠'], ['Amigo', 'Familia', 'Persona cercana con quien compartes.', '🫶'], ['Trabajo', 'Trabajo', 'Actividad u ocupación diaria.', '💼'], ['Estudiar', 'Educación', 'Acción de aprender y prepararse.', '📚'], ['Feliz', 'Emociones', 'Estado de alegría y bienestar.', '☺'], ['Comer', 'Alimentos', 'Llevar alimentos a la boca.', '🍽'], ['Casa', 'Lugares', 'Espacio donde habitamos.', '⌂'], ['Rojo', 'Colores', 'Color primario asociado a la energía.', '●'], ['Uno', 'Números', 'Primer número natural.', '1'], ['Buenos días', 'Saludos', 'Saludo para comenzar el día.', '☀'],
]
const faqs = ['¿Cómo utilizar el traductor?', '¿Cómo activar la cámara?', '¿Cómo reproducir un video?', '¿Cómo cambiar el tamaño de letra?', '¿Cómo reportar una falla?']

export default function App() {
  return <AccessibilityProvider><AppContent /></AccessibilityProvider>
}

function AppContent() {
  const { contrast, fontZoom, setContrast, setFontZoom } = useAccessibility()
  const [route, setRoute] = useState(() => typeof window !== 'undefined' ? window.location.hash.replace('#/', '') || 'inicio' : 'inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const go = (next: string) => { setRoute(next); setMenuOpen(false); window.history.replaceState(null, '', `#/${next}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  useEffect(() => { const onPop = () => setRoute(window.location.hash.replace('#/', '') || 'inicio'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  return <div className={`app ${contrast ? 'high-contrast' : ''}`} style={{ zoom: fontZoom / 100 }}>
    <Navbar route={route} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} setUser={setUser} />
    <main>{route === 'inicio' && <Home go={go} user={user} />}{route === 'login' && <Login go={go} setUser={setUser} />}{route === 'registro' && <Register go={go} setUser={setUser} />}{route === 'traductor' && <TranslatorLive />}{route === 'aprendizaje' && <Learning />}{route === 'glosario' && <Glossary />}{route === 'comunidad' && <Community />}{route === 'soporte' && <Support />}{route === 'quienes-somos' && <About />}{route === 'contacto' && <Contact />}</main>
    <Accessibility contrast={contrast} setContrast={setContrast} fontZoom={fontZoom} setFontZoom={setFontZoom} />
    <Footer />
  </div>
}

function Navbar({ route, go, menuOpen, setMenuOpen, user, setUser }: any) { return <header className="navbar"><div className="nav-inner"><button className="brand" onClick={() => go('inicio')}><span className="brand-mark"><Hand size={21} /></span><span><strong>LSC</strong><small>Conecta tus manos</small></span></button><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? 'open' : ''}>{navItems.map(([id, label, Icon]) => <button key={id} className={route === id ? 'active' : ''} onClick={() => go(id)}><Icon size={16} />{label}</button>)}<span className="nav-divider" />{user ? <button className="user-btn" onClick={() => setUser(null)}><span className="avatar">{user[0]}</span>{user} <span className="logout">Cerrar sesión</span></button> : <button className="login-link" onClick={() => go('login')}>Iniciar sesión <ArrowRight size={15} /></button>}</nav></div></header> }

function Shell({ eyebrow, title, description, children }: any) { return <section className="page-shell"><div className="section-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</section> }
function Home({ go, user }: any) { return <><section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14} /> TECNOLOGÍA QUE INCLUYE</span><h1>Conecta tus <em>manos</em><br />con el mundo.</h1><p>Una plataforma para aprender, traducir y acercarse a la Lengua de Señas Colombiana.</p><div className="hero-actions"><button className="btn primary" onClick={() => go('traductor')}>Comenzar a traducir <ArrowRight size={17} /></button><button className="btn ghost" onClick={() => go('aprendizaje')}>Explorar aprendizaje</button></div><div className="trusted"><div className="avatars"><span>AM</span><span>JR</span><span>LC</span><span>+</span></div><span><strong>Más de 2.000</strong><br />personas aprendiendo LSC</span></div></div><div className="hero-art"><div className="art-card art-main"><div className="pulse-ring"><Hand size={76} strokeWidth={1.2} /></div><span className="art-caption">Lengua de Señas<br /><strong>Colombiana</strong></span></div><div className="floating-note note-one"><Check size={15} /> Traducción en tiempo real</div><div className="floating-note note-two"><Heart size={15} fill="currentColor" /> Aprendizaje inclusivo</div></div></section><section className="quick"><div className="section-heading"><div><span className="eyebrow">EXPLORA LA PLATAFORMA</span><h2>Todo lo que necesitas para conectar.</h2></div><p>Herramientas pensadas para aprender, practicar y compartir.</p></div><div className="quick-grid"><Feature icon={<Languages />} title="Traductor LSC" text="Convierte señas en texto y voz de forma sencilla." action={() => go('traductor')} label="Ir al traductor"/><Feature icon={<BookOpen />} title="Aprendizaje" text="Avanza a tu ritmo con lecciones y ejercicios." action={() => go('aprendizaje')} label="Ver lecciones"/><Feature icon={<Search />} title="Glosario" text="Consulta palabras, categorías y sus señas." action={() => go('glosario')} label="Consultar señas"/></div></section><section className="quote"><div className="quote-mark">“</div><p>La inclusión comienza cuando todos podemos<br /><strong>comunicarnos sin barreras.</strong></p><span>— Proyecto académico LSC</span></section></> }
function Feature({ icon, title, text, action, label }: any) { return <article className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><button onClick={action}>{label} <ArrowRight size={15} /></button></article> }

function Login({ go, setUser }: any) { const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const submit = (e: any) => { e.preventDefault(); if ((email === 'usuario@correo.com' && password === '123456') || (email && password.length >= 4)) { localStorage.setItem('lsc_user', email.split('@')[0]); setUser(email.split('@')[0]); go('inicio') } else setError('Correo o contraseña incorrectos.') }; return <Shell eyebrow="BIENVENIDO DE NUEVO" title="Inicia sesión" description="Continúa tu camino hacia una comunicación más inclusiva."><form className="auth-card" onSubmit={submit}><div className="logo-large"><Hand size={26} /></div><label>Correo electrónico<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" required /></label><label>Contraseña<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></label>{error && <div className="error">{error}</div>}<button className="btn primary full">Iniciar sesión <ArrowRight size={17} /></button><button type="button" className="text-link">¿Olvidaste tu contraseña?</button><div className="form-separator"><span>o</span></div><p className="center">¿Aún no tienes una cuenta? <button type="button" className="text-link inline" onClick={() => go('registro')}>Crear cuenta</button></p></form></Shell> }
function Register({ go, setUser }: any) { const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [done, setDone] = useState(false); return <Shell eyebrow="ÚNETE A LA COMUNIDAD" title="Crea tu cuenta" description="Empieza a aprender LSC con una comunidad que te acompaña."><form className="auth-card" onSubmit={e => { e.preventDefault(); setDone(true); setTimeout(() => { setUser(name.split(' ')[0]); go('inicio') }, 900) }}><label>Nombre completo<input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" required /></label><label>Correo electrónico<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" required /></label><label>Contraseña<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" minLength={6} required /></label><label>¿Cómo participarás? <select><option>Aprendiz</option><option>Instructor</option><option>Intérprete</option><option>Administrador</option></select></label>{done && <div className="success"><Check size={17} /> Usuario registrado correctamente.</div>}<button className="btn primary full">Crear mi cuenta <ArrowRight size={17} /></button></form></Shell> }

function Translator() { const [camera, setCamera] = useState(false); const [text, setText] = useState(''); const [result, setResult] = useState(''); const [copied, setCopied] = useState(false); return <Shell eyebrow="TRADUCCIÓN BIDIRECCIONAL" title="Habla con tus manos." description="Traduce LSC a lenguaje natural y convierte tus palabras en señas."><div className="translator-grid"><div className="tool-card"><div className="card-top"><div><span className="label">LSC → TEXTO Y VOZ</span><h2>Reconocimiento de señas</h2></div><span className="status-dot"><span /> Simulado</span></div><div className={`camera ${camera ? 'active' : ''}`}>{camera ? <><div className="camera-lines" /><div className="scan"><span /></div><div className="camera-hand"><Hand size={70} /></div><small>Analizando señas...</small></> : <><div className="camera-off"><Eye size={28} /><span>Cámara desactivada</span></div></>}</div><button className={`btn ${camera ? 'secondary' : 'primary'} full`} onClick={() => { setCamera(!camera); if (!camera) setTimeout(() => setResult('Hola, ¿cómo estás?'), 1200) }}>{camera ? 'Desactivar cámara' : 'Activar cámara'} <Zap size={16} /></button>{result && <div className="result"><span>Resultado detectado</span><strong>{result}</strong><div><button onClick={() => { navigator.clipboard?.writeText(result); setCopied(true) }}><Clipboard size={15} /> {copied ? 'Copiado' : 'Copiar'}</button><button><Volume2 size={15} /> Reproducir voz</button></div></div>}</div><div className="tool-card text-tool"><div className="card-top"><div><span className="label">TEXTO → LSC</span><h2>Exprésate en señas</h2></div><span className="round-icon"><MessageCircle size={17} /></span></div><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Escribe el texto que deseas traducir…" /><div className="avatar-preview"><Hand size={60} /><span>{text ? 'Representación LSC lista' : 'Tu interpretación aparecerá aquí'}</span></div><button className="btn primary full" onClick={() => setText(text || 'Hola, ¿cómo estás?')}>Traducir a LSC <Languages size={16} /></button><div className="speed-row"><span>Velocidad</span>{['0.5x', '1x', '1.5x', '2x'].map(x => <button key={x} className={x === '1x' ? 'selected' : ''}>{x}</button>)}</div></div></div></Shell> }
function TranslatorLive() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<any>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const [speechRate, setSpeechRate] = useState(1)

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    recognitionRef.current?.stop()
    window.speechSynthesis?.cancel()
  }, [])

  useEffect(() => {
    if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current
  }, [cameraActive])

  const startCamera = async () => {
    setCameraError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Este navegador no permite acceder a la cámara. Usa una conexión segura (HTTPS o localhost).')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = stream
      setCameraActive(true)
    } catch (error) {
      const name = (error as DOMException).name
      setCameraError(name === 'NotAllowedError' ? 'No se concedió permiso para usar la cámara.' : 'No se pudo iniciar la cámara. Comprueba que esté conectada y disponible.')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraActive(false)
  }

  const toggleDictation = () => {
    setVoiceError('')
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceError('El dictado no está disponible en este navegador. Puedes escribir el texto y reproducirlo en voz alta.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'es-CO'
    recognition.interimResults = false
    recognition.continuous = false
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((item: any) => item[0].transcript).join(' ')
      setText(current => current ? `${current} ${transcript}` : transcript)
    }
    recognition.onerror = () => setVoiceError('No se pudo reconocer el audio. Revisa el permiso del micrófono e inténtalo de nuevo.')
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    try {
      recognition.start()
      setListening(true)
    } catch {
      setVoiceError('No se pudo iniciar el dictado. Inténtalo de nuevo.')
    }
  }

  const speakText = () => {
    if (!text.trim() || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.trim())
    utterance.lang = 'es-CO'
    utterance.rate = speechRate
    window.speechSynthesis.speak(utterance)
  }

  return <Shell eyebrow="HERRAMIENTAS DE COMUNICACIÓN" title="Exprésate en texto y voz." description="Escribe o dicta tus palabras, escúchalas en voz alta y activa la cámara para mostrar tus señas.">
    <div className="translator-grid">
      <section className="tool-card">
        <div className="card-top"><div><span className="label">CÁMARA · LSC</span><h2>Comparte tus señas</h2></div><span className="status-dot"><span />{cameraActive ? 'Cámara activa' : 'Esperando permiso'}</span></div>
        <div className={`camera ${cameraActive ? 'active' : ''}`}>
          {cameraActive ? <video ref={videoRef} autoPlay muted playsInline aria-label="Vista previa de la cámara" /> : <div className="camera-off"><Eye size={28} /><span>Cámara apagada</span></div>}
          {cameraActive && <span className="camera-live-label">Vista previa local</span>}
        </div>
        <p className="translator-note">La cámara muestra una vista previa. La interpretación automática de señas aún requiere integrar y validar un modelo de LSC.</p>
        {cameraError && <p className="interaction-error" role="alert">{cameraError}</p>}
        <button className={`btn ${cameraActive ? 'secondary' : 'primary'} full`} onClick={cameraActive ? stopCamera : startCamera}>{cameraActive ? 'Desactivar cámara' : 'Permitir acceso a la cámara'} <Eye size={16} /></button>
      </section>
      <section className="tool-card text-tool">
        <div className="card-top"><div><span className="label">TEXTO · AUDIO</span><h2>Di lo que necesitas</h2></div><span className="round-icon"><MessageCircle size={17} /></span></div>
        <label className="text-entry-label" htmlFor="message-text">Tu mensaje</label>
        <textarea id="message-text" value={text} onChange={event => setText(event.target.value)} placeholder="Escribe aquí o dicta tu mensaje…" />
        <div className="voice-actions">
          <button className="btn secondary" onClick={toggleDictation}><Mic size={16} />{listening ? 'Detener dictado' : 'Dictar por voz'}</button>
          <button className="btn primary" onClick={speakText} disabled={!text.trim()}><Volume2 size={16} />Escuchar mensaje</button>
        </div>
        {voiceError && <p className="interaction-error" role="alert">{voiceError}</p>}
        <label className="rate-control">Velocidad de voz <input type="range" min="0.5" max="2" step="0.1" value={speechRate} onChange={event => setSpeechRate(Number(event.target.value))} /><span>{speechRate.toFixed(1)}×</span></label>
        <p className="translator-note">El dictado y la lectura en voz alta usan las funciones de tu navegador. La conversión de texto a señas todavía no está conectada.</p>
      </section>
    </div>
  </Shell>
}

function Learning() { const [progress, setProgress] = useState(42); const levels: [string, string, string, string[]][] = [['01', 'Básico', 'Construye una base sólida para comenzar a comunicarte.', ['Alfabeto manual', 'Saludos esenciales', 'Números y colores']], ['02', 'Intermedio', 'Amplía tu vocabulario y mantén conversaciones.', ['Familia y trabajo', 'Conversaciones', 'Expresiones cotidianas']], ['03', 'Avanzado', 'Comprende la riqueza y estructura de la LSC.', ['Gramática de LSC', 'Expresiones faciales', 'Contexto cultural']]]; return <Shell eyebrow="TU RUTA DE APRENDIZAJE" title="Aprende a tu ritmo." description="Cada seña es un puente. Avanza, practica y celebra tu progreso."><div className="learning-summary"><div><span>Tu progreso general</span><strong>{progress}%</strong></div><div className="progress-bar"><span style={{ width: `${progress}%` }} /></div><span className="summary-note"><Activity size={15} /> 3 lecciones completadas esta semana</span></div><div className="levels">{levels.map((l, i) => <article className={`level ${i === 0 ? 'current' : ''}`} key={l[0]}><div className="level-number">{l[0]}</div><div className="level-content"><span className="label">NIVEL {l[0]}</span><h2>{l[1]}</h2><p>{l[2]}</p><ul>{l[3].map(x => <li key={x}><Check size={14} /> {x}</li>)}</ul><button className="btn small" onClick={() => setProgress(Math.min(100, progress + 8))}>{i === 0 ? 'Continuar aprendiendo' : 'Ver contenido'} <ArrowRight size={15} /></button></div><div className="level-progress"><strong>{i === 0 ? progress : i === 1 ? 18 : 0}%</strong><span>progreso</span></div></article>)}</div><div className="quiz"><div><span className="eyebrow">PRACTICA LO APRENDIDO</span><h2>¿Listo para un reto?</h2><p>Responde 5 preguntas y descubre cuánto has avanzado.</p></div><button className="btn primary">Comenzar quiz <ArrowRight size={16} /></button></div></Shell> }
function Glossary() { const [search, setSearch] = useState(''); const [category, setCategory] = useState('Todas'); const filtered = useMemo(() => words.filter(w => (category === 'Todas' || w[1] === category) && w[0].toLowerCase().includes(search.toLowerCase())), [search, category]); return <Shell eyebrow="CONSULTA RÁPIDA" title="Glosario LSC" description="Descubre nuevas señas y amplía tu vocabulario día a día."><div className="search-box"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar una palabra…" /></div><div className="chips">{['Todas', 'Saludos', 'Familia', 'Trabajo', 'Educación', 'Emociones', 'Alimentos', 'Lugares', 'Números', 'Colores'].map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="word-grid">{filtered.map(w => <article className="word-card" key={w[0]}><div className="sign-visual">{w[3]}</div><span className="label">{w[1]}</span><h3>{w[0]}</h3><p>{w[2]}</p><div><button className="word-action">Ver seña <Eye size={14} /></button><button className="play-action" aria-label={`Reproducir ${w[0]}`}><Play size={14} fill="currentColor" /></button></div></article>)}</div></Shell> }

function Community() {
  const eventIdeas = [
    { title: 'Encuentro de cultura sorda', description: 'Un espacio para compartir experiencias, memorias y expresiones artísticas desde la identidad, la lengua y la vida de las comunidades sordas.', source: 'https://educativo.insor.gov.co/contecortos/la-comunidad-sorda/', sourceLabel: 'INSOR Educativo · La comunidad sorda' },
    { title: 'Taller de expresión facial y corporal', description: 'Explora cómo el rostro, la mirada y el movimiento acompañan la gramática y el sentido de la LSC; son parte de la lengua, no adornos ni gestos universales.', source: 'https://educativo.insor.gov.co/materias/lengua-de-senas/', sourceLabel: 'INSOR Educativo · Lengua de Señas' },
    { title: 'Círculo de conversación', description: 'Un encuentro para practicar LSC en contexto, compartir vocabulario y participar respetando los turnos visuales y las distintas formas de comunicación.', source: 'https://educativo.insor.gov.co/materias/lengua-de-senas/', sourceLabel: 'INSOR Educativo · Lengua de Señas' },
    { title: 'Muestra de historias y arte sordo', description: 'Un espacio para disfrutar relatos, poesía visual y creación artística, reconociendo a las personas sordas como autoras y protagonistas de su cultura.', source: 'https://educativo.insor.gov.co/contecortos/la-comunidad-sorda/', sourceLabel: 'INSOR Educativo · La comunidad sorda' },
    { title: 'LSC y educación bilingüe', description: 'Una conversación sobre el aprendizaje accesible en LSC y español escrito, con la experiencia de estudiantes, familias, docentes y comunidad sorda.', source: 'https://educativo.insor.gov.co/tipoasesorias/educacion-bilingue/', sourceLabel: 'INSOR Educativo · Educación bilingüe' },
  ]
  const eventCategories = ['Cultura', 'Lengua y expresión', 'Conversación', 'Arte sordo', 'Educación']
  return <Shell eyebrow="CULTURA Y COMUNIDAD" title="Una lengua, muchas historias." description="Conoce la cultura sorda, sus luchas y los espacios que construimos juntos."><div className="culture-grid"><article className="story-card"><span className="label">HISTORIA DE LA LSC</span><h2>Una lengua viva que evoluciona.</h2><p>La Lengua de Señas Colombiana es una lengua natural, visual y espacial con una historia propia. Sus comunidades la han enriquecido y transmitido de generación en generación.</p><button className="btn small">Conocer la historia <ArrowRight size={15} /></button></article><article className="law-card"><ShieldCheck size={27} /><span className="label">LEYES Y DERECHOS</span><h3>Ley 324 de 1996</h3><p>Reconoce la lengua manual colombiana como idioma propio de la comunidad sorda y garantiza derechos de participación e inclusión.</p><a href="#contacto">Ver recursos →</a></article></div><div className="events"><div className="section-heading"><div><span className="eyebrow">ESPACIOS PARA COMPARTIR</span><h2>Encuentros y actividades</h2></div></div><p className="events-note">Ideas para aprender y encontrarnos; fechas y lugares por confirmar. La LSC es una lengua con gramática y cultura propias, no una traducción palabra por palabra del español.</p><div className="event-grid">{eventIdeas.map((event, index) => <article className="event-card" key={event.title}><div className="event-card-top"><span className="event-number">{String(index + 1).padStart(2, '0')}</span><span className="event-category">{eventCategories[index]}</span></div><h3>{event.title}</h3><p>{event.description}</p><a className="event-source" href={event.source} target="_blank" rel="noreferrer">{event.sourceLabel} <ArrowRight size={14} /></a></article>)}</div></div></Shell>
}
function Support() { const [open, setOpen] = useState(0); return <Shell eyebrow="ESTAMOS PARA AYUDARTE" title="Soporte y accesibilidad" description="Encuentra respuestas y adapta la experiencia a tus necesidades."><div className="support-grid"><div className="faq"><span className="label">PREGUNTAS FRECUENTES</span>{faqs.map((q, i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={q}><button onClick={() => setOpen(open === i ? -1 : i)}>{q}<ChevronDown size={17} /></button>{open === i && <p>{i === 0 ? 'Dirígete a Traductor, activa la cámara y deja que el sistema simule una traducción de tus señas.' : 'Entra a la sección correspondiente y sigue los controles visibles. Si necesitas ayuda, contáctanos.'}</p>}</div>)}</div><div className="support-aside"><div className="aside-icon"><Settings size={22} /></div><h3>¿Necesitas más ayuda?</h3><p>Nuestro equipo está listo para escucharte.</p><button className="btn primary" onClick={() => window.location.hash = '#/contacto'}>Contáctanos <ArrowRight size={15} /></button></div></div></Shell> }
function About() { const roles = [['AM', 'Desarrolladores', 'Diseñan, programan y mantienen la plataforma con foco en accesibilidad.'], ['LC', 'Intérpretes de LSC', 'Facilitan la comunicación entre lenguas y contextos, respetando el sentido del mensaje.'], ['JR', 'Asesores sordos', 'Aportan su experiencia y validan que la lengua y la cultura sorda estén representadas con respeto.'], ['SP', 'Colaboradores', 'Contribuyen con aprendizaje, contenidos y trabajo junto a la comunidad.']]; return <Shell eyebrow="EL PROYECTO" title="Diseñado para conectar." description="Somos un equipo académico comprometido con una tecnología más humana, accesible e inclusiva."><div className="mission"><div><span className="label">NUESTRA MISIÓN</span><h2>Aprender una lengua es abrir una puerta.</h2></div><p>Desarrollamos herramientas que acercan la Lengua de Señas Colombiana a más personas, promoviendo la comunicación, el aprendizaje y el respeto por la diversidad lingüística.</p></div><div className="team"><span className="eyebrow">LAS PERSONAS DETRÁS</span><h2>Un equipo que aprende escuchando a la comunidad.</h2><div className="team-grid">{roles.map(([initials, title, description]) => <article className="team-card" key={title}><span>{initials}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></Shell> }
function Contact() {
  const [messages, setMessages] = useState<Array<{ id: string; name: string; category: string; message: string; createdAt: string }>>([])
  const [notice, setNotice] = useState('')
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [draftMessage, setDraftMessage] = useState('')

  const persistMessages = (updatedMessages: typeof messages) => {
    setMessages(updatedMessages)
    try {
      localStorage.setItem('lsc_contact_messages', JSON.stringify(updatedMessages))
      return true
    } catch {
      setNotice('No se pudieron guardar los cambios en este navegador.')
      return false
    }
  }

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('lsc_contact_messages')
      if (savedMessages) setMessages(JSON.parse(savedMessages))
    } catch {
      setNotice('No se pudieron recuperar los mensajes guardados en este navegador.')
    }
  }, [])

  const submitMessage = (event: any) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const submittedMessage = {
      id: crypto.randomUUID(),
      name: String(formData.get('name')),
      category: String(formData.get('category')),
      message: String(formData.get('message')),
      createdAt: new Date().toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
    }
    if (persistMessages([submittedMessage, ...messages])) setNotice('Tu mensaje quedó en Mensajes y respuestas.')
    form.reset()
  }

  const saveEditedMessage = (id: string) => {
    const trimmedMessage = draftMessage.trim()
    if (!trimmedMessage) return
    const saved = persistMessages(messages.map(message => message.id === id ? { ...message, message: trimmedMessage } : message))
    setEditingMessageId(null)
    if (saved) setNotice('Cambios guardados.')
  }

  const deleteMessage = (id: string) => {
    const saved = persistMessages(messages.filter(message => message.id !== id))
    setEditingMessageId(null)
    if (saved) setNotice('Mensaje eliminado.')
  }

  return <Shell eyebrow="HABLEMOS" title="Tu voz importa." description="¿Tienes una idea, una pregunta o quieres ayudarnos a mejorar? Escríbenos.">
    <form className="contact-form" onSubmit={submitMessage}>
      <div className="form-two"><label>Nombre<input name="name" required placeholder="Tu nombre" /></label><label>Correo electrónico<input name="email" required type="email" placeholder="tu@correo.com" /></label></div>
      <label>Tipo de solicitud<select name="category"><option>Reportar una falla</option><option>Sugerir una nueva seña</option><option>Solicitar interpretación</option><option>Sugerencia</option><option>Otro</option></select></label>
      <label>Mensaje<textarea name="message" required placeholder="Cuéntanos cómo podemos ayudarte…" /></label>
      {notice && <div className="success" role="status">{notice}</div>}
      <button className="btn primary">Enviar solicitud <ArrowRight size={16} /></button>
    </form>
    <section className="messages-section" aria-labelledby="messages-heading" aria-live="polite">
      <div className="messages-heading"><span className="eyebrow">SEGUIMIENTO</span><h2 id="messages-heading">Mensajes y respuestas</h2></div>
      {messages.length === 0 ? <p className="messages-empty">Cuando envíes un mensaje, aparecerá aquí junto con su confirmación.</p> : <div className="message-list">{messages.map(message => <article className="message-card" key={message.id}><header><div><strong>{message.name}</strong><span>{message.category} · {message.createdAt}</span></div><span className="message-status">Recibido</span></header>{editingMessageId === message.id ? <div className="message-editor"><textarea aria-label="Editar mensaje" value={draftMessage} onChange={event => setDraftMessage(event.target.value)} /><div className="message-actions"><button type="button" className="message-save" onClick={() => saveEditedMessage(message.id)} disabled={!draftMessage.trim()}><Check size={15} />Guardar</button><button type="button" className="message-cancel" onClick={() => setEditingMessageId(null)}><X size={15} />Cancelar</button></div></div> : <><p className="message-body">{message.message}</p><div className="message-actions"><button type="button" className="message-edit" onClick={() => { setEditingMessageId(message.id); setDraftMessage(message.message) }}><Pencil size={14} />Editar</button><button type="button" className="message-delete" aria-label={`Borrar mensaje de ${message.name}`} onClick={() => deleteMessage(message.id)}><Trash2 size={14} />Borrar</button></div></>}<div className="message-reply"><strong>Confirmación automática</strong><p>Gracias por compartirlo. Tu aporte ayuda a construir un espacio más accesible y cercano a la comunidad sorda. Esta confirmación no es una respuesta personalizada del equipo.</p></div></article>)}</div>}
    </section>
  </Shell>
}
function Accessibility({ contrast, setContrast, fontZoom, setFontZoom }: any) {
  const [open, setOpen] = useState(false)
  return <div className={`accessibility ${open ? 'expanded' : ''}`}>
    <button className="access-toggle" onClick={() => setOpen(!open)} aria-label="Opciones de accesibilidad" aria-expanded={open}><AccessibilityIcon /></button>
    {open && <div className="access-menu"><strong>Accesibilidad</strong><label><input type="checkbox" checked={contrast} onChange={event => setContrast(event.target.checked)} /> Alto contraste</label><div className="font-control"><span>Zoom de texto</span><div className="font-zoom-controls"><button aria-label="Reducir zoom del texto" onClick={() => setFontZoom(Math.max(80, fontZoom - 10))}>A−</button><output aria-live="polite">{fontZoom}%</output><button aria-label="Aumentar zoom del texto" onClick={() => setFontZoom(Math.min(150, fontZoom + 10))}>A+</button><button aria-label="Restablecer zoom del texto" onClick={() => setFontZoom(100)}>Restablecer</button></div></div></div>}
  </div>
}
function AccessibilityIcon() { return <span className="access-icon">◐</span> }
function Footer() { return <footer><div className="footer-inner"><div className="brand"><span className="brand-mark"><Hand size={19} /></span><span><strong>LSC</strong><small>Conecta tus manos</small></span></div><p>Desarrollo de un sistema de traducción e interpretación<br />de Lengua de Señas Colombiana a Lenguaje Natural.</p><span className="footer-copy">© 2026 Proyecto LSC</span></div></footer> }

