import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Video,
  Upload,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Copy,
  Download,
  ShieldAlert,
  Volume2,
  Clock,
  MapPin,
  ExternalLink,
  RotateCcw,
  Sparkles,
  StopCircle,
  Radio,
  Scale,
  PhoneCall,
  Check,
  Camera,
  RefreshCw,
  Sliders,
  Info,
  Lock,
  Unlock,
  Settings,
  Image,
  Eye,
  VideoOff,
  Zap
} from 'lucide-react';

interface AnalysisResult {
  isContamination: boolean;
  severity: 'critical' | 'moderate' | 'safe';
  measuredDb: number;
  peakDb: number;
  excessDb: number;
  sector: string;
  sourceCategory: string;
  timestamp: string;
  analysis: {
    diagnostic: string;
    immediateProtection: string;
    assertiveDialogue: string;
    legalAction: string;
    authoritySteps: string;
    formalComplaintText: string;
  };
}

interface ReportsSectionProps {
  onOpenChatbot?: (scenario: string) => void;
}

const PRADO_SECTORS = [
  'Vía Principal & Sector El Chuscal',
  'Parque Principal & Calle del Comercio',
  'Vereda Potrerito / El Salado',
  'Urbanización El Limonar / Barichara',
  'Sector Naranjitos / La Pradera',
  'Vereda Montañita / La Florida',
  'Otro sector de San Antonio de Prado',
];

const PRESET_DEMOS = [
  {
    label: '🏍️ Motos con resonador (El Chuscal)',
    sector: 'Vía Principal & Sector El Chuscal',
    category: 'Motos con escape modificado / resonador',
    db: 98.4,
    peak: 106.1,
    desc: 'Grupo de motocicletas acelerando a fondo en subida residencial con escape libre en horas de la noche.',
  },
  {
    label: '🍻 Bafles de cantina (Parque Principal)',
    sector: 'Parque Principal & Calle del Comercio',
    category: 'Bafles hacia espacio público en bar/estanco',
    db: 94.2,
    peak: 101.5,
    desc: 'Cabinas gigantes de sonido en la acera peatonal de una taberna con música a alto volumen a la 1:30 am.',
  },
  {
    label: '🏡 Car Audio en Finca (Vereda Potrerito)',
    sector: 'Vereda Potrerito / El Salado',
    category: 'Car Audio y miniteca en finca de recreo',
    db: 89.1,
    peak: 97.8,
    desc: 'Vehículo con sonido modificado a cielo abierto en finca alquilada retumbando en el cañón campesino.',
  },
  {
    label: '🏢 Bafle en Balcón (El Limonar)',
    sector: 'Urbanización El Limonar / Barichara',
    category: 'Música en balcón de apartamento',
    db: 81.6,
    peak: 88.0,
    desc: 'Altavoz bluetooth en balcón de torre residencial un domingo temprano reverberando entre bloques.',
  },
  {
    label: '🌿 Sonido Ambiental Saludable (Control)',
    sector: 'Vereda Potrerito / El Salado',
    category: 'Sonido ambiente natural',
    db: 42.0,
    peak: 48.5,
    desc: 'Sonido nocturno natural de la ladera, grillos y viento suave sin fuentes ruidosas activas.',
  },
];

export const ReportsSection: React.FC<ReportsSectionProps> = ({ onOpenChatbot }) => {
  // Input mode: 'record' | 'upload' | 'demo'
  const [activeTab, setActiveTab] = useState<'record' | 'upload' | 'demo'>('record');

  // Form states
  const [sector, setSector] = useState(PRADO_SECTORS[0]);
  const [sourceCategory, setSourceCategory] = useState('Motos con escape modificado / resonador');
  const [description, setDescription] = useState('');

  // Hardware Devices state
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<'granted' | 'prompt' | 'denied' | 'ready'>('ready');
  const [micPermissionStatus, setMicPermissionStatus] = useState<'granted' | 'prompt' | 'denied' | 'ready'>('ready');

  // Active combined viewfinder (Camera + Mic)
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video'>('video');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveDb, setLiveDb] = useState(45);
  const [peakRecordedDb, setPeakRecordedDb] = useState(45);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Sound measurement calibration and recorded video Leq tracking
  const [recordedMediaLeqDb, setRecordedMediaLeqDb] = useState<number | null>(null);
  const [recordedMediaPeakDb, setRecordedMediaPeakDb] = useState<number | null>(null);
  const [calibrationOffsetDb, setCalibrationOffsetDb] = useState<number>(0);
  const [showCalibrationControls, setShowCalibrationControls] = useState<boolean>(false);
  const calibrationOffsetRef = useRef<number>(0);
  const isRecordingRef = useRef<boolean>(false);
  const recordedDbSamplesRef = useRef<number[]>([]);

  // Status & Notification state
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [deviceNotice, setDeviceNotice] = useState<string | null>(null);
  const [simulatedMode, setSimulatedMode] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isIframe, setIsIframe] = useState(false);

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Refs for audio analysis & streams
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simulatedNoiseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keep refs synchronized with active state for high-frequency animation frames
  useEffect(() => {
    calibrationOffsetRef.current = calibrationOffsetDb;
  }, [calibrationOffsetDb]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Check hardware devices and iframe context on mount
  useEffect(() => {
    try {
      setIsIframe(window.self !== window.top);
    } catch {
      setIsIframe(true);
    }
    checkPermissionStatusSilently();
    enumerateCameras();

    return () => {
      stopAllMedia();
    };
  }, []);

  const checkPermissionStatusSilently = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const cam = await navigator.permissions.query({ name: 'camera' as any });
          if (cam.state === 'granted') {
            setCameraPermissionStatus('granted');
          } else {
            // Do NOT mark as 'denied' prematurely, keep as 'ready'
            setCameraPermissionStatus('ready');
          }

          cam.onchange = () => {
            if (cam.state === 'granted') setCameraPermissionStatus('granted');
            else setCameraPermissionStatus('ready');
          };
        } catch {
          setCameraPermissionStatus('ready');
        }

        try {
          const mic = await navigator.permissions.query({ name: 'microphone' as any });
          if (mic.state === 'granted') {
            setMicPermissionStatus('granted');
          } else {
            setMicPermissionStatus('ready');
          }

          mic.onchange = () => {
            if (mic.state === 'granted') setMicPermissionStatus('granted');
            else setMicPermissionStatus('ready');
          };
        } catch {
          setMicPermissionStatus('ready');
        }
      }
    } catch {
      // Safe fallback
    }
  };

  const enumerateCameras = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setAvailableCameras(videoInputs);
        if (videoInputs.length > 0 && !selectedCameraId && videoInputs[0].deviceId) {
          setSelectedCameraId(videoInputs[0].deviceId);
        }
      }
    } catch (err) {
      console.warn('Could not list cameras:', err);
    }
  };

  const stopAllMedia = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (simulatedNoiseIntervalRef.current) {
      clearInterval(simulatedNoiseIntervalRef.current);
      simulatedNoiseIntervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsCameraActive(false);
    setIsMicActive(false);
    setIsRecording(false);
  };

  // Helper to pick best supported MediaRecorder MIME type
  const getSupportedMimeType = (type: 'audio' | 'video'): string | undefined => {
    if (typeof MediaRecorder === 'undefined') return undefined;

    if (type === 'video') {
      const videoTypes = [
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=vp9,opus',
        'video/webm',
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4',
      ];
      for (const t of videoTypes) {
        if (MediaRecorder.isTypeSupported(t)) return t;
      }
    } else {
      const audioTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/wav',
      ];
      for (const t of audioTypes) {
        if (MediaRecorder.isTypeSupported(t)) return t;
      }
    }
    return undefined;
  };

  // Setup Web Audio API decibel measurement on stream with true logarithmic acoustic calibration
  const attachAudioAnalyser = async (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.4; // Responsive without sluggish lag
      source.connect(analyser);
      analyserRef.current = analyser;

      const floatData = new Float32Array(analyser.fftSize);
      const byteFreqData = new Uint8Array(analyser.frequencyBinCount);
      const byteTimeData = new Uint8Array(analyser.frequencyBinCount);

      const updateDecibels = () => {
        if (!analyserRef.current) return;

        let rms = 0;
        let peakSample = 0;

        // Preferred: 32-bit float time domain data for maximum dynamic range & precision
        if (typeof analyserRef.current.getFloatTimeDomainData === 'function') {
          analyserRef.current.getFloatTimeDomainData(floatData);
          let sum = 0;
          for (let i = 0; i < floatData.length; i++) {
            const val = floatData[i];
            const abs = Math.abs(val);
            if (abs > peakSample) peakSample = abs;
            sum += val * val;
          }
          rms = Math.sqrt(sum / floatData.length);
        } else {
          analyserRef.current.getByteTimeDomainData(byteTimeData);
          let sum = 0;
          for (let i = 0; i < byteTimeData.length; i++) {
            const val = (byteTimeData[i] - 128) / 128;
            const abs = Math.abs(val);
            if (abs > peakSample) peakSample = abs;
            sum += val * val;
          }
          rms = Math.sqrt(sum / byteTimeData.length);
        }

        // Spectral frequency energy (captures low motor rumbles and high pitch noise)
        analyserRef.current.getByteFrequencyData(byteFreqData);
        let freqSum = 0;
        for (let i = 0; i < byteFreqData.length; i++) {
          freqSum += byteFreqData[i];
        }
        const freqAvg = freqSum / (byteFreqData.length || 1); // 0 to 255

        // Logarithmic dBFS calculation:
        // rms: 0.00005 (-86 dBFS silence) to 1.0 (0 dBFS full scale)
        const safeRms = Math.max(rms, 0.00005);
        const dbFS = 20 * Math.log10(safeRms);

        // Acoustic metrology calibration:
        // Baseline 0 dBFS ≈ 102 dB SPL for typical laptop/mobile integrated microphones.
        // User calibration offset allows fine-tuning for specific hardware devices.
        const offset = calibrationOffsetRef.current || 0;
        let dbEstimate = Math.round(102 + dbFS + offset);

        // Frequency-weighted acoustic presence compensation
        if (freqAvg > 8) {
          const freqDb = Math.round(42 + (freqAvg / 255) * 66 + offset);
          if (freqDb > dbEstimate) {
            dbEstimate = Math.round(dbEstimate * 0.35 + freqDb * 0.65);
          }
        }

        // Realistic acoustic clamp (34 dB whisper/silence up to 118 dB critical alarm/engine)
        const finalLiveDb = Math.min(115, Math.max(34, dbEstimate));

        setLiveDb(finalLiveDb);
        setPeakRecordedDb((prev) => Math.max(prev, finalLiveDb));

        // When video/audio recording is active, collect sound history for true Leq continuous level
        if (isRecordingRef.current) {
          recordedDbSamplesRef.current.push(finalLiveDb);
        }

        animationFrameRef.current = requestAnimationFrame(updateDecibels);
      };
      updateDecibels();
    } catch (err) {
      console.warn('Could not initialize AudioContext on stream:', err);
    }
  };

  /**
   * PRIMARY ACTION: ACTIVATE CAMERA & MICROPHONE SIMULTANEOUSLY (AL TIEMPO)
   * Employs a robust 3-tier cascade:
   * Tier 1: Simultaneous ideal constraints
   * Tier 2: Minimal simultaneous { video: true, audio: true }
   * Tier 3: Independent parallel capture & track merge
   */
  const handleActivateCameraAndMic = async () => {
    stopAllMedia();
    setPermissionError(null);
    setDeviceNotice(null);
    setCapturedPhotoUrl(null);
    setRecordedBlobUrl(null);
    setIsConnecting(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsConnecting(false);
      setPermissionError('Tu navegador no admite getUserMedia. Abre la plataforma directamente o actualiza tu navegador.');
      return;
    }

    let stream: MediaStream | null = null;
    let anyError: any = null;

    // TIER 1: Simultaneous with ideal constraints
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedCameraId
          ? { deviceId: { ideal: selectedCameraId } }
          : true,
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: false,
        },
      };
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err1: any) {
      console.warn('Tier 1 simultaneous request error:', err1);
      anyError = err1;
    }

    // TIER 2: Basic simultaneous request
    if (!stream) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch (err2: any) {
        console.warn('Tier 2 basic simultaneous request error:', err2);
        anyError = err2;
      }
    }

    // TIER 3: Parallel Independent Capture & Track Merge
    // Resolves cases where browsers/OS require separate permission prompts or drivers
    if (!stream) {
      try {
        let videoStream: MediaStream | null = null;
        let audioStream: MediaStream | null = null;

        try {
          videoStream = await navigator.mediaDevices.getUserMedia({
            video: selectedCameraId ? { deviceId: { ideal: selectedCameraId } } : true,
          });
        } catch (vErr) {
          console.warn('Tier 3 independent video error:', vErr);
          anyError = vErr;
        }

        try {
          audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: false },
          });
        } catch (aErr) {
          console.warn('Tier 3 independent audio error:', aErr);
          if (!anyError) anyError = aErr;
        }

        if (videoStream || audioStream) {
          const merged = new MediaStream();
          if (videoStream) {
            videoStream.getVideoTracks().forEach((track) => merged.addTrack(track));
          }
          if (audioStream) {
            audioStream.getAudioTracks().forEach((track) => merged.addTrack(track));
          }
          stream = merged;
        }
      } catch (err3: any) {
        console.warn('Tier 3 merged capture error:', err3);
        anyError = err3;
      }
    }

    if (!stream || (stream.getVideoTracks().length === 0 && stream.getAudioTracks().length === 0)) {
      setIsConnecting(false);
      console.error('All camera and microphone strategies failed:', anyError);
      const errName = anyError?.name || '';

      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setCameraPermissionStatus('denied');
        setMicPermissionStatus('denied');
        setPermissionError('El navegador o la ventana tienen bloqueado el acceso a Cámara o Micrófono. Si ya los autorizaste en la barra superior (🔒 / 📷), haz clic en "Reintentar Conexión" o abre la aplicación en una pestaña directa.');
      } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
        setPermissionError('La cámara o el micrófono ya están siendo utilizados por otra aplicación (Zoom, Meet, Teams u otra pestaña). Ciérralos y reintenta.');
      } else {
        setPermissionError(`No se pudo inicializar la cámara y micrófono (${errName || anyError?.message || 'Error'}).`);
      }
      return;
    }

    // SUCCESS: Store stream and configure state
    mediaStreamRef.current = stream;
    const hasVideo = stream.getVideoTracks().length > 0;
    const hasAudio = stream.getAudioTracks().length > 0;

    setIsCameraActive(hasVideo);
    setIsMicActive(hasAudio);
    setRecordingType(hasVideo ? 'video' : 'audio');
    setSimulatedMode(false);
    setPermissionError(null);

    if (hasVideo) setCameraPermissionStatus('granted');
    if (hasAudio) setMicPermissionStatus('granted');

    // Attach video preview
    if (hasVideo && videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = stream;
      videoPreviewRef.current.muted = true;
      videoPreviewRef.current.playsInline = true;
      videoPreviewRef.current.setAttribute('playsinline', 'true');
      videoPreviewRef.current.setAttribute('webkit-playsinline', 'true');
      try {
        await videoPreviewRef.current.play();
      } catch (playErr) {
        console.warn('Video preview play warning:', playErr);
      }
    }

    // Attach audio analyser for real-time decibels
    if (hasAudio) {
      await attachAudioAnalyser(stream);
    }

    if (hasVideo && hasAudio) {
      setDeviceNotice('¡Cámara y Micrófono activos al mismo tiempo! Transmitiendo video y midiendo decibeles en vivo.');
    } else if (hasVideo) {
      setDeviceNotice('Cámara de video activa. No se pudo enlazar el micrófono (revisa si está en uso).');
    } else if (hasAudio) {
      setDeviceNotice('Micrófono activo midiendo decibeles en vivo. Cámara no disponible.');
    }

    enumerateCameras();
    setIsConnecting(false);
  };

  // Solo Micrófono (Modo Discreto)
  const handleActivateMicrophoneOnly = async () => {
    stopAllMedia();
    setPermissionError(null);
    setDeviceNotice(null);
    setCapturedPhotoUrl(null);
    setRecordedBlobUrl(null);
    setIsConnecting(true);

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false },
      });
      mediaStreamRef.current = audioStream;

      setIsMicActive(true);
      setIsCameraActive(false);
      setRecordingType('audio');
      setMicPermissionStatus('granted');

      await attachAudioAnalyser(audioStream);
      setDeviceNotice('Micrófono conectado y calibrado midiendo decibeles en vivo.');
    } catch (err: any) {
      console.error('Microphone only error:', err);
      const errName = err?.name || '';
      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setMicPermissionStatus('denied');
        setPermissionError('Permiso de Micrófono denegado en el navegador.');
      } else {
        setPermissionError('No se pudo acceder al micrófono del equipo.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Start recording on the currently active stream
  const handleStartRecording = () => {
    if (!mediaStreamRef.current) {
      handleActivateCameraAndMic();
      return;
    }

    recordedChunksRef.current = [];
    recordedDbSamplesRef.current = [];
    setRecordedMediaLeqDb(null);
    setRecordedMediaPeakDb(null);
    setRecordingSeconds(0);
    setRecordedBlobUrl(null);
    isRecordingRef.current = true;

    const actualType = isCameraActive ? 'video' : 'audio';
    const mimeType = getSupportedMimeType(actualType);
    const options = mimeType ? { mimeType } : undefined;

    try {
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalMime = mimeType || (actualType === 'video' ? 'video/webm' : 'audio/webm');
        const blob = new Blob(recordedChunksRef.current, { type: finalMime });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);

        // Compute authentic equivalent continuous sound level (Leq) and peak (Lmax) of this video
        const samples = recordedDbSamplesRef.current;
        if (samples.length > 0) {
          let sumPower = 0;
          let maxVal = 0;
          for (const s of samples) {
            sumPower += Math.pow(10, s / 10);
            if (s > maxVal) maxVal = s;
          }
          const leq = Math.min(115, Math.max(35, Math.round(10 * Math.log10(sumPower / samples.length))));
          setRecordedMediaLeqDb(leq);
          setRecordedMediaPeakDb(maxVal);
          setLiveDb(leq);
          setPeakRecordedDb(maxVal);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (recorderErr) {
      console.error('Error starting MediaRecorder:', recorderErr);
      setPermissionError('No se pudo iniciar el grabador multimedia en este navegador.');
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    isRecordingRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsRecording(false);
  };

  // Take a timestamped evidence photo from the live video feed
  const handleCapturePhoto = () => {
    if (!videoPreviewRef.current || !canvasRef.current) return;
    const video = videoPreviewRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw watermark banner at bottom
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

    // Draw decibel badge
    ctx.fillStyle = liveDb > 75 ? '#f43f5e' : liveDb > 55 ? '#f59e0b' : '#10b981';
    ctx.fillRect(16, canvas.height - 54, 85, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`${liveDb} dB`, 24, canvas.height - 28);

    // Draw metadata text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`EVIDENCIA: ${sector.toUpperCase()} (SAN ANTONIO DE PRADO)`, 115, canvas.height - 42);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    const dateStr = new Date().toLocaleString('es-CO');
    ctx.fillText(`${dateStr} · Norma: Res. 0627 / Ley 2450 de 2025`, 115, canvas.height - 22);

    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhotoUrl(photoDataUrl);
    setPeakRecordedDb(Math.max(peakRecordedDb, liveDb));
  };

  // Start simulated live measurement if hardware is blocked
  const handleStartSimulatedRecording = () => {
    stopAllMedia();
    setPermissionError(null);
    setSimulatedMode(true);
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordedBlobUrl(null);
    setPeakRecordedDb(86);
    setLiveDb(84);

    simulatedNoiseIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
      const randomDb = Math.round(74 + Math.random() * 24);
      setLiveDb(randomDb);
      setPeakRecordedDb((prev) => Math.max(prev, randomDb));
    }, 400);
  };

  // Handle file upload with authentic logarithmic acoustic spectrum analysis
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const fileUrl = URL.createObjectURL(file);
    setRecordedBlobUrl(fileUrl);
    setRecordingType(file.type.startsWith('video') ? 'video' : 'audio');

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);
      const step = Math.max(1, Math.floor(channelData.length / 40000));
      let sum = 0;
      let peak = 0;
      let count = 0;

      // Windowed energy analysis to capture active noise periods and peak events
      const windowSize = 512;
      let windowSum = 0;
      const activeWindowRmsList: number[] = [];

      for (let i = 0; i < channelData.length; i += step) {
        const val = channelData[i];
        const abs = Math.abs(val);
        if (abs > peak) peak = abs;
        sum += val * val;
        windowSum += val * val;
        count++;

        if (count % windowSize === 0) {
          const wRms = Math.sqrt(windowSum / windowSize);
          if (wRms > 0.0001) {
            activeWindowRmsList.push(wRms);
          }
          windowSum = 0;
        }
      }

      let effectiveRms = Math.sqrt(sum / Math.max(1, count));
      // Focus on active sound sections to represent real noise nuisance (L10 percentile)
      if (activeWindowRmsList.length > 5) {
        activeWindowRmsList.sort((a, b) => a - b);
        const topSlice = activeWindowRmsList.slice(Math.floor(activeWindowRmsList.length * 0.70));
        const topAvg = topSlice.reduce((a, b) => a + b, 0) / topSlice.length;
        effectiveRms = Math.max(effectiveRms, topAvg);
      }

      const dbFS = 20 * Math.log10(Math.max(effectiveRms, 1e-5));
      const peakDbFS = 20 * Math.log10(Math.max(peak, 1e-5));

      // Standard acoustic calibration for video recordings (0 dBFS ≈ 102 dB SPL)
      const calculatedDb = Math.min(115, Math.max(40, Math.round(102 + dbFS)));
      const calculatedPeak = Math.min(120, Math.max(calculatedDb + 4, Math.round(104 + peakDbFS)));

      setLiveDb(calculatedDb);
      setPeakRecordedDb(calculatedPeak);
      setRecordedMediaLeqDb(calculatedDb);
      setRecordedMediaPeakDb(calculatedPeak);
      audioCtx.close().catch(() => {});
    } catch (decodeErr) {
      console.warn('Direct decodeAudioData fallback, using file-level acoustic estimate:', decodeErr);
      const fallbackDb = 78;
      const fallbackPeak = 87;
      setLiveDb(fallbackDb);
      setPeakRecordedDb(fallbackPeak);
      setRecordedMediaLeqDb(fallbackDb);
      setRecordedMediaPeakDb(fallbackPeak);
    }
  };

  // Select demo preset
  const handleSelectDemo = (demo: typeof PRESET_DEMOS[0]) => {
    setSector(demo.sector);
    setSourceCategory(demo.category);
    setDescription(demo.desc);
    setLiveDb(demo.db);
    setPeakRecordedDb(demo.peak);
    setRecordedMediaLeqDb(demo.db);
    setRecordedMediaPeakDb(demo.peak);
    setUploadedFileName(demo.label);
    setRecordedBlobUrl(null);
    setCapturedPhotoUrl(null);
  };

  // Perform Acoustic Contamination Analysis
  const handleAnalyzeReport = async () => {
    setAnalyzing(true);
    setAnalysisResult(null);

    // Prioritize the recorded video's actual sound level over post-recording room silence
    const measuredDb = (recordedMediaLeqDb && recordedMediaLeqDb >= 35) ? recordedMediaLeqDb : liveDb;
    const peakDb = Math.max(measuredDb, recordedMediaPeakDb || peakRecordedDb);

    try {
      const response = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decibels: measuredDb,
          peakDb,
          sector,
          sourceCategory,
          description: description || `Evidencia registrada en ${sector} con nivel promedio de ${measuredDb} dB.`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Error en el servidor al analizar');
      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.warn('Fallback analysis execution:', err);
      const isContamination = measuredDb > 55;
      const excessDb = Math.max(0, measuredDb - 55);
      const severity = measuredDb > 75 ? 'critical' : measuredDb > 55 ? 'moderate' : 'safe';

      const localResult: AnalysisResult = {
        isContamination,
        severity,
        measuredDb,
        peakDb,
        excessDb,
        sector,
        sourceCategory,
        timestamp: new Date().toISOString(),
        analysis: {
          diagnostic: isContamination
            ? `Se detectó CONTAMINACIÓN AUDITIVA POSITIVA (${measuredDb} dB). Este nivel excede por +${excessDb.toFixed(1)} dB los límites diurnos/nocturnos de la OMS y la Resolución 0627 de 2006 en San Antonio de Prado.`
            : `Nivel acústico dentro de los límites saludables (${measuredDb} dB). No se configura infracción acústica legal en este momento.`,
          immediateProtection: isContamination
            ? 'Cerrar ventanas que den a la fuente ruidosa, usar protectores auditivos de silicona o espuma temporalmente y resguardar en habitaciones interiores a niños, personas enfermas y mascotas.'
            : 'Mantener hábitos de escucha consciente y ventilación natural.',
          assertiveDialogue: isContamination
            ? 'Acercarse con serenidad y señalar con respeto: "Vecino/administrador, el sonido se amplifica por la ladera y supera los 85 dB afectando el descanso; le solicito comedidamente bajar el volumen conforme a los acuerdos de San Antonio de Prado".'
            : 'Felicitar a la comunidad por mantener niveles acústicos adecuados.',
          legalAction: isContamination
            ? 'En Colombia rige la Ley Antirruido 2450 de 2025 que sanciona con multas de hasta 16 SMDLV la perturbación del reposo (aplicable solidariamente a dueños de fincas e inmuebles), además del Art. 33 del Código Nacional de Policía (Ley 1801 de 2016).'
            : 'Marco preventivo de convivencia.',
          authoritySteps: isContamination
            ? '1) Llamar al 123 o al cuadrante de Policía de San Antonio de Prado. 2) Radicar querella formal de convivencia ante la Inspección de Policía 7A (Casa de Gobierno de San Antonio de Prado). 3) Para motos con resonador, solicitar operativos con sonómetros a la Secretaría de Movilidad de Medellín.'
            : 'No requiere intervención.',
          formalComplaintText: `CONSTANCIA DE REPORTE POR CONTAMINACIÓN AUDITIVA\nFecha: ${new Date().toLocaleDateString('es-CO')} - Hora: ${new Date().toLocaleTimeString('es-CO')}\nSector: ${sector} (San Antonio de Prado, Medellín)\nNivel Registrado: ${measuredDb} dB (Pico: ${peakDb} dB)\nFuente: ${sourceCategory}\nDescripción: ${description || 'Emisión continua de sonido que supera los límites permitidos'}\nFundamento Legal: Ley Antirruido 2450 de 2025 y Ley 1801 de 2016 Art. 33.\nSolicitud: Intervención de la Inspección de Policía / Cuadrante para verificación y aplicación de medidas correctivas.`,
        },
      };
      setAnalysisResult(localResult);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopyDraft = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.analysis.formalComplaintText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const blob = new Blob([analysisResult.analysis.formalComplaintText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Ruido_San_Antonio_de_Prado_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="reportes" className="relative w-full py-12 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Centro de Evidencia Acústica · San Antonio de Prado</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reportes con <span className="text-emerald-600">Detección de Ruido</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Activa la <strong>cámara y el micrófono al tiempo</strong> para transmitir la evidencia en vivo. El sistema medirá los decibeles reales, verificará si existe <strong>infracción acústica positiva</strong> y te entregará el protocolo legal a seguir.
          </p>

          {/* Real-time Hardware Permissions Status Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs">
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700">Cámara:</span>
              {isCameraActive ? (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Transmitiendo en Vivo</span>
                </span>
              ) : cameraPermissionStatus === 'granted' ? (
                <button
                  onClick={handleActivateCameraAndMic}
                  className="text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Activa (Clic para Conectar)</span>
                </button>
              ) : (
                <button
                  onClick={handleActivateCameraAndMic}
                  className="text-slate-700 hover:text-emerald-700 font-medium bg-slate-100 hover:bg-emerald-50 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Lista para Conectar</span>
                </button>
              )}
            </div>

            <div className="h-3 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700">Micrófono:</span>
              {isMicActive ? (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Midiendo ({liveDb} dB)</span>
                </span>
              ) : micPermissionStatus === 'granted' ? (
                <button
                  onClick={handleActivateCameraAndMic}
                  className="text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Activo (Clic para Medir)</span>
                </button>
              ) : (
                <button
                  onClick={handleActivateCameraAndMic}
                  className="text-slate-700 hover:text-emerald-700 font-medium bg-slate-100 hover:bg-emerald-50 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Listo para Conectar</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden Canvas for Photo Watermark Generation */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Main Reporting Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Media Capture & Upload Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setActiveTab('record')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'record'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>Cámara & Micrófono</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Subir Archivo</span>
              </button>

              <button
                onClick={() => setActiveTab('demo')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'demo'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Casos Reales</span>
              </button>
            </div>

            {/* TAB 1: LIVE HARDWARE CAPTURE (AUDIO / VIDEO) */}
            {activeTab === 'record' && (
              <div className="space-y-4">
                
                {/* Visual Permissions Guidance when Blocked or Restricted */}
                {permissionError && (
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Configuración de acceso a Cámara y Micrófono:</span>
                    </div>

                    <p className="leading-relaxed text-slate-700">
                      {permissionError}
                    </p>

                    <div className="space-y-1.5 text-slate-700 bg-white/80 p-3 rounded-xl border border-amber-200">
                      <p className="flex items-start gap-1.5 font-medium">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">1</span>
                        <span>Si ya activaste los permisos en el navegador (ícono 🔒 o 📷 en la URL), pulsa el botón verde <strong>"Reintentar Conexión Simultánea"</strong> abajo.</span>
                      </p>
                      <p className="flex items-start gap-1.5 font-medium">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">2</span>
                        <span>Verifica que otra app (Zoom, Meet, Teams) no tenga ocupada tu cámara o micrófono.</span>
                      </p>
                      {isIframe && (
                        <p className="flex items-start gap-1.5 font-medium text-blue-900">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">3</span>
                          <span><strong>Recomendado si estás en visor embebido:</strong> Abre la aplicación en una pestaña independiente para acceso directo y sin restricciones de marco.</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={handleActivateCameraAndMic}
                        disabled={isConnecting}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isConnecting ? 'animate-spin' : ''}`} />
                        <span>{isConnecting ? 'Conectando...' : 'Reintentar Conexión Simultánea'}</span>
                      </button>

                      {isIframe && (
                        <a
                          href={window.location.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir en Pestaña Directa</span>
                        </a>
                      )}

                      <button
                        onClick={handleStartSimulatedRecording}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Radio className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Usar Sensor Virtual en Pantalla</span>
                      </button>
                    </div>
                  </div>
                )}

                {deviceNotice && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{deviceNotice}</span>
                  </div>
                )}

                {/* Camera Selector (if multiple cameras available) */}
                {availableCameras.length > 1 && (
                  <div className="flex items-center justify-between text-xs bg-slate-100 p-2.5 rounded-xl">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      <span>Lente de Cámara:</span>
                    </span>
                    <select
                      value={selectedCameraId}
                      onChange={(e) => {
                        setSelectedCameraId(e.target.value);
                        if (isCameraActive) {
                          setTimeout(handleActivateCameraAndMic, 100);
                        }
                      }}
                      className="px-2 py-1 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                    >
                      {availableCameras.map((cam, idx) => (
                        <option key={cam.deviceId || idx} value={cam.deviceId}>
                          {cam.label || `Cámara ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Live Viewfinder / Gauge Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                  
                  {/* REAL-TIME VIDEO STREAM VIEWFINDER (CAM + MIC) */}
                  <div className={`w-full relative rounded-2xl overflow-hidden border border-slate-700 bg-black ${isCameraActive ? 'block' : 'hidden'} mb-3`}>
                    <video
                      ref={videoPreviewRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-56 sm:h-72 object-cover"
                    />

                    {/* HUD Overlays */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white font-mono text-[11px] font-bold border border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>CÁMARA Y AUDIO EN VIVO</span>
                      </div>

                      {isRecording && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white font-mono text-[11px] font-bold animate-pulse">
                          <span>REC {recordingSeconds}s</span>
                        </div>
                      )}
                    </div>

                    {/* Live Decibel Watermark Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white border border-slate-700 flex items-center gap-1.5 shadow-lg">
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-base font-black font-mono tracking-tight tabular-nums">
                        {liveDb} dB
                      </span>
                    </div>

                    {/* Quick Camera Action Toolbar (Snapshot & Close) */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                      <button
                        onClick={handleCapturePhoto}
                        className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                        title="Tomar fotografía con sello de decibeles"
                      >
                        <Camera className="w-4 h-4 text-emerald-600" />
                        <span>Tomar Foto con Decibeles</span>
                      </button>

                      <button
                        onClick={stopAllMedia}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Detener transmisión"
                      >
                        <VideoOff className="w-3.5 h-3.5" />
                        <span>Detener</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Microphone Audio Meter when Camera & Mic are active simultaneously */}
                  {isCameraActive && isMicActive && (
                    <div className="w-full mb-3 p-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-left animate-in fade-in">
                      <div className="flex items-center justify-between text-xs text-slate-300 font-mono mb-1.5">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Mic className="w-3.5 h-3.5 animate-pulse" />
                          <span>Medición Acústica del Micrófono:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-sans font-bold ${
                            liveDb > 75 ? 'bg-rose-900/80 text-rose-300 border border-rose-700' :
                            liveDb > 55 ? 'bg-amber-900/80 text-amber-300 border border-amber-700' :
                            'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                          }`}>
                            {liveDb > 85 ? '🚨 Contaminación Severa' :
                             liveDb > 75 ? '⚠️ Supera Norma Diurna' :
                             liveDb > 55 ? '📢 Ruido Moderado' :
                             liveDb > 45 ? '🗣️ Conversación Normal' :
                             '🌿 Silencio / Seguro'}
                          </span>
                          <span className="font-extrabold text-white bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700 font-mono text-xs">
                            {liveDb} dB
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
                        <div
                          className={`h-full transition-all duration-75 rounded-full ${
                            liveDb > 75 ? 'bg-rose-500' : liveDb > 55 ? 'bg-amber-400' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(8, ((liveDb - 34) / 81) * 100))}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>35 dB (Silencio)</span>
                        <span>55 dB (Límite OMS)</span>
                        <span className="text-amber-300">65 dB (Voz alta)</span>
                        <span className="text-rose-400 font-semibold">75+ dB (Infracción)</span>
                      </div>

                      {/* Sensitivity & Acoustic Range Controls */}
                      <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setShowCalibrationControls(!showCalibrationControls)}
                          className="text-slate-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                        >
                          <Sliders className="w-3 h-3 text-emerald-400" />
                          <span>{showCalibrationControls ? 'Ocultar calibración' : 'Ajustar calibración / Probar niveles'}</span>
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Calibración: {calibrationOffsetDb > 0 ? `+${calibrationOffsetDb}` : calibrationOffsetDb} dB
                        </span>
                      </div>

                      {showCalibrationControls && (
                        <div className="mt-2 p-2 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2 animate-in fade-in duration-150">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-300">
                            <span className="font-semibold text-slate-200">Sensibilidad de micrófono:</span>
                            <div className="flex items-center gap-1">
                              {[-6, 0, 6, 12].map((offset) => (
                                <button
                                  key={offset}
                                  type="button"
                                  onClick={() => setCalibrationOffsetDb(offset)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                                    calibrationOffsetDb === offset
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  }`}
                                >
                                  {offset === 0 ? 'Normal' : offset > 0 ? `+${offset}dB` : `${offset}dB`}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-300">
                            <span className="text-[10px] text-slate-400">Probar nivel acústico:</span>
                            <div className="flex flex-wrap gap-1">
                              {[
                                { name: 'Silencio (42 dB)', db: 42 },
                                { name: 'Voz (65 dB)', db: 65 },
                                { name: 'Moto (88 dB)', db: 88 },
                                { name: 'Bafle (98 dB)', db: 98 },
                              ].map((lvl) => (
                                <button
                                  key={lvl.db}
                                  type="button"
                                  onClick={() => {
                                    setLiveDb(lvl.db);
                                    setPeakRecordedDb((p) => Math.max(p, lvl.db));
                                    if (isRecording) {
                                      recordedDbSamplesRef.current.push(lvl.db);
                                    }
                                  }}
                                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                                >
                                  {lvl.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Circular Audio Gauge (when camera is not active) */}
                  {!isCameraActive && (
                    <div className="relative w-36 h-36 flex flex-col items-center justify-center my-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="#334155" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke={liveDb > 75 ? '#f43f5e' : liveDb > 55 ? '#f59e0b' : '#10b981'}
                          strokeWidth="8"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * Math.min(100, ((liveDb - 30) / 85) * 100)) / 100}
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-150"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black font-mono tracking-tight tabular-nums">
                          {liveDb}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">dB Medidos</span>
                        <span className={`text-[9px] font-bold mt-0.5 ${
                          liveDb > 75 ? 'text-rose-400' : liveDb > 55 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {liveDb > 75 ? 'Infracción' : liveDb > 55 ? 'Moderado' : 'Saludable'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Live Status Description */}
                  {isRecording ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>
                        {simulatedMode
                          ? `SENSOR ACTIVO: MIDIENDO RUIDO (${recordingSeconds}s)`
                          : `GRABANDO EVIDENCIA: ${recordingType.toUpperCase()} (${recordingSeconds}s)`}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 mb-3">
                      {isCameraActive && isMicActive
                        ? 'Cámara y micrófono transmitiendo simultáneamente en vivo.'
                        : isMicActive
                        ? 'Micrófono midiendo decibeles en vivo.'
                        : isConnecting
                        ? 'Conectando periféricos simultáneamente...'
                        : recordedBlobUrl || capturedPhotoUrl
                        ? 'Evidencia lista para analizar.'
                        : 'Haz clic en "Activar Cámara y Micrófono al Tiempo" para iniciar.'}
                    </span>
                  )}

                  {/* Live Slider adjustment in simulated mode */}
                  {simulatedMode && isRecording && (
                    <div className="w-full max-w-xs mb-3 p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-left">
                      <div className="flex justify-between text-[11px] text-slate-300 font-bold mb-1">
                        <span>Simular Nivel de Ruido:</span>
                        <span className="font-mono text-amber-400">{liveDb} dB</span>
                      </div>
                      <input
                        type="range"
                        min="35"
                        max="115"
                        value={liveDb}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setLiveDb(val);
                          setPeakRecordedDb((prev) => Math.max(prev, val));
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Primary Camera & Recording Action Controls */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                    {!isCameraActive && !isRecording && (
                      <>
                        <button
                          onClick={handleActivateCameraAndMic}
                          disabled={isConnecting}
                          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-102 disabled:opacity-50"
                        >
                          <Zap className="w-4 h-4 text-amber-300" />
                          <span>Activar Cámara y Micrófono al Tiempo</span>
                        </button>

                        <button
                          onClick={handleActivateMicrophoneOnly}
                          disabled={isConnecting}
                          className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700 disabled:opacity-50"
                        >
                          <Mic className="w-4 h-4 text-emerald-400" />
                          <span>Solo Micrófono</span>
                        </button>
                      </>
                    )}

                    {isCameraActive && !isRecording && (
                      <>
                        <button
                          onClick={handleStartRecording}
                          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                          <span>Iniciar Grabación de Video con Audio</span>
                        </button>
                        <button
                          onClick={handleCapturePhoto}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Image className="w-4 h-4 text-emerald-400" />
                          <span>Tomar Foto con Sello</span>
                        </button>
                      </>
                    )}

                    {!isCameraActive && isMicActive && !isRecording && (
                      <button
                        onClick={handleStartRecording}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                        <span>Grabar Audio de Evidencia</span>
                      </button>
                    )}

                    {isRecording && (
                      <button
                        onClick={handleStopRecording}
                        className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg animate-pulse"
                      >
                        <StopCircle className="w-5 h-5" />
                        <span>Detener y Evaluar ({liveDb} dB)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Photo Preview if Captured */}
                {capturedPhotoUrl && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Foto capturada con sello de decibeles:</span>
                      </span>
                      <a
                        href={capturedPhotoUrl}
                        download={`Evidencia_Ruido_Prado_${Date.now()}.jpg`}
                        className="px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Descargar Foto</span>
                      </a>
                    </div>
                    <img src={capturedPhotoUrl} alt="Evidencia acústica" className="w-full rounded-xl border border-emerald-200 max-h-56 object-cover" />
                  </div>
                )}

                {/* Media Playback Preview when stopped */}
                {recordedBlobUrl && !isRecording && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5 animate-in fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-bold text-emerald-800">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Grabación procesada con medición acústica:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-xs font-extrabold border border-emerald-200">
                          {recordedMediaLeqDb || liveDb} dB Leq
                        </span>
                        <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded-md text-[11px] border border-emerald-200">
                          Pico: {recordedMediaPeakDb || peakRecordedDb} dB
                        </span>
                      </div>
                    </div>
                    {recordingType === 'video' ? (
                      <video src={recordedBlobUrl} controls className="w-full rounded-xl max-h-56 bg-black shadow-inner" />
                    ) : (
                      <audio src={recordedBlobUrl} controls className="w-full" />
                    )}
                    <div className="flex flex-wrap items-center justify-between text-[11px] px-1 text-slate-600">
                      <span>Nivel continuo equivalente integrado durante la captura</span>
                      <span className={`font-bold ${(recordedMediaLeqDb || liveDb) > 75 ? 'text-rose-600' : (recordedMediaLeqDb || liveDb) > 55 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {(recordedMediaLeqDb || liveDb) > 75 ? '⚠️ Supera límite legal (Infracción)' : (recordedMediaLeqDb || liveDb) > 55 ? '📢 Nivel Moderado' : '✅ Nivel Seguro y Saludable'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: FILE UPLOAD */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 transition-colors cursor-pointer text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    Haz clic o arrastra un archivo de audio o video
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Formatos admitidos: MP3, WAV, M4A, OGG, MP4, WEBM o MOV (máx. 50 MB)
                  </span>
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadedFileName && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-900 truncate">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{uploadedFileName}</span>
                      </div>
                      <span className="text-xs font-bold font-mono text-emerald-800 bg-white px-2.5 py-0.5 rounded-md border border-emerald-200 shrink-0 ml-2">
                        {recordedMediaLeqDb || liveDb} dB Leq (Pico: {recordedMediaPeakDb || peakRecordedDb} dB)
                      </span>
                    </div>

                    {recordedBlobUrl && recordingType === 'video' && (
                      <video src={recordedBlobUrl} controls className="w-full rounded-xl max-h-48 bg-black mt-2" />
                    )}
                    {recordedBlobUrl && recordingType === 'audio' && (
                      <audio src={recordedBlobUrl} controls className="w-full mt-2" />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DEMO CASES */}
            {activeTab === 'demo' && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Muestras de prueba de San Antonio de Prado:
                </span>
                {PRESET_DEMOS.map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDemo(demo)}
                    className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition-all flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{demo.label}</span>
                      <span className="text-[11px] text-slate-500 leading-tight block">{demo.desc}</span>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        demo.db > 75
                          ? 'bg-rose-100 text-rose-800'
                          : demo.db > 55
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {demo.db} dB
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Common Metadata Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sector o Vereda:</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {PRADO_SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fuente de Ruido:</label>
                  <select
                    value={sourceCategory}
                    onChange={(e) => setSourceCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Motos con escape modificado / resonador">Motos con resonador / piques</option>
                    <option value="Bafles hacia espacio público en bar/estanco">Bafles de bar / cantina en calle</option>
                    <option value="Car Audio y miniteca en finca de recreo">Car audio en finca veredal</option>
                    <option value="Música en balcón de apartamento">Bafle en balcón / torre residencial</option>
                    <option value="Perifoneo comercial y megáfonos">Perifoneo con megáfonos</option>
                    <option value="Sonido ambiente natural">Sonido ambiente / bajo volumen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Descripción o contexto adicional (opcional):
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Ocurre todos los viernes a la medianoche frente a la torre 4, los bajos hacen vibrar los vidrios..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Main Submit Button */}
              <button
                onClick={handleAnalyzeReport}
                disabled={analyzing}
                className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analizando Señal Acústica y Decibeles...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4" />
                    <span>Detectar Contaminación Auditiva y Obtener Solución</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Diagnosis & Action Plan */}
          <div className="lg:col-span-6 space-y-5">
            {!analysisResult && !analyzing ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Volume2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Esperando Evidencia Acústica</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
                    Activa la cámara y el micrófono simultáneos, graba video o selecciona un caso de prueba para evaluar si supera los límites de la OMS y recibir la ruta de actuación legal y comunitaria.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1.5 text-left">
                  <span className="font-bold text-slate-800 block">Norma de Decibeles en Colombia:</span>
                  <div className="flex justify-between">
                    <span>Zona Residencial (Día):</span>
                    <strong className="font-mono text-emerald-700">Máx. 55 - 65 dB</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Zona Residencial (Noche):</span>
                    <strong className="font-mono text-emerald-700">Máx. 45 - 50 dB</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Límite de Daño Auditivo (OMS):</span>
                    <strong className="font-mono text-rose-700">&gt; 75 - 85 dB</strong>
                  </div>
                </div>
              </div>
            ) : analyzing ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs animate-pulse">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-spin">
                  <Radio className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Analizando Presión Sonora y Ley Antirruido</h3>
                <p className="text-xs text-slate-500">
                  Calculando niveles RMS, picos de presión sonora y cruzando con la normativa de Medellín...
                </p>
              </div>
            ) : analysisResult ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md space-y-6 animate-in fade-in duration-300">
                
                {/* Status Badge & Gauge */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          analysisResult.isContamination
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {analysisResult.isContamination ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>CONTAMINACIÓN AUDITIVA POSITIVA</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>NIVEL ACÚSTICO SALUDABLE (NEGATIVO)</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      Resultado del Monitoreo Acústico
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{analysisResult.sector}</span>
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Medición Registrada</span>
                    <span
                      className={`text-2xl font-black font-mono ${
                        analysisResult.measuredDb > 75 ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      {analysisResult.measuredDb} dB
                    </span>
                    {analysisResult.isContamination && (
                      <span className="text-[10px] font-mono text-rose-600 font-bold block">
                        +{analysisResult.excessDb.toFixed(1)} dB de exceso
                      </span>
                    )}
                  </div>
                </div>

                {/* Diagnostic Banner */}
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed">
                  {analysisResult.analysis.diagnostic}
                </p>

                {/* WHAT TO DO IN THIS SCENARIO (ACTION PROTOCOL) */}
                {analysisResult.isContamination ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                      <span>¿Qué hacer en este escenario? Ruta de Actuación:</span>
                    </h4>

                    {/* Step 1: Immediate Protection */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                      <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">1</span>
                        <span>Autoprotección Inmediata del Hogar</span>
                      </span>
                      <p className="text-xs text-amber-800/90 pl-6 leading-relaxed">
                        {analysisResult.analysis.immediateProtection}
                      </p>
                    </div>

                    {/* Step 2: Assertive Dialogue */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                        <span>Guion de Diálogo y Mediación Asertiva</span>
                      </span>
                      <p className="text-xs text-emerald-800/90 pl-6 leading-relaxed">
                        {analysisResult.analysis.assertiveDialogue}
                      </p>
                    </div>

                    {/* Step 3: Legal & Police Steps in Medellín */}
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-emerald-400" />
                        <span>Ruta Legal: Ley Antirruido 2450 de 2025 & Autoridades</span>
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {analysisResult.analysis.legalAction}
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-snug">
                        <strong>Pasos institucionales:</strong> {analysisResult.analysis.authoritySteps}
                      </div>
                    </div>

                    {/* Step 4: Official Report Text Ready to Copy */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>Acta Formal de Reporte para Radicar:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopyDraft}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedDraft ? '¡Copiado!' : 'Copiar'}</span>
                          </button>
                          <button
                            onClick={handleDownloadReport}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </button>
                        </div>
                      </div>

                      <pre className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-tight max-h-36 overflow-y-auto">
                        {analysisResult.analysis.formalComplaintText}
                      </pre>
                    </div>

                    {/* Ask Chatbot Button */}
                    {onOpenChatbot && (
                      <button
                        onClick={() => onOpenChatbot(analysisResult.sector)}
                        className="w-full py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Profundizar este caso con el Asistente IA</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 space-y-2">
                    <span className="text-xs font-bold block">
                      ✅ Espacio en Confort Acústico
                    </span>
                    <p className="text-xs leading-relaxed text-emerald-800">
                      {analysisResult.analysis.immediateProtection}
                    </p>
                  </div>
                )}

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
