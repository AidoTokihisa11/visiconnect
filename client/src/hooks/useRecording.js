import { useState, useRef, useCallback } from 'react';
import RecordRTC from 'recordrtc';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      // Capture both screen and audio
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      // Combine streams
      const tracks = [
        ...screenStream.getVideoTracks(),
        ...micStream.getAudioTracks(),
        ...screenStream.getAudioTracks()
      ];
      
      const combinedStream = new MediaStream(tracks);
      streamRef.current = combinedStream;

      recorderRef.current = new RecordRTC(combinedStream, {
        type: 'video',
        mimeType: 'video/webm'
      });

      recorderRef.current.startRecording();
      setIsRecording(true);

      // Handle user stopping screen share from browser controls
      screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', error);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        
        // Auto download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `VisiConnect-Recording-${new Date().toISOString().slice(0,10)}.webm`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);

        setIsRecording(false);
        recorderRef.current.destroy();
        recorderRef.current = null;
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      });
    }
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    toggleRecording
  };
};
