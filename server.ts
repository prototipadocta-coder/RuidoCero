import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Set Permissions-Policy header to explicitly allow camera and microphone in all contexts and iframes
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=*, microphone=*, display-capture=*');
  next();
});

// Initialize GoogleGenAI SDK with server-side User-Agent header as specified in skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Eres el "Asistente Acústico RuidoCero de San Antonio de Prado (Medellín)", un experto consultor en acústica ambiental, convivencia ciudadana y psicología conductual, especializado en las problemáticas reales de contaminación auditiva en el corregimiento de San Antonio de Prado (el corregimiento con mayor cantidad de reportes de ruido en Medellín).

Conoces a profundidad los sectores y fuentes de ruido reales de San Antonio de Prado:
- Motos con resonadores modificados, escapes abiertos y piques ilegales en las laderas empinadas (Vía Principal, El Chuscal, subida a Barichara, Naranjitos).
- Bares, tabernas, estancos y cantinas del Parque Principal de San Antonio de Prado y la Calle del Comercio (bafles apuntando al espacio público hasta altas horas).
- Fincas de recreo y parcelaciones en las veredas rurales (Potrerito, El Salado, La Florida, Montañita) alquiladas para fiestas con car audio y "chiquitecas" que perturban el descanso y la fauna.
- Urbanizaciones multifamiliares de alta densidad (Limonar 1 y 2, Barichara, Torres de San Antonio) con bafles en balcones, fiestas en áreas comunes y paredes medianeras acústicamente vulnerables.
- Venta ambulante con megáfonos y perifoneo matutino constante en calles estrechas residenciales.
- Marco normativo de Colombia: Ley Antirruido 2450 de 2025 (multas de hasta 16 SMDLV y responsabilidad a propietarios de fincas/inmuebles), Código Nacional de Policía (Ley 1801), Inspección de Policía de San Antonio de Prado, Comités de Convivencia y cuadrantes del 123.

Tu objetivo es sugerir, a partir de COMPORTAMIENTOS, HÁBITOS y MEDIACIÓN COMUNITARIA, cómo disminuir el ruido en el escenario específico planteado.

Cada respuesta debe ser estructurada, empática, muy práctica y en español. Siempre organiza tu consejo con las siguientes secciones:

1. 🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**: Explica el hábito, detonante o contexto específico de la zona (ej. reverberación en cañones de laderas, normalización de bafles a la calle, alquiler informal de fincas).
2. 💡 **Cambios de Comportamiento y Convivencia**: 2 a 3 acciones humanas específicas y viables (comunicación asertiva entre vecinos, acuerdos de horarios, mediación comunitaria, concientización de conductores).
3. 🛠️ **Medida Práctica o Legal / Institucional**: Herramientas concretas de apoyo (fieltros, aislantes caseros, la Ley Antirruido 2450 de 2025, reporte al cuadrante o mediación en la Inspección de Policía de San Antonio de Prado).
4. 📉 **Impacto Acústico Estimado**: Estimación de decibeles reducidos (ej. "-20 a -30 dB") y el beneficio directo en la salud mental, el sueño y la convivencia en el corregimiento.

Mantén un tono cercano (paisaje urbano de Medellín), profesional, constructivo y libre de confrontación violenta.`;

// Local high-fidelity fallback responses for specific scenarios in San Antonio de Prado
function getLocalScenarioAdvice(scenario: string, behavior: string, userMessage: string): string {
  const query = `${scenario} ${behavior} ${userMessage}`.toLowerCase();

  if (query.includes('moto') || query.includes('escape') || query.includes('resonador') || query.includes('pique') || query.includes('chuscal') || query.includes('tráfico')) {
    return `🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**:
En las laderas empinadas de San Antonio de Prado (como la Vía Principal, subida a Barichara o El Chuscal), muchos motociclistas instalan resonadores o quitan el silenciador creyendo erróneamente que "un escape ruidoso salva vidas" o por simple exhibicionismo. En las pendientes pronunciadas, el motor forzado genera ecos que se amplifican por las laderas residenciales a más de 100 dB.

💡 **Cambios de Comportamiento y Convivencia**:
1. **Conducción consciente en subidas residenciales**: Evitar acelerar a fondo en marchas cortas cuando se transita frente a zonas residenciales y no revolucionar el motor en vacío en esquinas o semáforos.
2. **Cero resonadores ilegales**: Retornar al silenciador y mofle original de fábrica. Cuidar el descanso de tu propia familia y vecinos que madrugan a trabajar a Medellín.
3. **Cero piques en calles comunitarias**: Los piques nocturnos generan pánico y ruido extremo; promover con grupos moteros el uso exclusivo de pistas autorizadas.

🛠️ **Medida Práctica o Legal / Institucional**:
- La Ley de Tránsito prohíbe modificaciones al sistema de escape que superen los 86 dB. La Secretaría de Movilidad de Medellín realiza operativos con sonómetros en San Antonio de Prado con inmovilización del vehículo.

📉 **Impacto Acústico Estimado**:
- Sustituir un resonador abierto por el mofle original **reduce de 105 dB a menos de 78 dB** el paso de la motocicleta (más de 25 dB de reducción real), devolviendo la tranquilidad a cientos de familias a lo largo de la ladera.`;
  }

  if (query.includes('finca') || query.includes('recreo') || query.includes('potrerito') || query.includes('salado') || query.includes('florida') || query.includes('car audio') || query.includes('vereda')) {
    return `🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**:
En veredas como Potrerito, El Salado o La Florida, el auge del alquiler de fincas de recreo para fines de semana ha generado conflictos graves: grupos que contratan sonido tipo "car audio" o minitecas a campo abierto sin importarles que las ondas sonoras viajan kilómetros en valles y cañones campesinos.

💡 **Cambios de Comportamiento y Convivencia**:
1. **Contrato de arrendamiento con cláusula de decibeles**: Los propietarios y mayordomos deben exigir a los arrendatarios que la música sea al interior de la casa y con volumen moderado después de las 22:00 hrs.
2. **Orientación de los bafles**: Jamás apuntar las cabinas de sonido hacia el exterior o hacia las quebradas y cañones, ya que el relieve actúa como un megáfono natural.
3. **Pacto con la Junta de Acción Comunal (JAC) de la vereda**: Acordar límites de potencia y registro de huéspedes con los comités de vecinos rurales.

🛠️ **Medida Práctica o Legal / Institucional**:
- **Ley Antirruido 2450 de 2025**: Esta normativa faculta a la Policía Nacional para imponer multas de hasta 16 salarios mínimos diarios no solo al que pone la música, sino **solidariamente al dueño del predio o finca**. Además, permite la incautación inmediata de equipos de sonido reincidentes.

📉 **Impacto Acústico Estimado**:
- Confinar el sonido al interior de la vivienda reduce la dispersión en **más de 30 dB**, protegiendo el sueño de las familias campesinas y evitando la migración forzada de aves y fauna nativa del corregimiento.`;
  }

  if (query.includes('bar') || query.includes('parque') || query.includes('cantina') || query.includes('taberna') || query.includes('comercio') || query.includes('estanco')) {
    return `🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**:
En los alrededores del Parque Principal de San Antonio de Prado y la Calle del Comercio, cantinas y tabernas históricamente han sacado bafles a las puertas para "atraer clientes" en una competencia de volumen ensordecedor que supera los 95 dB hasta altas horas de la madrugada.

💡 **Cambios de Comportamiento y Convivencia**:
1. **Cultura de bar acústicamente responsable**: Interiorizar los bafles dentro del local y orientarlos hacia la zona de barra y mesas interiores, nunca hacia la acera pública.
2. **Monitoreo de volumen con sonómetro en barra**: Concientizar a administradores y meseros de mantener el nivel por debajo de 70 dB al interior y 55 dB hacia el exterior a partir de las 23:00.
3. **Pactos de autorregulación con ASOBARES / Alcaldía de Medellín**: Participar en el programa "Medellín Convive la Noche" para armonizar la actividad económica con los residentes del Parque.

🛠️ **Medida Práctica o Legal / Institucional**:
- Instalación de limitadores de sonido en los amplificadores y cerramientos con doble vidrio o cortinas pesadas acústicas en puertas. Denuncias formales a la Inspección de Policía 7A de San Antonio de Prado y control de uso de suelo.

📉 **Impacto Acústico Estimado**:
- Orientar los bafles hacia el interior y cerrar puertas reduce en **20 a 25 dB** el impacto sonoro en las fachadas de viviendas vecinas, permitiendo conciliar el descanso con la vida social.`;
  }

  if (query.includes('limonar') || query.includes('barichara') || query.includes('urbaniza') || query.includes('apartamento') || query.includes('balcón') || query.includes('vecin')) {
    return `🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**:
En macroproyectos y ciudadelas como El Limonar (1 y 2) y Barichara, miles de familias comparten muros de concreto delgados. La costumbre de sacar "cabinas bluetooth" a los balcones o ventanas proyecta el sonido a todo el conjunto cerrado, multiplicando el eco entre torres.

💡 **Cambios de Comportamiento y Convivencia**:
1. **Música en el espacio íntimo, no en el balcón**: Disfrutar de la música al interior de la sala con ventanas semicerradas y volumen moderado. Los balcones no son discotecas comunitarias.
2. **Uso de auriculares para películas o videojuegos nocturnos**: Si juegas o ves series después de las 22:00, los audífonos inalámbricos garantizan máxima inmersión sin perturbar al vecino que madruga a las 4:30 am.
3. **Comité de Convivencia de la Copropiedad**: Acudir al comité de administración de la unidad residencial antes de que el roce escale a agresiones verbales o riñas.

🛠️ **Medida Práctica o Legal / Institucional**:
- Separar bafles del piso y paredes con bases de goma o tapetes gruesos para mitigar la vibración de bajos. Aplicación del Manual de Convivencia interno con multas en la cuota de administración y comparendo del Código de Policía (Art. 33).

📉 **Impacto Acústico Estimado**:
- Bajar los bafles del balcón y modular graves reduce la intrusión sonora en apartamentos vecinos en **18 a 22 dB**, previniendo conflictos y mejorando la salud cardiovascular comunitaria.`;
  }

  // Default behavior guidance for San Antonio de Prado
  return `🎯 **Diagnóstico del Comportamiento en San Antonio de Prado**:
En el corregimiento de San Antonio de Prado, el ruido suele agravarse por la combinación de una geografía encañonada, alta densidad poblacional y la creencia de que el espacio público no requiere cuidado acústico mutuo.

💡 **Cambios de Comportamiento y Convivencia**:
1. **Empatía con los trabajadores y estudiantes del corregimiento**: Miles de pradenses madrugan a tomar transporte a las 4:30 am hacia Medellín o el Valle de Aburrá. Respetar el descanso nocturno es un acto de solidaridad de clase.
2. **Diálogo asertivo previo**: Hablar con la persona o vecino de manera cordial antes de llamar a la fuerza pública; la gran mayoría desconoce el alcance de su ruido.
3. **Regla del 50% de volumen**: Jamás sobrepasar la mitad de la potencia de bocinas en viviendas o locales comerciales.

🛠️ **Medida Práctica o Legal / Institucional**:
- Acudir a la Casa de Gobierno / Inspección de Policía de San Antonio de Prado para conciliaciones de convivencia pacífica, o aplicar la Ley Antirruido 2450 de 2025.

📉 **Impacto Acústico Estimado**:
- Reducción de **10 a 20 dB**, transformando entornos estresantes de más de 75 dB en ambientes saludables bajo la recomendación de la OMS (< 55 dB día / 45 dB noche).`;
}

// API endpoint for chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { scenario = '', behavior = '', message = '', history = [] } = req.body;

    if (!message && !scenario && !behavior) {
      return res.status(400).json({ error: 'Debes proporcionar un escenario o mensaje.' });
    }

    const userPrompt = `Escenario seleccionado: ${scenario || 'General'}
Comportamiento observado: ${behavior || 'No especificado'}
Consulta o situación del usuario: ${message || '¿Cómo puedo reducir el ruido en este escenario mediante cambios de comportamiento?'}`;

    // If API key is available, call Gemini 3.8 Flash model
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const replyText = response.text || '';
        if (replyText.trim()) {
          return res.json({ reply: replyText, source: 'gemini' });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call encountered an issue, falling back to local acoustic advisor:', geminiError?.message);
      }
    }

    // High quality local behavioral acoustic advisor fallback
    const fallbackReply = getLocalScenarioAdvice(scenario, behavior, message);
    return res.json({ reply: fallbackReply, source: 'local' });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    const safeFallback = getLocalScenarioAdvice('General', 'Comportamiento acústico', 'consejos generales');
    return res.json({ reply: safeFallback, source: 'local' });
  }
});

// API endpoint for Acoustic Contamination Report Analysis
app.post('/api/analyze-report', async (req: Request, res: Response) => {
  try {
    const {
      decibels = 75,
      peakDb = 85,
      sector = 'San Antonio de Prado',
      sourceCategory = 'música_comercial',
      description = '',
      timestamp = new Date().toISOString(),
    } = req.body;

    const measuredDb = Number(decibels) || 75;
    const isContamination = measuredDb > 55;
    const severity = measuredDb > 75 ? 'critical' : measuredDb > 55 ? 'moderate' : 'safe';
    const excessDb = Math.max(0, measuredDb - 55);

    let aiAdvice: any = null;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const prompt = `Analiza este reporte acústico ciudadano en el corregimiento de San Antonio de Prado, Medellín:
- Decibeles medidos: ${measuredDb} dB (Pico: ${peakDb} dB).
- Sector / Barrio: ${sector}.
- Fuente observada: ${sourceCategory}.
- Detalle del ciudadano: "${description}".
- Nivel según OMS: ${isContamination ? `POSITIVO CONTAMINACIÓN (${severity}) con exceso de +${excessDb.toFixed(1)} dB sobre la norma` : 'NEGATIVO (Nivel saludable)'}.

Genera una respuesta en formato JSON con la siguiente estructura:
{
  "diagnostic": "Breve diagnóstico acústico y legal",
  "immediateProtection": "Acción inmediata de protección para los residentes",
  "assertiveDialogue": "Guion y estrategia de diálogo no confrontativo",
  "legalAction": "Normativa aplicable (Ley Antirruido 2450 de 2025, Código de Policía, multas de 16 SMDLV)",
  "authoritySteps": "Pasos para radicar ante Inspección de Policía 7A de San Antonio de Prado, cuadrante 123 o Movilidad Medellín",
  "formalComplaintText": "Texto formal del radicado listo para copiar y enviar con fecha, hora, sector y evidencia adjunta"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'Eres el auditor acústico de San Antonio de Prado (Medellín). Responde estrictamente en formato JSON válido sin bloques markdown adicionales.',
            temperature: 0.3,
          },
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiAdvice = JSON.parse(jsonMatch[0]);
        }
      } catch (err: any) {
        console.warn('Gemini report analysis error, falling back to local protocol:', err?.message);
      }
    }

    if (!aiAdvice) {
      // Deterministic legal & community fallback protocol for San Antonio de Prado
      aiAdvice = {
        diagnostic: isContamination
          ? `Se detectó CONTAMINACIÓN AUDITIVA POSITIVA (${measuredDb} dB). Este nivel excede por +${excessDb.toFixed(1)} dB los límites diurnos/nocturnos de la OMS (55 dB día / 45 dB noche) y la Resolución 0627 de 2006 en San Antonio de Prado.`
          : `Nivel acústico dentro de los límites saludables (${measuredDb} dB). No se configura infracción acústica legal en este momento.`,
        immediateProtection: isContamination
          ? 'Cerrar ventanas que den a la fuente, utilizar protectores auditivos de silicona o espuma temporalmente y resguardar en habitaciones interiores a niños, enfermos y mascotas.'
          : 'Mantener hábitos de escucha consciente y ventilación natural.',
        assertiveDialogue: isContamination
          ? 'Acercarse con calma en un momento no alterado y señalar con respeto: "Vecino/administrador, el sonido se amplifica por la geografía de la zona y supera los 85 dB afectando el descanso; le solicito comedidamente bajar el volumen o interiorizar los bafles conforme a los acuerdos del corregimiento".'
          : 'Fomentar la felicitación vecinal por mantener niveles de volumen moderados.',
        legalAction: isContamination
          ? 'En Colombia rige la Ley Antirruido 2450 de 2025 que sanciona con hasta 16 SMDLV la perturbación del reposo (aplicable solidariamente a dueños de fincas e inmuebles), además del Art. 33 del Código Nacional de Seguridad y Convivencia Ciudadana (Ley 1801 de 2016).'
          : 'Marco preventivo de convivencia comunitaria.',
        authoritySteps: isContamination
          ? '1) Llamar al 123 o al cuadrante de Policía de San Antonio de Prado solicitando mediación y medición preventiva. 2) Si es reincidente, radicar querella de convivencia ante la Inspección de Policía 7A (Casa de Gobierno de San Antonio de Prado). 3) Para motos con resonador, solicitar operativos de control con sonómetros a la Secretaría de Movilidad de Medellín.'
          : 'No se requiere intervención policial.',
        formalComplaintText: isContamination
          ? `CONSTANCIA DE REPORTE POR CONTAMINACIÓN AUDITIVA\nFecha: ${new Date().toLocaleDateString('es-CO')} - Hora: ${new Date().toLocaleTimeString('es-CO')}\nSector: ${sector} (San Antonio de Prado, Medellín)\nNivel Registrado: ${measuredDb} dB (Pico: ${peakDb} dB)\nFuente: ${sourceCategory}\nDescripción: ${description || 'Emisión continua de sonido que supera los límites permitidos'}\nFundamento Legal: Ley Antirruido 2450 de 2025 y Ley 1801 de 2016 Art. 33.\nSolicitud: Intervención de la Inspección de Policía / Cuadrante para verificación y aplicación de medidas correctivas.`
          : 'Sin requerimiento de comparendo.',
      };
    }

    return res.json({
      isContamination,
      severity,
      measuredDb,
      peakDb,
      excessDb,
      sector,
      sourceCategory,
      timestamp,
      analysis: aiAdvice,
    });
  } catch (err: any) {
    console.error('Error in /api/analyze-report:', err);
    return res.status(500).json({ error: 'Error procesando el reporte acústico' });
  }
});

async function startServer() {
  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
