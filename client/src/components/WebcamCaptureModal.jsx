import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';

/**
 * Reusable webcam-capture modal.
 * Uses navigator.mediaDevices.getUserMedia() to grab a single frame
 * and returns a JPEG File via onCapture(file).
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - onCapture: (file: File) => Promise<void> | void
 *  - title?: string
 */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #1e293b;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  overflow: hidden;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #1e293b;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  background: #000;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1); /* mirror like a webcam selfie */
  }
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  color: #fca5a5;
  text-align: center;
  font-size: 0.9rem;
`;

const Footer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #1e293b;
  justify-content: flex-end;

  button {
    padding: 0.55rem 1rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.15s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const SecondaryBtn = styled.button`
  background: rgba(148, 163, 184, 0.15);
  color: #e2e8f0;

  &:hover:not(:disabled) {
    background: rgba(148, 163, 184, 0.25);
  }
`;

const PrimaryBtn = styled.button`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }
`;

const WebcamCaptureModal = ({ isOpen, onClose, onCapture, title = 'Prendre une photo' }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewBlob, setPreviewBlob] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startStream = useCallback(async () => {
    setError('');
    setIsStarting(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Votre navigateur ne supporte pas la capture webcam.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 720 }, height: { ideal: 540 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (e) {
      console.error('[WebcamCapture] getUserMedia failed:', e);
      const msg =
        e?.name === 'NotAllowedError'
          ? 'Accès caméra refusé. Autorisez la caméra dans les paramètres de votre navigateur.'
          : e?.name === 'NotFoundError'
          ? 'Aucune caméra détectée sur cet appareil.'
          : e?.message || 'Impossible d\'accéder à la caméra.';
      setError(msg);
    } finally {
      setIsStarting(false);
    }
  }, []);

  // Start when modal opens; stop & reset on close.
  useEffect(() => {
    if (isOpen) {
      setPreviewUrl('');
      setPreviewBlob(null);
      startStream();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, startStream, stopStream]);

  // Revoke blob URL when changed/unmounted.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const takeShot = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    // Mirror to match the on-screen preview.
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(blob);
        setPreviewBlob(blob);
        setPreviewUrl(url);
        stopStream();
      },
      'image/jpeg',
      0.92
    );
  };

  const retake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    setPreviewBlob(null);
    startStream();
  };

  const confirm = async () => {
    if (!previewBlob) return;
    setIsSaving(true);
    try {
      const file = new File([previewBlob], `webcam-${Date.now()}.jpg`, { type: 'image/jpeg' });
      await onCapture?.(file);
      onClose?.();
    } catch (e) {
      console.error('[WebcamCapture] save failed:', e);
      setError(e?.message || 'Échec de l\'enregistrement.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            <h3><Camera size={18} /> {title}</h3>
            <CloseBtn onClick={onClose} aria-label="Fermer"><X size={18} /></CloseBtn>
          </Header>

          <VideoWrapper>
            {error ? (
              <ErrorBox>
                <AlertCircle size={32} />
                <div>{error}</div>
              </ErrorBox>
            ) : previewUrl ? (
              <img src={previewUrl} alt="Aperçu" />
            ) : (
              <video ref={videoRef} playsInline muted autoPlay />
            )}
          </VideoWrapper>

          <Footer>
            {previewUrl ? (
              <>
                <SecondaryBtn type="button" onClick={retake} disabled={isSaving}>
                  <RefreshCw size={14} /> Reprendre
                </SecondaryBtn>
                <PrimaryBtn type="button" onClick={confirm} disabled={isSaving}>
                  <Check size={14} /> {isSaving ? 'Enregistrement…' : 'Utiliser cette photo'}
                </PrimaryBtn>
              </>
            ) : (
              <>
                <SecondaryBtn type="button" onClick={onClose}>Annuler</SecondaryBtn>
                <PrimaryBtn type="button" onClick={takeShot} disabled={isStarting || !!error}>
                  <Camera size={14} /> {isStarting ? 'Démarrage…' : 'Capturer'}
                </PrimaryBtn>
              </>
            )}
          </Footer>
        </Modal>
      </Backdrop>
    </AnimatePresence>
  );
};

export default WebcamCaptureModal;
