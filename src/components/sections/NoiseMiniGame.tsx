import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Heart,
  Brain,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Home,
  Briefcase,
  Car,
  GraduationCap,
  Store,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Compass,
  BookOpen,
  ExternalLink,
  MapPin,
  Trophy,
  Flame,
  FileCheck,
  Wind,
  Check,
  Scale
} from 'lucide-react';
import { NavSection } from '../Navbar';

interface PenitenciaData {
  type: 'trivia' | 'breath' | 'pledge';
  title: string;
  badge: string;
  description: string;
  // If trivia:
  question?: string;
  options?: { label: string; isCorrect: boolean; explanation: string }[];
  // If pledge:
  pledgeText?: string;
}

interface GameScenario {
  id: string;
  category: string;
  title: string;
  sectorName: string;
  icon: React.ComponentType<{ className?: string }>;
  mapX: number; // percentage 0-100
  mapY: number; // percentage 0-100
  initialDb: number;
  story: string;
  dilemma: string;
  educationalTarget: {
    section: NavSection;
    sectionTitle: string;
    topicTitle: string;
    explanation: string;
  };
  options: {
    text: string;
    type: 'aggressive' | 'passive' | 'assertive';
    dbChange: number;
    stressChange: number;
    harmonyChange: number;
    pointsDelta: number;
    feedback: string;
    behaviorNote: string;
    penitencia?: PenitenciaData;
  }[];
}

const SCENARIOS: GameScenario[] = [
  {
    id: 'fincas',
    category: 'Veredas & Fincas de Recreo',
    title: 'Fiestas con Car Audio en Vereda Potrerito',
    sectorName: 'Vereda Potrerito / El Salado',
    icon: Home,
    mapX: 20,
    mapY: 22,
    initialDb: 89,
    story: 'Es sábado a la medianoche en la vereda Potrerito. Una finca de recreo alquilada para el fin de semana instaló un vehículo con "car audio" y miniteca a cielo abierto. Los bajos retumban por todo el cañón campesino impidiendo el descanso de las familias agrícolas y perturbando a la fauna nativa de San Antonio de Prado.',
    dilemma: '¿Qué iniciativa tomas frente a la fiesta desmedida en la finca vecina?',
    educationalTarget: {
      section: 'efectos',
      sectionTitle: 'Efectos en la salud',
      topicTitle: 'El ruido nocturno y la Ley Antirruido 2450 de 2025',
      explanation: 'En "Efectos en la salud" se explica cómo el ruido nocturno fragmenta el sueño REM y activa el estrés crónico. Además, en Colombia la Ley Antirruido 2450 de 2025 sanciona solidariamente a los propietarios de fincas con multas de hasta 16 SMDLV.',
    },
    options: [
      {
        text: 'Vas a cortar la luz de la finca a la fuerza o arrojas piedras a la cerca con insultos.',
        type: 'aggressive',
        dbChange: +14,
        stressChange: +40,
        harmonyChange: -45,
        pointsDelta: -160,
        feedback: 'Grave error: cometes daño en bien ajeno, desatas una confrontación violenta con personas ebrias y pones en riesgo tu integridad física.',
        behaviorNote: 'La violencia directa en zonas rurales agrava el conflicto y deslegitima el reclamo comunitario.',
        penitencia: {
          type: 'breath',
          title: 'Penitencia: Descompresión de Furia Rural',
          badge: 'Calma Emocional',
          description: 'La impulsividad violenta casi desata una riña en la vereda. Realiza este ejercicio guiado de respiración de 5 segundos para oxigenar tu cerebro y bajar el cortisol antes de continuar.',
        },
      },
      {
        text: 'Te resignas, te pones almohadas en los oídos y sufres la vigilia hasta el mediodía del domingo.',
        type: 'passive',
        dbChange: 0,
        stressChange: +25,
        harmonyChange: -10,
        pointsDelta: -80,
        feedback: 'Pierdes horas vitales de descanso, acumulando migraña, hipertensión matutina y normalizando la perturbación constante de la vereda.',
        behaviorNote: 'La resignación pasiva cronifica el problema del alquiler descontrolado de fincas.',
        penitencia: {
          type: 'trivia',
          title: 'Penitencia: Curso Pedagógico Ley Antirruido',
          badge: 'Conocimiento Legal',
          description: 'No tienes que sufrir en silencio: la ley colombiana te respalda. Responde correctamente esta pregunta para recuperar +100 puntos y saldar tu comparendo.',
          question: '¿Qué dispone la Ley Antirruido 2450 de 2025 sobre las fincas de recreo alquiladas?',
          options: [
            { label: 'La Policía no puede intervenir en zonas rurales ni fincas.', isCorrect: false, explanation: 'Falso: la ley aplica en todo el territorio nacional.' },
            { label: 'El dueño del predio es solidariamente responsable y puede ser multado con hasta 16 SMDLV.', isCorrect: true, explanation: '¡Correcto! Los propietarios de fincas responden solidariamente ante el ruido excesivo.' },
            { label: 'Se permite el car audio libre siempre que sea en fin de semana.', isCorrect: false, explanation: 'Falso: el descanso campesino y la fauna están protegidos.' },
          ],
        },
      },
      {
        text: 'Contactas con serenidad al mayordomo o propietario informándole que la Ley Antirruido 2450 de 2025 sanciona solidariamente al dueño del predio e instas a modular el sonido al interior de la casa.',
        type: 'assertive',
        dbChange: -36,
        stressChange: -25,
        harmonyChange: +45,
        pointsDelta: +320,
        feedback: '¡Excelente gestión! El propietario, ante el riesgo legal de la multa y la incautación de equipos, ordena apagar el car audio exterior y mantener el sonido moderado adentro. La vereda recupera su paz a 38 dB.',
        behaviorNote: 'Citar con firmeza y educación la responsabilidad legal de los dueños de fincas resuelve el 80% de los excesos en veredas.',
      },
    ],
  },
  {
    id: 'perifoneo',
    category: 'Venta Ambulante & Perifoneo',
    title: 'Megáfonos Matutinos en Sector Naranjitos',
    sectorName: 'Sector Naranjitos / La Pradera',
    icon: GraduationCap,
    mapX: 80,
    mapY: 22,
    initialDb: 87,
    story: 'Por las calles empinadas de Naranjitos, una camioneta de venta de plátanos y chatarra transita desde las 7:15 am con una grabación de megáfono repetida en bucle a más de 88 dB, interrumpiendo las clases de los colegios cercanos y a personas enfermas en recuperación.',
    dilemma: '¿Cómo concertar el derecho al trabajo con el derecho al silencio vecinal?',
    educationalTarget: {
      section: 'que-es',
      sectionTitle: '¿Qué es la contaminación auditiva?',
      topicTitle: 'Límites saludables de decibeles de la OMS',
      explanation: 'En "¿Qué es?" se detalla que exposiciones constantes sobre 70 dB aumentan la presión arterial e impiden la concentración escolar. La normativa de Medellín prohíbe el perifoneo comercial desmedido en zonas residenciales y escolares.',
    },
    options: [
      {
        text: 'Sales furioso a la calle a insultar al vendedor y le arrancas el cable del megáfono.',
        type: 'aggressive',
        dbChange: +12,
        stressChange: +30,
        harmonyChange: -35,
        pointsDelta: -150,
        feedback: 'El vendedor reacciona a los gritos, se genera un espectáculo callejero y no logras ningún cambio de actitud permanente.',
        behaviorNote: 'La agresividad verbal contra trabajadores informales genera rechazo y polarización comunitaria.',
        penitencia: {
          type: 'pledge',
          title: 'Penitencia: Acta de Convivencia Barrial',
          badge: 'Compromiso Cívico',
          description: 'La agresión destruye el tejido social de Naranjitos. Firma digitalmente el acta de compromiso para sustituir el insulto por la mediación pacífica y recuperar +90 puntos.',
          pledgeText: 'Yo me comprometo a no recurrir a la agresión contra trabajadores informales de San Antonio de Prado, promoviendo el diálogo empático y los acuerdos con la Junta de Acción Comunal.',
        },
      },
      {
        text: 'Cierras las ventanas con fastidio y maldices el ruido mientras intentas trabajar o descansar.',
        type: 'passive',
        dbChange: 0,
        stressChange: +15,
        harmonyChange: -5,
        pointsDelta: -75,
        feedback: 'El perifoneo continuará día tras día sin que nadie le haga saber al vendedor el impacto que genera en los niños y enfermos.',
        behaviorNote: 'El silencio cómplice perpetúa la normalización del ruido comercial en los barrios.',
        penitencia: {
          type: 'trivia',
          title: 'Penitencia: Desafío de Salud Auditiva',
          badge: 'Regla de la OMS',
          description: 'Aprende los umbrales seguros para recuperar tus puntos perdidos.',
          question: 'Según la Organización Mundial de la Salud (OMS), ¿a partir de qué nivel de decibeles el ruido ambiental continuo genera riesgo cardiovascular y estrés?',
          options: [
            { label: 'A partir de 95 dB únicamente.', isCorrect: false, explanation: 'Incorrecto: a 95 dB ya existe daño auditivo agudo.' },
            { label: 'A partir de 65 dB de día y 45 dB en la noche.', isCorrect: true, explanation: '¡Correcto! Niveles superiores a 65 dB activan el cortisol y la hipertensión de forma continua.' },
            { label: 'El cuerpo humano se acostumbra a cualquier nivel de ruido sin consecuencias.', isCorrect: false, explanation: 'Falso: la pérdida auditiva y el daño vascular son acumulativos e irreversibles.' },
          ],
        },
      },
      {
        text: 'Hablas con amabilidad con el vendedor: reconoces su labor, le explicas que hay niños estudiando y enfermos descansando, y le pides bajar el volumen a la mitad.',
        type: 'assertive',
        dbChange: -26,
        stressChange: -20,
        harmonyChange: +40,
        pointsDelta: +300,
        feedback: '¡Impacto humano positivo! El vendedor no era consciente del eco en la calle estrecha, baja la perilla del megáfono y acuerda pasar a menor volumen.',
        behaviorNote: 'El diálogo empático cara a cara logra acuerdos inmediatos sin necesidad de sanciones punitivas.',
      },
    ],
  },
  {
    id: 'motos',
    category: 'Motos & Piques en Laderas',
    title: 'Resonadores en la Subida a El Chuscal',
    sectorName: 'Vía Principal & Sector El Chuscal',
    icon: Car,
    mapX: 50,
    mapY: 50,
    initialDb: 98,
    story: 'Son las 18:45 hrs en la empinada subida hacia El Chuscal por la Vía Principal de San Antonio de Prado. El tráfico está frenado y varios motociclistas con escapes modificados y resonadores aceleran a fondo en vacío a más de 105 dB, haciendo temblar los ventanales de las viviendas y aturdiendo a peatones.',
    dilemma: '¿Qué actitud tomas para frenar el impacto acústico de las motos en las laderas?',
    educationalTarget: {
      section: 'causas',
      sectionTitle: 'Causas del Ruido Urbano',
      topicTitle: 'El tráfico vehicular y los resonadores modificados',
      explanation: 'En la sección "Causas" se explica que el tráfico y las motos modificadas generan más del 75% del ruido urbano de Medellín. Los resonadores superan los 100 dB, causando daño coclear irreversible y taquicardia colectiva sin aportar ningún rendimiento real al motor.',
    },
    options: [
      {
        text: 'Te enfureces al volante, tocas el claxon continuamente y le tiras el carro a las motos para apurarlas.',
        type: 'aggressive',
        dbChange: +16,
        stressChange: +35,
        harmonyChange: -40,
        pointsDelta: -170,
        feedback: '¡Peligro inminente! El cruce escala a 114 dB, se desata una riña vial violenta y aumenta el riesgo de un accidente fatal en la pendiente.',
        behaviorNote: 'El claxon y la agresividad al volante multiplican la tensión y jamás aceleran el tráfico.',
        penitencia: {
          type: 'pledge',
          title: 'Penitencia: Promesa del Conductor Consciente',
          badge: 'Seguridad Vial',
          description: 'El uso agresivo del claxon y maniobras intimidatorias en pendientes son infracciones graves. Firma la promesa de calma al volante para recuperar +90 puntos.',
          pledgeText: 'Prometo no usar el claxon por frustración en la Vía Principal de San Antonio de Prado y respetar la distancia de seguridad con motociclistas y peatones.',
        },
      },
      {
        text: 'Aprietas el timón con ira contenida, sufres el estruendo de los tubos de escape y maldices el tráfico.',
        type: 'passive',
        dbChange: 0,
        stressChange: +20,
        harmonyChange: -5,
        pointsDelta: -80,
        feedback: 'Absorbes todo el cóctel de adrenalina y cortisol que daña tu sistema cardiovascular.',
        behaviorNote: 'Internalizar la hostilidad sonora sin control emocional deteriora gravemente tu salud.',
        penitencia: {
          type: 'breath',
          title: 'Penitencia: Respiración al Volante',
          badge: 'Anti-Estrés Vial',
          description: 'El atasco no cambiará acelerando el pulso. Realiza la pausa de respiración de 5 segundos para recuperar el equilibrio fisiológico.',
        },
      },
      {
        text: 'Mantienes la calma al volante con música suave y, como comunidad, canalizas con la JAC una solicitud formal a la Secretaría de Movilidad de Medellín para operativos de sonometría a motocicletas.',
        type: 'assertive',
        dbChange: -30,
        stressChange: -20,
        harmonyChange: +35,
        pointsDelta: +340,
        feedback: '¡Respuesta institucional y cívica! Los controles con sonómetro y el cambio de hábitos moteros reducen el ruido a niveles tolerables de 68 dB.',
        behaviorNote: 'La acción comunitaria organizada con las autoridades de movilidad transforma el comportamiento de los conductores.',
      },
    ],
  },
  {
    id: 'bares',
    category: 'Comercio & Terrazas',
    title: 'Bafles hacia la Calle en el Parque Principal',
    sectorName: 'Parque Principal & Calle del Comercio',
    icon: Store,
    mapX: 20,
    mapY: 76,
    initialDb: 96,
    story: 'Es medianoche en el Parque Principal de San Antonio de Prado. Una cantina y un estanco han colocado dos cabinas de sonido gigantes sobre la acera peatonal con música a más de 96 dB para atraer clientela, impidiendo el descanso de los vecinos de las casas y apartamentos superiores.',
    dilemma: '¿Cómo conciliar la actividad comercial de los bares con el derecho al descanso de los pradenses?',
    educationalTarget: {
      section: 'soluciones',
      sectionTitle: 'Soluciones',
      topicTitle: 'Acuerdos de volumen y el programa Medellín Convive la Noche',
      explanation: 'En "Soluciones" se enseña cómo la autorregulación comercial, la orientación interna de altavoces y el programa "Medellín Convive la Noche" armonizan la economía nocturna con la salud del vecindario.',
    },
    options: [
      {
        text: 'Bajas enfurecido a patear los bafles de la cantina y amenazas con prenderle fuego al local.',
        type: 'aggressive',
        dbChange: +15,
        stressChange: +45,
        harmonyChange: -50,
        pointsDelta: -180,
        feedback: 'Cometes un delito, los clientes y administradores te agreden físicamente y el conflicto escala a una emergencia de orden público.',
        behaviorNote: 'La justicia por mano propia agrava el peligro y destruye la convivencia barrial.',
        penitencia: {
          type: 'breath',
          title: 'Penitencia: Apaciguar la Ira Nocturna',
          badge: 'Control Emocional',
          description: 'La agresión física pudo terminar en una tragedia en el Parque. Tómate 5 segundos de respiración guiada para recuperar la compostura cívica.',
        },
      },
      {
        text: 'Tomas pastillas para dormir de forma automedicada y compras tapones que te lastiman el oído sin resolver el problema.',
        type: 'passive',
        dbChange: 0,
        stressChange: +20,
        harmonyChange: -5,
        pointsDelta: -75,
        feedback: 'Palias superficialmente el síntoma con riesgo farmacológico mientras el ruido sigue creciendo cada fin de semana.',
        behaviorNote: 'Depender de sedantes no sustituye la regulación de los establecimientos de comercio.',
        penitencia: {
          type: 'trivia',
          title: 'Penitencia: Pregunta de Convivencia Nocturna',
          badge: 'Gestión Institucional',
          description: 'Aprende los canales correctos de Medellín para saldar tu comparendo.',
          question: '¿Qué iniciativa de la Alcaldía de Medellín promueve acuerdos de volumen y horarios amables con bares y cantinas?',
          options: [
            { label: 'El programa "Medellín Convive la Noche".', isCorrect: true, explanation: '¡Correcto! Fomenta la autorregulación, limitadores acústicos y respeto vecinal.' },
            { label: 'El toque de queda acústico general sin excepciones.', isCorrect: false, explanation: 'Incorrecto.' },
            { label: 'Ninguna: en Medellín los bares tienen permiso ilimitado de decibeles.', isCorrect: false, explanation: 'Falso: existen límites de decibeles y uso del suelo.' },
          ],
        },
      },
      {
        text: 'Dialogas con el administrador proponiendo que oriente los bafles hacia el interior del local y acudes con la comunidad a la Inspección de Policía 7A para exigir la firma del pacto de convivencia acústica.',
        type: 'assertive',
        dbChange: -34,
        stressChange: -25,
        harmonyChange: +50,
        pointsDelta: +350,
        feedback: '¡Solución sostenible! El bar ingresa sus cabinas, coloca limitadores a 70 dB y los residentes del Parque pueden conciliar el sueño a 40 dB.',
        behaviorNote: 'Los pactos de autorregulación y la mediación en la Inspección de Policía de San Antonio de Prado logran cambios definitivos.',
      },
    ],
  },
  {
    id: 'urbanizaciones',
    category: 'Vivienda & Copropiedad',
    title: 'Bafles en Balcones en El Limonar y Barichara',
    sectorName: 'Urbanización El Limonar / Barichara',
    icon: Briefcase,
    mapX: 78,
    mapY: 74,
    initialDb: 83,
    story: 'En una torre de apartamentos de El Limonar, un residente sacó una cabina de sonido al balcón el domingo a las 7:30 am con música a todo volumen. El sonido reverbera entre las fachadas de los bloques contiguos donde descansan enfermeros y operarios que trabajaron en turno de noche en Medellín.',
    dilemma: '¿Cómo restaurar la paz acústica en el conjunto cerrado sin crear enemistades?',
    educationalTarget: {
      section: 'soluciones',
      sectionTitle: 'Soluciones',
      topicTitle: 'Convivencia en copropiedades y comités de conciliación',
      explanation: 'En "Soluciones" se explican los mecanismos de convivencia para copropiedades: aislar vibraciones, no usar áreas exteriores como discotecas y acudir al Comité de Convivencia de la administración.',
    },
    options: [
      {
        text: 'Pones tu propio bafle en la ventana a mayor volumen para "vengarte" y ahogar su música con ruido.',
        type: 'aggressive',
        dbChange: +14,
        stressChange: +35,
        harmonyChange: -40,
        pointsDelta: -160,
        feedback: '¡Guerra de bafles a 98 dB! Los demás vecinos quedan atrapados en medio del caos acústico y la administración sanciona a ambos inmuebles.',
        behaviorNote: 'Responder al ruido con más ruido convierte el conjunto residencial en un ambiente tóxico e invivible.',
        penitencia: {
          type: 'pledge',
          title: 'Penitencia: Pacto de Copropiedad y Balcones',
          badge: 'Cultura en PH',
          description: 'La "guerra de bafles" casi le cuesta una sanción a tu apartamento. Firma el pacto de propiedad horizontal para redimirte con +90 puntos.',
          pledgeText: 'Prometo no poner bafles en balcones ni ventanas en conjuntos de San Antonio de Prado, disfrutando la música al interior de mi vivienda y respetando el descanso de mis vecinos.',
        },
      },
      {
        text: 'Te muerdes los labios con ira y publicas quejas agresivas y anónimas en el grupo de WhatsApp del edificio.',
        type: 'passive',
        dbChange: 0,
        stressChange: +15,
        harmonyChange: -10,
        pointsDelta: -70,
        feedback: 'El vecino ignora el mensaje anónimo y la tensión comunitaria se llena de chismes y hostilidad encubierta.',
        behaviorNote: 'Los ataques indirectos o anónimos rara vez modifican conductas individuales.',
        penitencia: {
          type: 'trivia',
          title: 'Penitencia: Código de Convivencia en Propiedad Horizontal',
          badge: 'Mediación Vecinal',
          description: 'Conoce los canales adecuados para saldar tu comparendo.',
          question: '¿Cuál es el primer órgano al que se debe acudir en una urbanización o conjunto cerrado antes de llamar a la Policía?',
          options: [
            { label: 'El Comité de Convivencia de la copropiedad.', isCorrect: true, explanation: '¡Correcto! La Ley 675 de Propiedad Horizontal establece el Comité de Convivencia para mediar pacíficamente.' },
            { label: 'Publicar insultos en las carteleras del ascensor.', isCorrect: false, explanation: 'Incorrecto: eso genera difamación y empeora la convivencia.' },
            { label: 'Contratar seguridad privada armada.', isCorrect: false, explanation: 'Falso.' },
          ],
        },
      },
      {
        text: 'Subes amablemente a su apartamento, le explicas con empatía que en las torres el balcón amplifica el sonido y que hay personas en turno de descanso, o activas el Comité de Convivencia interno.',
        type: 'assertive',
        dbChange: -28,
        stressChange: -20,
        harmonyChange: +45,
        pointsDelta: +330,
        feedback: '¡Excelente resultado! El vecino comprende que el balcón no es apto para bafles, mete la música a su sala y baja el volumen. Todo el bloque recupera la calma.',
        behaviorNote: 'La conversación cara a cara, desarmada y empática, soluciona más del 85% de los roces en conjuntos cerrados.',
      },
    ],
  },
];

interface NoiseMiniGameProps {
  onOpenChatbot?: (scenario: string) => void;
  onNavigateSection?: (section: NavSection) => void;
  onOpenLearnMore?: (section: NavSection) => void;
}

export const NoiseMiniGame: React.FC<NoiseMiniGameProps> = ({
  onOpenChatbot,
  onNavigateSection,
  onOpenLearnMore,
}) => {
  // Character coordinates on the 2D Map (0 to 100%)
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 50, y: 88 });
  const [playerFacing, setPlayerFacing] = useState<'up' | 'down' | 'left' | 'right'>('up');
  const [isWalking, setIsWalking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Scores & Penalties System
  const [score, setScore] = useState<number>(500); // Base initial score
  const [streak, setStreak] = useState<number>(0);
  const [penaltiesCount, setPenaltiesCount] = useState<number>(0);
  const [scoreAnimation, setScoreAnimation] = useState<{ text: string; isPositive: boolean } | null>(null);

  // Solved state per scenario
  const [solvedScenarios, setSolvedScenarios] = useState<Record<string, 'assertive' | 'passive' | 'aggressive'>>({});
  
  // Active encounter popup state
  const [activeScenario, setActiveScenario] = useState<GameScenario | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Penitencia interactive state
  const [activePenitencia, setActivePenitencia] = useState<PenitenciaData | null>(null);
  const [penitenciaCompleted, setPenitenciaCompleted] = useState<boolean>(false);
  const [breathTimer, setBreathTimer] = useState<number>(5);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [pledgeSigned, setPledgeSigned] = useState<boolean>(false);

  // Overall city stats
  const [currentDb, setCurrentDb] = useState<number>(85);
  const [harmonyScore, setHarmonyScore] = useState<number>(50);
  const [stressLevel, setStressLevel] = useState<number>(50);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Audio synthesizer via Web Audio API
  const playSoundEffect = (type: 'step' | 'alert' | 'success' | 'fail' | 'penitencia' | 'coin') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'step') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, ctx.currentTime);
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'alert' || type === 'fail') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, ctx.currentTime);
        osc.frequency.setValueAtTime(260, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.28);
      } else if (type === 'penitencia') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'success') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
        });
      }
    } catch {
      // Audio fallback
    }
  };

  // Move character helper with collision borders
  const moveCharacter = (dx: number, dy: number, facing: 'up' | 'down' | 'left' | 'right') => {
    if (activeScenario) return;
    setPlayerFacing(facing);
    setIsWalking(true);
    playSoundEffect('step');

    setPlayerPos((prev) => {
      const nextX = Math.max(6, Math.min(94, prev.x + dx));
      const nextY = Math.max(8, Math.min(92, prev.y + dy));

      for (const sc of SCENARIOS) {
        if (!solvedScenarios[sc.id]) {
          const dist = Math.hypot(nextX - sc.mapX, nextY - sc.mapY);
          if (dist < 9.5) {
            playSoundEffect('alert');
            setActiveScenario(sc);
            setSelectedOptionIndex(null);
            setActivePenitencia(null);
            setPenitenciaCompleted(false);
            setToastMessage(`¡Entraste en "${sc.title}"! Nivel sonoro: ${sc.initialDb} dB`);
            setTimeout(() => setToastMessage(null), 3500);
            break;
          }
        }
      }

      return { x: nextX, y: nextY };
    });

    setTimeout(() => setIsWalking(false), 180);
  };

  // Keyboard navigation listener (Arrow keys + WASD)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeScenario) return;
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        moveCharacter(0, -4, 'up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        moveCharacter(0, 4, 'down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        moveCharacter(-4, 0, 'left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        moveCharacter(4, 0, 'right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScenario, solvedScenarios]);

  // Click on map to move
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeScenario || !mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const dx = clickX - playerPos.x;
    const dy = clickY - playerPos.y;

    const facing = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    setPlayerFacing(facing);

    setPlayerPos({
      x: Math.max(6, Math.min(94, clickX)),
      y: Math.max(8, Math.min(92, clickY)),
    });
    playSoundEffect('step');

    for (const sc of SCENARIOS) {
      if (!solvedScenarios[sc.id]) {
        const dist = Math.hypot(clickX - sc.mapX, clickY - sc.mapY);
        if (dist < 11) {
          playSoundEffect('alert');
          setActiveScenario(sc);
          setSelectedOptionIndex(null);
          setActivePenitencia(null);
          setPenitenciaCompleted(false);
          setToastMessage(`¡Llegaste a "${sc.title}"!`);
          setTimeout(() => setToastMessage(null), 3000);
          break;
        }
      }
    }
  };

  // Option selection inside encounter modal
  const handleSelectOption = (index: number) => {
    if (!activeScenario || selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);

    const opt = activeScenario.options[index];
    const newDb = Math.max(30, Math.min(125, currentDb + opt.dbChange));
    const newHarmony = Math.max(0, Math.min(100, harmonyScore + opt.harmonyChange));
    const newStress = Math.max(0, Math.min(100, stressLevel + opt.stressChange));

    setCurrentDb(newDb);
    setHarmonyScore(newHarmony);
    setStressLevel(newStress);

    if (opt.type === 'assertive') {
      // Calculate score with streak bonus
      const streakBonus = streak * 50;
      const totalGain = opt.pointsDelta + streakBonus;
      setScore((prev) => prev + totalGain);
      setStreak((prev) => prev + 1);
      setScoreAnimation({ text: `+${totalGain} pts`, isPositive: true });
      setTimeout(() => setScoreAnimation(null), 2500);

      playSoundEffect('success');
      const updatedSolved = { ...solvedScenarios, [activeScenario.id]: opt.type };
      setSolvedScenarios(updatedSolved);

      if (Object.keys(updatedSolved).length === SCENARIOS.length) {
        setTimeout(() => {
          setGameFinished(true);
        }, 1500);
      }
    } else {
      // Incorrect choice: Deduct points, reset streak, trigger Penitencia!
      setScore((prev) => Math.max(0, prev + opt.pointsDelta));
      setStreak(0);
      setPenaltiesCount((prev) => prev + 1);
      setScoreAnimation({ text: `${opt.pointsDelta} pts`, isPositive: false });
      setTimeout(() => setScoreAnimation(null), 2500);

      playSoundEffect('penitencia');

      // Trigger penitencia card
      if (opt.penitencia) {
        setActivePenitencia(opt.penitencia);
        setPenitenciaCompleted(false);
        setBreathTimer(5);
        setIsBreathing(false);
        setSelectedTriviaOption(null);
        setPledgeSigned(false);
      }
    }
  };

  // Handle guided breathing penitencia timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isBreathing && breathTimer > 0) {
      interval = setInterval(() => {
        setBreathTimer((prev) => prev - 1);
      }, 1000);
    } else if (isBreathing && breathTimer === 0) {
      setIsBreathing(false);
      setPenitenciaCompleted(true);
      setScore((prev) => prev + 80);
      setStressLevel((prev) => Math.max(10, prev - 20));
      setScoreAnimation({ text: '+80 pts (Penitencia Superada)', isPositive: true });
      setTimeout(() => setScoreAnimation(null), 2500);
      playSoundEffect('coin');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing, breathTimer]);

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathTimer(5);
  };

  const handleTriviaAnswer = (optionIdx: number, isCorrect: boolean) => {
    setSelectedTriviaOption(optionIdx);
    if (isCorrect) {
      setPenitenciaCompleted(true);
      setScore((prev) => prev + 100);
      setScoreAnimation({ text: '+100 pts (Comparendo Cancelado)', isPositive: true });
      setTimeout(() => setScoreAnimation(null), 2500);
      playSoundEffect('coin');
    } else {
      playSoundEffect('fail');
    }
  };

  const handleSignPledge = () => {
    setPledgeSigned(true);
    setPenitenciaCompleted(true);
    setScore((prev) => prev + 90);
    setScoreAnimation({ text: '+90 pts (Compromiso Firmado)', isPositive: true });
    setTimeout(() => setScoreAnimation(null), 2500);
    playSoundEffect('coin');
  };

  const handleRedirectToEducationalSection = (section: NavSection) => {
    setActiveScenario(null);
    setSelectedOptionIndex(null);
    setActivePenitencia(null);
    
    if (onNavigateSection) {
      onNavigateSection(section);
    }
    if (onOpenLearnMore) {
      onOpenLearnMore(section);
    }
  };

  const handleRetryScenario = () => {
    setSelectedOptionIndex(null);
    setActivePenitencia(null);
    setPenitenciaCompleted(false);
  };

  const handleCloseEncounter = () => {
    setActiveScenario(null);
    setSelectedOptionIndex(null);
    setActivePenitencia(null);
  };

  const handleRestart = () => {
    setPlayerPos({ x: 50, y: 88 });
    setPlayerFacing('up');
    setSolvedScenarios({});
    setActiveScenario(null);
    setSelectedOptionIndex(null);
    setActivePenitencia(null);
    setCurrentDb(85);
    setHarmonyScore(50);
    setStressLevel(50);
    setScore(500);
    setStreak(0);
    setPenaltiesCount(0);
    setGameFinished(false);
  };

  const getDbColor = (db: number) => {
    if (db <= 55) return { bg: 'bg-emerald-500', text: 'text-emerald-700', label: 'Zona Saludable OMS' };
    if (db <= 75) return { bg: 'bg-amber-500', text: 'text-amber-700', label: 'Precaución Acústica' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', label: 'Nivel Nocivo / Estrés' };
  };

  const dbStatus = getDbColor(currentDb);
  const solvedCount = Object.keys(solvedScenarios).length;

  return (
    <section id="juego" className="relative w-full py-10 md:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Medellín · Corregimiento San Antonio de Prado</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Desafío Sonoro: <span className="text-emerald-600">Puntajes y Penitencias</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Acumula <strong>Puntos de Conciencia Acústica</strong> por decisiones asertivas. Si tomas una mala decisión recibirás una <strong>Penitencia Pedagógica</strong> (trivia, respiración o comparendo cívico) para redimirte.
          </p>
        </div>

        {/* Live Gauges Dashboard WITH SCORES AND STREAK */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs relative">
          
          {/* Score Counter */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block leading-none">
                Puntos Cívicos
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-black font-mono text-amber-950 tabular-nums">
                  {score}
                </span>
                <span className="text-[10px] font-mono text-amber-600 font-bold">pts</span>
              </div>
            </div>
          </div>

          {/* Streak & Multiplier */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${streak > 0 ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
              <Flame className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                Racha Asertiva
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-slate-900 tabular-nums">
                x{streak}
              </span>
            </div>
          </div>

          {/* Decibel Meter */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs ${dbStatus.bg}`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                Ruido en Prado
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-black font-mono text-slate-900 tabular-nums">
                  {currentDb}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">dB</span>
              </div>
            </div>
          </div>

          {/* Harmony */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                Convivencia
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-emerald-700 tabular-nums">
                {harmonyScore}%
              </span>
            </div>
          </div>

          {/* Penalties & Sound Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block leading-none">
                Penitencias
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-rose-700">
                {penaltiesCount}
              </span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title={soundEnabled ? 'Silenciar efectos sonoros' : 'Activar efectos sonoros'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>

          {/* Floating Score Delta Notification */}
          {scoreAnimation && (
            <div
              className={`absolute top-2 right-4 px-3 py-1 rounded-full text-xs font-bold font-mono shadow-md animate-bounce z-40 ${
                scoreAnimation.isPositive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {scoreAnimation.text}
            </div>
          )}

        </div>

        {/* 2D Interactive Map of San Antonio de Prado */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[560px] bg-[#dcfce7] rounded-3xl overflow-hidden border-4 border-slate-800 shadow-xl select-none">
          
          <div
            ref={mapContainerRef}
            onClick={handleMapClick}
            className="relative w-full h-full cursor-crosshair overflow-hidden"
          >
            <svg viewBox="0 0 1000 600" className="w-full h-full pointer-events-none" preserveAspectRatio="none">
              <defs>
                <pattern id="mountainGrass" width="30" height="30" patternUnits="userSpaceOnUse">
                  <rect width="30" height="30" fill="#dcfce7" />
                  <path d="M 5,20 Q 15,10 25,20" fill="none" stroke="#bbf7d0" strokeWidth="1.5" />
                </pattern>
              </defs>

              <rect width="1000" height="600" fill="url(#mountainGrass)" />

              {/* Quebrada Doña María */}
              <path
                d="M 100,0 Q 250,180 350,300 T 550,420 T 900,600"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="18"
                opacity="0.75"
              />
              <text x="310" y="240" fill="#1e40af" fontSize="11" fontWeight="bold" transform="rotate(35 310,240)">
                Quebrada Doña María
              </text>

              {/* Vía Principal San Antonio de Prado - Itagüí */}
              <rect x="0" y="270" width="1000" height="65" fill="#334155" />
              <line x1="0" y1="302" x2="1000" y2="302" stroke="#facc15" strokeWidth="3" strokeDasharray="14 10" />
              <text x="70" y="295" fill="#f8fafc" fontSize="11" fontWeight="bold">
                VÍA PRINCIPAL A MEDELLÍN (SUBIDA EL CHUSCAL)
              </text>

              {/* Transversal road */}
              <rect x="460" y="0" width="75" height="600" fill="#334155" />
              <line x1="497" y1="0" x2="497" y2="600" stroke="#facc15" strokeWidth="3" strokeDasharray="14 10" />

              {/* Sidewalks */}
              <rect x="0" y="258" width="1000" height="12" fill="#cbd5e1" />
              <rect x="0" y="335" width="1000" height="12" fill="#cbd5e1" />
              <rect x="448" y="0" width="12" height="600" fill="#cbd5e1" />
              <rect x="535" y="0" width="12" height="600" fill="#cbd5e1" />

              {/* 1. TOP-LEFT: Vereda Potrerito / Fincas Campesinas */}
              <g>
                <rect x="70" y="50" width="230" height="140" rx="14" fill="#f0fdf4" stroke="#15803d" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="185" y="75" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">
                  VEREDA POTRERITO & EL SALADO
                </text>
                <rect x="110" y="95" width="60" height="40" fill="#ffffff" stroke="#166534" strokeWidth="2" />
                <polygon points="140,80 100,95 180,95" fill="#b91c1c" />
                <circle cx="210" cy="120" r="14" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                <text x="210" y="124" textAnchor="middle" fill="#1e3a8a" fontSize="8">Piscina</text>
              </g>

              {/* 2. TOP-RIGHT: Sector Naranjitos & Escuelas */}
              <g>
                <rect x="680" y="50" width="240" height="140" rx="14" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="800" y="75" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
                  BARRIO NARANJITOS / LA PRADERA
                </text>
                <rect x="730" y="95" width="70" height="45" fill="#fef9c3" stroke="#b45309" strokeWidth="2" />
                <polygon points="765,80 720,95 810,95" fill="#dc2626" />
                <rect x="820" y="100" width="50" height="40" fill="#ffffff" stroke="#64748b" />
              </g>

              {/* 3. BOTTOM-LEFT: Parque Principal San Antonio de Prado */}
              <g>
                <rect x="70" y="390" width="240" height="160" rx="14" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
                <text x="190" y="415" textAnchor="middle" fill="#9a3412" fontSize="12" fontWeight="bold">
                  PARQUE PRINCIPAL & CANTINAS
                </text>
                <polygon points="130,440 145,410 160,440" fill="#dc2626" />
                <rect x="130" y="440" width="30" height="40" fill="#ffffff" stroke="#991b1b" strokeWidth="2" />
                <circle cx="145" cy="455" r="4" fill="#facc15" />
                <rect x="180" y="445" width="90" height="35" rx="4" fill="#ea580c" />
                <text x="225" y="466" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Bares & Estancos</text>
              </g>

              {/* 4. BOTTOM-RIGHT: Urbanización El Limonar / Barichara */}
              <g>
                <rect x="670" y="380" width="250" height="170" rx="14" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2.5" />
                <text x="795" y="405" textAnchor="middle" fill="#075985" fontSize="12" fontWeight="bold">
                  URBANIZACIÓN EL LIMONAR / BARICHARA
                </text>
                <rect x="710" y="420" width="60" height="110" rx="4" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
                <rect x="790" y="420" width="60" height="110" rx="4" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
                <rect x="715" y="440" width="50" height="8" fill="#38bdf8" />
                <rect x="715" y="470" width="50" height="8" fill="#38bdf8" />
                <rect x="795" y="440" width="50" height="8" fill="#38bdf8" />
                <rect x="795" y="470" width="50" height="8" fill="#38bdf8" />
              </g>

              {/* Motos on Main Road */}
              <g>
                <circle cx="320" cy="290" r="6" fill="#1e293b" />
                <circle cx="340" cy="290" r="6" fill="#1e293b" />
                <path d="M 320 290 L 330 282 L 340 290 Z" fill="#ef4444" stroke="#991b1b" />
                <text x="325" y="278" fill="#fca5a5" fontSize="8" fontWeight="bold">¡Brumm!</text>

                <circle cx="620" cy="320" r="6" fill="#1e293b" />
                <circle cx="640" cy="320" r="6" fill="#1e293b" />
                <path d="M 620 320 L 630 312 L 640 320 Z" fill="#eab308" stroke="#a16207" />
              </g>
            </svg>

            {/* Scenario Hotspot Markers */}
            {SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              const isResolved = !!solvedScenarios[sc.id];
              const resolutionType = solvedScenarios[sc.id];
              const dist = Math.hypot(playerPos.x - sc.mapX, playerPos.y - sc.mapY);
              const isNearby = dist < 14;

              return (
                <div
                  key={sc.id}
                  style={{ left: `${sc.mapX}%`, top: `${sc.mapY}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveScenario(sc);
                    setSelectedOptionIndex(null);
                    setActivePenitencia(null);
                    setPenitenciaCompleted(false);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                >
                  {!isResolved && (
                    <div className="absolute inset-0 -m-3 rounded-full border-2 border-rose-500/60 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border-2 transition-all duration-300 shadow-md ${
                      isResolved
                        ? resolutionType === 'assertive'
                          ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-200'
                          : 'bg-amber-500 text-white border-amber-400'
                        : isNearby
                        ? 'bg-rose-600 text-white border-white scale-115 ring-4 ring-rose-300 shadow-xl'
                        : 'bg-slate-900 text-white border-slate-700 hover:scale-105'
                    }`}
                  >
                    {isResolved ? (
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}

                    <span
                      className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                      }`}
                    >
                      {isResolved ? 'CALMA' : `${sc.initialDb}dB`}
                    </span>
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-none flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{sc.sectorName}</span>
                  </div>
                </div>
              );
            })}

            {/* PLAYER CHARACTER */}
            <div
              style={{
                left: `${playerPos.x}%`,
                top: `${playerPos.y}%`,
                transition: 'left 150ms ease-out, top 150ms ease-out',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-10 h-10 -ml-5 -mt-5 absolute rounded-full bg-emerald-500/25 animate-ping" />

              <div className={`relative w-9 h-11 sm:w-11 sm:h-13 filter drop-shadow-md transition-transform ${isWalking ? 'scale-105' : 'scale-100'}`}>
                <svg viewBox="0 0 40 48" className="w-full h-full">
                  <ellipse cx="20" cy="45" rx="12" ry="3" fill="#000000" opacity="0.25" />
                  <rect x="14" y="32" width="4" height="12" rx="2" fill="#1e293b" />
                  <rect x="22" y="32" width="4" height="12" rx="2" fill="#1e293b" />
                  <rect x="13" y="42" width="6" height="4" rx="2" fill="#475569" />
                  <rect x="21" y="42" width="6" height="4" rx="2" fill="#475569" />

                  <rect x="10" y="18" width="20" height="16" rx="5" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
                  <line x1="18" y1="20" x2="18" y2="26" stroke="#86efac" strokeWidth="1.2" />
                  <line x1="22" y1="20" x2="22" y2="26" stroke="#86efac" strokeWidth="1.2" />

                  <circle cx="20" cy="12" r="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
                  
                  {playerFacing === 'left' && <circle cx="15" cy="12" r="1.5" fill="#1e293b" />}
                  {playerFacing === 'right' && <circle cx="25" cy="12" r="1.5" fill="#1e293b" />}
                  {playerFacing === 'down' && (
                    <>
                      <circle cx="17" cy="12" r="1.5" fill="#1e293b" />
                      <circle cx="23" cy="12" r="1.5" fill="#1e293b" />
                      <path d="M 18 15 Q 20 17 22 15" stroke="#78350f" strokeWidth="1" fill="none" />
                    </>
                  )}
                  {playerFacing === 'up' && <circle cx="20" cy="11" r="7.5" fill="#451a03" />}

                  <path d="M 12 12 C 12 4 28 4 28 12" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                  <rect x="10" y="9" width="3" height="6" rx="1.5" fill="#166534" />
                  <rect x="27" y="9" width="3" height="6" rx="1.5" fill="#166534" />
                </svg>
              </div>

              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-700 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <span>¡Tú!</span>
              </div>
            </div>

            {/* In-game Toast Notification */}
            {toastMessage && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Controls banner */}
            <div className="absolute bottom-3 left-3 z-30 bg-slate-900/85 backdrop-blur-xs text-white p-2.5 rounded-xl text-[11px] max-w-xs shadow-md border border-slate-700 pointer-events-none hidden sm:block">
              <span className="font-bold text-emerald-400 block mb-0.5">🕹️ Controles:</span>
              <p className="text-slate-300 leading-tight">
                Flechas del teclado, <strong>W A S D</strong> o <strong>haz clic en el mapa</strong> para moverte por San Antonio de Prado.
              </p>
            </div>

          </div>

          {/* Touch D-PAD */}
          <div className="absolute bottom-3 right-3 z-30 flex flex-col items-center bg-slate-900/80 backdrop-blur-xs p-1.5 rounded-2xl border border-slate-700 shadow-xl">
            <button
              onClick={() => moveCharacter(0, -6, 'up')}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
              aria-label="Caminar arriba"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 my-1">
              <button
                onClick={() => moveCharacter(-6, 0, 'left')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
                aria-label="Caminar izquierda"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-6 h-6 rounded-md bg-emerald-600/30 flex items-center justify-center text-emerald-400">
                <Footprints className="w-3.5 h-3.5" />
              </div>
              <button
                onClick={() => moveCharacter(6, 0, 'right')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
                aria-label="Caminar derecha"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => moveCharacter(0, 6, 'down')}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
              aria-label="Caminar abajo"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ACTIVE SCENARIO ENCOUNTER MODAL */}
        {activeScenario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Encounter Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <activeScenario.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Problemática en San Antonio de Prado · {activeScenario.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {activeScenario.title}
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{activeScenario.sectorName}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Nivel Inicial</span>
                  <span className="text-lg font-black font-mono text-rose-600">{activeScenario.initialDb} dB</span>
                </div>
              </div>

              {/* Story Prompt */}
              <div className="mb-5 space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {activeScenario.story}
                </p>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>{activeScenario.dilemma}</span>
                </h4>
              </div>

              {/* 3 Decision Options */}
              <div className="space-y-2.5 mb-5">
                {activeScenario.options.map((option, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isResolved = selectedOptionIndex !== null;
                  const isCorrect = option.type === 'assertive';

                  let borderStyle = 'border-slate-200 hover:border-emerald-500 hover:bg-slate-50';
                  if (isResolved) {
                    if (isSelected && isCorrect) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      borderStyle = 'border-rose-400 bg-rose-50/80 ring-2 ring-rose-200';
                    } else if (isCorrect) {
                      borderStyle = 'border-emerald-300 bg-emerald-50/30';
                    } else {
                      borderStyle = 'border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isResolved}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${borderStyle}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono ${
                          isSelected && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isSelected && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                          {option.text}
                        </p>

                        {isResolved && isSelected && (
                          <div className="mt-2 flex items-center gap-2 text-xs font-bold font-mono">
                            <span
                              className={`px-2 py-0.5 rounded-md ${
                                option.dbChange < 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {option.dbChange < 0 ? `${option.dbChange} dB` : `+${option.dbChange} dB`}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md ${
                                option.pointsDelta > 0
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}
                            >
                              {option.pointsDelta > 0 ? `+${option.pointsDelta} pts` : `${option.pointsDelta} pts`}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* POST-CHOICE FEEDBACK & PENITENCIA CARDS */}
              {selectedOptionIndex !== null && (
                <div className="space-y-3 mb-5">
                  {(() => {
                    const pickedOpt = activeScenario.options[selectedOptionIndex];
                    const isCorrect = pickedOpt.type === 'assertive';

                    if (isCorrect) {
                      return (
                        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-emerald-400">
                              <ShieldCheck className="w-4 h-4" />
                              <span>¡Excelente Elección Asertiva en San Antonio de Prado!</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                              +{pickedOpt.pointsDelta + (streak > 1 ? (streak - 1) * 50 : 0)} pts {streak > 1 ? `(Racha x${streak})` : ''}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {pickedOpt.feedback}
                          </p>
                          <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300">
                            💡 <strong>Clave de Convivencia Pradense:</strong> {pickedOpt.behaviorNote}
                          </div>
                        </div>
                      );
                    }

                    // INCORRECT ANSWER: PENALTY (PENITENCIA)
                    return (
                      <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-slate-900 space-y-4 animate-in shake duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-rose-700">
                            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>Conducta Sancionada: {pickedOpt.pointsDelta} puntos</span>
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-200 px-2 py-0.5 rounded-md">
                            ¡Penitencia Activada!
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {pickedOpt.feedback}
                        </p>

                        {/* INTERACTIVE PENITENCIA COMPONENT */}
                        {activePenitencia && (
                          <div className="p-4 rounded-2xl bg-white border-2 border-rose-300 shadow-sm space-y-3">
                            <div className="flex items-center gap-2">
                              <Scale className="w-4 h-4 text-rose-600" />
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                                {activePenitencia.title}
                              </h5>
                              <span className="ml-auto text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                                {activePenitencia.badge}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {activePenitencia.description}
                            </p>

                            {/* 1. TRIVIA PENITENCIA */}
                            {activePenitencia.type === 'trivia' && (
                              <div className="space-y-2 pt-2 border-t border-slate-100">
                                <span className="font-bold text-xs text-slate-800 block">
                                  {activePenitencia.question}
                                </span>
                                <div className="space-y-1.5">
                                  {activePenitencia.options?.map((tOpt, tIdx) => {
                                    const isPicked = selectedTriviaOption === tIdx;
                                    let btnStyle = 'border-slate-200 hover:border-emerald-400 bg-slate-50';
                                    if (selectedTriviaOption !== null) {
                                      if (tOpt.isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                                      else if (isPicked) btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                                    }

                                    return (
                                      <button
                                        key={tIdx}
                                        disabled={selectedTriviaOption !== null}
                                        onClick={() => handleTriviaAnswer(tIdx, tOpt.isCorrect)}
                                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                                      >
                                        <span>{tOpt.label}</span>
                                        {selectedTriviaOption !== null && tOpt.isCorrect && (
                                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* 2. BREATHING PENITENCIA */}
                            {activePenitencia.type === 'breath' && (
                              <div className="pt-2 border-t border-slate-100 text-center space-y-3">
                                {!isBreathing && !penitenciaCompleted ? (
                                  <button
                                    onClick={handleStartBreathing}
                                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 mx-auto cursor-pointer"
                                  >
                                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Comenzar Ejercicio de Calma (5s)</span>
                                  </button>
                                ) : isBreathing ? (
                                  <div className="space-y-2 py-2">
                                    <div className="w-14 h-14 rounded-full bg-emerald-100 border-4 border-emerald-400 mx-auto flex items-center justify-center animate-pulse">
                                      <span className="text-xl font-bold font-mono text-emerald-800">{breathTimer}s</span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium block">
                                      Inhala profundo... calma tus pulsaciones...
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            )}

                            {/* 3. PLEDGE PENITENCIA */}
                            {activePenitencia.type === 'pledge' && (
                              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs italic text-slate-700">
                                  "{activePenitencia.pledgeText}"
                                </div>
                                {!pledgeSigned && (
                                  <button
                                    onClick={handleSignPledge}
                                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                                  >
                                    <FileCheck className="w-3.5 h-3.5" />
                                    <span>Firmar Compromiso Digital</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Penitencia Completed Banner */}
                            {penitenciaCompleted && (
                              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>¡Penitencia Cumplida! Has saldado tu comparendo pedagógico.</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Direct link to page explanation & retry */}
                        <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            <span>Información correcta en la landing:</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {activeScenario.educationalTarget.explanation}
                          </p>

                          <div className="pt-1 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => handleRedirectToEducationalSection(activeScenario.educationalTarget.section)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Ver información en "{activeScenario.educationalTarget.sectionTitle}"</span>
                            </button>

                            <button
                              onClick={handleRetryScenario}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Reintentar este dilema</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                {selectedOptionIndex !== null ? (
                  activeScenario.options[selectedOptionIndex].type === 'assertive' ? (
                    <button
                      onClick={handleCloseEncounter}
                      className="w-full sm:w-auto ml-auto px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                    >
                      Continuar Explorando San Antonio de Prado
                    </button>
                  ) : null
                ) : (
                  <button
                    onClick={handleCloseEncounter}
                    className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Retirarse por ahora
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GAME FINISHED: VICTORY DIPLOMA WITH FINAL SCORE & CLASSIFICATION */}
        {gameFinished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in zoom-in-95 duration-300">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-inner">
                <Trophy className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  ¡San Antonio de Prado en Paz Acústica!
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {score >= 1200
                    ? '🏆 Héroe Acústico de San Antonio de Prado'
                    : score >= 800
                    ? '🥈 Líder de Convivencia Pradense'
                    : '🥉 Ciudadano en Formación Acústica'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1">
                  Pacificaste los 5 puntos críticos con un puntaje final de <strong className="font-mono text-amber-700">{score} puntos</strong> y un <strong className="text-slate-900">{harmonyScore}%</strong> de convivencia.
                </p>
              </div>

              {/* Detailed Score & Stats Breakdown */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Puntaje Final</span>
                  <span className="text-base font-bold font-mono text-amber-600">{score} pts</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Penitencias</span>
                  <span className="text-base font-bold font-mono text-rose-600">{penaltiesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Nivel Final</span>
                  <span className="text-base font-bold font-mono text-emerald-700">{currentDb} dB</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>Jugar otra vez</span>
                </button>

                {onOpenChatbot && (
                  <button
                    onClick={() => {
                      setGameFinished(false);
                      onOpenChatbot('General');
                    }}
                    className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                    <span>Consultar al Asistente IA</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
