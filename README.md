# RuidoCero - Plataforma contra la Contaminación Auditiva (San Antonio de Prado)

Plataforma ciudadana interactiva para la concientización acústica, medición de decibeles con cámara y micrófono en tiempo real, sonómetro virtual, reportes comunitarios bajo la Ley Antirruido 2450 de 2025 y asesoría con Inteligencia Artificial.

---

## 🚀 Despliegue en Vercel (Paso a Paso)

Este proyecto está 100% preconfigurado para desplegarse en **Vercel** como una SPA de Vite con funciones serverless de Node.js en `/api`.

### Opción 1: Despliegue con GitHub (Recomendado)

1. **Sube el proyecto a tu repositorio de GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: RuidoCero listo para Vercel"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/ruidocero.git
   git push -u origin main
   ```

2. **Importa el proyecto en Vercel**:
   - Ingresa a [vercel.com](https://vercel.com) e inicia sesión.
   - Haz clic en **"Add New..."** > **"Project"**.
   - Selecciona tu repositorio `ruidocero` y haz clic en **Import**.

3. **Configuración de Vercel (automática gracias a `vercel.json`)**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (por defecto)
   - **Build Command**: `vite build` (o `npm run build`)
   - **Output Directory**: `dist`

4. **Variables de Entorno (Opcional pero recomendado)**:
   - En la sección **Environment Variables**, añade:
     - `GEMINI_API_KEY`: Tu clave de API de Google Gemini (para potenciar el asistente de inteligencia artificial y auditoría de reportes).
     *Nota*: Si no configuras la clave de inmediato, la plataforma continuará funcionando gracias a su motor determinista con protocolos de la Ley 2450 de 2025 y jurisprudencia de San Antonio de Prado.

5. **Haz clic en "Deploy"**:
   - Vercel compilará la aplicación y generará tu URL pública (ejemplo: `https://ruidocero.vercel.app`).

---

### Opción 2: Despliegue directo con Vercel CLI

Si tienes instalado Vercel CLI en tu terminal:

```bash
# Iniciar sesión en Vercel
npx vercel login

# Desplegar en vista previa
npx vercel

# Desplegar directamente a producción
npx vercel --prod
```

---

## 🛠️ Archivos de Configuración para Vercel incluidos

- **`vercel.json`**:
  - Configura el preset de Vite y el directorio de salida `dist`.
  - Agrega encabezados de seguridad y `Permissions-Policy: camera=*, microphone=*, display-capture=*` para permitir el acceso a la cámara y micrófono sin restricciones en el dominio de Vercel.
  - Redirecciona las rutas del cliente a `/index.html` (SPA routing) protegiendo las rutas de `/api/*`.

- **`.vercelignore`**:
  - Omite carpetas locales y temporales innecesarias (`node_modules`, `.env.local`, `.git`, etc.) para agilizar la carga.

- **`/api` (Vercel Serverless Functions)**:
  - `api/chat.ts`: Procesa consultas sobre comportamiento acústico con Gemini 3.8 Flash o asesor local.
  - `api/analyze-report.ts`: Audita reportes de ruido, valida contra la norma OMS y redacta el radicado de querella para la Inspección de Policía.
  - `api/index.ts`: Endpoint de estado y documentación de la API.
  - `api/_lib/acousticService.ts`: Lógica compartida entre el servidor local (`server.ts`) y las funciones serverless de Vercel.

---

## 💻 Desarrollo Local

Para ejecutar el proyecto en tu máquina local:

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Añade tu GEMINI_API_KEY en .env si deseas utilizar IA generativa

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

La aplicación se ejecutará en `http://localhost:3000`.
