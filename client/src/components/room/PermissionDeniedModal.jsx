/**
 * PermissionDeniedModal — shown when the browser blocks camera or microphone access.
 * Detects the current browser and provides step-by-step unblocking instructions.
 */
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, X, AlertTriangle, ExternalLink } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// ─── Detect browser ───────────────────────────────────────────────────────────
const detectBrowser = () => {
  const ua = navigator.userAgent;
  if (/Firefox/i.test(ua)) return 'firefox';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'safari';
  if (/Edg/i.test(ua)) return 'edge';
  return 'chrome'; // Chrome / Brave / Opera
};

const INSTRUCTIONS = {
  chrome: [
    "Cliquez sur l'icône 🔒 ou 📷 dans la barre d'adresse (à gauche de l'URL).",
    'Sélectionnez "Toujours autoriser" pour la caméra et le microphone.',
    'Rechargez la page avec F5.',
  ],
  edge: [
    "Cliquez sur l'icône 🔒 dans la barre d'adresse.",
    'Cliquez sur "Autorisations pour ce site".',
    'Réglez la Caméra et le Microphone sur "Autoriser".',
    'Rechargez la page.',
  ],
  firefox: [
    "Cliquez sur l'icône 🔒 dans la barre d'adresse.",
    'Cliquez sur la flèche (→) à côté de "Connexion sécurisée".',
    'Cliquez sur "Plus d\'informations" → onglet "Permissions".',
    'Changez Caméra et Microphone sur "Autoriser".',
    'Rechargez la page.',
  ],
  safari: [
    'Dans le menu "Safari", ouvrez "Préférences" (⌘,).',
    'Allez dans l\'onglet "Sites web".',
    'Sélectionnez "Caméra" ou "Microphone" à gauche.',
    'Réglez ce site sur "Autoriser".',
    'Rechargez la page.',
  ],
};

const BROWSER_LABELS = {
  chrome: 'Chrome / Brave',
  edge: 'Edge',
  firefox: 'Firefox',
  safari: 'Safari',
};

// ─── Styled components ────────────────────────────────────────────────────────
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  background: #1e2536;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 16px;
  padding: 2rem;
  max-width: 480px;
  width: 100%;
  color: #e2e8f0;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  &:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 0.2rem;
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
`;

const BrowserTag = styled.span`
  display: inline-flex;
  align-items: center;
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const Steps = styled.ol`
  padding-left: 1.25rem;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Step = styled.li`
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ReloadBtn = styled.button`
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  border: none;
  transition: background 0.2s;
  &:hover {
    background: #2563eb;
  }
`;

const DismissBtn = styled.button`
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  background: transparent;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }
`;

const HelpLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: #60a5fa;
  text-decoration: none;
  margin-top: 0.75rem;
  &:hover {
    text-decoration: underline;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
const HELP_URLS = {
  chrome: 'https://support.google.com/chrome/answer/2693767',
  edge: 'https://support.microsoft.com/en-us/windows/windows-camera-microphone-and-privacy-settings-306a5c92-06c5-40c1-ad49-b3bfaf2b13e3',
  firefox: 'https://support.mozilla.org/kb/how-manage-your-camera-and-microphone-permissions',
  safari: 'https://support.apple.com/guide/safari/website-settings-ibrwe2159f50/mac',
};

/**
 * @param {object}   props
 * @param {'microphone'|'camera'|null} props.type  — which device was denied
 * @param {function} props.onClose — callback to dismiss
 */
export const PermissionDeniedModal = ({ type, onClose }) => {
  const { t } = useTranslation();
  const browser = detectBrowser();
  const localizedSteps = t(`room.permissionDenied.steps.${browser}`, { returnObjects: true });
  const steps = Array.isArray(localizedSteps) ? localizedSteps : INSTRUCTIONS[browser];
  const isCamera = type === 'camera';

  return (
    <AnimatePresence>
      {type && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <CloseBtn onClick={onClose} aria-label={t('room.permissionDenied.close', 'Fermer')}>
              <X size={18} />
            </CloseBtn>

            <Header>
              <IconWrap>
                <AlertTriangle size={22} color="#ef4444" />
              </IconWrap>
              <div>
                <Title>
                  {isCamera
                    ? t('room.permissionDenied.titleCamera', 'Accès caméra bloqué')
                    : t('room.permissionDenied.titleMic', 'Accès microphone bloqué')}
                </Title>
                <Subtitle>
                  {isCamera
                    ? t(
                        'room.permissionDenied.subtitleCamera',
                        "Le navigateur a refusé l'accès à votre caméra."
                      )
                    : t(
                        'room.permissionDenied.subtitleMic',
                        "Le navigateur a refusé l'accès à votre microphone."
                      )}
                </Subtitle>
              </div>
            </Header>

            <BrowserTag>
              {isCamera ? (
                <Camera size={12} style={{ marginRight: 4 }} />
              ) : (
                <Mic size={12} style={{ marginRight: 4 }} />
              )}
              {t('room.permissionDenied.instructionsFor', 'Instructions pour')}{' '}
              {BROWSER_LABELS[browser]}
            </BrowserTag>

            <Steps>
              {steps.map((step, i) => (
                <Step key={i}>{step}</Step>
              ))}
            </Steps>

            <Actions>
              <ReloadBtn onClick={() => window.location.reload()}>
                {t('room.permissionDenied.reload', 'Recharger la page')}
              </ReloadBtn>
              <DismissBtn onClick={onClose}>
                {t('room.permissionDenied.close', 'Fermer')}
              </DismissBtn>
            </Actions>

            <HelpLink href={HELP_URLS[browser]} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} />
              {t('room.permissionDenied.learnMore', 'En savoir plus sur les permissions')}{' '}
              {BROWSER_LABELS[browser]}
            </HelpLink>
          </Modal>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
