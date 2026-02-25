// LiveKit Configuration
// This file centralizes configuration for LiveKit connection.
// Ensure these environment variables are set in your .env file or Vercel/Netlify dashboard.

export const LIVEKIT_CONFIG = {
  // The WebSocket URL provided by LiveKit Cloud or your self-hosted instance
  wsUrl: import.meta.env.VITE_LIVEKIT_WS_URL || "wss://visiconnect-demo.livekit.cloud",
  
  // Token endpoint (your backend API route to generate tokens)
  tokenEndpoint: import.meta.env.VITE_LIVEKIT_TOKEN_ENDPOINT || "/api/livekit/token",
  
  // Default room options
  defaultOptions: {
    adaptiveStream: true, // Enable adaptive stream for bandwidth optimization
    dynacast: true,        // Enable dynacast for scalable video layers (Simulcast)
    videoCaptureDefaults: {
      resolution: {
        width: 1280,
        height: 720,
        frameRate: 30
      },
    },
    publishDefaults: {
      simulcast: true,     // Enable publishing simulcast (multiple quality layers)
      videoSimulcastLayers: [
        { width: 1280, height: 720, encoding: { maxBitrate: 1700000 } }, // ~1.7 Mbps
        { width: 640, height: 360, encoding: { maxBitrate: 500000 } },   // ~500 Kbps 
        { width: 320, height: 180, encoding: { maxBitrate: 150000 } },   // ~150 Kbps
      ],
      videoCodec: 'vp9',   // Prefer VP9 for better quality/bitrate ratio (fallback to H264 supported)
    },
  }
};
