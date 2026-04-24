import { useState, useRef, useCallback } from 'react';
import RecordRTC from 'recordrtc';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const clearRecordingError = useCallback(() => setRecordingError(null), []);

  const startRecording = useCallback(async () => {
    setRecordingError(null);
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
      setIsRecording(false);
      if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
        setRecordingError('permission_denied');
      } else if (error?.name === 'NotFoundError') {
        setRecordingError('no_device');
      } else {
        setRecordingError('unknown');
        console.error('Erreur lors du démarrage de l\'enregistrement:', error);
      }
    }
  }, []);;

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
    recordingError,
    clearRecordingError,
    startRecording,
    stopRecording,
    toggleRecording
  };
};
